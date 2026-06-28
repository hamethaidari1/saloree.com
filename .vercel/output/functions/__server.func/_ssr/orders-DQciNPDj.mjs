import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DQciNPDj.js
var import_jsx_runtime = require_jsx_runtime();
function Orders() {
	const { user } = useAuth();
	const { language, formatPrice } = useLocale();
	const { data: orders } = useQuery({
		queryKey: ["my-orders", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*, stores(name, slug, logo_url), order_items(quantity, unit_price, price, title, products(title))").eq("customer_id", user.id).order("created_at", { ascending: false });
			if (error) {
				console.error("[orders-query-failed] Exact Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-12 text-center text-sm",
		children: [
			"Please",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-semibold text-primary",
				children: t("login", language)
			}),
			" ",
			"to view orders."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: t("my_orders", language)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-4",
			children: [(orders ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-card p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-2 border-b pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							t("order_id", language),
							" #",
							o.id.slice(0, 8)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: o.stores?.name
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-right",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold",
							children: formatPrice(Number(o.total ?? o.total_amount))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block rounded-full bg-primary-soft px-2 py-0.5 text-xs font-medium text-primary capitalize",
							children: o.status
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 text-sm",
					children: o.order_items?.map((it, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex justify-between py-1 text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							it.title || it.products?.title || "Product",
							" × ",
							it.quantity
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(Number(it.price ?? it.unit_price) * it.quantity) })]
					}, idx))
				})]
			}, o.id)), orders && orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground",
				children: t("no_orders", language)
			})]
		})]
	});
}
//#endregion
export { Orders as component };
