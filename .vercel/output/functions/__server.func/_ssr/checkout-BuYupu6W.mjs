import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useCart } from "./cart-LBlD-OYI.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-BuYupu6W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Checkout() {
	const { user } = useAuth();
	const { items, clear } = useCart();
	const { language, formatPrice } = useLocale();
	const navigate = useNavigate();
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		phone: "",
		email: user?.email ?? "",
		country: "",
		city: "",
		address: "",
		notes: ""
	});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const totalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold",
				children: "Sign in to checkout"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "You need an account to place an order."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex justify-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: t("login", language)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						children: t("sign_up", language)
					})
				})]
			})
		]
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-16 text-center text-sm text-muted-foreground",
		children: [
			t("cart_empty", language),
			".",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/marketplace",
				className: "font-semibold text-primary",
				children: t("hero_cta", language)
			})
		]
	});
	const submit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const itemsByStore = {};
			for (const item of items) {
				if (!item.store_id) throw new Error(`Cart item "${item.title}" is missing store information.`);
				if (!itemsByStore[item.store_id]) itemsByStore[item.store_id] = [];
				itemsByStore[item.store_id].push(item);
			}
			const storeIds = Object.keys(itemsByStore);
			if (storeIds.length === 0) throw new Error("Your cart is empty.");
			for (const storeId of storeIds) {
				const storeItems = itemsByStore[storeId];
				const storeSubtotal = storeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
				const orderPayload = {
					customer_id: user.id,
					store_id: storeId,
					full_name: form.full_name.trim(),
					phone: form.phone.trim(),
					email: form.email.trim(),
					country: form.country.trim(),
					city: form.city.trim(),
					address: form.address.trim(),
					notes: form.notes.trim() || null,
					subtotal: storeSubtotal,
					total: storeSubtotal,
					total_amount: storeSubtotal,
					shipping_address: {
						full_name: form.full_name.trim(),
						phone: form.phone.trim(),
						email: form.email.trim(),
						country: form.country.trim(),
						city: form.city.trim(),
						address: form.address.trim(),
						notes: form.notes.trim()
					},
					status: "pending"
				};
				const { data: order, error: orderError } = await supabase.from("orders").insert(orderPayload).select("id").single();
				if (orderError) {
					console.error("[checkout-order-creation-failed] Exact Supabase error:", orderError);
					throw new Error(`Failed to create order for store. Supabase details: ${orderError.message}`);
				}
				const orderItemsPayload = storeItems.map((item) => ({
					order_id: order.id,
					product_id: item.product_id,
					store_id: item.store_id,
					title: item.title,
					price: item.price,
					quantity: item.quantity,
					total: item.price * item.quantity,
					unit_price: item.price
				}));
				const { error: orderItemsError } = await supabase.from("order_items").insert(orderItemsPayload);
				if (orderItemsError) {
					console.error("[checkout-order-items-creation-failed] Exact Supabase error:", orderItemsError);
					throw new Error(`Failed to create items for order. Supabase details: ${orderItemsError.message}`);
				}
			}
			clear();
			toast.success(t("order_success", language));
			navigate({ to: "/orders" });
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to place order";
			toast.error(msg);
		} finally {
			setLoading(false);
		}
	};
	const getFormLabel = (key) => {
		if (key === "full_name") return t("full_name_label", language);
		if (key === "email") return t("email_label", language);
		if (key === "country") return t("country_region", language);
		return key.charAt(0).toUpperCase() + key.slice(1);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-5xl px-4 py-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-bold",
			children: t("checkout_title", language)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: submit,
			className: "mt-6 grid gap-6 lg:grid-cols-[1fr_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 rounded-lg border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: t("billing_details", language)
					}),
					[
						[
							"full_name",
							"Full name",
							"text"
						],
						[
							"phone",
							"Phone",
							"tel"
						],
						[
							"email",
							"Email",
							"email"
						],
						[
							"country",
							"Country",
							"text"
						],
						[
							"city",
							"City",
							"text"
						],
						[
							"address",
							"Address",
							"text"
						]
					].map(([key, label, type]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: getFormLabel(key)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type,
							value: form[key],
							onChange: (e) => setForm({
								...form,
								[key]: e.target.value
							}),
							className: "h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
						})]
					}, key)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "Notes"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							rows: 4,
							value: form.notes,
							onChange: (e) => setForm({
								...form,
								notes: e.target.value
							}),
							className: "rounded-md border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring",
							placeholder: "Optional delivery notes"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "h-fit rounded-lg border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-semibold",
						children: t("order_summary", language)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-2 text-sm",
						children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "line-clamp-1",
								children: [
									it.title,
									" × ",
									it.quantity
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "shrink-0",
								children: formatPrice(it.price * it.quantity)
							})]
						}, it.product_id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex justify-between border-t pt-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: t("cart_subtotal", language)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(totalUSD) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex justify-between text-base font-bold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("cart_total", language) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatPrice(totalUSD) })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: loading,
						className: "mt-4 w-full",
						children: loading ? "..." : t("place_order", language)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "No payment is processed in this MVP."
					})
				]
			})]
		})]
	});
}
//#endregion
export { Checkout as component };
