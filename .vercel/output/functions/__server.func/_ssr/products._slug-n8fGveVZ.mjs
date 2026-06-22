import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ShoppingCart, _ as Star } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useCart } from "./cart-LBlD-OYI.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
import { t as Route } from "./products._slug-BIZCfjZs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/products._slug-n8fGveVZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductPage() {
	const { slug } = Route.useParams();
	const cart = useCart();
	const { language, formatPrice, translateCategory } = useLocale();
	const [qty, setQty] = (0, import_react.useState)(1);
	const { data: product, error, isLoading } = useQuery({
		queryKey: ["product", slug],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("*, stores(id, name, slug, logo_url), categories(name, slug), product_images(image_url)").eq("slug", slug).eq("status", "active").maybeSingle();
			if (error) {
				console.error("[product-page] Supabase error:", error);
				throw error;
			}
			return data;
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground",
		children: "Loading..."
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "Unable to load this product right now."
		})
	});
	if (!product) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-4 py-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground",
			children: "Product not found."
		})
	});
	const images = [product.featured_image, ...product.product_images?.map((i) => i.image_url) ?? []].filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-6 sm:py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
			className: "mb-4 text-sm text-muted-foreground",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "hover:text-primary",
					children: t("home", language)
				}),
				" ",
				"/",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/marketplace",
					className: "hover:text-primary",
					children: t("marketplace", language)
				}),
				" ",
				"/ ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-foreground line-clamp-1 inline",
					children: product.title
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-8 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "aspect-square overflow-hidden rounded-lg border bg-muted",
				children: images[0] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: images[0],
					alt: product.title,
					className: "h-full w-full object-cover"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-full place-items-center text-sm text-muted-foreground",
					children: "No image"
				})
			}), images.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid grid-cols-5 gap-2",
				children: images.slice(0, 5).map((src, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src,
					alt: "",
					className: "aspect-square w-full rounded-md border object-cover"
				}, i))
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold sm:text-3xl",
					children: product.title
				}),
				product.stores && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/stores/$slug",
					params: { slug: product.stores.slug },
					className: "mt-1 inline-block text-sm text-primary hover:underline",
					children: [
						t("sold_by", language),
						" ",
						product.stores.name
					]
				}),
				product.categories && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: translateCategory(product.categories.name)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex items-center gap-2 text-sm text-muted-foreground",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-amber-400 text-amber-400" }), " 4.7"]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-3xl font-extrabold",
					children: formatPrice(Number(product.price))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: product.stock > 0 ? `${product.stock} ${t("in_stock", language)}` : t("out_of_stock", language)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 whitespace-pre-wrap text-sm leading-relaxed",
					children: product.description || "No description provided."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-3 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center rounded-md border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "h-10 w-10 text-lg",
								onClick: () => setQty((q) => Math.max(1, q - 1)),
								children: "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-10 text-center text-sm font-semibold",
								children: qty
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "h-10 w-10 text-lg",
								onClick: () => setQty((q) => q + 1),
								children: "+"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "lg",
						disabled: product.stock <= 0,
						onClick: () => {
							cart.add({
								product_id: product.id,
								slug: product.slug || product.id,
								store_id: product.store_id,
								store_name: product.stores?.name || "Unknown store",
								title: product.title,
								price: Number(product.price),
								featured_image: product.featured_image
							}, qty);
							toast.success("Added to cart");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-4" }),
							" ",
							t("add_to_cart", language)
						]
					})]
				})
			] })]
		})]
	});
}
//#endregion
export { ProductPage as component };
