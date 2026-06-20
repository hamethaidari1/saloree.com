import { createFileRoute, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { DashboardShell } from "@/components/DashboardShell";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/saloree-control")({
  head: () => ({
    meta: [{ title: "Control Panel — Saloree" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: ControlLayout,
});

function ControlLayout() {
  const { user, roles, loading, signOut } = useAuth();
  const navigate = useNavigate();

  const isAuthorized =
    roles.includes("admin") || roles.includes("super_admin") || roles.includes("content_admin");

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/admin/login" });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="flex h-[450px] items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        <span className="ml-3 text-sm text-muted-foreground">Authenticating…</span>
      </div>
    );
  }

  if (!user) {
    return null; // Redirects via useEffect
  }

  if (!isAuthorized) {
    return (
      <div className="mx-auto max-w-md p-12 text-center border rounded-2xl shadow-card my-12 bg-card">
        <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          You do not have permission to access this page. Seller and customer roles are restricted.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild variant="outline">
            <Link to="/">Go Home</Link>
          </Button>
          <Button onClick={() => signOut()} variant="destructive">
            Sign Out
          </Button>
        </div>
      </div>
    );
  }

  const nav = [{ to: "/saloree-control/content", label: "Content Manager" }];

  return (
    <DashboardShell title="Saloree Control" nav={nav}>
      <div className="space-y-6">
        <Outlet />
        <div className="border-t border-slate-100 pt-6 flex justify-end">
          <Button
            onClick={() => signOut()}
            variant="outline"
            className="text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </DashboardShell>
  );
}
