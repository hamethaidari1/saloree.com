import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashboardShell } from "@/components/DashboardShell";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/seller")({
  head: () => ({ meta: [{ title: "Seller Dashboard — Saloree" }] }),
  component: SellerLayout,
});

function SellerLayout() {
  const { language } = useLocale();
  const { roles } = useAuth();

  const isSeller = roles.includes("seller") || roles.includes("admin") || roles.includes("super_admin");

  if (!isSeller) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-xl font-bold">Access Denied</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account doesn't have permission to access the seller dashboard.
        </p>
      </div>
    );
  }

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
        { to: "/seller/store", label: "Store Settings" },
        { to: "mailto:info@saloree.com", label: "Support" },
      ]}
    >
      <Outlet />
    </DashboardShell>
  );
}
