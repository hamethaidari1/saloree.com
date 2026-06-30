import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type ProductCardData = {
  id: string;
  slug?: string | null;
  store_id: string;
  title: string;
  price: number;
  featured_image: string | null;
  description?: string | null;
  categories?: { name: string; slug?: string | null } | null;
  stores?: { name: string; slug?: string | null; logo_url?: string | null } | null;
};

export function ProductCard({ p }: { p: ProductCardData }) {
  if (!p) return null;
  const cart = useCart();
  const { formatPrice, language } = useLocale();
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  const productSlug = p.slug || p.id;
  const productTitle = p.title || "Untitled product";
  const categoryName = p.categories?.name || "Uncategorized";
  const storeName = p.stores?.name || "Unknown store";
  const productImage = p.featured_image || null;
  const storeSlug = p.stores?.slug || undefined;

  // Generate a deterministic rating based on product ID
  const rating = useMemo(() => {
    let sum = 0;
    for (let i = 0; i < p.id.length; i++) {
      sum += p.id.charCodeAt(i);
    }
    return (4.0 + (sum % 11) * 0.1).toFixed(1);
  }, [p.id]);

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
      <div className="group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-soft hover:shadow-md transition-all duration-300">
        {/* Product Image Section */}
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <Link to="/products/$slug" params={{ slug: productSlug }} className="block h-full w-full">
            {productImage ? (
              <img
                src={productImage}
                alt={productTitle}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="grid h-full place-items-center text-xs text-muted-foreground">
                No image
              </div>
            )}
          </Link>
          
          {/* Quick View Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto">
            <Button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="bg-white/90 text-black hover:bg-white backdrop-blur-md rounded-full shadow-lg gap-2 text-xs font-semibold px-4 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300"
            >
              <Eye className="size-4" /> Quick View
            </Button>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-1 flex-col gap-1.5 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{categoryName}</p>
          <Link to="/products/$slug" params={{ slug: productSlug }} className="block">
            <h3 className="line-clamp-2 text-sm font-semibold transition-colors hover:text-primary min-h-[40px] leading-snug">
              {productTitle}
            </h3>
          </Link>
          
          {storeSlug ? (
            <Link
              to="/stores/$slug"
              params={{ slug: storeSlug }}
              className="truncate text-xs text-muted-foreground hover:text-primary transition-colors inline-block"
            >
              {storeName}
            </Link>
          ) : (
            <p className="truncate text-xs text-muted-foreground">{storeName}</p>
          )}

          {/* Price & Rating */}
          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-base font-bold text-secondary">{formatPrice(Number(p.price))}</span>
            <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star className="size-3 fill-amber-500 text-amber-500" /> {rating}
            </span>
          </div>

          {/* Action Button Group */}
          <div className="mt-3 flex gap-2">
            <Button
              type="button"
              className="flex-1 rounded-full text-xs font-semibold"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-1.5 size-3.5" /> {t("add_to_cart", language)}
            </Button>
            
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="rounded-full border-gray-200 hover:bg-slate-50 shrink-0 lg:hidden"
              onClick={() => setQuickViewOpen(true)}
              title="Quick View"
            >
              <Eye className="size-4 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-2xl w-[90vw] rounded-2xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-2">
            {/* Image display */}
            <div className="aspect-square bg-muted flex items-center justify-center p-6 border-r border-slate-100">
              {productImage ? (
                <img
                  src={productImage}
                  alt={productTitle}
                  className="max-h-full max-w-full object-contain rounded-lg shadow-sm"
                />
              ) : (
                <div className="text-xs text-muted-foreground">No image available</div>
              )}
            </div>

            {/* Info details */}
            <div className="flex flex-col p-6 max-h-[80vh] overflow-y-auto">
              <DialogHeader className="p-0 text-left">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{categoryName}</p>
                <DialogTitle className="text-xl font-bold leading-tight mt-1 text-secondary">
                  {productTitle}
                </DialogTitle>
              </DialogHeader>

              <div className="flex items-center gap-4 mt-2">
                {storeSlug ? (
                  <Link
                    to="/stores/$slug"
                    params={{ slug: storeSlug }}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => setQuickViewOpen(false)}
                  >
                    by <span className="font-semibold">{storeName}</span>
                  </Link>
                ) : (
                  <p className="text-sm text-muted-foreground">by <span className="font-semibold">{storeName}</span></p>
                )}
                
                <span className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                  <Star className="size-3 fill-amber-500 text-amber-500" /> {rating} Rating
                </span>
              </div>

              <div className="mt-4 text-2xl font-extrabold text-secondary">
                {formatPrice(Number(p.price))}
              </div>

              {p.description && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {p.description}
                  </p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t flex flex-col sm:flex-row gap-3">
                <Button
                  type="button"
                  className="flex-1 rounded-full py-6 font-bold shadow-lg"
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
