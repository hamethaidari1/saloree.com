import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Eye, PackageCheck, PackageX, Heart, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export type ProductCardData = {
  id: string;
  slug?: string | null;
  store_id: string;
  title: string;
  price: number;
  compare_price?: number | null;
  featured_image: string | null;
  description?: string | null;
  status?: string | null;
  created_at?: string;
  stock?: number | null;
  rating?: number | null;
  review_count?: number | null;
  categories?: { name: string; slug?: string | null } | null;
  stores?: { name: string; slug?: string | null; logo_url?: string | null } | null;
};

const NEW_WINDOW_DAYS = 14;

/** Dense marketplace product card, reused across every product grid on the site. */
export function ProductCard({ p }: { p: ProductCardData | null | undefined }) {
  // Hooks must run unconditionally on every render, so the null-guard for a
  // missing product lives after them (see the early return below) rather
  // than before, per the rules of hooks.
  const cart = useCart();
  const wishlist = useWishlist();
  const { formatPrice, language } = useLocale();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const isNew = useMemo(() => {
    if (!p?.created_at) return false;
    const created = new Date(p.created_at).getTime();
    if (Number.isNaN(created)) return false;
    const ageDays = (Date.now() - created) / (1000 * 60 * 60 * 24);
    return ageDays >= 0 && ageDays <= NEW_WINDOW_DAYS;
  }, [p?.created_at]);

  const rawStock = p?.stock;
  const stock = typeof rawStock === "number" ? rawStock : null;
  const stockBadge = useMemo(() => {
    if (stock === null) return null;
    if (stock <= 0) return { label: "Out of stock", tone: "muted" as const };
    if (stock <= 5) return { label: `Only ${stock} left`, tone: "gold" as const };
    return { label: "In stock", tone: "success" as const };
  }, [stock]);

  // Only a real discount (compare_price genuinely above price) ever produces
  // a ribbon — never an invented percentage.
  const discountPercent = useMemo(() => {
    const price = p?.price;
    const comparePrice = p?.compare_price;
    if (typeof price !== "number" || typeof comparePrice !== "number") return null;
    if (!(comparePrice > price)) return null;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  }, [p?.price, p?.compare_price]);

  if (!p) return null;

  const productSlug = p.slug || p.id;
  const productTitle = p.title || "Untitled product";
  const categoryName = p.categories?.name || "Uncategorized";
  const storeName = p.stores?.name || "Unknown store";
  const productImage = p.featured_image || null;
  const storeSlug = p.stores?.slug || undefined;
  const isWishlisted = wishlist.has(p.id);

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    wishlist.toggle(p.id);
  };

  const handleAddToCart = () => {
    cart.add({
      product_id: p.id,
      slug: productSlug,
      store_id: p.store_id,
      store_name: storeName,
      title: productTitle,
      price: Number(p.price),
      featured_image: productImage,
    });
    toast.success("Added to cart");
  };

  return (
    <>
      <div className="product-card group relative flex h-full flex-col overflow-hidden rounded-lg border border-[var(--color-hairline)] bg-[var(--color-surface)] transition-shadow duration-200 hover:shadow-md">
        {/* Product Image */}
        <div className="relative aspect-square w-full overflow-hidden bg-white p-3">
          <Link
            to="/products/$slug"
            params={{ slug: productSlug }}
            className="block h-full w-full rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2"
          >
            {productImage ? (
              <img
                src={productImage}
                alt={productTitle}
                loading="lazy"
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="grid h-full place-items-center text-xs text-[var(--color-text-muted)] font-medium">
                No image available
              </div>
            )}
          </Link>

          {discountPercent !== null ? (
            <span className="absolute top-2 left-2 bg-[var(--color-brand)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded tabular-nums">
              -{discountPercent}%
            </span>
          ) : (
            isNew && (
              <span className="absolute top-2 left-2 bg-[var(--color-brand-surface)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                New
              </span>
            )
          )}

          <button
            type="button"
            onClick={handleToggleWishlist}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            aria-pressed={isWishlisted}
            className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-white/90 text-[var(--color-ink)] shadow-sm hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-1"
          >
            <Heart
              className={`size-3.5 ${isWishlisted ? "fill-[var(--color-brand)] text-[var(--color-brand)]" : ""}`}
            />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-1 p-3">
          <Link
            to="/products/$slug"
            params={{ slug: productSlug }}
            className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
          >
            <h3 className="line-clamp-2 min-h-[2.6em] text-[13px] leading-snug font-medium text-[var(--color-ink)] hover:text-[var(--color-brand)] transition-colors">
              {productTitle}
            </h3>
          </Link>

          {typeof p.review_count === "number" && p.review_count > 0 && (
            <div className="flex items-center gap-1 text-[11px] text-[var(--color-text-muted)]">
              <span className="flex items-center text-[var(--color-gold)]">
                <Star className="size-3 fill-[var(--color-gold)] text-[var(--color-gold)]" />
              </span>
              <span className="font-bold text-[var(--color-ink)] tabular-nums">
                {Number(p.rating || 5).toFixed(1)}
              </span>
              <span className="tabular-nums">({p.review_count})</span>
            </div>
          )}

          <div className="mt-1 flex items-end justify-between gap-2">
            <span className="flex items-baseline gap-1.5 min-w-0">
              <span className="font-sans text-base font-bold text-[var(--color-brand)] tabular-nums">
                {formatPrice(Number(p.price))}
              </span>
              {discountPercent !== null && (
                <span className="font-sans text-xs text-[var(--color-text-muted)] tabular-nums line-through">
                  {formatPrice(Number(p.compare_price))}
                </span>
              )}
            </span>
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => setQuickViewOpen(true)}
                aria-label={`Quick view ${productTitle}`}
                className="grid size-7 place-items-center text-[var(--color-text-muted)] hover:text-[var(--color-ink)] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)]"
              >
                <Eye className="size-4" />
              </button>
              <button
                type="button"
                onClick={handleAddToCart}
                aria-label={`Add ${productTitle} to cart`}
                className="grid size-7 place-items-center rounded-md bg-[var(--color-brand)] text-white hover:bg-[var(--color-brand-dark)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-1"
              >
                <ShoppingCart className="size-3.5" />
              </button>
            </div>
          </div>

          {stockBadge && (
            <span
              className={`inline-flex w-fit items-center gap-1 text-[10px] font-semibold tabular-nums ${
                stockBadge.tone === "success"
                  ? "text-[var(--success)]"
                  : stockBadge.tone === "gold"
                    ? "text-[var(--color-gold)]"
                    : "text-[var(--color-text-muted)]"
              }`}
            >
              {stockBadge.tone === "muted" ? (
                <PackageX className="size-3" />
              ) : (
                <PackageCheck className="size-3" />
              )}
              {stockBadge.label}
            </span>
          )}

          {storeSlug ? (
            <Link
              to="/stores/$slug"
              params={{ slug: storeSlug }}
              className="mt-auto pt-1 truncate text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors"
            >
              {storeName}
            </Link>
          ) : (
            <span className="mt-auto pt-1 truncate text-[11px] text-[var(--color-text-muted)]">
              {storeName}
            </span>
          )}
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-2xl w-[90vw] rounded-2xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="aspect-square bg-white flex items-center justify-center p-6 border-r border-[var(--color-hairline)]">
              {productImage ? (
                <img
                  src={productImage}
                  alt={productTitle}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <div className="text-xs text-[var(--color-text-muted)]">No image available</div>
              )}
            </div>

            <div className="flex flex-col p-6 max-h-[80vh] overflow-y-auto">
              <DialogHeader className="p-0 text-left">
                <p className="font-heading text-xs font-bold tracking-wider text-[var(--color-brand)]">
                  {categoryName}
                </p>
                <DialogTitle className="text-xl font-bold leading-tight mt-1 text-[var(--color-ink)]">
                  {productTitle}
                </DialogTitle>
              </DialogHeader>

              <div className="flex items-center gap-4 mt-2">
                {storeSlug ? (
                  <Link
                    to="/stores/$slug"
                    params={{ slug: storeSlug }}
                    className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-brand)] transition-colors"
                    onClick={() => setQuickViewOpen(false)}
                  >
                    by <span className="font-semibold text-[var(--color-ink)]">{storeName}</span>
                  </Link>
                ) : (
                  <p className="text-sm text-[var(--color-text-muted)]">
                    by <span className="font-semibold text-[var(--color-ink)]">{storeName}</span>
                  </p>
                )}

                {stockBadge && (
                  <span
                    className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      stockBadge.tone === "success"
                        ? "text-[var(--success)] bg-[var(--success)]/10"
                        : stockBadge.tone === "gold"
                          ? "text-[var(--color-gold)] bg-[var(--color-gold)]/10"
                          : "text-[var(--color-text-muted)] bg-[var(--color-surface-alt)]"
                    }`}
                  >
                    {stockBadge.label}
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-[var(--color-brand)] tabular-nums">
                  {formatPrice(Number(p.price))}
                </span>
                {discountPercent !== null && (
                  <>
                    <span className="text-base text-[var(--color-text-muted)] tabular-nums line-through">
                      {formatPrice(Number(p.compare_price))}
                    </span>
                    <span className="text-xs font-bold text-white bg-[var(--color-brand)] px-1.5 py-0.5 rounded tabular-nums">
                      -{discountPercent}%
                    </span>
                  </>
                )}
              </div>

              {p.description && (
                <div className="mt-4 border-t border-[var(--color-hairline)] pt-4">
                  <h4 className="font-heading text-xs font-bold text-[var(--color-text-muted)] tracking-wider mb-2">
                    Description
                  </h4>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t border-[var(--color-hairline)] flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  className="flex-1 rounded-full py-6 font-bold shadow-lg bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)]"
                  onClick={() => {
                    handleAddToCart();
                    setQuickViewOpen(false);
                  }}
                >
                  <ShoppingCart className="mr-2 size-5" /> {t("add_to_cart", language)}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-full py-6 font-semibold"
                  asChild
                >
                  <Link
                    to="/products/$slug"
                    params={{ slug: productSlug }}
                    onClick={() => setQuickViewOpen(false)}
                  >
                    View Details
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
