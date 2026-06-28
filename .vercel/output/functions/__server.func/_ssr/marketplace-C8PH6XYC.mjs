import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as useLocale } from "./locale-BbUoQ0KM.mjs";
import { t as ProductCard } from "./ProductCard-RJ94vu6B.mjs";
import { t as Route } from "./marketplace-BVWsGEeL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketplace-C8PH6XYC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Marketplace() {
	const { q, cat } = Route.useSearch();
	const [localQ, setLocalQ] = (0, import_react.useState)(q ?? "");
	const navigate = Route.useNavigate();
	const { language } = useLocale();
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => (await supabase.from("categories").select("*").order("name")).data ?? []
	});
	const { data: products, isLoading } = useQuery({
		queryKey: [
			"marketplace",
			q,
			cat
		],
		queryFn: async () => {
			let query = supabase.from("products").select("id, slug, store_id, title, price, featured_image, stores(name, slug, logo_url), categories!inner(name, slug)").eq("status", "active").order("created_at", { ascending: false }).limit(60);
			if (q && q.trim()) query = query.textSearch("search_tsv", q.trim(), { type: "websearch" });
			if (cat) query = query.eq("categories.slug", cat);
			const { data, error } = await query;
			if (error) {
				console.error("[marketplace-products] Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold",
					children: "Marketplace"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: q ? `Results for "${q}"` : "All products"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					navigate({ search: {
						q: localQ,
						cat
					} });
				},
				className: "mb-4 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: localQ,
					onChange: (e) => setLocalQ(e.target.value),
					placeholder: "Search products...",
					className: "h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: "Search"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-6 lg:grid-cols-[220px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-lg border bg-card p-3 lg:sticky lg:top-24 lg:self-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-sm font-semibold",
						children: "Categories"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-1 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => navigate({ search: {
								q,
								cat: void 0
							} }),
							className: `block w-full rounded-md px-2 py-1.5 text-left hover:bg-accent ${!cat ? "bg-accent font-semibold" : ""}`,
							children: "All"
						}) }), (categories ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/categories/$slug",
							params: { slug: c.slug },
							className: `block rounded-md px-2 py-1.5 hover:bg-accent ${cat === c.slug ? "bg-accent font-semibold" : ""}`,
							children: c.name
						}) }, c.id))]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Loading…"
				}) : products && products.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
					children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground",
					children: "No products found."
				}) })]
			})
		]
	});
}
//#endregion
export { Marketplace as component };
