import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Package, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

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
      return (data ?? []).filter(
        (p) => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined,
      ) as ProductCardData[];
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

      {/* 4. New Arrivals Section (Real Supabase Products) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
              New Arrivals
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

      {/* 5. See the Difference (Editorial Section) */}
      <SeeTheDifference />

      {/* 6. Popular Stores (Real Supabase Stores & Product Thumbnails) */}
      <PopularStores />

      {/* 7. Brand Partners Bar */}
      <BrandPartners />

      {/* 8. Newsletter Section */}
      <NewsletterSection />

      {/* 9. Mobile Bottom Fixed Navigation */}
      <MobileBottomNav />
    </div>
  );
}
