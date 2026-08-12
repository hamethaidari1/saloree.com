import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.stores-k8XCfoAS.js
var import_jsx_runtime = require_jsx_runtime();
function AdminStores() {
	const { data } = useQuery({
		queryKey: ["admin-stores"],
		queryFn: async () => (await supabase.from("stores").select("*, profiles!stores_owner_profile_fk(email, full_name)").order("created_at", { ascending: false })).data ?? []
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
						children: "Store"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-left",
						children: "Owner"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-left",
						children: "Slug"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "p-3 text-left",
						children: "Created"
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
				className: "border-t",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3 font-medium",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stores/$slug",
							params: { slug: s.slug },
							className: "hover:text-primary",
							children: s.name
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3 text-muted-foreground",
						children: s.profiles?.full_name ?? s.profiles?.email ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "p-3 text-muted-foreground",
						children: ["/", s.slug]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "p-3 text-muted-foreground",
						children: new Date(s.created_at).toLocaleDateString()
					})
				]
			}, s.id)) })]
		})
	});
}
//#endregion
export { AdminStores as component };
