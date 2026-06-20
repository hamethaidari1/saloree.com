import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Truck, Tag, Headphones, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { useSiteSettings, useHomepageSections, usePromoBanners } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saloree — Shop everything you need, all in one place" },
      {
        name: "description",
        content: "Discover top products from trusted sellers at the best prices on Saloree.",
      },
      { property: "og:title", content: "Saloree — Shop everything in one place" },
      {
        property: "og:description",
        content: "Discover top products from trusted sellers at the best prices.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const shouldReduceMotion = useReducedMotion();
  const { language } = useLocale();

  const { data: settings } = useSiteSettings();
  const { data: sections } = useHomepageSections();
  const { data: promoBanners = [] } = usePromoBanners();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) {
        console.error("[home-categories] Supabase error:", error);
        throw error;
      }
      return data ?? [];
    },
  });

  const { data: products } = useQuery({
    queryKey: ["products", "home", "active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) {
        console.error("[home-products] Supabase error:", error);
        throw error;
      }

      return (data ?? []) as ProductCardData[];
    },
  });

  const newArrivals = (products ?? []).slice(0, 6);
  const featuredProducts = [...(products ?? [])]
    .sort((a, b) => Number(Boolean(b.featured_image)) - Number(Boolean(a.featured_image)))
    .slice(0, 6);

  const heroTitle = settings?.hero_title || t("hero_title", language);
  const heroSubtitle = settings?.hero_subtitle || t("hero_subtitle", language);
  const heroButtonText = settings?.hero_button_text || t("hero_cta", language);
  const heroButtonLink = settings?.hero_button_link || "/marketplace";

  const showCategories = sections?.show_categories ?? true;
  const showNewArrivals = sections?.show_new_arrivals ?? true;
  const showFeatured = sections?.show_featured ?? true;

  const categoriesTitle = sections?.categories_title || t("shop_by_category", language);
  const newArrivalsTitle = sections?.new_arrivals_title || t("new_arrivals", language);
  const featuredTitle = sections?.featured_title || t("featured_products", language);

  const activeBanners = promoBanners.filter((b) => b.is_enabled);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      {/* Hero + sidebar */}
      <section className="grid gap-4 lg:grid-cols-[260px_1fr]">
        <aside className="hidden rounded-lg border bg-card p-2 lg:block">
          <ul className="text-sm">
            {(categories ?? []).slice(0, 8).map((c) => (
              <li key={c.id}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className="flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-accent"
                >
                  <span className="font-medium">{c.name}</span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
            <li className="mt-1 border-t pt-2">
              <Link
                to="/marketplace"
                className="flex items-center justify-between rounded-md px-3 py-2.5 font-semibold text-primary hover:bg-primary-soft"
              >
                View all categories <ArrowRight className="size-4" />
              </Link>
            </li>
          </ul>
        </aside>

        <div className="relative overflow-hidden rounded-[28px] border border-rose-100/80 bg-[linear-gradient(135deg,_rgba(255,245,247,0.98),_rgba(254,242,242,0.96)_40%,_rgba(255,228,230,0.92)_100%)] shadow-[0_28px_90px_rgba(244,63,94,0.12)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(255,255,255,0)_36%),radial-gradient(circle_at_bottom_right,_rgba(251,113,133,0.12),_rgba(251,113,133,0)_28%)]" />
          <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:gap-10 lg:p-12">
            <div className="max-w-xl lg:max-w-none">
              <motion.p
                className="text-sm font-semibold uppercase tracking-[0.32em] text-primary"
                initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                New Collection
              </motion.p>
              <motion.h1
                className="mt-3 text-3xl font-extrabold leading-tight text-secondary sm:text-4xl lg:text-5xl"
                initial={shouldReduceMotion ? false : { opacity: 0, x: -36 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
              >
                {heroTitle}
              </motion.h1>
              <motion.p
                className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
              >
                {heroSubtitle}
              </motion.p>
              <motion.div
                className="mt-6 inline-flex"
                animate={
                  shouldReduceMotion
                    ? { scale: 1 }
                    : { scale: [1, 1.03, 1, 1.04, 1], y: [0, -1, 0, -1, 0] }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
                }
              >
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-primary px-6 shadow-[0_16px_35px_rgba(239,68,68,0.28)]"
                >
                  <Link to={heroButtonLink as any} className="inline-flex items-center gap-2">
                    {heroButtonText}
                    <motion.span
                      className="inline-flex"
                      animate={shouldReduceMotion ? { x: 0 } : { x: [0, 5, 0, 6, 0] }}
                      transition={
                        shouldReduceMotion
                          ? undefined
                          : { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
                      }
                    >
                      <ArrowRight className="size-4" />
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </div>

            <div className="min-w-0 lg:min-h-[420px]">
              <HeroSlider />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mt-6 grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: ShieldCheck, t: "Secure Shopping", s: "Your data is always protected" },
          { Icon: Truck, t: "Fast Delivery", s: "Get your order at your door" },
          { Icon: Tag, t: "Best Prices", s: "Enjoy amazing discounts" },
          { Icon: Headphones, t: "24/7 Support", s: "We're here to help you" },
        ].map(({ Icon, t: titleText, s }) => (
          <div key={titleText} className="flex items-center gap-3 rounded-md p-2">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{titleText}</p>
              <p className="truncate text-xs text-muted-foreground">{s}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Promo Banners */}
      {activeBanners.length > 0 && (
        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {activeBanners.map((banner) => (
            <div
              key={banner.id}
              className="relative overflow-hidden rounded-2xl border bg-card shadow-soft hover:shadow-md transition-all duration-300 group h-48"
            >
              <img
                src={banner.image_url}
                alt={banner.banner_text}
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6">
                <p className="text-base font-bold text-white leading-snug drop-shadow-md">
                  {banner.banner_text}
                </p>
                <div className="mt-3">
                  <Button
                    asChild
                    size="sm"
                    className="rounded-full bg-white text-black hover:bg-white/90"
                  >
                    <Link to={banner.button_link as any}>{banner.button_text || "Shop Now"}</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Categories */}
      {showCategories && (
        <section className="mt-10 hidden lg:block">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">{categoriesTitle}</h2>
            <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {(categories ?? []).map((c) => (
              <Link
                key={c.id}
                to="/categories/$slug"
                params={{ slug: c.slug }}
                className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center shadow-card transition hover:border-primary hover:shadow-md"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-xl font-bold text-primary">
                  {c.name.charAt(0)}
                </div>
                <span className="text-xs font-medium">{c.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* New arrivals */}
      {showNewArrivals && (
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">{newArrivalsTitle}</h2>
            <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {newArrivals.map((p) => (
              <ProductCard key={`new-${p.id}`} p={p} />
            ))}
            {products && products.length === 0 && (
              <p className="col-span-full rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                No products available yet.
              </p>
            )}
          </div>
        </section>
      )}

      {/* Featured products */}
      {showFeatured && (
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">{featuredTitle}</h2>
            <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
            {featuredProducts.map((p) => (
              <ProductCard key={`featured-${p.id}`} p={p} />
            ))}
            {products && products.length === 0 && (
              <p className="col-span-full rounded-md border border-dashed p-8 text-center text-sm text-muted-foreground">
                No products available yet.
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
