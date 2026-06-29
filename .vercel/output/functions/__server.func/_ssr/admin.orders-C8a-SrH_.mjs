import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.orders-C8a-SrH_.js
var import_jsx_runtime = require_jsx_runtime();
function AdminOrders() {
	const { data } = useQuery({
		queryKey: ["admin-orders"],
		queryFn: async () => {
			const { data, error } = await supabase.from("orders").select("*, stores(name), profiles!orders_customer_profile_fk(email)").order("created_at", { ascending: false });
			if (error) {
				console.error("[admin-orders] Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-x-auto rounded-lg border bg-card",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
			className: "w-full min-w-[600px] text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
				className: "bg-muted text-xs uppercase tracking-wide text-muted-foreground",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-left",
						children: "Order"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-left",
						children: "Customer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-left",
						children: "Store"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-right",
						children: "Total"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-left",
						children: "Status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-left",
						children: "Date"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (data ?? []).map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "p-3 font-mono text-xs",
						children: ["#", o.id.slice(0, 8)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3 text-muted-foreground",
						children: o.profiles?.email ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3",
						children: o.stores?.name ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "p-3 text-right font-medium",
						children: ["$", Number(o.total_amount).toFixed(2)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full bg-primary-soft px-2 py-0.5 text-xs text-primary capitalize",
							children: o.status
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3 text-muted-foreground",
						children: new Date(o.created_at).toLocaleDateString()
					})
				]
			}, o.id)) })]
		})
	});
}
//#endregion
export { AdminOrders as component };
