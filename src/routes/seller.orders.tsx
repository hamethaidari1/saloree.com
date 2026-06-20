import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/seller/orders")({
  component: SellerOrders,
});

const STATUSES = ["pending", "processing", "shipped", "delivered", "cancelled"] as const;

function SellerOrders() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const { language, formatPrice } = useLocale();

  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("owner_id", user!.id)
        .maybeSingle();

      if (error) {
        console.error("[seller-orders-store-failed] Exact Supabase error:", error);
        throw error;
      }
      return data;
    },
  });

  const { data: orders } = useQuery({
    queryKey: ["seller-orders", store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select(
          "*, profiles!orders_customer_profile_fk(full_name, email), order_items(quantity, unit_price, price, title, products(title))",
        )
        .eq("store_id", store!.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("[seller-orders-query-failed] Exact Supabase error:", error);
        throw error;
      }
      return data ?? [];
    },
  });

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) {
      console.error("[seller-orders-update-failed] Exact Supabase error:", error);
      return toast.error(error.message);
    }
    toast.success("Status updated");
    qc.invalidateQueries({ queryKey: ["seller-orders"] });
  };

  if (!store) return <p className="text-sm">Create your store first.</p>;

  return (
    <div className="grid gap-4">
      <h2 className="font-semibold text-lg text-foreground">
        {t("seller_orders", language)} ({orders?.length ?? 0})
      </h2>
      {(orders ?? []).map((o) => (
        <div key={o.id} className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-3">
            <div>
              <p className="text-xs text-muted-foreground">
                {t("order_id", language)}: #{o.id.slice(0, 8)}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("order_date", language)}: {new Date(o.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-foreground">
                {t("order_total", language)}:{" "}
                {formatPrice(o.total != null ? Number(o.total) : Number(o.total_amount))}
              </span>
              <select
                value={o.status}
                onChange={(e) => setStatus(o.id, e.target.value)}
                className="h-9 rounded-md border border-input bg-background px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {t("order_items", language)}
              </h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {o.order_items?.map((it, i: number) => (
                  <li
                    key={i}
                    className="flex justify-between py-1 border-b border-muted/20 last:border-0"
                  >
                    <span>
                      {it.title || it.products?.title || "Product"} × {it.quantity}
                    </span>
                    <span className="font-medium text-foreground">
                      {formatPrice(
                        (it.price != null ? Number(it.price) : Number(it.unit_price)) * it.quantity,
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md bg-muted/30 p-3 text-xs space-y-2">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">
                Customer & Delivery Info
              </h3>
              <div>
                <p className="font-semibold text-foreground">
                  {o.full_name || o.profiles?.full_name || "Customer"}
                </p>
                <p>{o.email || o.profiles?.email}</p>
                {o.phone && <p>Phone: {o.phone}</p>}
              </div>
              <div className="border-t border-muted pt-2">
                <p className="font-semibold text-foreground">{t("shipping_address", language)}:</p>
                <p>{o.address}</p>
                <p>{[o.city, o.country].filter(Boolean).join(", ")}</p>
              </div>
              {o.notes && (
                <div className="border-t border-muted pt-2 bg-amber-500/5 p-1 rounded">
                  <p className="font-semibold text-foreground">Notes:</p>
                  <p className="italic text-foreground/80">{o.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {orders && orders.length === 0 && (
        <p className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
          {t("no_orders", language)}
        </p>
      )}
    </div>
  );
}
