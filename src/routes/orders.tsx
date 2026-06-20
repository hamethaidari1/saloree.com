import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/orders")({
  head: () => ({ meta: [{ title: "My Orders — Saloree" }] }),
  component: Orders,
});

function Orders() {
  const { user } = useAuth();
  const { language, formatPrice } = useLocale();

  const { data: orders } = useQuery({
    queryKey: ["my-orders", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "*, stores(name, slug, logo_url), order_items(quantity, unit_price, price, title, products(title))",
        )
        .eq("customer_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("[orders-query-failed] Exact Supabase error:", error);
        throw error;
      }
      return data ?? [];
    },
  });

  if (!user)
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-center text-sm">
        Please{" "}
        <Link to="/login" className="font-semibold text-primary">
          {t("login", language)}
        </Link>{" "}
        to view orders.
      </div>
    );

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold">{t("my_orders", language)}</h1>
      <div className="mt-6 grid gap-4">
        {(orders ?? []).map((o) => (
          <div key={o.id} className="rounded-lg border bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-3">
              <div>
                <p className="text-xs text-muted-foreground">
                  {t("order_id", language)} #{o.id.slice(0, 8)}
                </p>
                <p className="text-sm font-semibold">{o.stores?.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold">
                  {formatPrice(Number(o.total ?? o.total_amount))}
                </p>
                <span className="inline-block rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary capitalize">
                  {o.status}
                </span>
              </div>
            </div>
            <ul className="mt-3 text-sm">
              {o.order_items?.map((it, idx: number) => (
                <li key={idx} className="flex justify-between py-1 text-muted-foreground">
                  <span>
                    {it.title || it.products?.title || "Product"} × {it.quantity}
                  </span>
                  <span>{formatPrice(Number(it.price ?? it.unit_price) * it.quantity)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {orders && orders.length === 0 && (
          <p className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
            {t("no_orders", language)}
          </p>
        )}
      </div>
    </div>
  );
}
