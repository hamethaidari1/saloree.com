import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link, l as useLocation } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as RefreshCw, Bt as ArrowRight, D as Search, L as Package, Q as LayoutGrid, T as ShieldCheck, Y as Lock, a as User, at as Heart, it as House, m as Store, ot as Headphones, p as Tag, q as Mail, s as Truck } from "../_libs/lucide-react.mjs";
import { n as cn } from "./button-Cr1ZI0g1.mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as ProductCard } from "./ProductCard-BwVpjIa7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cym6s-Wo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_1_default = "/assets/hero-1-CqkTu3IV.jpg";
function HomeHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative h-[480px] sm:h-[520px] lg:h-[600px] w-full bg-slate-100 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: hero_1_default,
					alt: "Saloree Fashion & Lifestyle Collection",
					className: "absolute inset-0 w-full h-full object-cover object-center"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:from-white/90 sm:via-white/50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-center items-start",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[#E11D48] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4",
							children: "GLOW EVERY DAY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-editorial text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05] mb-4 sm:mb-6 text-slate-900",
							children: [
								"Summer Vibes",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-slate-900 sm:text-transparent sm:[-webkit-text-stroke:1.5px_rgba(0,0,0,0.7)]",
									children: "Collection 2026"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm sm:text-base lg:text-lg text-slate-600 mb-6 sm:mb-8 max-w-md leading-relaxed",
							children: "Discover curated essentials and top products from independent sellers across the globe."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/marketplace",
								className: "inline-flex items-center gap-3 bg-black text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#E11D48] transition-all duration-300 shadow-md hover:shadow-xl",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Shop Now" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/marketplace",
								className: "inline-flex items-center justify-center bg-white/80 backdrop-blur border border-slate-300 text-slate-900 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold hover:bg-white transition-all duration-300",
								children: "Explore"
							})]
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-[#E11D48] text-white py-3.5 px-4 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-medium",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2.5 h-2.5 bg-white rounded-full animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-extrabold tracking-wide uppercase",
							children: "FLASH SALE & SPECIAL OFFERS"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Up to 70% OFF Selected Items" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marketplace",
						className: "inline-flex items-center gap-1 font-bold text-xs uppercase underline underline-offset-4 hover:text-slate-200 transition-colors",
						children: "VIEW ALL PRODUCTS →"
					})
				]
			})
		})]
	});
}
var Beauty___Health_png_default = "/assets/Beauty%20_%20Health.png-PtD58i6O.jpg";
var Electronics_png_default = "/assets/Electronics.png-DI9Ewn6J.jpg";
var Fashion_png_default = "/assets/Fashion.png-DJodh_PZ.jpg";
var Home___Kitchen_png_default = "/assets/Home%20_%20Kitchen.png-906DZnfQ.jpg";
var Sports___Outdoors_png_default = "/assets/Sports%20_%20Outdoors.png-g-vr0aQa.jpg";
var Books___Stationery_png_default = "/assets/Books%20_%20Stationery.png-DStU8OZH.jpg";
var Toys___Games_png_default = "/assets/Toys%20_%20Games.png-B3ar_kag.jpg";
var Automotive_png_default = "/assets/Automotive.png-RUO0Fcgf.jpg";
function ShopByCategory() {
	const categoryItems = [
		{
			title: "Beauty & Apothecary",
			shortTitle: "BEAUTY",
			slug: "beauty",
			image: Beauty___Health_png_default,
			featured: true
		},
		{
			title: "Electronics",
			shortTitle: "TECH",
			slug: "electronics",
			image: Electronics_png_default,
			featured: false
		},
		{
			title: "Fashion",
			shortTitle: "FASHION",
			slug: "fashion",
			image: Fashion_png_default,
			featured: false
		},
		{
			title: "Home & Living",
			shortTitle: "HOME",
			slug: "home-kitchen",
			image: Home___Kitchen_png_default,
			featured: false
		},
		{
			title: "Sportswear",
			shortTitle: "SPORTS",
			slug: "sports-outdoors",
			image: Sports___Outdoors_png_default,
			featured: false
		},
		{
			title: "Books & Stationery",
			shortTitle: "BOOKS",
			slug: "books-stationery",
			image: Books___Stationery_png_default,
			featured: false
		},
		{
			title: "Toys & Games",
			shortTitle: "TOYS",
			slug: "toys-games",
			image: Toys___Games_png_default,
			featured: false
		},
		{
			title: "Automotive",
			shortTitle: "AUTO",
			slug: "automotive",
			image: Automotive_png_default,
			featured: false
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between mb-8 sm:mb-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900",
					children: "Shop by Category"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2",
					children: "Browse our curated collections"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/marketplace",
					className: "flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#E11D48] transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View All" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex sm:hidden overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4 mb-6",
				children: categoryItems.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/categories/$slug",
					params: { slug: cat.slug },
					className: "flex flex-col items-center shrink-0 w-20 text-center group",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-16 h-16 rounded-full overflow-hidden p-0.5 border border-slate-200 group-hover:border-[#E11D48] transition-all bg-slate-50 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cat.image,
							alt: cat.title,
							className: "w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] font-bold tracking-wider text-slate-800 uppercase mt-2 group-hover:text-[#E11D48] truncate max-w-full",
						children: cat.shortTitle
					})]
				}, `mobile-${cat.slug}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/categories/$slug",
					params: { slug: categoryItems[0].slug },
					className: "group relative overflow-hidden rounded-2xl aspect-square md:col-span-2 md:row-span-2 shadow-sm hover:shadow-xl transition-all duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: categoryItems[0].image,
							alt: categoryItems[0].title,
							className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-6 left-6 right-6 text-white",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl sm:text-2xl lg:text-3xl font-bold font-editorial",
								children: categoryItems[0].title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs sm:text-sm text-slate-200 mt-1 opacity-90",
								children: "Discover curated collection"
							})]
						})
					]
				}), categoryItems.slice(1, 5).map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/categories/$slug",
					params: { slug: cat.slug },
					className: "group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-300",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: cat.image,
							alt: cat.title,
							className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute bottom-4 left-4 right-4 text-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm sm:text-base font-bold font-editorial",
								children: cat.title
							})
						})
					]
				}, cat.slug))]
			})
		]
	});
}
function TrustFeatures() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-slate-200 py-10 bg-slate-50/50",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-center",
				children: [
					{
						icon: Truck,
						title: "Worldwide Shipping",
						subtitle: "Global delivery support"
					},
					{
						icon: Lock,
						title: "Secure Checkout",
						subtitle: "Encrypted transactions"
					},
					{
						icon: RefreshCw,
						title: "Easy Returns",
						subtitle: "Hassle-free return policy"
					},
					{
						icon: ShieldCheck,
						title: "Buyer Protection",
						subtitle: "Verified order guarantee"
					},
					{
						icon: Headphones,
						title: "Customer Support",
						subtitle: "Dedicated help desk"
					}
				].map((item) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center p-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "w-10 h-10 rounded-full bg-white border border-slate-200 shadow-soft flex items-center justify-center mb-3 text-slate-800",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-[#E11D48]" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-editorial text-sm sm:text-base font-bold text-slate-900 mb-0.5",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[11px] text-slate-500 uppercase tracking-wider font-medium",
								children: item.subtitle
							})
						]
					}, item.title);
				})
			})
		})
	});
}
function SeeTheDifference() {
	const [sliderPos, setSliderPos] = (0, import_react.useState)(50);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-16 bg-slate-50 border-y border-slate-200",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-4xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center mb-8 sm:mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-slate-900",
						children: "See the Difference"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-500 text-xs sm:text-sm mt-2",
						children: "Discover quality craftsmanship and curated collections across Saloree"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl group bg-slate-900 select-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: hero_1_default,
							alt: "Saloree Editorial Showcase",
							className: "absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-105"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute bottom-6 left-6 text-white max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] uppercase tracking-widest text-slate-300 font-bold bg-black/40 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm",
								children: "EDITORIAL HIGHLIGHT"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xl sm:text-2xl font-bold font-editorial mt-2",
								children: "Premium Marketplace Standards"
							})]
						})
					]
				})]
			})
		})
	});
}
var Avatar = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar$1, {
	ref,
	className: cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className),
	...props
}));
Avatar.displayName = Avatar$1.displayName;
var AvatarImage = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage$1, {
	ref,
	className: cn("aspect-square h-full w-full", className),
	...props
}));
AvatarImage.displayName = AvatarImage$1.displayName;
var AvatarFallback = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback$1, {
	ref,
	className: cn("flex h-full w-full items-center justify-center rounded-full bg-muted", className),
	...props
}));
AvatarFallback.displayName = AvatarFallback$1.displayName;
function PopularStores() {
	const { data: stores = [], isLoading } = useQuery({
		queryKey: ["home-popular-stores"],
		queryFn: async () => {
			const { data: storesData, error } = await supabase.from("stores").select("id, name, slug, logo_url, description, category, location, status").order("created_at", { ascending: false }).limit(6);
			if (error) {
				console.error("[PopularStores] Supabase error:", error);
				return [];
			}
			if (!storesData || storesData.length === 0) return [];
			const storeIds = storesData.map((s) => s.id);
			const { data: productsData } = await supabase.from("products").select("id, store_id, title, featured_image").in("store_id", storeIds).eq("status", "active").order("created_at", { ascending: false });
			return storesData.map((store) => {
				const storeProducts = (productsData ?? []).filter((p) => p.store_id === store.id).slice(0, 3);
				return {
					...store,
					products: storeProducts
				};
			});
		}
	});
	if (!isLoading && stores.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-end justify-between mb-8 sm:mb-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900",
				children: "Popular Stores"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2",
				children: "Explore independent sellers on Saloree"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/marketplace",
				className: "flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#E11D48] transition-colors",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "All Stores" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})]
		}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-white border border-slate-200 rounded-2xl p-4 shadow-soft animate-pulse",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 rounded-full bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-2/3 bg-slate-200 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 bg-slate-200 rounded mt-2" })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square bg-slate-200 rounded-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square bg-slate-200 rounded-lg" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square bg-slate-200 rounded-lg" })
					]
				})]
			}, i))
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4",
			children: stores.map((store) => {
				const firstLetter = (store.name || "S").charAt(0).toUpperCase();
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/stores/$slug",
					params: { slug: store.slug },
					className: "min-w-[280px] sm:min-w-0 flex-1 bg-white border border-slate-200 rounded-2xl p-4 hover:border-[#E11D48]/40 transition-all duration-300 hover:-translate-y-1 shadow-soft hover:shadow-md flex flex-col justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Avatar, {
							className: "w-12 h-12 border border-slate-100",
							children: [store.logo_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarImage, {
								src: store.logo_url,
								alt: store.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "bg-slate-900 text-white font-bold text-base",
								children: firstLetter
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-bold text-sm text-slate-900 truncate",
								children: store.name
							}), store.category && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-slate-500 truncate mt-0.5",
								children: store.category
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2",
						children: Array.from({ length: 3 }).map((_, idx) => {
							const prod = store.products[idx];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "rounded-lg aspect-square bg-slate-100 overflow-hidden border border-slate-100 relative",
								children: prod && prod.featured_image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: prod.featured_image,
									alt: prod.title,
									className: "w-full h-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-full h-full flex items-center justify-center text-slate-300",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "size-4" })
								})
							}, idx);
						})
					})] })
				}, store.id);
			})
		})]
	});
}
function BrandPartners() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "border-y border-slate-200 py-10 bg-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mb-6 font-bold",
				children: "TRUSTED BY LEADING BRANDS WORLDWIDE"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 text-slate-800",
				children: [
					{
						name: "Lumina",
						fontStyle: "font-bold"
					},
					{
						name: "Aurum",
						fontStyle: "font-bold italic"
					},
					{
						name: "Nimbus",
						fontStyle: "font-extrabold tracking-widest"
					},
					{
						name: "Vertex",
						fontStyle: "font-semibold tracking-wider"
					},
					{
						name: "Flux",
						fontStyle: "font-black"
					}
				].map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `font-editorial text-2xl sm:text-3xl ${b.fontStyle}`,
					children: b.name
				}, b.name))
			})]
		})
	});
}
function NewsletterSection() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-soft",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mx-auto mb-6 text-[#E11D48]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-6" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4",
					children: "Stay Updated with Saloree"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-500 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed",
					children: "Discover new drops, trending stores, and exclusive marketplace offers direct to your inbox."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row gap-3 max-w-md mx-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "email",
						placeholder: "Enter your email address",
						className: "flex-1 bg-white border border-slate-300 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-[#E11D48] transition-colors shadow-sm placeholder:text-slate-400",
						disabled: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/marketplace",
						className: "bg-black text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#E11D48] transition-colors shadow-sm inline-flex items-center justify-center gap-2 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Explore Deals" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] text-slate-400 mt-4 uppercase tracking-wider",
					children: "JOIN OUR GLOBAL MARKETPLACE COMMUNITY"
				})
			]
		})
	});
}
function MobileBottomNav() {
	const { user } = useAuth();
	let pathname = "";
	try {
		pathname = useLocation()?.pathname || "";
	} catch (e) {
		pathname = "";
	}
	if ([
		"/login",
		"/register",
		"/auth/callback"
	].includes(pathname)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 lg:hidden shadow-lg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid grid-cols-5 h-14 items-center max-w-md mx-auto px-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: `flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${pathname === "/" ? "text-[#E11D48]" : "text-slate-500 hover:text-slate-900"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-5 mb-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "HOME" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/marketplace",
					className: `flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${pathname.startsWith("/categories") || pathname === "/marketplace" ? "text-[#E11D48]" : "text-slate-500 hover:text-slate-900"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-5 mb-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "CATEGORIES" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/marketplace",
					className: "flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium text-slate-500 hover:text-slate-900 transition-colors",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5 mb-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SEARCH" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/cart",
					className: `flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${pathname === "/cart" ? "text-[#E11D48]" : "text-slate-500 hover:text-slate-900"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: "size-5 mb-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "WISHLIST" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: user ? "/seller" : "/login",
					className: `flex flex-col items-center justify-center min-h-[44px] py-1 text-[10px] font-medium transition-colors ${pathname.startsWith("/seller") || pathname === "/login" ? "text-[#E11D48]" : "text-slate-500 hover:text-slate-900"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-5 mb-0.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "ACCOUNT" })]
				})
			]
		})
	});
}
function Index() {
	const { data: newArrivals = [], isLoading: loadingNewArrivals } = useQuery({
		queryKey: [
			"products",
			"home",
			"new-arrivals"
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)").eq("status", "active").order("created_at", { ascending: false }).limit(12);
			if (error) {
				console.error("[new-arrivals] Supabase error:", error);
				throw error;
			}
			return (data ?? []).filter((p) => p !== null && p !== void 0 && p.slug !== null && p.slug !== void 0);
		}
	});
	function ProductGridSkeleton() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6",
			children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col rounded-2xl border border-slate-200 bg-white p-3 shadow-soft animate-pulse",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-[4/5] w-full rounded-xl bg-slate-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-3 h-3 w-1/2 rounded bg-slate-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-4 w-3/4 rounded bg-slate-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between pt-2 border-t",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/3 rounded bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/4 rounded bg-slate-200" })]
					})
				]
			}, i))
		});
	}
	function ProductGridEmptyState() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 p-12 text-center bg-slate-50",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-10 w-10 text-slate-400" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 text-base font-bold text-slate-900",
					children: "No products available"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-slate-500 max-w-xs leading-relaxed",
					children: "We couldn't find any active products right now. Check back soon!"
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "w-full pb-16 lg:pb-0 bg-white min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeHero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopByCategory, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrustFeatures, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between mb-8 sm:mb-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900",
						children: "New Arrivals"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2",
						children: "Fresh drops, just for you"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/marketplace",
						className: "flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#E11D48] transition-colors",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "View All" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})]
				}), loadingNewArrivals ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, {}) : newArrivals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridEmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6",
					children: newArrivals.slice(0, 6).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, `new-${p.id}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SeeTheDifference, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PopularStores, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandPartners, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NewsletterSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MobileBottomNav, {})
		]
	});
}
//#endregion
export { Index as component };
