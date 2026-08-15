import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { CategoryMedia, formatCategoryItemCount, homeCategoryItems } from "@/lib/home-categories";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useHomepageSections } from "@/hooks/useHomepageSections";
import { usePromoBanners } from "@/hooks/usePromoBanners";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FlashDeals } from "@/components/FlashDeals";

import { HomeHero } from "@/components/home/HomeHero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { TrustFeatures } from "@/components/home/TrustFeatures";
import { SeeTheDifference } from "@/components/home/SeeTheDifference";
import { PopularStores } from "@/components/home/PopularStores";
import { BrandPartners } from "@/components/home/BrandPartners";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { MobileBottomNav } from "@/components/home/MobileBottomNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saloree — Discover Premium Products & Exclusive Marketplace Deals" },
      {
        name: "description",
        content: "Discover top products from trusted independent sellers at the best prices on Saloree.",
      },
      { property: "og:title", content: "Saloree — Global Multi-Vendor Marketplace" },
      {
        property: "og:description",
        content: "Discover top products from trusted independent sellers at the best prices.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { language } = useLocale();
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const { data: settings } = useSiteSettings();
  const { data: sections } = useHomepageSections();
  const { data: promoBanners = [] } = usePromoBanners();

  // 1. New Arrivals query (Real active Supabase products)
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
        .limit(12);

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
  const { data: featuredStores = [], isLoading: loadingStores, isError: storesError } = useQuery({
    queryKey: ["stores", "home", "featured"],
    queryFn: async () => {
      const { data: stores, error: fetchError } = await supabase
        .from("stores")
        .select("id, name, slug, logo_url, description, status, updated_at, created_at, category, location")
        .eq("status", "published")
        .limit(6);

      if (fetchError) {
        console.error("[featured-stores] Supabase error:", fetchError);
        throw fetchError;
      }

      if (!stores || stores.length === 0) return [];

      const storeIds = stores.map((s) => s.id);

      // Get product counts for these stores
      const { data: products, error: productsError } = await supabase
        .from("products")
        .select("store_id")
        .in("store_id", storeIds)
        .eq("status", "active");

      if (productsError) {
        console.error("[featured-stores-products] Supabase error:", productsError);
        throw productsError;
      }

      const productCounts = (products ?? []).reduce(
        (acc, p) => {
          acc[p.store_id] = (acc[p.store_id] || 0) + 1;
          return acc;
        },
        {} as Record<string, number>,
      );

      const mappedStores = stores.map((store) => ({
        id: store.id,
        name: store.name,
        slug: store.slug,
        logo_url: store.logo_url,
        description: store.description,
        category: store.category,
        location: store.location,
        updated_at: store.updated_at || store.created_at,
        productCount: productCounts[store.id] || 0,
        rating: null,
        is_verified: false,
      }));

      return mappedStores.sort((a, b) => {
        if (b.productCount !== a.productCount) {
          return b.productCount - a.productCount;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
    },
  });

  function ProductGridSkeleton() {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-soft animate-pulse"
          >
            <div className="aspect-[4/5] w-full rounded-xl bg-slate-200" />
            <div className="mt-3 h-3 w-1/2 rounded bg-slate-200" />
            <div className="mt-2 h-4 w-3/4 rounded bg-slate-200" />
            <div className="mt-4 flex items-center justify-between pt-2 border-t">
              <div className="h-4 w-1/3 rounded bg-slate-200" />
              <div className="h-4 w-1/4 rounded bg-slate-200" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  function ProductGridEmptyState() {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-slate-50">
        <Package className="h-10 w-10 text-slate-400" />
        <h3 className="mt-3 text-base font-bold text-slate-900">No products available</h3>
        <p className="mt-1 text-xs text-slate-500 max-w-xs leading-relaxed">
          We couldn't find any active products right now. Check back soon!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full pb-16 lg:pb-0 bg-white min-h-screen">
      {/* 1. Hero Banner & Flash Sale Promotional Band */}
      <HomeHero />

      {/* 2. Shop by Category (Bento & Circular layout) */}
      <ShopByCategory />

      {/* 3. Shopping Benefits / Trust Features */}
      <TrustFeatures />

      {/* 4. Flash Deals Section (From origin/main) */}
      <FlashDeals
        products={featuredProducts}
        isLoading={loadingFeatured}
      />

      {/* 5. New Arrivals Section (Real Supabase Products) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              {sections?.new_arrivals_title || "New Arrivals"}
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">
              Fresh drops, just for you
            </p>
          </div>
          <Link
            to="/marketplace"
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#E11D48] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {loadingNewArrivals ? (
          <ProductGridSkeleton />
        ) : newArrivals.length === 0 ? (
          <ProductGridEmptyState />
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {newArrivals.slice(0, 6).map((p) => (
              <ProductCard key={`new-${p.id}`} p={p} />
            ))}
          </div>
        )}
      </section>

      {/* 6. See the Difference (Editorial Section) */}
      <SeeTheDifference />

      {/* 7. Popular Stores (Real Supabase Stores & Product Thumbnails) */}
      <PopularStores />

      {/* 8. Brand Partners Bar */}
      <BrandPartners />

      {/* 9. Newsletter Section */}
      <NewsletterSection />

      {/* 10. Mobile Bottom Fixed Navigation */}
      <MobileBottomNav />
    </div>
  );
}
