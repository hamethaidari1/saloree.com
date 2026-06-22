import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/customers")({
  component: SellerCustomers,
});

function SellerCustomers() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your customer profiles, purchase history, and details.
        </p>
      </div>
      <div className="rounded-xl border border-dashed p-16 text-center">
        <div className="text-5xl mb-4">👥</div>
        <h3 className="text-lg font-semibold mb-1">No customers yet</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Customer accounts will appear here automatically once customers start making purchases at your store.
        </p>
      </div>
    </div>
  );
}
