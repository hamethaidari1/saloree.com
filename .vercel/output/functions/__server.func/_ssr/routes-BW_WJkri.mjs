import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as useHeroSlides, r as useSiteSettings } from "./useSiteSettings-9teR3ZGn.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Logo } from "./Logo-Cxxeu0YG.mjs";
import { D as ShieldCheck, Gt as ArrowRight, It as Check, Nt as ChevronRight, Pt as ChevronLeft, ft as Globe, g as Store, h as Tag, l as Truck, ut as Headphones, z as Package } from "../_libs/lucide-react.mjs";
import { n as cn, t as Button } from "./button-Cr1ZI0g1.mjs";
import { a as t, o as useLocale } from "./locale-BbUoQ0KM.mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as ProductCard } from "./ProductCard-RJ94vu6B.mjs";
import { n as motion, r as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { n as usePromoBanners, t as useHomepageSections } from "./usePromoBanners-xfkvpWl6.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BW_WJkri.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hero_1_default = "/assets/hero-1-CqkTu3IV.jpg";
var hero_2_default = "/assets/hero-2-BzfTtIBr.png";
var hero_3_default = "/assets/hero-3-C5i7mgTw.png";
var hero_4_default = "/assets/hero-4-BTXE6Fw5.png";
var AUTOPLAY_MS = 3e3;
var TRANSITION_MS = 800;
var SWIPE_OFFSET_THRESHOLD = 60;
var SWIPE_VELOCITY_THRESHOLD = 500;
var defaultHeroSlides = [
	{
		id: "hero-1",
		image: hero_1_default,
		alt: "Premium marketplace hero banner featuring modern home and lifestyle products"
	},
	{
		id: "hero-2",
		image: hero_2_default,
		alt: "Saloree marketplace banner showcasing curated shopping collections"
	},
	{
		id: "hero-3",
		image: hero_3_default,
		alt: "Marketplace promotional banner with stylish featured products"
	},
	{
		id: "hero-4",
		image: hero_4_default,
		alt: "Saloree hero banner highlighting premium shopping and product discovery"
	}
];
function HeroSlider() {
	const shouldReduceMotion = useReducedMotion();
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [direction, setDirection] = (0, import_react.useState)(1);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const autoplayRef = (0, import_react.useRef)(null);
	const { data: dbSlides = [] } = useHeroSlides();
	const heroSlides = (0, import_react.useMemo)(() => {
		const activeDb = dbSlides.filter((s) => s.is_enabled);
		if (activeDb.length > 0) return activeDb.map((s) => ({
			id: s.id,
			image: s.image_url,
			alt: s.alt_text
		}));
		return defaultHeroSlides;
	}, [dbSlides]);
	const totalSlides = heroSlides.length;
	(0, import_react.useEffect)(() => {
		if (activeIndex >= totalSlides) setActiveIndex(0);
	}, [totalSlides, activeIndex]);
	const currentSlide = heroSlides[activeIndex] || heroSlides[0] || defaultHeroSlides[0];
	const nextSlideIndex = (0, import_react.useMemo)(() => (activeIndex + 1) % totalSlides, [activeIndex, totalSlides]);
	const clearAutoplay = () => {
		if (autoplayRef.current !== null) {
			window.clearTimeout(autoplayRef.current);
			autoplayRef.current = null;
		}
	};
	const goToSlide = (nextIndex) => {
		setDirection(nextIndex > activeIndex ? 1 : -1);
		setActiveIndex((nextIndex + totalSlides) % totalSlides);
	};
	const paginate = (nextDirection) => {
		setDirection(nextDirection);
		setActiveIndex((currentIndex) => (currentIndex + nextDirection + totalSlides) % totalSlides);
	};
	(0, import_react.useEffect)(() => {
		const preloaders = heroSlides.map((slide) => {
			const image = new window.Image();
			image.src = slide.image;
			return image;
		});
		return () => {
			preloaders.forEach((image) => {
				image.onload = null;
				image.onerror = null;
			});
		};
	}, [heroSlides]);
	(0, import_react.useEffect)(() => {
		if (isPaused || totalSlides <= 1) {
			clearAutoplay();
			return;
		}
		clearAutoplay();
		autoplayRef.current = window.setTimeout(() => {
			paginate(1);
		}, AUTOPLAY_MS);
		return clearAutoplay;
	}, [
		activeIndex,
		isPaused,
		totalSlides
	]);
	const slideVariants = {
		enter: (customDirection) => ({
			opacity: 0,
			scale: shouldReduceMotion ? 1 : 1.05,
			x: shouldReduceMotion ? 0 : customDirection > 0 ? 30 : -30
		}),
		center: {
			opacity: 1,
			scale: 1,
			x: 0
		},
		exit: (customDirection) => ({
			opacity: 0,
			scale: shouldReduceMotion ? 1 : 1.02,
			x: shouldReduceMotion ? 0 : customDirection > 0 ? -24 : 24
		})
	};
	if (!currentSlide) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Homepage hero slider",
		tabIndex: 0,
		className: "group relative h-[320px] rounded-[24px] shadow-[0_24px_70px_rgba(15,23,42,0.16)] outline-none sm:h-[360px] lg:h-[420px]",
		style: { touchAction: "pan-y" },
		onMouseEnter: () => setIsPaused(true),
		onMouseLeave: () => setIsPaused(false),
		onFocus: () => setIsPaused(true),
		onBlur: () => setIsPaused(false),
		onKeyDown: (event) => {
			if (event.key === "ArrowLeft") {
				event.preventDefault();
				paginate(-1);
			}
			if (event.key === "ArrowRight") {
				event.preventDefault();
				paginate(1);
			}
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-slate-100" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.10),rgba(255,255,255,.02))]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				"aria-hidden": "true",
				className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),rgba(255,255,255,0)_34%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.14),rgba(239,68,68,0)_28%)]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 rounded-[24px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					initial: false,
					custom: direction,
					mode: "wait",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
						custom: direction,
						variants: slideVariants,
						initial: "enter",
						animate: "center",
						exit: "exit",
						transition: {
							duration: shouldReduceMotion ? .01 : TRANSITION_MS / 1e3,
							ease: [
								.22,
								1,
								.36,
								1
							]
						},
						drag: shouldReduceMotion ? false : "x",
						dragConstraints: {
							left: 0,
							right: 0
						},
						dragElastic: .12,
						onDragEnd: (_, info) => {
							if (!(Math.abs(info.offset.x) > SWIPE_OFFSET_THRESHOLD || Math.abs(info.velocity.x) > SWIPE_VELOCITY_THRESHOLD)) return;
							paginate(info.offset.x < 0 ? 1 : -1);
						},
						className: "absolute inset-0 will-change-transform",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative flex h-full w-full items-center justify-center overflow-visible px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								src: currentSlide.image,
								alt: currentSlide.alt,
								loading: "eager",
								decoding: "async",
								draggable: false,
								className: "h-full w-full object-contain object-center will-change-transform [transform:translateZ(0)]",
								animate: shouldReduceMotion ? { y: 0 } : { y: [
									0,
									-8,
									0
								] },
								transition: shouldReduceMotion ? void 0 : {
									duration: 4,
									ease: "easeInOut",
									repeat: Infinity,
									repeatType: "loop"
								}
							})
						})
					}, currentSlide.id)
				})
			}),
			totalSlides > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: heroSlides[nextSlideIndex]?.image || "",
				alt: "",
				"aria-hidden": "true",
				loading: "lazy",
				decoding: "async",
				className: "pointer-events-none absolute h-0 w-0 opacity-0"
			}),
			totalSlides > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
					type: "button",
					"aria-label": "Previous slide",
					className: "absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-secondary shadow-lg backdrop-blur-md transition-colors hover:bg-white sm:left-4 sm:h-11 sm:w-11",
					whileHover: shouldReduceMotion ? void 0 : {
						scale: 1.06,
						x: -2
					},
					whileTap: shouldReduceMotion ? void 0 : { scale: .96 },
					onClick: () => paginate(-1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4 sm:size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.button, {
					type: "button",
					"aria-label": "Next slide",
					className: "absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-secondary shadow-lg backdrop-blur-md transition-colors hover:bg-white sm:right-4 sm:h-11 sm:w-11",
					whileHover: shouldReduceMotion ? void 0 : {
						scale: 1.06,
						x: 2
					},
					whileTap: shouldReduceMotion ? void 0 : { scale: .96 },
					onClick: () => paginate(1),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 sm:size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 sm:bottom-5",
					children: heroSlides.map((slide, index) => {
						const isActive = index === activeIndex;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": `Go to slide ${index + 1}`,
							"aria-current": isActive ? "true" : void 0,
							className: `h-2.5 rounded-full transition-all duration-300 ${isActive ? "w-7 bg-primary shadow-[0_0_0_4px_rgba(255,255,255,0.18)]" : "w-2.5 bg-slate-300/90 hover:bg-slate-200"}`,
							onClick: () => goToSlide(index)
						}, slide.id);
					})
				})
			] })
		]
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
function Index() {
	const shouldReduceMotion = useReducedMotion();
	const { language } = useLocale();
	const { data: settings } = useSiteSettings();
	const { data: sections } = useHomepageSections();
	const { data: promoBanners = [] } = usePromoBanners();
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("*").order("name");
			if (error) {
				console.error("[home-categories] Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	const { data: newArrivals = [], isLoading: loadingNewArrivals } = useQuery({
		queryKey: [
			"products",
			"home",
			"new-arrivals"
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)").eq("status", "active").order("created_at", { ascending: false }).limit(8);
			if (error) {
				console.error("[new-arrivals] Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	const { data: featuredProducts = [], isLoading: loadingFeatured } = useQuery({
		queryKey: [
			"products",
			"home",
			"featured"
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)").eq("status", "active").not("featured_image", "is", null).order("created_at", { ascending: false }).limit(8);
			if (error) {
				console.error("[featured-products] Supabase error:", error);
				throw error;
			}
			if (data && data.length > 0) return data;
			const { data: fallback } = await supabase.from("products").select("id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)").eq("status", "active").order("title", { ascending: true }).limit(8);
			return fallback ?? [];
		}
	});
	const { data: trendingProducts = [], isLoading: loadingTrending } = useQuery({
		queryKey: [
			"products",
			"home",
			"trending"
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)").eq("status", "active").order("stock", { ascending: true }).limit(8);
			if (error) {
				console.error("[trending-products] Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	const { data: bestSellers = [], isLoading: loadingBestSellers } = useQuery({
		queryKey: [
			"products",
			"home",
			"best-sellers"
		],
		queryFn: async () => {
			const { data, error } = await supabase.from("products").select("id, slug, store_id, title, price, featured_image, status, created_at, description, stores(name, slug, logo_url), categories(name, slug)").eq("status", "active").order("price", { ascending: false }).limit(8);
			if (error) {
				console.error("[best-sellers] Supabase error:", error);
				throw error;
			}
			return data ?? [];
		}
	});
	function ProductGridSkeleton() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
			children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col rounded-xl border bg-card p-4 shadow-soft animate-pulse",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square w-full rounded-lg bg-slate-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-4 h-4 w-2/3 rounded bg-slate-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-3 w-1/2 rounded bg-slate-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-3 w-1/3 rounded bg-slate-200" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-5 w-1/4 rounded bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-1/6 rounded bg-slate-200" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 flex-1 rounded bg-slate-200" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-9 w-9 rounded bg-slate-200 shrink-0" })]
					})
				]
			}, i))
		});
	}
	function ProductGridEmptyState() {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center rounded-xl border border-dashed p-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package, { className: "h-12 w-12 text-muted-foreground/50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-4 text-lg font-semibold",
					children: "No products found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground max-w-xs",
					children: "We couldn't find any products in this section right now. Please check back later."
				})
			]
		});
	}
	settings?.hero_title || t("hero_title", language);
	settings?.hero_subtitle || t("hero_subtitle", language);
	settings?.hero_button_text || t("hero_cta", language);
	settings?.hero_button_link;
	sections?.show_categories;
	sections?.show_new_arrivals;
	sections?.show_featured;
	sections?.categories_title || t("shop_by_category", language);
	const newArrivalsTitle = sections?.new_arrivals_title || t("new_arrivals", language);
	const featuredTitle = sections?.featured_title || t("featured_products", language);
	const activeBanners = promoBanners.filter((b) => b.is_enabled);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "grid gap-4 lg:grid-cols-[260px_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
					className: "hidden rounded-lg border bg-card p-2 lg:block",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "text-sm",
						children: [(categories ?? []).slice(0, 8).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/categories/$slug",
							params: { slug: c.slug },
							className: "flex items-center justify-between rounded-md px-3 py-2.5 hover:bg-accent",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: c.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-muted-foreground" })]
						}) }, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "mt-1 border-t pt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/marketplace",
								className: "flex items-center justify-between rounded-md px-3 py-2.5 font-semibold text-primary hover:bg-primary-soft",
								children: ["View all categories ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-[28px] border border-rose-100/80 bg-[linear-gradient(135deg,_rgba(255,245,247,0.98),_rgba(254,242,242,0.96)_40%,_rgba(255,228,230,0.92)_100%)] shadow-[0_28px_90px_rgba(244,63,94,0.12)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.95),_rgba(255,255,255,0)_36%),radial-gradient(circle_at_bottom_right,_rgba(251,113,133,0.12),_rgba(251,113,133,0)_28%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,45%)_minmax(0,55%)] lg:gap-10 lg:p-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-xl lg:max-w-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									className: "text-sm font-semibold uppercase tracking-[0.32em] text-primary",
									initial: shouldReduceMotion ? false : {
										opacity: 0,
										x: -24
									},
									animate: shouldReduceMotion ? void 0 : {
										opacity: 1,
										x: 0
									},
									transition: {
										duration: .55,
										ease: "easeOut"
									},
									children: "NEW GENERATION MARKETPLACE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
									className: "mt-3 text-3xl font-extrabold leading-tight text-secondary sm:text-4xl lg:text-5xl",
									initial: shouldReduceMotion ? false : {
										opacity: 0,
										x: -36
									},
									animate: shouldReduceMotion ? void 0 : {
										opacity: 1,
										x: 0
									},
									transition: {
										duration: .7,
										ease: "easeOut",
										delay: .08
									},
									children: [
										"Shop Smarter.",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"Sell Better."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
									className: "mt-4 max-w-md text-sm text-muted-foreground sm:text-base",
									initial: shouldReduceMotion ? false : {
										opacity: 0,
										y: 20
									},
									animate: shouldReduceMotion ? void 0 : {
										opacity: 1,
										y: 0
									},
									transition: {
										duration: .6,
										ease: "easeOut",
										delay: .18
									},
									children: "Launch your store, discover millions of products and grow globally with Saloree Marketplace."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "mt-6 flex flex-col gap-4 sm:flex-row",
									initial: shouldReduceMotion ? false : {
										opacity: 0,
										y: 20
									},
									animate: shouldReduceMotion ? void 0 : {
										opacity: 1,
										y: 0
									},
									transition: {
										duration: .6,
										ease: "easeOut",
										delay: .28
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										size: "lg",
										className: "rounded-full px-6 shadow-lg",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/marketplace",
											children: "Start Shopping"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										asChild: true,
										variant: "outline",
										size: "lg",
										className: "rounded-full px-6",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/seller",
											children: "Become Seller"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground",
									initial: shouldReduceMotion ? false : {
										opacity: 0,
										y: 20
									},
									animate: shouldReduceMotion ? void 0 : {
										opacity: 1,
										y: 0
									},
									transition: {
										duration: .6,
										ease: "easeOut",
										delay: .38
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-green-500" }), " Secure Payment"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-green-500" }), " Fast Delivery"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4 text-green-500" }), " Global Sellers"]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlider, {})]
					})]
				})]
			}),
			sections?.show_how_it_works && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold sm:text-2xl text-center",
					children: sections?.how_it_works_title || "How It Works"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-col items-center space-y-8 md:flex-row md:justify-around md:space-y-0",
					children: [
						{
							step: 1,
							title: "Create Store",
							description: "Sign up and set up your shop."
						},
						{
							step: 2,
							title: "Upload Products",
							description: "Add your items with ease."
						},
						{
							step: 3,
							title: "Start Selling",
							description: "Reach customers and grow."
						}
					].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white shadow-lg",
								children: item.step
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-lg font-semibold",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-muted-foreground",
								children: item.description
							})
						]
					}, item.step))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-6 grid gap-3 rounded-lg border bg-card p-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						Icon: ShieldCheck,
						title: "Secure Shopping",
						subtitle: "Your data is always protected"
					},
					{
						Icon: Truck,
						title: "Fast Delivery",
						subtitle: "Get your order at your door"
					},
					{
						Icon: Tag,
						title: "Best Prices",
						subtitle: "Enjoy amazing discounts"
					},
					{
						Icon: Headphones,
						title: "24/7 Support",
						subtitle: "We're here to help you"
					}
				].map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-md p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(feature.Icon, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-semibold",
							children: feature.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-muted-foreground",
							children: feature.subtitle
						})]
					})]
				}, feature.title))
			}),
			activeBanners.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: activeBanners.map((banner) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative overflow-hidden rounded-2xl border bg-card shadow-soft hover:shadow-md transition-all duration-300 group h-48",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: banner.image_url,
						alt: banner.banner_text,
						className: "absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-6",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-bold text-white leading-snug drop-shadow-md",
							children: banner.banner_text
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								className: "rounded-full bg-white text-black hover:bg-white/90",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: banner.button_link,
									children: banner.button_text || "Shop Now"
								})
							})
						})]
					})]
				}, banner.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between border-b pb-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold sm:text-2xl text-secondary",
						children: newArrivalsTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Explore our latest products and additions."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marketplace",
						className: "text-sm font-semibold text-primary hover:underline",
						children: "View all"
					})]
				}), loadingNewArrivals ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, {}) : newArrivals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridEmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
					children: newArrivals.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, `new-${p.id}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between border-b pb-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold sm:text-2xl text-secondary",
						children: featuredTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Handpicked premium products chosen for you."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marketplace",
						className: "text-sm font-semibold text-primary hover:underline",
						children: "View all"
					})]
				}), loadingFeatured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, {}) : featuredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridEmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
					children: featuredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, `featured-${p.id}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between border-b pb-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold sm:text-2xl text-secondary",
						children: sections?.trending_products_title || "Trending Products"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "See what is popular in our community right now."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marketplace",
						className: "text-sm font-semibold text-primary hover:underline",
						children: "View all"
					})]
				}), loadingTrending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, {}) : trendingProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridEmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
					children: trendingProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, `trending-${p.id}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between border-b pb-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-extrabold sm:text-2xl text-secondary",
						children: sections?.top_sellers_title || "Best Sellers"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-1",
						children: "Our top-rated products with verified purchases."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marketplace",
						className: "text-sm font-semibold text-primary hover:underline",
						children: "View all"
					})]
				}), loadingBestSellers ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridSkeleton, {}) : bestSellers.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductGridEmptyState, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4",
					children: bestSellers.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, `best-${p.id}`))
				})]
			}),
			sections?.flash_sale_enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold sm:text-2xl",
					children: sections?.flash_sale_title || "Flash Sale"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 rounded-lg border bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm uppercase tracking-wide",
							children: "Limited Time Offer"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-2 text-3xl font-bold",
							children: "Up to 50% Off!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center space-x-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-lg font-semibold",
									children: "Ends in: 00h 00m 00s"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 w-32 rounded-full bg-white/30",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-1/2 rounded-full bg-white" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: "Only 50 left!"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6 rounded-full bg-white text-primary hover:bg-gray-100",
							children: "Shop Flash Sale"
						})
					]
				})]
			}),
			sections?.show_statistics && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold sm:text-2xl text-center",
					children: sections?.statistics_title || "Our Global Reach"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-6 rounded-lg bg-gradient-to-r from-primary to-red-400 p-8 text-white shadow-card md:grid-cols-4",
					children: [
						{
							value: "1M+",
							label: "Products"
						},
						{
							value: "120K+",
							label: "Customers"
						},
						{
							value: "25K+",
							label: "Stores"
						},
						{
							value: "150+",
							label: "Countries"
						}
					].map((stat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-3xl font-bold",
							children: stat.value
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm uppercase tracking-wide",
							children: stat.label
						})]
					}, stat.label))
				})]
			}),
			sections?.show_categories && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold sm:text-2xl",
						children: sections?.categories_title || "Popular Categories"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/marketplace",
						className: "text-sm font-semibold text-primary hover:underline",
						children: "View all"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8",
					children: (categories ?? []).map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/categories/$slug",
						params: { slug: category.slug },
						className: "flex flex-col items-center gap-2 rounded-lg border bg-card p-4 text-center shadow-card transition hover:border-primary hover:shadow-md",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid h-14 w-14 place-items-center rounded-full bg-primary-soft text-xl font-bold text-primary",
							children: category.icon || category.name.charAt(0)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: category.name
						})]
					}, category.id))
				})]
			}),
			sections?.show_top_sellers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold sm:text-2xl",
					children: sections?.top_sellers_title || "Top Sellers"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: [
						{
							name: "Fashion Hub",
							rating: 4.9,
							followers: "10K",
							products: "500+"
						},
						{
							name: "Tech World",
							rating: 4.8,
							followers: "8K",
							products: "300+"
						},
						{
							name: "Home Decor",
							rating: 4.7,
							followers: "12K",
							products: "700+"
						}
					].map((seller) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 rounded-lg border bg-card p-4 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							className: "h-16 w-16",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "bg-secondary text-white text-lg font-bold",
								children: seller.name.charAt(0)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-lg font-semibold",
								children: seller.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: ["Rating: ", seller.rating]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								className: "mt-2",
								children: "Visit Store"
							})
						] })]
					}, seller.name))
				})]
			}),
			sections?.show_featured_brands && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold sm:text-2xl",
					children: sections?.featured_brands_title || "Featured Brands"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6",
					children: [
						"Nike",
						"Apple",
						"Samsung",
						"Sony",
						"Adidas",
						"Zara"
					].map((brand) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center justify-center rounded-lg border bg-card p-4 shadow-card transition hover:border-primary hover:shadow-md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-lg font-semibold",
							children: brand
						})
					}, brand))
				})]
			}),
			sections?.show_why_saloree && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold sm:text-2xl text-center",
						children: sections?.why_saloree_title || "Why Saloree?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-muted-foreground mb-8",
						children: "The ultimate platform for sellers and buyers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
						children: [
							{
								title: "Build Your Store",
								description: "Create a beautiful online store in minutes.",
								icon: Store
							},
							{
								title: "Sell Worldwide",
								description: "Reach millions of customers across the globe.",
								icon: Globe
							},
							{
								title: "Manage Products",
								description: "Effortlessly add, update, and organize your inventory.",
								icon: Package
							}
						].map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg border bg-card p-6 text-center shadow-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto mb-4 h-12 w-12 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-lg font-semibold",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-muted-foreground",
										children: item.description
									})
								]
							}, item.title);
						})
					})
				]
			}),
			sections?.show_customer_reviews && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold sm:text-2xl text-center",
					children: sections?.customer_reviews_title || "What Our Customers Say"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
					children: [
						{
							name: "Alice Smith",
							review: "Saloree changed how I shop online. Amazing products and sellers!",
							rating: 5
						},
						{
							name: "Bob Johnson",
							review: "Easy to use, great support, and I found unique items.",
							rating: 4
						},
						{
							name: "Charlie Brown",
							review: "As a seller, Saloree has been a game-changer for my business.",
							rating: 5
						}
					].map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border bg-card p-6 shadow-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center mb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								className: "h-12 w-12 mr-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
									className: "bg-accent text-accent-foreground",
									children: review.name.charAt(0)
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: review.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex text-yellow-500",
								children: ["★".repeat(review.rating), "☆".repeat(5 - review.rating)]
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted-foreground",
							children: [
								"\"",
								review.review,
								"\""
							]
						})]
					}, review.name))
				})]
			}),
			sections?.show_mobile_app && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center justify-center rounded-lg border bg-card p-8 shadow-card md:flex-row md:space-x-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-center md:text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold",
								children: sections?.mobile_app_title || "Download Our Mobile App"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-muted-foreground",
								children: "Shop on the go, anytime, anywhere."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 flex justify-center space-x-4 md:justify-start",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { children: "App Store" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									children: "Google Play"
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 md:mt-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-48 w-32 rounded-lg bg-gray-200 flex items-center justify-center text-gray-500",
							children: "Phone Mockup"
						})
					})]
				})
			}),
			sections?.show_newsletter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-10",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 p-8 text-white shadow-card text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-bold",
							children: sections?.newsletter_title || "Stay Updated!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-lg",
							children: "Subscribe to our newsletter for the latest deals."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								placeholder: "Your email address",
								className: "w-full max-w-sm rounded-l-md border-none bg-white/20 px-4 py-2 text-white placeholder-gray-200 focus:ring-0"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "rounded-r-md bg-white text-blue-600 hover:bg-gray-100",
								children: "Subscribe"
							})]
						})
					]
				})
			}),
			sections?.show_footer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-10 bg-secondary text-white py-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
								linked: false,
								imgClassName: "h-10 w-auto mb-4"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-gray-400",
								children: "Build. Sell. Grow."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex space-x-4 mt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gray-400",
										children: "FB"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gray-400",
										children: "TW"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-gray-400",
										children: "IG"
									})
								]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold mb-4",
							children: "Marketplace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-sm text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Shop All" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Categories" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Brands" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Flash Sale" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold mb-4",
							children: "Support"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-sm text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Help Center" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Shipping" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Returns" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Contact Us" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg font-semibold mb-4",
							children: "Company"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-sm text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "About Us" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Careers" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Terms of Service" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Privacy Policy" })
							]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500",
					children: "© 2026 Saloree. All rights reserved."
				})]
			})
		]
	});
}
//#endregion
export { Index as component };
