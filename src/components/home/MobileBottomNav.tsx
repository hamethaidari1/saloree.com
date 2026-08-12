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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 lg:hidden shadow-lg">
      <div className="grid grid-cols-5 h-14 items-center max-w-md mx-auto px-1">
        <Link
          to="/"
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${
            pathname === "/" ? "text-[#E11D48]" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Home className="size-5 mb-0.5" />
          <span>HOME</span>
        </Link>

        <Link
          to="/marketplace"
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${
            pathname.startsWith("/categories") || pathname === "/marketplace"
              ? "text-[#E11D48]"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <LayoutGrid className="size-5 mb-0.5" />
          <span>CATEGORIES</span>
        </Link>

        <Link
          to="/marketplace"
          className="flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium text-slate-500 hover:text-slate-900 transition-colors"
        >
          <Search className="size-5 mb-0.5" />
          <span>SEARCH</span>
        </Link>

        <Link
          to="/cart"
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${
            pathname === "/cart" ? "text-[#E11D48]" : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <Heart className="size-5 mb-0.5" />
          <span>WISHLIST</span>
        </Link>

        <Link
          to={user ? "/seller" : "/login"}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${
            pathname.startsWith("/seller") || pathname === "/login"
              ? "text-[#E11D48]"
              : "text-slate-500 hover:text-slate-900"
          }`}
        >
          <User className="size-5 mb-0.5" />
          <span>ACCOUNT</span>
        </Link>
      </div>
    </div>
  );
}
