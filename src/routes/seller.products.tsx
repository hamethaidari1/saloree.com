import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Pencil, Trash2, Plus, X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/seller/products")({
  component: SellerProducts,
});

type Form = {
  id?: string;
  title: string;
  description: string;
  price: string;
  stock: string;
  category_id: string;
  status: string;
};

const empty: Form = {
  title: "",
  description: "",
  price: "",
  stock: "0",
  category_id: "",
  status: "draft",
};

const PRODUCT_IMAGES_BUCKET = "product-images";

// ─── helpers ────────────────────────────────────────────────────────────────

function toSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

function extractStoragePath(url: string) {
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

function toPublicProductImageUrl(value: string | null | undefined) {
  if (!value) return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const parsed = new URL(trimmed);
      return parsed.href;
    } catch {
      return null;
    }
  }

  const filePath = extractStoragePath(trimmed);
  if (!filePath) return null;

  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath);
  return data.publicUrl || null;
}

function getSortedProductImages(product: any) {
  return [...(product.product_images ?? [])].sort(
    (a: { position?: number | null }, b: { position?: number | null }) =>
      (a.position ?? 0) - (b.position ?? 0),
  );
}

function getRenderedProductImageUrl(product: any) {
  const featuredImage = toPublicProductImageUrl(product.featured_image);
  const firstProductImage = getSortedProductImages(product)
    .map((img: { image_url?: string | null }) => toPublicProductImageUrl(img.image_url))
    .find(Boolean);

  const renderedImageUrl = featuredImage ?? firstProductImage ?? null;

  console.log("[seller-products] rendered image URL:", {
    productId: product.id,
    url: renderedImageUrl,
  });

  return renderedImageUrl;
}

// ─── component ──────────────────────────────────────────────────────────────

