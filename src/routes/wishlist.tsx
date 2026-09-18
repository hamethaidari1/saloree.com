import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Heart, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  head: () => ({ meta: [{ title: "My Wishlist — Saloree" }] }),
  component: WishlistPage,
});

function WishlistPage() {
  const { items, loading: wishlistLoading } = useWishlist();
  const productIds = items.map((i) => i.product_id);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["wishlist-products", productIds],
    enabled: !wishlistLoading && productIds.length > 0,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, stock, created_at, description, stores(name, slug, logo_url), categories(name, slug)",
        )
        .in("id", productIds);
      if (error) {
        console.error("[wishlist] Supabase error:", error);
        throw error;
      }
      return (data ?? []) as ProductCardData[];
    },
  });

  const loading = wishlistLoading || isLoading;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-bold text-[var(--color-ink)]">My Wishlist</h1>
        <p className="mt-1 text-sm text-[var(--color-text-muted)]">
          Products you've saved for later.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="aspect-[3/4] animate-pulse rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface-alt)]"
            />
          ))}
        </div>
      ) : productIds.length === 0 || products.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-[var(--color-hairline)] p-16 text-center">
          <Heart className="size-10 text-[var(--color-text-muted)]" />
          <h3 className="mt-3 text-base font-bold text-[var(--color-ink)]">
            Your wishlist is empty
          </h3>
          <p className="mt-1 max-w-xs text-xs leading-relaxed text-[var(--color-text-muted)]">
            Tap the heart on any product to save it here for later.
          </p>
          <Link
            to="/marketplace"
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[var(--color-brand-surface)] px-4 py-2.5 text-xs font-bold text-white hover:bg-[var(--color-brand)] transition-colors"
          >
            <Package className="size-4" />
            Browse the marketplace
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );
}
