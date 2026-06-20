import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

function AdminOrders() {
  const { data } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*, stores(name), profiles!orders_customer_profile_fk(email)")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("[admin-orders] Supabase error:", error);
        throw error;
      }
      return data ?? [];
    },
  });
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full min-w-[600px] text-sm">
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Store</th>
            <th className="p-3 text-right">Total</th>
            <th className="p-3 text-left">Status</th>
            <th className="p-3 text-left">Date</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((o) => (
            <tr key={o.id} className="border-t">
              <td className="p-3 font-mono text-xs">#{o.id.slice(0, 8)}</td>
              <td className="p-3 text-muted-foreground">{o.profiles?.email ?? "—"}</td>
              <td className="p-3">{o.stores?.name ?? "—"}</td>
              <td className="p-3 text-right font-medium">${Number(o.total_amount).toFixed(2)}</td>
              <td className="p-3">
                <span className="rounded-full bg-primary-soft px-2 py-0.5 text-xs text-primary capitalize">
                  {o.status}
                </span>
              </td>
              <td className="p-3 text-muted-foreground">
                {new Date(o.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
