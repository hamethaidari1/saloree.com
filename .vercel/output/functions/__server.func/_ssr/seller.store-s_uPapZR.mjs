import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { _ as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as t, o as useLocale } from "./locale-DkGpSZl2.mjs";
import { t as storage } from "./storage-YXTy7VHU.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.store-s_uPapZR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var slugify = (name) => {
	return name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
};
function SellerStore() {
	const { user, roles, refreshRoles, loading: authLoading } = useAuth();
	const { language } = useLocale();
	const navigate = useNavigate();
	const qc = useQueryClient();
	const { data: store, isLoading: storeLoading } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const [form, setForm] = (0, import_react.useState)({
		name: "",
		slug: "",
		description: "",
		logo_url: "",
		banner_url: ""
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [upgrading, setUpgrading] = (0, import_react.useState)(false);
	const [uploadingFiles, setUploadingFiles] = (0, import_react.useState)({
		logo_url: false,
		banner_url: false
	});
	(0, import_react.useEffect)(() => {
		if (store) {
			const rawStore = store;
			setForm({
				name: rawStore.name || "",
				slug: rawStore.slug || "",
				description: rawStore.description || "",
				logo_url: rawStore.logo_url || "",
				banner_url: rawStore.banner_url || ""
			});
		}
	}, [store]);
	(0, import_react.useEffect)(() => {
		if (!authLoading && !user) {
			toast.error("Please sign in first to access this page.");
			navigate({ to: "/login" });
		}
	}, [
		user,
		authLoading,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (store) {
			toast.info("You already have a store. Redirecting to your dashboard.");
			navigate({ to: "/seller" });
		}
	}, [store, navigate]);
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
					children: upgrading ? "..." : t("become_a_seller", language)
				})
			})
		]
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
			toast.error("Unsupported file format. Please upload JPG, JPEG, PNG, or WEBP.");
			return;
		}
		if (file.size > 5 * 1024 * 1024) {
			toast.error("File size exceeds the 5 MB limit.");
			return;
		}
		const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
		if (authError || !authUser) {
			toast.error("No authenticated user found. Please sign in again.");
			return;
		}
		const bucket = field === "logo_url" ? "store-logos" : "store-banners";
		const folder = field === "logo_url" ? "logos" : "banners";
		setUploadingFiles((prev) => ({
			...prev,
			[field]: true
		}));
		try {
			const url = await storage.upload(file, {
				userId: authUser.id,
				folder,
				bucket
			});
			setForm((f) => ({
				...f,
				[field]: url
			}));
			toast.success("File uploaded successfully!");
		} catch (err) {
			toast.error(err instanceof Error ? err.message : "File upload failed.");
		} finally {
			setUploadingFiles((prev) => ({
				...prev,
				[field]: false
			}));
		}
	};
	const saveStore = async (e) => {
		e.preventDefault();
		const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
		if (authError || !authUser) {
			toast.error("No authenticated user found. Please sign in again.");
			return;
		}
		if (!form.name.trim()) {
			toast.error("Store name is required.");
			return;
		}
		const finalSlug = form.slug.trim() || slugify(form.name);
		if (!finalSlug) {
			toast.error("A valid store slug is required.");
			return;
		}
		setSaving(true);
		try {
			const { data: existingSlugStore, error: checkError } = await supabase.from("stores").select("id").eq("slug", finalSlug).maybeSingle();
			if (checkError) throw checkError;
			if (existingSlugStore) {
				toast.error("This slug is already taken. Please choose another name or slug.");
				setSaving(false);
				return;
			}
			const payload = {
				owner_id: authUser.id,
				name: form.name.trim(),
				slug: finalSlug,
				description: form.description.trim() || null,
				logo_url: form.logo_url || null,
				banner_url: form.banner_url || null
			};
			console.log("Inserting store payload to Supabase:", payload);
			const { error: insertError } = await supabase.from("stores").insert(payload);
			if (insertError) throw insertError;
			toast.success("Store created successfully!");
			qc.invalidateQueries({ queryKey: ["my-store"] });
			navigate({ to: "/seller" });
		} catch (e) {
			toast.error(e instanceof Error ? e.message : "Failed to create store.");
		} finally {
			setSaving(false);
		}
	};
	const isUploading = uploadingFiles.logo_url || uploadingFiles.banner_url;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-2xl px-4 py-8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: saveStore,
			className: "grid gap-6 rounded-lg border bg-card p-6 shadow-sm",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-bold tracking-tight",
					children: t("seller_store_settings", language)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Set up your public profile to start listing products on Saloree."
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: t("store_name_label", language)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "text",
							value: form.name,
							onChange: handleNameChange,
							placeholder: "e.g. My Amazing Store",
							className: "h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1.5 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "URL slug"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							required: true,
							type: "text",
							value: form.slug,
							onChange: (e) => setForm({
								...form,
								slug: slugify(e.target.value)
							}),
							placeholder: "my-amazing-store",
							className: "h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1.5 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold",
						children: t("store_description_label", language)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 4,
						value: form.description,
						onChange: (e) => setForm({
							...form,
							description: e.target.value
						}),
						placeholder: "Tell buyers about your shop, values, and items...",
						className: "rounded-md border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-ring resize-none"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-6 sm:grid-cols-2 border-t pt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Store Logo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted border flex items-center justify-center",
								children: form.logo_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: form.logo_url,
									alt: "Logo",
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "No Logo"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/jpeg,image/png,image/webp",
									disabled: uploadingFiles.logo_url,
									onChange: (e) => handleFileChange(e, "logo_url"),
									className: "text-xs text-muted-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-2.5 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/95"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "JPG, PNG, WEBP up to 5 MB"
								})]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Banner Image"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-16 w-28 shrink-0 overflow-hidden rounded-md bg-muted border flex items-center justify-center",
								children: form.banner_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: form.banner_url,
									alt: "Banner",
									className: "h-full w-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "No Banner"
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "file",
									accept: "image/jpeg,image/png,image/webp",
									disabled: uploadingFiles.banner_url,
									onChange: (e) => handleFileChange(e, "banner_url"),
									className: "text-xs text-muted-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-2.5 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/95"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted-foreground",
									children: "JPG, PNG, WEBP up to 5 MB"
								})]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "border-t pt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						disabled: saving || isUploading,
						className: "w-full sm:w-auto px-6 h-11 text-base font-semibold",
						children: saving ? "..." : isUploading ? "..." : t("seller_save", language)
					})
				})
			]
		})
	});
}
//#endregion
export { SellerStore as component };
