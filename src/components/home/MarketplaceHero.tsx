import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Store as StoreIcon, LayoutGrid } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { usePromoBanners } from "@/hooks/usePromoBanners";
import { getCategoryIcon } from "@/lib/category-icons";
import { StoreAvatar } from "@/components/StoreAvatar";

/**
 * Two-part marketplace hero:
 *  - Main banner (2/3 width): if an admin has published an active promo
 *    banner (Content Manager → promo_banners), it drives the banner. There
 *    is none live today, so this falls back to the real hero copy already
 *    configured in site_settings, illustrated with real product photography
 *    — never a fabricated discount/urgency claim.
 *  - Right column: two tiles spotlighting the real top category and the real
 *    top store, ranked by actual active-product counts.
 */
export function MarketplaceHero() {
  const { data: settings } = useSiteSettings();
  const { data: promoBannersRaw = [] } = usePromoBanners();
  // Cast: the generated Supabase types for promo_banners are stale relative
  // to the live table (which actually uses title/subtitle/is_active columns).
  type LivePromoBannerRow = {
    image_url?: string | null;
    title?: string | null;
    subtitle?: string | null;
    button_text?: string | null;
    button_link?: string | null;
    display_order?: number | null;
    is_active?: boolean | null;
  };
  const promoBanners = promoBannersRaw as unknown as LivePromoBannerRow[];
  const sortedActivePromos = promoBanners
    .filter((b) => b.is_active)
    .sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0));
  const activePromo = sortedActivePromos[0];
  // Any additional real promos become the right-hand tiles instead of the
  // top-category/top-store fallback — sized to however many actually exist.
  const otherPromos = sortedActivePromos.slice(1, 3);

  const { data } = useQuery({
    queryKey: ["home-hero-spotlight"],
    queryFn: async () => {
      const [{ data: categories }, { data: stores }, { data: products }] = await Promise.all([
        supabase.from("categories").select("id, name, slug"),
        supabase
          .from("stores")
          .select("id, name, slug, logo_url, category")
          .eq("status", "published"),
        supabase
          .from("products")
          .select("id, category_id, store_id, featured_image, title, created_at")
          .eq("status", "active")
          .order("created_at", { ascending: false }),
      ]);

      const activeProducts = products ?? [];

      const categoryCounts: Record<string, number> = {};
      const storeCounts: Record<string, number> = {};
      for (const p of activeProducts) {
        if (p.category_id) categoryCounts[p.category_id] = (categoryCounts[p.category_id] || 0) + 1;
        storeCounts[p.store_id] = (storeCounts[p.store_id] || 0) + 1;
      }

      const topCategory = (categories ?? [])
        .map((c) => ({ ...c, count: categoryCounts[c.id] || 0 }))
        .sort((a, b) => b.count - a.count)[0];

      const topStore = (stores ?? [])
        .map((s) => ({ ...s, count: storeCounts[s.id] || 0 }))
        .sort((a, b) => b.count - a.count)[0];

      const showcaseImages = activeProducts
        .map((p) => p.featured_image)
        .filter((url): url is string => !!url)
        .slice(0, 4);

      return {
        topCategory: topCategory && topCategory.count > 0 ? topCategory : null,
        topStore: topStore && topStore.count > 0 ? topStore : null,
        showcaseImages,
        totalActiveProducts: activeProducts.length,
        totalCategories: (categories ?? []).length,
      };
    },
  });

  const heroTitle =
    activePromo?.title || settings?.hero_title || "Everything you need, all in one place";
  const heroSubtitle =
    activePromo?.subtitle ||
    settings?.hero_subtitle ||
    "Discover products from trusted independent sellers.";
  const heroButtonText = activePromo?.button_text || settings?.hero_button_text || "Shop Now";
  const heroButtonLink = activePromo?.button_link || settings?.hero_button_link || "/marketplace";

  const CategoryIcon = data?.topCategory
    ? getCategoryIcon(data.topCategory.slug || data.topCategory.name)
    : LayoutGrid;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-2">
      <div className="grid gap-4 lg:grid-cols-3 lg:h-[300px]">
        {/* Main promotional banner */}
        <div className="relative lg:col-span-2 h-[220px] sm:h-[260px] lg:h-full overflow-hidden rounded-xl bg-[var(--color-brand-surface)] text-white flex items-center">
          {activePromo?.image_url && (
            <>
              <img
                src={activePromo.image_url}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-brand-surface)] via-[var(--color-brand-surface)]/70 to-transparent" />
            </>
          )}
          <div className="relative z-10 flex-1 min-w-0 px-6 sm:px-10 py-6">
            {!activePromo?.image_url && data && data.totalActiveProducts > 0 && (
              <span className="inline-block mb-3 text-[10px] font-bold tracking-wider text-white/70 bg-white/10 px-2.5 py-1 rounded-full tabular-nums">
                {data.totalActiveProducts} products · {data.totalCategories} categories
              </span>
            )}
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight max-w-md">
              {heroTitle}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/70 max-w-sm leading-relaxed">
              {heroSubtitle}
            </p>
            <Link
              to={heroButtonLink as never}
              className="mt-6 inline-flex items-center gap-2 bg-[var(--color-brand)] text-white px-6 py-3 rounded-lg text-sm font-bold hover:bg-[var(--color-brand-dark)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-brand-surface)]"
            >
              <span>{heroButtonText}</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Real product showcase */}
          {!activePromo?.image_url && data && data.showcaseImages.length > 0 && (
            <div className="hidden sm:grid relative z-10 shrink-0 grid-cols-2 gap-2 pr-6 lg:pr-10">
              {data.showcaseImages.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  className="size-20 lg:size-24 rounded-lg bg-white overflow-hidden border border-white/10"
                >
                  <img src={src} alt="" className="h-full w-full object-contain p-1.5" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right column: real additional promos, or the top category + top store as a fallback */}
        {otherPromos.length > 0 ? (
          <div
            className={`grid gap-4 h-[220px] sm:h-[260px] lg:h-full ${otherPromos.length > 1 ? "grid-rows-2" : "grid-rows-1"}`}
          >
            {otherPromos.map((promo, i) => (
              <Link
                key={i}
                to={(promo.button_link || "/marketplace") as never}
                className="group relative flex-1 overflow-hidden rounded-xl border border-[var(--color-hairline)] bg-[var(--color-brand-surface)] text-white flex items-end p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              >
                {promo.image_url && (
                  <>
                    <img
                      src={promo.image_url}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-brand-surface)] via-[var(--color-brand-surface)]/40 to-transparent" />
                  </>
                )}
                <div className="relative z-10 min-w-0">
                  <p className="truncate font-heading text-sm font-bold">{promo.title}</p>
                  {promo.subtitle && (
                    <p className="truncate text-[11px] text-white/70">{promo.subtitle}</p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="grid grid-rows-2 gap-4 h-[220px] sm:h-[260px] lg:h-full">
            <Link
              to={data?.topCategory ? "/categories/$slug" : "/marketplace"}
              params={data?.topCategory ? { slug: data.topCategory.slug } : undefined}
              className="group relative flex items-center gap-3 rounded-xl border border-[var(--color-hairline)] bg-[var(--color-surface-alt)] px-5 py-4 transition-colors hover:border-[var(--color-ink)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-[var(--color-ink)] border border-[var(--color-hairline)]">
                <CategoryIcon className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold tracking-wider text-[var(--color-text-muted)]">
                  Top category
                </p>
                <p className="truncate font-heading text-sm font-bold text-[var(--color-ink)]">
                  {data?.topCategory ? data.topCategory.name : "Browse categories"}
                </p>
                {data?.topCategory && (
                  <p className="text-[11px] text-[var(--color-text-muted)] tabular-nums">
                    {data.topCategory.count} product{data.topCategory.count === 1 ? "" : "s"}
                  </p>
                )}
              </div>
              <ArrowRight className="size-4 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] transition-colors" />
            </Link>

            <Link
              to={data?.topStore ? "/stores/$slug" : "/stores"}
              params={data?.topStore ? { slug: data.topStore.slug } : undefined}
              className="group relative flex items-center gap-3 rounded-xl border border-[var(--color-hairline)] bg-white px-5 py-4 transition-colors hover:border-[var(--color-ink)]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
            >
              {data?.topStore ? (
                <StoreAvatar
                  name={data.topStore.name}
                  logoUrl={data.topStore.logo_url}
                  className="size-11 shrink-0 border border-[var(--color-hairline)]"
                  textClassName="text-sm"
                />
              ) : (
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[var(--color-surface-alt)] text-[var(--color-ink)] border border-[var(--color-hairline)]">
                  <StoreIcon className="size-5" />
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-bold tracking-wider text-[var(--color-text-muted)]">
                  Top store
                </p>
                <p className="truncate font-heading text-sm font-bold text-[var(--color-ink)]">
                  {data?.topStore ? data.topStore.name : "Explore stores"}
                </p>
                {data?.topStore && (
                  <p className="text-[11px] text-[var(--color-text-muted)] tabular-nums">
                    {data.topStore.count} product{data.topStore.count === 1 ? "" : "s"}
                  </p>
                )}
              </div>
              <ArrowRight className="size-4 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-brand)] transition-colors" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
