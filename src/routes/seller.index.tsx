import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/seller/")({
  component: SellerIndex,
});

function SellerIndex() {
  const { user } = useAuth();
  const { language, formatPrice } = useLocale();

  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("stores").select("*").eq("owner_id", user!.id).maybeSingle()).data,
  });

  const { data: stats } = useQuery({
    queryKey: ["seller-stats", store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      const [p, o] = await Promise.all([
        supabase
          .from("products")
          .select("id", { count: "exact", head: true })
          .eq("store_id", store!.id),
        supabase.from("orders").select("id, total_amount").eq("store_id", store!.id),
      ]);
      return {
        products: p.count ?? 0,
        orders: o.data?.length ?? 0,
        revenue: (o.data ?? []).reduce((s, x) => s + Number(x.total_amount), 0),
      };
    },
  });

  if (!user)
    return (
      <p className="text-sm">
        Please{" "}
        <Link to="/login" className="font-semibold text-primary">
          {t("login", language)}
        </Link>{" "}
        to access your seller dashboard.
      </p>
    );

  if (!store) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <h2 className="text-lg font-bold">Open your store</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Set up your Saloree store to start selling.
        </p>
        <Button asChild className="mt-4">
          <Link to="/seller/store">Create store</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {[
        { label: t("seller_products", language), value: stats?.products ?? 0 },
        { label: t("orders", language), value: stats?.orders ?? 0 },
        { label: "Revenue", value: formatPrice(stats?.revenue ?? 0) },
      ].map((s) => (
        <div key={s.label} className="rounded-lg border bg-card p-5">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</p>
          <p className="mt-1 text-2xl font-bold">{s.value}</p>
        </div>
      ))}
      <div className="sm:col-span-3 rounded-lg border bg-card p-5">
        <h3 className="font-semibold">{t("seller_store_settings", language)}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{store.name}</p>
        <div className="mt-3 flex gap-2">
          <Button asChild variant="outline" size="sm">
            <Link to="/stores/$slug" params={{ slug: store.slug }}>
              {t("visit_store", language)}
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/seller/products">{t("seller_products", language)}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
