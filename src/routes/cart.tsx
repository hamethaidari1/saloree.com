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
    <div className="mx-auto max-w-5xl px-4 py-8 pb-24 lg:pb-8">
      <h1 className="text-2xl font-bold">{t("shopping_cart_title", language)}</h1>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border bg-card overflow-hidden">
          {items.map((it) => (
            <div
              key={it.product_id}
              className="flex flex-col gap-4 border-b p-4 last:border-0 sm:flex-row sm:items-center"
            >
              <div className="flex gap-4">
                <Link
                  to="/products/$slug"
                  params={{ slug: it.slug }}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100"
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
                <div className="min-w-0 flex-1 flex flex-col justify-between py-1">
                  <div>
                    <Link
                      to="/products/$slug"
                      params={{ slug: it.slug }}
                      className="line-clamp-2 text-sm font-semibold hover:text-primary leading-snug text-slate-800"
                    >
                      {it.title}
                    </Link>
                    <p className="mt-1 truncate text-[11px] text-muted-foreground font-medium">{it.store_name}</p>
                  </div>
                  <p className="text-sm font-bold text-secondary">{formatPrice(it.price)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between gap-3 mt-2 sm:mt-0 sm:justify-end w-full sm:w-auto">
                <div className="flex items-center rounded-xl border border-slate-200 bg-slate-50 p-0.5 shadow-inner">
                  <button
                    className="grid h-10 w-10 place-items-center text-slate-500 hover:text-slate-800 active:scale-95 transition-all cursor-pointer"
                    aria-label="Decrease quantity"
                    onClick={() => setQty(it.product_id, it.quantity - 1)}
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-secondary select-none">{it.quantity}</span>
                  <button
                    className="grid h-10 w-10 place-items-center text-slate-500 hover:text-slate-800 active:scale-95 transition-all cursor-pointer"
                    aria-label="Increase quantity"
                    onClick={() => setQty(it.product_id, it.quantity + 1)}
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="text-right text-sm font-bold text-secondary min-w-[70px] sm:min-w-[80px]">
                    {formatPrice(it.price * it.quantity)}
                  </div>
                  <button
                    onClick={() => remove(it.product_id)}
                    className="text-muted-foreground hover:text-rose-500 p-2 rounded-full hover:bg-rose-50/50 transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <aside className="h-fit rounded-2xl border bg-card p-5 shadow-soft">
          <h2 className="text-sm font-semibold">{t("order_summary", language)}</h2>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-muted-foreground">{t("cart_subtotal", language)}</span>
            <span className="font-semibold text-slate-800">{formatPrice(totalUSD)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-muted-foreground">{t("shipping_cost", language)}</span>
            <span className="font-semibold text-emerald-600">{t("free", language)}</span>
          </div>
          <div className="mt-3 flex justify-between border-t pt-3 text-base font-bold text-slate-800">
            <span>{t("cart_total", language)}</span>
            <span>{formatPrice(totalUSD)}</span>
          </div>
          <Button asChild variant="outline" className="mt-4 w-full rounded-full border-slate-200 hover:bg-slate-50">
            <Link to="/marketplace">
              {t("change_language", language) ? "Continue shopping" : ""}
            </Link>
          </Button>
          <Button asChild className="mt-3 w-full rounded-full bg-[#FF3B3B] hover:bg-[#E03030] shadow-md shadow-red-500/10">
            <Link to="/checkout">{t("proceed_checkout", language)}</Link>
          </Button>
        </aside>
      </div>

      {/* Sticky Bottom Summary on Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-white border-t border-slate-100 p-4 flex items-center justify-between gap-4 shadow-[0_-8px_30px_rgb(0,0,0,0.06)] lg:hidden">
        <div className="flex flex-col">
          <span className="text-[10px] text-muted-foreground font-semibold">Total</span>
          <span className="text-lg font-black text-secondary">{formatPrice(totalUSD)}</span>
        </div>
        <Button asChild className="rounded-full font-bold h-11 px-8 bg-[#FF3B3B] hover:bg-[#E03030] text-white cursor-pointer shadow-md shadow-red-500/10">
          <Link to="/checkout">{t("proceed_checkout", language)}</Link>
        </Button>
      </div>
    </div>
  );
}