function SellerProducts() {
  const { user } = useAuth();
  const qc = useQueryClient();

  // modal state
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Form>(empty);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string } | null>(null);

  // images[]: current visible URLs (both pre-existing and newly uploaded)
  // originalImages[]: snapshot of URLs when edit modal was opened
  const [images, setImages] = useState<string[]>([]);
  const [originalImages, setOriginalImages] = useState<string[]>([]);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ── queries ──────────────────────────────────────────────────────────────

  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("stores").select("*").eq("owner_id", user!.id).maybeSingle()).data,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("*").order("name");
      if (error) throw error;

      if (!data || data.length === 0) {
        const defaultCats = [
          { name: "Electronics", slug: "electronics", icon: "laptop" },
          { name: "Fashion", slug: "fashion", icon: "shirt" },
          { name: "Home & Kitchen", slug: "home-kitchen", icon: "sofa" },
          { name: "Beauty & Health", slug: "beauty-health", icon: "sparkles" },
          { name: "Sports & Outdoors", slug: "sports-outdoors", icon: "dumbbell" },
          { name: "Books & Stationery", slug: "books-stationery", icon: "book" },
          { name: "Toys & Games", slug: "toys-games", icon: "gamepad-2" },
          { name: "Automotive", slug: "automotive", icon: "car" },
        ];
        const { error: seedErr } = await supabase.from("categories").insert(defaultCats);
        if (!seedErr) {
          const { data: seeded } = await supabase.from("categories").select("*").order("name");
          return seeded ?? [];
        }
      }
      return data ?? [];
    },
  });

  const { data: products, refetch: refetchProducts } = useQuery({
    queryKey: ["seller-products", store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();
      if (!authUser) throw new Error("Not authenticated");

      const { data: currentStore, error: storeErr } = await supabase
        .from("stores")
        .select("id")
        .eq("owner_id", authUser.id)
        .maybeSingle();

      if (storeErr) {
        console.error("[seller-products] store fetch error:", storeErr);
        throw storeErr;
      }
      if (!currentStore) {
        console.warn("[seller-products] no store found for user", authUser.id);
        return [];
      }

      console.log("[seller-products] fetching for store_id:", currentStore.id);

      const { data: rows, error: prodErr } = await supabase
        .from("products")
        .select(
          "id, store_id, title, slug, description, price, stock, category_id, featured_image, status, created_at",
        )
        .eq("store_id", currentStore.id)
        .order("created_at", { ascending: false });

      if (prodErr) {
        console.error("[seller-products] products error:", prodErr);
        throw prodErr;
      }

      const list = rows ?? [];
      console.log("[seller-products] fetched", list.length, "products");
      if (list.length === 0) return list;

      // Fetch images separately (non-fatal)
      const ids = list.map((p) => p.id);
      const { data: imgRows, error: imgErr } = await supabase
        .from("product_images")
        .select("id, product_id, image_url, position")
        .in("product_id", ids)
        .order("position");

      if (imgErr) console.warn("[seller-products] product_images warning (non-fatal):", imgErr);

      const imagesMap: Record<string, any[]> = {};
      for (const img of imgRows ?? []) {
        if (!imagesMap[img.product_id]) imagesMap[img.product_id] = [];
        imagesMap[img.product_id].push(img);
      }

      return list.map((p) => ({
        ...p,
        featured_image: toPublicProductImageUrl(p.featured_image),
        product_images: (imagesMap[p.id] ?? []).map((img) => ({
          ...img,
          image_url: toPublicProductImageUrl(img.image_url),
        })),
      }));
    },
  });

  // ── guards ───────────────────────────────────────────────────────────────

  if (!user) return <p className="text-sm p-4">Sign in first.</p>;
  if (!store)
    return (
      <p className="text-sm p-4">
        Create your{" "}
        <Link to="/seller/store" className="font-semibold text-primary">
          store
        </Link>{" "}
        first.
      </p>
    );

  // ── modal helpers ─────────────────────────────────────────────────────────

  function openCreate() {
    setForm(empty);
    setSelectedProduct(null);
    setImages([]);
    setOriginalImages([]);
    setOpen(true);
  }

  function openEdit(p: any) {
    setSelectedProduct({ id: p.id });
    setForm({
      id: p.id,
      title: p.title,
      description: p.description ?? "",
      price: String(p.price),
      stock: String(p.stock ?? "0"),
      category_id: p.category_id ?? "",
      status: p.status ?? "draft",
    });

    const sorted = getSortedProductImages(p)
      .map((img: any) => toPublicProductImageUrl(img.image_url))
      .filter(Boolean) as string[];
    const featuredImage = toPublicProductImageUrl(p.featured_image);
    const nextImages = featuredImage
      ? [featuredImage, ...sorted.filter((url) => url !== featuredImage)]
      : sorted;

    setImages(nextImages);
    setOriginalImages(nextImages); // snapshot for diff on save
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setForm(empty);
    setSelectedProduct(null);
    setImages([]);
    setOriginalImages([]);
  }

  // ── image upload ──────────────────────────────────────────────────────────
  // NOTE: We only upload to Storage here (get a URL).
  //       All DB writes happen in save() so there's a single, atomic flow.

  async function handleUploadImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    // Reset input so the same file can be re-selected if needed
    e.target.value = "";
    if (!file) return;

    if (images.length >= 5) return toast.error("Maximum 5 images allowed per product");

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) return toast.error("File size exceeds 5 MB");

    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) return toast.error("Only JPG, PNG, and WEBP are accepted");

    // For new products we need a stable ID before Save is clicked
    const productId =
      form.id ??
      (() => {
        const id = crypto.randomUUID();
        setForm((prev) => ({ ...prev, id }));
        return id;
      })();

    setUploading(true);
    try {
      const ext = file.name.split(".").pop() || "bin";
      const filePath = `${user!.id}/products/${store!.id}/${productId}/${crypto.randomUUID()}.${ext}`;

      console.log("[upload] uploaded file path:", filePath);

      const { error: uploadError } = await supabase.storage
        .from(PRODUCT_IMAGES_BUCKET)
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(filePath);

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

  // ── image remove ──────────────────────────────────────────────────────────
  // Only removes from local state. Storage + DB cleanup happens in save().
  // Exception: if the image was NOT in originalImages, it was uploaded this
  // session → delete from Storage immediately to avoid orphans.

  async function handleRemoveImage(urlToRemove: string) {
    setImages((prev) => prev.filter((u) => u !== urlToRemove));

    const isNewlyUploaded = !originalImages.includes(urlToRemove);
    if (isNewlyUploaded) {
      const path = extractStoragePath(urlToRemove);
      if (path) {
        try {
          await supabase.storage.from("product-images").remove([path]);
        } catch (err) {
          console.error("[remove-image] storage delete error:", err);
        }
      }
    }
    // Old images are cleaned from Storage + DB in save() to keep things atomic
  }

  // ── save (create / update) ────────────────────────────────────────────────

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
      const normalizedImages = images
        .map((url) => toPublicProductImageUrl(url))
        .filter(Boolean) as string[];
      const featuredImage = normalizedImages[0] ?? null;
      const productId = form.id ?? crypto.randomUUID();
      const isEdit = !!selectedProduct;

      console.log("[save] edit mode:", isEdit);
      console.log("[save] selectedProduct.id:", selectedProduct?.id ?? null);
      console.log("[save] saved featured_image:", featuredImage);

      if (isEdit) {
        // ── UPDATE ──────────────────────────────────────────────────────────

        if (!selectedProduct?.id) throw new Error("No selected product to update.");

        const updatePayload = {
          title: form.title.trim(),
          slug,
          description: form.description.trim() || null,
          price: priceNum,
          stock: stockNum,
          category_id: form.category_id,
          featured_image: featuredImage,
          status: form.status,
        };

        console.log("[save:update] payload:", updatePayload);

        const { data: updateResponse, error: updateError } = await supabase
          .from("products")
          .update(updatePayload)
          .eq("id", selectedProduct.id)
          .select();

        console.log("[save:update] Supabase update response:", updateResponse);
        console.log("[save:update] Supabase update error:", updateError);

        if (updateError) {
          console.error("[save:update] product update error:", updateError);
          throw updateError;
        }

        // Diff: which images were removed?
        const removedUrls = originalImages.filter((u) => !images.includes(u));

        // Delete removed images from Storage
        for (const url of removedUrls) {
          const path = extractStoragePath(url);
          if (path) {
            const { error: storageErr } = await supabase.storage
              .from("product-images")
              .remove([path]);
            if (storageErr) console.warn("[save:update] storage remove warning:", storageErr);
          }
        }

        // Sync product_images: delete all → re-insert current order
        // (simplest way to preserve correct positions)
        const { error: delImgErr } = await supabase
          .from("product_images")
          .delete()
          .eq("product_id", selectedProduct.id);

        if (delImgErr) console.warn("[save:update] product_images delete warning:", delImgErr);

        if (normalizedImages.length > 0) {
          const imgRows = normalizedImages.map((url, idx) => ({
            product_id: selectedProduct.id,
            image_url: url,
            position: idx,
          }));
          const { error: insImgErr } = await supabase.from("product_images").insert(imgRows);
          if (insImgErr) console.warn("[save:update] product_images insert warning:", insImgErr);
        }

        closeModal();
        await refetchProducts();
        toast.success("Product updated successfully");
      } else {
        // ── CREATE ──────────────────────────────────────────────────────────

        const insertPayload = {
          id: productId,
          store_id: store!.id,
          title: form.title.trim(),
          slug,
          description: form.description.trim() || null,
          price: priceNum,
          stock: stockNum,
          category_id: form.category_id,
          featured_image: featuredImage,
          status: form.status,
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
          position: idx,
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
    } catch (e: any) {
      console.error("[save] error:", e);
      const msg = e?.message ?? "Failed to save product.";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }

  // ── delete ────────────────────────────────────────────────────────────────

  async function remove(id: string, pImages: any[]) {
    if (!confirm("Delete this product and all its images?")) return;
    try {
      for (const img of pImages) {
        const path = extractStoragePath(img.image_url);
        if (path) {
          await supabase.storage.from("product-images").remove([path]);
        }
      }
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      toast.success("Product deleted");
      qc.invalidateQueries({ queryKey: ["seller-products"] });
    } catch (e: any) {
      console.error("[delete] error:", e);
      toast.error(e?.message ?? "Delete failed");
    }
  }

  // ── render ────────────────────────────────────────────────────────────────

  const isEdit = !!selectedProduct;

  return (
    <div className="grid gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-lg">Products ({products?.length ?? 0})</h2>
        <Button onClick={openCreate}>+ Add product</Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border bg-card shadow-sm">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground border-b">
            <tr>
              <th className="p-3 text-left">Product</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-right">Price</th>
              <th className="p-3 text-right">Stock</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3" />
            </tr>
          </thead>
          <tbody>
            {(products ?? []).map((p) => {
              const catName = categories?.find((c) => c.id === p.category_id)?.name ?? "—";
              const renderedImageUrl = getRenderedProductImageUrl(p);
              return (
                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/20">
                  <td className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-md bg-muted border">
                        {renderedImageUrl ? (
                          <img
                            src={renderedImageUrl}
                            alt=""
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-[10px] text-muted-foreground flex items-center justify-center h-full">
                            No img
                          </span>
                        )}
                      </div>
                      <span className="font-medium text-foreground">{p.title}</span>
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">{catName}</td>
                  <td className="p-3 text-right font-medium">${Number(p.price).toFixed(2)}</td>
                  <td className="p-3 text-right text-muted-foreground">{p.stock ?? 0}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                        p.status === "active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {p.status ?? "draft"}
                    </span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEdit(p)}
                      className="mr-3 text-muted-foreground hover:text-primary transition-colors"
                      title="Edit product"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => remove(p.id, (p as any).product_images ?? [])}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete product"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
            {products && products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-10 text-center text-sm text-muted-foreground">
                  No products yet. Click "+ Add product" to list your first item.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4"
          onClick={closeModal}
        >
          <div
            className="w-full max-w-xl rounded-lg bg-background p-6 shadow-xl border max-h-[95vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between border-b pb-3 shrink-0">
              <h3 className="text-lg font-bold">{isEdit ? "Edit product" : "Add product"}</h3>
              <button onClick={closeModal} className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            {/* Modal body */}
            <div className="mt-4 grid gap-4 overflow-y-auto pr-1 flex-1">
              {/* Title */}
              <label className="grid gap-1 text-sm font-semibold">
                Title *
                <input
                  placeholder="Minimum 3 characters"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
                />
              </label>

              {/* Slug preview */}
              {form.title.trim().length > 0 && (
                <p className="text-[11px] text-muted-foreground -mt-2">
                  Slug: <span className="font-mono">{toSlug(form.title)}</span>
                </p>
              )}

              {/* Description */}
              <label className="grid gap-1 text-sm font-semibold">
                Description
                <textarea
                  placeholder="Product description..."
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="rounded-md border border-input bg-background p-3 font-normal outline-none focus:ring-2 focus:ring-ring resize-none"
                />
              </label>

              {/* Price + Stock */}
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1 text-sm font-semibold">
                  Price ($) *
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                  Stock
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={form.stock}
                    onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
                  />
                </label>
              </div>

              {/* Category + Status */}
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1 text-sm font-semibold">
                  Category *
                  <select
                    value={form.category_id}
                    onChange={(e) => setForm({ ...form, category_id: e.target.value })}
                    className="h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">— Select —</option>
                    {(categories ?? []).map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-1 text-sm font-semibold">
                  Status
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="h-10 rounded-md border border-input bg-background px-3 font-normal outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="archived">Archived</option>
                  </select>
                </label>
              </div>

              {/* Images */}
              <div className="border-t pt-4">
                <p className="text-sm font-semibold mb-2">
                  Product Images ({images.length}/5){" "}
                  <span className="font-normal text-muted-foreground text-xs">
                    — first image is the cover
                  </span>
                </p>

                {images.length > 0 && (
                  <div className="grid grid-cols-5 gap-2 mb-3">
                    {images.map((url, idx) => (
                      <div
                        key={url}
                        className="relative aspect-square rounded-md border overflow-hidden bg-muted"
                      >
                        <img src={url} alt="" className="h-full w-full object-cover" />
                        {idx === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-[9px] text-white text-center py-0.5">
                            Cover
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(url)}
                          className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground rounded-full p-0.5 shadow"
                        >
                          <X className="size-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {images.length < 5 && (
                  <label className="inline-flex items-center gap-1.5 border-2 border-dashed border-input rounded-md px-4 py-2 hover:bg-muted/40 cursor-pointer text-sm font-semibold">
                    {uploading ? (
                      <>
                        <Loader2 className="size-4 animate-spin text-muted-foreground" />
                        <span>Uploading…</span>
                      </>
                    ) : (
                      <>
                        <Plus className="size-4 text-primary" />
                        <span>Add image</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      disabled={uploading || saving}
                      onChange={handleUploadImage}
                      className="hidden"
                    />
                  </label>
                )}
                <p className="text-[10px] text-muted-foreground mt-1">
                  JPG, PNG, WEBP · max 5 MB each
                </p>
              </div>
            </div>

            {/* Modal footer */}
            <div className="mt-5 flex justify-end gap-2 border-t pt-3 shrink-0">
              <Button variant="outline" onClick={closeModal} disabled={saving}>
                Cancel
              </Button>
              <Button onClick={save} disabled={saving || uploading}>
                {saving ? (
                  <>
                    <Loader2 className="size-4 animate-spin mr-1" />
                    Saving…
                  </>
                ) : isEdit ? (
                  "Update product"
                ) : (
                  "Create product"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
