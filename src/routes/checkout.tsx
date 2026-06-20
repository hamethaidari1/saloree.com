import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Saloree" }] }),
  component: Checkout,
});

function Checkout() {
  const { user } = useAuth();
  const { items, clear } = useCart();
  const { language, formatPrice } = useLocale();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: user?.email ?? "",
    country: "",
    city: "",
    address: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  // Compute total dynamically in USD
  const totalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <h1 className="text-2xl font-bold">Sign in to checkout</h1>
        <p className="mt-2 text-sm text-muted-foreground">You need an account to place an order.</p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild>
            <Link to="/login">{t("login", language)}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/register">{t("sign_up", language)}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center text-sm text-muted-foreground">
        {t("cart_empty", language)}.{" "}
        <Link to="/marketplace" className="font-semibold text-primary">
          {t("hero_cta", language)}
        </Link>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Group items by store_id
      const itemsByStore: Record<string, typeof items> = {};
      for (const item of items) {
        if (!item.store_id) {
          throw new Error(`Cart item "${item.title}" is missing store information.`);
        }
        if (!itemsByStore[item.store_id]) {
          itemsByStore[item.store_id] = [];
        }
        itemsByStore[item.store_id].push(item);
      }

      const storeIds = Object.keys(itemsByStore);
      if (storeIds.length === 0) {
        throw new Error("Your cart is empty.");
      }

      // Create orders sequentially
      for (const storeId of storeIds) {
        const storeItems = itemsByStore[storeId];
        const storeSubtotal = storeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        const orderPayload = {
          customer_id: user.id,
          store_id: storeId,
          full_name: form.full_name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          country: form.country.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          notes: form.notes.trim() || null,
          subtotal: storeSubtotal,
          total: storeSubtotal,
          total_amount: storeSubtotal,
          shipping_address: {
            full_name: form.full_name.trim(),
            phone: form.phone.trim(),
            email: form.email.trim(),
            country: form.country.trim(),
            city: form.city.trim(),
            address: form.address.trim(),
            notes: form.notes.trim(),
          },
          status: "pending",
        };

        const { data: order, error: orderError } = await supabase
          .from("orders")
          .insert(orderPayload)
          .select("id")
          .single();

        if (orderError) {
          console.error("[checkout-order-creation-failed] Exact Supabase error:", orderError);
          throw new Error(
            `Failed to create order for store. Supabase details: ${orderError.message}`,
          );
        }

        const orderItemsPayload = storeItems.map((item) => ({
          order_id: order.id,
          product_id: item.product_id,
          store_id: item.store_id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity,
          unit_price: item.price,
        }));

        const { error: orderItemsError } = await supabase
          .from("order_items")
          .insert(orderItemsPayload);

        if (orderItemsError) {
          console.error(
            "[checkout-order-items-creation-failed] Exact Supabase error:",
            orderItemsError,
          );
          throw new Error(
            `Failed to create items for order. Supabase details: ${orderItemsError.message}`,
          );
        }
      }

      clear();
      toast.success(t("order_success", language));
      navigate({ to: "/orders" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to place order";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getFormLabel = (key: string) => {
    if (key === "full_name") return t("full_name_label", language);
    if (key === "email") return t("email_label", language);
    if (key === "country") return t("country_region", language);
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">{t("checkout_title", language)}</h1>
      <form onSubmit={submit} className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4 rounded-lg border bg-card p-5">
          <h2 className="font-semibold">{t("billing_details", language)}</h2>
          {(
            [
              ["full_name", "Full name", "text"],
              ["phone", "Phone", "tel"],
              ["email", "Email", "email"],
              ["country", "Country", "text"],
              ["city", "City", "text"],
              ["address", "Address", "text"],
            ] as const
          ).map(([key, label, type]) => (
            <label key={key} className="grid gap-1 text-sm">
              <span className="text-muted-foreground">{getFormLabel(key)}</span>
              <input
                required
                type={type}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
          ))}
          <label className="grid gap-1 text-sm">
            <span className="text-muted-foreground">Notes</span>
            <textarea
              rows={4}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              placeholder="Optional delivery notes"
            />
          </label>
        </div>
        <aside className="h-fit rounded-lg border bg-card p-5">
          <h2 className="text-sm font-semibold">{t("order_summary", language)}</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {items.map((it) => (
              <li key={it.product_id} className="flex justify-between gap-3">
                <span className="line-clamp-1">
                  {it.title} × {it.quantity}
                </span>
                <span className="shrink-0">{formatPrice(it.price * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t pt-3 text-sm">
            <span className="text-muted-foreground">{t("cart_subtotal", language)}</span>
            <span>{formatPrice(totalUSD)}</span>
          </div>
          <div className="mt-2 flex justify-between text-base font-bold">
            <span>{t("cart_total", language)}</span>
            <span>{formatPrice(totalUSD)}</span>
          </div>
          <Button type="submit" disabled={loading} className="mt-4 w-full">
            {loading ? "..." : t("place_order", language)}
          </Button>
          <p className="mt-2 text-xs text-muted-foreground">No payment is processed in this MVP.</p>
        </aside>
      </form>
    </div>
  );
}
