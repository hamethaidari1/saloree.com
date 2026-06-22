import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  ShoppingCart,
  Store,
  Package,
  User as UserIcon,
  Menu,
  LogOut,
  Heart,
  Bell,
  ChevronDown,
  X,
  Home,
  LayoutGrid,
} from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

export function NewHeader() {
  const { user, roles, signOut } = useAuth();
  const { count } = useCart();
  const { language } = useLocale();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Logo imgClassName="h-8 w-auto" />
        </div>

        {/* Search Bar (Desktop) */}
        <div className="hidden flex-1 px-8 lg:block">
          <form onSubmit={onSearch} className="relative w-full max-w-xl">
            <Input
              type="text"
              placeholder={t("search_placeholder", language)}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-10 w-full rounded-full border-gray-300 bg-gray-100 pl-4 pr-12 text-sm focus:border-primary focus:ring-primary"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-white" />
            </Button>
          </form>
        </div>

        {/* Right-side Icons and User Menu */}
        <div className="flex items-center space-x-4">
          {/* Language and Currency Selector */}
          <div className="hidden lg:block">
            <LocaleSelector variant="desktop" />
          </div>

          {/* Become Seller */}
          <Button asChild variant="ghost" className="hidden text-sm font-medium lg:flex">
            <Link to="/seller">
              <Store className="mr-2 h-4 w-4" />
              {t("sell_on_saloree", language)}
            </Link>
          </Button>

          {/* Orders */}
          {user && (
            <Button asChild variant="ghost" size="icon" className="hidden lg:flex">
              <Link to="/orders" aria-label="Orders">
                <Package className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* Wishlist */}
          {user && (
            <Button asChild variant="ghost" size="icon" className="hidden lg:flex">
              <Link to={"/wishlist" as any} aria-label="Wishlist">
                <Heart className="h-5 w-5" />
              </Link>
            </Button>
          )}

          {/* Cart */}
          <Button asChild variant="ghost" size="icon" className="relative">
            <Link to="/cart" aria-label="Cart">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {count}
                </span>
              )}
            </Link>
          </Button>

          {/* Notifications */}
          {user && (
            <Button asChild variant="ghost" size="icon" className="relative">
              <Link to={"/notifications" as any} aria-label="Notifications">
                <Bell className="h-5 w-5" />
                {/* Placeholder for notification count */}
                {false && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                    3
                  </span>
                )}
              </Link>
            </Button>
          )}

          {/* User Profile / Auth Buttons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.user_metadata?.avatar_url || ""} alt={user.email || "User"} />
                    <AvatarFallback className="bg-primary text-white">
                      {user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="flex flex-col items-start space-y-1">
                  <p className="text-sm font-medium leading-none">{user.user_metadata?.full_name || user.email?.split("@")[0]}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={"/profile" as any}>
                    <UserIcon className="mr-2 h-4 w-4" />
                    {t("my_profile", language)}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">
                    <Package className="mr-2 h-4 w-4" />
                    {t("my_orders", language)}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/seller">
                    <Store className="mr-2 h-4 w-4" />
                    {t("seller_dashboard", language)}
                  </Link>
                </DropdownMenuItem>
                {roles.includes("admin") && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <Home className="mr-2 h-4 w-4" />
                      {t("admin_dashboard", language)}
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut} className="text-destructive">
                  <LogOut className="mr-2 h-4 w-4" /> {t("sign_out", language)}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">{t("login", language)}</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/register">{t("sign_up", language)}</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mega Category Menu (Desktop) */}
      <nav className="hidden border-t border-gray-200 bg-gray-50 lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 space-x-8">
            <Link
              to="/marketplace"
              className="flex items-center text-sm font-medium text-gray-700 hover:text-primary"
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              {t("all_categories", language)}
            </Link>
            {(categories ?? []).slice(0, 6).map((category) => (
              <Link
                key={category.id}
                to="/categories/$slug"
                params={{ slug: category.slug }}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-primary"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-xs transform bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
          <Logo imgClassName="h-8 w-auto" />
          <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex flex-col p-4">
          {/* Mobile Search */}
          <form onSubmit={onSearch} className="relative mb-4">
            <Input
              type="text"
              placeholder={t("search_placeholder", language)}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-10 w-full rounded-full border-gray-300 bg-gray-100 pl-4 pr-12 text-sm focus:border-primary focus:ring-primary"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-primary hover:bg-primary/90"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-white" />
            </Button>
          </form>

          {/* Mobile Navigation */}
          <nav className="flex flex-col space-y-2">
            <Link
              to="/"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setDrawerOpen(false)}
            >
              <Home className="mr-3 h-5 w-5" />
              {t("home", language)}
            </Link>
            <Link
              to="/marketplace"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setDrawerOpen(false)}
            >
              <LayoutGrid className="mr-3 h-5 w-5" />
              {t("marketplace", language)}
            </Link>
            {user && (
              <>
                <Link
                  to="/orders"
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setDrawerOpen(false)}
                >
                  <Package className="mr-3 h-5 w-5" />
                  {t("my_orders", language)}
                </Link>
                <Link
                  to={"/wishlist" as any}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setDrawerOpen(false)}
                >
                  <Heart className="mr-3 h-5 w-5" />
                  {t("wishlist", language)}
                </Link>
                <Link
                  to={"/notifications" as any}
                  className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                  onClick={() => setDrawerOpen(false)}
                >
                  <Bell className="mr-3 h-5 w-5" />
                  {t("notifications", language)}
                </Link>
              </>
            )}
            <Link
              to="/seller"
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              onClick={() => setDrawerOpen(false)}
            >
              <Store className="mr-3 h-5 w-5" />
              {t("sell_on_saloree", language)}
            </Link>
            {user && roles.includes("admin") && (
              <Link
                to="/admin"
                className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setDrawerOpen(false)}
              >
                <Home className="mr-3 h-5 w-5" />
                {t("admin_dashboard", language)}
              </Link>
            )}
          </nav>

          <div className="mt-4 border-t border-gray-200 pt-4">
            <LocaleSelector variant="mobile" />
          </div>

          {user ? (
            <Button onClick={signOut} variant="destructive" className="mt-4 w-full">
              <LogOut className="mr-2 h-4 w-4" /> {t("sign_out", language)}
            </Button>
          ) : (
            <div className="mt-4 flex flex-col space-y-2">
              <Button asChild>
                <Link to="/login" onClick={() => setDrawerOpen(false)}>
                  {t("login", language)}
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register" onClick={() => setDrawerOpen(false)}>
                  {t("sign_up", language)}
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
