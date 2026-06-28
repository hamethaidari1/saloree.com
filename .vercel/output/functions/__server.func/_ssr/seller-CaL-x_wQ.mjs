import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { f as Outlet } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as DashboardShell } from "./DashboardShell-BsZmAdyh.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller-CaL-x_wQ.js
var import_jsx_runtime = require_jsx_runtime();
function SellerLayout() {
	const { language } = useLocale();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		title: t("seller_dashboard", language) || "Seller Dashboard",
		nav: [
			{
				to: "/seller",
				label: "Home"
			},
			{
				to: "/seller/orders",
				label: "Orders"
			},
			{
				to: "/seller/products",
				label: "Products"
			},
			{
				to: "/seller/customers",
				label: "Customers"
			},
			{
				to: "/seller/analytics",
				label: "Analytics"
			},
			{
				to: "/seller/discounts",
				label: "Discounts"
			},
			{
				to: "/seller/content",
				label: "Content"
			},
			{
				label: "Online Store",
				items: [
					{
						to: "/seller/themes",
						label: "Themes"
					},
					{
						to: "/seller/pages",
						label: "Pages"
					},
					{
						to: "/seller/navigation",
						label: "Navigation"
					},
					{
						to: "/seller/preferences",
						label: "Preferences"
					}
				]
			},
			{
				to: "/seller/store",
				label: "Store Settings"
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { SellerLayout as component };
