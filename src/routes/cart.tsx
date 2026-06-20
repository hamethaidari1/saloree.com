import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Saloree" }] }),
  component: Cart,
});

function Cart() {
  const { items, setQty, remove } = useCart();
  const { language, formatPrice } = useLocale();

  // Compute total dynamically in USD
  const totalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <ShoppingBag className="mx-auto size-12 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">{t("cart_empty", language)}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("hero_subtitle", language) ? "Discover great products on the marketplace." : ""}
        </p>
        <Button asChild className="mt-6">
          <Link to="/marketplace">{t("hero_cta", language)}</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">{t("shopping_cart_title", language)}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-lg border bg-card">
          {items.map((it) => (
            <div
              key={it.product_id}
              className="flex flex-col gap-4 border-b p-4 last:border-0 sm:flex-row sm:items-center"
            >
              <Link
                to="/products/$slug"
                params={{ slug: it.slug }}
                className="h-24 w-full shrink-0 overflow-hidden rounded-md bg-muted sm:w-24"
              >
                {it.featured_image ? (
                  <img
                    src={it.featured_image}
                    alt={it.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full place-items-center text-xs text-muted-foreground">
                    No image
                  </div>
                )}
              </Link>
              <div className="min-w-0 flex-1">
                <Link
                  to="/products/$slug"
                  params={{ slug: it.slug }}
                  className="line-clamp-2 text-sm font-medium hover:text-primary"
                >
                  {it.title}
                </Link>
                <p className="mt-1 truncate text-xs text-muted-foreground">{it.store_name}</p>
                <p className="mt-2 text-sm font-bold">{formatPrice(it.price)}</p>
              </div>
              <div className="flex items-center justify-between gap-3 sm:justify-end">
                <div className="flex items-center rounded-md border">
                  <button
                    className="grid h-9 w-9 place-items-center"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(it.product_id, it.quantity - 1)}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold">{it.quantity}</span>
                  <button
                    className="grid h-9 w-9 place-items-center"
                    aria-label="Increase quantity"
                    onClick={() => setQty(it.product_id, it.quantity + 1)}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                <div className="min-w-[80px] text-right text-sm font-semibold">
                  {formatPrice(it.price * it.quantity)}
                </div>
                <button
                  onClick={() => remove(it.product_id)}
                  className="text-muted-foreground hover:text-destructive"
                  aria-label="Remove item"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-lg border bg-card p-4">
          <h2 className="text-sm font-semibold">{t("order_summary", language)}</h2>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-muted-foreground">{t("cart_subtotal", language)}</span>
            <span>{formatPrice(totalUSD)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{t("shipping_cost", language)}</span>
            <span>{t("free", language)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t pt-3 text-base font-bold">
            <span>{t("cart_total", language)}</span>
            <span>{formatPrice(totalUSD)}</span>
          </div>
          <Button asChild variant="outline" className="mt-4 w-full">
            <Link to="/marketplace">
              {t("change_language", language) ? "Continue shopping" : ""}
            </Link>
          </Button>
          <Button asChild className="mt-3 w-full">
            <Link to="/checkout">{t("proceed_checkout", language)}</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}
