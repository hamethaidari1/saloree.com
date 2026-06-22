import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.index-6Sip8xjj.js
var import_jsx_runtime = require_jsx_runtime();
function SellerIndex() {
	const { user } = useAuth();
	const { language, formatPrice } = useLocale();
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle()).data
	});
	const { data: stats } = useQuery({
		queryKey: ["seller-stats", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const [p, o] = await Promise.all([supabase.from("products").select("id", {
				count: "exact",
				head: true
			}).eq("store_id", store.id), supabase.from("orders").select("id, total_amount").eq("store_id", store.id)]);
			return {
				products: p.count ?? 0,
				orders: o.data?.length ?? 0,
				revenue: (o.data ?? []).reduce((s, x) => s + Number(x.total_amount), 0)
			};
		}
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm",
		children: [
			"Please",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/login",
				className: "font-semibold text-primary",
				children: t("login", language)
			}),
			" ",
			"to access your seller dashboard."
		]
	});
	if (!store) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-dashed p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-bold",
				children: "Open your store"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Set up your Saloree store to start selling."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/seller/store",
					children: "Create store"
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 sm:grid-cols-3",
		children: [[
			{
				label: t("seller_products", language),
				value: stats?.products ?? 0
			},
			{
				label: t("orders", language),
				value: stats?.orders ?? 0
			},
			{
				label: "Revenue",
				value: formatPrice(stats?.revenue ?? 0)
			}
		].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-lg border bg-card p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-wide text-muted-foreground",
				children: s.label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-2xl font-bold",
				children: s.value
			})]
		}, s.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "sm:col-span-3 rounded-lg border bg-card p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-semibold",
					children: t("seller_store_settings", language)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: store.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stores/$slug",
							params: { slug: store.slug },
							children: t("visit_store", language)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/seller/products",
							children: t("seller_products", language)
						})
					})]
				})
			]
		})]
	});
}
//#endregion
export { SellerIndex as component };
