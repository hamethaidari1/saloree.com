import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { f as Outlet, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as DashboardShell } from "./DashboardShell-BsZmAdyh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-B7jyIRw8.js
var import_jsx_runtime = require_jsx_runtime();
function AdminLayout() {
	const { user, roles, loading } = useAuth();
	const isSuperAdmin = roles.includes("super_admin") || roles.includes("admin");
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10 text-center text-sm text-muted-foreground",
		children: "Loading…"
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md p-10 text-center text-sm",
		children: [
			"Please",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-semibold text-primary",
				children: "sign in"
			}),
			"."
		]
	});
	if (!isSuperAdmin) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md p-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-bold",
			children: "Access Denied"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "Your account doesn't have permission to access the admin dashboard."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		title: "Admin dashboard",
		nav: [
			{
				to: "/admin",
				label: "Overview"
			},
			{
				to: "/admin/users",
				label: "Users"
			},
			{
				to: "/admin/stores",
				label: "Stores"
			},
			{
				to: "/admin/categories",
				label: "Categories"
			},
			{
				to: "/admin/orders",
				label: "Orders"
			}
		],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { AdminLayout as component };
