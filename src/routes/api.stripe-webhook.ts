import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import Stripe from "stripe";
import type { Database } from "@/integrations/supabase/types";

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe is not configured (missing STRIPE_SECRET_KEY).");
  }
  return new Stripe(secretKey);
}

// A webhook request carries no user session, so RLS-scoped writes are not
// possible here — this uses the service role key specifically to bypass
// RLS for this one trusted, signature-verified server-to-server path.
// Never import or expose this client outside server-only code.
function getServiceRoleClient() {
  const url = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Supabase service role credentials are not configured (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY).",
    );
  }
  return createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const Route = createFileRoute("/api/stripe-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
        if (!webhookSecret) {
          console.error("[stripe-webhook] STRIPE_WEBHOOK_SECRET is not configured.");
          return new Response("Webhook not configured", { status: 500 });
        }

        let stripe: Stripe;
        try {
          stripe = getStripeClient();
        } catch (err) {
          console.error("[stripe-webhook] Configuration error:", err);
          return new Response("Webhook not configured", { status: 500 });
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) {
          return new Response("Missing Stripe-Signature header", { status: 400 });
        }

        // Signature verification requires the RAW request body — never the
        // parsed/re-serialized JSON. Re-serializing (different key order,
        // whitespace, number formatting) changes the bytes Stripe signed,
        // which would make every signature check fail.
        const rawBody = await request.text();

        let event: Stripe.Event;
        try {
          event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
        } catch (err) {
          console.error("[stripe-webhook] Signature verification failed:", err);
          return new Response("Invalid signature", { status: 400 });
        }

        try {
          if (event.type === "checkout.session.completed") {
            await handleCheckoutSessionCompleted(
              stripe,
              event.data.object as Stripe.Checkout.Session,
            );
          }
        } catch (err) {
          console.error(`[stripe-webhook] Error handling ${event.type}:`, err);
          // Non-2xx tells Stripe to retry delivery — do not swallow processing errors.
          return new Response("Internal error handling webhook", { status: 500 });
        }

        return Response.json({ received: true });
      },
    },
  },
});

async function handleCheckoutSessionCompleted(stripe: Stripe, session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") {
    console.warn(
      `[stripe-webhook] Session ${session.id} completed but payment_status=${session.payment_status}; skipping.`,
    );
    return;
  }

  const metadata = session.metadata || {};
  const customerId = metadata.customer_id;
  const storeId = metadata.store_id;

  if (!customerId || !storeId) {
    console.error(
      `[stripe-webhook] Session ${session.id} is missing customer_id/store_id metadata.`,
    );
    return;
  }

  const supabaseAdmin = getServiceRoleClient();

  // Idempotency: Stripe can and does redeliver the same event.
  const { data: existingOrder } = await supabaseAdmin
    .from("orders")
    .select("id")
    .eq("provider_reference", session.id)
    .maybeSingle();

  if (existingOrder) {
    console.log(
      `[stripe-webhook] Session ${session.id} already recorded as order ${existingOrder.id}.`,
    );
    return;
  }

  const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
    expand: ["data.price.product"],
  });

  const totalAmount = (session.amount_total ?? 0) / 100;

  const { data: order, error: orderError } = await supabaseAdmin
    .from("orders")
    .insert({
      customer_id: customerId,
      store_id: storeId,
      full_name: metadata.full_name || null,
      phone: metadata.phone || null,
      email: metadata.email || session.customer_details?.email || null,
      country: metadata.country || null,
      city: metadata.city || null,
      address: metadata.address || null,
      notes: metadata.notes || null,
      subtotal: totalAmount,
      total: totalAmount,
      total_amount: totalAmount,
      shipping_address: {
        full_name: metadata.full_name || "",
        phone: metadata.phone || "",
        email: metadata.email || "",
        country: metadata.country || "",
        city: metadata.city || "",
        address: metadata.address || "",
        notes: metadata.notes || "",
      },
      status: "processing",
      payment_provider: "stripe",
      payment_status: "paid",
      paid_at: new Date().toISOString(),
      provider_reference: session.id,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error(`[stripe-webhook] Failed to insert order for session ${session.id}:`, orderError);
    throw new Error(orderError?.message || "Failed to insert order");
  }

  const orderItemsPayload = lineItems.data.map((li) => {
    const product = li.price?.product;
    const productId =
      product && typeof product === "object" && "metadata" in product
        ? (product as Stripe.Product).metadata?.product_id
        : undefined;
    const unitAmount = li.price?.unit_amount ?? 0;
    const quantity = li.quantity ?? 1;
    const unitPrice = unitAmount / 100;
    const title =
      (product && typeof product === "object" && "name" in product
        ? (product as Stripe.Product).name
        : null) ||
      li.description ||
      "Product";

    return {
      order_id: order.id,
      product_id: productId,
      store_id: storeId,
      title,
      price: unitPrice,
      quantity,
      total: unitPrice * quantity,
      unit_price: unitPrice,
    };
  });

  const validOrderItems = orderItemsPayload.filter(
    (oi): oi is typeof oi & { product_id: string } => !!oi.product_id,
  );

  if (validOrderItems.length !== orderItemsPayload.length) {
    console.error(
      `[stripe-webhook] Some line items for session ${session.id} are missing product_id metadata; order ${order.id} may be incomplete.`,
    );
  }

  if (validOrderItems.length > 0) {
    const { error: itemsError } = await supabaseAdmin.from("order_items").insert(validOrderItems);
    if (itemsError) {
      console.error(
        `[stripe-webhook] Failed to insert order_items for order ${order.id}:`,
        itemsError,
      );
      throw new Error(itemsError.message);
    }
  }

  console.log(`[stripe-webhook] Created order ${order.id} for session ${session.id}`);
}
