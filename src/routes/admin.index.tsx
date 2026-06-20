import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/")({ component: AdminIndex });

function AdminIndex() {
  const { data } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [u, s, p, o] = await Promise.all([
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase.from("stores").select("id", { count: "exact", head: true }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("id", { count: "exact", head: true }),
      ]);
      return {
        users: u.count ?? 0,
        stores: s.count ?? 0,
        products: p.count ?? 0,
        orders: o.count ?? 0,
      };
    },
  });

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { label: "Users", value: data?.users ?? 0 },
        { label: "Stores", value: data?.stores ?? 0 },
        { label: "Products", value: data?.products ?? 0 },
        { label: "Orders", value: data?.orders ?? 0 },
      ].map((s) => (
        <div key={s.label} className="rounded-lg border bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
          <p className="mt-1 text-2xl font-bold">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
