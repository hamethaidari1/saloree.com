import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { type ProductCardData } from "@/components/ProductCard";

import { MarketplaceHero } from "@/components/home/MarketplaceHero";
import { TrustFeatures } from "@/components/home/TrustFeatures";
import { CategoryCircles } from "@/components/home/CategoryCircles";
import { HomeSidebar } from "@/components/home/HomeSidebar";
import { HotDeals } from "@/components/home/HotDeals";
import { CategorySpotlight } from "@/components/home/CategorySpotlight";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { MobileBottomNav } from "@/components/home/MobileBottomNav";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saloree — Discover Premium Products & Exclusive Marketplace Deals" },
      {
        name: "description",
        content:
          "Discover top products from trusted independent sellers at the best prices on Saloree.",
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

const PRODUCT_SELECT =
  "id, slug, store_id, title, price, compare_price, featured_image, stock, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)";

function Index() {
  // Hot Deals grid: real active products, newest first. Discount ribbons on
  // each card only appear where compare_price genuinely exceeds price.
  const { data: dealsProducts = [], isLoading: loadingDeals } = useQuery({
    queryKey: ["products", "home", "hot-deals"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(12);

      if (error) {
        console.error("[hot-deals] Supabase error:", error);
        throw error;
      }
      return (data ?? [])
        .filter((p) => p !== null && p !== undefined && p.slug !== null && p.slug !== undefined)
        .map((p) => ({ ...p, price: Number(p.price) })) as ProductCardData[];
    },
  });

  return (
    <div className="w-full pb-16 lg:pb-0 bg-[var(--color-surface)] min-h-screen">
      {/* 1. Two-part hero: real promo/hero copy + top category + top store */}
      <MarketplaceHero />

      {/* 2. Trust row — generic, non-numeric badges (no real delivery/return thresholds exist yet) */}
      <TrustFeatures />

      {/* 3. Category circles — real categories, initials badge until real images exist */}
      <CategoryCircles />

      {/* 4. Sidebar + Hot Deals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
          <HomeSidebar />
          <div className="min-w-0">
            <HotDeals products={dealsProducts} isLoading={loadingDeals} />
            {/* No full-width site-wide promo strip: no real, live promotion exists to show. */}
          </div>
        </div>
      </div>

      {/* 5. Category spotlight — whichever real category has the most active listings */}
      <CategorySpotlight />

      {/* 6. Newsletter */}
      <NewsletterSection />

      {/* 7. Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
}
