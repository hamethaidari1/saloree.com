import { Link, Outlet, useLocation } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

export type NavItem = {
  to?: string;
  label: string;
  items?: { to: string; label: string }[];
};

function CollapsibleSection({
  label,
  items,
  pathname,
  defaultOpen,
}: {
  label: string;
  items: { to: string; label: string }[];
  pathname: string;
  defaultOpen: boolean;
}) {
  const [isOpen, setIsOpen] = useState(
    defaultOpen ||
      pathname.includes("/seller/themes") ||
      pathname.includes("/seller/pages") ||
      pathname.includes("/seller/navigation") ||
      pathname.includes("/seller/preferences"),
  );

  return (
    <div className="flex flex-col">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md px-3 py-2 hover:bg-accent flex items-center justify-between text-left text-foreground font-medium cursor-pointer"
      >
        <span>{label}</span>
        {isOpen ? (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && (
        <div className="pl-4 pr-1 py-1 flex flex-col gap-1 border-l ml-3 border-border">
          {items.map((item) => {
            const active =
              pathname === item.to || pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-md px-3 py-1.5 hover:bg-accent text-xs ${active ? "bg-primary-soft font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SidebarNav({
  nav,
  pathname,
  onLinkClick,
}: {
  nav: NavItem[];
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <nav className="grid gap-1 text-sm">
      {nav.map((n) => {
        if (n.items) {
          const hasActiveChild = n.items.some((item) =>
            pathname.startsWith(item.to),
          );
          return (
            <CollapsibleSection
              key={n.label}
              label={n.label}
              items={n.items}
              pathname={pathname}
              defaultOpen={hasActiveChild}
            />
          );
        }

        const active =
          pathname === n.to ||
          (n.to !== nav[0].to && n.to && pathname.startsWith(n.to));

        if (n.to && n.to.startsWith("mailto:")) {
          return (
            <a
              key={n.to}
              href={n.to}
              onClick={onLinkClick}
              className={`rounded-md px-3 py-2 hover:bg-accent flex items-center justify-between text-foreground`}
            >
              <span>{n.label}</span>
            </a>
          );
        }

        return (
          <Link
            key={n.to}
            to={n.to || ""}
            onClick={onLinkClick}
            className={`rounded-md px-3 py-2 hover:bg-accent flex items-center justify-between text-foreground ${active ? "bg-primary-soft font-semibold text-primary" : ""}`}
          >
            <span>{n.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

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
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Mobile Header Row */}
      <div className="flex items-center justify-between mb-4 lg:hidden">
        <h1 className="text-xl font-bold truncate pr-2">{title}</h1>
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-2 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer shrink-0"
          aria-label={mobileNavOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileNavOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Collapsible Nav */}
      {mobileNavOpen && (
        <div className="lg:hidden rounded-xl border bg-card p-3 mb-4 shadow-soft animate-in slide-in-from-top-2 duration-200">
          <SidebarNav
            nav={nav}
            pathname={pathname}
            onLinkClick={() => setMobileNavOpen(false)}
          />
        </div>
      )}

      {/* Desktop Title */}
      <h1 className="mb-4 text-2xl font-bold hidden lg:block">{title}</h1>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Desktop Sidebar */}
        <aside className="rounded-lg border bg-card p-3 lg:sticky lg:top-24 lg:self-start hidden lg:block">
          <div className="mb-3 flex items-center justify-center border-b pb-3">
            <Logo imgClassName="h-[60px] w-auto object-contain" />
          </div>
          <SidebarNav nav={nav} pathname={pathname} />
        </aside>

        <section className="min-w-0">{children ?? <Outlet />}</section>
      </div>
    </div>
  );
}
