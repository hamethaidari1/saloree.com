import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Store as StoreIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/lib/locale";
import { StoreAvatar } from "@/components/StoreAvatar";

type TopPick = {
  id: string;
  slug: string | null;
  title: string;
  price: number;
  compare_price: number | null;
  featured_image: string | null;
};

/**
 * Sticky left sidebar: a compact "Top Picks" list and a promo tile for the
 * platform's real top-performing store. Picks are ranked by real discount
 * size where one exists; since no product currently has a real markdown,
 * this falls back to the most recently listed active products rather than
 * inventing a discount-based ranking.
 */
export function HomeSidebar() {
  const { formatPrice } = useLocale();

  const { data: picks = [], isLoading: picksLoading } = useQuery({
    queryKey: ["home-sidebar-top-picks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, slug, title, price, compare_price, featured_image, created_at")
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(20);
      if (error) {
        console.error("[HomeSidebar] Supabase error:", error);
        throw error;
      }
      const rows = (data ?? []) as (TopPick & { created_at: string })[];
      const withDiscount = rows.map((r) => {
        const hasDiscount = typeof r.compare_price === "number" && r.compare_price > r.price;
        const discountPct = hasDiscount
          ? ((r.compare_price as number) - r.price) / (r.compare_price as number)
          : 0;
        return { ...r, discountPct };
      });
      return withDiscount.sort((a, b) => b.discountPct - a.discountPct).slice(0, 5);
    },
  });

  const { data: topStore, isLoading: storeLoading } = useQuery({
    queryKey: ["home-sidebar-top-store"],
    queryFn: async () => {
      const { data: stores } = await supabase
        .from("stores")
        .select("id, name, slug, logo_url, category")
        .eq("status", "published");
      if (!stores || stores.length === 0) return null;

      const { data: products } = await supabase
        .from("products")
        .select("store_id")
        .in(
          "store_id",
          stores.map((s) => s.id),
        )
        .eq("status", "active");

      const counts: Record<string, number> = {};
      for (const p of products ?? []) counts[p.store_id] = (counts[p.store_id] || 0) + 1;

      const ranked = stores
        .map((s) => ({ ...s, count: counts[s.id] || 0 }))
        .sort((a, b) => b.count - a.count);
      return ranked[0] && ranked[0].count > 0 ? ranked[0] : null;
    },
  });

  return (
    <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">
      <div className="rounded-xl border border-[var(--color-hairline)] bg-white overflow-hidden">
        <div className="border-b border-[var(--color-hairline)] px-4 py-3">
          <h2 className="font-heading text-sm font-bold text-[var(--color-ink)]">Top Picks</h2>
        </div>
        <ul>
          {picksLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-3">
                  <div className="size-12 shrink-0 animate-pulse rounded-md bg-[var(--color-surface-alt)]" />
                  <div className="flex-1 space-y-1.5">
                    <div className="h-3 w-full animate-pulse rounded bg-[var(--color-surface-alt)]" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-[var(--color-surface-alt)]" />
                  </div>
                </li>
              ))
            : picks.map((pick) => {
                const hasDiscount =
                  typeof pick.compare_price === "number" && pick.compare_price > pick.price;
                return (
                  <li
                    key={pick.id}
                    className="border-t border-[var(--color-hairline)] first:border-t-0"
                  >
                    <Link
                      to="/products/$slug"
                      params={{ slug: pick.slug || pick.id }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-[var(--color-surface-alt)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-inset"
                    >
                      <span className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-md border border-[var(--color-hairline)] bg-white">
                        {pick.featured_image ? (
                          <img
                            src={pick.featured_image}
                            alt={pick.title}
                            className="h-full w-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-[9px] text-[var(--color-text-muted)]">
                            No image
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-[var(--color-ink)]">
                          {pick.title}
                        </span>
                        <span className="mt-0.5 flex items-baseline gap-1.5">
                          <span className="text-sm font-bold text-[var(--color-brand)] tabular-nums">
                            {formatPrice(Number(pick.price))}
                          </span>
                          {hasDiscount && (
                            <span className="text-[11px] text-[var(--color-text-muted)] tabular-nums line-through">
                              {formatPrice(Number(pick.compare_price))}
                            </span>
                          )}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
        </ul>
      </div>

      {storeLoading ? (
        <div className="h-28 animate-pulse rounded-xl bg-[var(--color-surface-alt)]" />
      ) : (
        topStore && (
          <Link
            to="/stores/$slug"
            params={{ slug: topStore.slug }}
            className="group block rounded-xl border border-[var(--color-hairline)] bg-[var(--color-brand-surface)] p-5 text-white transition-colors hover:border-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            <p className="text-[10px] font-bold tracking-wider text-white/60">Top-rated seller</p>
            <div className="mt-3 flex items-center gap-3">
              <StoreAvatar
                name={topStore.name}
                logoUrl={topStore.logo_url}
                className="size-11 shrink-0 border border-white/20"
                textClassName="text-sm"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate font-heading text-sm font-bold">{topStore.name}</p>
                <p className="text-[11px] text-white/60">
                  {topStore.category || <StoreIcon className="inline size-3" />}
                </p>
              </div>
            </div>
            <span className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-white/80 group-hover:text-white">
              Visit store
              <ArrowRight className="size-3.5" />
            </span>
          </Link>
        )
      )}
    </aside>
  );
}
