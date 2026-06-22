import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { n as useAuth } from "./auth-CGUiEWeI.mjs";
import { i as useQueryClient, n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Pencil, N as Plus, W as LoaderCircle, p as Trash2, r as X } from "../_libs/lucide-react.mjs";
import { t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/seller.products-C7HKJkfE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var empty = {
	title: "",
	description: "",
	price: "",
	stock: "0",
	category_id: "",
	status: "draft"
};
var PRODUCT_IMAGES_BUCKET = "product-images";
function toSlug(title) {
	return title.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
function extractStoragePath(url) {
	const trimmed = url.trim();
	if (!trimmed) return null;
	const marker = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
	const idx = trimmed.indexOf(marker);
	if (idx !== -1) return trimmed.slice(idx + marker.length);
	const bucketPrefixed = `${PRODUCT_IMAGES_BUCKET}/`;
	if (trimmed.startsWith(bucketPrefixed)) return trimmed.slice(bucketPrefixed.length);
	if (/^https?:\/\//i.test(trimmed)) return null;
	return trimmed.replace(/^\/+/, "");
}
function toPublicProductImageUrl(value) {
	if (!value) return null;
	const trimmed = value.trim();
	if (!trimmed) return null;
	if (/^https?:\/\//i.test(trimmed)) try {
		return new URL(trimmed).href;
	} catch {
		return null;
	}
	const filePath = extractStoragePath(trimmed);
	if (!filePath) return null;
	const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath);
	return data.publicUrl || null;
}
function getSortedProductImages(product) {
	return [...product.product_images ?? []].sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
}
function getRenderedProductImageUrl(product) {
	const featuredImage = toPublicProductImageUrl(product.featured_image);
	const firstProductImage = getSortedProductImages(product).map((img) => toPublicProductImageUrl(img.image_url)).find(Boolean);
	const renderedImageUrl = featuredImage ?? firstProductImage ?? null;
	console.log("[seller-products] rendered image URL:", {
		productId: product.id,
		url: renderedImageUrl
	});
	return renderedImageUrl;
}
function SellerProducts() {
	const { user } = useAuth();
	const qc = useQueryClient();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(empty);
	const [selectedProduct, setSelectedProduct] = (0, import_react.useState)(null);
	const [images, setImages] = (0, import_react.useState)([]);
	const [originalImages, setOriginalImages] = (0, import_react.useState)([]);
	const [uploading, setUploading] = (0, import_react.useState)(false);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data: store } = useQuery({
		queryKey: ["my-store", user?.id],
		enabled: !!user,
		queryFn: async () => (await supabase.from("stores").select("*").eq("owner_id", user.id).maybeSingle()).data
	});
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: async () => {
			const { data, error } = await supabase.from("categories").select("*").order("name");
			if (error) throw error;
			if (!data || data.length === 0) {
				const { error: seedErr } = await supabase.from("categories").insert([
					{
						name: "Electronics",
						slug: "electronics",
						icon: "laptop"
					},
					{
						name: "Fashion",
						slug: "fashion",
						icon: "shirt"
					},
					{
						name: "Home & Kitchen",
						slug: "home-kitchen",
						icon: "sofa"
					},
					{
						name: "Beauty & Health",
						slug: "beauty-health",
						icon: "sparkles"
					},
					{
						name: "Sports & Outdoors",
						slug: "sports-outdoors",
						icon: "dumbbell"
					},
					{
						name: "Books & Stationery",
						slug: "books-stationery",
						icon: "book"
					},
					{
						name: "Toys & Games",
						slug: "toys-games",
						icon: "gamepad-2"
					},
					{
						name: "Automotive",
						slug: "automotive",
						icon: "car"
					}
				]);
				if (!seedErr) {
					const { data: seeded } = await supabase.from("categories").select("*").order("name");
					return seeded ?? [];
				}
			}
			return data ?? [];
		}
	});
	const { data: products, refetch: refetchProducts } = useQuery({
		queryKey: ["seller-products", store?.id],
		enabled: !!store?.id,
		queryFn: async () => {
			const { data: { user: authUser } } = await supabase.auth.getUser();
			if (!authUser) throw new Error("Not authenticated");
			const { data: currentStore, error: storeErr } = await supabase.from("stores").select("id").eq("owner_id", authUser.id).maybeSingle();
			if (storeErr) {
				console.error("[seller-products] store fetch error:", storeErr);
				throw storeErr;
			}
			if (!currentStore) {
				console.warn("[seller-products] no store found for user", authUser.id);
				return [];
			}
			console.log("[seller-products] fetching for store_id:", currentStore.id);
			const { data: rows, error: prodErr } = await supabase.from("products").select("id, store_id, title, slug, description, price, stock, category_id, featured_image, status, created_at").eq("store_id", currentStore.id).order("created_at", { ascending: false });
			if (prodErr) {
				console.error("[seller-products] products error:", prodErr);
				throw prodErr;
			}
			const list = rows ?? [];
			console.log("[seller-products] fetched", list.length, "products");
			if (list.length === 0) return list;
			const ids = list.map((p) => p.id);
			const { data: imgRows, error: imgErr } = await supabase.from("product_images").select("id, product_id, image_url, position").in("product_id", ids).order("position");
			if (imgErr) console.warn("[seller-products] product_images warning (non-fatal):", imgErr);
			const imagesMap = {};
			for (const img of imgRows ?? []) {
				if (!imagesMap[img.product_id]) imagesMap[img.product_id] = [];
				imagesMap[img.product_id].push(img);
			}
			return list.map((p) => ({
				...p,
				featured_image: toPublicProductImageUrl(p.featured_image),
				product_images: (imagesMap[p.id] ?? []).map((img) => ({
					...img,
					image_url: toPublicProductImageUrl(img.image_url)
				}))
			}));
		}
	});
	if (!user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm p-4",
		children: "Sign in first."
	});
	if (!store) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm p-4",
		children: [
			"Create your",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/seller/store",
				className: "font-semibold text-primary",
				children: "store"
			}),
			" ",
			"first."
		]
	});
	function openCreate() {
		setForm(empty);
		setSelectedProduct(null);
		setImages([]);
		setOriginalImages([]);
		setOpen(true);
	}
	function openEdit(p) {
		setSelectedProduct({ id: p.id });
		setForm({
			id: p.id,
			title: p.title,
			description: p.description ?? "",
			price: String(p.price),
			stock: String(p.stock ?? "0"),
			category_id: p.category_id ?? "",
			status: p.status ?? "draft"
		});
		const sorted = getSortedProductImages(p).map((img) => toPublicProductImageUrl(img.image_url)).filter(Boolean);
		const featuredImage = toPublicProductImageUrl(p.featured_image);
		const nextImages = featuredImage ? [featuredImage, ...sorted.filter((url) => url !== featuredImage)] : sorted;
		setImages(nextImages);
		setOriginalImages(nextImages);
		setOpen(true);
	}
	function closeModal() {
		setOpen(false);
		setForm(empty);
		setSelectedProduct(null);
		setImages([]);
		setOriginalImages([]);
	}
	async function handleUploadImage(e) {
		const file = e.target.files?.[0];
		e.target.value = "";
		if (!file) return;
		if (images.length >= 5) return toast.error("Maximum 5 images allowed per product");
		if (file.size > 5 * 1024 * 1024) return toast.error("File size exceeds 5 MB");
		if (![
			"image/jpeg",
			"image/jpg",
			"image/png",
			"image/webp"
		].includes(file.type)) return toast.error("Only JPG, PNG, and WEBP are accepted");
		const productId = form.id ?? (() => {
			const id = crypto.randomUUID();
			setForm((prev) => ({
				...prev,
				id
			}));
			return id;
		})();
		setUploading(true);
		try {
			const ext = file.name.split(".").pop() || "bin";
			const filePath = `${user.id}/products/${store.id}/${productId}/${crypto.randomUUID()}.${ext}`;
			console.log("[upload] uploaded file path:", filePath);
			const { error: uploadError } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).upload(filePath, file, {
				cacheControl: "3600",
				upsert: false
			});
			if (uploadError) throw uploadError;
			const { data: { publicUrl } } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath);
			console.log("[upload] generated public URL:", publicUrl);
			if (!publicUrl) throw new Error("Failed to generate public URL for uploaded image.");
			setImages((prev) => [...prev, publicUrl]);
			toast.success("Image uploaded");
		} catch (err) {
			console.error("[upload] error:", err);
			toast.error("Upload failed. Please try again.");
		} finally {
			setUploading(false);
		}
	}
	async function handleRemoveImage(urlToRemove) {
		setImages((prev) => prev.filter((u) => u !== urlToRemove));
		if (!originalImages.includes(urlToRemove)) {
			const path = extractStoragePath(urlToRemove);
			if (path) try {
				await supabase.storage.from("product-images").remove([path]);
			} catch (err) {
				console.error("[remove-image] storage delete error:", err);
			}
		}
	}
	async function save() {
		if (form.title.trim().length < 3) return toast.error("Title must be at least 3 characters");
		const priceNum = Number(form.price);
		if (isNaN(priceNum) || priceNum <= 0) return toast.error("Price must be greater than 0");
		const stockNum = Number(form.stock);
		if (isNaN(stockNum) || stockNum < 0) return toast.error("Stock must be 0 or greater");
		if (!form.category_id) return toast.error("Category is required");
		if (images.length === 0) return toast.error("At least 1 product image is required");
		if (images.length > 5) return toast.error("Maximum 5 images allowed");
		setSaving(true);
		try {
			const slug = toSlug(form.title);
			const normalizedImages = images.map((url) => toPublicProductImageUrl(url)).filter(Boolean);
			const featuredImage = normalizedImages[0] ?? null;
			const productId = form.id ?? crypto.randomUUID();
			const isEdit = !!selectedProduct;
			console.log("[save] edit mode:", isEdit);
			console.log("[save] selectedProduct.id:", selectedProduct?.id ?? null);
			console.log("[save] saved featured_image:", featuredImage);
			if (isEdit) {
				if (!selectedProduct?.id) throw new Error("No selected product to update.");
				const updatePayload = {
					title: form.title.trim(),
					slug,
					description: form.description.trim() || null,
					price: priceNum,
					stock: stockNum,
					category_id: form.category_id,
					featured_image: featuredImage,
					status: form.status
				};
				console.log("[save:update] payload:", updatePayload);
				const { data: updateResponse, error: updateError } = await supabase.from("products").update(updatePayload).eq("id", selectedProduct.id).select();
				console.log("[save:update] Supabase update response:", updateResponse);
				console.log("[save:update] Supabase update error:", updateError);
				if (updateError) {
					console.error("[save:update] product update error:", updateError);
					throw updateError;
				}
				const removedUrls = originalImages.filter((u) => !images.includes(u));
				for (const url of removedUrls) {
					const path = extractStoragePath(url);
					if (path) {
						const { error: storageErr } = await supabase.storage.from("product-images").remove([path]);
						if (storageErr) console.warn("[save:update] storage remove warning:", storageErr);
					}
				}
				const { error: delImgErr } = await supabase.from("product_images").delete().eq("product_id", selectedProduct.id);
				if (delImgErr) console.warn("[save:update] product_images delete warning:", delImgErr);
				if (normalizedImages.length > 0) {
					const imgRows = normalizedImages.map((url, idx) => ({
						product_id: selectedProduct.id,
						image_url: url,
						position: idx
					}));
					const { error: insImgErr } = await supabase.from("product_images").insert(imgRows);
					if (insImgErr) console.warn("[save:update] product_images insert warning:", insImgErr);
				}
				closeModal();
				await refetchProducts();
				toast.success("Product updated successfully");
			} else {
				const insertPayload = {
					id: productId,
					store_id: store.id,
					title: form.title.trim(),
					slug,
					description: form.description.trim() || null,
					price: priceNum,
					stock: stockNum,
					category_id: form.category_id,
					featured_image: featuredImage,
					status: form.status
				};
				console.log("[save:create] payload →", insertPayload);
				const { error: insertErr } = await supabase.from("products").insert(insertPayload);
				if (insertErr) {
					console.error("[save:create] product insert error:", insertErr);
					throw insertErr;
				}
				const imgRows = normalizedImages.map((url, idx) => ({
					product_id: productId,
					image_url: url,
					position: idx
				}));
				if (imgRows.length > 0) {
					const { error: insImgErr } = await supabase.from("product_images").insert(imgRows);
					if (insImgErr) console.warn("[save:create] product_images insert warning:", insImgErr);
				}
				toast.success("Product created successfully");
				closeModal();
				await refetchProducts();
			}
			qc.invalidateQueries({ queryKey: ["seller-products"] });
		} catch (e) {
			console.error("[save] error:", e);
			const msg = e?.message ?? "Failed to save product.";
			toast.error(msg);
		} finally {
			setSaving(false);
		}
	}
	async function remove(id, pImages) {
		if (!confirm("Delete this product and all its images?")) return;
		try {
			for (const img of pImages) {
				const path = extractStoragePath(img.image_url);
				if (path) await supabase.storage.from("product-images").remove([path]);
			}
			const { error } = await supabase.from("products").delete().eq("id", id);
			if (error) throw error;
			toast.success("Product deleted");
			qc.invalidateQueries({ queryKey: ["seller-products"] });
		} catch (e) {
			console.error("[delete] error:", e);
			toast.error(e?.message ?? "Delete failed");
		}
	}
	const isEdit = !!selectedProduct;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "font-semibold text-lg",
					children: [
						"Products (",
						products?.length ?? 0,
						")"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: openCreate,
					children: "+ Add product"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-lg border bg-card shadow-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[600px] text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground border-b",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-left",
								children: "Product"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-left",
								children: "Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-right",
								children: "Stock"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "p-3 text-left",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "p-3" })
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [(products ?? []).map((p) => {
						const catName = categories?.find((c) => c.id === p.category_id)?.name ?? "—";
						const renderedImageUrl = getRenderedProductImageUrl(p);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b last:border-0 hover:bg-muted/20",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted border",
											children: renderedImageUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: renderedImageUrl,
												alt: "",
												className: "h-full w-full object-cover"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-[10px] text-muted-foreground flex items-center justify-center h-full",
												children: "No img"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-foreground",
											children: p.title
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-muted-foreground",
									children: catName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-3 text-right font-medium",
									children: ["$", Number(p.price).toFixed(2)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3 text-right text-muted-foreground",
									children: p.stock ?? 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "p-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: `inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${p.status === "active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-muted text-muted-foreground"}`,
										children: p.status ?? "draft"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
									className: "p-3 text-right whitespace-nowrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => openEdit(p),
										className: "mr-3 text-muted-foreground hover:text-primary transition-colors",
										title: "Edit product",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => remove(p.id, p.product_images ?? []),
										className: "text-muted-foreground hover:text-destructive transition-colors",
										title: "Delete product",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
									})]
								})
							]
						}, p.id);
					}), products && products.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						colSpan: 6,
						className: "p-10 text-center text-sm text-muted-foreground",
						children: "No products yet. Click \"+ Add product\" to list your first item."
					}) })] })]
				})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-50 grid place-items-center bg-black/50 p-4",
				onClick: closeModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-xl rounded-lg bg-background p-6 shadow-xl border max-h-[95vh] flex flex-col",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b pb-3 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-lg font-bold",
								children: isEdit ? "Edit product" : "Add product"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: closeModal,
								className: "text-muted-foreground hover:text-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 overflow-y-auto pr-1 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1 text-sm font-semibold",
									children: ["Title *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										placeholder: "Minimum 3 characters",
										value: form.title,
										onChange: (e) => setForm({
											...form,
											title: e.target.value
										}),
										className: "h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
									})]
								}),
								form.title.trim().length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[11px] text-muted-foreground -mt-2",
									children: ["Slug: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono",
										children: toSlug(form.title)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "grid gap-1 text-sm font-semibold",
									children: ["Description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										placeholder: "Product description...",
										rows: 3,
										value: form.description,
										onChange: (e) => setForm({
											...form,
											description: e.target.value
										}),
										className: "rounded-md border border-input bg-background p-3 font-normal outline-none focus:ring-2 focus:ring-ring resize-none"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm font-semibold",
										children: ["Price ($) *", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											step: "0.01",
											min: "0",
											placeholder: "0.00",
											value: form.price,
											onChange: (e) => setForm({
												...form,
												price: e.target.value
											}),
											className: "h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm font-semibold",
										children: ["Stock", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "number",
											min: "0",
											placeholder: "0",
											value: form.stock,
											onChange: (e) => setForm({
												...form,
												stock: e.target.value
											}),
											className: "h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid grid-cols-2 gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm font-semibold",
										children: ["Category *", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.category_id,
											onChange: (e) => setForm({
												...form,
												category_id: e.target.value
											}),
											className: "h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "",
												children: "— Select —"
											}), (categories ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: c.id,
												children: c.name
											}, c.id))]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm font-semibold",
										children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											value: form.status,
											onChange: (e) => setForm({
												...form,
												status: e.target.value
											}),
											className: "h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "draft",
													children: "Draft"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "active",
													children: "Active"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: "archived",
													children: "Archived"
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "border-t pt-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm font-semibold mb-2",
											children: [
												"Product Images (",
												images.length,
												"/5)",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-normal text-muted-foreground text-xs",
													children: "— first image is the cover"
												})
											]
										}),
										images.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "grid grid-cols-5 gap-2 mb-3",
											children: images.map((url, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "relative aspect-square rounded-md border overflow-hidden bg-muted",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
														src: url,
														alt: "",
														className: "h-full w-full object-cover"
													}),
													idx === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "absolute bottom-0 left-0 right-0 bg-black/60 text-[9px] text-white text-center py-0.5",
														children: "Cover"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														type: "button",
														onClick: () => handleRemoveImage(url),
														className: "absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 shadow",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })
													})
												]
											}, url))
										}),
										images.length < 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "inline-flex items-center gap-1.5 border-2 border-dashed border-input rounded-md px-4 py-2 hover:bg-muted/40 cursor-pointer text-sm font-semibold",
											children: [uploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Uploading…" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Add image" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/jpeg,image/png,image/webp",
												disabled: uploading || saving,
												onChange: handleUploadImage,
												className: "hidden"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-muted-foreground mt-1",
											children: "JPG, PNG, WEBP · max 5 MB each"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex justify-end gap-2 border-t pt-3 shrink-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: closeModal,
								disabled: saving,
								children: "Cancel"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: save,
								disabled: saving || uploading,
								children: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin mr-1" }), "Saving…"] }) : isEdit ? "Update product" : "Create product"
							})]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { SellerProducts as component };
