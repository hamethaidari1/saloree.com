import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/seller")({
  head: () => ({ meta: [{ title: "Seller Dashboard — Saloree" }] }),
  component: SellerLayout,
});

function SellerLayout() {
  const { language } = useLocale();

  return (
    <DashboardShell
      title={t("seller_dashboard", language)}
      nav={[
        { to: "/seller", label: t("main_menu", language) ? "Overview" : "Overview" },
        { to: "/seller/store", label: t("seller_store_settings", language) },
        { to: "/seller/products", label: t("seller_products", language) },
        { to: "/seller/orders", label: t("seller_orders", language) },
      ]}
    >
      <Outlet />
    </DashboardShell>
  );
}
