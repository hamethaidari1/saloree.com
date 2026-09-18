import { createFileRoute, Link } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout/cancel")({
  head: () => ({ meta: [{ title: "Payment cancelled — Saloree" }] }),
  component: CheckoutCancel,
});

function CheckoutCancel() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <XCircle className="h-10 w-10 text-slate-400" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900">Payment cancelled</h1>
      <p className="mt-3 text-base text-slate-600">
        No charge was made. Your cart is still saved, so you can pick up right where you left off.
      </p>
      <div className="mt-8 flex justify-center gap-4">
        <Button asChild className="h-12 px-8 font-semibold text-base">
          <Link to="/checkout">Return to checkout</Link>
        </Button>
        <Button asChild variant="outline" className="h-12 px-8 font-semibold text-base">
          <Link to="/cart">View cart</Link>
        </Button>
      </div>
    </div>
  );
}
