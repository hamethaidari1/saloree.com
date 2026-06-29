import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Save, Ft as ChevronLeft, G as Megaphone, O as Share2, S as SlidersVertical, V as Monitor, W as Menu, _t as Eye, at as Info, dt as Grid3x3, nt as Layers, ot as Image, x as Smartphone, y as Sparkles } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as Route } from "./seller.theme-customizer-B5ADyolk.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
import { t as Label } from "./label-CgGkF99L.mjs";
import { t as Switch } from "./switch-CJrKX_u5.mjs";
import { t as Textarea } from "./textarea-C10Q6cLJ.mjs";
import { t as storage } from "./storage-YXTy7VHU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.theme-customizer-Xa-difO9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FONT_OPTIONS = [
	{
		label: "Inter (Modern)",
		value: "'Inter', sans-serif"
	},
	{
		label: "Roboto (Clean)",
		value: "'Roboto', sans-serif"
	},
	{
		label: "Outfit (Friendly)",
		value: "'Outfit', sans-serif"
	},
	{
		label: "Playfair Display (Editorial)",
		value: "'Playfair Display', serif"
	},
	{
		label: "Lora (Elegant)",
		value: "'Lora', serif"
	},
	{
		label: "Merriweather (Warm)",
		value: "'Merriweather', serif"
	},
	{
		label: "Space Grotesk (Tech)",
		value: "'Space Grotesk', sans-serif"
	},
	{
		label: "Cormorant Garamond (Luxury)",
		value: "'Cormorant Garamond', serif"
	}
];
var LAYOUT_OPTIONS = [
	{
		label: "Standard (Hero + Grid)",
		value: "standard"
	},
	{
		label: "Full Width Hero",
		value: "fullwidth"
	},
	{
		label: "Sidebar Filter",
		value: "sidebar"
	},
	{
		label: "Magazine Style",
		value: "magazine"
	}
];
var CARD_STYLE_OPTIONS = [
	{
		label: "Minimal Card",
		value: "minimal"
	},
	{
		label: "Shadow Card",
		value: "shadow"
	},
	{
		label: "Bordered Card",
		value: "bordered"
	},
	{
		label: "Image-First Card",
		value: "image-first"
	}
];
var DEFAULT_SETTINGS = {
	announcement_text: "Free shipping on all orders over $50!",
	announcement_bg: "#111827",
	announcement_text_color: "#ffffff",
	show_announcement: true,
	logo_url: "",
	banner_url: "",
	primary_color: "#6366f1",
	bg_color: "#ffffff",
	accent_color: "#f1f5f9",
	button_color: "#6366f1",
	font_family: "'Inter', sans-serif",
	homepage_layout: "standard",
	card_style: "shadow",
	hero_title: "Welcome to My Store",
	hero_subtitle: "Discover amazing products curated just for you",
	cta_text: "Shop Now",
	about_title: "About Our Store",
	about_text: "We are dedicated to providing the best products and service to our customers.",
	social_instagram: "",
	social_twitter: "",
	social_facebook: "",
	social_tiktok: "",
	footer_text: ""
};
function ColorInput({ label, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				type: "color",
				value: value || "#ffffff",
				onChange: (e) => onChange(e.target.value),
				className: "w-7 h-7 rounded border cursor-pointer p-0"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				type: "text",
				value: value || "",
				onChange: (e) => onChange(e.target.value),
				className: "h-8 text-xs font-mono"
			})]
		})]
	});
}
function CenterPreview({ settings, viewMode, storeName }) {
	const isDark = settings.bg_color === "#0a0a0a" || settings.bg_color === "#0f172a" || settings.bg_color === "#0f0a1e";
	const textColor = isDark ? "#ffffff" : "#111827";
	const mutedTextColor = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(17, 24, 39, 0.6)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `transition-all duration-300 overflow-hidden rounded-xl border shadow-xl flex flex-col bg-background ${viewMode === "mobile" ? "w-[340px]" : "w-full max-w-3xl"}`,
		style: {
			background: settings.bg_color,
			color: textColor,
			fontFamily: settings.font_family,
			minHeight: "500px"
		},
		children: [
			settings.show_announcement && settings.announcement_text && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-2 text-center text-xs font-medium transition",
				style: {
					background: settings.announcement_bg,
					color: settings.announcement_text_color
				},
				children: settings.announcement_text
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-4 py-3 border-b",
				style: {
					background: settings.primary_color,
					color: "#ffffff"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [settings.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: settings.logo_url,
						className: "h-6 w-6 object-cover rounded",
						alt: "logo"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-5 h-5 rounded bg-white/20 flex items-center justify-center font-bold text-xs",
						children: "S"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-sm",
						children: "Storefront"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-3 text-[10px] font-medium text-white/90",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Home" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Catalog" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "About" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative overflow-hidden py-16 px-6 text-center flex flex-col items-center justify-center border-b",
				style: { background: settings.banner_url ? `url(${settings.banner_url}) center/cover no-repeat` : `linear-gradient(135deg, ${settings.primary_color}, ${settings.accent_color})` },
				children: [settings.banner_url && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black/50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 max-w-md space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl sm:text-2xl font-bold text-white leading-tight",
							children: settings.hero_title || "Welcome to My Store"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-white/80 text-xs leading-relaxed",
							children: settings.hero_subtitle || "Discover amazing products curated just for you"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "px-5 py-2 rounded-full text-xs font-semibold text-white shadow transition active:scale-95 cursor-pointer",
							style: { background: settings.button_color },
							children: settings.cta_text || "Shop Now"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-4 py-4 border-b bg-black/5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase font-bold tracking-wider mb-2",
					style: { color: settings.primary_color },
					children: "Featured Categories"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2 overflow-x-auto pb-1",
					children: [
						"Electronics",
						"Fashion",
						"Beauty",
						"Home"
					].map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "px-3 py-1 rounded-full text-[10px] font-semibold border shrink-0 bg-white",
						style: {
							color: settings.primary_color,
							borderColor: settings.primary_color + "30"
						},
						children: cat
					}, cat))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-bold",
					style: { color: settings.primary_color },
					children: "Featured Products"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3",
					style: { gridTemplateColumns: viewMode === "mobile" ? "1fr 1fr" : "repeat(3, 1fr)" },
					children: [...Array(viewMode === "mobile" ? 4 : 6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `overflow-hidden border p-2 flex flex-col justify-between ${settings.card_style === "bordered" ? "border-2 rounded-xl" : settings.card_style === "shadow" ? "rounded-xl shadow-sm border" : settings.card_style === "image-first" ? "rounded-2xl" : "rounded"}`,
						style: {
							background: settings.accent_color,
							borderColor: settings.primary_color + "20"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-20 rounded bg-black/5 flex items-center justify-center text-[10px] text-muted-foreground",
							style: { background: settings.primary_color + "10" },
							children: "Product Image"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-2.5 rounded w-3/4 bg-black/15",
								style: { background: settings.primary_color + "30" }
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between items-center mt-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] font-bold",
									children: "$49.99"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white",
									style: { background: settings.button_color },
									children: "+"
								})]
							})]
						})]
					}, i))
				})]
			}),
			settings.about_title && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-6 border-t bg-black/5 text-center space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-sm",
					children: settings.about_title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] max-w-md mx-auto leading-relaxed",
					style: { color: mutedTextColor },
					children: settings.about_text
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto px-4 py-6 border-t flex flex-col items-center justify-center gap-3 text-center",
				style: { background: settings.primary_color + "10" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-2",
					children: [
						"instagram",
						"twitter",
						"facebook",
						"tiktok"
					].map((social) => {
						const hasLink = settings[`social_${social}`];
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "w-6 h-6 rounded-full flex items-center justify-center text-[9px] text-white bg-white/20",
							style: {
								background: hasLink ? settings.primary_color : "rgba(0,0,0,0.1)",
								opacity: hasLink ? 1 : .4
							},
							children: social.charAt(0).toUpperCase()
						}, social);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[10px]",
					style: { color: mutedTextColor },
					children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" ",
						storeName || "Store",
						", Powered by Saloree"
					]
				})]
			})
		]
	});
}
function ThemeCustomizer() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const { id } = Route.useSearch();
	const [activeSection, setActiveSection] = (0, import_react.useState)("announcement");
	const [viewMode, setViewMode] = (0, import_react.useState)("desktop");
	const [settings, setSettings] = (0, import_react.useState)(DEFAULT_SETTINGS);
	const [logoUrl, setLogoUrl] = (0, import_react.useState)("");
	const [bannerUrl, setBannerUrl] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploadingLogo, setUploadingLogo] = (0, import_react.useState)(false);
	const [uploadingBanner, setUploadingBanner] = (0, import_react.useState)(false);
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle()).data
	});
	const { data: installData, isLoading: installLoading } = useQuery({
		queryKey: [
			"customizer-installation",
			id,
			store?.id
		],
		enabled: !!store?.id,
		queryFn: async () => {
			if (id) {
				const { data, error } = await supabase.from("store_theme_installations").select("*, store_theme_settings(*)").eq("id", id).maybeSingle();
				if (error) throw error;
				return data;
			}
			const { data, error } = await supabase.from("store_theme_installations").select("*, store_theme_settings(*)").eq("store_id", store.id).eq("is_published", true).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (installData?.store_theme_settings?.[0]) {
			const dbSettings = installData.store_theme_settings[0];
			const jsonSettings = dbSettings.settings || {};
			setSettings((prev) => ({
				...prev,
				announcement_text: jsonSettings.announcement_text ?? dbSettings.announcement_text ?? prev.announcement_text,
				announcement_bg: jsonSettings.announcement_bg ?? dbSettings.announcement_bg ?? prev.announcement_bg,
				announcement_text_color: jsonSettings.announcement_text_color ?? dbSettings.announcement_text_color ?? prev.announcement_text_color,
				show_announcement: jsonSettings.show_announcement ?? dbSettings.show_announcement ?? prev.show_announcement,
				primary_color: dbSettings.primary_color ?? prev.primary_color,
				bg_color: dbSettings.bg_color ?? prev.bg_color,
				accent_color: jsonSettings.accent_color ?? dbSettings.accent_color ?? prev.accent_color,
				button_color: jsonSettings.button_color ?? dbSettings.button_color ?? prev.button_color,
				font_family: jsonSettings.font_family ?? dbSettings.font_family ?? prev.font_family,
				homepage_layout: jsonSettings.homepage_layout ?? dbSettings.homepage_layout ?? prev.homepage_layout,
				card_style: jsonSettings.card_style ?? dbSettings.card_style ?? prev.card_style,
				hero_title: jsonSettings.hero_title ?? dbSettings.hero_title ?? prev.hero_title,
				hero_subtitle: jsonSettings.hero_subtitle ?? dbSettings.hero_subtitle ?? prev.hero_subtitle,
				cta_text: jsonSettings.cta_text ?? dbSettings.cta_text ?? prev.cta_text,
				about_title: jsonSettings.about_title ?? dbSettings.about_title ?? prev.about_title,
				about_text: jsonSettings.about_text ?? dbSettings.about_text ?? prev.about_text,
				social_instagram: jsonSettings.social_instagram ?? dbSettings.social_instagram ?? prev.social_instagram,
				social_twitter: jsonSettings.social_twitter ?? dbSettings.social_twitter ?? prev.social_twitter,
				social_facebook: jsonSettings.social_facebook ?? dbSettings.social_facebook ?? prev.social_facebook,
				social_tiktok: jsonSettings.social_tiktok ?? dbSettings.social_tiktok ?? prev.social_tiktok,
				footer_text: jsonSettings.footer_text ?? dbSettings.footer_text ?? prev.footer_text
			}));
			setLogoUrl(dbSettings.logo_url || "");
			setBannerUrl(dbSettings.banner_url || "");
		}
	}, [installData]);
	const saveMutation = useMutation({
		mutationFn: async () => {
			const installationId = id || installData?.id;
			if (!installationId) throw new Error("No theme installation selected.");
			const { footer_text: _ignored, logo_url: _logo, banner_url: _banner, primary_color: _primary, bg_color: _bg, ...optionalSettings } = settings;
			const payload = {
				theme_installation_id: installationId,
				logo_url: logoUrl,
				banner_url: bannerUrl,
				primary_color: settings.primary_color,
				bg_color: settings.bg_color,
				settings: {
					...optionalSettings,
					footer_text: `\u00a9 ${(/* @__PURE__ */ new Date()).getFullYear()} ${store?.name || "Store"}, Powered by Saloree`
				},
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			};
			const { error } = await supabase.from("store_theme_settings").upsert({
				...payload,
				created_at: installData?.store_theme_settings?.[0]?.created_at || (/* @__PURE__ */ new Date()).toISOString()
			}, { onConflict: "theme_installation_id" });
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["customizer-installation"] });
			qc.invalidateQueries({ queryKey: ["store-theme-installations"] });
			toast.success("Theme settings saved successfully! 🎨");
		},
		onError: (err) => {
			console.error("[RLS Failure Log] Table: store_theme_settings, Policy: Owner updates/inserts store_theme_settings, Error Details:", {
				message: err?.message,
				details: err?.details,
				hint: err?.hint,
				code: err?.code,
				fullError: err
			});
			toast.error("Failed to save: " + err.message);
		}
	});
	const handleUpload = async (e, type) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (type === "logo") setUploadingLogo(true);
		else setUploadingBanner(true);
		try {
			const bucket = type === "logo" ? "store-logos" : "store-banners";
			const folder = type === "logo" ? "logos" : "banners";
			console.log(`[Storage Upload] Verifying parameters:`, {
				bucket,
				folder,
				userId: user?.id,
				userLoggedIn: !!user,
				fileName: file.name,
				fileSize: file.size,
				fileType: file.type
			});
			const url = await storage.upload(file, {
				userId: user.id,
				folder,
				bucket
			});
			if (type === "logo") setLogoUrl(url);
			else setBannerUrl(url);
			toast.success("Image uploaded!");
		} catch (err) {
			console.error("Supabase Storage Upload Error Details:", {
				message: err?.message || "No error message",
				details: err?.details || "No details",
				hint: err?.hint || "No hint",
				statusCode: err?.status || err?.statusCode || err?.status_code || "No status code",
				fullError: err
			});
			toast.error(err?.message || "Upload failed.");
		} finally {
			if (type === "logo") setUploadingLogo(false);
			else setUploadingBanner(false);
		}
	};
	const setVal = (key) => (v) => setSettings((s) => ({
		...s,
		[key]: v
	}));
	if (!user || !store) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 text-muted-foreground",
		children: "Please sign in first."
	});
	if (installLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 text-muted-foreground",
		children: "Loading theme customizer…"
	});
	const sectionsList = [
		{
			id: "announcement",
			label: "Announcement bar",
			icon: Megaphone
		},
		{
			id: "header",
			label: "Header",
			icon: Menu
		},
		{
			id: "hero",
			label: "Hero banner",
			icon: Image
		},
		{
			id: "featured_products",
			label: "Featured products",
			icon: Sparkles
		},
		{
			id: "categories",
			label: "Categories",
			icon: Layers
		},
		{
			id: "product_grid",
			label: "Product grid",
			icon: Grid3x3
		},
		{
			id: "about",
			label: "About store",
			icon: Info
		},
		{
			id: "social",
			label: "Social links",
			icon: Share2
		},
		{
			id: "general",
			label: "Colors & Fonts",
			icon: SlidersVertical
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col h-[calc(100vh-6rem)] bg-card border rounded-xl overflow-hidden shadow",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-4 py-3 border-b flex items-center justify-between bg-muted/20 shrink-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "ghost",
							size: "sm",
							onClick: () => navigate({ to: "/seller/themes" }),
							className: "h-8 gap-1.5 cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "w-4 h-4" }), " Back"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-4 w-px bg-border" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-bold text-sm text-foreground leading-none",
							children: installData?.name || "Theme Customizer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-[10px] text-muted-foreground",
							children: ["Editing: ", installData?.is_published ? "Live theme" : "Draft theme"]
						})] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 bg-muted p-0.5 rounded-lg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setViewMode("desktop"),
						className: `p-1.5 rounded transition cursor-pointer ${viewMode === "desktop" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "w-4 h-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => setViewMode("mobile"),
						className: `p-1.5 rounded transition cursor-pointer ${viewMode === "mobile" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-4 h-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						size: "sm",
						asChild: true,
						className: "h-8 text-xs cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `/stores/${store.slug}`,
							target: "_blank",
							rel: "noreferrer",
							className: "flex items-center gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), " Preview Store"]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => saveMutation.mutate(),
						disabled: saveMutation.isPending,
						className: "h-8 text-xs gap-1.5 cursor-pointer",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-3.5 h-3.5" }), saveMutation.isPending ? "Saving…" : "Save"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] divide-x border-t",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-y-auto p-4 space-y-4 bg-muted/10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "font-bold text-xs uppercase text-muted-foreground tracking-wider mb-2",
						children: "Sections"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-col gap-1 text-sm",
						children: sectionsList.map((sec) => {
							const Icon = sec.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: () => setActiveSection(sec.id),
								className: `w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2 font-medium transition cursor-pointer ${activeSection === sec.id ? "bg-primary-soft text-primary font-semibold" : "text-foreground hover:bg-muted"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "w-4 h-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: sec.label
								})]
							}, sec.id);
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-y-auto p-6 bg-muted/40 flex justify-center items-start min-h-[400px]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CenterPreview, {
						settings,
						viewMode,
						storeName: store?.name || "Store"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "overflow-y-auto p-5 bg-card space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-b pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
								className: "font-bold text-sm text-foreground",
								children: [sectionsList.find((s) => s.id === activeSection)?.label, " Settings"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-muted-foreground mt-0.5",
								children: "Customize properties below"
							})]
						}),
						activeSection === "announcement" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "show_ann",
										className: "text-xs",
										children: "Show announcement bar"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										id: "show_ann",
										checked: settings.show_announcement,
										onCheckedChange: setVal("show_announcement")
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Announcement text"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.announcement_text,
										onChange: (e) => setVal("announcement_text")(e.target.value),
										placeholder: "Free shipping!"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorInput, {
									label: "Background Color",
									value: settings.announcement_bg,
									onChange: setVal("announcement_bg")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorInput, {
									label: "Text Color",
									value: settings.announcement_text_color,
									onChange: setVal("announcement_text_color")
								})
							]
						}),
						activeSection === "header" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Store Logo"
									}),
									logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: logoUrl,
										className: "h-16 w-16 object-cover rounded border",
										alt: "preview"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "file",
										accept: "image/*",
										disabled: uploadingLogo,
										onChange: (e) => handleUpload(e, "logo"),
										className: "text-xs cursor-pointer"
									})
								]
							})
						}),
						activeSection === "hero" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-xs",
											children: "Hero Banner Image"
										}),
										bannerUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: bannerUrl,
											className: "h-16 w-32 object-cover rounded border",
											alt: "preview"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											type: "file",
											accept: "image/*",
											disabled: uploadingBanner,
											onChange: (e) => handleUpload(e, "banner"),
											className: "text-xs cursor-pointer"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Hero Title"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.hero_title,
										onChange: (e) => setVal("hero_title")(e.target.value)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Hero Subtitle"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										value: settings.hero_subtitle,
										onChange: (e) => setVal("hero_subtitle")(e.target.value),
										rows: 3
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "CTA Button Text"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: settings.cta_text,
										onChange: (e) => setVal("cta_text")(e.target.value)
									})]
								})
							]
						}),
						activeSection === "featured_products" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Product Card Style"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: settings.card_style,
									onChange: (e) => setVal("card_style")(e.target.value),
									className: "w-full rounded-md border border-input h-9 px-3 text-sm bg-background",
									children: CARD_STYLE_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: o.value,
										children: o.label
									}, o.value))
								})]
							})
						}),
						activeSection === "categories" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs text-muted-foreground p-3 bg-muted/40 rounded",
							children: "Categories strip displays active collections/categories on your store automatically based on your products."
						}),
						activeSection === "product_grid" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "Homepage Layout"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: settings.homepage_layout,
									onChange: (e) => setVal("homepage_layout")(e.target.value),
									className: "w-full rounded-md border border-input h-9 px-3 text-sm bg-background",
									children: LAYOUT_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: o.value,
										children: o.label
									}, o.value))
								})]
							})
						}),
						activeSection === "about" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "About Title"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: settings.about_title,
									onChange: (e) => setVal("about_title")(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs",
									children: "About Text"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									value: settings.about_text,
									onChange: (e) => setVal("about_text")(e.target.value),
									rows: 5
								})]
							})]
						}),
						activeSection === "social" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: [
								"instagram",
								"twitter",
								"facebook",
								"tiktok"
							].map((social) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									className: "text-xs uppercase font-medium",
									children: social
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: settings[`social_${social}`] || "",
									onChange: (e) => setVal(`social_${social}`)(e.target.value),
									placeholder: `https://${social}.com/...`
								})]
							}, social))
						}),
						activeSection === "general" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorInput, {
									label: "Primary Brand Color",
									value: settings.primary_color,
									onChange: setVal("primary_color")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorInput, {
									label: "Background Color",
									value: settings.bg_color,
									onChange: setVal("bg_color")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorInput, {
									label: "Accent / Card Background",
									value: settings.accent_color,
									onChange: setVal("accent_color")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ColorInput, {
									label: "Button Color",
									value: settings.button_color,
									onChange: setVal("button_color")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1.5 mt-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-xs",
										children: "Font Family"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: settings.font_family,
										onChange: (e) => setVal("font_family")(e.target.value),
										className: "w-full rounded-md border border-input h-9 px-3 text-sm bg-background",
										children: FONT_OPTIONS.map((o) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: o.value,
											children: o.label
										}, o.value))
									})]
								})
							]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { ThemeCustomizer as component };
