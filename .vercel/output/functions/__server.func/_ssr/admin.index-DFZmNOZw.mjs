import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DFZmNOZw.js
var import_jsx_runtime = require_jsx_runtime();
function AdminIndex() {
	const { data } = useQuery({
		queryKey: ["admin-stats"],
		queryFn: async () => {
			const [u, s, p, o] = await Promise.all([
				supabase.from("profiles").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("stores").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("products").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("orders").select("id", {
					count: "exact",
					head: true
				})
			]);
			return {
				users: u.count ?? 0,
				stores: s.count ?? 0,
				products: p.count ?? 0,
				orders: o.count ?? 0
			};
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
		children: [
			{
				label: "Users",
				value: data?.users ?? 0
			},
			{
				label: "Stores",
				value: data?.stores ?? 0
			},
			{
				label: "Products",
				value: data?.products ?? 0
			},
			{
				label: "Orders",
				value: data?.orders ?? 0
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
		}, s.label))
	});
}
//#endregion
export { AdminIndex as component };
