import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/stores")({ component: AdminStores });

function AdminStores() {
  const { data } = useQuery({
    queryKey: ["admin-stores"],
    queryFn: async () =>
      (
        await supabase
          .from("stores")
          .select("*, profiles!stores_owner_profile_fk(email, full_name)")
          .order("created_at", { ascending: false })
      ).data ?? [],
  });
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full min-w-[600px] text-sm">
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="p-3 text-left">Store</th>
            <th className="p-3 text-left">Owner</th>
            <th className="p-3 text-left">Slug</th>
            <th className="p-3 text-left">Created</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-3 font-medium">
                <Link to="/stores/$slug" params={{ slug: s.slug }} className="hover:text-primary">
                  {s.name}
                </Link>
              </td>
              <td className="p-3 text-muted-foreground">
                {s.profiles?.full_name ?? s.profiles?.email ?? "—"}
              </td>
              <td className="p-3 text-muted-foreground">/{s.slug}</td>
              <td className="p-3 text-muted-foreground">
                {new Date(s.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
