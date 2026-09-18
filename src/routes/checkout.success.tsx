import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { getStripeCheckoutSessionSummaryFn } from "@/lib/stripe";

export const Route = createFileRoute("/checkout/success")({
  head: () => ({ meta: [{ title: "Payment received — Saloree" }] }),
  validateSearch: (search: Record<string, unknown>) => ({
    session_id: typeof search.session_id === "string" ? search.session_id : "",
  }),
  component: CheckoutSuccess,
});

function CheckoutSuccess() {
  const { session_id } = Route.useSearch();
  const { remove } = useCart();
  const [status, setStatus] = useState<"pending" | "done" | "error">(
    session_id ? "pending" : "done",
  );

  useEffect(() => {
    if (!session_id) return;
    let cancelled = false;

    (async () => {
      try {
        const summary = await getStripeCheckoutSessionSummaryFn({ data: session_id });
        if (cancelled) return;
        // Only remove the items for the store that was just paid for — a
        // multi-seller cart pays one store at a time, so the rest of the
        // cart must stay intact.
        for (const productId of summary.productIds) remove(productId);
        setStatus("done");
      } catch (error) {
        console.error("[checkout-success] Could not confirm session or clean up cart:", error);
        if (!cancelled) setStatus("error");
      }
    })();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session_id]);

  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
        <CheckCircle className="h-10 w-10 text-emerald-600" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Payment received</h1>
      <p className="mt-3 text-base text-slate-600">
        Thanks for your order. We're confirming your payment now — it will appear in{" "}
        <Link to="/orders" className="font-semibold text-primary underline">
          My Orders
        </Link>{" "}
        within a few moments.
      </p>
      {status === "error" && (
        <p className="mt-3 text-sm text-amber-600">
          Your payment went through, but we couldn't refresh your cart automatically. Nothing to
          worry about — check My Orders in a minute to confirm.
        </p>
      )}
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild className="h-12 px-8 font-semibold text-base">
          <Link to="/orders">View My Orders</Link>
        </Button>
        <Button asChild variant="outline" className="h-12 px-8 font-semibold text-base">
          <Link to="/marketplace">Continue shopping</Link>
        </Button>
      </div>
    </div>
  );
}
