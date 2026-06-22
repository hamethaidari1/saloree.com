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
      title={t("seller_dashboard", language) || "Seller Dashboard"}
      nav={[
        { to: "/seller", label: "Home" },
        { to: "/seller/orders", label: "Orders" },
        { to: "/seller/products", label: "Products" },
        { to: "/seller/customers", label: "Customers" },
        { to: "/seller/analytics", label: "Analytics" },
        { to: "/seller/discounts", label: "Discounts" },
        { to: "/seller/content", label: "Content" },
        {
          label: "Online Store",
          items: [
            { to: "/seller/themes", label: "Themes" },
            { to: "/seller/pages", label: "Pages" },
            { to: "/seller/navigation", label: "Navigation" },
            { to: "/seller/preferences", label: "Preferences" },
          ],
        },
        { to: "/seller/store", label: "Settings" },
      ]}
    >
      <Outlet />
    </DashboardShell>
  );
}
