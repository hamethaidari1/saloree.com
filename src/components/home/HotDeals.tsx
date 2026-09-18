import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Flame, ArrowRight, Clock } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

interface HotDealsProps {
  products: ProductCardData[];
  isLoading?: boolean;
}

function useCountdown(targetIso: string | null | undefined) {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    if (!targetIso) {
      setRemaining(null);
      return;
    }
    const target = new Date(targetIso).getTime();
    if (Number.isNaN(target)) {
      setRemaining(null);
      return;
    }
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetIso]);

  return remaining;
}

/**
 * "Hot Deals" grid. The countdown reads a real end timestamp from
 * site_settings.homepage_settings (an admin-configurable JSON field) rather
 * than a hardcoded client-side timer — if no real flash-sale end time is
 * currently set, the countdown is simply not shown, instead of faking one.
 */
export function HotDeals({ products, isLoading }: HotDealsProps) {
  const { data: settings } = useSiteSettings();
  // Cast: `homepage_settings` is a real jsonb column on the live site_settings
  // table, but it isn't in the (stale) generated Supabase types.
  const settingsAny = settings as unknown as { homepage_settings?: Record<string, unknown> } | null;
  const homepageSettings = (settingsAny?.homepage_settings ?? {}) as {
    flash_sale_ends_at?: string;
    flash_sale_label?: string;
  };
  const remaining = useCountdown(homepageSettings.flash_sale_ends_at);
  const hasActiveCountdown = remaining !== null && remaining > 0;

  const hours = hasActiveCountdown ? Math.floor(remaining / 3600000) : 0;
  const minutes = hasActiveCountdown ? Math.floor((remaining % 3600000) / 60000) : 0;
  const seconds = hasActiveCountdown ? Math.floor((remaining % 60000) / 1000) : 0;

  if (isLoading) {
    return (
      <section className="py-6">
        <div className="mb-6 h-6 w-40 animate-pulse rounded bg-[var(--color-surface-alt)]" />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface-alt)]"
            />
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-[var(--color-brand)]/10 text-[var(--color-brand)]">
            <Flame className="size-4.5" />
          </span>
          <h2 className="font-heading text-2xl font-bold text-[var(--color-ink)]">
            {homepageSettings.flash_sale_label || "Hot Deals"}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {hasActiveCountdown && (
            <div className="flex items-center gap-2 rounded-lg bg-[var(--color-surface-alt)] px-3 py-1.5 text-xs font-semibold text-[var(--color-ink)]">
              <Clock className="size-3.5 text-[var(--color-gold)]" />
              <span>Ends in</span>
              <span className="flex items-center gap-1 font-heading tabular-nums text-[var(--color-gold)]">
                <span>{String(hours).padStart(2, "0")}</span>:
                <span>{String(minutes).padStart(2, "0")}</span>:
                <span>{String(seconds).padStart(2, "0")}</span>
              </span>
            </div>
          )}
          <Link
            to="/marketplace"
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] rounded-sm"
          >
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {products.slice(0, 8).map((product) => (
          <ProductCard key={product.id} p={product} />
        ))}
      </div>
    </section>
  );
}
