import { Link, useLocation } from "@tanstack/react-router";

import { Logo } from "@/components/Logo";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { useSiteSettings, useFooterLinks } from "@/hooks/useSiteSettings";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Globe } from "lucide-react";

export function Footer() {
  const { language, translateCategory } = useLocale();
  const { data: settings } = useSiteSettings();
  const { data: footerLinks = [] } = useFooterLinks();

  const description =
    settings?.footer_description ||
    "A modern multi-vendor marketplace where anyone can launch a store and start selling.";
  const footerText =
    settings?.footer_text || `© ${new Date().getFullYear()} Saloree. All rights reserved.`;

  // Parse social links if present
  let socials: { [key: string]: string } = {};
  if (settings?.social_links && typeof settings.social_links === "object") {
    socials = settings.social_links as { [key: string]: string };
  }

  const socialIcons: { [key: string]: any } = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
  };

  // Group footer links by category
  const categories = Array.from(new Set(footerLinks.map((l) => l.category)));

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
      <footer className="w-full border-t bg-background py-6 mt-auto">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row text-xs text-muted-foreground">
          <p>© 2026 Saloree. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:underline">Privacy Policy</Link>
            <Link to="/" className="hover:underline">Terms of Service</Link>
            <Link to="/" className="hover:underline">Contact Support</Link>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-16 bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          <div className="lg:col-span-2">
            <Link to="/" className="font-editorial text-3xl font-extrabold tracking-tight mb-4 inline-block text-white">
              Saloree
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6">
              Your global marketplace for premium products. We connect passionate sellers with discerning buyers across every category.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="mailto:info@saloree.com"
                className="text-xs font-semibold text-[#E11D48] hover:underline"
              >
                info@saloree.com
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-5 text-white">
              SHOP
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
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
                <Link to="/marketplace" className="hover:text-white transition-colors">
                  Stores
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider mb-5 text-white">
              SELL
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
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
            <h4 className="font-bold text-xs uppercase tracking-wider mb-5 text-white">
              ACCOUNT & SUPPORT
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-slate-400">
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
                <Link to="/cart" className="hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>© 2026 Saloree. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Global Multi-Vendor Marketplace</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
