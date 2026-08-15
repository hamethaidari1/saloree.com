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
  Globe,
  Tag,
  Flame,
  Sparkles,
  Laptop,
  Shirt,
  Sofa,
  Dumbbell,
  Gamepad2,
  BookOpen,
  HelpCircle,
  ShieldCheck,
  Truck,
  Car,
  Bell,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useScrollDirection } from "@/hooks/useScrollDirection";
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
import { CategoryMedia, formatCategoryItemCount, homeCategoryItems } from "@/lib/home-categories";
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
  const [category, setCategory] = useState("all");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

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

  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md py-3.5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center">
            <Logo imgClassName="h-9 w-auto object-contain" />
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="mailto:info@saloree.com"
              className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-[#FF3B3B] transition-colors"
            >
              <HelpCircle className="size-3.5" />
              Help
            </a>
            {!pathname.includes("/login") && (
              <Link
                to="/login"
                className="text-sm font-semibold text-muted-foreground hover:text-[#FF3B3B] transition-colors duration-200"
              >
                Login
              </Link>
            )}
            {!pathname.includes("/register") && (
              <Link
                to="/register"
                className="text-sm font-semibold text-[#FF3B3B] hover:text-[#E03030] transition-colors duration-200"
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
      className={`w-full border-b border-gray-100 bg-white sticky top-0 z-50 transition-transform duration-300 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* 1. Top Utility Bar (UX Pilot Design) */}
      <div className="bg-[#f8fafc] border-b border-slate-200 text-slate-600 text-[11px] font-medium py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <LocaleSelector variant="desktop" />
            <span className="hidden sm:inline text-slate-300">|</span>
            <Link to="/seller" className="hover:text-[#E11D48] transition-colors font-semibold">
              Become a Seller
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#E11D48] animate-pulse">●</span>
            <span className="uppercase tracking-wider font-semibold text-[10px] text-slate-500">
              Live Marketplace Ticker
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Logo & Mobile Menu Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 shrink-0 hover:bg-slate-100 rounded-xl"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="size-5 text-slate-700" />
          </Button>
          <Link to="/" className="font-editorial text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Saloree
          </Link>
        </div>

        {/* Center: Search Bar with Category Dropdown */}
        <div className="hidden lg:flex flex-1 max-w-2xl justify-center">
          <form
            onSubmit={onSearch}
            className="relative flex w-full items-center bg-[#f1f5f9] rounded-xl overflow-hidden border border-transparent focus-within:border-slate-300 focus-within:bg-white transition-all duration-200"
          >
            {/* Category Select Dropdown */}
            <div className="relative shrink-0 flex items-center h-11 border-r border-slate-200">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-full bg-transparent pr-7 pl-4 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-slate-900 outline-none cursor-pointer appearance-none"
              >
                <option value="all">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-3 absolute right-2.5 pointer-events-none text-slate-400" />
            </div>

            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for products, brands and more"
              className="h-11 w-full bg-transparent px-4 text-sm outline-none text-slate-900 placeholder:text-slate-400"
            />

            <button
              type="submit"
              aria-label="Search"
              className="px-5 h-11 hover:bg-slate-900 hover:text-white text-slate-600 transition-colors shrink-0"
            >
              <Search className="size-4" />
            </button>
          </form>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <Link
            to="/marketplace"
            className="hidden lg:flex flex-col items-center group text-slate-700 hover:text-[#E11D48] transition-colors"
          >
            <Heart className="size-5 mb-0.5 group-hover:text-[#E11D48] transition-colors" />
            <span className="text-[10px] uppercase tracking-wider font-semibold">Wishlist</span>
          </Link>

          {user && (
            <Link
              to="/orders"
              className="hidden lg:flex flex-col items-center group text-slate-700 hover:text-[#E11D48] transition-colors"
            >
              <Package className="size-5 mb-0.5 group-hover:text-[#E11D48] transition-colors" />
              <span className="text-[10px] uppercase tracking-wider font-semibold">Orders</span>
            </Link>
          )}

          <Link
            to="/cart"
            className="flex flex-col items-center group relative text-slate-700 hover:text-[#E11D48] transition-colors"
          >
            <div className="relative">
              <ShoppingCart className="size-5 mb-0.5 group-hover:text-[#E11D48] transition-colors" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-[#E11D48] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {count}
                </span>
              )}
            </div>
            <span className="text-[10px] uppercase tracking-wider font-semibold">Cart</span>
          </Link>

          <span className="hidden sm:inline w-[1px] h-5 bg-slate-200" />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 h-10 px-3 hover:bg-slate-100 rounded-xl border border-slate-200"
                >
                  <UserIcon className="size-4 text-slate-600" />
                  <span className="max-w-[90px] truncate text-xs font-semibold text-slate-800">
                    {user.email?.split("@")[0]}
                  </span>
                  <ChevronDown className="size-3 text-slate-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl mt-2 p-1.5">
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-2 px-3">
                  <span className="text-xs text-slate-400 font-medium">Logged in as</span>
                  <span className="text-sm font-semibold text-slate-900 truncate w-full">
                    {user.email}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/orders">
                    <Package className="mr-2 size-4 text-slate-400" /> {t("my_orders", language)}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/seller">
                    <Store className="mr-2 size-4 text-slate-400" /> {t("seller_dashboard", language)}
                  </Link>
                </DropdownMenuItem>
                {roles.includes("admin") && (
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link to="/admin">
                      <UserIcon className="mr-2 size-4 text-slate-400" /> {t("admin_dashboard", language)}
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
            <div className="flex items-center gap-2">
              <Button
                asChild
                variant="ghost"
                className="h-9 px-3.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="h-9 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-[#E11D48] rounded-lg transition-colors"
              >
                <Link to="/register">Register</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Secondary Navigation Bar */}
      <nav className="px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto">
          <ul className="flex min-w-max gap-8 py-2.5 text-xs font-semibold text-slate-700 uppercase tracking-wider">
            <li>
              <Link to="/marketplace" className="hover:text-[#E11D48] transition-colors py-1">
                Today's Deals
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-[#E11D48] transition-colors py-1">
                New Arrivals
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-[#E11D48] transition-colors py-1">
                Best Sellers
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-[#E11D48] transition-colors py-1">
                Trending
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-[#E11D48] transition-colors py-1">
                Stores
              </Link>
            </li>
            <li>
              <Link to="/marketplace" className="hover:text-[#E11D48] transition-colors py-1">
                Special Offers
              </Link>
            </li>
          </ul>
        </div>
      </nav>

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
              <div className="bg-[#0F172A] px-5 py-6 text-white relative flex flex-col gap-4 shrink-0">
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
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
                        className="text-xs font-bold text-[#FF3B3B] underline hover:text-[#E03030] transition-colors"
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
                <div className="p-4 border-b border-gray-100">
                  <form onSubmit={onSearch} className="relative">
                    <input
                      type="text"
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Search products..."
                      className="h-11 w-full rounded-full border border-gray-200 pl-4 pr-12 text-sm outline-none focus:border-[#FF3B3B] bg-gray-50 focus:bg-white transition-all"
                    />
                    <button
                      type="submit"
                      aria-label="Search"
                      className="absolute right-1 top-1 bottom-1 w-10 flex items-center justify-center rounded-full bg-[#FF3B3B] text-white hover:bg-[#E03030] transition-colors"
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
                    { label: "Deals", to: "/marketplace", search: { filter: "deals" }, icon: Tag },
                    { label: "Best Sellers", to: "/marketplace", search: { filter: "best-sellers" }, icon: Flame },
                    { label: "New Arrivals", to: "/marketplace", search: { filter: "new-arrivals" }, icon: Sparkles },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        params={("params" in item ? item.params : undefined) as any}
                        search={("search" in item ? item.search : undefined) as any}
                        onClick={() => setDrawerOpen(false)}
                        className={`flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all ${
                          index !== 0 ? "border-t border-gray-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="size-4 text-gray-400" />
                          <span>{item.label}</span>
                        </div>
                        <ChevronRight className="size-4 text-gray-300" />
                      </Link>
                    );
                  })}
                </nav>

                <section className="border-t border-gray-100 px-4 py-4 md:hidden">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900">Shop by Category</h3>
                      <p className="text-[11px] text-gray-500">Explore popular categories quickly.</p>
                    </div>
                    <Link
                      to="/marketplace"
                      onClick={() => setDrawerOpen(false)}
                      className="text-xs font-semibold text-[#FF3B3B] hover:text-[#E03030]"
                    >
                      View all
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:hidden">
                    {homeCategoryItems.map((category) => (
                      <Link
                        key={category.id}
                        to="/categories/$slug"
                        params={{ slug: category.slug }}
                        onClick={() => setDrawerOpen(false)}
                        aria-label={`Browse ${category.name}`}
                        className="flex min-h-[92px] min-w-0 items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 p-3 text-left transition-all hover:border-gray-200 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3B3B] focus-visible:ring-offset-2"
                      >
                        <CategoryMedia
                          category={category}
                          alt={`${category.name} category illustration`}
                          className="h-14 w-14 shrink-0 rounded-2xl"
                          imgClassName="h-14 w-14 shrink-0 rounded-2xl object-cover"
                          iconClassName="size-5"
                        />
                        <div className="min-w-0">
                          <p className="truncate text-xs font-bold text-gray-900">{category.name}</p>
                          <p className="mt-1 truncate text-[10px] font-medium text-gray-500">
                            {formatCategoryItemCount(category.itemCount)}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>

                {/* Additional Links */}
                <div className="border-t border-gray-100 px-3 py-2">
                  {user && (
                    <>
                      <Link
                        to="/orders"
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <Package className="size-4 text-gray-400" />
                        <span>My Orders</span>
                      </Link>
                      <Link
                        to="/cart"
                        onClick={() => setDrawerOpen(false)}
                        className="flex items-center justify-between px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        <div className="flex items-center gap-3">
                          <ShoppingCart className="size-4 text-gray-400" />
                          <span>Shopping Cart</span>
                        </div>
                        {count > 0 && (
                          <span className="rounded-full bg-[#FF3B3B] px-2 py-0.5 text-xs font-bold text-white">
                            {count}
                          </span>
                        )}
                      </Link>
                    </>
                  )}
                  <Link
                    to="/seller"
                    onClick={() => setDrawerOpen(false)}
                    className="flex items-center gap-3 px-3 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    <Store className="size-4 text-gray-400" />
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
                </div>

                {/* Settings Section: Language & Currency */}
                <div className="mt-auto border-t border-gray-100 bg-gray-50 p-5">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 text-center">
                    Language / Currency
                  </h3>
                  <div className="flex justify-center">
                    <LocaleSelector variant="mobile" />
                  </div>
                </div>
              </div>
            </div>
          </>,
          document.body
        )}
    </header>
  );
}
