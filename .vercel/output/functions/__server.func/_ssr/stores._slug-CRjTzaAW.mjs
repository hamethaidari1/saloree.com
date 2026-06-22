import { t as supabase } from "./client-DfK1yIpk.mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as ProductCard } from "./ProductCard-CBfDcIei.mjs";
import { t as Route } from "./stores._slug-B86eJkQ2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/stores._slug-CRjTzaAW.js
var import_jsx_runtime = require_jsx_runtime();
function isDarkBg(hex) {
	const color = hex.replace("#", "");
	const r = parseInt(color.slice(0, 2), 16);
	const g = parseInt(color.slice(2, 4), 16);
	const b = parseInt(color.slice(4, 6), 16);
	return (.299 * r + .587 * g + .114 * b) / 255 < .5;
}
function ProductSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border overflow-hidden animate-pulse",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-muted h-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-3 space-y-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-muted rounded w-3/4" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 bg-muted rounded w-1/2" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-8 bg-muted rounded mt-2" })
			]
		})]
	});
}
var SocialIcon = ({ href, label, children }) => href ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	href,
	target: "_blank",
	rel: "noreferrer",
	"aria-label": label,
	className: "p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white",
	children
}) : null;
function StorePage() {
	const { slug } = Route.useParams();
	const { page: searchPage } = Route.useSearch();
	const { user, loading: authLoading } = useAuth();
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
	const themeSettings = activeInstallation?.store_theme_settings?.[0] || null;
	const { data: navItems = [] } = useQuery({
		queryKey: ["store-nav-items-public", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("store_navigation_items").select("*").eq("store_id", store.id).order("display_order", { ascending: true });
			if (error) throw error;
			return data;
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
	const { data: products, error: productsError, isLoading: productsLoading } = useQuery({
		queryKey: [
			"store-products",
			store?.id,
			isOwnerPreview
		],
		enabled: !!store?.id && !authLoading,
		queryFn: async () => {
			let query = supabase.from("products").select("id, slug, store_id, title, price, featured_image, status, stores(name, slug, logo_url), categories(name, slug)").eq("store_id", store.id).order("created_at", { ascending: false });
			query = isOwnerPreview ? query.in("status", ["draft", "active"]) : query.eq("status", "active");
			const { data, error } = await query;
			if (error) throw error;
			return data ?? [];
		}
	});
	const primaryColor = themeSettings?.primary_color || "#6366f1";
	const bgColor = themeSettings?.bg_color || "#ffffff";
	const accentColor = themeSettings?.accent_color || "#f1f5f9";
	const buttonColor = themeSettings?.button_color || primaryColor;
	const fontFamily = themeSettings?.font_family || "'Inter', sans-serif";
	const heroTitle = themeSettings?.hero_title || store?.store_name || store?.name || "Welcome";
	const heroSubtitle = themeSettings?.hero_subtitle || store?.description || "Discover our products";
	const ctaText = themeSettings?.cta_text || "Shop Now";
	const footerText = themeSettings?.footer_text || `© ${(/* @__PURE__ */ new Date()).getFullYear()} ${store?.store_name || store?.name || "Store"}. All rights reserved.`;
	const cardStyle = themeSettings?.card_style || "shadow";
	const logoUrl = themeSettings?.logo_url || store?.logo_url;
	const bannerUrl = themeSettings?.banner_url || store?.banner_url;
	const darkBg = isDarkBg(bgColor);
	const textColor = darkBg ? "#ffffff" : "#111827";
	const mutedColor = darkBg ? "rgba(255,255,255,0.6)" : "rgba(17,24,39,0.5)";
	const cardBg = accentColor;
	if (storeLoading || authLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center space-y-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading store…"
			})]
		})
	});
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
	const storeName = store.store_name || store.name || "Store";
	const storeInitial = storeName.charAt(0).toUpperCase();
	const cardClasses = {
		minimal: "rounded-md overflow-hidden",
		shadow: "rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow",
		bordered: "rounded-xl overflow-hidden border-2",
		"image-first": "rounded-2xl overflow-hidden"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: bgColor,
			color: textColor,
			fontFamily,
			minHeight: "100vh"
		},
		className: "flex flex-col",
		children: [
			themeSettings?.show_announcement && themeSettings?.announcement_text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-2 text-center text-xs font-semibold transition",
				style: {
					background: themeSettings.announcement_bg || "#111827",
					color: themeSettings.announcement_text_color || "#ffffff"
				},
				children: themeSettings.announcement_text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "sticky top-0 z-45 flex items-center gap-4 px-6 py-3.5 shadow-sm",
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
						}), navItems.length > 0 ? navItems.map((item) => {
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
						}) : null]
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
			searchPage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1 flex flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative overflow-hidden shrink-0",
						style: {
							background: bannerUrl ? `url(${bannerUrl}) center/cover no-repeat` : `linear-gradient(135deg, ${primaryColor} 0%, ${accentColor} 100%)`,
							minHeight: "320px",
							display: "flex",
							alignItems: "center",
							justifyContent: "center"
						},
						children: [bannerUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative z-10 text-center px-6 py-16 max-w-2xl mx-auto",
							children: [
								logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "w-20 h-20 rounded-2xl overflow-hidden border-4 border-white/30 shadow-xl mx-auto mb-5",
									style: { background: cardBg },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: logoUrl,
										className: "w-full h-full object-cover",
										alt: storeName
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "text-3xl sm:text-4xl font-extrabold text-white mb-3",
									style: { fontFamily },
									children: heroTitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white/85 text-base sm:text-lg mb-6 leading-relaxed max-w-xl mx-auto",
									children: heroSubtitle
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#products",
									className: "inline-block px-7 py-3 rounded-full font-semibold text-white transition hover:opacity-90 active:scale-95 shadow-lg",
									style: { background: buttonColor },
									children: ctaText
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-b py-4 bg-muted/20",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-7xl mx-auto px-6 flex items-center gap-3 overflow-x-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs font-bold text-muted-foreground shrink-0 uppercase tracking-wider",
								children: "Categories:"
							}), [
								"All Products",
								"New Arrivals",
								"Best Sellers",
								"Sale"
							].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "px-3 py-1 rounded-full text-xs font-medium border shrink-0 bg-white",
								style: {
									color: primaryColor,
									borderColor: primaryColor + "30"
								},
								children: cat
							}, cat))]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						id: "products",
						className: "mx-auto max-w-7xl w-full px-6 py-12 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-2xl font-bold mb-6",
							style: {
								color: primaryColor,
								fontFamily
							},
							children: "Our Products"
						}), productsError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-dashed p-12 text-center",
							style: {
								borderColor: primaryColor + "40",
								color: mutedColor
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Unable to load products right now. Please try again later." })
						}) : productsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
							children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductSkeleton, {}, i))
						}) : !products || products.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed p-12 text-center",
							style: {
								borderColor: primaryColor + "40",
								color: mutedColor
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-5xl mb-3",
									children: "📦"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold text-lg mb-1",
									children: "No products yet"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm",
									children: isOwnerPreview ? "Add your first product from your seller dashboard." : "This store hasn't added any products yet. Check back soon!"
								}),
								isOwnerPreview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/seller/products",
									className: "inline-block mt-4 px-5 py-2.5 rounded-full font-semibold text-white text-sm",
									style: { background: primaryColor },
									children: "+ Add Product"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-4",
							style: { gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" },
							children: products.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: cardClasses[cardStyle] || cardClasses.shadow,
								style: {
									background: cardBg,
									borderColor: primaryColor + "20"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCard, { p })
							}, p.id))
						})]
					}),
					themeSettings?.about_title && themeSettings?.about_text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "py-16 border-t mt-12 bg-black/5",
						style: { background: primaryColor + "05" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "max-w-2xl mx-auto text-center px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-2xl font-bold mb-4",
								style: { fontFamily },
								children: themeSettings.about_title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm leading-relaxed whitespace-pre-line",
								style: { color: mutedColor },
								children: themeSettings.about_text
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t mt-auto",
				style: {
					background: primaryColor + "15",
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
								className: "font-semibold text-sm",
								style: { color: textColor },
								children: storeName
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									href: themeSettings?.social_instagram || "",
									label: "Instagram",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-4 h-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									href: themeSettings?.social_twitter || "",
									label: "Twitter",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-4 h-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									href: themeSettings?.social_facebook || "",
									label: "Facebook",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
										className: "w-4 h-4",
										fill: "currentColor",
										viewBox: "0 0 24 24",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" })
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialIcon, {
									href: themeSettings?.social_tiktok || "",
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
							className: "text-xs",
							style: { color: mutedColor },
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
