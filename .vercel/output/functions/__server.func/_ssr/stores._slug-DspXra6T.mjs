import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as Package2, D as ShieldCheck, Et as Clock, Nt as ChevronRight, O as Share2, U as MessageSquare, Wt as ArrowUpDown, Z as Lock, _ as Star, j as RotateCcw, k as Search, kt as CircleCheck, l as Truck, lt as Heart, r as X, y as Sparkles, zt as Calendar } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as ProductCard } from "./ProductCard-CBfDcIei.mjs";
import { n as motion, r as AnimatePresence } from "../_libs/framer-motion.mjs";
import { t as Route } from "./stores._slug-7NkSSVLz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stores._slug-DspXra6T.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FOLLOWED_STORES_KEY = "saloree.followed_stores.v1";
var DEMO_STORE_REVIEWS = [
	{
		id: "sr-1",
		author: "Amira J.",
		rating: 5,
		date: "2026-06-18",
		title: "Exceptional store experience!",
		content: "Every product arrived exactly as described. The packaging was premium and shipping was lightning fast. Definitely my go-to store now."
	},
	{
		id: "sr-2",
		author: "Mark T.",
		rating: 4,
		date: "2026-06-12",
		title: "Great quality and fast shipping",
		content: "Very happy with my purchase. Product quality is excellent and the seller was very responsive when I had a question. Will buy again."
	},
	{
		id: "sr-3",
		author: "Sara L.",
		rating: 5,
		date: "2026-06-05",
		title: "Highly trustworthy seller",
		content: "I've ordered from this store three times now and every experience has been perfect. Secure checkout, genuine products, and amazing customer service."
	}
];
function isDarkBg(hex) {
	const color = hex.replace("#", "");
	const r = parseInt(color.slice(0, 2), 16);
	const g = parseInt(color.slice(2, 4), 16);
	const b = parseInt(color.slice(4, 6), 16);
	return (.299 * r + .587 * g + .114 * b) / 255 < .5;
}
function formatJoinDate(dateStr) {
	return new Date(dateStr).toLocaleDateString("en-US", {
		month: "long",
		year: "numeric"
	});
}
function getFollowedStores() {
	try {
		const raw = localStorage.getItem(FOLLOWED_STORES_KEY);
		return raw ? JSON.parse(raw) : [];
	} catch {
		return [];
	}
}
function toggleFollowStore(storeId) {
	const followed = getFollowedStores();
	const idx = followed.indexOf(storeId);
	if (idx === -1) {
		followed.push(storeId);
		localStorage.setItem(FOLLOWED_STORES_KEY, JSON.stringify(followed));
		return true;
	} else {
		followed.splice(idx, 1);
		localStorage.setItem(FOLLOWED_STORES_KEY, JSON.stringify(followed));
		return false;
	}
}
var SocialIcon = ({ href, label, children }) => href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	href,
	target: "_blank",
	rel: "noreferrer",
	"aria-label": label,
	className: "p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white",
	children
}) : null;
function StarDisplay({ rating, max = 5 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex items-center gap-0.5",
		children: [...Array(max)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-3.5 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : i < rating ? "fill-amber-300 text-amber-300" : "fill-slate-200 text-slate-200"}` }, i))
	});
}
function StoreSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-pulse bg-slate-50 min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 bg-slate-300" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-72 bg-slate-200" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 bg-white border-b border-slate-100" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
				children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border bg-white",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square bg-slate-200 rounded-t-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-slate-200 rounded w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-slate-200 rounded w-1/2" })]
					})]
				}, i))
			})
		]
	});
}
function StorePage() {
	const { slug } = Route.useParams();
	const { page: searchPage } = Route.useSearch();
	const { user, loading: authLoading } = useAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("home");
	const tabsRef = (0, import_react.useRef)(null);
	const [searchQuery, setSearchQuery] = (0, import_react.useState)("");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(null);
	const [sortMode, setSortMode] = (0, import_react.useState)("newest");
	const [isFollowing, setIsFollowing] = (0, import_react.useState)(false);
	const [storeReviews, setStoreReviews] = (0, import_react.useState)(DEMO_STORE_REVIEWS);
	const [reviewName, setReviewName] = (0, import_react.useState)("");
	const [reviewRating, setReviewRating] = (0, import_react.useState)(5);
	const [reviewTitle, setReviewTitle] = (0, import_react.useState)("");
	const [reviewContent, setReviewContent] = (0, import_react.useState)("");
	const [hoverRating, setHoverRating] = (0, import_react.useState)(0);
	const { data: store, error: storeError, isLoading: storeLoading } = useQuery({
		queryKey: ["store", slug],
		queryFn: async () => {
			const { data, error } = await supabase.from("stores").select("*").eq("slug", slug).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const isOwnerPreview = !!user && !!store && user.id === store.owner_id;
	const { data: activeInstallation } = useQuery({
		queryKey: ["store-active-installation-public", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("store_theme_installations").select("*, store_theme_settings(*)").eq("store_id", store.id).eq("is_published", true).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const themeSettings = activeInstallation?.store_theme_settings?.[0] ?? null;
	const { data: navItems = [] } = useQuery({
		queryKey: ["store-nav-items-public", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("store_navigation_items").select("*").eq("store_id", store.id).order("display_order", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: currentPage } = useQuery({
		queryKey: [
			"store-custom-page",
			store?.id,
			searchPage
		],
		enabled: !!store?.id && !!searchPage,
		queryFn: async () => {
			const { data, error } = await supabase.from("store_pages").select("*").eq("store_id", store.id).eq("slug", searchPage).eq("is_published", true).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: products = [], isLoading: productsLoading } = useQuery({
		queryKey: [
			"store-products",
			store?.id,
			isOwnerPreview
		],
		enabled: !!store?.id && !authLoading,
		queryFn: async () => {
			let query = supabase.from("products").select("id, slug, store_id, title, price, featured_image, status, created_at, stores(name, slug, logo_url), categories(name, slug)").eq("store_id", store.id).order("created_at", { ascending: false });
			query = isOwnerPreview ? query.in("status", ["draft", "active"]) : query.eq("status", "active");
			const { data, error } = await query;
			if (error) throw error;
			return data ?? [];
		}
	});
	(0, import_react.useEffect)(() => {
		if (store?.id) setIsFollowing(getFollowedStores().includes(store.id));
	}, [store?.id]);
	const ts = themeSettings;
	const primaryColor = ts?.primary_color || "#6366f1";
	const bgColor = ts?.bg_color || "#ffffff";
	const accentColor = ts?.accent_color || "#f1f5f9";
	const buttonColor = ts?.button_color || primaryColor;
	const fontFamily = ts?.font_family || "'Inter', sans-serif";
	ts?.cta_text;
	const logoUrl = ts?.logo_url || store?.logo_url;
	const bannerUrl = ts?.banner_url || store?.banner_url;
	const darkBg = isDarkBg(bgColor);
	const textColor = darkBg ? "#ffffff" : "#111827";
	const mutedColor = darkBg ? "rgba(255,255,255,0.6)" : "rgba(17,24,39,0.5)";
	const storeName = store?.name || "Store";
	const storeInitial = storeName.charAt(0).toUpperCase();
	const joinedDate = store?.created_at ? formatJoinDate(store.created_at) : null;
	const productCount = products.length;
	ts?.hero_title || store?.name;
	ts?.hero_subtitle || store?.description;
	const footerText = `© ${(/* @__PURE__ */ new Date()).getFullYear()} ${storeName}, Powered by Saloree`;
	const categoryOptions = (0, import_react.useMemo)(() => {
		const cats = /* @__PURE__ */ new Map();
		products.forEach((p) => {
			if (p.categories?.slug && p.categories?.name) cats.set(p.categories.slug, p.categories.name);
		});
		return Array.from(cats.entries()).map(([catSlug, name]) => ({
			slug: catSlug,
			name
		}));
	}, [products]);
	const filteredProducts = (0, import_react.useMemo)(() => {
		let result = [...products];
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			result = result.filter((p) => p.title.toLowerCase().includes(q));
		}
		if (selectedCategory) result = result.filter((p) => p.categories?.slug === selectedCategory);
		switch (sortMode) {
			case "price_asc":
				result.sort((a, b) => Number(a.price) - Number(b.price));
				break;
			case "price_desc":
				result.sort((a, b) => Number(b.price) - Number(a.price));
				break;
			case "popular":
				result.sort((a, b) => {
					let sumA = 0, sumB = 0;
					for (let i = 0; i < a.id.length; i++) sumA += a.id.charCodeAt(i);
					for (let i = 0; i < b.id.length; i++) sumB += b.id.charCodeAt(i);
					return sumB - sumA;
				});
				break;
			default: break;
		}
		return result;
	}, [
		products,
		searchQuery,
		selectedCategory,
		sortMode
	]);
	const featuredProducts = (0, import_react.useMemo)(() => products.slice(0, 4), [products]);
	const newArrivals = (0, import_react.useMemo)(() => products.slice(0, 4), [products]);
	const handleFollow = () => {
		if (!store?.id) return;
		const nowFollowing = toggleFollowStore(store.id);
		setIsFollowing(nowFollowing);
		toast.success(nowFollowing ? `Following ${storeName}!` : `Unfollowed ${storeName}`);
	};
	const handleShare = async () => {
		const url = window.location.href;
		if (navigator.share) try {
			await navigator.share({
				title: storeName,
				url
			});
		} catch {}
		else {
			await navigator.clipboard.writeText(url);
			toast.success("Store link copied to clipboard!");
		}
	};
	const handleReviewSubmit = (e) => {
		e.preventDefault();
		if (!reviewName.trim() || !reviewTitle.trim() || !reviewContent.trim()) return toast.error("Please fill in all review fields.");
		setStoreReviews([{
			id: `local-${Date.now()}`,
			author: reviewName,
			rating: reviewRating,
			date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
			title: reviewTitle,
			content: reviewContent,
			isLocal: true
		}, ...storeReviews]);
		setReviewName("");
		setReviewTitle("");
		setReviewContent("");
		setReviewRating(5);
		toast.success("Review submitted locally for demonstration!");
	};
	if (storeLoading || authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StoreSkeleton, {});
	if (storeError || !store) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-5xl mb-4",
					children: "🏪"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold mb-2",
					children: "Store Not Found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted-foreground mb-6",
					children: "This store doesn't exist or may have been removed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-primary hover:underline font-medium",
					children: "← Back to Saloree"
				})
			]
		})
	});
	const isDraft = store.status !== "published";
	if (isDraft && !isOwnerPreview) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-6xl mb-5",
					children: "🚧"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold mb-2 text-slate-800",
					children: "Store Not Available"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-slate-500 mb-6",
					children: "This store hasn't been published yet. Check back later!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "inline-block px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition",
					children: "← Browse Saloree"
				})
			]
		})
	});
	if (searchPage) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: bgColor,
			color: textColor,
			fontFamily,
			minHeight: "100vh"
		},
		className: "flex flex-col",
		children: [
			ts?.show_announcement && ts?.announcement_text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-2 text-center text-xs font-semibold transition",
				style: {
					background: ts.announcement_bg || "#111827",
					color: ts.announcement_text_color || "#ffffff"
				},
				children: ts.announcement_text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "sticky top-0 z-50 flex items-center gap-4 px-6 py-3.5 shadow-sm",
				style: { background: primaryColor },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stores/$slug",
						params: { slug },
						className: "flex items-center gap-3",
						children: [logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logoUrl,
							className: "h-8 w-8 rounded-lg object-cover",
							alt: storeName
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white",
							style: { background: buttonColor },
							children: storeInitial
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white font-bold text-base",
							children: storeName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:flex items-center gap-4 text-xs font-semibold text-white/95 mr-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stores/$slug",
							params: { slug },
							className: "hover:text-white transition",
							children: "Home"
						}), navItems.map((item) => {
							const pageSlug = item.url.startsWith("/pages/") ? item.url.replace("/pages/", "") : null;
							return pageSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/stores/$slug",
								params: { slug },
								search: { page: pageSlug },
								className: "hover:text-white transition",
								children: item.title
							}, item.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.url.startsWith("/") ? item.url : `https://${item.url}`,
								target: item.url.startsWith("/") ? "_self" : "_blank",
								rel: "noreferrer",
								className: "hover:text-white transition",
								children: item.title
							}, item.id);
						})]
					}),
					isOwnerPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/seller",
						className: "text-xs text-white/80 hover:text-white underline underline-offset-2 mr-2",
						children: "Dashboard"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1 max-w-4xl w-full mx-auto px-6 py-12",
				children: currentPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-3xl font-extrabold",
							style: { color: primaryColor },
							children: currentPage.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap",
							style: { color: textColor },
							dangerouslySetInnerHTML: { __html: currentPage.content || "" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "pt-8",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/stores/$slug",
								params: { slug },
								className: "text-xs font-semibold hover:underline inline-flex items-center gap-1",
								style: { color: primaryColor },
								children: "← Back to Store Home"
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl font-bold mb-2",
							children: "Page Not Found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted-foreground text-sm mb-6",
							style: { color: mutedColor },
							children: "The page you requested is not published or does not exist."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/stores/$slug",
							params: { slug },
							className: "text-xs font-semibold hover:underline",
							style: { color: primaryColor },
							children: "Back to Store Home"
						})
					]
				})
			})
		]
	});
	const renderHomeTab = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-14",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-4 gap-4",
				children: [
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-5" }),
						title: "Verified Seller",
						desc: "Identity confirmed"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" }),
						title: "Secure Checkout",
						desc: "256-bit SSL encryption"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-5" }),
						title: "Fast Shipping",
						desc: "2–4 business days"
					},
					{
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-5" }),
						title: "Easy Returns",
						desc: "30-day return policy"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2 p-4 rounded-2xl border bg-card text-center shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2.5 rounded-xl text-white",
							style: { background: primaryColor },
							children: item.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-bold text-secondary",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: item.desc
						})
					]
				}, item.title))
			}),
			productsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-6 bg-slate-200 rounded w-48 animate-pulse" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
					children: [...Array(4)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border animate-pulse bg-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square bg-slate-200 rounded-t-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-3 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-slate-200 rounded w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-slate-200 rounded w-1/2" })]
						})]
					}, i))
				})]
			}) : products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-20 rounded-3xl border-2 border-dashed border-slate-200",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-5xl mb-3",
						children: "📦"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-lg mb-1 text-secondary",
						children: "No products yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: isOwnerPreview ? "Add your first product from your seller dashboard." : "This store hasn't added any products yet. Check back soon!"
					}),
					isOwnerPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/seller/products",
						className: "inline-block mt-4 px-5 py-2.5 rounded-full font-semibold text-white text-sm",
						style: { background: primaryColor },
						children: "+ Add Product"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-xl font-extrabold text-secondary flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
							className: "size-5",
							style: { color: primaryColor }
						}),
						" ",
						"Featured Products"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Handpicked by the store"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab("products"),
					className: "text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition",
					style: { color: primaryColor },
					children: ["View All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
				children: featuredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})] }), newArrivals.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-extrabold text-secondary",
					children: "🆕 New Arrivals"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Recently added to the store"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setActiveTab("products"),
					className: "text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition",
					style: { color: primaryColor },
					children: ["Browse All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
				children: newArrivals.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})] })] }),
			store.description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-3xl p-8 border",
				style: { background: primaryColor + "08" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-extrabold text-secondary mb-3",
						children: "About This Store"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground leading-relaxed line-clamp-4",
						children: store.description
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => setActiveTab("about"),
						className: "mt-4 text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition",
						style: { color: primaryColor },
						children: ["Read more ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					})
				]
			}),
			ts?.about_title && ts?.about_text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-12 border-t",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl mx-auto text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-2xl font-bold mb-4",
						children: ts.about_title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm leading-relaxed whitespace-pre-line",
						style: { color: mutedColor },
						children: ts.about_text
					})]
				})
			})
		]
	});
	const renderProductsTab = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col sm:flex-row gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: `Search products in ${storeName}…`,
							value: searchQuery,
							onChange: (e) => setSearchQuery(e.target.value),
							className: "w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 bg-card text-sm focus:outline-none focus:ring-2 transition"
						}),
						searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setSearchQuery(""),
							className: "absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 shrink-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs text-muted-foreground font-medium flex items-center gap-1 shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "size-3.5" }), " Sort:"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						value: sortMode,
						onChange: (e) => setSortMode(e.target.value),
						className: "text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2.5 bg-card focus:outline-none cursor-pointer",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "newest",
								children: "Newest First"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price_asc",
								children: "Price: Low → High"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "price_desc",
								children: "Price: High → Low"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "popular",
								children: "Most Popular"
							})
						]
					})]
				})]
			}),
			categoryOptions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => setSelectedCategory(null),
					className: `px-4 py-1.5 rounded-full text-xs font-semibold border transition ${!selectedCategory ? "text-white border-transparent shadow-sm" : "text-muted-foreground border-slate-200 bg-card hover:bg-slate-50"}`,
					style: !selectedCategory ? { background: primaryColor } : void 0,
					children: [
						"All Products (",
						productCount,
						")"
					]
				}), categoryOptions.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => setSelectedCategory(selectedCategory === cat.slug ? null : cat.slug),
					className: `px-4 py-1.5 rounded-full text-xs font-semibold border transition ${selectedCategory === cat.slug ? "text-white border-transparent shadow-sm" : "text-muted-foreground border-slate-200 bg-card hover:bg-slate-50"}`,
					style: selectedCategory === cat.slug ? { background: primaryColor } : void 0,
					children: cat.name
				}, cat.slug))]
			}),
			(searchQuery || selectedCategory) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-xs text-muted-foreground",
				children: [
					"Showing",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-secondary",
						children: filteredProducts.length
					}),
					" ",
					filteredProducts.length === 1 ? "product" : "products",
					searchQuery && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						" ",
						"for \"",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: searchQuery
						}),
						"\""
					] }),
					selectedCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						" ",
						"in",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: categoryOptions.find((c) => c.slug === selectedCategory)?.name
						})
					] })
				]
			}),
			productsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
				children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border animate-pulse bg-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square bg-slate-200 rounded-t-xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-slate-200 rounded w-3/4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-slate-200 rounded w-1/2" })]
					})]
				}, i))
			}) : filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-20 rounded-3xl border-2 border-dashed border-slate-200",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-4xl mb-3",
						children: "🔍"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-secondary mb-1",
						children: "No products found"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Try adjusting your search or category filters."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							setSearchQuery("");
							setSelectedCategory(null);
						},
						className: "mt-4 text-xs font-semibold underline",
						style: { color: primaryColor },
						children: "Clear filters"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
				children: filteredProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p }, p.id))
			})
		]
	});
	const renderAboutTab = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid lg:grid-cols-3 gap-8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:col-span-2 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-card rounded-3xl border p-8 shadow-soft space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "text-lg font-extrabold text-secondary",
						children: ["About ", storeName]
					}), store.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground leading-relaxed whitespace-pre-line",
						children: store.description
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground italic",
						children: "No description provided yet."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-card rounded-3xl border p-8 shadow-soft space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-extrabold text-secondary",
						children: "Business Information"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-0 text-sm divide-y divide-slate-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-4 text-muted-foreground shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Member since"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto font-semibold text-secondary",
										children: joinedDate || "—"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package2, { className: "size-4 text-muted-foreground shrink-0" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Total active products"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto font-semibold text-secondary",
										children: productCount
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										className: "size-4 shrink-0",
										style: { color: primaryColor }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-muted-foreground",
										children: "Seller status"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto font-semibold",
										style: { color: primaryColor },
										children: "Verified ✓"
									})
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "bg-card rounded-3xl border p-8 shadow-soft space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-extrabold text-secondary",
						children: "Store Policies"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-5 text-sm text-muted-foreground divide-y divide-slate-100",
						children: [
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, {
									className: "size-4 shrink-0 mt-0.5",
									style: { color: primaryColor }
								}),
								title: "Shipping Policy",
								text: "Orders are processed within 1–2 business days. Free shipping on orders over $35. Delivery takes 2–5 business days."
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {
									className: "size-4 shrink-0 mt-0.5",
									style: { color: primaryColor }
								}),
								title: "Return Policy",
								text: "Items can be returned within 30 days of delivery in original condition. Contact the seller to initiate a return."
							},
							{
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
									className: "size-4 shrink-0 mt-0.5",
									style: { color: primaryColor }
								}),
								title: "Privacy & Security",
								text: "Your payment information is never stored. All transactions are encrypted with 256-bit SSL. Buyer protection on all orders."
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-3 pt-5 first:pt-0",
							children: [item.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-secondary mb-1",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.text })] })]
						}, item.title))
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card rounded-3xl border p-6 shadow-soft text-center space-y-4",
				children: [
					logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: logoUrl,
						alt: storeName,
						className: "w-20 h-20 rounded-2xl object-cover mx-auto border-2 shadow-sm",
						style: { borderColor: primaryColor + "30" }
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-3xl font-extrabold text-white shadow-sm",
						style: { background: primaryColor },
						children: storeInitial
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-extrabold text-secondary",
						children: storeName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-1 mt-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4 fill-blue-500 text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs font-semibold text-blue-600",
							children: "Verified Store"
						})]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleFollow,
						className: "w-full py-2.5 rounded-2xl font-semibold text-sm transition active:scale-[0.98]",
						style: isFollowing ? {
							background: "#f1f5f9",
							color: "#374151",
							border: "1px solid #e2e8f0"
						} : {
							background: primaryColor,
							color: "#fff"
						},
						children: isFollowing ? "✓ Following" : `Follow ${storeName}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: handleShare,
						className: "w-full py-2.5 rounded-2xl font-semibold text-sm border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition flex items-center justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Share Store"]
					})
				]
			}), ts && (ts.social_instagram || ts.social_twitter || ts.social_facebook || ts.social_tiktok) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-card rounded-3xl border p-6 shadow-soft space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-extrabold text-secondary",
					children: "Follow on Social"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						ts.social_instagram && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: ts.social_instagram,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold",
							children: "Instagram"
						}),
						ts.social_twitter && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: ts.social_twitter,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-semibold",
							children: "X / Twitter"
						}),
						ts.social_facebook && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: ts.social_facebook,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold",
							children: "Facebook"
						}),
						ts.social_tiktok && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: ts.social_tiktok,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-semibold",
							children: "TikTok"
						})
					]
				})]
			})]
		})]
	});
	const renderReviewsTab = () => {
		const avgRating = storeReviews.reduce((sum, r) => sum + r.rating, 0) / storeReviews.length;
		const ratingCounts = [
			5,
			4,
			3,
			2,
			1
		].map((star) => ({
			star,
			count: storeReviews.filter((r) => r.rating === star).length
		}));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-10",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-amber-500 shrink-0 mt-0.5",
						children: "⚠"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Demo Reviews" }), " — These are placeholder reviews for demonstration purposes only. Real reviews will load once a reviews system is connected to the database."] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid md:grid-cols-2 gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-card rounded-3xl border p-8 shadow-soft flex flex-col items-center justify-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-7xl font-black",
								style: { color: primaryColor },
								children: avgRating.toFixed(1)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarDisplay, { rating: avgRating }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted-foreground",
								children: [storeReviews.length, " reviews (demo)"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-card rounded-3xl border p-8 shadow-soft space-y-3",
						children: ratingCounts.map(({ star, count }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-4 text-muted-foreground font-medium text-right",
									children: star
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-amber-400 text-amber-400 shrink-0" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex-1 h-2 rounded-full bg-slate-100 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full transition-all duration-500",
										style: {
											width: `${count / storeReviews.length * 100}%`,
											background: primaryColor
										}
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground text-xs w-4",
									children: count
								})
							]
						}, star))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: storeReviews.map((rev) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
						initial: {
							opacity: 0,
							y: 10
						},
						animate: {
							opacity: 1,
							y: 0
						},
						className: "bg-card rounded-2xl border p-6 shadow-soft space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0",
										style: { background: primaryColor },
										children: rev.author.charAt(0)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold text-secondary text-sm",
										children: rev.author
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mt-0.5",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StarDisplay, { rating: rev.rating }), rev.isLocal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100",
											children: "Local"
										})]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground shrink-0",
									children: rev.date
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold text-secondary text-sm",
								children: rev.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted-foreground leading-relaxed",
								children: rev.content
							})
						]
					}, rev.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card rounded-3xl border p-8 shadow-soft space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
							className: "font-extrabold text-secondary flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, {
									className: "size-5",
									style: { color: primaryColor }
								}),
								" ",
								"Write a Review"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Reviews are stored locally for demonstration only. A real review system will be connected in a future update."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleReviewSubmit,
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid sm:grid-cols-2 gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "text",
										placeholder: "Your name",
										value: reviewName,
										onChange: (e) => setReviewName(e.target.value),
										className: "w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm bg-card focus:outline-none focus:ring-2"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 bg-card",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-xs text-muted-foreground",
											children: "Rating:"
										}), [
											1,
											2,
											3,
											4,
											5
										].map((star) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											onClick: () => setReviewRating(star),
											onMouseEnter: () => setHoverRating(star),
											onMouseLeave: () => setHoverRating(0),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: `size-5 transition ${star <= (hoverRating || reviewRating) ? "fill-amber-400 text-amber-400" : "fill-slate-200 text-slate-200"}` })
										}, star))]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "text",
									placeholder: "Review title",
									value: reviewTitle,
									onChange: (e) => setReviewTitle(e.target.value),
									className: "w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm bg-card focus:outline-none focus:ring-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									rows: 4,
									placeholder: "Share your experience with this store…",
									value: reviewContent,
									onChange: (e) => setReviewContent(e.target.value),
									className: "w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm resize-none bg-card focus:outline-none focus:ring-2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "submit",
									className: "px-6 py-2.5 rounded-2xl font-semibold text-sm text-white transition hover:opacity-90 active:scale-95",
									style: { background: primaryColor },
									children: "Submit Review"
								})
							]
						})
					]
				})
			]
		});
	};
	const renderShippingTab = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid md:grid-cols-2 gap-6 max-w-4xl",
		children: [
			{
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Truck, { className: "size-6" }),
				title: "Shipping Policy",
				items: [
					"Orders processed within 1–2 business days",
					"Free standard shipping on orders over $35",
					"Standard shipping: 2–5 business days",
					"Express shipping available at checkout",
					"International shipping available to select countries"
				]
			},
			{
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-6" }),
				title: "Return Policy",
				items: [
					"30-day return window from delivery date",
					"Items must be in original, unused condition",
					"Free return shipping on defective items",
					"Refunds processed within 5–7 business days",
					"Contact store to initiate a return request"
				]
			},
			{
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-6" }),
				title: "Buyer Protection",
				items: [
					"All orders protected by Saloree Buyer Guarantee",
					"Full refund if item not received",
					"Refund if item significantly not as described",
					"Secure payment processing with SSL encryption",
					"Dispute resolution support available 24/7"
				]
			},
			{
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-6" }),
				title: "Payment & Security",
				items: [
					"Accepted: Visa, Mastercard, PayPal, Apple Pay",
					"256-bit SSL encryption on all transactions",
					"Payment info never stored on our servers",
					"PCI DSS compliant payment processing",
					"Verified by Saloree marketplace standards"
				]
			}
		].map((card) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card rounded-3xl border p-6 shadow-soft space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-2.5 rounded-2xl text-white",
					style: { background: primaryColor },
					children: card.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-extrabold text-secondary",
					children: card.title
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2.5",
				children: card.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start gap-2 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						className: "size-3.5 shrink-0 mt-0.5",
						style: { color: primaryColor }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item })]
				}, item))
			})]
		}, card.title))
	});
	const renderContactTab = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card rounded-3xl border p-8 shadow-soft space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-lg font-extrabold text-secondary",
					children: ["Contact ", storeName]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-2.5 rounded-xl text-white shrink-0",
								style: { background: primaryColor },
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-secondary text-sm",
									children: "Response Time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Usually responds within 24 hours"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0",
								children: "Fast Responder"
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-2.5 rounded-xl text-white shrink-0",
							style: { background: primaryColor },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold text-secondary text-sm",
							children: "Message the Seller"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Ask about products, custom orders, or policies"
						})] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "w-full py-3.5 rounded-2xl font-bold text-white transition hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2",
						style: { background: primaryColor },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageSquare, { className: "size-5" }), " Contact Seller"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-center text-muted-foreground",
						children: "Messaging will be available once the seller messaging system is live."
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bg-card rounded-3xl border p-6 shadow-soft space-y-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-extrabold text-secondary text-sm",
				children: "Trust & Safety"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 text-xs text-muted-foreground",
				children: [
					{
						label: "Verified Seller",
						badge: "✓"
					},
					{
						label: "Secure Payments",
						badge: "🔒"
					},
					{
						label: "Buyer Protection",
						badge: "🛡"
					},
					{
						label: "Easy Returns",
						badge: "↩"
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.badge }),
						" ",
						item.label
					]
				}, item.label))
			})]
		})]
	});
	const tabs = [
		{
			id: "home",
			label: "Home"
		},
		{
			id: "products",
			label: `Products (${productCount})`
		},
		{
			id: "about",
			label: "About"
		},
		{
			id: "reviews",
			label: "Reviews"
		},
		{
			id: "shipping",
			label: "Shipping & Returns"
		},
		{
			id: "contact",
			label: "Contact"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col min-h-screen bg-slate-50",
		children: [
			ts?.show_announcement && ts?.announcement_text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-2 text-center text-xs font-semibold",
				style: {
					background: ts.announcement_bg || "#111827",
					color: ts.announcement_text_color || "#ffffff"
				},
				children: ts.announcement_text
			}),
			isDraft && isOwnerPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-amber-500 text-slate-900 px-4 py-2.5 text-center text-xs font-bold flex items-center justify-center gap-2 border-b border-amber-600 shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "⚠️ You are previewing your store in draft mode. Visitors cannot see this store until you publish it." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/seller/store",
					className: "underline hover:text-slate-950 font-extrabold ml-1",
					children: "Go to Store Settings to Publish"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "sticky top-0 z-50 flex items-center gap-4 px-6 py-3.5 shadow-sm",
				style: {
					background: primaryColor,
					fontFamily
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stores/$slug",
						params: { slug },
						className: "flex items-center gap-3",
						onClick: () => setActiveTab("home"),
						children: [logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: logoUrl,
							className: "h-8 w-8 rounded-lg object-cover border border-white/20",
							alt: storeName
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white",
							style: { background: buttonColor },
							children: storeInitial
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-white font-bold text-base",
							children: storeName
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden sm:flex items-center gap-4 text-xs font-semibold text-white/95 mr-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setActiveTab("home"),
							className: `transition ${activeTab === "home" ? "text-white" : "text-white/70 hover:text-white"}`,
							children: "Home"
						}), navItems.map((item) => {
							const pageSlug = item.url.startsWith("/pages/") ? item.url.replace("/pages/", "") : null;
							return pageSlug ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/stores/$slug",
								params: { slug },
								search: { page: pageSlug },
								className: "text-white/70 hover:text-white transition",
								children: item.title
							}, item.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.url.startsWith("/") ? item.url : `https://${item.url}`,
								target: item.url.startsWith("/") ? "_self" : "_blank",
								rel: "noreferrer",
								className: "text-white/70 hover:text-white transition",
								children: item.title
							}, item.id);
						})]
					}),
					isOwnerPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/seller",
						className: "text-xs text-white/80 hover:text-white underline underline-offset-2 mr-2",
						children: "Dashboard"
					})
				]
			}),
			isOwnerPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 px-6 py-2.5 bg-primary/10 border-b border-primary/20 text-xs shrink-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Seller Preview Mode — drafts are visible" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/seller/theme-customizer",
						search: { id: activeInstallation?.id },
						className: "ml-auto text-primary hover:underline font-semibold",
						children: "✏️ Customize Theme"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden shrink-0",
				style: {
					background: bannerUrl ? `url(${bannerUrl}) center/cover no-repeat` : `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 60%, ${accentColor} 100%)`,
					minHeight: "280px"
				},
				children: [bannerUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-end gap-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "shrink-0",
							children: logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.img, {
								initial: {
									scale: .8,
									opacity: 0
								},
								animate: {
									scale: 1,
									opacity: 1
								},
								transition: { duration: .4 },
								src: logoUrl,
								alt: storeName,
								className: "w-24 h-24 rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								initial: {
									scale: .8,
									opacity: 0
								},
								animate: {
									scale: 1,
									opacity: 1
								},
								transition: { duration: .4 },
								className: "w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black text-white border-4 border-white/30 shadow-2xl",
								style: { background: buttonColor },
								children: storeInitial
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 16
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .4,
								delay: .1
							},
							className: "flex-1 pb-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2 mb-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "text-2xl sm:text-3xl font-extrabold text-white leading-tight",
										style: { fontFamily },
										children: storeName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-xs font-bold",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 fill-white text-white" }),
											" ",
											"Verified"
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-3 text-white/80 text-xs mt-1",
									children: [
										joinedDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5" }),
												" Joined ",
												joinedDate
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Package2, { className: "size-3.5" }),
												" ",
												productCount,
												" products"
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3.5 fill-amber-400 text-amber-400" }),
												" ",
												"4.8",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-white/60 ml-0.5",
													children: "(Demo)"
												})
											]
										})
									]
								}),
								store.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white/80 text-xs mt-2 max-w-lg line-clamp-2 leading-relaxed",
									children: store.description
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							transition: {
								duration: .4,
								delay: .2
							},
							className: "flex items-center gap-2 shrink-0 self-end pb-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleFollow,
								className: "flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition active:scale-95",
								style: isFollowing ? {
									background: "rgba(255,255,255,0.2)",
									color: "#fff",
									backdropFilter: "blur(8px)",
									border: "1px solid rgba(255,255,255,0.3)"
								} : {
									background: "#ffffff",
									color: primaryColor
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heart, { className: `size-4 ${isFollowing ? "fill-white text-white" : ""}` }), isFollowing ? "Following" : "Follow"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: handleShare,
								className: "flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 transition active:scale-95",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, { className: "size-4" }), " Share"]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: tabsRef,
				className: "sticky top-[57px] z-40 bg-white border-b border-slate-200 shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto px-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-center overflow-x-auto scrollbar-none",
						children: tabs.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab(tab.id),
							className: `relative shrink-0 px-4 py-4 text-xs font-semibold transition-colors whitespace-nowrap border-b-2 border-transparent ${activeTab === tab.id ? "text-secondary" : "text-muted-foreground hover:text-secondary"}`,
							children: [tab.label, activeTab === tab.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
								layoutId: "store-tab-indicator",
								className: "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
								style: { background: primaryColor }
							})]
						}, tab.id))
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "max-w-7xl mx-auto px-4 py-8 sm:py-12",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "wait",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
							initial: {
								opacity: 0,
								y: 8
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -8
							},
							transition: { duration: .18 },
							children: [
								activeTab === "home" && renderHomeTab(),
								activeTab === "products" && renderProductsTab(),
								activeTab === "about" && renderAboutTab(),
								activeTab === "reviews" && renderReviewsTab(),
								activeTab === "shipping" && renderShippingTab(),
								activeTab === "contact" && renderContactTab()
							]
						}, activeTab)
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t mt-auto",
				style: {
					background: primaryColor + "12",
					borderColor: primaryColor + "30"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: logoUrl,
								className: "h-8 w-8 rounded-lg object-cover",
								alt: storeName
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white",
								style: { background: primaryColor },
								children: storeInitial
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-semibold text-sm text-foreground",
								children: storeName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									href: ts?.social_instagram || "",
									label: "Instagram",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-4 h-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									href: ts?.social_twitter || "",
									label: "Twitter",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-4 h-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									href: ts?.social_facebook || "",
									label: "Facebook",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-4 h-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									href: ts?.social_tiktok || "",
									label: "TikTok",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-4 h-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.26 8.26 0 004.83 1.55V6.84a4.85 4.85 0 01-1.06-.15z" })
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: footerText
						})
					]
				})
			})
		]
	});
}
//#endregion
export { StorePage as component };
