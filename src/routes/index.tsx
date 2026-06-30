import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { FlashDeals } from "@/components/FlashDeals";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Tag,
  Headphones,
  ArrowRight,
  Check,
  Store,
  Globe,
  Package,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { HeroSlider } from "@/components/HeroSlider";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useHomepageSections } from "@/hooks/useHomepageSections";
import { usePromoBanners } from "@/hooks/usePromoBanners";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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
      return (data ?? []).filter((p): p is ProductCardData => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined) as ProductCardData[];
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

      if (data && data.length > 0) return data.filter((p): p is ProductCardData => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined) as ProductCardData[];

      // Fallback
      const { data: fallback } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("status", "active")
        .order("title", { ascending: true })
        .limit(8);
      return (fallback ?? []).filter((p): p is ProductCardData => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined) as ProductCardData[];
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
      return (data ?? []).filter((p): p is ProductCardData => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined) as ProductCardData[];
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
      return (data ?? []).filter((p): p is ProductCardData => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined) as ProductCardData[];
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

  const showCategories = sections?.show_categories ?? true;
  const showNewArrivals = sections?.show_new_arrivals ?? true;
  const showFeatured = sections?.show_featured ?? true;

  const categoriesTitle = sections?.categories_title || t("shop_by_category", language);
  const newArrivalsTitle = sections?.new_arrivals_title || t("new_arrivals", language);
  const featuredTitle = sections?.featured_title || t("featured_products", language);

  const activeBanners = promoBanners.filter((b) => b.is_enabled);

  // Curated category items matching requirement: Electronics, Fashion, Home & Living, Beauty, Sports, Books, Gaming, Automotive
  const categoryCards = [
    {
      title: "Electronics",
      count: "12,340+ Items",
      link: "/categories/$slug",
      params: { slug: "electronics" },
      image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Fashion",
      count: "18,250+ Items",
      link: "/categories/$slug",
      params: { slug: "fashion" },
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Home & Living",
      count: "9,120+ Items",
      link: "/categories/$slug",
      params: { slug: "home-living" },
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Beauty",
      count: "6,780+ Items",
      link: "/categories/$slug",
      params: { slug: "beauty" },
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Sports",
      count: "7,540+ Items",
      link: "/categories/$slug",
      params: { slug: "sports" },
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Books",
      count: "3,110+ Items",
      link: "/categories/$slug",
      params: { slug: "books" },
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Gaming",
      count: "5,420+ Items",
      link: "/categories/$slug",
      params: { slug: "gaming" },
      image: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=300&q=80",
    },
    {
      title: "Automotive",
      count: "4,950+ Items",
      link: "/categories/$slug",
      params: { slug: "automotive" },
      image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=300&q=80",
    },
  ];

  // 5 Feature Cards matching: Secure Payments, Fast Worldwide Shipping, Easy Returns, 24/7 Customer Support, Trusted by Millions
  const featureCards = [
    {
      icon: ShieldCheck,
      title: "Secure Payments",
      description: "100% protection for payments",
      iconBg: "bg-emerald-50",
      iconColor: "text-emerald-500",
    },
    {
      icon: Truck,
      title: "Worldwide Shipping",
      description: "Free shipping over $50",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-500",
    },
    {
      icon: Tag,
      title: "Easy Returns",
      description: "30-day hassle-free refund",
      iconBg: "bg-amber-50",
      iconColor: "text-amber-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "We're here to help anytime",
      iconBg: "bg-purple-50",
      iconColor: "text-purple-500",
    },
    {
      icon: Sparkles,
      title: "Trusted by Millions",
      description: "Join our happy shoppers",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-12">
      {/* Premium Full-Width Hero Slider Section */}
      <section className="w-full">
        <HeroSlider />
      </section>
      <FlashDeals
        products={featuredProducts}
        isLoading={loadingFeatured}
      />



      {/* Premium Curated Category Cards Section */}
      {showCategories && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b pb-3">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
                {categoriesTitle || "Shop by Category"}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Explore our curated collections of top premium categories.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="text-sm font-semibold text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categoryCards.map((category) => (
              <Link
                key={category.title}
                to={category.link as any}
                params={category.params as any}
                className="group flex flex-col rounded-2xl bg-white border border-gray-100 p-3 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 overflow-hidden text-center cursor-pointer"
              >
                <div className="relative w-full aspect-square rounded-xl bg-gray-50 overflow-hidden mb-3">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-800 group-hover:text-primary transition-colors truncate">
                  {category.title}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-semibold">
                  {category.count}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Five Premium Service Feature Cards */}
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {featureCards.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="flex items-center gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-soft hover:shadow-md transition-all duration-300 hover:-translate-y-1 group"
            >
              <div
                className={`grid h-12 w-12 place-items-center rounded-xl shrink-0 ${feature.iconBg} ${feature.iconColor} group-hover:scale-105 transition-transform duration-200`}
              >
                <Icon className="size-6" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold text-gray-800 truncate">
                  {feature.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-snug">
                  {feature.description}
                </p>
              </div>
            </div>
          );
        })}
      </section>

      {/* How It Works Section */}
      {sections?.show_how_it_works && (
        <section className="py-6 border-y border-gray-100">
          <h2 className="text-xl font-bold sm:text-2xl text-center">
            {sections?.how_it_works_title || "How It Works"}
          </h2>
          <div className="mt-8 flex flex-col items-center space-y-8 md:flex-row md:justify-around md:space-y-0">
            {[
              { step: 1, title: "Create Store", description: "Sign up and set up your shop." },
              { step: 2, title: "Upload Products", description: "Add your items with ease." },
              { step: 3, title: "Start Selling", description: "Reach customers and grow." },
            ].map((item) => (
              <div key={item.step} className="text-center max-w-xs">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-white shadow-lg shadow-red-500/10">
                  {item.step}
                </div>
                <h3 className="mt-4 text-base font-bold">{item.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Promo Banners */}
      {activeBanners.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                    <Link to={banner.button_link as any}>
                      {banner.button_text || "Shop Now"}
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* 1. New Arrivals */}
      {showNewArrivals && (
        <section>
          <div className="flex items-end justify-between border-b pb-3 mb-6">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
                {newArrivalsTitle}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Explore our latest products and additions.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="text-sm font-semibold text-primary hover:underline"
            >
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
      )}

      {/* 2. Featured Products */}
      {showFeatured && (
        <section>
          <div className="flex items-end justify-between border-b pb-3 mb-6">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
                {featuredTitle}
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Handpicked premium products chosen for you.
              </p>
            </div>
            <Link
              to="/marketplace"
              className="text-sm font-semibold text-primary hover:underline"
            >
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
      )}

      {/* 3. Trending Products */}
      <section>
        <div className="flex items-end justify-between border-b pb-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
              {sections?.trending_products_title || "Trending Products"}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              See what is popular in our community right now.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-sm font-semibold text-primary hover:underline"
          >
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
      <section>
        <div className="flex items-end justify-between border-b pb-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
              {sections?.top_sellers_title || "Best Sellers"}
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Our top-rated products with verified purchases.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-sm font-semibold text-primary hover:underline"
          >
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

      {/* Flash Sale Section */}
      {sections?.flash_sale_enabled && (
        <section>
          <h2 className="text-xl font-bold sm:text-2xl">
            {sections?.flash_sale_title || "Flash Sale"}
          </h2>
          <div className="mt-4 rounded-2xl border bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-card">
            <p className="text-sm uppercase tracking-wide font-semibold">Limited Time Offer</p>
            <h3 className="mt-2 text-3xl font-extrabold">Up to 50% Off!</h3>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="text-base font-bold">Ends in: 00h 00m 00s</div>
              <div className="h-2 w-32 rounded-full bg-white/30 overflow-hidden">
                <div className="h-full w-1/2 rounded-full bg-white" />
              </div>
              <p className="text-xs">Only 50 left!</p>
            </div>
            <Button className="mt-6 rounded-full bg-white text-primary hover:bg-gray-100 font-bold px-6">
              Shop Flash Sale
            </Button>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {sections?.show_statistics && (
        <section>
          <h2 className="text-xl font-bold sm:text-2xl text-center mb-6">
            {sections?.statistics_title || "Our Global Reach"}
          </h2>
          <div className="grid grid-cols-2 gap-6 rounded-2xl bg-gradient-to-r from-primary to-red-400 p-8 text-white shadow-card md:grid-cols-4">
            {[
              { value: "1M+", label: "Products" },
              { value: "120K+", label: "Customers" },
              { value: "25K+", label: "Stores" },
              { value: "150+", label: "Countries" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-extrabold">{stat.value}</p>
                <p className="text-xs uppercase tracking-wider font-semibold mt-1 opacity-90">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Top Sellers (Stores) Section */}
      {sections?.show_top_sellers && (
        <section>
          <h2 className="text-xl font-bold sm:text-2xl mb-6">
            {sections?.top_sellers_title || "Top Sellers"}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Fashion Hub", rating: 4.9, followers: "10K", products: "500+" },
              { name: "Tech World", rating: 4.8, followers: "8K", products: "300+" },
              { name: "Home Decor", rating: 4.7, followers: "12K", products: "700+" },
            ].map((seller) => (
              <div
                key={seller.name}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-card p-4 shadow-soft"
              >
                <Avatar className="h-14 w-14">
                  <AvatarFallback className="bg-secondary text-white text-lg font-bold">
                    {seller.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-base font-bold">{seller.name}</p>
                  <p className="text-xs text-muted-foreground">Rating: {seller.rating}</p>
                  <Button variant="outline" size="sm" className="mt-2 rounded-full text-xs font-semibold px-4">
                    Visit Store
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Brands Section */}
      {sections?.show_featured_brands && (
        <section>
          <h2 className="text-xl font-bold sm:text-2xl mb-6">
            {sections?.featured_brands_title || "Featured Brands"}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {["Nike", "Apple", "Samsung", "Sony", "Adidas", "Zara"].map((brand) => (
              <div
                key={brand}
                className="flex items-center justify-center rounded-xl border border-gray-100 bg-card p-4 shadow-soft transition duration-300 hover:border-primary hover:shadow-md cursor-pointer"
              >
                <span className="text-base font-bold text-gray-700">{brand}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Why Saloree Section */}
      {sections?.show_why_saloree && (
        <section className="py-6">
          <h2 className="text-xl font-bold sm:text-2xl text-center">
            {sections?.why_saloree_title || "Why Saloree?"}
          </h2>
          <p className="text-center text-xs text-muted-foreground mt-1 mb-8">
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
                  className="rounded-2xl border border-gray-100 bg-card p-6 text-center shadow-soft hover:shadow-md transition duration-300"
                >
                  <Icon className="mx-auto mb-4 h-12 w-12 text-primary" />
                  <h3 className="text-base font-bold">{item.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Customer Reviews Section */}
      {sections?.show_customer_reviews && (
        <section>
          <h2 className="text-xl font-bold sm:text-2xl text-center mb-6">
            {sections?.customer_reviews_title || "What Our Customers Say"}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              <div
                key={review.name}
                className="rounded-2xl border border-gray-100 bg-card p-6 shadow-soft"
              >
                <div className="flex items-center mb-4">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarFallback className="bg-accent text-accent-foreground font-bold">
                      {review.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-bold">{review.name}</p>
                    <div className="flex text-yellow-500 text-xs mt-0.5">
                      {"★".repeat(review.rating)}
                      {"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  "{review.review}"
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Mobile App Download Section */}
      {sections?.show_mobile_app && (
        <section>
          <div className="flex flex-col items-center justify-between rounded-2xl border border-gray-100 bg-card p-8 shadow-soft md:flex-row md:space-x-8">
            <div className="text-center md:text-left space-y-2">
              <h2 className="text-xl font-extrabold sm:text-2xl">
                {sections?.mobile_app_title || "Download Our Mobile App"}
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                Shop on the go, anytime, anywhere. Receive notifications on orders and discounts.
              </p>
              <div className="mt-4 flex justify-center space-x-4 md:justify-start">
                <Button className="rounded-full font-bold px-6 text-xs h-10 shadow-sm">
                  App Store
                </Button>
                <Button variant="outline" className="rounded-full font-bold px-6 text-xs h-10 shadow-sm">
                  Google Play
                </Button>
              </div>
            </div>
            <div className="mt-8 md:mt-0 relative shrink-0">
              <div className="h-44 w-28 rounded-2xl bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-semibold border-2 border-gray-200 shadow-inner">
                Phone Mockup
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter Section */}
      {sections?.show_newsletter && (
        <section>
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg text-center space-y-4">
            <h2 className="text-2xl font-extrabold">
              {sections?.newsletter_title || "Stay Updated!"}
            </h2>
            <p className="text-sm text-blue-100 max-w-md mx-auto">
              Subscribe to our newsletter for the latest deals, updates, and sellers.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                className="w-full rounded-full border-none bg-white/10 px-4 py-2 text-white placeholder-blue-200 focus:ring-2 focus:ring-white"
              />
              <Button className="w-full sm:w-auto rounded-full bg-white text-blue-700 hover:bg-gray-100 font-bold px-6 shrink-0 shadow-sm">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Double rendering footer bypass conditional - original check */}
      {sections?.show_footer && (
        <footer className="mt-10 bg-secondary text-white py-10 rounded-2xl overflow-hidden px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <span className="text-lg font-bold tracking-tight">saloree</span>
              <p className="text-xs text-gray-400">Build. Sell. Grow.</p>
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-4">
                Marketplace
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>Shop All</li>
                <li>Categories</li>
                <li>Brands</li>
                <li>Flash Sale</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-4">
                Support
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>Help Center</li>
                <li>Shipping</li>
                <li>Returns</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-xs text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Terms of Service</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
            © 2026 Saloree. All rights reserved.
          </div>
        </footer>
      )}
    </div>
  );
}
