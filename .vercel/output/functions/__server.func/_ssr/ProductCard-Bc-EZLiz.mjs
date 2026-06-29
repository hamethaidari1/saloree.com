import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ShoppingCart, _ as Star, _t as Eye } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useCart } from "./cart-DwCUaj-A.mjs";
import { a as t, o as useLocale } from "./locale-BbUoQ0KM.mjs";
import { a as DialogHeader, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BaN4TOry.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ProductCard-Bc-EZLiz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProductCard({ p }) {
	const cart = useCart();
	const { formatPrice, language } = useLocale();
	const [quickViewOpen, setQuickViewOpen] = (0, import_react.useState)(false);
	const productSlug = p.slug || p.id;
	const productTitle = p.title || "Untitled product";
	const categoryName = p.categories?.name || "Uncategorized";
	const storeName = p.stores?.name || "Unknown store";
	const productImage = p.featured_image || null;
	const storeSlug = p.stores?.slug || void 0;
	const rating = (0, import_react.useMemo)(() => {
		let sum = 0;
		for (let i = 0; i < p.id.length; i++) sum += p.id.charCodeAt(i);
		return (4 + sum % 11 * .1).toFixed(1);
	}, [p.id]);
	const handleAddToCart = () => {
		cart.add({
			product_id: p.id,
			slug: productSlug,
			store_id: p.store_id,
			store_name: storeName,
			title: productTitle,
			price: Number(p.price),
			featured_image: productImage
		});
		toast.success("Added to cart");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group flex h-full flex-col overflow-hidden rounded-xl border bg-card shadow-soft hover:shadow-md transition-all duration-300",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative aspect-square w-full overflow-hidden bg-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/products/$slug",
				params: { slug: productSlug },
				className: "block h-full w-full",
				children: productImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: productImage,
					alt: productTitle,
					loading: "lazy",
					className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-full place-items-center text-xs text-muted-foreground",
					children: "No image"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none group-hover:pointer-events-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					onClick: () => setQuickViewOpen(true),
					className: "bg-white/90 text-black hover:bg-white backdrop-blur-md rounded-full shadow-lg gap-2 text-xs font-semibold px-4 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), " Quick View"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col gap-1.5 p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground",
					children: categoryName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/products/$slug",
					params: { slug: productSlug },
					className: "block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "line-clamp-2 text-sm font-semibold transition-colors hover:text-primary min-h-[40px] leading-snug",
						children: productTitle
					})
				}),
				storeSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/stores/$slug",
					params: { slug: storeSlug },
					className: "truncate text-xs text-muted-foreground hover:text-primary transition-colors inline-block",
					children: storeName
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "truncate text-xs text-muted-foreground",
					children: storeName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto flex items-center justify-between pt-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base font-bold text-secondary",
						children: formatPrice(Number(p.price))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-amber-500 text-amber-500" }),
							" ",
							rating
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						className: "flex-1 rounded-full text-xs font-semibold",
						onClick: handleAddToCart,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-1.5 size-3.5" }),
							" ",
							t("add_to_cart", language)
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "icon",
						className: "rounded-full border-gray-200 hover:bg-slate-50 shrink-0 lg:hidden",
						onClick: () => setQuickViewOpen(true),
						title: "Quick View",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4 text-muted-foreground" })
					})]
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: quickViewOpen,
		onOpenChange: setQuickViewOpen,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
			className: "max-w-2xl w-[90vw] rounded-2xl p-0 overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "aspect-square bg-muted flex items-center justify-center p-6 border-r border-slate-100",
					children: productImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: productImage,
						alt: productTitle,
						className: "max-h-full max-w-full object-contain rounded-lg shadow-sm"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted-foreground",
						children: "No image available"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col p-6 max-h-[80vh] overflow-y-auto",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
							className: "p-0 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-bold uppercase tracking-wider text-primary",
								children: categoryName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "text-xl font-bold leading-tight mt-1 text-secondary",
								children: productTitle
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 mt-2",
							children: [storeSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/stores/$slug",
								params: { slug: storeSlug },
								className: "text-sm text-muted-foreground hover:text-primary transition-colors",
								onClick: () => setQuickViewOpen(false),
								children: ["by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: storeName
								})]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: ["by ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold",
									children: storeName
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-amber-500 text-amber-500" }),
									" ",
									rating,
									" Rating"
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 text-2xl font-extrabold text-secondary",
							children: formatPrice(Number(p.price))
						}),
						p.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 border-t pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
								className: "text-xs font-bold uppercase text-muted-foreground tracking-wider mb-2",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground leading-relaxed",
								children: p.description
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 pt-4 border-t flex flex-col sm:flex-row gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								className: "flex-1 rounded-full py-6 font-bold shadow-lg",
								onClick: () => {
									handleAddToCart();
									setQuickViewOpen(false);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "mr-2 size-5" }),
									" ",
									t("add_to_cart", language)
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								className: "rounded-full py-6 font-semibold",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products/$slug",
									params: { slug: productSlug },
									onClick: () => setQuickViewOpen(false),
									children: "View Details"
								})
							})]
						})
					]
				})]
			})
		})
	})] });
}
//#endregion
export { ProductCard as t };
