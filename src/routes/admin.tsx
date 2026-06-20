import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — Saloree" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const { user, roles, loading } = useAuth();

  const isSuperAdmin = roles.includes("super_admin") || roles.includes("admin");

  if (loading)
    return <div className="p-10 text-center text-sm text-muted-foreground">Loading…</div>;
  if (!user)
    return (
      <div className="mx-auto max-w-md p-10 text-center text-sm">
        Please{" "}
        <Link to="/login" className="font-semibold text-primary">
          sign in
        </Link>
        .
      </div>
    );

  if (!isSuperAdmin) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account doesn't have permission to access the admin dashboard.
        </p>
      </div>
    );
  }

  const nav = [
    { to: "/admin", label: "Overview" },
    { to: "/admin/users", label: "Users" },
    { to: "/admin/stores", label: "Stores" },
    { to: "/admin/categories", label: "Categories" },
    { to: "/admin/orders", label: "Orders" },
  ];

  return (
    <DashboardShell title="Admin dashboard" nav={nav}>
      <Outlet />
    </DashboardShell>
  );
}
