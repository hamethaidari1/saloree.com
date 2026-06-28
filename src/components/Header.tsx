import { Link, useNavigate, useLocation } from "@tanstack/react-router";

import {
  Search,
  ShoppingCart,
  Store,
  Package,
  User as UserIcon,
  Menu,
  LogOut,
  ChevronRight,
  Home,
  LayoutGrid,
  X,
  Globe,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/Logo";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { LocaleSelector } from "./LocaleSelector";

function getCategoryIcon(iconName: string | null) {
  if (!iconName) return LucideIcons.Tag;
  const name = iconName.toLowerCase().replace(/[^a-z0-9]/g, "");

  if (name === "laptop") return LucideIcons.Laptop;
  if (name === "shirt") return LucideIcons.Shirt;
  if (name === "sofa") return LucideIcons.Sofa;
  if (name === "sparkles") return LucideIcons.Sparkles;
  if (name === "dumbbell") return LucideIcons.Dumbbell;
  if (name === "gamepad2" || name === "gamepad") return LucideIcons.Gamepad2;
  if (name === "car") return LucideIcons.Car;
  if (name === "book") return LucideIcons.Book;

  return LucideIcons.Tag;
}

export function Header() {
  const { user, roles, signOut } = useAuth();
  const { count } = useCart();
  const { language } = useLocale();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) {
        console.error("[header-categories] Supabase error:", error);
        throw error;
      }
      return data ?? [];
    },
  });

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate({ to: "/marketplace", search: { q } as never });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // swipe left to close
    if (isLeftSwipe) {
      setDrawerOpen(false);
    }
  };

  const location = useLocation();
  const isAuthPage = ["/login", "/register", "/auth/callback"].includes(location.pathname);

  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md py-3.5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center">
            <Logo imgClassName="h-9 w-auto object-contain" />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-[#E11D48] transition-colors duration-200"
          >
            {t("home", language) || "Back to Home"}
          </Link>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="mx-auto flex max-w-7xl items-center px-4 py-1 md:py-1.5 lg:gap-6 lg:py-2">
        {/* ── Mobile/Tablet Row ── (hidden on desktop) */}
        <div className="flex flex-1 items-center gap-1.5 lg:hidden">
          {/* 1. Hamburger – far left */}
          <Button
            variant="ghost"
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="size-5" />
          </Button>

          {/* 2. Logo – next to hamburger */}
          <Logo imgClassName="h-[52px] w-auto object-contain md:h-[60px]" />

          {/* 3. Spacer pushes everything after it to the right */}
          <div className="flex-1" />

          {/* 4. Auth buttons / user dropdown */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-10 gap-1 px-2">
                  <UserIcon className="size-4 text-primary" />
                  <span className="max-w-[72px] truncate text-xs font-semibold">
                    {user.email?.split("@")[0]}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem asChild>
                  <Link to="/orders">{t("my_orders", language)}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seller">{t("seller_dashboard", language)}</Link>
                </DropdownMenuItem>
                {roles.includes("admin") && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">{t("admin_dashboard", language)}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="mr-2 size-4" /> {t("sign_out", language)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-1 shrink-0">
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-10 px-2.5 text-xs font-semibold"
              >
                <Link to="/login" className="flex items-center gap-1">
                  <UserIcon className="size-4" />
                  {t("login", language)}
                </Link>
              </Button>
              <Button asChild size="sm" className="h-10 px-2.5 text-xs font-semibold">
                <Link to="/register">{t("sign_up", language)}</Link>
              </Button>
            </div>
          )}

          {/* 5. Cart – far right */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="relative h-11 w-11 shrink-0"
            aria-label="Cart"
          >
            <Link to="/cart">
              <ShoppingCart className="size-5" />
              {count > 0 && (
                <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-0.5 text-[9px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </Button>
        </div>

        {/* ── Desktop Row ── (hidden below lg) */}
        <div className="hidden flex-1 items-center gap-6 lg:flex">
          <Logo imgClassName="h-20 w-auto object-contain" />

          {/* Center: Desktop search */}
          <form onSubmit={onSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={t("search_placeholder", language)}
                className="h-10 w-full rounded-md border border-input bg-background pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                aria-label="Search"
                className="absolute right-1 top-1 grid h-8 w-10 place-items-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Search className="size-4" />
              </button>
            </div>
          </form>

          {/* Desktop: Nav links */}
          <nav className="flex items-center gap-1">
            <LocaleSelector variant="desktop" />
            <Link
              to="/seller"
              className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium hover:bg-accent"
            >
              <Store className="size-4" /> {t("sell_on_saloree", language)}
            </Link>
            {user && (
              <Link
                to="/orders"
                className="flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium hover:bg-accent"
              >
                <Package className="size-4" /> {t("orders", language)}
              </Link>
            )}
            <Link
              to="/cart"
              className="relative flex items-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium hover:bg-accent"
            >
              <ShoppingCart className="size-4" /> {t("cart", language)}
              {count > 0 && (
                <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </nav>

          {/* Desktop: User account */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2">
                  <UserIcon className="size-4" />
                  <span className="max-w-[120px] truncate">Hi, {user.email?.split("@")[0]}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/orders">{t("my_orders", language)}</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seller">{t("seller_dashboard", language)}</Link>
                </DropdownMenuItem>
                {roles.includes("admin") && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">{t("admin_dashboard", language)}</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="mr-2 size-4" /> {t("sign_out", language)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">{t("login", language)}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">{t("sign_up", language)}</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile/Tablet Search Bar (Below Header, sticky) */}
      <form onSubmit={onSearch} className="border-t px-4 py-2 lg:hidden bg-background">
        <div className="relative">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("search_placeholder", language)}
            className="h-10 w-full rounded-md border border-input bg-background pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            aria-label="Search"
            className="absolute right-1 top-1 grid h-8 w-10 place-items-center rounded-md bg-primary text-primary-foreground"
          >
            <Search className="size-4" />
          </button>
        </div>
      </form>

      {/* Slide Navigation Drawer Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Left Slide Navigation Drawer */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className={`fixed inset-y-0 left-0 z-50 flex h-full w-[85%] max-w-[420px] flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="bg-primary px-5 py-6 text-primary-foreground shadow-md relative flex flex-col gap-4">
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute right-4 top-4 text-primary-foreground/80 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="size-6" />
          </button>

          <div className="flex items-center gap-3 mt-2">
            <div className="grid h-12 w-12 place-items-center rounded-full bg-white/20 text-white font-bold border border-white/10 text-xl shadow-inner">
              {user ? user.email?.charAt(0).toUpperCase() : <UserIcon className="size-6" />}
            </div>
            <div>
              <p className="text-sm font-semibold opacity-90">
                {user ? `Hello, ${user.email?.split("@")[0]}` : t("hello_sign_in", language)}
              </p>
              {!user && (
                <Link
                  to="/login"
                  onClick={() => setDrawerOpen(false)}
                  className="text-xs font-bold underline hover:text-white transition-colors"
                >
                  {t("sign_in_account", language)}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {/* Settings Section: Language & Currency */}
          <div className="px-2">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5">
              {t("language", language)} & {t("currency", language)}
            </h3>
            <LocaleSelector variant="mobile" />
          </div>

          {/* Main Menu */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5 px-2">
              {t("main_menu", language)}
            </h3>
            <nav className="space-y-1">
              {[
                { to: "/", label: t("home", language), icon: Home },
                { to: "/marketplace", label: t("marketplace", language), icon: LayoutGrid },
                { to: "/orders", label: t("orders", language), icon: Package, authRequired: true },
                { to: "/cart", label: t("cart", language), icon: ShoppingCart, countBadge: count },
                { to: "/seller", label: t("become_a_seller", language), icon: Store },
              ].map((item) => {
                if (item.authRequired && !user) return null;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-4 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {item.countBadge !== undefined && item.countBadge > 0 && (
                        <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-primary-foreground">
                          {item.countBadge}
                        </span>
                      )}
                      <ChevronRight className="size-4 text-muted-foreground/60" />
                    </div>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Shop by Category */}
          <div>
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2.5 px-2">
              {t("shop_by_category", language)}
            </h3>
            <nav className="space-y-1">
              {(categories ?? []).map((cat) => {
                const Icon = getCategoryIcon(cat.icon);
                return (
                  <Link
                    key={cat.id}
                    to="/categories/$slug"
                    params={{ slug: cat.slug }}
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-primary/5 hover:text-primary transition-all active:scale-[0.98]"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="size-4 text-muted-foreground" />
                      <span>{cat.name}</span>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground/60" />
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Sign Out (for logged in users) */}
          {user && (
            <div className="border-t pt-4">
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  signOut();
                }}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-destructive/5 transition-all"
              >
                <LogOut className="size-4" />
                <span>{t("sign_out", language)}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
