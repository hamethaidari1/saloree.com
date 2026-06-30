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
  const isAuthPage = ["/login", "/register", "/auth/callback"].includes(pathname);

  if (isAuthPage) {
    return (
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md py-3.5 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center">
            <Logo imgClassName="h-9 w-auto object-contain" />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-muted-foreground hover:text-[#FF3B3B] transition-colors duration-200"
          >
            {t("home", language) || "Back to Home"}
          </Link>
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
      {/* 1. Top Announcement Bar */}
      <div className="bg-[#0F172A] text-white text-xs py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-2 sm:flex-row items-center justify-between">
          <div className="flex flex-nowrap whitespace-nowrap items-center justify-center gap-3 text-gray-300 overflow-x-auto scrollbar-hide text-[11px] sm:text-xs">
            <div className="flex items-center gap-1">
              <Truck className="size-3 text-[#FF3B3B] sm:size-3.5" />
              <span>Free Shipping Over $50</span>
            </div>
            <span className="hidden sm:inline text-gray-600">|</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="size-3 text-[#FF3B3B] sm:size-3.5" />
              <span>30-Day Money Back Guarantee</span>
            </div>
            <span className="hidden sm:inline text-gray-600">|</span>
            <div className="flex items-center gap-1">
              <HelpCircle className="size-3 text-[#FF3B3B] sm:size-3.5" />
              <span>24/7 Customer Support</span>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
            <LocaleSelector variant="desktop" />
          </div>
        </div>
      </div>

      {/* 2. Main Premium Header */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        {/* Logo and Mobile Menu toggle */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-10 w-10 shrink-0 hover:bg-gray-50 rounded-full"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="size-5" />
          </Button>
          <Logo imgClassName="h-10 w-auto object-contain" />
        </div>

        {/* Center: Premium Search Bar with Category Dropdown */}
        <div className="hidden lg:flex flex-1 max-w-2xl justify-center">
          <form
            onSubmit={onSearch}
            className="relative flex w-full items-center bg-gray-50 border border-gray-200 rounded-full hover:bg-gray-100/50 hover:border-gray-300 focus-within:bg-white focus-within:border-[#FF3B3B] focus-within:ring-4 focus-within:ring-[#FF3B3B]/10 overflow-hidden transition-all duration-200"
          >
            <div className="flex items-center pl-4 pr-2 text-gray-400 shrink-0">
              <Search className="size-4" />
            </div>
            <input
              type="text"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search for products, brands and more..."
              className="h-11 w-full bg-transparent pr-4 text-sm outline-none text-gray-800 placeholder-gray-400"
            />
            {/* Category Select Inside Search */}
            <div className="relative shrink-0 flex items-center h-11 border-l border-gray-200">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="h-full bg-transparent pr-8 pl-4 text-xs font-semibold text-gray-500 hover:text-gray-800 outline-none cursor-pointer appearance-none"
              >
                <option value="all">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="size-3 absolute right-3 pointer-events-none text-gray-400" />
            </div>
            <button
              type="submit"
              aria-label="Search"
              className="bg-[#FF3B3B] hover:bg-[#E03030] text-white font-semibold text-sm px-6 h-11 transition-all duration-200 active:scale-[0.98] shrink-0"
            >
              Search
            </button>
          </form>
        </div>

        {/* Right side options: Wishlist, Cart, Login, Premium Sign Up */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <Link
            to="/seller"
            className="hidden xl:flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#FF3B3B] transition-colors py-2 px-3 rounded-full hover:bg-gray-50"
          >
            <Store className="size-4" />
            <span>Sell on Saloree</span>
          </Link>

          <Link
            to={"/wishlist" as any}
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-gray-600 hover:text-[#FF3B3B] transition-colors py-2 px-3 rounded-full hover:bg-gray-50"
          >
            <Heart className="size-4" />
            <span>Wishlist</span>
          </Link>

          <Link
            to="/cart"
            className="relative flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#FF3B3B] transition-colors py-2 px-3 rounded-full hover:bg-gray-50"
          >
            <ShoppingCart className="size-4" />
            <span className="hidden md:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-0.5 right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-[#FF3B3B] px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                {count}
              </span>
            )}
          </Link>

          <span className="hidden sm:inline w-[1px] h-5 bg-gray-200" />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 h-10 px-3 hover:bg-gray-50 rounded-full border border-gray-100"
                >
                  <UserIcon className="size-4 text-gray-500" />
                  <span className="max-w-[90px] truncate text-xs font-semibold text-gray-700">
                    Hi, {user.email?.split("@")[0]}
                  </span>
                  <ChevronDown className="size-3 text-gray-400" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl mt-2 p-1.5">
                <DropdownMenuItem className="flex flex-col items-start gap-1 py-2 px-3">
                  <span className="text-xs text-gray-400 font-medium">Logged in as</span>
                  <span className="text-sm font-semibold text-gray-800 truncate w-full">
                    {user.email}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/orders">
                    <Package className="mr-2 size-4 text-gray-400" /> {t("my_orders", language)}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                  <Link to="/seller">
                    <Store className="mr-2 size-4 text-gray-400" /> {t("seller_dashboard", language)}
                  </Link>
                </DropdownMenuItem>
                {roles.includes("admin") && (
                  <DropdownMenuItem asChild className="rounded-lg cursor-pointer">
                    <Link to="/admin">
                      <UserIcon className="mr-2 size-4 text-gray-400" /> {t("admin_dashboard", language)}
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
                className="h-10 px-4 text-sm font-semibold text-gray-600 hover:text-[#FF3B3B] hover:bg-transparent rounded-full"
              >
                <Link to="/login">Login</Link>
              </Button>
              <Button
                asChild
                className="h-10 px-5 text-sm font-bold text-white bg-[#FF3B3B] hover:bg-[#E03030] rounded-full shadow-md shadow-red-500/10 hover:shadow-red-500/20 active:scale-[0.98] transition-all"
              >
                <Link to="/register">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* 3. Second Navigation (Horizontal navigation bar with icons) */}
      <nav className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex h-12 items-center gap-6 overflow-x-auto scrollbar-none py-1.5 w-full">
            {/* All Categories dropdown button */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-sm font-bold text-gray-800 hover:text-[#FF3B3B] transition-colors py-2 px-3 bg-gray-50 hover:bg-gray-100/80 rounded-lg whitespace-nowrap cursor-pointer">
                  <LayoutGrid className="size-4 text-[#FF3B3B]" />
                  <span>All Categories</span>
                  <ChevronDown className="size-3.5 text-gray-400" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-xl shadow-xl mt-1 p-1">
                {(categories ?? []).map((cat) => {
                  const Icon = getCategoryIcon(cat.icon);
                  return (
                    <DropdownMenuItem key={cat.id} asChild className="rounded-lg py-2 cursor-pointer">
                      <Link to="/categories/$slug" params={{ slug: cat.slug }}>
                        <Icon className="mr-2 size-4 text-gray-400" />
                        <span>{cat.name}</span>
                      </Link>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Custom styled category/deal links with underline hover effects */}
            {[
              { label: "Deals", to: "/marketplace", icon: Tag, search: { filter: "deals" } },
              { label: "Best Sellers", to: "/marketplace", icon: Flame, search: { filter: "best-sellers" } },
              { label: "New Arrivals", to: "/marketplace", icon: Sparkles, search: { filter: "new-arrivals" } },
              { label: "Electronics", to: "/categories/$slug", params: { slug: "electronics" }, icon: Laptop },
              { label: "Fashion", to: "/categories/$slug", params: { slug: "fashion" }, icon: Shirt },
              { label: "Home & Living", to: "/categories/$slug", params: { slug: "home-living" }, icon: Sofa },
              { label: "Beauty", to: "/categories/$slug", params: { slug: "beauty" }, icon: Sparkles },
              { label: "Sports", to: "/categories/$slug", params: { slug: "sports" }, icon: Dumbbell },
              { label: "Toys & Games", to: "/categories/$slug", params: { slug: "toys-games" }, icon: Gamepad2 },
              { label: "Books", to: "/categories/$slug", params: { slug: "books" }, icon: BookOpen },
            ].map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  params={link.params as any}
                  search={link.search as any}
                  className="group relative flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors py-1.5 whitespace-nowrap"
                >
                  <Icon className="size-3.5 text-gray-400 group-hover:text-[#FF3B3B] transition-colors" />
                  <span>{link.label}</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF3B3B] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              );
            })}
          </div>
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
                    { label: "All Categories", to: "/marketplace", icon: LayoutGrid },
                    { label: "Deals", to: "/marketplace", search: { filter: "deals" }, icon: Tag },
                    { label: "Best Sellers", to: "/marketplace", search: { filter: "best-sellers" }, icon: Flame },
                    { label: "New Arrivals", to: "/marketplace", search: { filter: "new-arrivals" }, icon: Sparkles },
                    { label: "Electronics", to: "/categories/$slug", params: { slug: "electronics" }, icon: Laptop },
                    { label: "Fashion", to: "/categories/$slug", params: { slug: "fashion" }, icon: Shirt },
                    { label: "Home & Living", to: "/categories/$slug", params: { slug: "home-living" }, icon: Sofa },
                    { label: "Beauty", to: "/categories/$slug", params: { slug: "beauty" }, icon: Sparkles },
                    { label: "Sports", to: "/categories/$slug", params: { slug: "sports" }, icon: Dumbbell },
                    { label: "Books", to: "/categories/$slug", params: { slug: "books" }, icon: BookOpen },
                    { label: "Gaming", to: "/categories/$slug", params: { slug: "gaming" }, icon: Gamepad2 },
                    { label: "Automotive", to: "/categories/$slug", params: { slug: "automotive" }, icon: Car },
                    { label: "Toys & Kids", to: "/categories/$slug", params: { slug: "toys-kids" }, icon: HelpCircle },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.label}
                        to={item.to}
                        params={item.params as any}
                        search={item.search as any}
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

                {/* Additional Links */}
                <div className="border-t border-gray-100 px-3 py-2">
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
