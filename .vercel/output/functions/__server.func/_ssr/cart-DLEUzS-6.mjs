import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as Minus, N as Plus, p as Trash2, w as ShoppingBag } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as useCart } from "./cart-LBlD-OYI.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cart-DLEUzS-6.js
var import_jsx_runtime = require_jsx_runtime();
function Cart() {
	const { items, setQty, remove } = useCart();
	const { language, formatPrice } = useLocale();
	const totalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto size-12 text-muted-foreground" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 text-2xl font-bold",
				children: t("cart_empty", language)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: t("hero_subtitle", language) ? "Discover great products on the marketplace." : ""
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/marketplace",
					children: t("hero_cta", language)
				})
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: t("shopping_cart_title", language)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid gap-6 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border bg-card",
				children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 border-b p-4 last:border-0 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/products/$slug",
							params: { slug: it.slug },
							className: "h-24 w-full shrink-0 overflow-hidden rounded-md bg-muted sm:w-24",
							children: it.featured_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: it.featured_image,
								alt: it.title,
								className: "h-full w-full object-cover"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid h-full place-items-center text-xs text-muted-foreground",
								children: "No image"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/products/$slug",
									params: { slug: it.slug },
									className: "line-clamp-2 text-sm font-medium hover:text-primary",
									children: it.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 truncate text-xs text-muted-foreground",
									children: it.store_name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-bold",
									children: formatPrice(it.price)
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3 sm:justify-end",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center rounded-md border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "grid h-9 w-9 place-items-center",
											"aria-label": "Decrease quantity",
											onClick: () => setQty(it.product_id, it.quantity - 1),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-10 text-center text-sm font-semibold",
											children: it.quantity
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											className: "grid h-9 w-9 place-items-center",
											"aria-label": "Increase quantity",
											onClick: () => setQty(it.product_id, it.quantity + 1),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-w-[80px] text-right text-sm font-semibold",
									children: formatPrice(it.price * it.quantity)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => remove(it.product_id),
									className: "text-muted-foreground hover:text-destructive",
									"aria-label": "Remove item",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						})
					]
				}, it.product_id))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit rounded-lg border bg-card p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t("order_summary", language)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: t("cart_subtotal", language)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(totalUSD) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: t("shipping_cost", language)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("free", language) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex justify-between border-t pt-3 text-base font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("cart_total", language) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(totalUSD) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						className: "mt-4 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/marketplace",
							children: t("change_language", language) ? "Continue shopping" : ""
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-3 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/checkout",
							children: t("proceed_checkout", language)
						})
					})
				]
			})]
		})]
	});
}
//#endregion
export { Cart as component };
