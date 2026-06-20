import { Link, Outlet, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "@/components/Logo";

export type NavItem = { to: string; label: string };

export function DashboardShell({
  title,
  nav,
  children,
}: {
  title: string;
  nav: NavItem[];
  children?: ReactNode;
}) {
  const { pathname } = useLocation();
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-bold">{title}</h1>
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-lg border bg-card p-3 lg:sticky lg:top-24 lg:self-start">
          {/* Logo at the top of the sidebar */}
          <div className="mb-3 flex items-center justify-center border-b pb-3">
            <Logo imgClassName="h-[60px] w-auto object-contain" />
          </div>
          <nav className="grid gap-1 text-sm">
            {nav.map((n) => {
              const active = pathname === n.to || (n.to !== nav[0].to && pathname.startsWith(n.to));
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  className={`rounded-md px-3 py-2 hover:bg-accent ${active ? "bg-primary-soft font-semibold text-primary" : ""}`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <section className="min-w-0">{children ?? <Outlet />}</section>
      </div>
    </div>
  );
}
