import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as notFound, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./categories._slug-C6audGSc.mjs";
import { t as ProductCard } from "./ProductCard-BqdfSY5Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/categories._slug-C1Rtsrel.js
var import_jsx_runtime = require_jsx_runtime();
function CategoryPage() {
	const { slug } = Route.useParams();
	const { data: category } = useQuery({
		queryKey: ["category", slug],
		queryFn: async () => {
			const { data } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
			if (!data) throw notFound();
			return data;
		}
	});
	const { data: products } = useQuery({
		queryKey: [
			"products",
			"by-cat",
			slug
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, slug, store_id, title, price, featured_image, stores(name, slug, logo_url), categories!inner(name, slug)").eq("status", "active").eq("categories.slug", slug).order("created_at", { ascending: false });
			if (error) {
				console.error("[category-products] Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mb-4 text-sm text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary",
						children: "Home"
					}),
					" ",
					"/",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marketplace",
						className: "hover:text-primary",
						children: "Marketplace"
					}),
					" ",
					"/ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: category?.name ?? slug
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold sm:text-3xl",
				children: category?.name ?? slug
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [products?.length ?? 0, " products"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5",
				children: [(products ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id)), products && products.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "col-span-full rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground",
					children: "No products yet."
				})]
			})
		]
	});
}
//#endregion
export { CategoryPage as component };
