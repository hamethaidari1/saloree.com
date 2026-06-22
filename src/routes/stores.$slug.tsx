import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { useAuth } from "@/lib/auth";

type StoreSearch = {
  page?: string;
};

export const Route = createFileRoute("/stores/$slug")({
  validateSearch: (search: Record<string, unknown>): StoreSearch => {
    return {
      page: search.page as string | undefined,
    };
  },
  head: ({ params }) => ({ meta: [{ title: `${params.slug} — Saloree Store` }] }),
  component: StorePage,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────
function isDarkBg(hex: string) {
  const color = hex.replace("#", "");
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.5;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
function ProductSkeleton() {
  return (
    <div className="rounded-xl border overflow-hidden animate-pulse">
      <div className="bg-muted h-40" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-muted rounded w-3/4" />
        <div className="h-3 bg-muted rounded w-1/2" />
        <div className="h-8 bg-muted rounded mt-2" />
      </div>
    </div>
  );
}

// ─── Social Icons ─────────────────────────────────────────────────────────────
const SocialIcon = ({ href, label, children }: { href: string; label: string; children: React.ReactNode }) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
    >
      {children}
    </a>
  ) : null;

// ─── Store Page ───────────────────────────────────────────────────────────────
function StorePage() {
  const { slug } = Route.useParams();
  const { page: searchPage } = Route.useSearch();
  const { user, loading: authLoading } = useAuth();

  const {
    data: store,
    error: storeError,
    isLoading: storeLoading,
  } = useQuery({
    queryKey: ["store", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const isOwnerPreview = !!user && !!store && user.id === (store as any).owner_id;

  // Fetch active theme installation
  const { data: activeInstallation } = useQuery({
    queryKey: ["store-active-installation-public", (store as any)?.id],
    enabled: !!(store as any)?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_theme_installations" as any)
        .select("*, store_theme_settings(*)")
        .eq("store_id", (store as any).id)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

  const themeSettings = activeInstallation?.store_theme_settings?.[0] || null;

  // Fetch navigation items
  const { data: navItems = [] } = useQuery({
    queryKey: ["store-nav-items-public", (store as any)?.id],
    enabled: !!(store as any)?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_navigation_items" as any)
        .select("*")
        .eq("store_id", (store as any).id)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as any[];
    },
  });

  // Fetch current custom page content if searchPage is set
  const { data: currentPage } = useQuery({
    queryKey: ["store-custom-page", (store as any)?.id, searchPage],
    enabled: !!(store as any)?.id && !!searchPage,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_pages" as any)
        .select("*")
        .eq("store_id", (store as any).id)
        .eq("slug", searchPage!)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

  // Fetch products
  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["store-products", (store as any)?.id, isOwnerPreview],
    enabled: !!(store as any)?.id && !authLoading,
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("store_id", (store as any).id)
        .order("created_at", { ascending: false });

      query = isOwnerPreview
        ? query.in("status", ["draft", "active"])
        : query.eq("status", "active");

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as ProductCardData[];
    },
  });

  // ─── Theme values ───────────────────────────────────────────────────────────
  const primaryColor = themeSettings?.primary_color || "#6366f1";
  const bgColor = themeSettings?.bg_color || "#ffffff";
  const accentColor = themeSettings?.accent_color || "#f1f5f9";
  const buttonColor = themeSettings?.button_color || primaryColor;
  const fontFamily = themeSettings?.font_family || "'Inter', sans-serif";
  const heroTitle = themeSettings?.hero_title || (store as any)?.store_name || (store as any)?.name || "Welcome";
  const heroSubtitle = themeSettings?.hero_subtitle || (store as any)?.description || "Discover our products";
  const ctaText = themeSettings?.cta_text || "Shop Now";
  const footerText = themeSettings?.footer_text || `© ${new Date().getFullYear()} ${(store as any)?.store_name || (store as any)?.name || "Store"}. All rights reserved.`;
  const cardStyle = themeSettings?.card_style || "shadow";
  const logoUrl = themeSettings?.logo_url || (store as any)?.logo_url;
  const bannerUrl = themeSettings?.banner_url || (store as any)?.banner_url;
  const darkBg = isDarkBg(bgColor);
  const textColor = darkBg ? "#ffffff" : "#111827";
  const mutedColor = darkBg ? "rgba(255,255,255,0.6)" : "rgba(17,24,39,0.5)";
  const cardBg = accentColor;

  if (storeLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Loading store…</p>
        </div>
      </div>
    );
  }

  if (storeError || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🏪</div>
          <h1 className="text-2xl font-bold mb-2">Store Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This store doesn't exist or may have been removed.
          </p>
          <Link to="/" className="text-primary hover:underline font-medium">
            ← Back to Saloree
          </Link>
        </div>
      </div>
    );
  }

  const storeName = (store as any).store_name || (store as any).name || "Store";
  const storeInitial = storeName.charAt(0).toUpperCase();

  const cardClasses: Record<string, string> = {
    minimal: "rounded-md overflow-hidden",
    shadow: "rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow",
    bordered: "rounded-xl overflow-hidden border-2",
    "image-first": "rounded-2xl overflow-hidden",
  };

  return (
    <div style={{ background: bgColor, color: textColor, fontFamily, minHeight: "100vh" }} className="flex flex-col">
      {/* Announcement Bar */}
      {themeSettings?.show_announcement && themeSettings?.announcement_text && (
        <div
          className="px-4 py-2 text-center text-xs font-semibold transition"
          style={{ background: themeSettings.announcement_bg || "#111827", color: themeSettings.announcement_text_color || "#ffffff" }}
        >
          {themeSettings.announcement_text}
        </div>
      )}

      {/* ── Navbar ─────────────────────────────────────────────────────────── */}
      <nav
        className="sticky top-0 z-45 flex items-center gap-4 px-6 py-3.5 shadow-sm"
        style={{ background: primaryColor }}
      >
        <Link to="/stores/$slug" params={{ slug }} className="flex items-center gap-3">
          {logoUrl ? (
            <img src={logoUrl} className="h-8 w-8 rounded-lg object-cover" alt={storeName} />
          ) : (
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: buttonColor }}
            >
              {storeInitial}
            </div>
          )}
          <span className="text-white font-bold text-base">{storeName}</span>
        </Link>
        <div className="flex-1" />

        {/* Dynamic header menus */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-white/95 mr-4">
          <Link to="/stores/$slug" params={{ slug }} className="hover:text-white transition">
            Home
          </Link>
          {navItems.length > 0
            ? navItems.map((item) => {
                // If it starts with '/' it's relative storefront or external, otherwise it could be pages parameter
                const isCustomPage = item.url.startsWith("/pages/");
                const pageSlug = isCustomPage ? item.url.replace("/pages/", "") : null;
                return pageSlug ? (
                  <Link
                    key={item.id}
                    to="/stores/$slug"
                    params={{ slug }}
                    search={{ page: pageSlug }}
                    className="hover:text-white transition"
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    key={item.id}
                    href={item.url.startsWith("/") ? item.url : `https://${item.url}`}
                    target={item.url.startsWith("/") ? "_self" : "_blank"}
                    rel="noreferrer"
                    className="hover:text-white transition"
                  >
                    {item.title}
                  </a>
                );
              })
            : null}
        </div>

        {isOwnerPreview && (
          <Link
            to="/seller"
            className="text-xs text-white/80 hover:text-white underline underline-offset-2 mr-2"
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* ── Owner preview badge ─────────────────────────────────────────────── */}
      {isOwnerPreview && (
        <div className="flex items-center gap-2 px-6 py-2.5 bg-primary/10 border-b border-primary/20 text-xs shrink-0">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Seller Preview Mode — drafts are visible</span>
          <Link
            to="/seller/theme-customizer"
            search={{ id: activeInstallation?.id }}
            className="ml-auto text-primary hover:underline font-semibold"
          >
            ✏️ Customize Theme
          </Link>
        </div>
      )}

      {/* Custom Page or Home View */}
      {searchPage ? (
        /* ── CUSTOM PAGE RENDER ───────────────────────────────────────────── */
        <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
          {currentPage ? (
            <article className="space-y-6">
              <h1 className="text-3xl font-extrabold" style={{ color: primaryColor }}>
                {currentPage.title}
              </h1>
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: textColor }}
                dangerouslySetInnerHTML={{ __html: currentPage.content || "" }}
              />
              <div className="pt-8">
                <Link
                  to="/stores/$slug"
                  params={{ slug }}
                  className="text-xs font-semibold hover:underline inline-flex items-center gap-1"
                  style={{ color: primaryColor }}
                >
                  ← Back to Store Home
                </Link>
              </div>
            </article>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
              <p className="text-muted-foreground text-sm mb-6">The page you requested is not published or does not exist.</p>
              <Link to="/stores/$slug" params={{ slug }} className="text-xs font-semibold hover:underline" style={{ color: primaryColor }}>
                Back to Store Home
              </Link>
            </div>
          )}
        </div>
      ) : (
        /* ── HOMEPAGE VIEW ────────────────────────────────────────────────── */
        <div className="flex-1 flex flex-col">
          {/* Hero */}
          <div
            className="relative overflow-hidden shrink-0"
            style={{
              background: bannerUrl
                ? `url(${bannerUrl}) center/cover no-repeat`
                : `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
              minHeight: "320px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {bannerUrl && <div className="absolute inset-0 bg-black/50" />}
            <div className="relative z-10 text-center px-6 py-16 max-w-2xl mx-auto">
              {logoUrl && (
                <div
                  className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl mx-auto mb-5"
                  style={{ background: cardBg }}
                >
                  <img src={logoUrl} className="w-full h-full object-cover" alt={storeName} />
                </div>
              )}
              <h1
                className="text-3xl sm:text-4xl font-extrabold text-white mb-3"
                style={{ fontFamily }}
              >
                {heroTitle}
              </h1>
              <p className="text-white/85 text-base sm:text-lg mb-6 leading-relaxed max-w-xl mx-auto">
                {heroSubtitle}
              </p>
              <a
                href="#products"
                className="inline-block px-7 py-3 rounded-full font-semibold text-white transition hover:opacity-90 active:scale-95 shadow-lg"
                style={{ background: buttonColor }}
              >
                {ctaText}
              </a>
            </div>
          </div>

          {/* Categories Strip */}
          <div className="border-b py-4 bg-muted/20">
            <div className="max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto">
              <span className="text-xs font-bold text-muted-foreground shrink-0 uppercase tracking-wider">
                Categories:
              </span>
              {["All Products", "New Arrivals", "Best Sellers", "Sale"].map((cat) => (
                <span
                  key={cat}
                  className="px-3 py-1 rounded-full text-xs font-medium border shrink-0 bg-white"
                  style={{
                    color: primaryColor,
                    borderColor: primaryColor + "30",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div id="products" className="mx-auto max-w-7xl w-full px-6 py-12 flex-1">
            <h2
              className="text-2xl font-bold mb-6"
              style={{ color: primaryColor, fontFamily }}
            >
              Our Products
            </h2>

            {productsError ? (
              <div className="rounded-xl border border-dashed p-12 text-center" style={{ borderColor: primaryColor + "40", color: mutedColor }}>
                <p>Unable to load products right now. Please try again later.</p>
              </div>
            ) : productsLoading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => <ProductSkeleton key={i} />)}
              </div>
            ) : !products || products.length === 0 ? (
              <div
                className="rounded-xl border border-dashed p-12 text-center"
                style={{ borderColor: primaryColor + "40", color: mutedColor }}
              >
                <div className="text-5xl mb-3">📦</div>
                <p className="font-semibold text-lg mb-1">No products yet</p>
                <p className="text-sm">
                  {isOwnerPreview
                    ? "Add your first product from your seller dashboard."
                    : "This store hasn't added any products yet. Check back soon!"}
                </p>
                {isOwnerPreview && (
                  <Link
                    to="/seller/products"
                    className="inline-block mt-4 px-5 py-2.5 rounded-full font-semibold text-white text-sm"
                    style={{ background: primaryColor }}
                  >
                    + Add Product
                  </Link>
                )}
              </div>
            ) : (
              <div
                className="grid grid-cols-2 gap-4"
                style={{
                  gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                }}
              >
                {products.map((p) => (
                  <div key={p.id} className={cardClasses[cardStyle] || cardClasses.shadow} style={{ background: cardBg, borderColor: primaryColor + "20" }}>
                    <ProductCard p={p} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* About store section */}
          {themeSettings?.about_title && themeSettings?.about_text && (
            <div className="py-16 border-t mt-12 bg-black/5" style={{ background: primaryColor + "05" }}>
              <div className="max-w-2xl mx-auto text-center px-6">
                <h2 className="text-2xl font-bold mb-4" style={{ fontFamily }}>{themeSettings.about_title}</h2>
                <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: mutedColor }}>
                  {themeSettings.about_text}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        className="border-t mt-auto"
        style={{ background: primaryColor + "15", borderColor: primaryColor + "30" }}
      >
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} className="h-8 w-8 rounded-lg object-cover" alt={storeName} />
            ) : (
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{ background: primaryColor }}
              >
                {storeInitial}
              </div>
            )}
            <span className="font-semibold text-sm" style={{ color: textColor }}>
              {storeName}
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            <SocialIcon href={themeSettings?.social_instagram || ""} label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={themeSettings?.social_twitter || ""} label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={themeSettings?.social_facebook || ""} label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={themeSettings?.social_tiktok || ""} label="TikTok">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.26 8.26 0 004.83 1.55V6.84a4.85 4.85 0 01-1.06-.15z" />
              </svg>
            </SocialIcon>
          </div>

          <p className="text-xs" style={{ color: mutedColor }}>
            {footerText}
          </p>
        </div>
      </footer>
    </div>
  );
}
