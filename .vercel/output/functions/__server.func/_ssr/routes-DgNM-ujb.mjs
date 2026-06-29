import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as useSiteSettings } from "./useSiteSettings-9teR3ZGn.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ShieldCheck, Ft as ChevronLeft, Pt as ChevronRight, ft as Globe, g as Store, h as Tag, l as Truck, qt as ArrowRight, ut as Headphones, y as Sparkles, z as Package } from "../_libs/lucide-react.mjs";
import { n as cn, t as Button } from "./button-Cr1ZI0g1.mjs";
import { a as t, o as useLocale } from "./locale-BbUoQ0KM.mjs";
import { n as AvatarFallback$1, r as AvatarImage$1, t as Avatar$1 } from "../_libs/@radix-ui/react-avatar+[...].mjs";
import { t as ProductCard } from "./ProductCard-Bc-EZLiz.mjs";
import { n as motion, r as AnimatePresence, t as useReducedMotion } from "../_libs/framer-motion.mjs";
import { n as usePromoBanners, t as useHomepageSections } from "./usePromoBanners-xfkvpWl6.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DgNM-ujb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AUTOPLAY_MS = 3e3;
var slides = [
	{
		id: "slide-electronics",
		theme: "ELECTRONICS MEGA SALE",
		headline: "Upgrade Your Digital Life",
		subtitle: "Discover premium laptops, smartphones, headphones and smart gadgets with unbeatable prices.",
		buttonText: "Shop Electronics",
		buttonLink: "/categories/electronics",
		image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
		bgGradient: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #311042 100%)",
		textColor: "text-white",
		accentColor: "text-purple-400",
		layout: "left-text"
	},
	{
		id: "slide-home",
		theme: "MODERN HOME COLLECTION",
		headline: "Make Home Beautiful",
		subtitle: "Premium furniture and home essentials for modern living.",
		buttonText: "Shop Home",
		buttonLink: "/categories/home-living",
		image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
		bgGradient: "linear-gradient(135deg, #FAF8F5 0%, #F5EFEB 50%, #EAE0D5 100%)",
		textColor: "text-gray-900",
		accentColor: "text-amber-700",
		layout: "minimal-home"
	},
	{
		id: "slide-adventure",
		theme: "ADVENTURE & OUTDOORS",
		headline: "Adventure Starts Here",
		subtitle: "Outdoor gear built for every journey.",
		buttonText: "Explore Collection",
		buttonLink: "/categories/sports",
		image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80",
		bgGradient: "linear-gradient(135deg, #075985 0%, #0369A1 50%, #0284C7 100%)",
		textColor: "text-white",
		accentColor: "text-sky-300",
		layout: "nature-split"
	},
	{
		id: "slide-fashion",
		theme: "FASHION WEEK",
		headline: "Wear Your Confidence",
		subtitle: "Discover the newest trends from top brands.",
		buttonText: "Shop Fashion",
		buttonLink: "/categories/fashion",
		image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
		bgGradient: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FECDD3 100%)",
		textColor: "text-gray-900",
		accentColor: "text-rose-600",
		layout: "right-text"
	},
	{
		id: "slide-beauty",
		theme: "BEAUTY COLLECTION",
		headline: "Glow Every Day",
		subtitle: "Luxury skincare and beauty products with exclusive offers.",
		buttonText: "Shop Beauty",
		buttonLink: "/categories/beauty",
		image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
		bgGradient: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #E9D5FF 100%)",
		textColor: "text-gray-900",
		accentColor: "text-purple-600",
		layout: "split-equal"
	},
	{
		id: "slide-gaming",
		theme: "GAMING WORLD",
		headline: "Level Up Your Game",
		subtitle: "Gaming laptops, consoles and accessories.",
		buttonText: "Shop Gaming",
		buttonLink: "/categories/gaming",
		image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
		bgGradient: "linear-gradient(135deg, #020617 0%, #0F172A 50%, #1E1B4B 100%)",
		textColor: "text-white",
		accentColor: "text-red-500",
		layout: "neon-gaming"
	},
	{
		id: "slide-kids",
		theme: "KIDS & TOYS",
		headline: "Play. Learn. Grow.",
		subtitle: "Educational toys and gifts for every child.",
		buttonText: "Discover Toys",
		buttonLink: "/categories/toys-games",
		image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=800&q=80",
		bgGradient: "linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 50%, #ECFDF5 100%)",
		textColor: "text-gray-900",
		accentColor: "text-emerald-700",
		layout: "center-text"
	},
	{
		id: "slide-global",
		theme: "GLOBAL MARKETPLACE",
		headline: "Millions of Products. Thousands of Sellers.",
		subtitle: "Shop globally with secure payments and fast worldwide delivery.",
		buttonText: "Start Shopping",
		buttonLink: "/marketplace",
		buttonText2: "Become a Seller",
		buttonLink2: "/seller",
		image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
		bgGradient: "linear-gradient(135deg, #0F172A 0%, #0F766E 50%, #115E59 100%)",
		textColor: "text-white",
		accentColor: "text-teal-300",
		layout: "global-hub"
	}
];
function HeroSlider() {
	useReducedMotion();
	const [activeIndex, setActiveIndex] = (0, import_react.useState)(0);
	const [direction, setDirection] = (0, import_react.useState)(1);
	const [isPaused, setIsPaused] = (0, import_react.useState)(false);
	const [progress, setProgress] = (0, import_react.useState)(0);
	const progressTimerRef = (0, import_react.useRef)(null);
	const totalSlides = slides.length;
	const nextSlide = () => {
		setDirection(1);
		setActiveIndex((prev) => (prev + 1) % totalSlides);
		setProgress(0);
	};
	const prevSlide = () => {
		setDirection(-1);
		setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
		setProgress(0);
	};
	const goToSlide = (index) => {
		setDirection(index > activeIndex ? 1 : -1);
		setActiveIndex(index);
		setProgress(0);
	};
	(0, import_react.useEffect)(() => {
		if (isPaused) {
			if (progressTimerRef.current) clearInterval(progressTimerRef.current);
			return;
		}
		const intervalTime = 30;
		const totalTicks = AUTOPLAY_MS / intervalTime;
		progressTimerRef.current = window.setInterval(() => {
			setProgress((prev) => {
				if (prev >= 100) {
					nextSlide();
					return 0;
				}
				return prev + 100 / totalTicks;
			});
		}, intervalTime);
		return () => {
			if (progressTimerRef.current) clearInterval(progressTimerRef.current);
		};
	}, [activeIndex, isPaused]);
	const currentSlide = slides[activeIndex];
	const textVariants = {
		hidden: {
			opacity: 0,
			y: 20
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: .6,
				ease: "easeOut"
			}
		},
		exit: {
			opacity: 0,
			y: -20,
			transition: {
				duration: .4,
				ease: "easeIn"
			}
		}
	};
	const imageVariants = {
		hidden: {
			opacity: 0,
			scale: .95,
			x: direction > 0 ? 30 : -30
		},
		visible: {
			opacity: 1,
			scale: 1,
			x: 0,
			transition: {
				type: "spring",
				stiffness: 70,
				damping: 15,
				delay: .15
			}
		},
		exit: {
			opacity: 0,
			scale: .95,
			transition: { duration: .4 }
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		"aria-label": "Homepage hero slider",
		className: "relative w-full h-[460px] md:h-[520px] lg:h-[580px] rounded-[24px] overflow-hidden shadow-2xl group border border-gray-100",
		onMouseEnter: () => setIsPaused(true),
		onMouseLeave: () => setIsPaused(false),
		onFocus: () => setIsPaused(true),
		onBlur: () => setIsPaused(false),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
				mode: "wait",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					variants: {
						initial: { opacity: .5 },
						animate: {
							opacity: 1,
							transition: { duration: .8 }
						}
					},
					initial: "initial",
					animate: "animate",
					className: "absolute inset-0 transition-all duration-700",
					style: { background: currentSlide.bgGradient }
				}, `bg-${currentSlide.id}`)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_45%)]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 flex items-center px-6 sm:px-12 md:px-16 lg:px-24",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
					mode: "wait",
					custom: direction,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full h-full flex items-center",
						children: [
							currentSlide.layout === "left-text" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid lg:grid-cols-12 gap-8 items-center w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "lg:col-span-7 z-10 text-left space-y-4 md:space-y-6",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: { visible: { transition: { staggerChildren: .1 } } },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: `text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`,
											children: currentSlide.theme
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
											variants: textVariants,
											className: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`,
											children: ["Upgrade Your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent",
												children: "Digital Life"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: "text-sm md:text-base text-gray-300 max-w-lg leading-relaxed",
											children: currentSlide.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											variants: textVariants,
											className: "flex gap-4 pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "lg",
												className: "rounded-full bg-[#FF3B3B] hover:bg-[#E03030] text-white px-8 font-bold shadow-lg shadow-red-500/25 active:scale-95 transition-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
													to: currentSlide.buttonLink,
													children: [currentSlide.buttonText, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-2 size-4" })]
												})
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "hidden lg:flex lg:col-span-5 justify-center relative",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: imageVariants,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
										animate: { y: [
											0,
											-12,
											0
										] },
										transition: {
											duration: 5,
											repeat: Infinity,
											ease: "easeInOut"
										},
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-purple-500/10 rounded-full blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: currentSlide.image,
											alt: currentSlide.headline,
											className: "max-h-[380px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] select-none pointer-events-none"
										})]
									})
								})]
							}),
							currentSlide.layout === "minimal-home" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid lg:grid-cols-12 gap-8 items-center w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "lg:col-span-6 z-10 text-left space-y-4 md:space-y-6",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: { visible: { transition: { staggerChildren: .1 } } },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: `text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`,
											children: currentSlide.theme
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
											variants: textVariants,
											className: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor} leading-tight`,
											children: [
												"Make Home ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-amber-800",
													children: "Beautiful"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: "text-sm md:text-base text-gray-600 max-w-md leading-relaxed",
											children: currentSlide.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											variants: textVariants,
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "lg",
												className: "rounded-full bg-amber-800 hover:bg-amber-900 text-white px-8 font-bold shadow-lg shadow-amber-800/10 active:scale-95 transition-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: currentSlide.buttonLink,
													children: currentSlide.buttonText
												})
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "hidden lg:flex lg:col-span-6 justify-end relative h-full items-center",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: imageVariants,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative rounded-[20px] overflow-hidden shadow-2xl border-4 border-white max-w-[480px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: currentSlide.image,
											alt: currentSlide.headline,
											className: "w-full object-cover aspect-[4/3] select-none pointer-events-none hover:scale-105 transition-transform duration-700"
										})
									})
								})]
							}),
							currentSlide.layout === "nature-split" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid lg:grid-cols-12 gap-8 items-center w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "lg:col-span-6 z-10 text-left space-y-4 md:space-y-6",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: { visible: { transition: { staggerChildren: .1 } } },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: `text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`,
											children: currentSlide.theme
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
											variants: textVariants,
											className: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`,
											children: [
												"Adventure ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												"Starts Here"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: "text-sm md:text-base text-sky-100 max-w-md leading-relaxed",
											children: currentSlide.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											variants: textVariants,
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "lg",
												className: "rounded-full bg-white text-sky-900 hover:bg-gray-100 px-8 font-bold shadow-lg active:scale-95 transition-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: currentSlide.buttonLink,
													children: currentSlide.buttonText
												})
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "hidden lg:flex lg:col-span-6 justify-center",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: imageVariants,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-sky-300/10 rounded-full blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: currentSlide.image,
											alt: currentSlide.headline,
											className: "max-h-[360px] rounded-2xl object-cover aspect-[4/3] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] shadow-inner border border-white/20"
										})]
									})
								})]
							}),
							currentSlide.layout === "right-text" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid lg:grid-cols-12 gap-8 items-center w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "hidden lg:flex lg:col-span-6 justify-start",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: imageVariants,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "relative rounded-[24px] overflow-hidden shadow-2xl border-2 border-white max-w-[420px]",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: currentSlide.image,
											alt: currentSlide.headline,
											className: "w-full object-cover aspect-[4/5] select-none pointer-events-none"
										})
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "lg:col-span-6 z-10 text-left lg:text-right space-y-4 md:space-y-6 lg:ml-auto",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: { visible: { transition: { staggerChildren: .1 } } },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: `text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`,
											children: currentSlide.theme
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
											variants: textVariants,
											className: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`,
											children: [
												"Wear Your ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-rose-600",
													children: "Confidence"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: "text-sm md:text-base text-gray-600 max-w-md lg:ml-auto leading-relaxed",
											children: currentSlide.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											variants: textVariants,
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "lg",
												className: "rounded-full bg-rose-600 hover:bg-rose-700 text-white px-8 font-bold shadow-lg shadow-rose-600/10 active:scale-95 transition-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: currentSlide.buttonLink,
													children: currentSlide.buttonText
												})
											})
										})
									]
								})]
							}),
							currentSlide.layout === "split-equal" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid lg:grid-cols-2 gap-8 items-center w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "z-10 text-left space-y-4 md:space-y-6",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: { visible: { transition: { staggerChildren: .1 } } },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: `text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`,
											children: currentSlide.theme
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
											variants: textVariants,
											className: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`,
											children: "Glow Every Day"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: "text-sm md:text-base text-gray-500 max-w-md leading-relaxed",
											children: currentSlide.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											variants: textVariants,
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "lg",
												className: "rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 font-bold shadow-lg active:scale-95 transition-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: currentSlide.buttonLink,
													children: currentSlide.buttonText
												})
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "hidden lg:flex justify-center",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: imageVariants,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: currentSlide.image,
										alt: currentSlide.headline,
										className: "max-h-[350px] rounded-full aspect-square object-cover border-8 border-white shadow-2xl select-none pointer-events-none"
									})
								})]
							}),
							currentSlide.layout === "neon-gaming" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid lg:grid-cols-12 gap-8 items-center w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "lg:col-span-7 z-10 text-left space-y-4 md:space-y-6",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: { visible: { transition: { staggerChildren: .1 } } },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: `text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`,
											children: currentSlide.theme
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
											variants: textVariants,
											className: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`,
											children: [
												"Level Up ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-lg border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]",
													children: "Your Game"
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: "text-sm md:text-base text-slate-400 max-w-md leading-relaxed",
											children: currentSlide.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
											variants: textVariants,
											className: "pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "lg",
												className: "rounded-full bg-red-500 hover:bg-red-600 text-white px-8 font-bold shadow-lg shadow-red-500/25 active:scale-95 transition-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: currentSlide.buttonLink,
													children: currentSlide.buttonText
												})
											})
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "hidden lg:flex lg:col-span-5 justify-center relative",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: imageVariants,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-red-500/10 rounded-full blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: currentSlide.image,
											alt: currentSlide.headline,
											className: "max-h-[340px] rounded-xl border border-slate-800 shadow-2xl object-cover aspect-[4/3] select-none pointer-events-none"
										})]
									})
								})]
							}),
							currentSlide.layout === "center-text" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center justify-center text-center w-full z-10 space-y-4 md:space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
										initial: {
											opacity: 0,
											scale: .9
										},
										animate: {
											opacity: 1,
											scale: 1
										},
										exit: { opacity: 0 },
										className: `text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`,
										children: currentSlide.theme
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.h1, {
										initial: {
											opacity: 0,
											y: 15
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: { opacity: 0 },
										className: `text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`,
										children: "Play. Learn. Grow."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
										initial: {
											opacity: 0,
											y: 10
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: { opacity: 0 },
										className: "text-sm md:text-base text-emerald-800/80 max-w-lg leading-relaxed",
										children: currentSlide.subtitle
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
										initial: {
											opacity: 0,
											y: 10
										},
										animate: {
											opacity: 1,
											y: 0
										},
										exit: { opacity: 0 },
										className: "pt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											asChild: true,
											size: "lg",
											className: "rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-8 font-bold shadow-lg shadow-emerald-700/20 active:scale-95 transition-all",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: currentSlide.buttonLink,
												children: currentSlide.buttonText
											})
										})
									})
								]
							}),
							currentSlide.layout === "global-hub" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid lg:grid-cols-12 gap-8 items-center w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
									className: "lg:col-span-7 z-10 text-left space-y-4 md:space-y-6",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: { visible: { transition: { staggerChildren: .1 } } },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: `text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`,
											children: currentSlide.theme
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.h1, {
											variants: textVariants,
											className: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor} leading-tight`,
											children: [
												"Millions of Products. ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-teal-300",
													children: "Thousands of Sellers."
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.p, {
											variants: textVariants,
											className: "text-sm md:text-base text-gray-300 max-w-lg leading-relaxed",
											children: currentSlide.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
											variants: textVariants,
											className: "flex flex-wrap gap-4 pt-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												size: "lg",
												className: "rounded-full bg-[#FF3B3B] hover:bg-[#E03030] text-white px-8 font-bold shadow-lg active:scale-95 transition-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: currentSlide.buttonLink,
													children: currentSlide.buttonText
												})
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												asChild: true,
												variant: "outline",
												size: "lg",
												className: "rounded-full border-white/30 text-white hover:bg-white/10 px-8 font-bold shadow-lg active:scale-95 transition-all",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: currentSlide.buttonLink2,
													children: currentSlide.buttonText2
												})
											})]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
									className: "hidden lg:flex lg:col-span-5 justify-center",
									initial: "hidden",
									animate: "visible",
									exit: "exit",
									variants: imageVariants,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-teal-500/10 rounded-full blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: currentSlide.image,
											alt: currentSlide.headline,
											className: "max-h-[320px] rounded-2xl object-cover shadow-2xl select-none pointer-events-none"
										})]
									})
								})]
							})
						]
					}, currentSlide.id)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: prevSlide,
				className: "absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-20",
				"aria-label": "Previous slide",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-6 text-white" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: nextSlide,
				className: "absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-20",
				"aria-label": "Next slide",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-6 text-white" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute bottom-6 inset-x-0 flex items-center justify-center gap-2.5 z-20",
				children: slides.map((slide, index) => {
					const isActive = index === activeIndex;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => goToSlide(index),
						className: "relative h-2 rounded-full overflow-hidden transition-all duration-300 bg-white/20 hover:bg-white/40 cursor-pointer",
						style: { width: isActive ? "42px" : "10px" },
						"aria-label": `Go to slide ${index + 1}`,
						children: isActive && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "absolute inset-y-0 left-0 bg-[#FF3B3B] transition-all duration-300",
							style: { width: `${progress}%` }
						})
					}, slide.id);
				})
			})
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
	useReducedMotion();
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
	const showCategories = sections?.show_categories ?? true;
	const showNewArrivals = sections?.show_new_arrivals ?? true;
	const showFeatured = sections?.show_featured ?? true;
	const categoriesTitle = sections?.categories_title || t("shop_by_category", language);
	const newArrivalsTitle = sections?.new_arrivals_title || t("new_arrivals", language);
	const featuredTitle = sections?.featured_title || t("featured_products", language);
	const activeBanners = promoBanners.filter((b) => b.is_enabled);
	const categoryCards = [
		{
			title: "Electronics",
			count: "12,340+ Items",
			link: "/categories/$slug",
			params: { slug: "electronics" },
			image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=300&q=80"
		},
		{
			title: "Fashion",
			count: "18,250+ Items",
			link: "/categories/$slug",
			params: { slug: "fashion" },
			image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=300&q=80"
		},
		{
			title: "Home & Living",
			count: "9,120+ Items",
			link: "/categories/$slug",
			params: { slug: "home-living" },
			image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=300&q=80"
		},
		{
			title: "Beauty",
			count: "6,780+ Items",
			link: "/categories/$slug",
			params: { slug: "beauty" },
			image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80"
		},
		{
			title: "Sports",
			count: "7,540+ Items",
			link: "/categories/$slug",
			params: { slug: "sports" },
			image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=300&q=80"
		},
		{
			title: "Books",
			count: "3,110+ Items",
			link: "/categories/$slug",
			params: { slug: "books" },
			image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=300&q=80"
		},
		{
			title: "Gaming",
			count: "5,420+ Items",
			link: "/categories/$slug",
			params: { slug: "gaming" },
			image: "https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?auto=format&fit=crop&w=300&q=80"
		},
		{
			title: "Automotive",
			count: "4,950+ Items",
			link: "/categories/$slug",
			params: { slug: "automotive" },
			image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=300&q=80"
		}
	];
	const featureCards = [
		{
			icon: ShieldCheck,
			title: "Secure Payments",
			description: "100% protection for payments",
			iconBg: "bg-emerald-50",
			iconColor: "text-emerald-500"
		},
		{
			icon: Truck,
			title: "Worldwide Shipping",
			description: "Free shipping over $50",
			iconBg: "bg-blue-50",
			iconColor: "text-blue-500"
		},
		{
			icon: Tag,
			title: "Easy Returns",
			description: "30-day hassle-free refund",
			iconBg: "bg-amber-50",
			iconColor: "text-amber-500"
		},
		{
			icon: Headphones,
			title: "24/7 Support",
			description: "We're here to help anytime",
			iconBg: "bg-purple-50",
			iconColor: "text-purple-500"
		},
		{
			icon: Sparkles,
			title: "Trusted by Millions",
			description: "Join our happy shoppers",
			iconBg: "bg-rose-50",
			iconColor: "text-rose-500"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-7xl px-4 py-6 md:px-6 lg:px-8 space-y-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "w-full",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSlider, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden lg:block space-y-12",
				children: [showCategories && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end justify-between border-b pb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-extrabold sm:text-2xl text-secondary",
							children: categoriesTitle || "Shop by Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-1",
							children: "Explore our curated collections of top premium categories."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/marketplace",
							className: "text-sm font-semibold text-primary hover:underline",
							children: "View all"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4",
						children: categoryCards.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: category.link,
							params: category.params,
							className: "group flex flex-col rounded-2xl bg-white border border-gray-100 p-3 shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 overflow-hidden text-center cursor-pointer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative w-full aspect-square rounded-xl bg-gray-50 overflow-hidden mb-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: category.image,
										alt: category.title,
										loading: "lazy",
										className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs sm:text-sm font-bold text-gray-800 group-hover:text-primary transition-colors truncate",
									children: category.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] sm:text-xs text-muted-foreground mt-0.5 font-semibold",
									children: category.count
								})
							]
						}, category.title))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
					children: featureCards.map((feature) => {
						const Icon = feature.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4 rounded-2xl bg-white border border-gray-100 p-5 shadow-soft hover:shadow-md transition-all duration-300 hover:-translate-y-1 group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `grid h-12 w-12 place-items-center rounded-xl shrink-0 ${feature.iconBg} ${feature.iconColor} group-hover:scale-105 transition-transform duration-200`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "text-xs sm:text-sm font-bold text-gray-800 truncate",
									children: feature.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] sm:text-xs text-muted-foreground mt-0.5 leading-snug",
									children: feature.description
								})]
							})]
						}, feature.title);
					})
				})]
			}),
			sections?.show_how_it_works && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "py-6 border-y border-gray-100",
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
						className: "text-center max-w-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-extrabold text-white shadow-lg shadow-red-500/10",
								children: item.step
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-4 text-base font-bold",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground mt-1",
								children: item.description
							})
						]
					}, item.step))
				})]
			}),
			activeBanners.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
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
			showNewArrivals && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})] }),
			showFeatured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
			})] }),
			sections?.flash_sale_enabled && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold sm:text-2xl",
				children: sections?.flash_sale_title || "Flash Sale"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl border bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm uppercase tracking-wide font-semibold",
						children: "Limited Time Offer"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-2 text-3xl font-extrabold",
						children: "Up to 50% Off!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap items-center gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-base font-bold",
								children: "Ends in: 00h 00m 00s"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2 w-32 rounded-full bg-white/30 overflow-hidden",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-1/2 rounded-full bg-white" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs",
								children: "Only 50 left!"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-6 rounded-full bg-white text-primary hover:bg-gray-100 font-bold px-6",
						children: "Shop Flash Sale"
					})
				]
			})] }),
			sections?.show_statistics && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold sm:text-2xl text-center mb-6",
				children: sections?.statistics_title || "Our Global Reach"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-6 rounded-2xl bg-gradient-to-r from-primary to-red-400 p-8 text-white shadow-card md:grid-cols-4",
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
						className: "text-3xl font-extrabold",
						children: stat.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wider font-semibold mt-1 opacity-90",
						children: stat.label
					})]
				}, stat.label))
			})] }),
			sections?.show_top_sellers && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold sm:text-2xl mb-6",
				children: sections?.top_sellers_title || "Top Sellers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3",
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
					className: "flex items-center gap-4 rounded-2xl border border-gray-100 bg-card p-4 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						className: "h-14 w-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
							className: "bg-secondary text-white text-lg font-bold",
							children: seller.name.charAt(0)
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-base font-bold",
							children: seller.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: ["Rating: ", seller.rating]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							className: "mt-2 rounded-full text-xs font-semibold px-4",
							children: "Visit Store"
						})
					] })]
				}, seller.name))
			})] }),
			sections?.show_featured_brands && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold sm:text-2xl mb-6",
				children: sections?.featured_brands_title || "Featured Brands"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-6",
				children: [
					"Nike",
					"Apple",
					"Samsung",
					"Sony",
					"Adidas",
					"Zara"
				].map((brand) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center rounded-xl border border-gray-100 bg-card p-4 shadow-soft transition duration-300 hover:border-primary hover:shadow-md cursor-pointer",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-base font-bold text-gray-700",
						children: brand
					})
				}, brand))
			})] }),
			sections?.show_why_saloree && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "py-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-bold sm:text-2xl text-center",
						children: sections?.why_saloree_title || "Why Saloree?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-center text-xs text-muted-foreground mt-1 mb-8",
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
								className: "rounded-2xl border border-gray-100 bg-card p-6 text-center shadow-soft hover:shadow-md transition duration-300",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mx-auto mb-4 h-12 w-12 text-primary" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-base font-bold",
										children: item.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground leading-relaxed",
										children: item.description
									})
								]
							}, item.title);
						})
					})
				]
			}),
			sections?.show_customer_reviews && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-bold sm:text-2xl text-center mb-6",
				children: sections?.customer_reviews_title || "What Our Customers Say"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
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
					className: "rounded-2xl border border-gray-100 bg-card p-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							className: "h-10 w-10 mr-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvatarFallback, {
								className: "bg-accent text-accent-foreground font-bold",
								children: review.name.charAt(0)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-bold",
							children: review.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex text-yellow-500 text-xs mt-0.5",
							children: ["★".repeat(review.rating), "☆".repeat(5 - review.rating)]
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground italic leading-relaxed",
						children: [
							"\"",
							review.review,
							"\""
						]
					})]
				}, review.name))
			})] }),
			sections?.show_mobile_app && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center justify-between rounded-2xl border border-gray-100 bg-card p-8 shadow-soft md:flex-row md:space-x-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center md:text-left space-y-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-extrabold sm:text-2xl",
							children: sections?.mobile_app_title || "Download Our Mobile App"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed max-w-sm",
							children: "Shop on the go, anytime, anywhere. Receive notifications on orders and discounts."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex justify-center space-x-4 md:justify-start",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "rounded-full font-bold px-6 text-xs h-10 shadow-sm",
								children: "App Store"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								className: "rounded-full font-bold px-6 text-xs h-10 shadow-sm",
								children: "Google Play"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 md:mt-0 relative shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-44 w-28 rounded-2xl bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-semibold border-2 border-gray-200 shadow-inner",
						children: "Phone Mockup"
					})
				})]
			}) }),
			sections?.show_newsletter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white shadow-lg text-center space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-extrabold",
						children: sections?.newsletter_title || "Stay Updated!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-blue-100 max-w-md mx-auto",
						children: "Subscribe to our newsletter for the latest deals, updates, and sellers."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col sm:flex-row justify-center items-center gap-3 pt-2 max-w-md mx-auto",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "email",
							placeholder: "Your email address",
							className: "w-full rounded-full border-none bg-white/10 px-4 py-2 text-white placeholder-blue-200 focus:ring-2 focus:ring-white"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full sm:w-auto rounded-full bg-white text-blue-700 hover:bg-gray-100 font-bold px-6 shrink-0 shadow-sm",
							children: "Subscribe"
						})]
					})
				]
			}) }),
			sections?.show_footer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "mt-10 bg-secondary text-white py-10 rounded-2xl overflow-hidden px-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-1 md:grid-cols-4 gap-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-lg font-bold tracking-tight",
								children: "saloree"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-gray-400",
								children: "Build. Sell. Grow."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-4",
							children: "Marketplace"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-xs text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Shop All" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Categories" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Brands" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Flash Sale" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-4",
							children: "Support"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-xs text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Help Center" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Shipping" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Returns" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Contact Us" })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-xs font-extrabold uppercase tracking-wider text-gray-300 mb-4",
							children: "Company"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-2 text-xs text-gray-400",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "About Us" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Careers" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Terms of Service" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Privacy Policy" })
							]
						})] })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500",
					children: "© 2026 Saloree. All rights reserved."
				})]
			})
		]
	});
}
//#endregion
export { Index as component };
