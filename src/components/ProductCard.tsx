import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export type ProductCardData = {
  id: string;
  slug: string;
  store_id: string;
  title: string;
  price: number;
  featured_image: string | null;
  categories?: { name: string; slug: string } | null;
  stores?: { name: string; slug: string; logo_url?: string | null } | null;
};

export function ProductCard({ p }: { p: ProductCardData }) {
  const cart = useCart();
  const { formatPrice, language } = useLocale();
  const productSlug = p.slug || p.id;
  const productTitle = p.title || "Untitled product";
  const categoryName = p.categories?.name || "Uncategorized";
  const storeName = p.stores?.name || "Unknown store";
  const productImage = p.featured_image || null;
  const storeSlug = p.stores?.slug || undefined;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg border bg-card shadow-card transition hover:shadow-md">
      <Link to="/products/$slug" params={{ slug: productSlug }} className="block">
        <div className="aspect-square w-full overflow-hidden bg-muted">
          {productImage ? (
            <img
              src={productImage}
              alt={productTitle}
              loading="lazy"
              className="h-full w-full object-cover transition group-hover:scale-105"
            />
          ) : (
            <div className="grid h-full place-items-center text-xs text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <Link to="/products/$slug" params={{ slug: productSlug }} className="block">
          <h3 className="line-clamp-2 text-sm font-medium transition-colors hover:text-primary">
            {productTitle}
          </h3>
        </Link>
        <p className="truncate text-xs text-muted-foreground">{categoryName}</p>
        {storeSlug ? (
          <Link
            to="/stores/$slug"
            params={{ slug: storeSlug }}
            className="truncate text-xs text-muted-foreground transition-colors hover:text-primary"
          >
            {storeName}
          </Link>
        ) : (
          <p className="truncate text-xs text-muted-foreground">{storeName}</p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-bold">{formatPrice(Number(p.price))}</span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3 fill-amber-400 text-amber-400" /> 4.7
          </span>
        </div>
        <Button
          type="button"
          className="mt-3 w-full"
          onClick={() => {
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
          }}
        >
          <ShoppingCart className="size-4" /> {t("add_to_cart", language)}
        </Button>
      </div>
    </div>
  );
}
