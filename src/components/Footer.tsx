import { Link } from "@tanstack/react-router";
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

  return (
    <footer className="mt-16 border-t bg-secondary text-secondary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo imgClassName="h-16 w-auto object-contain" />
          <p className="mt-2 text-sm text-secondary-foreground/70">Build. Sell. Grow.</p>
          <p className="mt-4 max-w-xs text-sm text-secondary-foreground/60">{description}</p>
          {/* Social Links */}
          {Object.keys(socials).some((k) => socials[k]) && (
            <div className="mt-6 flex gap-3">
              {Object.entries(socials).map(([platform, url]) => {
                if (!url) return null;
                const Icon = socialIcons[platform.toLowerCase()] || Globe;
                return (
                  <a
                    key={platform}
                    href={url.startsWith("http") ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="grid h-8 w-8 place-items-center rounded-full bg-secondary-foreground/10 text-secondary-foreground/70 hover:bg-secondary-foreground/20 hover:text-secondary-foreground transition"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        {footerLinks.length > 0 ? (
          // Render dynamic footer categories
          categories.map((cat) => (
            <div key={cat}>
              <h4 className="mb-3 text-sm font-semibold">{cat}</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                {footerLinks
                  .filter((l) => l.category === cat)
                  .map((link) => (
                    <li key={link.id}>
                      {link.url.startsWith("/") ? (
                        <Link to={link.url as any}>{link.label}</Link>
                      ) : (
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))
        ) : (
          // Fallback to default columns
          <>
            <div>
              <h4 className="mb-3 text-sm font-semibold">{t("home", language)}</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>
                  <Link to="/marketplace">{t("marketplace", language)}</Link>
                </li>
                <li>
                  <Link to="/categories/$slug" params={{ slug: "electronics" }}>
                    {translateCategory("electronics")}
                  </Link>
                </li>
                <li>
                  <Link to="/categories/$slug" params={{ slug: "fashion" }}>
                    {translateCategory("fashion")}
                  </Link>
                </li>
                <li>
                  <Link to="/categories/$slug" params={{ slug: "home-kitchen" }}>
                    {translateCategory("home-kitchen")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">{t("become_a_seller", language)}</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>
                  <Link to="/seller">{t("become_a_seller", language)}</Link>
                </li>
                <li>
                  <Link to="/seller/store">{t("seller_store_settings", language)}</Link>
                </li>
                <li>
                  <Link to="/seller/products">{t("seller_products", language)}</Link>
                </li>
                <li>
                  <Link to="/seller/orders">{t("seller_orders", language)}</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold">
                {t("language", language)} & {t("currency", language)}
              </h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/70">
                <li>
                  <Link to="/login">{t("login", language)}</Link>
                </li>
                <li>
                  <Link to="/register">{t("sign_up", language)}</Link>
                </li>
                <li>
                  <Link to="/orders">{t("orders", language)}</Link>
                </li>
                <li>
                  <Link to="/cart">{t("cart", language)}</Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-secondary-foreground/50">
        {footerText}
      </div>
    </footer>
  );
}
