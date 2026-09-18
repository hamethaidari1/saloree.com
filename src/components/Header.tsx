import { Link, useNavigate, useLocation } from "@tanstack/react-router";
import {
  Search,
  ShoppingCart,
  Store,
  Package,
  User as UserIcon,
  Menu,
  LogOut,
  ChevronDown,
  Heart,
  ChevronRight,
  Home,
  LayoutGrid,
  X,
  MapPin,
  HelpCircle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Logo } from "@/components/Logo";
import { getCategoryIcon } from "@/lib/category-icons";
import { useLocale, COUNTRY_META } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { LocaleSelector } from "./LocaleSelector";
import { CountryModal } from "./CountryModal";

export function Header() {
  const { user, roles, signOut } = useAuth();
  const { count, total } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { language, country, formatPrice } = useLocale();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [countryModalOpen, setCountryModalOpen] = useState(false);

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const scrollDirection = useScrollDirection();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };

    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [drawerOpen]);

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

  const { data: userOrdersCount = 0 } = useQuery({
    queryKey: ["user-orders-count", user?.id],
    queryFn: async () => {
      if (!user?.id) return 0;
      const { count: orderCount, error } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("customer_id", user.id);
      if (error) return 0;
      return orderCount ?? 0;
    },
    enabled: !!user?.id,
  });

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (category !== "all") {
      navigate({
        to: "/categories/$slug",
        params: { slug: category },
        search: { q } as never,
      });
    } else {
      navigate({ to: "/marketplace", search: { q } as never });
    }
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

  let pathname = "";
  try {
    const location = useLocation();
    pathname = location?.pathname || "";
  } catch (e) {
    console.error("[Header] Router location not ready:", e);
  }
  const isAuthPage = [
    "/login",
    "/register",
    "/auth/callback",
    "/forgot-password",
    "/reset-password",
  ].includes(pathname);

  const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2";

  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-[var(--color-hairline)] bg-white/95 backdrop-blur-md py-3.5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className={`flex items-center rounded-sm ${focusRing}`}>
            <Logo imgClassName="h-9 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@saloree.com"
              className={`hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors rounded-sm ${focusRing}`}
            >
              <HelpCircle className="size-3.5" />
              Help
            </a>
            {!pathname.includes("/login") && (
              <Link
                to="/login"
                className={`text-sm font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors duration-200 rounded-sm ${focusRing}`}
              >
                Login
              </Link>
            )}
            {!pathname.includes("/register") && (
              <Link
                to="/register"
                className={`text-sm font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)] transition-colors duration-200 rounded-sm ${focusRing}`}
              >
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <header
      className={`w-full bg-white sticky top-0 z-50 transition-transform duration-300 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* 1. Utility bar */}
      <div className="h-8 bg-[var(--color-brand-surface)] text-white text-[11px] font-medium">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              type="button"
              onClick={() => setCountryModalOpen(true)}
              className={`flex items-center gap-1.5 text-white/90 hover:text-white transition-colors rounded-sm ${focusRing} focus-visible:ring-offset-[var(--color-brand-surface)]`}
            >
              <MapPin className="size-3.5 shrink-0" />
              <span className="hidden sm:inline">Deliver to</span>
              <span className="font-bold truncate max-w-[110px] sm:max-w-none">
                {COUNTRY_META[country]?.label ?? "Worldwide"}
              </span>
            </button>
            <span className="hidden sm:inline text-white/30">|</span>
            <div className="hidden sm:block [&_button]:border-white/20 [&_button]:text-white [&_button]:hover:bg-white/10">
              <LocaleSelector variant="desktop" />
            </div>
          </div>

          <Link
            to="/seller"
            className={`shrink-0 hover:text-white transition-colors font-semibold text-white/90 rounded-sm ${focusRing} focus-visible:ring-offset-[var(--color-brand-surface)]`}
          >
            Become a Seller
          </Link>
        </div>
      </div>

      {/* 2. Main header bar */}
      <div className="border-b border-[var(--color-hairline)]">
        <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8 flex items-center gap-3 sm:gap-6">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 shrink-0 hover:bg-[var(--color-surface-alt)] rounded-lg"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="size-5 text-[var(--color-ink)]" />
            </Button>
            <Link to="/" className={`shrink-0 rounded-sm ${focusRing}`}>
              <Logo imgClassName="h-8 sm:h-9 w-auto object-contain" />
            </Link>
          </div>

          {/* Center: dominant search bar */}
          <div className="hidden lg:flex flex-1 max-w-3xl">
            <form
              onSubmit={onSearch}
              className="relative flex w-full items-center bg-white rounded-lg overflow-hidden border border-[var(--color-hairline)] focus-within:border-[var(--color-ink)] transition-colors duration-150"
            >
              <div className="relative shrink-0 flex items-center h-12 border-r border-[var(--color-hairline)] bg-[var(--color-surface-alt)]">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Search category"
                  className={`h-full bg-transparent pr-7 pl-4 text-xs font-semibold text-[var(--color-ink)] outline-none cursor-pointer appearance-none ${focusRing}`}
                >
                  <option value="all">All Categories</option>
                  {categories?.map((cat) => (
                    <option key={cat.id} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="size-3 absolute right-2.5 pointer-events-none text-[var(--color-text-muted)]" />
              </div>

              <input
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products, brands and stores"
                className="h-12 w-full bg-transparent px-4 text-sm outline-none text-[var(--color-ink)] placeholder:text-[var(--color-text-muted)]"
              />

              <button
                type="submit"
                aria-label="Search"
                className={`px-5 h-12 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white transition-colors shrink-0 ${focusRing}`}
              >
                <Search className="size-4" />
              </button>
            </form>
          </div>

          {/* Right action icons */}
          <div className="flex items-center gap-3 sm:gap-5 shrink-0 ml-auto">
            <Link
              to={"/wishlist" as never}
              className={`hidden lg:flex flex-col items-center group relative text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors rounded-sm ${focusRing}`}
            >
              <span className="relative">
                <Heart className="size-5 mb-0.5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[var(--color-brand)] text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center tabular-nums">
                    {wishlistItems.length}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold font-heading">Wishlist</span>
            </Link>

            <Link
              to={user ? "/orders" : "/login"}
              className={`hidden lg:flex flex-col items-center group relative text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors rounded-sm ${focusRing}`}
            >
              <span className="relative">
                <Package className="size-5 mb-0.5" />
                {userOrdersCount > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[var(--color-brand)] text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center tabular-nums">
                    {userOrdersCount}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-semibold font-heading">Orders</span>
            </Link>

            <Link
              to="/cart"
              className={`flex items-center gap-2 group text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors rounded-sm ${focusRing}`}
            >
              <span className="relative">
                <ShoppingCart className="size-5" />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-[var(--color-brand)] text-white text-[9px] font-bold min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center tabular-nums">
                    {count}
                  </span>
                )}
              </span>
              <span className="hidden sm:flex flex-col leading-none">
                <span className="text-[10px] font-semibold font-heading">Cart</span>
                {count > 0 && (
                  <span className="text-xs font-bold tabular-nums font-sans">
                    {formatPrice(total)}
                  </span>
                )}
              </span>
            </Link>

            <span className="hidden sm:inline w-px h-6 bg-[var(--color-hairline)]" />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`hidden sm:flex gap-2 h-10 px-3 hover:bg-[var(--color-surface-alt)] rounded-lg border border-[var(--color-hairline)] ${focusRing}`}
                  >
                    <UserIcon className="size-4 text-[var(--color-text-muted)]" />
                    <span className="max-w-[90px] truncate text-xs font-semibold text-[var(--color-ink)]">
                      {user.email?.split("@")[0]}
                    </span>
                    <ChevronDown className="size-3 text-[var(--color-text-muted)]" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl mt-2 p-1.5">
                  <DropdownMenuItem className="flex flex-col items-start gap-1 py-2 px-3">
                    <span className="text-xs text-[var(--color-text-muted)] font-medium">
                      Logged in as
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-ink)] truncate w-full">
                      {user.email}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link to="/orders">
                      <Package className="mr-2 size-4 text-[var(--color-text-muted)]" />{" "}
                      {t("my_orders", language)}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link to={"/wishlist" as never}>
                      <Heart className="mr-2 size-4 text-[var(--color-text-muted)]" /> Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link to="/seller">
                      <Store className="mr-2 size-4 text-[var(--color-text-muted)]" />{" "}
                      {t("seller_dashboard", language)}
                    </Link>
                  </DropdownMenuItem>
                  {roles.includes("admin") && (
                    <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                      <Link to="/admin">
                        <UserIcon className="mr-2 size-4 text-[var(--color-text-muted)]" />{" "}
                        {t("admin_dashboard", language)}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={signOut}
                    className="text-destructive rounded-lg cursor-pointer focus:bg-destructive/5"
                  >
                    <LogOut className="mr-2 size-4" /> {t("sign_out", language)}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  asChild
                  variant="ghost"
                  className="h-9 px-3.5 text-xs font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] rounded-lg"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button
                  asChild
                  className="h-9 px-4 text-xs font-bold text-white bg-[var(--color-brand-surface)] hover:bg-[var(--color-brand)] rounded-lg transition-colors"
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile persistent search row */}
        <div className="px-4 pb-3 lg:hidden">
          <form onSubmit={onSearch} className="relative flex items-center">
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, brands and stores"
              className="h-10 w-full rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface-alt)] pl-4 pr-11 text-sm outline-none focus:border-[var(--color-ink)] focus:bg-white transition-colors text-[var(--color-ink)] placeholder:text-[var(--color-text-muted)]"
            />
            <button
              type="submit"
              aria-label="Search"
              className={`absolute right-1.5 flex h-7 w-7 items-center justify-center rounded-md bg-[var(--color-brand)] text-white ${focusRing}`}
            >
              <Search className="size-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 3. Nav strip — All Categories trigger + top-level nav links */}
      <nav
        aria-label="Primary"
        className="bg-white border-b border-[var(--color-hairline)] overflow-x-auto no-scrollbar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex min-w-max items-center justify-between gap-8 py-2.5">
          <DropdownMenu>
            <DropdownMenuTrigger
              className={`flex items-center gap-2 rounded-md bg-[var(--color-brand-surface)] px-3 py-1.5 font-heading text-xs font-semibold text-white hover:bg-[var(--color-brand)] transition-colors shrink-0 ${focusRing}`}
            >
              <LayoutGrid className="size-3.5" />
              All Categories
              <ChevronDown className="size-3" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 rounded-xl shadow-xl mt-2 p-1.5">
              {(categories ?? []).map((cat) => (
                <DropdownMenuItem key={cat.id} asChild className="rounded-lg cursor-pointer">
                  <Link to="/categories/$slug" params={{ slug: cat.slug }}>
                    {cat.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <ul className="flex items-center gap-6 font-heading text-xs font-semibold text-[var(--color-ink)]">
            {["Today's Deals", "New Arrivals", "Best Sellers", "Trending", "Special Offers"].map(
              (label) => (
                <li key={label}>
                  <Link
                    to="/marketplace"
                    className={`hover:text-[var(--color-brand)] transition-colors py-1 rounded-sm whitespace-nowrap ${focusRing}`}
                  >
                    {label}
                  </Link>
                </li>
              ),
            )}
            <li>
              <Link
                to="/stores"
                className={`hover:text-[var(--color-brand)] transition-colors py-1 rounded-sm whitespace-nowrap ${focusRing}`}
              >
                Stores
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <CountryModal open={countryModalOpen} onClose={() => setCountryModalOpen(false)} />

      {/* Mobile Drawer via Portal to escape stacking context */}
      {mounted &&
        createPortal(
          <>
            {/* Mobile Drawer Overlay */}
            <div
              className={`fixed inset-0 z-[9998] bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden ${
                drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Drawer */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Main Menu"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`fixed inset-y-0 left-0 z-[9999] flex h-[100vh] w-[85vw] max-w-[380px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${
                drawerOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              {/* Drawer Header */}
              <div className="bg-[var(--color-brand-surface)] px-5 py-6 text-white relative flex flex-col gap-4 shrink-0">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className={`absolute right-4 top-4 text-white/60 hover:text-white transition-colors rounded-sm ${focusRing} focus-visible:ring-offset-[var(--color-brand-surface)]`}
                  aria-label="Close menu"
                >
                  <X className="size-6" />
                </button>

                <div className="flex items-center gap-3 mt-2">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white font-bold border border-white/10 text-xl shadow-inner">
                    {user ? user.email?.charAt(0).toUpperCase() : <UserIcon className="size-5" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      {user ? `Hello, ${user.email?.split("@")[0]}` : "Hello, Sign In"}
                    </p>
                    {!user && (
                      <Link
                        to="/login"
                        onClick={() => setDrawerOpen(false)}
                        className="text-xs font-bold text-white underline hover:text-white/80 transition-colors"
                      >
                        Sign In to Your Account
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Content */}
              <div className="flex-1 overflow-y-auto bg-white">
                {/* Mobile Search inside Drawer */}
                <div className="p-4 border-b border-[var(--color-hairline)]">
                  <form onSubmit={onSearch} className="relative">
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search products..."
                      className="h-11 w-full rounded-lg border border-[var(--color-hairline)] pl-4 pr-12 text-sm outline-none focus:border-[var(--color-ink)] bg-[var(--color-surface-alt)] focus:bg-white transition-all"
                    />
                    <button
                      type="submit"
                      aria-label="Search"
                      className="absolute right-1 top-1 bottom-1 w-10 flex items-center justify-center rounded-md bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] transition-colors"
                    >
                      <Search className="size-4" />
                    </button>
                  </form>
                </div>

                {/* Main Menu Items */}
                <nav className="px-3 py-2">
                  {[
                    { label: "Home", to: "/", icon: Home },
                    { label: "Marketplace", to: "/marketplace", icon: LayoutGrid },
                    { label: "Stores", to: "/stores", icon: Store },
                    { label: "Wishlist", to: "/wishlist" as never, icon: Heart },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center justify-between px-3 py-3 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] transition-all ${
                          index !== 0 ? "border-t border-[var(--color-hairline)]" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="size-4 text-[var(--color-text-muted)]" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="size-4 text-[var(--color-text-muted)]" />
                      </Link>
                    );
                  })}
                </nav>

                <section className="border-t border-[var(--color-hairline)] px-4 py-4">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-[var(--color-ink)]">
                        Shop by Category
                      </h3>
                      <p className="text-[11px] text-[var(--color-text-muted)]">
                        Browse real categories on Saloree.
                      </p>
                    </div>
                    <Link
                      to="/marketplace"
                      onClick={() => setDrawerOpen(false)}
                      className="text-xs font-semibold text-[var(--color-brand)] hover:text-[var(--color-brand-dark)]"
                    >
                      View all
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {(categories ?? []).map((cat) => {
                      const Icon = getCategoryIcon(cat.slug || cat.name);
                      return (
                        <Link
                          key={cat.id}
                          to="/categories/$slug"
                          params={{ slug: cat.slug }}
                          onClick={() => setDrawerOpen(false)}
                          aria-label={`Browse ${cat.name}`}
                          className={`flex min-h-[64px] min-w-0 items-center gap-3 rounded-xl border border-[var(--color-hairline)] bg-[var(--color-surface-alt)] p-3 text-left transition-all hover:border-[var(--color-ink)]/30 hover:bg-white ${focusRing}`}
                        >
                          <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-white border border-[var(--color-hairline)] text-[var(--color-ink)]">
                            <Icon className="size-4" />
                          </span>
                          <p className="truncate text-xs font-bold text-[var(--color-ink)]">
                            {cat.name}
                          </p>
                        </Link>
                      );
                    })}
                  </div>
                </section>

                {/* Additional Links */}
                <div className="border-t border-[var(--color-hairline)] px-3 py-2">
                  {user && (
                    <>
                      <Link
                        to="/orders"
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] transition-all"
                      >
                        <Package className="size-4 text-[var(--color-text-muted)]" />
                        <span>My Orders</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="size-4 text-[var(--color-text-muted)]" />
                          <span>Shopping Cart</span>
                        </div>
                        {count > 0 && (
                          <span className="rounded-full bg-[var(--color-brand)] px-2 py-0.5 text-xs font-bold text-white tabular-nums">
                            {count}
                          </span>
                        )}
                      </Link>
                    </>
                  )}
                  <Link
                    to="/seller"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)] transition-all"
                  >
                    <Store className="size-4 text-[var(--color-text-muted)]" />
                    <span>Become a Seller</span>
                  </Link>

                  {user && (
                    <button
                      onClick={() => {
                        setDrawerOpen(false);
                        signOut();
                      }}
                      className="flex w-full items-center gap-3 px-3 py-3 text-sm font-semibold text-destructive hover:bg-destructive/5 transition-all"
                    >
                      <LogOut className="size-4" />
                      <span>Sign Out</span>
                    </button>
                  )}
                  {!user && (
                    <div className="flex gap-2 px-3 py-3">
                      <Link
                        to="/login"
                        onClick={() => setDrawerOpen(false)}
                        className="flex-1 rounded-lg border border-[var(--color-hairline)] py-2.5 text-center text-sm font-semibold text-[var(--color-ink)]"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setDrawerOpen(false)}
                        className="flex-1 rounded-lg bg-[var(--color-brand-surface)] py-2.5 text-center text-sm font-semibold text-white"
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>

                {/* Settings Section: Language & Currency */}
                <div className="mt-auto border-t border-[var(--color-hairline)] bg-[var(--color-surface-alt)] p-5">
                  <h3 className="text-xs font-bold text-[var(--color-text-muted)] tracking-wider mb-3 text-center">
                    Language / Currency
                  </h3>
                  <div className="flex justify-center">
                    <LocaleSelector variant="mobile" />
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
