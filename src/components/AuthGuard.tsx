import { ReactNode, useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { Logo } from "./Logo";

const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/auth/callback",
  "/marketplace",
  "/products",
  "/stores",
  "/categories",
  "/search",
];

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Root path is always public
  const isRoot = pathname === "/";
  const isPublicRoute = isRoot || PUBLIC_ROUTES.some((route) => pathname.startsWith(route));
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user && !isPublicRoute) {
        console.log("[AuthGuard] Not authenticated, redirecting to login from:", pathname);
        navigate({
          to: "/login",
          search: { redirect: pathname } as any,
        });
      } else if (user && (pathname === "/login" || pathname === "/register")) {
        // If user is logged in and tries to access login/register, redirect to home or redirect param
        console.log("[AuthGuard] Already authenticated, redirecting away from:", pathname);
        navigate({ to: "/" });
      } else {
        setShouldRender(true);
      }
    }
  }, [user, loading, isPublicRoute, pathname, navigate]);

  // While loading, show a clean full-screen state for protected routes
  if (loading && !isPublicRoute) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-950 z-[100]">
        <Logo linked={false} imgClassName="h-12 w-auto mb-8 brightness-0 invert" />
        <div className="flex items-center gap-3 text-white/70">
          <Loader2 className="size-5 animate-spin text-[#E11D48]" />
          <span className="text-sm font-medium tracking-wide">Securing your session...</span>
        </div>
      </div>
    );
  }

  // If we are on a protected route and not authenticated, don't render children
  if (!user && !isPublicRoute) {
    return null;
  }

  // If we are on login/register and authenticated, don't render children (we are redirecting)
  if (user && (pathname === "/login" || pathname === "/register")) {
    return null;
  }

  return <>{children}</>;
}
