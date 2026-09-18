import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Horizontal row of circular category thumbnails. The `categories` table has
 * no image column today, so every circle currently renders as a clean --ink
 * badge with the category's initial — never a stock photo standing in for a
 * real image that doesn't exist. If an `image_url` column is added later,
 * this component will use it automatically.
 */
export function CategoryCircles() {
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["home-category-circles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) {
        console.error("[CategoryCircles] Supabase error:", error);
        throw error;
      }
      return (data ?? []) as Array<{
        id: string;
        name: string;
        slug: string;
        image_url?: string | null;
      }>;
    },
  });

  if (!isLoading && categories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex gap-5 overflow-x-auto no-scrollbar">
        {isLoading
          ? Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex shrink-0 flex-col items-center gap-2">
                <div className="size-16 animate-pulse rounded-full bg-[var(--color-surface-alt)]" />
                <div className="h-3 w-12 animate-pulse rounded bg-[var(--color-surface-alt)]" />
              </div>
            ))
          : categories.map((cat) => (
              <Link
                key={cat.id}
                to="/categories/$slug"
                params={{ slug: cat.slug }}
                className="group flex shrink-0 flex-col items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
              >
                {cat.image_url ? (
                  <span className="size-16 overflow-hidden rounded-full border border-[var(--color-hairline)]">
                    <img
                      src={cat.image_url}
                      alt={cat.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>
                ) : (
                  <span className="grid size-16 place-items-center rounded-full bg-[var(--color-brand-surface)] font-heading text-lg font-bold text-white transition-transform duration-300 group-hover:scale-105">
                    {cat.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <span className="max-w-[80px] truncate text-center font-heading text-xs font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-brand)]">
                  {cat.name}
                </span>
              </Link>
            ))}
      </div>
    </section>
  );
}
