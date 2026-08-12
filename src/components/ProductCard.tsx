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
  status?: string | null;
  created_at?: string;
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
      <div className="product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300">
        {/* Product Image Section */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100 p-3">
          <Link to="/products/$slug" params={{ slug: productSlug }} className="block h-full w-full">
            {productImage ? (
              <img
                src={productImage}
                alt={productTitle}
                loading="lazy"
                className="h-full w-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="grid h-full place-items-center text-xs text-slate-400 font-medium">
                No image available
              </div>
            )}
          </Link>
          
          {/* Top floating badge */}
          <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
            NEW
          </span>

          {/* Slide-up Quick Add button on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-slate-900 text-white hover:bg-[#E11D48] py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-1.5"
            >
              <ShoppingCart className="size-3.5" />
              <span>{t("add_to_cart", language)}</span>
            </button>
          </div>
        </div>

        {/* Content Details */}
        <div className="flex flex-1 flex-col p-4">
          {storeSlug ? (
            <Link
              to="/stores/$slug"
              params={{ slug: storeSlug }}
              className="text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:text-[#E11D48] transition-colors truncate mb-1"
            >
              {storeName}
            </Link>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 truncate mb-1">
              {storeName}
            </span>
          )}

          <Link to="/products/$slug" params={{ slug: productSlug }} className="block">
            <h3 className="line-clamp-2 text-sm font-semibold text-slate-900 hover:text-[#E11D48] transition-colors leading-snug min-h-[38px]">
              {productTitle}
            </h3>
          </Link>

          {/* Price & Action */}
          <div className="mt-auto pt-3 flex items-center justify-between border-t border-slate-100">
            <span className="text-base font-extrabold text-slate-900">
              {formatPrice(Number(p.price))}
            </span>

            <button
              type="button"
              onClick={() => setQuickViewOpen(true)}
              className="text-xs text-slate-500 hover:text-slate-900 font-medium flex items-center gap-1 hover:underline"
            >
              <Eye className="size-3.5" />
              <span className="hidden sm:inline">Quick View</span>
            </button>
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
