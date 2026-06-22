import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as Pen, L as Palette, ct as ExternalLink, lt as Ellipsis, mt as Copy, p as Trash2, x as Smartphone, z as Monitor } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as DialogHeader, i as DialogFooter, n as DialogContent, o as DialogTitle, r as DialogDescription, t as Dialog } from "./dialog-BaN4TOry.mjs";
import { a as DropdownMenuTrigger, n as DropdownMenuContent, r as DropdownMenuItem, t as DropdownMenu } from "./dropdown-menu-C0WpCDvY.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.themes-m4qAMwaz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BUILTIN_THEMES = [
	{
		id: "saloree-minimal",
		name: "Saloree Minimal",
		category: "General",
		description: "Clean white layout with focused typography. Perfect for any niche.",
		primaryColor: "#6366f1",
		bgColor: "#ffffff",
		accentColor: "#f1f5f9",
		fontFamily: "'Inter', sans-serif",
		gradient: "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)",
		tags: [
			"clean",
			"modern",
			"versatile"
		]
	},
	{
		id: "saloree-fashion",
		name: "Saloree Fashion",
		category: "Fashion",
		description: "Bold editorial look with large hero imagery. Made for style brands.",
		primaryColor: "#ec4899",
		bgColor: "#fdf2f8",
		accentColor: "#fce7f3",
		fontFamily: "'Playfair Display', serif",
		gradient: "linear-gradient(135deg,#ec4899 0%,#f43f5e 100%)",
		tags: [
			"elegant",
			"fashion",
			"lifestyle"
		]
	},
	{
		id: "saloree-electronics",
		name: "Saloree Electronics",
		category: "Electronics",
		description: "Dark, techy layout with blue accents. Ideal for gadgets and tech.",
		primaryColor: "#3b82f6",
		bgColor: "#0f172a",
		accentColor: "#1e293b",
		fontFamily: "'Roboto', sans-serif",
		gradient: "linear-gradient(135deg,#3b82f6 0%,#06b6d4 100%)",
		tags: [
			"dark",
			"tech",
			"modern"
		]
	},
	{
		id: "saloree-beauty",
		name: "Saloree Beauty",
		category: "Beauty",
		description: "Soft pink tones with luxurious feel. Great for cosmetics and skincare.",
		primaryColor: "#db2777",
		bgColor: "#fff7ed",
		accentColor: "#fde8d8",
		fontFamily: "'Lora', serif",
		gradient: "linear-gradient(135deg,#db2777 0%,#f97316 100%)",
		tags: [
			"soft",
			"luxury",
			"feminine"
		]
	},
	{
		id: "saloree-luxury",
		name: "Saloree Luxury",
		category: "Luxury",
		description: "Gold and black for premium brands. Exudes sophistication and class.",
		primaryColor: "#ca8a04",
		bgColor: "#0a0a0a",
		accentColor: "#1a1a1a",
		fontFamily: "'Cormorant Garamond', serif",
		gradient: "linear-gradient(135deg,#ca8a04 0%,#d4af37 100%)",
		tags: [
			"gold",
			"premium",
			"dark"
		]
	},
	{
		id: "saloree-home",
		name: "Saloree Home & Kitchen",
		category: "Home",
		description: "Warm earthy palette. Great for furniture, decor and home goods.",
		primaryColor: "#d97706",
		bgColor: "#fefce8",
		accentColor: "#fef3c7",
		fontFamily: "'Merriweather', serif",
		gradient: "linear-gradient(135deg,#d97706 0%,#16a34a 100%)",
		tags: [
			"warm",
			"earthy",
			"cozy"
		]
	},
	{
		id: "saloree-digital",
		name: "Saloree Digital Products",
		category: "Digital",
		description: "Futuristic neon gradient feel for software, courses and downloads.",
		primaryColor: "#7c3aed",
		bgColor: "#0f0a1e",
		accentColor: "#1e1040",
		fontFamily: "'Space Grotesk', sans-serif",
		gradient: "linear-gradient(135deg,#7c3aed 0%,#2563eb 100%)",
		tags: [
			"dark",
			"neon",
			"digital"
		]
	},
	{
		id: "saloree-classic",
		name: "Saloree Classic Marketplace",
		category: "Marketplace",
		description: "Multi-vendor inspired layout with bold cards and category strips.",
		primaryColor: "#0ea5e9",
		bgColor: "#f8fafc",
		accentColor: "#e0f2fe",
		fontFamily: "'Outfit', sans-serif",
		gradient: "linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)",
		tags: [
			"colorful",
			"grid",
			"marketplace"
		]
	}
];
function FakeStorePreview({ primaryColor, bgColor, accentColor, fontFamily, gradient, mobile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-xl border overflow-hidden shadow-md flex flex-col transition-all duration-300 ${mobile ? "w-[130px] h-[210px] shrink-0" : "flex-1 h-[210px]"}`,
		style: {
			background: bgColor,
			color: bgColor === "#0a0a0a" || bgColor === "#0f172a" || bgColor === "#0f0a1e" ? "#ffffff" : "#111827",
			fontFamily
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-2 py-1.5 flex items-center justify-between",
				style: { background: primaryColor },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-10 h-2 bg-white/30 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-2 bg-white/30 rounded" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-4 h-2 bg-white/30 rounded" })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-black/10 py-0.5 text-[6px] text-center opacity-85",
				children: "Free shipping on all orders over $50"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "py-6 px-3 text-center flex flex-col items-center justify-center relative overflow-hidden",
				style: { background: gradient },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[9px] font-bold text-white leading-tight",
						children: "Spring Collection"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[6px] text-white/70 mt-0.5 mb-1.5 max-w-[80px]",
						children: "New arrivals here"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "px-2 py-0.5 rounded-full text-[5px] font-semibold",
						style: {
							background: bgColor,
							color: primaryColor
						},
						children: "Shop Now"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `p-2 grid gap-1.5 flex-1 ${mobile ? "grid-cols-2" : "grid-cols-3"}`,
				children: [...Array(mobile ? 2 : 3)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border rounded p-1 flex flex-col gap-1",
					style: {
						borderColor: primaryColor + "20",
						background: accentColor
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-6 rounded bg-black/5",
							style: { background: primaryColor + "15" }
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-2/3 rounded bg-black/10" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 w-1/3 rounded bg-black/20" })
					]
				}, i))
			})
		]
	});
}
function ThemePreviewModal({ theme, open, onClose, onAdd, adding }) {
	const [viewMode, setViewMode] = (0, import_react.useState)("desktop");
	if (!theme) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (v) => !v && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-4xl w-full p-0 gap-0 overflow-hidden rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, {
				className: "px-6 pt-5 pb-4 border-b flex flex-row items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "text-lg font-bold",
						children: theme.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: theme.description
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 ml-auto mr-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setViewMode("desktop"),
							className: `p-1.5 rounded-md transition cursor-pointer ${viewMode === "desktop" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "w-4 h-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setViewMode("mobile"),
							className: `p-1.5 rounded-md transition cursor-pointer ${viewMode === "mobile" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "w-4 h-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: onClose,
							children: "Close"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "sm",
							disabled: adding,
							onClick: onAdd,
							children: adding ? "Adding…" : "Add to Library (Free)"
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-muted/40 p-6 flex justify-center items-start min-h-[400px]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: `transition-all duration-300 overflow-hidden rounded-xl shadow-2xl border border-border bg-background`,
					style: {
						width: viewMode === "mobile" ? "320px" : "100%",
						maxWidth: viewMode === "mobile" ? "320px" : "640px"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							background: theme.bgColor,
							color: theme.bgColor === "#0a0a0a" || theme.bgColor === "#0f172a" || theme.bgColor === "#0f0a1e" ? "#ffffff" : "#111827",
							fontFamily: theme.fontFamily
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 px-4 py-3",
								style: { background: theme.primaryColor },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-20 h-4 bg-white/30 rounded" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-4 bg-white/30 rounded" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-4 bg-white/30 rounded" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "px-4 py-12 text-center",
								style: { background: theme.gradient },
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-white text-lg font-bold mb-1",
										children: "Welcome to My Store"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-white/70 text-xs mb-4",
										children: "Discover amazing products"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "inline-block px-5 py-2 rounded-full text-xs font-semibold",
										style: {
											background: theme.bgColor,
											color: theme.primaryColor
										},
										children: "Shop Now"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "p-4 grid grid-cols-3 gap-2",
								children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg overflow-hidden border p-2",
									style: {
										borderColor: theme.primaryColor + "30",
										background: theme.accentColor
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-16 rounded bg-black/5",
											style: { background: theme.primaryColor + "15" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-3/4 h-2 rounded mt-2 bg-black/20" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-1/3 h-2 rounded mt-1 bg-black/10" })
									]
								}, i))
							})
						]
					})
				})
			})]
		})
	});
}
function SellerThemes() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const navigate = useNavigate();
	const [previewTheme, setPreviewTheme] = (0, import_react.useState)(null);
	const [renameInst, setRenameInst] = (0, import_react.useState)(null);
	const [renameName, setRenameName] = (0, import_react.useState)("");
	const [duplicatingId, setDuplicatingId] = (0, import_react.useState)(null);
	const [publishingId, setPublishingId] = (0, import_react.useState)(null);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const [addingId, setAddingId] = (0, import_react.useState)(null);
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle()).data
	});
	const { data: installations = [], isLoading: installationsLoading } = useQuery({
		queryKey: ["store-theme-installations", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data, error } = await supabase.from("store_theme_installations").select("*, store_theme_settings(*)").eq("store_id", store.id).order("updated_at", { ascending: false });
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (store?.id && !installationsLoading && installations.length === 0) {
			const autoInstallDefault = async () => {
				try {
					const defaultTheme = BUILTIN_THEMES[0];
					const { data: inst, error: instErr } = await supabase.from("store_theme_installations").insert({
						store_id: store.id,
						theme_id: defaultTheme.id,
						name: `${defaultTheme.name} - Published`,
						is_published: true
					}).select().single();
					if (instErr) throw instErr;
					const { error: settingsErr } = await supabase.from("store_theme_settings").insert({
						theme_installation_id: inst.id,
						primary_color: defaultTheme.primaryColor,
						bg_color: defaultTheme.bgColor,
						accent_color: defaultTheme.accentColor,
						button_color: defaultTheme.primaryColor,
						font_family: defaultTheme.fontFamily,
						hero_title: "Welcome to My Store",
						hero_subtitle: "Discover amazing products curated just for you",
						cta_text: "Shop Now",
						homepage_layout: "standard",
						card_style: "shadow",
						footer_text: `© ${(/* @__PURE__ */ new Date()).getFullYear()} ${store.name || "My Store"}. All rights reserved.`
					});
					if (settingsErr) throw settingsErr;
					qc.invalidateQueries({ queryKey: ["store-theme-installations", store.id] });
					toast.success("Default theme installed and published! 🎨");
				} catch (err) {
					console.error("Failed to auto-install default theme:", err);
				}
			};
			autoInstallDefault();
		}
	}, [
		store?.id,
		installations,
		installationsLoading,
		qc
	]);
	const addThemeMutation = useMutation({
		mutationFn: async (theme) => {
			if (!store?.id) throw new Error("No store found");
			const { data: inst, error: instErr } = await supabase.from("store_theme_installations").insert({
				store_id: store.id,
				theme_id: theme.id,
				name: theme.name,
				is_published: false
			}).select().single();
			if (instErr) throw instErr;
			const { error: settingsErr } = await supabase.from("store_theme_settings").insert({
				theme_installation_id: inst.id,
				primary_color: theme.primaryColor,
				bg_color: theme.bgColor,
				accent_color: theme.accentColor,
				button_color: theme.primaryColor,
				font_family: theme.fontFamily,
				hero_title: "Welcome to My Store",
				hero_subtitle: "Discover amazing products curated just for you",
				cta_text: "Shop Now",
				homepage_layout: "standard",
				card_style: "shadow",
				footer_text: `© ${(/* @__PURE__ */ new Date()).getFullYear()} ${store.name || "My Store"}. All rights reserved.`
			});
			if (settingsErr) throw settingsErr;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-theme-installations", store?.id] });
			toast.success("Theme added to your library! 📦");
			setAddingId(null);
			setPreviewTheme(null);
		},
		onError: (err) => {
			toast.error("Failed to add theme: " + err.message);
			setAddingId(null);
		}
	});
	const publishThemeMutation = useMutation({
		mutationFn: async (id) => {
			if (!store?.id) throw new Error("No store found");
			const { error: resetErr } = await supabase.from("store_theme_installations").update({ is_published: false }).eq("store_id", store.id);
			if (resetErr) throw resetErr;
			const { error: publishErr } = await supabase.from("store_theme_installations").update({ is_published: true }).eq("id", id);
			if (publishErr) throw publishErr;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-theme-installations", store?.id] });
			toast.success("Theme published successfully! 🚀");
			setPublishingId(null);
		},
		onError: (err) => {
			toast.error("Failed to publish: " + err.message);
			setPublishingId(null);
		}
	});
	const duplicateThemeMutation = useMutation({
		mutationFn: async (id) => {
			const srcInst = installations.find((i) => i.id === id);
			if (!srcInst) throw new Error("Source theme not found");
			const srcSettings = srcInst.store_theme_settings?.[0] || {};
			const { data: newInst, error: instErr } = await supabase.from("store_theme_installations").insert({
				store_id: store.id,
				theme_id: srcInst.theme_id,
				name: `${srcInst.name} (Copy)`,
				is_published: false
			}).select().single();
			if (instErr) throw instErr;
			const { error: settingsErr } = await supabase.from("store_theme_settings").insert({
				theme_installation_id: newInst.id,
				primary_color: srcSettings.primary_color,
				bg_color: srcSettings.bg_color,
				accent_color: srcSettings.accent_color,
				button_color: srcSettings.button_color,
				font_family: srcSettings.font_family,
				hero_title: srcSettings.hero_title,
				hero_subtitle: srcSettings.hero_subtitle,
				cta_text: srcSettings.cta_text,
				homepage_layout: srcSettings.homepage_layout,
				card_style: srcSettings.card_style,
				footer_text: srcSettings.footer_text,
				logo_url: srcSettings.logo_url,
				banner_url: srcSettings.banner_url,
				social_instagram: srcSettings.social_instagram,
				social_twitter: srcSettings.social_twitter,
				social_facebook: srcSettings.social_facebook,
				social_tiktok: srcSettings.social_tiktok
			});
			if (settingsErr) throw settingsErr;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-theme-installations", store?.id] });
			toast.success("Theme duplicated successfully! 📋");
			setDuplicatingId(null);
		},
		onError: (err) => {
			toast.error("Failed to duplicate: " + err.message);
			setDuplicatingId(null);
		}
	});
	const renameThemeMutation = useMutation({
		mutationFn: async ({ id, name }) => {
			const { error } = await supabase.from("store_theme_installations").update({
				name,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-theme-installations", store?.id] });
			toast.success("Theme renamed! ✏️");
			setRenameInst(null);
		},
		onError: (err) => {
			toast.error("Failed to rename: " + err.message);
		}
	});
	const deleteThemeMutation = useMutation({
		mutationFn: async (id) => {
			const { error } = await supabase.from("store_theme_installations").delete().eq("id", id);
			if (error) throw error;
		},
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["store-theme-installations", store?.id] });
			toast.success("Theme deleted.");
			setDeletingId(null);
		},
		onError: (err) => {
			toast.error("Failed to delete: " + err.message);
			setDeletingId(null);
		}
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-center py-20 text-muted-foreground",
		children: "Please sign in to manage themes."
	});
	if (!store) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-20",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground mb-4",
			children: "You need a store to manage themes."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => navigate({ to: "/seller/store" }),
			children: "Create Store"
		})]
	});
	const currentTheme = installations.find((i) => i.is_published);
	const draftThemes = installations.filter((i) => !i.is_published);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-10 max-w-6xl mx-auto pb-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold tracking-tight text-foreground",
				children: "Themes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Manage and customize the look and feel of your online store."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "bg-card rounded-xl border p-6 space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-bold text-lg text-foreground",
						children: "Current theme"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground mt-0.5",
						children: "This theme is live on your store."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								className: "h-9 cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `/stores/${store.slug}`,
									target: "_blank",
									rel: "noreferrer",
									className: "flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" }), "View store"]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								onClick: () => navigate({
									to: "/seller/theme-customizer",
									search: { id: currentTheme?.id }
								}),
								className: "h-9 gap-1.5 cursor-pointer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Palette, { className: "w-3.5 h-3.5" }), "Customize"]
							}),
							currentTheme && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "icon",
									className: "h-9 w-9 cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "w-4 h-4" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
								align: "end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => {
										setDuplicatingId(currentTheme.id);
										duplicateThemeMutation.mutate(currentTheme.id);
									},
									disabled: duplicatingId === currentTheme.id,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4 mr-2" }), " Duplicate"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
									onClick: () => {
										setRenameInst(currentTheme);
										setRenameName(currentTheme.name);
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-4 h-4 mr-2" }), " Rename"]
								})]
							})] })
						]
					})]
				}), currentTheme ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col md:flex-row items-center gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-1 w-full flex items-center justify-center gap-4 bg-muted/30 p-4 rounded-xl border border-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FakeStorePreview, {
							primaryColor: currentTheme.store_theme_settings?.[0]?.primary_color || "#6366f1",
							bgColor: currentTheme.store_theme_settings?.[0]?.bg_color || "#ffffff",
							accentColor: currentTheme.store_theme_settings?.[0]?.accent_color || "#f1f5f9",
							fontFamily: currentTheme.store_theme_settings?.[0]?.font_family || "'Inter', sans-serif",
							gradient: BUILTIN_THEMES.find((t) => t.id === currentTheme.theme_id)?.gradient || "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FakeStorePreview, {
							primaryColor: currentTheme.store_theme_settings?.[0]?.primary_color || "#6366f1",
							bgColor: currentTheme.store_theme_settings?.[0]?.bg_color || "#ffffff",
							accentColor: currentTheme.store_theme_settings?.[0]?.accent_color || "#f1f5f9",
							fontFamily: currentTheme.store_theme_settings?.[0]?.font_family || "'Inter', sans-serif",
							gradient: BUILTIN_THEMES.find((t) => t.id === currentTheme.theme_id)?.gradient || "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)",
							mobile: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:w-72 space-y-3 shrink-0 text-center md:text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "font-bold text-xl text-foreground",
							children: currentTheme.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[10px] bg-green-500/10 text-green-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider",
								children: "Published"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-[11px] text-muted-foreground",
								children: ["Updated ", new Date(currentTheme.updated_at).toLocaleDateString()]
							})]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground leading-relaxed",
							children: BUILTIN_THEMES.find((t) => t.id === currentTheme.theme_id)?.description || ""
						})]
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-10 text-center text-muted-foreground",
					children: "No published theme. Add one below."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-lg text-foreground",
					children: "Theme library"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Manage draft themes before publishing them live."
				})] }), draftThemes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-card rounded-xl border p-8 text-center text-muted-foreground text-sm",
					children: "Your library is empty. Discover and add themes below."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
					children: draftThemes.map((draft) => {
						BUILTIN_THEMES.find((t) => t.id === draft.theme_id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card rounded-xl border p-4 flex flex-col justify-between hover:shadow-md transition gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-semibold text-sm leading-tight text-foreground truncate",
										children: draft.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "h-8 w-8 shrink-0 cursor-pointer",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "w-4 h-4" })
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
										align: "end",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => {
													setDuplicatingId(draft.id);
													duplicateThemeMutation.mutate(draft.id);
												},
												disabled: duplicatingId === draft.id,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-4 h-4 mr-2" }), " Duplicate"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => {
													setRenameInst(draft);
													setRenameName(draft.name);
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pen, { className: "w-4 h-4 mr-2" }), " Rename"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuItem, {
												onClick: () => {
													if (confirm("Are you sure you want to delete this theme draft?")) {
														setDeletingId(draft.id);
														deleteThemeMutation.mutate(draft.id);
													}
												},
												disabled: deletingId === draft.id,
												className: "text-destructive hover:bg-destructive/10",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "w-4 h-4 mr-2" }), " Delete"]
											})
										]
									})] })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground",
									children: ["Added ", new Date(draft.created_at).toLocaleDateString()]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									className: "flex-1 text-xs h-8 cursor-pointer",
									onClick: () => navigate({
										to: "/seller/theme-customizer",
										search: { id: draft.id }
									}),
									children: "Customize"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									className: "flex-1 text-xs h-8 cursor-pointer",
									disabled: publishingId === draft.id,
									onClick: () => {
										setPublishingId(draft.id);
										publishThemeMutation.mutate(draft.id);
									},
									children: publishingId === draft.id ? "Publishing…" : "Publish"
								})]
							})]
						}, draft.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "space-y-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-bold text-lg text-foreground",
					children: "Discover themes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground mt-0.5",
					children: "Explore free templates from the Saloree Theme Store."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
					children: BUILTIN_THEMES.map((theme) => {
						installations.some((i) => i.theme_id === theme.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "bg-card rounded-xl border overflow-hidden hover:shadow-lg transition flex flex-col justify-between group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative h-32",
								style: { background: theme.gradient },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2 left-2 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-black/35 text-white",
									children: theme.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-primary",
									children: "Free"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "p-4 flex-1 flex flex-col justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
										className: "font-bold text-sm text-foreground",
										children: theme.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground leading-normal line-clamp-2",
										children: theme.description
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										className: "flex-1 text-xs h-8 cursor-pointer",
										onClick: () => setPreviewTheme(theme),
										children: "Preview"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										className: "flex-1 text-xs h-8 cursor-pointer",
										disabled: addingId === theme.id,
										onClick: () => {
											setAddingId(theme.id);
											addThemeMutation.mutate(theme);
										},
										children: addingId === theme.id ? "Adding…" : "Add"
									})]
								})]
							})]
						}, theme.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: !!renameInst,
				onOpenChange: (v) => !v && setRenameInst(null),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "sm:max-w-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Rename theme" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Enter a new name for your theme installation." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "py-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: renameName,
								onChange: (e) => setRenameName(e.target.value),
								placeholder: "My customized theme"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: () => setRenameInst(null),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => renameInst && renameThemeMutation.mutate({
								id: renameInst.id,
								name: renameName
							}),
							disabled: !renameName.trim(),
							children: "Save"
						})] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemePreviewModal, {
				theme: previewTheme,
				open: !!previewTheme,
				onClose: () => setPreviewTheme(null),
				adding: previewTheme ? addingId === previewTheme.id : false,
				onAdd: () => previewTheme && (setAddingId(previewTheme.id), addThemeMutation.mutate(previewTheme))
			})
		]
	});
}
//#endregion
export { SellerThemes as component };
