import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion, useReducedMotion } from "framer-motion";
import { ShieldCheck, Truck, Tag, Headphones, ArrowRight, Check, Store, Globe, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { NewHeader } from "@/components/NewHeader";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useHomepageSections } from "@/hooks/useHomepageSections";
import { usePromoBanners } from "@/hooks/usePromoBanners";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/Logo";

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

  // 1. New Arrivals query
  const { data: newArrivals = [], isLoading: loadingNewArrivals } = useQuery({
    queryKey: ["products", "home", "new-arrivals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) {
        console.error("[new-arrivals] Supabase error:", error);
        throw error;
      }
      return (data ?? []) as ProductCardData[];
    },
  });

  // 2. Featured Products query
  const { data: featuredProducts = [], isLoading: loadingFeatured } = useQuery({
    queryKey: ["products", "home", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("status", "active")
        .not("featured_image", "is", null)
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) {
        console.error("[featured-products] Supabase error:", error);
        throw error;
      }

      if (data && data.length > 0) return data as ProductCardData[];

      // Fallback
      const { data: fallback } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("status", "active")
        .order("title", { ascending: true })
        .limit(8);
      return (fallback ?? []) as ProductCardData[];
    },
  });

  // 3. Trending Products query
  const { data: trendingProducts = [], isLoading: loadingTrending } = useQuery({
    queryKey: ["products", "home", "trending"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("status", "active")
        .order("stock", { ascending: true })
        .limit(8);

      if (error) {
        console.error("[trending-products] Supabase error:", error);
        throw error;
      }
      return (data ?? []) as ProductCardData[];
    },
  });

  // 4. Best Sellers query
  const { data: bestSellers = [], isLoading: loadingBestSellers } = useQuery({
    queryKey: ["products", "home", "best-sellers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("status", "active")
        .order("price", { ascending: false })
        .limit(8);

      if (error) {
        console.error("[best-sellers] Supabase error:", error);
        throw error;
      }
      return (data ?? []) as ProductCardData[];
    },
  });

  function ProductGridSkeleton() {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col rounded-xl border bg-card p-4 shadow-soft animate-pulse">
            <div className="aspect-square w-full rounded-lg bg-slate-200" />
            <div className="mt-4 h-4 w-2/3 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-1/2 rounded bg-slate-200" />
            <div className="mt-2 h-3 w-1/3 rounded bg-slate-200" />
            <div className="mt-4 flex items-center justify-between">
              <div className="h-5 w-1/4 rounded bg-slate-200" />
              <div className="h-4 w-1/6 rounded bg-slate-200" />
            </div>
            <div className="mt-4 flex gap-2">
              <div className="h-9 flex-1 rounded bg-slate-200" />
              <div className="h-9 w-9 rounded bg-slate-200 shrink-0" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ProductGridEmptyState() {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center">
        <Package className="h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-semibold">No products found</h3>
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">
          We couldn't find any products in this section right now. Please check back later.
        </p>
      </div>
    );
  }

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
                NEW GENERATION MARKETPLACE
              </motion.p>
              <motion.h1
                className="mt-3 text-3xl font-extrabold leading-tight text-secondary sm:text-4xl lg:text-5xl"
                initial={shouldReduceMotion ? false : { opacity: 0, x: -36 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.08 }}
              >
                Shop Smarter.
                <br />
                Sell Better.
              </motion.h1>
              <motion.p
                className="mt-4 max-w-md text-sm text-muted-foreground sm:text-base"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
              >
                Launch your store, discover millions of products and grow globally with Saloree
                Marketplace.
              </motion.p>
              <motion.div
                className="mt-6 flex flex-col gap-4 sm:flex-row"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.28 }}
              >
                <Button asChild size="lg" className="rounded-full px-6 shadow-lg">
                  <Link to="/marketplace">Start Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-6">
                  <Link to="/seller">Become Seller</Link>
                </Button>
              </motion.div>
              <motion.div
                className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.38 }}
              >
                <span className="flex items-center gap-1">
                  <Check className="size-4 text-green-500" /> Secure Payment
                </span>
                <span className="flex items-center gap-1">
                  <Check className="size-4 text-green-500" /> Fast Delivery
                </span>
                <span className="flex items-center gap-1">
                  <Check className="size-4 text-green-500" /> Global Sellers
                </span>
              </motion.div>
            </div>

            <HeroSlider />
          </div>
        </div>
      </section>

      {sections?.show_how_it_works && (
        <section className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl text-center">{sections?.how_it_works_title || "How It Works"}</h2>
          <div className="mt-8 flex flex-col items-center space-y-8 md:flex-row md:justify-around md:space-y-0">
            {[
              { step: 1, title: "Create Store", description: "Sign up and set up your shop." },
              { step: 2, title: "Upload Products", description: "Add your items with ease." },
              { step: 3, title: "Start Selling", description: "Reach customers and grow." }
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white shadow-lg">
                  {item.step}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Feature Strip */}
      <section className="mt-6 grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { Icon: ShieldCheck, title: "Secure Shopping", subtitle: "Your data is always protected" },
          { Icon: Truck, title: "Fast Delivery", subtitle: "Get your order at your door" },
          { Icon: Tag, title: "Best Prices", subtitle: "Enjoy amazing discounts" },
          { Icon: Headphones, title: "24/7 Support", subtitle: "We're here to help you" },
        ].map((feature) => (
          <div key={feature.title} className="flex items-center gap-3 rounded-md p-2">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
              <feature.Icon className="size-5" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold">{feature.title}</p>
              <p className="truncate text-xs text-muted-foreground">{feature.subtitle}</p>
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

      {/* 1. New Arrivals */}
      <section className="mt-12">
        <div className="flex items-end justify-between border-b pb-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">{newArrivalsTitle}</h2>
            <p className="text-xs text-muted-foreground mt-1">Explore our latest products and additions.</p>
          </div>
          <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        {loadingNewArrivals ? (
          <ProductGridSkeleton />
        ) : newArrivals.length === 0 ? (
          <ProductGridEmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={`new-${p.id}`} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* 2. Featured Products */}
      <section className="mt-12">
        <div className="flex items-end justify-between border-b pb-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">{featuredTitle}</h2>
            <p className="text-xs text-muted-foreground mt-1">Handpicked premium products chosen for you.</p>
          </div>
          <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        {loadingFeatured ? (
          <ProductGridSkeleton />
        ) : featuredProducts.length === 0 ? (
          <ProductGridEmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {featuredProducts.map((p) => (
              <ProductCard key={`featured-${p.id}`} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Trending Products */}
      <section className="mt-12">
        <div className="flex items-end justify-between border-b pb-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">{sections?.trending_products_title || "Trending Products"}</h2>
            <p className="text-xs text-muted-foreground mt-1">See what is popular in our community right now.</p>
          </div>
          <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        {loadingTrending ? (
          <ProductGridSkeleton />
        ) : trendingProducts.length === 0 ? (
          <ProductGridEmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {trendingProducts.map((p) => (
              <ProductCard key={`trending-${p.id}`} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Best Sellers */}
      <section className="mt-12">
        <div className="flex items-end justify-between border-b pb-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">{sections?.top_sellers_title || "Best Sellers"}</h2>
            <p className="text-xs text-muted-foreground mt-1">Our top-rated products with verified purchases.</p>
          </div>
          <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
            View all
          </Link>
        </div>
        {loadingBestSellers ? (
          <ProductGridSkeleton />
        ) : bestSellers.length === 0 ? (
          <ProductGridEmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {bestSellers.map((p) => (
              <ProductCard key={`best-${p.id}`} p={p} />
            ))}
          </div>
        )}
      </section>

      {sections?.flash_sale_enabled && (
        <section className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl">{sections?.flash_sale_title || "Flash Sale"}</h2>
          <div className="mt-4 rounded-lg border bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-card">
            <p className="text-sm uppercase tracking-wide">Limited Time Offer</p>
            <h3 className="mt-2 text-3xl font-bold">Up to 50% Off!</h3>
            <div className="mt-4 flex items-center space-x-4">
              <div className="text-lg font-semibold">Ends in: 00h 00m 00s</div>
              <div className="h-2 w-32 rounded-full bg-white/30">
                <div className="h-full w-1/2 rounded-full bg-white" />
              </div>
              <p className="text-sm">Only 50 left!</p>
            </div>
            <Button className="mt-6 rounded-full bg-white text-primary hover:bg-gray-100">
              Shop Flash Sale
            </Button>
          </div>
        </section>
      )}

      {sections?.show_statistics && (
        <section className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl text-center">{sections?.statistics_title || "Our Global Reach"}</h2>
          <div className="grid grid-cols-2 gap-6 rounded-lg bg-gradient-to-r from-primary to-red-400 p-8 text-white shadow-card md:grid-cols-4">
            {[
              { value: "1M+", label: "Products" },
              { value: "120K+", label: "Customers" },
              { value: "25K+", label: "Stores" },
              { value: "150+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="text-sm uppercase tracking-wide">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Popular Categories */}
      {sections?.show_categories && (
        <section className="mt-10">
          <div className="flex items-end justify-between">
            <h2 className="text-xl font-bold sm:text-2xl">{sections?.categories_title || "Popular Categories"}</h2>
            <Link to="/marketplace" className="text-sm font-semibold text-primary hover:underline">
              View all
            </Link>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {(categories ?? []).map((category) => (
              <Link
                key={category.id}
                to="/categories/$slug"
                params={{ slug: category.slug }}
                className="flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center shadow-card transition hover:border-primary hover:shadow-md"
              >
                <div className="grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-xl font-bold text-primary">
                  {category.icon || category.name.charAt(0)}
                </div>
                <span className="text-sm font-medium">{category.name}</span>
                {/* <span className="text-xs text-muted-foreground">{category.count} Products</span> */}
              </Link>
            ))}
          </div>
        </section>
      )}

      {sections?.show_top_sellers && (
        <section className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl">{sections?.top_sellers_title || "Top Sellers"}</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for Top Sellers */}
            {[
              { name: "Fashion Hub", rating: 4.9, followers: "10K", products: "500+" },
              { name: "Tech World", rating: 4.8, followers: "8K", products: "300+" },
              { name: "Home Decor", rating: 4.7, followers: "12K", products: "700+" }
            ].map((seller) => (
              <div
                key={seller.name}
                className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-card"
              >
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-secondary text-white text-lg font-bold">
                    {seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-lg font-semibold">{seller.name}</p>
                  <p className="text-sm text-muted-foreground">Rating: {seller.rating}</p>
                  <Button variant="outline" size="sm" className="mt-2">
                    Visit Store
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {sections?.show_featured_brands && (
        <section className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl">{sections?.featured_brands_title || "Featured Brands"}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {/* Placeholder for Featured Brands */}
            {["Nike", "Apple", "Samsung", "Sony", "Adidas", "Zara"].map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center rounded-lg border bg-card p-4 shadow-card transition hover:border-primary hover:shadow-md"
              >
                <span className="text-lg font-semibold">{brand}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {sections?.show_why_saloree && (
        <section className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl text-center">{sections?.why_saloree_title || "Why Saloree?"}</h2>
          <p className="text-center text-muted-foreground mb-8">
            The ultimate platform for sellers and buyers.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Build Your Store",
                description: "Create a beautiful online store in minutes.",
                icon: Store,
              },
              {
                title: "Sell Worldwide",
                description: "Reach millions of customers across the globe.",
                icon: Globe,
              },
              {
                title: "Manage Products",
                description: "Effortlessly add, update, and organize your inventory.",
                icon: Package,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-lg border bg-card p-6 text-center shadow-card"
                >
                  <Icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {sections?.show_customer_reviews && (
        <section className="mt-10">
          <h2 className="text-xl font-bold sm:text-2xl text-center">{sections?.customer_reviews_title || "What Our Customers Say"}</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for Customer Reviews */}
            {[
              {
                name: "Alice Smith",
                review: "Saloree changed how I shop online. Amazing products and sellers!",
                rating: 5,
              },
              {
                name: "Bob Johnson",
                review: "Easy to use, great support, and I found unique items.",
                rating: 4,
              },
              {
                name: "Charlie Brown",
                review: "As a seller, Saloree has been a game-changer for my business.",
                rating: 5,
              },
            ].map((review) => (
              <div key={review.name} className="rounded-lg border bg-card p-6 shadow-card">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {review.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.name}</p>
                    <div className="flex text-yellow-500">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground">"{review.review}"</p>
              </div>
            ))}
          </div>
        </section>
      )}
      {sections?.show_mobile_app && (
        <section className="mt-10">
          <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-8 shadow-card md:flex-row md:space-x-8">
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold">{sections?.mobile_app_title || "Download Our Mobile App"}</h2>
              <p className="mt-2 text-muted-foreground">
                Shop on the go, anytime, anywhere.
              </p>
              <div className="mt-6 flex justify-center space-x-4 md:justify-start">
                <Button>App Store</Button>
                <Button variant="outline">Google Play</Button>
              </div>
            </div>
            <div className="mt-8 md:mt-0">
              {/* Placeholder for phone mockup image */}
              <div className="h-48 w-32 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500">
                Phone Mockup
              </div>
            </div>
          </div>
        </section>
      )}
      {sections?.show_newsletter && (
        <section className="mt-10">
          <div className="rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white shadow-card text-center">
            <h2 className="text-3xl font-bold">{sections?.newsletter_title || "Stay Updated!"}</h2>
            <p className="mt-2 text-lg">Subscribe to our newsletter for the latest deals.</p>
            <div className="mt-6 flex justify-center">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full max-w-sm rounded-l-md border-none bg-white/20 px-4 py-2 text-white placeholder-gray-200 focus:ring-0"
              />
              <Button className="rounded-r-md bg-white text-blue-600 hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      )}
      {sections?.show_footer && (
        <footer className="mt-10 bg-secondary text-white py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Logo linked={false} imgClassName="h-10 w-auto mb-4" />
              <p className="text-sm text-gray-400">Build. Sell. Grow.</p>
              <div className="flex space-x-4 mt-4">
                {/* Social Icons Placeholder */}
                <span className="text-gray-400">FB</span>
                <span className="text-gray-400">TW</span>
                <span className="text-gray-400">IG</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Marketplace</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Shop All</li>
                <li>Categories</li>
                <li>Brands</li>
                <li>Flash Sale</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Help Center</li>
                <li>Shipping</li>
                <li>Returns</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2026 Saloree. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
}
