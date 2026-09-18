import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getCategoryIcon } from "@/lib/category-icons";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

const PRODUCT_SELECT =
  "id, slug, store_id, title, price, compare_price, featured_image, stock, created_at, description, stores(name, slug, logo_url), categories(name, slug)";

/**
 * Spotlights whichever real category currently has the most active listings.
 * The brief also calls for a row of real subcategory chips above the grid —
 * the categories table has no subcategory/parent relationship in this
 * database, so that row is omitted rather than filled with invented chips.
 */
export function CategorySpotlight() {
  const { data } = useQuery({
    queryKey: ["home-category-spotlight"],
    queryFn: async () => {
      const { data: categories } = await supabase.from("categories").select("id, name, slug");
      const { data: products } = await supabase
        .from("products")
        .select("category_id")
        .eq("status", "active");

      const counts: Record<string, number> = {};
      for (const p of products ?? []) {
        if (p.category_id) counts[p.category_id] = (counts[p.category_id] || 0) + 1;
      }

      const topCategory = (categories ?? [])
        .map((c) => ({ ...c, count: counts[c.id] || 0 }))
        .sort((a, b) => b.count - a.count)[0];

      if (!topCategory || topCategory.count === 0) return null;

      const { data: categoryProducts, error } = await supabase
        .from("products")
        .select(PRODUCT_SELECT)
        .eq("status", "active")
        .eq("category_id", topCategory.id)
        .order("created_at", { ascending: false })
        .limit(8);

      if (error) {
        console.error("[CategorySpotlight] Supabase error:", error);
        throw error;
      }

      return {
        category: topCategory,
        products: (categoryProducts ?? []).map((p) => ({
          ...p,
          price: Number(p.price),
        })) as ProductCardData[],
      };
    },
  });

  if (!data || data.products.length === 0) return null;

  const Icon = getCategoryIcon(data.category.slug || data.category.name);

  return (
    <section className="bg-[var(--color-surface-alt)] py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-white border border-[var(--color-hairline)] text-[var(--color-ink)]">
              <Icon className="size-5" />
            </span>
            <div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-[var(--color-ink)]">
                {data.category.name}
              </h2>
              <p className="text-xs text-[var(--color-text-muted)]">Our most active category</p>
            </div>
          </div>
          <Link
            to="/categories/$slug"
            params={{ slug: data.category.slug }}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-sm"
          >
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {data.products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
