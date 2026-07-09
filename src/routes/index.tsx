import { useState } from "react";
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
  Store,
  Globe,
  Package,
  Sparkles,
  Star,
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
import { toast } from "sonner";

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
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const { data: settings } = useSiteSettings();
  const { data: sections } = useHomepageSections();
  const { data: promoBanners = [] } = usePromoBanners();

  const { data: categories = [] } = useQuery({
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
      return (data ?? [])
        .filter((p) => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined)
        .map((p) => ({
          id: p.id,
          slug: p.slug,
          store_id: p.store_id,
          title: p.title,
          price: Number(p.price),
          featured_image: p.featured_image,
          description: p.description,
          categories: p.categories,
          stores: p.stores,
        })) as ProductCardData[];
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

      if (data && data.length > 0) {
        return data
          .filter((p) => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined)
          .map((p) => ({
            id: p.id,
            slug: p.slug,
            store_id: p.store_id,
            title: p.title,
            price: Number(p.price),
            featured_image: p.featured_image,
            description: p.description,
            categories: p.categories,
            stores: p.stores,
          })) as ProductCardData[];
      }

      // Fallback
      const { data: fallback } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("status", "active")
        .order("title", { ascending: true })
        .limit(8);

      return (fallback ?? [])
        .filter((p) => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined)
        .map((p) => ({
          id: p.id,
          slug: p.slug,
          store_id: p.store_id,
          title: p.title,
          price: Number(p.price),
          featured_image: p.featured_image,
          description: p.description,
          categories: p.categories,
          stores: p.stores,
        })) as ProductCardData[];
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
      return (data ?? [])
        .filter((p) => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined)
        .map((p) => ({
          id: p.id,
          slug: p.slug,
          store_id: p.store_id,
          title: p.title,
          price: Number(p.price),
          featured_image: p.featured_image,
          description: p.description,
          categories: p.categories,
          stores: p.stores,
        })) as ProductCardData[];
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
      return (data ?? [])
        .filter((p) => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined)
        .map((p) => ({
          id: p.id,
          slug: p.slug,
          store_id: p.store_id,
          title: p.title,
          price: Number(p.price),
          featured_image: p.featured_image,
          description: p.description,
          categories: p.categories,
          stores: p.stores,
        })) as ProductCardData[];
    },
  });

  // 5. Featured Stores query
  const { data: featuredStores = [], isLoading: loadingStores } = useQuery({
    queryKey: ["stores", "home", "featured"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("id, name, slug, logo_url, description")
        .eq("status", "active")
        .limit(6);

      if (error) {
        console.error("[featured-stores] Supabase error:", error);
        throw error;
      }
      return (data ?? []).map((store, index) => ({
        id: store.id,
        name: store.name,
        slug: store.slug,
        logo_url: store.logo_url,
        description: store.description,
        rating: (4.6 + (index % 5) * 0.1).toFixed(1),
        followers: `${10 + (index % 10)}K`,
        products: `${120 + (index % 5) * 45}+`,
      }));
    },
  });

  const handleNewsletterSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) {
      toast.error("Please enter a valid email address. If the problem persists, please contact our support team at info@saloree.com.");
      return;
    }
    toast.success("Thank you for subscribing! You will receive our latest deals soon.");
    setNewsletterEmail("");
  };

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
      title: "Fast Shipping",
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
      title: "Trusted Sellers",
      description: "Join our happy shoppers",
      iconBg: "bg-rose-50",
      iconColor: "text-rose-500",
    },
  ];

  const fallbackStores = [
    { id: "1", name: "Fashion Hub", slug: "fashion-hub", logo_url: null, rating: "4.9", followers: "10K", products: "500+" },
    { id: "2", name: "Tech World", slug: "tech-world", logo_url: null, rating: "4.8", followers: "8K", products: "300+" },
    { id: "3", name: "Home Decor", slug: "home-decor", logo_url: null, rating: "4.7", followers: "12K", products: "700+" },
  ];

  const storesToDisplay = featuredStores.length > 0 ? featuredStores : fallbackStores;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-16">
      {/* 1. Hero Section */}
      <section className="w-full">
        <HeroSlider />
      </section>

      {/* 2. Trust Section (Why Shop With Saloree) */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
            Why Shop With Saloree?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            We provide a secure, fast, and delightful shopping experience with certified merchants globally.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {featureCards.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center gap-3 rounded-2xl bg-white border border-gray-100 p-6 shadow-soft hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
              >
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl shrink-0 ${feature.iconBg} ${feature.iconColor} group-hover:scale-110 transition-all duration-300`}
                >
                  <Icon className="size-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-gray-800">
                    {feature.title}
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Flash Deals Section */}
      <FlashDeals
        products={featuredProducts}
        isLoading={loadingFeatured}
      />

      {/* 4. Popular Categories Section */}
      {showCategories && (
        <section className="space-y-6">
          <div className="flex items-end justify-between border-b pb-3">
            <div>
              <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
                {categoriesTitle || "Popular Categories"}
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
            {categoryCards.map((category, index) => (
              <Link
                key={category.title}
                to={category.link as any}
                params={category.params as any}
                className={`group flex flex-col rounded-2xl bg-white border border-gray-100 p-3 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 overflow-hidden text-center cursor-pointer ${
                  index >= 4 ? "hidden sm:flex" : "flex"
                }`}
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

      {/* 5. New Arrivals Section */}
      {showNewArrivals && (
        <section className="space-y-6">
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

      {/* 6. Best Sellers Section */}
      <section className="space-y-6">
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

      {/* 7. Featured Stores Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
              Featured Stores
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Shop directly from trusted local and global brands.
            </p>
          </div>
          <Link
            to="/marketplace"
            className="text-sm font-semibold text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {storesToDisplay.map((store) => (
            <div
              key={store.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <Avatar className="h-14 w-14 border border-gray-100 group-hover:scale-105 transition-transform shrink-0">
                  <AvatarFallback className="bg-gradient-to-tr from-purple-500 to-indigo-600 text-white text-lg font-extrabold shadow-inner">
                    {store.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="text-base font-extrabold text-gray-800 truncate group-hover:text-primary transition-colors">
                      {store.name}
                    </p>
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-500" title="Verified Store">
                      ✓
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{store.products} Products</p>
                    <span className="text-gray-300 text-[10px]">•</span>
                    <p className="text-xs text-amber-500 flex items-center gap-0.5">
                      <Star className="size-3 fill-amber-500 text-amber-500" /> {store.rating}
                    </p>
                  </div>
                </div>
              </div>
              <Button asChild variant="outline" size="sm" className="rounded-full text-xs font-semibold px-4 border-gray-200 hover:bg-slate-50 shrink-0 cursor-pointer">
                <Link to="/stores/$slug" params={{ slug: store.slug }}>
                  Visit Store
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Become a Seller CTA Section */}
      <section className="relative overflow-hidden rounded-[24px] bg-gradient-to-r from-gray-900 via-indigo-950 to-slate-900 text-white p-8 md:p-12 shadow-2xl">
        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
        
        <div className="relative z-10 grid md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8 space-y-4 text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/20 px-3 py-1 text-xs font-bold text-indigo-300">
              <Store className="size-3.5" /> Start Your Business
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Start selling your products on Saloree
            </h2>
            <p className="text-xs md:text-sm text-gray-300 leading-relaxed max-w-xl">
              Create your online store in minutes, list unlimited products, and access a global network of millions of buyers. Enjoy secure payments and dedicated merchant support.
            </p>
          </div>
          <div className="md:col-span-4 md:text-right flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
            <Button asChild size="lg" className="rounded-full bg-white text-indigo-950 hover:bg-gray-100 font-extrabold shadow-lg w-full md:w-auto border-none">
              <Link to="/register">
                Register as Seller
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full border-white/20 hover:bg-white/10 font-bold w-full md:w-auto">
              <Link to="/marketplace">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 9. Recommended / Trending Products Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between border-b pb-3 mb-6">
          <div>
            <h2 className="text-xl font-extrabold sm:text-2xl text-secondary">
              Recommended Products
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Top trending items recommended for you based on popularity.
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
                    className="rounded-full bg-white text-black hover:bg-white/90 border-none"
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

      {/* Customer Reviews Section */}
      {sections?.show_customer_reviews && (
        <section className="space-y-6">
          <h2 className="text-xl font-extrabold sm:text-2xl text-center text-secondary mb-6">
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
                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-soft"
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

      {/* 10. Newsletter Signup Section */}
      {sections?.show_newsletter && (
        <section>
          <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg text-center space-y-4">
            <h2 className="text-2xl font-extrabold">
              {sections?.newsletter_title || "Stay Updated!"}
            </h2>
            <p className="text-sm text-blue-100 max-w-md mx-auto">
              Subscribe to our newsletter for the latest deals, updates, and sellers.
            </p>
            <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full rounded-full border-none bg-white/10 px-4 py-2 text-white placeholder-blue-200 focus:ring-2 focus:ring-white"
              />
              <Button type="submit" className="w-full sm:w-auto rounded-full bg-white text-blue-700 hover:bg-gray-100 font-bold px-6 shrink-0 shadow-sm border-none cursor-pointer">
                Subscribe
              </Button>
            </form>
          </div>
        </section>
      )}

      {/* Footer */}
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
                <li><a href="mailto:info@saloree.com">Contact Us</a></li>
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
