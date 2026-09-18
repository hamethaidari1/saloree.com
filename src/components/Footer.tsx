import { Link, useLocation } from "@tanstack/react-router";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Footer() {
  const { data: settings } = useSiteSettings();

  const description =
    settings?.footer_description ||
    "A modern multi-vendor marketplace where anyone can launch a store and start selling.";

  let pathname = "";
  try {
    const location = useLocation();
    pathname = location?.pathname || "";
  } catch (e) {
    console.error("[Footer] Router location not ready:", e);
  }
  const isAuthPage = ["/login", "/register", "/auth/callback"].includes(pathname);

  if (isAuthPage) {
    return (
      <footer className="w-full border-t border-[var(--color-hairline)] bg-white py-6 mt-auto">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row text-xs text-[var(--color-text-muted)]">
          <p>© {new Date().getFullYear()} Saloree. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:underline">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:underline">
              Terms of Service
            </Link>
            <a href="mailto:info@saloree.com" className="hover:underline">
              Contact Support
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-16 bg-[var(--color-brand-surface)] text-white pt-14 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-2">
            <Link
              to="/"
              className="font-heading text-2xl font-bold tracking-tight mb-4 inline-block text-white"
            >
              Saloree
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">{description}</p>
            <a
              href="mailto:info@saloree.com"
              className="text-xs font-semibold text-[var(--color-gold)] hover:underline"
            >
              info@saloree.com
            </a>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs tracking-wider mb-5 text-white">Shop</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/marketplace" className="hover:text-white transition-colors">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="hover:text-white transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/stores" className="hover:text-white transition-colors">
                  Stores
                </Link>
              </li>
              <li>
                <Link to={"/wishlist" as never} className="hover:text-white transition-colors">
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs tracking-wider mb-5 text-white">Sell</h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/seller" className="hover:text-white transition-colors">
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link to="/seller" className="hover:text-white transition-colors">
                  Seller Dashboard
                </Link>
              </li>
              <li>
                <Link to="/seller/products" className="hover:text-white transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/seller/orders" className="hover:text-white transition-colors">
                  Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs tracking-wider mb-5 text-white">
              Account & Support
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-white transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <a href="mailto:info@saloree.com" className="hover:text-white transition-colors">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold text-xs tracking-wider mb-5 text-white">
              Customer Service
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/orders" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
              <li>
                <Link to="/refund-policy" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to={"/faq" as never} className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[var(--color-brand-surface-2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Saloree. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
