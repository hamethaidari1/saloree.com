import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin/users")({ component: AdminUsers });

function AdminUsers() {
  const { data } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () =>
      (
        await supabase
          .from("profiles")
          .select("*, user_roles!user_roles_user_profile_fk(role)")
          .order("created_at", { ascending: false })
      ).data ?? [],
  });
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full min-w-[600px] text-sm">
        <thead className="bg-muted text-xs uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Roles</th>
            <th className="p-3 text-left">Joined</th>
          </tr>
        </thead>
        <tbody>
          {(data ?? []).map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-3">{u.full_name ?? "—"}</td>
              <td className="p-3 text-muted-foreground">{u.email}</td>
              <td className="p-3">{u.user_roles?.map((r) => r.role).join(", ") || "—"}</td>
              <td className="p-3 text-muted-foreground">
                {new Date(u.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
