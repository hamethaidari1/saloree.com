import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.orders-j2TK8A9N.js
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"pending",
	"processing",
	"shipped",
	"delivered",
	"cancelled"
];
function SellerOrders() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const { language, formatPrice } = useLocale();
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle();
			if (error) {
				console.error("[seller-orders-store-failed] Exact Supabase error:", error);
				throw error;
			}
			return data;
		}
	});
	const { data: orders } = useQuery({
		queryKey: ["seller-orders", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*, profiles!orders_customer_profile_fk(full_name, email), order_items(quantity, unit_price, price, title, products(title))").eq("store_id", store.id).order("created_at", { ascending: false });
			if (error) {
				console.error("[seller-orders-query-failed] Exact Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	const setStatus = async (id, status) => {
		const { error } = await supabase.from("orders").update({ status }).eq("id", id);
		if (error) {
			console.error("[seller-orders-update-failed] Exact Supabase error:", error);
			return toast.error(error.message);
		}
		toast.success("Status updated");
		qc.invalidateQueries({ queryKey: ["seller-orders"] });
	};
	if (!store) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm",
		children: "Create your store first."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "font-semibold text-lg text-foreground",
				children: [
					t("seller_orders", language),
					" (",
					orders?.length ?? 0,
					")"
				]
			}),
			(orders ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-lg border bg-card p-5 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3 border-b pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							t("order_id", language),
							": #",
							o.id.slice(0, 8)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							t("order_date", language),
							": ",
							new Date(o.created_at).toLocaleString()
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-base font-bold text-foreground",
							children: [
								t("order_total", language),
								":",
								" ",
								formatPrice(o.total != null ? Number(o.total) : Number(o.total_amount))
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: o.status,
							onChange: (e) => setStatus(o.id, e.target.value),
							className: "h-9 rounded-md border border-input bg-background px-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring",
							children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s,
								children: s.charAt(0).toUpperCase() + s.slice(1)
							}, s))
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-6 md:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-sm font-semibold text-foreground mb-2",
						children: t("order_items", language)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1 text-sm text-muted-foreground",
						children: o.order_items?.map((it, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between py-1 border-b border-muted/20 last:border-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								it.title || it.products?.title || "Product",
								" × ",
								it.quantity
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-foreground",
								children: formatPrice((it.price != null ? Number(it.price) : Number(it.unit_price)) * it.quantity)
							})]
						}, i))
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-md bg-muted/30 p-3 text-xs space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold text-foreground uppercase tracking-wider",
								children: "Customer & Delivery Info"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-foreground",
									children: o.full_name || o.profiles?.full_name || "Customer"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: o.email || o.profiles?.email }),
								o.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Phone: ", o.phone] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-muted pt-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-semibold text-foreground",
										children: [t("shipping_address", language), ":"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: o.address }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: [o.city, o.country].filter(Boolean).join(", ") })
								]
							}),
							o.notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "border-t border-muted pt-2 bg-amber-500/5 p-1 rounded",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-foreground",
									children: "Notes:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "italic text-foreground/80",
									children: o.notes
								})]
							})
						]
					})]
				})]
			}, o.id)),
			orders && orders.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground",
				children: t("no_orders", language)
			})
		]
	});
}
//#endregion
export { SellerOrders as component };
