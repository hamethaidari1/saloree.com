import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { At as CircleCheckBig, Bt as Building2, C as ShoppingCart, Ct as CreditCard, D as ShieldCheck, J as MapPin, Kt as ArrowLeft, Nt as ChevronRight, Ot as CircleQuestionMark, P as Phone, Y as Mail, Z as Lock, jt as CircleAlert, mt as FileText, o as User, q as Map } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useCart } from "./cart-LBlD-OYI.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-CqdcZ21o.mjs";
import { c as createServerFn, i as TSS_SERVER_FUNCTION } from "./esm-B50dUWcE.mjs";
import { n as PayPalScriptProvider, t as PayPalButtons } from "../_libs/paypal__react-paypal-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/checkout-W8kjPZTK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var createPayPalOrderFn = createServerFn({ method: "POST" }).validator((items) => items).handler(createSsrRpc("93d93bcddfba7ded05067975e56629954d67d0beb27d6ad4b47c602672161122"));
var capturePayPalOrderFn = createServerFn({ method: "POST" }).validator((orderId) => orderId).handler(createSsrRpc("8af5cc17fae8dddbba97ed82cee2a80a4bf96d233f75dbed5f28554f6c6acf95"));
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
	const [touched, setTouched] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(false);
	const subtotalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
	const totalUSD = subtotalUSD + 0;
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-10 w-10 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold text-slate-900",
				children: "Secure Checkout"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base text-slate-600",
				children: "Sign in or create an account to proceed with your order securely."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex justify-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "h-12 px-8 font-semibold text-base",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: t("login", language)
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "h-12 px-8 font-semibold text-base border-slate-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/register",
						children: t("sign_up", language)
					})
				})]
			})
		]
	});
	if (items.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-24 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-10 w-10 text-slate-400" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-3xl font-bold text-slate-900",
				children: "Your cart is empty"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-base text-slate-600 mb-8",
				children: "Looks like you haven't added anything to your cart yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				className: "h-12 px-8 font-semibold text-base",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/marketplace",
					children: "Start Shopping"
				})
			})
		]
	});
	const createOrderInDatabase = async (paypalOrderId, paypalCaptureId) => {
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
				status: "processing",
				paypal_order_id: paypalOrderId,
				paypal_capture_id: paypalCaptureId,
				payment_provider: "paypal",
				payment_status: "paid",
				paid_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			const { data: order, error: orderError } = await supabase.from("orders").insert(orderPayload).select("id").single();
			if (orderError) {
				console.error("[checkout-order-creation-failed]", orderError);
				throw new Error(`Failed to create order. Details: ${orderError.message}`);
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
				console.error("[checkout-order-items-creation-failed]", orderItemsError);
				throw new Error(`Failed to create items. Details: ${orderItemsError.message}`);
			}
		}
	};
	const getMissingFields = () => {
		return [
			"full_name",
			"email",
			"country",
			"city",
			"address",
			"phone"
		].filter((field) => !form[field]?.trim());
	};
	const isFormValid = () => getMissingFields().length === 0;
	const handleBlur = (field) => {
		setTouched((prev) => ({
			...prev,
			[field]: true
		}));
	};
	const initialOptions = {
		clientId: "AUUOMtQxm-Jud3ytrUqu1JaPJq9wibP4R-vygN18J9DVi0acLqH47fyC6GJl5ptc85k9Qu5qTnqnH3lp",
		currency: "USD",
		intent: "capture"
	};
	const today = /* @__PURE__ */ new Date();
	const deliveryStart = new Date(today);
	deliveryStart.setDate(today.getDate() + 3);
	const deliveryEnd = new Date(today);
	deliveryEnd.setDate(today.getDate() + 5);
	const deliveryRange = `${deliveryStart.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	})} - ${deliveryEnd.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	})}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#F7F9FA] pb-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "bg-white border-b border-slate-200",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-5 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm text-slate-500 font-medium",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/cart",
							className: "hover:text-slate-900 transition-colors flex items-center gap-1",
							children: "Cart"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-900",
							children: "Details & Payment"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4 text-slate-300" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-slate-400",
							children: "Confirmation"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-emerald-600 text-sm font-semibold",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline tracking-wide uppercase text-xs",
						children: "Secure Checkout"
					})]
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2 mb-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cart",
					className: "text-slate-500 hover:text-slate-900 flex items-center gap-1.5 text-sm font-semibold transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-4 w-4" }), "Return to cart"]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-[1fr_420px] items-start",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 border-b border-slate-100 pb-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
								className: "text-2xl font-bold text-slate-900 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-6 w-6 text-slate-400" }), "Shipping & Billing Details"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-slate-500 mt-2",
								children: "Please enter your delivery information."
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-6",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-semibold text-slate-700 flex items-center gap-1",
												children: ["Full Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-red-500",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-y-0 left-3.5 flex items-center pointer-events-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "h-5 w-5 text-slate-400" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													type: "text",
													placeholder: "John Doe",
													value: form.full_name,
													onChange: (e) => setForm({
														...form,
														full_name: e.target.value
													}),
													onBlur: () => handleBlur("full_name"),
													className: `h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${touched.full_name && !form.full_name ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"}`
												})]
											}),
											touched.full_name && !form.full_name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-500 font-medium",
												children: "Full name is required."
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-semibold text-slate-700 flex items-center gap-1",
												children: ["Phone Number ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-red-500",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-y-0 left-3.5 flex items-center pointer-events-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-5 w-5 text-slate-400" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													type: "tel",
													placeholder: "+1 (555) 000-0000",
													value: form.phone,
													onChange: (e) => setForm({
														...form,
														phone: e.target.value
													}),
													onBlur: () => handleBlur("phone"),
													className: `h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${touched.phone && !form.phone ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"}`
												})]
											}),
											touched.phone && !form.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-500 font-medium",
												children: "Phone number is required."
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm font-semibold text-slate-700 flex items-center gap-1",
											children: ["Email Address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-y-0 left-3.5 flex items-center pointer-events-none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "h-5 w-5 text-slate-400" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												type: "email",
												placeholder: "john@example.com",
												value: form.email,
												onChange: (e) => setForm({
													...form,
													email: e.target.value
												}),
												onBlur: () => handleBlur("email"),
												className: `h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${touched.email && !form.email ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"}`
											})]
										}),
										touched.email && !form.email && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-red-500 font-medium",
											children: "Valid email is required for order updates."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-semibold text-slate-700 flex items-center gap-1",
												children: ["Country / Region ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-red-500",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-y-0 left-3.5 flex items-center pointer-events-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Map, { className: "h-5 w-5 text-slate-400" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													type: "text",
													placeholder: "United States",
													value: form.country,
													onChange: (e) => setForm({
														...form,
														country: e.target.value
													}),
													onBlur: () => handleBlur("country"),
													className: `h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${touched.country && !form.country ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"}`
												})]
											}),
											touched.country && !form.country && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-500 font-medium",
												children: "Country is required."
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
												className: "text-sm font-semibold text-slate-700 flex items-center gap-1",
												children: ["City ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-red-500",
													children: "*"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "absolute inset-y-0 left-3.5 flex items-center pointer-events-none",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "h-5 w-5 text-slate-400" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													required: true,
													type: "text",
													placeholder: "New York",
													value: form.city,
													onChange: (e) => setForm({
														...form,
														city: e.target.value
													}),
													onBlur: () => handleBlur("city"),
													className: `h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${touched.city && !form.city ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"}`
												})]
											}),
											touched.city && !form.city && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-red-500 font-medium",
												children: "City is required."
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "text-sm font-semibold text-slate-700 flex items-center gap-1",
											children: ["Street Address ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-red-500",
												children: "*"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-y-0 left-3.5 flex items-center pointer-events-none",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-5 w-5 text-slate-400" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												required: true,
												type: "text",
												placeholder: "123 Main St, Apt 4B",
												value: form.address,
												onChange: (e) => setForm({
													...form,
													address: e.target.value
												}),
												onBlur: () => handleBlur("address"),
												className: `h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${touched.address && !form.address ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"}`
											})]
										}),
										touched.address && !form.address && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-red-500 font-medium",
											children: "Street address is required."
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "text-sm font-semibold text-slate-700 flex items-center gap-1",
										children: ["Delivery Notes ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-slate-400 font-normal",
											children: "(Optional)"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "absolute top-4 left-3.5 flex items-start pointer-events-none",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "h-5 w-5 text-slate-400" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											rows: 3,
											value: form.notes,
											onChange: (e) => setForm({
												...form,
												notes: e.target.value
											}),
											className: "w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3.5 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none",
											placeholder: "Any special instructions for delivery..."
										})]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-2 text-sm text-slate-500 pb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleQuestionMark, { className: "h-4 w-4" }),
							"Need help? ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#",
								className: "text-slate-900 hover:underline font-semibold",
								children: "Contact Customer Support"
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "lg:sticky lg:top-8 h-fit space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-white border-b border-slate-100 px-6 sm:px-8 py-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "text-xl font-bold text-slate-900",
										children: "Order Summary"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "px-6 sm:px-8 py-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
											className: "space-y-5 mb-8",
											children: items.map((it) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
												className: "flex items-start gap-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center",
													children: it.featured_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: it.featured_image,
														alt: it.title,
														className: "h-full w-full object-cover"
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "h-6 w-6 text-slate-300" })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex flex-1 flex-col min-h-[4rem] justify-center",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "flex justify-between gap-4",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm font-semibold text-slate-900 line-clamp-2 leading-snug",
															children: it.title
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "text-sm font-bold text-slate-900 whitespace-nowrap",
															children: formatPrice(it.price * it.quantity)
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "mt-1 text-sm text-slate-500",
														children: ["Qty: ", it.quantity]
													})]
												})]
											}, it.product_id))
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "space-y-3.5 border-t border-slate-100 pt-6 text-sm text-slate-600",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Subtotal" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-slate-900",
														children: formatPrice(subtotalUSD)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shipping" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-emerald-600",
														children: "Free"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Taxes" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-slate-400",
														children: "Calculated at payment"
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-6 flex items-end justify-between border-t border-slate-200 pt-6",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-lg font-bold text-slate-900",
												children: "Total"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-right",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-3xl font-extrabold text-slate-900 tracking-tight",
													children: formatPrice(totalUSD)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-[11px] text-slate-500 uppercase font-bold tracking-widest mt-1",
													children: "USD"
												})]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-[#F7F9FA] px-6 sm:px-8 py-5 border-t border-slate-100",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-5 w-5 text-emerald-600" })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-sm",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "font-bold text-slate-900",
												children: "Estimated Delivery"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-slate-600",
												children: deliveryRange
											})]
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t border-slate-200 bg-white px-6 sm:px-8 py-6",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mb-5 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
											className: "text-lg font-bold text-slate-900 flex items-center gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreditCard, { className: "h-5 w-5 text-slate-400" }), "Payment"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1.5 text-slate-600",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-3.5 w-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[11px] font-bold uppercase tracking-wider",
												children: "Encrypted"
											})]
										})]
									}), !isFormValid() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-lg border-2 border-dashed border-slate-200 bg-[#F7F9FA] p-6 text-center",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-slate-500" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
												className: "text-[15px] font-bold text-slate-900",
												children: "Payment Locked"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1.5 text-sm text-slate-600 max-w-[280px] mx-auto leading-relaxed",
												children: "Complete billing details to unlock secure PayPal payment."
											}),
											Object.keys(touched).length > 0 && getMissingFields().length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-4 flex items-start gap-2.5 text-left bg-red-50 text-red-700 p-3.5 rounded-md text-sm border border-red-100",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
													className: "font-semibold",
													children: "Missing required fields:"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
													className: "list-disc pl-4 mt-1.5 space-y-0.5 opacity-90",
													children: getMissingFields().map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: f.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase()) }, f))
												})] })]
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "space-y-4 animate-in fade-in duration-300",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "rounded-lg border border-slate-200 p-5 bg-[#F7F9FA]",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[13px] font-bold text-slate-900 uppercase tracking-wide",
														children: "Pay Securely"
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
													src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
													alt: "PayPal",
													className: "h-4 opacity-90"
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "min-h-[150px]",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayPalScriptProvider, {
													options: initialOptions,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PayPalButtons, {
														style: {
															layout: "vertical",
															shape: "rect",
															color: "gold"
														},
														createOrder: async () => {
															try {
																const { orderId } = await createPayPalOrderFn({ data: items.map((item) => ({
																	productId: item.product_id,
																	quantity: item.quantity
																})) });
																return orderId;
															} catch (error) {
																console.error("Create order failed", error);
																toast.error("Could not initiate PayPal checkout");
																throw error;
															}
														},
														onApprove: async (data, actions) => {
															setLoading(true);
															try {
																const result = await capturePayPalOrderFn({ data: data.orderID });
																if (result.success && result.captureId) {
																	await createOrderInDatabase(data.orderID, result.captureId);
																	clear();
																	toast.success(t("order_success", language));
																	navigate({ to: "/orders" });
																} else toast.error("Payment was not completed successfully.");
															} catch (error) {
																console.error("Capture order failed", error);
																toast.error("Payment capture failed. Please contact support.");
															} finally {
																setLoading(false);
															}
														},
														onCancel: () => {
															toast.info("Payment cancelled. You can try again when ready.");
														},
														onError: (err) => {
															console.error("PayPal Error:", err);
															toast.error("An error occurred with PayPal.");
														}
													})
												})
											})]
										})
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-3 gap-3 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center text-center gap-2 p-3 rounded-lg bg-white border border-slate-200 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "h-5 w-5 text-emerald-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight",
										children: [
											"Secure",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Checkout"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center text-center gap-2 p-3 rounded-lg bg-white border border-slate-200 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheckBig, { className: "h-5 w-5 text-blue-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight",
										children: [
											"PayPal",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Protected"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-col items-center justify-center text-center gap-2 p-3 rounded-lg bg-white border border-slate-200 shadow-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "h-5 w-5 text-slate-600" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight",
										children: [
											"Encrypted",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"Payment"
										]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-center text-slate-500 px-4 pt-2",
							children: "Your payment information is processed securely by PayPal. Saloree never stores your credit card details or PayPal credentials."
						})
					]
				})]
			})]
		})]
	});
}
//#endregion
export { Checkout as component };
