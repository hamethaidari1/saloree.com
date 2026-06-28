import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Save, Et as Clock, ft as Globe, g as Store, gt as Eye, kt as CircleCheck, s as Upload, vt as ExternalLink, wt as Copy } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
import { t as Label } from "./label-CgGkF99L.mjs";
import { t as Switch } from "./switch-CJrKX_u5.mjs";
import { t as storage } from "./storage-YXTy7VHU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.store-COftw49o.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var slugify = (name) => name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
var CATEGORIES = [
	"Fashion & Apparel",
	"Electronics & Gadgets",
	"Beauty & Skincare",
	"Home & Kitchen",
	"Sports & Outdoors",
	"Books & Stationery",
	"Toys & Games",
	"Automotive",
	"Food & Beverages",
	"Digital Products",
	"Jewelry & Accessories",
	"Art & Crafts",
	"Health & Wellness",
	"Other"
];
function ImageUploadBox({ label, hint, url, uploading, onChange, aspect = "square" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				className: "text-sm font-semibold",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `relative group border-2 border-dashed border-border rounded-xl overflow-hidden bg-muted/30 hover:border-primary/50 transition-colors ${aspect === "wide" ? "h-28 w-full" : "h-28 w-28"}`,
				children: [
					url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: url,
						alt: label,
						className: "w-full h-full object-cover"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center justify-center h-full gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "w-5 h-5 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground text-center px-2",
							children: uploading ? "Uploading…" : "Click to upload"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "absolute inset-0 cursor-pointer",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/jpeg,image/png,image/webp",
							disabled: uploading,
							onChange,
							className: "sr-only"
						})
					}),
					uploading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 bg-background/70 flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] text-muted-foreground",
				children: hint
			})
		]
	});
}
function StatusBadge({ status }) {
	const isPublished = status === "published";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${isPublished ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-amber-500/10 text-amber-600 dark:text-amber-400"}`,
		children: [isPublished ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "w-3.5 h-3.5" }), isPublished ? "Published" : "Draft"]
	});
}
function CreateStoreForm({ userId, onCreated }) {
	const { language } = useLocale();
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		slug: "",
		description: "",
		category: "",
		location: "",
		logo_url: "",
		banner_url: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)({
		logo: false,
		banner: false
	});
	const handleNameChange = (e) => {
		const val = e.target.value;
		setForm((f) => ({
			...f,
			name: val,
			slug: slugify(val)
		}));
	};
	const handleFileChange = async (e, field) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (![
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp"
		].includes(file.type)) {
			toast.error("Please upload a JPG, PNG, or WEBP image.");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			toast.error("File must be under 5 MB.");
			return;
		}
		const key = field === "logo_url" ? "logo" : "banner";
		setUploading((u) => ({
			...u,
			[key]: true
		}));
		try {
			const bucket = field === "logo_url" ? "store-logos" : "store-banners";
			const folder = field === "logo_url" ? "logos" : "banners";
			const url = await storage.upload(file, {
				userId,
				folder,
				bucket
			});
			setForm((f) => ({
				...f,
				[field]: url
			}));
			toast.success("Image uploaded!");
		} catch {
			toast.error("Upload failed. Please try again.");
		} finally {
			setUploading((u) => ({
				...u,
				[key]: false
			}));
		}
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!form.name.trim()) {
			toast.error("Store name is required.");
			return;
		}
		const finalSlug = form.slug.trim() || slugify(form.name);
		if (!finalSlug) {
			toast.error("A valid slug is required.");
			return;
		}
		setSaving(true);
		try {
			const { data: existing } = await supabase.from("stores").select("id").eq("slug", finalSlug).maybeSingle();
			if (existing) {
				toast.error("This slug is already taken. Please choose another.");
				return;
			}
			const { error } = await supabase.from("stores").insert({
				owner_id: userId,
				name: form.name.trim(),
				slug: finalSlug,
				description: form.description.trim() || null,
				category: form.category || null,
				location: form.location.trim() || null,
				logo_url: form.logo_url || null,
				banner_url: form.banner_url || null,
				status: "draft"
			});
			if (error) throw error;
			toast.success("Store created! 🎉");
			onCreated();
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to create store.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-2xl mx-auto px-4 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "w-7 h-7 text-primary" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl font-bold tracking-tight",
					children: t("seller_store_settings", language)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Set up your Saloree storefront. You can always edit these details later."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "bg-card border rounded-2xl shadow-sm p-6 space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "store-name",
							children: [
								t("store_name_label", language),
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-destructive",
									children: "*"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "store-name",
							required: true,
							value: form.name,
							onChange: handleNameChange,
							placeholder: "e.g. My Fashion Store"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "store-slug",
							children: ["URL Slug ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-destructive",
								children: "*"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground",
								children: "/stores/"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "store-slug",
								required: true,
								value: form.slug,
								onChange: (e) => setForm({
									...form,
									slug: slugify(e.target.value)
								}),
								className: "pl-[60px]",
								placeholder: "my-fashion-store"
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "store-desc",
						children: t("store_description_label", language)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "store-desc",
						rows: 3,
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						placeholder: "Tell buyers what makes your store special…",
						className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "store-cat",
							children: "Category"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "store-cat",
							value: form.category,
							onChange: (e) => setForm({
								...form,
								category: e.target.value
							}),
							className: "w-full rounded-md border border-input bg-background h-10 px-3 text-sm outline-none focus:ring-2 focus:ring-ring",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "",
								children: "Select a category…"
							}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: c,
								children: c
							}, c))]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "store-loc",
							children: "Location (optional)"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "store-loc",
							value: form.location,
							onChange: (e) => setForm({
								...form,
								location: e.target.value
							}),
							placeholder: "e.g. Dubai, UAE"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-t pt-5 grid gap-6 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadBox, {
						label: "Store Logo",
						hint: "Square image, JPG/PNG/WEBP, max 5 MB",
						url: form.logo_url,
						uploading: uploading.logo,
						onChange: (e) => handleFileChange(e, "logo_url"),
						aspect: "square"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadBox, {
						label: "Banner Image",
						hint: "Wide image (1200×400+), JPG/PNG/WEBP, max 5 MB",
						url: form.banner_url,
						uploading: uploading.banner,
						onChange: (e) => handleFileChange(e, "banner_url"),
						aspect: "wide"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t pt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: saving || uploading.logo || uploading.banner,
						className: "w-full h-11 text-base font-semibold gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), saving ? "Creating store…" : "Create My Store"]
					})
				})
			]
		})]
	});
}
function EditStoreForm({ store, userId }) {
	const qc = useQueryClient();
	const [form, setForm] = (0, import_react.useState)({
		name: store.name || "",
		slug: store.slug || "",
		description: store.description || "",
		category: store.category || "",
		location: store.location || "",
		logo_url: store.logo_url || "",
		banner_url: store.banner_url || "",
		status: store.status || "draft"
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [uploading, setUploading] = (0, import_react.useState)({
		logo: false,
		banner: false
	});
	const [copied, setCopied] = (0, import_react.useState)(false);
	const publicUrl = typeof window !== "undefined" ? `${window.location.origin}/stores/${form.slug}` : `/stores/${form.slug}`;
	const handleFileChange = async (e, field) => {
		const file = e.target.files?.[0];
		if (!file) return;
		if (![
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp"
		].includes(file.type)) {
			toast.error("Please upload a JPG, PNG, or WEBP image.");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			toast.error("File must be under 5 MB.");
			return;
		}
		const key = field === "logo_url" ? "logo" : "banner";
		setUploading((u) => ({
			...u,
			[key]: true
		}));
		try {
			const bucket = field === "logo_url" ? "store-logos" : "store-banners";
			const folder = field === "logo_url" ? "logos" : "banners";
			const url = await storage.upload(file, {
				userId,
				folder,
				bucket
			});
			setForm((f) => ({
				...f,
				[field]: url
			}));
			toast.success("Image uploaded!");
		} catch {
			toast.error("Upload failed. Please try again.");
		} finally {
			setUploading((u) => ({
				...u,
				[key]: false
			}));
		}
	};
	const handleSave = async (e) => {
		e.preventDefault();
		if (!form.name.trim()) {
			toast.error("Store name is required.");
			return;
		}
		const finalSlug = form.slug.trim() || slugify(form.name);
		setSaving(true);
		try {
			if (finalSlug !== store.slug) {
				const { data: existing } = await supabase.from("stores").select("id").eq("slug", finalSlug).neq("id", store.id).maybeSingle();
				if (existing) {
					toast.error("This slug is already taken. Please choose another.");
					setSaving(false);
					return;
				}
			}
			const { error } = await supabase.from("stores").update({
				name: form.name.trim(),
				slug: finalSlug,
				description: form.description.trim() || null,
				category: form.category || null,
				location: form.location.trim() || null,
				logo_url: form.logo_url || null,
				banner_url: form.banner_url || null,
				status: form.status,
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			}).eq("id", store.id);
			if (error) throw error;
			qc.invalidateQueries({ queryKey: ["my-store"] });
			toast.success("Store settings saved! ✅");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to save settings.");
		} finally {
			setSaving(false);
		}
	};
	const handleCopyLink = async () => {
		await navigator.clipboard.writeText(publicUrl);
		setCopied(true);
		setTimeout(() => setCopied(false), 2e3);
		toast.success("Store link copied!");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "max-w-3xl mx-auto pb-16",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-bold tracking-tight",
				children: "Store Settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground mt-1",
				children: "Manage your storefront appearance and publishing status."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: form.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					size: "sm",
					asChild: true,
					className: "gap-1.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/stores/$slug",
						params: { slug: store.slug },
						target: "_blank",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "w-3.5 h-3.5" }), "Preview"]
					})
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSave,
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border rounded-xl p-5 space-y-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "w-4 h-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Your store URL"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground font-mono truncate",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate",
									children: publicUrl
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: handleCopyLink,
								className: "gap-1.5 shrink-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "w-3.5 h-3.5" }), copied ? "Copied!" : "Copy"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								className: "gap-1.5 shrink-0",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: publicUrl,
									target: "_blank",
									rel: "noreferrer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "w-3.5 h-3.5" })
								})
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border rounded-xl p-5 space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm",
							children: "Store visibility"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground mt-0.5",
							children: form.status === "published" ? "Your store is live and visible to the public." : "Your store is in draft mode. Only you can preview it."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							id: "store-status",
							checked: form.status === "published",
							onCheckedChange: (checked) => setForm({
								...form,
								status: checked ? "published" : "draft"
							})
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[11px] text-muted-foreground bg-muted/50 rounded-lg p-3",
						children: [
							"💡 When published, only products with ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Active" }),
							" status will appear in your store."
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border rounded-xl p-5 space-y-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold text-sm border-b pb-3",
							children: "Store details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
									htmlFor: "edit-name",
									children: ["Store Name ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-destructive",
										children: "*"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-name",
									required: true,
									value: form.name,
									onChange: (e) => {
										const val = e.target.value;
										setForm((f) => ({
											...f,
											name: val,
											slug: f.slug === slugify(f.name) ? slugify(val) : f.slug
										}));
									},
									placeholder: "My Fashion Store"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-slug",
									children: "URL Slug"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none",
										children: "/stores/"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "edit-slug",
										value: form.slug,
										onChange: (e) => setForm({
											...form,
											slug: slugify(e.target.value)
										}),
										className: "pl-[60px]",
										placeholder: "my-fashion-store"
									})]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "edit-desc",
								children: "Description"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								id: "edit-desc",
								rows: 3,
								value: form.description,
								onChange: (e) => setForm({
									...form,
									description: e.target.value
								}),
								placeholder: "Tell buyers what makes your store special…",
								className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-cat",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									id: "edit-cat",
									value: form.category,
									onChange: (e) => setForm({
										...form,
										category: e.target.value
									}),
									className: "w-full rounded-md border border-input bg-background h-10 px-3 text-sm outline-none focus:ring-2 focus:ring-ring",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select a category…"
									}), CATEGORIES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c,
										children: c
									}, c))]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "edit-loc",
									children: "Location (optional)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "edit-loc",
									value: form.location,
									onChange: (e) => setForm({
										...form,
										location: e.target.value
									}),
									placeholder: "e.g. Dubai, UAE"
								})]
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bg-card border rounded-xl p-5 space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold text-sm border-b pb-3",
						children: "Store images"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-6 sm:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadBox, {
							label: "Store Logo",
							hint: "Square image, JPG/PNG/WEBP, max 5 MB",
							url: form.logo_url,
							uploading: uploading.logo,
							onChange: (e) => handleFileChange(e, "logo_url"),
							aspect: "square"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImageUploadBox, {
							label: "Banner Image",
							hint: "Wide image (1200×400+), JPG/PNG/WEBP, max 5 MB",
							url: form.banner_url,
							uploading: uploading.banner,
							onChange: (e) => handleFileChange(e, "banner_url"),
							aspect: "wide"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end gap-3 pt-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "submit",
						disabled: saving || uploading.logo || uploading.banner,
						className: "h-10 px-6 gap-2 font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "w-4 h-4" }), saving ? "Saving…" : "Save Changes"]
					})
				})
			]
		})]
	});
}
function SellerStore() {
	const { user, roles, refreshRoles, loading: authLoading } = useAuth();
	const { language } = useLocale();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const [upgrading, setUpgrading] = (0, import_react.useState)(false);
	const { data: store, isLoading: storeLoading } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (!authLoading && !user) {
			toast.error("Please sign in to access this page.");
			navigate({ to: "/login" });
		}
	}, [
		user,
		authLoading,
		navigate
	]);
	if (authLoading || storeLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading…"
		})
	});
	if (!user) return null;
	const isSeller = roles.includes("seller");
	const becomeSeller = async () => {
		setUpgrading(true);
		try {
			const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
			if (authError || !authUser) throw new Error("No authenticated user found. Please sign in again.");
			const { error } = await supabase.from("user_roles").insert({
				user_id: authUser.id,
				role: "seller"
			});
			if (error) throw error;
			await refreshRoles();
			toast.success("You are now registered as a Seller!");
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to register as a seller");
		} finally {
			setUpgrading(false);
		}
	};
	if (!isSeller) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-md px-4 py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, { className: "w-7 h-7 text-primary" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl font-bold tracking-tight",
				children: t("become_a_seller", language)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Join Saloree's seller hub to open your store, showcase your products, and start earning."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: becomeSeller,
					disabled: upgrading,
					className: "w-full h-11 text-base",
					children: upgrading ? "Registering…" : t("become_a_seller", language)
				})
			})
		]
	});
	if (!store) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreateStoreForm, {
		userId: user.id,
		onCreated: () => {
			qc.invalidateQueries({ queryKey: ["my-store"] });
			navigate({ to: "/seller" });
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditStoreForm, {
		store,
		userId: user.id
	});
}
//#endregion
export { SellerStore as component };
