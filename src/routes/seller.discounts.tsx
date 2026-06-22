import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/discounts")({
  component: SellerDiscounts,
});

function SellerDiscounts() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Discounts</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create and manage discount codes and automatic discounts for your store.
        </p>
      </div>
      <div className="rounded-xl border border-dashed p-16 text-center">
        <div className="text-5xl mb-4">🏷️</div>
        <h3 className="text-lg font-semibold mb-1">Create discount codes</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Offer discounts on specific products, collections, or total orders to boost your sales.
        </p>
      </div>
    </div>
  );
}
