import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import Stripe from "stripe";
import { supabase } from "@/integrations/supabase/client";

function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Stripe is not configured (missing STRIPE_SECRET_KEY).");
  }
  return new Stripe(secretKey);
}

type CheckoutCustomerInfo = {
  full_name: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  address: string;
  notes: string;
};

// Stripe metadata values are capped at 500 characters each — truncate
// defensively so a long address/notes field can never break session
// creation.
function truncateMeta(value: string | null | undefined) {
  return (value ?? "").slice(0, 480);
}

/**
 * Creates a Stripe Checkout Session for ONE store's worth of cart items.
 * Mirrors the old createPayPalOrderFn's per-item server-side price
 * verification, and — like the PayPal flow before it — never trusts a
 * client-supplied identity: the customer_id embedded in the session's
 * metadata (which the webhook uses to create the order) is derived here
 * from a verified Supabase access token, not from the request body.
 */
export const createStripeCheckoutSessionFn = createServerFn({ method: "POST" })
  .validator(
    (data: {
      accessToken: string;
      storeId: string;
      items: { productId: string; quantity: number }[];
      customer: CheckoutCustomerInfo;
    }) => data,
  )
  .handler(async ({ data }) => {
    const { accessToken, storeId, items, customer } = data;

    if (!accessToken) {
      throw new Error("You must be signed in to check out.");
    }
    if (!storeId) {
      throw new Error("Missing store for this order.");
    }
    if (!items.length) {
      throw new Error("No items to charge for this store.");
    }

    // Verify the caller's identity server-side from their Supabase session
    // token — never trust a client-supplied customer id for something that
    // determines who gets billed and who owns the resulting order.
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(accessToken);
    if (userError || !user) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    const { data: store, error: storeError } = await supabase
      .from("stores")
      .select("id")
      .eq("id", storeId)
      .single();
    if (storeError || !store) {
      throw new Error("Store not found.");
    }

    // Verify each product's real price/title on the server — the same
    // safeguard the PayPal flow used, so a tampered client total can never
    // be charged.
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];
    for (const item of items) {
      if (!Number.isFinite(item.quantity) || item.quantity < 1) continue;

      const { data: product, error } = await supabase
        .from("products")
        .select("id, title, price")
        .eq("id", item.productId)
        .eq("store_id", storeId)
        .single();

      if (error || !product) {
        throw new Error(`Product not found in this store: ${item.productId}`);
      }

      lineItems.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            metadata: { product_id: product.id },
          },
          unit_amount: Math.round(Number(product.price) * 100),
        },
        quantity: item.quantity,
      });
    }

    if (lineItems.length === 0) {
      throw new Error("No valid items to charge for.");
    }

    const stripe = getStripeClient();
    const origin = new URL(getRequest().url).origin;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      customer_email: customer.email || undefined,
      // Only small, provider-agnostic identifiers/shipping fields go here —
      // the full order_items are reconstructed from the Session's own line
      // items (via each line item's product_data.metadata.product_id) when
      // the webhook fires, rather than duplicating cart contents here.
      metadata: {
        customer_id: user.id,
        store_id: storeId,
        full_name: truncateMeta(customer.full_name),
        phone: truncateMeta(customer.phone),
        email: truncateMeta(customer.email),
        country: truncateMeta(customer.country),
        city: truncateMeta(customer.city),
        address: truncateMeta(customer.address),
        notes: truncateMeta(customer.notes),
      },
    });

    if (!session.url) {
      throw new Error("Stripe did not return a checkout URL.");
    }

    return { url: session.url };
  });

/**
 * Read-only lookup used by /checkout/success to remove just the paid
 * store's items from the cart (a session_id is not secret — Stripe session
 * IDs are cryptographically random and this only returns a store id and
 * the product ids that were purchased, nothing else).
 */
export const getStripeCheckoutSessionSummaryFn = createServerFn({ method: "GET" })
  .validator((sessionId: string) => sessionId)
  .handler(async ({ data: sessionId }) => {
    if (!sessionId) {
      throw new Error("Missing session id.");
    }

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      expand: ["data.price.product"],
    });

    const productIds = lineItems.data
      .map((li) => {
        const product = li.price?.product;
        if (product && typeof product === "object" && "metadata" in product) {
          return (product as Stripe.Product).metadata?.product_id;
        }
        return undefined;
      })
      .filter((id): id is string => !!id);

    return {
      storeId: (session.metadata?.store_id as string | undefined) ?? null,
      paid: session.payment_status === "paid",
      productIds,
    };
  });
