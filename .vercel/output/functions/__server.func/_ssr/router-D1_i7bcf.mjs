import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth, t as AuthProvider } from "./auth-CGUiEWeI.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as useQuery, r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { r as useSiteSettings, t as useFooterLinks } from "./useSiteSettings-9teR3ZGn.mjs";
import { _ as useNavigate, c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, j as redirect, l as useLocation, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./Logo-Cxxeu0YG.mjs";
import { At as ChevronDown, C as Shirt, D as Search, H as Menu, It as Book, J as LogOut, L as Package, Nt as Car, Ot as ChevronRight, Q as LayoutGrid, _ as Sparkles, a as User, at as Heart, ct as Globe, et as Laptop, ht as Dumbbell, it as House, lt as Gamepad2, m as Store, n as X, p as Tag, v as Sofa, x as ShoppingCart } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as Route$28 } from "./auth.callback-g_-EIyxK.mjs";
import { n as useCart, t as CartProvider } from "./cart-DwCUaj-A.mjs";
import { a as t, i as LocaleProvider, n as CURRENCY_META, o as useLocale, r as LANGUAGE_META, t as COUNTRY_META } from "./locale-BbUoQ0KM.mjs";
import { t as Route$29 } from "./categories._slug-CyAZmQEe.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, t as Dialog } from "./dialog-BaN4TOry.mjs";
import { t as Route$30 } from "./login-DltsUIfL.mjs";
import { t as Route$31 } from "./marketplace-CeB35TXF.mjs";
import { t as Route$32 } from "./products._slug-CCKUCwkD.mjs";
import { t as Route$33 } from "./register-BnXiUA0R.mjs";
import { a as DropdownMenuTrigger, i as DropdownMenuSeparator, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-C0WpCDvY.mjs";
import { t as Route$34 } from "./stores._slug-BvZBUek_.mjs";
import { t as Route$35 } from "./seller.theme-customizer-B5ADyolk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D1_i7bcf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-D_bRdErC.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
}
function CountryModal({ open, onClose }) {
	const { language, currency, country, setLocale } = useLocale();
	const [draft, setDraft] = (0, import_react.useState)({
		language,
		currency,
		country
	});
	const handleOpenChange = (o) => {
		if (o) setDraft({
			language,
			currency,
			country
		});
		else onClose();
	};
	const handleSave = () => {
		setLocale(draft);
		onClose();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: handleOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "w-full max-w-sm rounded-2xl p-0 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-gradient-to-br from-primary to-primary/80 px-6 py-5 text-primary-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-bold text-primary-foreground",
						children: t("change_country", language)
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-primary-foreground/80",
						children: t("shopping_on", language)
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 px-6 py-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: t("country_region", language)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: draft.country,
								onChange: (e) => setDraft((d) => ({
									...d,
									country: e.target.value
								})),
								className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
								children: Object.entries(COUNTRY_META).map(([code, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: code,
									children: [
										meta.flag,
										" ",
										meta.label
									]
								}, code))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: t("language", language)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: draft.language,
								onChange: (e) => setDraft((d) => ({
									...d,
									language: e.target.value
								})),
								className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
								children: Object.entries(LANGUAGE_META).map(([code, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: code,
									children: [
										meta.flag,
										" ",
										meta.label,
										" (",
										meta.code,
										")"
									]
								}, code))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
								children: t("currency", language)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: draft.currency,
								onChange: (e) => setDraft((d) => ({
									...d,
									currency: e.target.value
								})),
								className: "w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
								children: Object.entries(CURRENCY_META).map(([code, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: code,
									children: [
										meta.symbol,
										" ",
										code,
										" – ",
										meta.name
									]
								}, code))
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "flex gap-2 px-6 pb-5 pt-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						className: "flex-1",
						onClick: onClose,
						children: t("close", language)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "flex-1",
						onClick: handleSave,
						children: t("save", language)
					})]
				})
			]
		})
	});
}
function RadioRow({ checked, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: `flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-primary/5 ${checked ? "font-semibold text-primary" : "text-foreground"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: `grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 transition-colors ${checked ? "border-primary" : "border-muted-foreground/40"}`,
			children: checked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-2 w-2 rounded-full bg-primary" })
		}), children]
	});
}
function LocaleSelector({ variant = "desktop" }) {
	const { language, currency, country, setLanguage, setCurrency } = useLocale();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [countryModalOpen, setCountryModalOpen] = (0, import_react.useState)(false);
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const handler = (e) => {
			if (ref.current && !ref.current.contains(e.target)) setOpen(false);
		};
		document.addEventListener("mousedown", handler);
		return () => document.removeEventListener("mousedown", handler);
	}, [open]);
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const handler = (e) => {
			if (e.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [open]);
	const langMeta = LANGUAGE_META[language];
	const curMeta = CURRENCY_META[currency];
	const trigger = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => setOpen((o) => !o),
		"aria-label": "Language & Currency",
		className: `flex items-center gap-1.5 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-accent hover:text-accent-foreground ${open ? "bg-accent text-accent-foreground" : ""} ${variant === "mobile" ? "w-full justify-between" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-base leading-none",
					children: langMeta.flag
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-bold",
					children: langMeta.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted-foreground",
					children: "·"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-bold",
					children: [
						curMeta.symbol,
						" ",
						currency
					]
				})
			]
		}), variant === "mobile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4 text-muted-foreground" })]
	});
	const panel = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `
        bg-background text-foreground rounded-xl shadow-2xl border border-border w-72 z-[200]
        ${variant === "desktop" ? "absolute top-full mt-2 left-0" : "fixed inset-x-0 bottom-0 rounded-t-2xl rounded-b-none w-full max-w-none z-[300] shadow-2xl"}
      `,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b px-4 py-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "text-sm font-bold",
				children: [
					langMeta.flag,
					" ",
					langMeta.label,
					" · ",
					curMeta.symbol,
					" ",
					currency,
					" ·",
					" ",
					COUNTRY_META[country].flag
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setOpen(false),
				className: "rounded-md p-1 hover:bg-accent text-muted-foreground hover:text-foreground transition-colors",
				"aria-label": "Close",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-h-[65vh] overflow-y-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pt-4 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: t("change_language", language)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-0.5",
						children: Object.entries(LANGUAGE_META).map(([code, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioRow, {
							checked: language === code,
							onClick: () => {
								setLanguage(code);
								if (variant === "mobile") setOpen(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base leading-none",
								children: meta.flag
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex-1",
								children: [meta.label, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1.5 text-xs text-muted-foreground",
									children: ["– ", meta.code]
								})]
							})]
						}, code))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-4 border-t" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pt-3 pb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground",
						children: t("change_currency", language)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-0.5",
						children: Object.entries(CURRENCY_META).map(([code, meta]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioRow, {
							checked: currency === code,
							onClick: () => {
								setCurrency(code);
								if (variant === "mobile") setOpen(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "min-w-[20px] text-center font-bold text-primary",
								children: meta.symbol
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex-1",
								children: [code, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ml-1.5 text-xs text-muted-foreground",
									children: ["– ", meta.name]
								})]
							})]
						}, code))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-4 border-t" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-4 pt-3 pb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground",
							children: t("country_region", language)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 text-xs text-muted-foreground",
							children: t("shopping_on", language)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setOpen(false);
								setCountryModalOpen(true);
							},
							className: "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/5 transition-colors",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base",
									children: COUNTRY_META[country].flag
								}), COUNTRY_META[country].label]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						})
					]
				})
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref,
		className: `relative ${variant === "mobile" ? "w-full" : ""}`,
		children: [trigger, open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [variant === "mobile" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "fixed inset-0 z-[200] bg-black/50",
			onClick: () => setOpen(false)
		}), panel] })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CountryModal, {
		open: countryModalOpen,
		onClose: () => setCountryModalOpen(false)
	})] });
}
function getCategoryIcon(iconName) {
	if (!iconName) return Tag;
	const name = iconName.toLowerCase().replace(/[^a-z0-9]/g, "");
	if (name === "laptop") return Laptop;
	if (name === "shirt") return Shirt;
	if (name === "sofa") return Sofa;
	if (name === "sparkles") return Sparkles;
	if (name === "dumbbell") return Dumbbell;
	if (name === "gamepad2" || name === "gamepad") return Gamepad2;
	if (name === "car") return Car;
	if (name === "book") return Book;
	return Tag;
}
function Header() {
	const { user, roles, signOut } = useAuth();
	const { count } = useCart();
	const { language } = useLocale();
	const navigate = useNavigate();
	const [q, setQ] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [drawerOpen, setDrawerOpen] = (0, import_react.useState)(false);
	const [touchStart, setTouchStart] = (0, import_react.useState)(null);
	const [touchEnd, setTouchEnd] = (0, import_react.useState)(null);
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("*").order("name");
			if (error) {
				console.error("[header-categories] Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	const onSearch = (e) => {
		e.preventDefault();
		if (category !== "all") navigate({
			to: "/categories/$slug",
			params: { slug: category },
			search: { q }
		});
		else navigate({
			to: "/marketplace",
			search: { q }
		});
	};
	const handleTouchStart = (e) => {
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};
	const handleTouchMove = (e) => {
		setTouchEnd(e.targetTouches[0].clientX);
	};
	const handleTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		if (touchStart - touchEnd > 50) setDrawerOpen(false);
	};
	let pathname = "";
	try {
		pathname = useLocation()?.pathname || "";
	} catch (e) {
		console.error("[Header] Router location not ready:", e);
	}
	if ([
		"/login",
		"/register",
		"/auth/callback"
	].includes(pathname)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-md py-3.5 shadow-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "flex items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { imgClassName: "h-9 w-auto object-contain" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/",
				className: "text-sm font-medium text-muted-foreground hover:text-[#FF3B3B] transition-colors duration-200",
				children: t("home", language) || "Back to Home"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "w-full border-b border-gray-100 bg-white sticky top-0 z-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-[#f8fafc] border-b border-slate-200 text-slate-600 text-[11px] font-medium py-1.5 px-4 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-7xl mx-auto flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleSelector, { variant: "desktop" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "hidden sm:inline text-slate-300",
								children: "|"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/seller",
								className: "hover:text-[#E11D48] transition-colors font-semibold",
								children: "Become a Seller"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#E11D48] animate-pulse",
							children: "●"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "uppercase tracking-wider font-semibold text-[10px] text-slate-500",
							children: "Live Marketplace Ticker"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto px-4 py-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 sm:gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "lg:hidden h-10 w-10 shrink-0 hover:bg-slate-100 rounded-xl",
							"aria-label": "Open menu",
							onClick: () => setDrawerOpen(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5 text-slate-700" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-editorial text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900",
							children: "Saloree"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden lg:flex flex-1 max-w-2xl justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onSearch,
							className: "relative flex w-full items-center bg-[#f1f5f9] rounded-xl overflow-hidden border border-transparent focus-within:border-slate-300 focus-within:bg-white transition-all duration-200",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative shrink-0 flex items-center h-11 border-r border-slate-200",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: category,
										onChange: (e) => setCategory(e.target.value),
										className: "h-full bg-transparent pr-7 pl-4 text-xs font-semibold uppercase tracking-wider text-slate-700 hover:text-slate-900 outline-none cursor-pointer appearance-none",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "all",
											children: "All Categories"
										}), categories?.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: cat.slug,
											children: cat.name
										}, cat.id))]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3 absolute right-2.5 pointer-events-none text-slate-400" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									value: q,
									onChange: (e) => setQ(e.target.value),
									placeholder: "Search for products, brands and more",
									className: "h-11 w-full bg-transparent px-4 text-sm outline-none text-slate-900 placeholder:text-slate-400"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									"aria-label": "Search",
									className: "px-5 h-11 hover:bg-slate-900 hover:text-white text-slate-600 transition-colors shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 sm:gap-6 shrink-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								className: "hidden lg:flex flex-col items-center group text-slate-700 hover:text-[#E11D48] transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5 mb-0.5 group-hover:text-[#E11D48] transition-colors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-wider font-semibold",
									children: "Wishlist"
								})]
							}),
							user && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/orders",
								className: "hidden lg:flex flex-col items-center group text-slate-700 hover:text-[#E11D48] transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "size-5 mb-0.5 group-hover:text-[#E11D48] transition-colors" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-wider font-semibold",
									children: "Orders"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/cart",
								className: "flex flex-col items-center group relative text-slate-700 hover:text-[#E11D48] transition-colors",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-5 mb-0.5 group-hover:text-[#E11D48] transition-colors" }), count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute -top-1.5 -right-2.5 bg-[#E11D48] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs",
										children: count
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] uppercase tracking-wider font-semibold",
									children: "Cart"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "hidden sm:inline w-[1px] h-5 bg-slate-200" }),
							user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "ghost",
									className: "gap-2 h-10 px-3 hover:bg-slate-100 rounded-xl border border-slate-200",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-4 text-slate-600" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "max-w-[90px] truncate text-xs font-semibold text-slate-800",
											children: user.email?.split("@")[0]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-3 text-slate-400" })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								className: "w-56 rounded-xl shadow-xl mt-2 p-1.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										className: "flex flex-col items-start gap-1 py-2 px-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-slate-400 font-medium",
											children: "Logged in as"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm font-semibold text-slate-900 truncate w-full",
											children: user.email
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										asChild: true,
										className: "rounded-lg cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/orders",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "mr-2 size-4 text-slate-400" }),
												" ",
												t("my_orders", language)
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										asChild: true,
										className: "rounded-lg cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/seller",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "mr-2 size-4 text-slate-400" }),
												" ",
												t("seller_dashboard", language)
											]
										})
									}),
									roles.includes("admin") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
										asChild: true,
										className: "rounded-lg cursor-pointer",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/admin",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "mr-2 size-4 text-slate-400" }),
												" ",
												t("admin_dashboard", language)
											]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
										onClick: signOut,
										className: "text-destructive rounded-lg cursor-pointer focus:bg-destructive/5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 size-4" }),
											" ",
											t("sign_out", language)
										]
									})
								]
							})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "ghost",
									className: "h-9 px-3.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/login",
										children: "Login"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "h-9 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-[#E11D48] rounded-lg transition-colors",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: "/register",
										children: "Register"
									})
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "px-4 sm:px-6 lg:px-8 border-t border-slate-200/80 overflow-x-auto no-scrollbar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "flex min-w-max gap-8 py-2.5 text-xs font-semibold text-slate-700 uppercase tracking-wider",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-[#E11D48] transition-colors py-1",
								children: "Today's Deals"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-[#E11D48] transition-colors py-1",
								children: "New Arrivals"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-[#E11D48] transition-colors py-1",
								children: "Best Sellers"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-[#E11D48] transition-colors py-1",
								children: "Trending"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-[#E11D48] transition-colors py-1",
								children: "Stores"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-[#E11D48] transition-colors py-1",
								children: "Special Offers"
							}) })
						]
					})
				})
			}),
			drawerOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300 lg:hidden",
				onClick: () => setDrawerOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				onTouchStart: handleTouchStart,
				onTouchMove: handleTouchMove,
				onTouchEnd: handleTouchEnd,
				className: `fixed inset-y-0 left-0 z-50 flex h-full w-[85%] max-w-[360px] flex-col bg-background shadow-2xl transition-transform duration-300 ease-in-out lg:hidden ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-[#0F172A] px-5 py-6 text-white relative flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setDrawerOpen(false),
						className: "absolute right-4 top-4 text-gray-400 hover:text-white transition-colors",
						"aria-label": "Close menu",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-6" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white font-bold border border-white/10 text-xl shadow-inner",
							children: user ? user.email?.charAt(0).toUpperCase() : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: user ? `Hello, ${user.email?.split("@")[0]}` : "Hello, Sign In"
						}), !user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							onClick: () => setDrawerOpen(false),
							className: "text-xs font-bold text-[#FF3B3B] underline hover:text-[#E03030] transition-colors",
							children: "Sign In to Your Account"
						})] })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 overflow-y-auto px-4 py-4 space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: onSearch,
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "text",
								value: q,
								onChange: (e) => setQ(e.target.value),
								placeholder: "Search products...",
								className: "h-10 w-full rounded-full border border-gray-200 pl-4 pr-12 text-sm outline-none focus:border-[#FF3B3B] bg-gray-50 focus:bg-white"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								"aria-label": "Search",
								className: "absolute right-1 top-1 grid h-8 w-10 place-items-center rounded-full bg-[#FF3B3B] text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5",
								children: "Settings & Language"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleSelector, { variant: "mobile" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 px-2",
							children: "Main Menu"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "space-y-1",
							children: [
								{
									to: "/",
									label: "Home",
									icon: House
								},
								{
									to: "/marketplace",
									label: "Shop Marketplace",
									icon: LayoutGrid
								},
								{
									to: "/orders",
									label: "My Orders",
									icon: Package,
									authRequired: true
								},
								{
									to: "/cart",
									label: "Shopping Cart",
									icon: ShoppingCart,
									countBadge: count
								},
								{
									to: "/seller",
									label: "Become a Seller",
									icon: Store
								}
							].map((item) => {
								if (item.authRequired && !user) return null;
								const Icon = item.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: item.to,
									onClick: () => setDrawerOpen(false),
									className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-1.5",
										children: [item.countBadge !== void 0 && item.countBadge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "rounded-full bg-[#FF3B3B] px-2 py-0.5 text-xs font-bold text-white",
											children: item.countBadge
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-gray-400" })]
									})]
								}, item.label);
							})
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-bold text-gray-400 uppercase tracking-wider mb-2.5 px-2",
							children: "Shop by Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "space-y-1",
							children: (categories ?? []).map((cat) => {
								const Icon = getCategoryIcon(cat.icon);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/categories/$slug",
									params: { slug: cat.slug },
									onClick: () => setDrawerOpen(false),
									className: "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-gray-400" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.name })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-gray-400" })]
								}, cat.id);
							})
						})] }),
						user && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-t border-gray-100 pt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => {
									setDrawerOpen(false);
									signOut();
								},
								className: "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-destructive hover:bg-destructive/5 transition-all",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sign Out" })]
							})
						})
					]
				})]
			})
		]
	});
}
function Footer() {
	const { language, translateCategory } = useLocale();
	const { data: settings } = useSiteSettings();
	const { data: footerLinks = [] } = useFooterLinks();
	settings?.footer_description;
	settings?.footer_text || `${(/* @__PURE__ */ new Date()).getFullYear()}`;
	if (settings?.social_links && typeof settings.social_links === "object") settings.social_links;
	Array.from(new Set(footerLinks.map((l) => l.category)));
	let pathname = "";
	try {
		pathname = useLocation()?.pathname || "";
	} catch (e) {
		console.error("[Footer] Router location not ready:", e);
	}
	if ([
		"/login",
		"/register",
		"/auth/callback"
	].includes(pathname)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "w-full border-t bg-background py-6 mt-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row text-xs text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Saloree. All rights reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:underline",
						children: "Privacy Policy"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:underline",
						children: "Terms of Service"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:underline",
						children: "Contact Support"
					})
				]
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
		className: "mt-16 bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lg:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "font-editorial text-3xl font-extrabold tracking-tight mb-4 inline-block text-white",
								children: "Saloree"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mb-6",
								children: "Your global marketplace for premium products. We connect passionate sellers with discerning buyers across every category."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex items-center gap-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "mailto:info@saloree.com",
									className: "text-xs font-semibold text-[#E11D48] hover:underline",
									children: "info@saloree.com"
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-xs uppercase tracking-wider mb-5 text-white",
						children: "SHOP"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-xs sm:text-sm text-slate-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-white transition-colors",
								children: "Marketplace"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-white transition-colors",
								children: "Categories"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "hover:text-white transition-colors",
								children: "Stores"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-xs uppercase tracking-wider mb-5 text-white",
						children: "SELL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-xs sm:text-sm text-slate-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/seller",
								className: "hover:text-white transition-colors",
								children: "Become a Seller"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/seller",
								className: "hover:text-white transition-colors",
								children: "Seller Dashboard"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/seller/products",
								className: "hover:text-white transition-colors",
								children: "Products"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/seller/orders",
								className: "hover:text-white transition-colors",
								children: "Orders"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-xs uppercase tracking-wider mb-5 text-white",
						children: "ACCOUNT & SUPPORT"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-xs sm:text-sm text-slate-400",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								className: "hover:text-white transition-colors",
								children: "Login"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/register",
								className: "hover:text-white transition-colors",
								children: "Register"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/orders",
								className: "hover:text-white transition-colors",
								children: "My Orders"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/cart",
								className: "hover:text-white transition-colors",
								children: "Cart"
							}) })
						]
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "© 2026 Saloree. All rights reserved." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center gap-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Global Multi-Vendor Marketplace" })
				})]
			})]
		})
	});
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-primary",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "This page doesn't exist or has moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
					children: "Back to Saloree"
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold",
					children: "Something went wrong"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Try again or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$27 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Saloree — Build. Sell. Grow." },
			{
				name: "description",
				content: "Saloree is a modern multi-vendor marketplace where anyone can open a store and start selling online."
			},
			{
				name: "author",
				content: "Saloree"
			},
			{
				property: "og:title",
				content: "Saloree — Build. Sell. Grow."
			},
			{
				property: "og:description",
				content: "Modern multi-vendor marketplace. Open your store in minutes."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				property: "og:image",
				content: "/src/assets/logo.png.png"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:image",
				content: "/src/assets/logo.png.png"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/src/assets/logo.png.png"
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/src/assets/logo.png.png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function SiteThemeIntegrator() {
	const { data: settings } = useSiteSettings();
	(0, import_react.useEffect)(() => {
		if (settings) {
			if (settings.primary_color) {
				document.documentElement.style.setProperty("--primary", settings.primary_color);
				document.documentElement.style.setProperty("--ring", settings.primary_color);
				const color = settings.primary_color.trim();
				if (color.startsWith("#") && color.length === 7) document.documentElement.style.setProperty("--primary-soft", `${color}1a`);
				else document.documentElement.style.setProperty("--primary-soft", `${color}1a`);
			} else {
				document.documentElement.style.removeProperty("--primary");
				document.documentElement.style.removeProperty("--ring");
				document.documentElement.style.removeProperty("--primary-soft");
			}
			if (settings.button_color) document.documentElement.style.setProperty("--button", settings.button_color);
			else document.documentElement.style.removeProperty("--button");
		}
	}, [settings]);
	return null;
}
function RootComponent() {
	const { queryClient } = Route$27.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocaleProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CartProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteThemeIntegrator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-screen flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
				richColors: true,
				position: "top-right"
			})
		] }) }) })
	});
}
var $$splitComponentImporter$25 = () => import("./seller-R9xQd2NA.mjs");
var Route$26 = createFileRoute("/seller")({
	head: () => ({ meta: [{ title: "Seller Dashboard — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./saloree-control-C5_ABlBF.mjs");
var Route$25 = createFileRoute("/saloree-control")({
	head: () => ({ meta: [{ title: "Control Panel — Saloree" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./orders-BMhVnLMk.mjs");
var Route$24 = createFileRoute("/orders")({
	head: () => ({ meta: [{ title: "My Orders — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./checkout-C6l1zngV.mjs");
var Route$23 = createFileRoute("/checkout")({
	head: () => ({ meta: [{ title: "Checkout — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./cart-DB2DpmIn.mjs");
var Route$22 = createFileRoute("/cart")({
	head: () => ({ meta: [{ title: "Cart — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./admin-B7jyIRw8.mjs");
var Route$21 = createFileRoute("/admin")({
	head: () => ({ meta: [{ title: "Admin — Saloree" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./routes-Cym6s-Wo.mjs");
var Route$20 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Saloree — Discover Premium Products & Exclusive Marketplace Deals" },
		{
			name: "description",
			content: "Discover top products from trusted independent sellers at the best prices on Saloree."
		},
		{
			property: "og:title",
			content: "Saloree — Global Multi-Vendor Marketplace"
		},
		{
			property: "og:description",
			content: "Discover top products from trusted independent sellers at the best prices."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./seller.index-DwndadBl.mjs");
var Route$19 = createFileRoute("/seller/")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./admin.index-DFZmNOZw.mjs");
var Route$18 = createFileRoute("/admin/")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./seller.themes-DMIkP2VO.mjs");
var Route$17 = createFileRoute("/seller/themes")({
	head: () => ({ meta: [{ title: "Online Store Themes — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./seller.store-gfCDPGkf.mjs");
var Route$16 = createFileRoute("/seller/store")({
	head: () => ({ meta: [{ title: "Store Settings — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./seller.products-C7HKJkfE.mjs");
var Route$15 = createFileRoute("/seller/products")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./seller.preferences-BkpnVqxL.mjs");
var Route$14 = createFileRoute("/seller/preferences")({
	head: () => ({ meta: [{ title: "Online Store Preferences — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./seller.pages-rjsc59bq.mjs");
var Route$13 = createFileRoute("/seller/pages")({
	head: () => ({ meta: [{ title: "Online Store Pages — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./seller.orders-TVa7dYkR.mjs");
var Route$12 = createFileRoute("/seller/orders")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./seller.navigation-BKqf6Yym.mjs");
var Route$11 = createFileRoute("/seller/navigation")({
	head: () => ({ meta: [{ title: "Navigation Menus — Saloree" }] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./seller.discounts-DGpmzqfC.mjs");
var Route$10 = createFileRoute("/seller/discounts")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./seller.customers-uzhc8djy.mjs");
var Route$9 = createFileRoute("/seller/customers")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./seller.content-D0t-p5KF.mjs");
var Route$8 = createFileRoute("/seller/content")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./seller.analytics-Btr4C0So.mjs");
var Route$7 = createFileRoute("/seller/analytics")({
	head: () => ({ meta: [{ title: "Analytics — Saloree Seller" }] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./saloree-control.content-mA4PVh9A.mjs");
var Route$6 = createFileRoute("/saloree-control/content")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./admin.users-BI-27g8T.mjs");
var Route$5 = createFileRoute("/admin/users")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./admin.stores-k8XCfoAS.mjs");
var Route$4 = createFileRoute("/admin/stores")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./admin.orders-C8a-SrH_.mjs");
var Route$3 = createFileRoute("/admin/orders")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./admin.login-F2IZ0AVm.mjs");
var Route$2 = createFileRoute("/admin/login")({
	head: () => ({ meta: [{ title: "Admin Login — Saloree" }, {
		name: "robots",
		content: "noindex, nofollow"
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var Route$1 = createFileRoute("/admin/content")({ beforeLoad: () => {
	throw redirect({ to: "/saloree-control/content" });
} });
var $$splitComponentImporter = () => import("./admin.categories-B_aeAAUb.mjs");
var Route = createFileRoute("/admin/categories")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var SellerRoute = Route$26.update({
	id: "/seller",
	path: "/seller",
	getParentRoute: () => Route$27
});
var SaloreeControlRoute = Route$25.update({
	id: "/saloree-control",
	path: "/saloree-control",
	getParentRoute: () => Route$27
});
var RegisterRoute = Route$33.update({
	id: "/register",
	path: "/register",
	getParentRoute: () => Route$27
});
var OrdersRoute = Route$24.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => Route$27
});
var MarketplaceRoute = Route$31.update({
	id: "/marketplace",
	path: "/marketplace",
	getParentRoute: () => Route$27
});
var LoginRoute = Route$30.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$27
});
var CheckoutRoute = Route$23.update({
	id: "/checkout",
	path: "/checkout",
	getParentRoute: () => Route$27
});
var CartRoute = Route$22.update({
	id: "/cart",
	path: "/cart",
	getParentRoute: () => Route$27
});
var AdminRoute = Route$21.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$27
});
var IndexRoute = Route$20.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$27
});
var SellerIndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => SellerRoute
});
var AdminIndexRoute = Route$18.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var StoresSlugRoute = Route$34.update({
	id: "/stores/$slug",
	path: "/stores/$slug",
	getParentRoute: () => Route$27
});
var SellerThemesRoute = Route$17.update({
	id: "/themes",
	path: "/themes",
	getParentRoute: () => SellerRoute
});
var SellerThemeCustomizerRoute = Route$35.update({
	id: "/theme-customizer",
	path: "/theme-customizer",
	getParentRoute: () => SellerRoute
});
var SellerStoreRoute = Route$16.update({
	id: "/store",
	path: "/store",
	getParentRoute: () => SellerRoute
});
var SellerProductsRoute = Route$15.update({
	id: "/products",
	path: "/products",
	getParentRoute: () => SellerRoute
});
var SellerPreferencesRoute = Route$14.update({
	id: "/preferences",
	path: "/preferences",
	getParentRoute: () => SellerRoute
});
var SellerPagesRoute = Route$13.update({
	id: "/pages",
	path: "/pages",
	getParentRoute: () => SellerRoute
});
var SellerOrdersRoute = Route$12.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => SellerRoute
});
var SellerNavigationRoute = Route$11.update({
	id: "/navigation",
	path: "/navigation",
	getParentRoute: () => SellerRoute
});
var SellerDiscountsRoute = Route$10.update({
	id: "/discounts",
	path: "/discounts",
	getParentRoute: () => SellerRoute
});
var SellerCustomersRoute = Route$9.update({
	id: "/customers",
	path: "/customers",
	getParentRoute: () => SellerRoute
});
var SellerContentRoute = Route$8.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => SellerRoute
});
var SellerAnalyticsRoute = Route$7.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => SellerRoute
});
var SaloreeControlContentRoute = Route$6.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => SaloreeControlRoute
});
var ProductsSlugRoute = Route$32.update({
	id: "/products/$slug",
	path: "/products/$slug",
	getParentRoute: () => Route$27
});
var CategoriesSlugRoute = Route$29.update({
	id: "/categories/$slug",
	path: "/categories/$slug",
	getParentRoute: () => Route$27
});
var AuthCallbackRoute = Route$28.update({
	id: "/auth/callback",
	path: "/auth/callback",
	getParentRoute: () => Route$27
});
var AdminUsersRoute = Route$5.update({
	id: "/users",
	path: "/users",
	getParentRoute: () => AdminRoute
});
var AdminStoresRoute = Route$4.update({
	id: "/stores",
	path: "/stores",
	getParentRoute: () => AdminRoute
});
var AdminOrdersRoute = Route$3.update({
	id: "/orders",
	path: "/orders",
	getParentRoute: () => AdminRoute
});
var AdminLoginRoute = Route$2.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => AdminRoute
});
var AdminContentRoute = Route$1.update({
	id: "/content",
	path: "/content",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminCategoriesRoute: Route.update({
		id: "/categories",
		path: "/categories",
		getParentRoute: () => AdminRoute
	}),
	AdminContentRoute,
	AdminLoginRoute,
	AdminOrdersRoute,
	AdminStoresRoute,
	AdminUsersRoute,
	AdminIndexRoute
};
var AdminRouteWithChildren = AdminRoute._addFileChildren(AdminRouteChildren);
var SaloreeControlRouteChildren = { SaloreeControlContentRoute };
var SaloreeControlRouteWithChildren = SaloreeControlRoute._addFileChildren(SaloreeControlRouteChildren);
var SellerRouteChildren = {
	SellerAnalyticsRoute,
	SellerContentRoute,
	SellerCustomersRoute,
	SellerDiscountsRoute,
	SellerNavigationRoute,
	SellerOrdersRoute,
	SellerPagesRoute,
	SellerPreferencesRoute,
	SellerProductsRoute,
	SellerStoreRoute,
	SellerThemeCustomizerRoute,
	SellerThemesRoute,
	SellerIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRouteWithChildren,
	CartRoute,
	CheckoutRoute,
	LoginRoute,
	MarketplaceRoute,
	OrdersRoute,
	RegisterRoute,
	SaloreeControlRoute: SaloreeControlRouteWithChildren,
	SellerRoute: SellerRoute._addFileChildren(SellerRouteChildren),
	AuthCallbackRoute,
	CategoriesSlugRoute,
	ProductsSlugRoute,
	StoresSlugRoute
};
var routeTree = Route$27._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
