import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { _ as useNavigate, f as Outlet, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as DashboardShell } from "./DashboardShell-BsZmAdyh.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saloree-control-C5_ABlBF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ControlLayout() {
	const { user, roles, loading, signOut } = useAuth();
	const navigate = useNavigate();
	const isAuthorized = roles.includes("admin") || roles.includes("super_admin") || roles.includes("content_admin");
	(0, import_react.useEffect)(() => {
		if (!loading && !user) navigate({ to: "/admin/login" });
	}, [
		user,
		loading,
		navigate
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[450px] items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-3 text-sm text-muted-foreground",
			children: "Authenticating…"
		})]
	});
	if (!user) return null;
	if (!isAuthorized) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md p-12 text-center border rounded-2xl shadow-card my-12 bg-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold text-destructive",
				children: "Access Denied"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted-foreground",
				children: "You do not have permission to access this page. Seller and customer roles are restricted."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex justify-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Go Home"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => signOut(),
					variant: "destructive",
					children: "Sign Out"
				})]
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		title: "Saloree Control",
		nav: [{
			to: "/saloree-control/content",
			label: "Content Manager"
		}],
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-slate-100 pt-6 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => signOut(),
					variant: "outline",
					className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
					children: "Sign Out"
				})
			})]
		})
	});
}
//#endregion
export { ControlLayout as component };
