import { Link, useLocation } from "@tanstack/react-router";
import { Home, LayoutGrid, Search, Heart, User } from "lucide-react";
import { useAuth } from "@/lib/auth";

export function MobileBottomNav() {
  const { user } = useAuth();
  let pathname = "";
  try {
    const location = useLocation();
    pathname = location?.pathname || "";
  } catch (e) {
    pathname = "";
  }

  const isAuthPage = ["/login", "/register", "/auth/callback"].includes(pathname);
  if (isAuthPage) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[var(--color-hairline)] lg:hidden shadow-lg">
      <div className="grid grid-cols-5 h-14 items-center max-w-md mx-auto px-1">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${
            pathname === "/"
              ? "text-[var(--color-brand)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-ink)]"
          }`}
        >
          <Home className="size-5 mb-0.5" />
          <span>Home</span>
        </Link>

        <Link
          to="/marketplace"
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${
            pathname.startsWith("/categories") || pathname === "/marketplace"
              ? "text-[var(--color-brand)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-ink)]"
          }`}
        >
          <LayoutGrid className="size-5 mb-0.5" />
          <span>Categories</span>
        </Link>

        <Link
          to="/marketplace"
          className="flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium text-[var(--color-text-muted)] hover:text-[var(--color-ink)] transition-colors"
        >
          <Search className="size-5 mb-0.5" />
          <span>Search</span>
        </Link>

        <Link
          to={"/wishlist" as never}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${
            pathname === "/wishlist"
              ? "text-[var(--color-brand)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-ink)]"
          }`}
        >
          <Heart className="size-5 mb-0.5" />
          <span>Wishlist</span>
        </Link>

        <Link
          to={user ? "/seller" : "/login"}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${
            pathname.startsWith("/seller") || pathname === "/login"
              ? "text-[var(--color-brand)]"
              : "text-[var(--color-text-muted)] hover:text-[var(--color-ink)]"
          }`}
        >
          <User className="size-5 mb-0.5" />
          <span>Account</span>
        </Link>
      </div>
    </div>
  );
}
