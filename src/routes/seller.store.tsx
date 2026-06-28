import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  ExternalLink,
  Globe,
  Save,
  Upload,
  Store,
  CheckCircle2,
  Clock,
  Eye,
  Copy,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/seller/store")({
  head: () => ({ meta: [{ title: "Store Settings — Saloree" }] }),
  component: SellerStore,
});

// ─── Helpers ──────────────────────────────────────────────────────────────────

const slugify = (name: string) =>
  name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const CATEGORIES = [
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
  "Other",
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ImageUploadBox({
  label,
  hint,
  url,
  uploading,
  onChange,
  aspect = "square",
}: {
  label: string;
  hint: string;
  url: string;
  uploading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  aspect?: "square" | "wide";
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold">{label}</Label>
      <div
        className={`relative group border-2 border-dashed border-border rounded-xl overflow-hidden bg-muted/30 hover:border-primary/50 transition-colors ${
          aspect === "wide" ? "h-28 w-full" : "h-28 w-28"
        }`}
      >
        {url ? (
          <img
            src={url}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full gap-1">
            <Upload className="w-5 h-5 text-muted-foreground" />
            <span className="text-xs text-muted-foreground text-center px-2">
              {uploading ? "Uploading…" : "Click to upload"}
            </span>
          </div>
        )}
        <label className="absolute inset-0 cursor-pointer">
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={uploading}
            onChange={onChange}
            className="sr-only"
          />
        </label>
        {uploading && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground">{hint}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const isPublished = status === "published";
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
        isPublished
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
      }`}
    >
      {isPublished ? (
        <CheckCircle2 className="w-3.5 h-3.5" />
      ) : (
        <Clock className="w-3.5 h-3.5" />
      )}
      {isPublished ? "Published" : "Draft"}
    </span>
  );
}

// ─── Create Store Form ────────────────────────────────────────────────────────

function CreateStoreForm({
  userId,
  onCreated,
}: {
  userId: string;
  onCreated: () => void;
}) {
  const { language } = useLocale();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    category: "",
    location: "",
    logo_url: "",
    banner_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({ logo: false, banner: false });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm((f) => ({ ...f, name: val, slug: slugify(val) }));
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo_url" | "banner_url",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5 MB.");
      return;
    }
    const key = field === "logo_url" ? "logo" : "banner";
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const bucket = field === "logo_url" ? "store-logos" : "store-banners";
      const folder = field === "logo_url" ? "logos" : "banners";
      const url = await storage.upload(file, { userId, folder, bucket });
      setForm((f) => ({ ...f, [field]: url }));
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const { data: existing } = await supabase
        .from("stores")
        .select("id")
        .eq("slug", finalSlug)
        .maybeSingle();
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
        status: "draft",
      } as any);
      if (error) throw error;
      toast.success("Store created! 🎉");
      onCreated();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create store.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
          <Store className="w-7 h-7 text-primary" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("seller_store_settings", language)}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Set up your Saloree storefront. You can always edit these details later.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card border rounded-2xl shadow-sm p-6 space-y-6"
      >
        {/* Name & Slug */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="store-name">
              {t("store_name_label", language)}{" "}
              <span className="text-destructive">*</span>
            </Label>
            <Input
              id="store-name"
              required
              value={form.name}
              onChange={handleNameChange}
              placeholder="e.g. My Fashion Store"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="store-slug">
              URL Slug <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                /stores/
              </span>
              <Input
                id="store-slug"
                required
                value={form.slug}
                onChange={(e) =>
                  setForm({ ...form, slug: slugify(e.target.value) })
                }
                className="pl-[60px]"
                placeholder="my-fashion-store"
              />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <Label htmlFor="store-desc">
            {t("store_description_label", language)}
          </Label>
          <textarea
            id="store-desc"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Tell buyers what makes your store special…"
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </div>

        {/* Category & Location */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="store-cat">Category</Label>
            <select
              id="store-cat"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full rounded-md border border-input bg-background h-10 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select a category…</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="store-loc">Location (optional)</Label>
            <Input
              id="store-loc"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. Dubai, UAE"
            />
          </div>
        </div>

        {/* Images */}
        <div className="border-t pt-5 grid gap-6 sm:grid-cols-2">
          <ImageUploadBox
            label="Store Logo"
            hint="Square image, JPG/PNG/WEBP, max 5 MB"
            url={form.logo_url}
            uploading={uploading.logo}
            onChange={(e) => handleFileChange(e, "logo_url")}
            aspect="square"
          />
          <ImageUploadBox
            label="Banner Image"
            hint="Wide image (1200×400+), JPG/PNG/WEBP, max 5 MB"
            url={form.banner_url}
            uploading={uploading.banner}
            onChange={(e) => handleFileChange(e, "banner_url")}
            aspect="wide"
          />
        </div>

        <div className="border-t pt-5">
          <Button
            type="submit"
            disabled={saving || uploading.logo || uploading.banner}
            className="w-full h-11 text-base font-semibold gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? "Creating store…" : "Create My Store"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Edit Store Settings Form ─────────────────────────────────────────────────

function EditStoreForm({ store, userId }: { store: any; userId: string }) {
  const qc = useQueryClient();
  const [form, setForm] = useState({
    name: store.name || "",
    slug: store.slug || "",
    description: store.description || "",
    category: store.category || "",
    location: store.location || "",
    logo_url: store.logo_url || "",
    banner_url: store.banner_url || "",
    status: store.status || "draft",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState({ logo: false, banner: false });
  const [copied, setCopied] = useState(false);

  const publicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/stores/${form.slug}`
      : `/stores/${form.slug}`;

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo_url" | "banner_url",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowed.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WEBP image.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5 MB.");
      return;
    }
    const key = field === "logo_url" ? "logo" : "banner";
    setUploading((u) => ({ ...u, [key]: true }));
    try {
      const bucket = field === "logo_url" ? "store-logos" : "store-banners";
      const folder = field === "logo_url" ? "logos" : "banners";
      const url = await storage.upload(file, { userId, folder, bucket });
      setForm((f) => ({ ...f, [field]: url }));
      toast.success("Image uploaded!");
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading((u) => ({ ...u, [key]: false }));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Store name is required.");
      return;
    }
    const finalSlug = form.slug.trim() || slugify(form.name);
    setSaving(true);
    try {
      // Check slug uniqueness (if changed)
      if (finalSlug !== store.slug) {
        const { data: existing } = await supabase
          .from("stores")
          .select("id")
          .eq("slug", finalSlug)
          .neq("id", store.id)
          .maybeSingle();
        if (existing) {
          toast.error("This slug is already taken. Please choose another.");
          setSaving(false);
          return;
        }
      }
      const { error } = await supabase
        .from("stores")
        .update({
          name: form.name.trim(),
          slug: finalSlug,
          description: form.description.trim() || null,
          category: form.category || null,
          location: form.location.trim() || null,
          logo_url: form.logo_url || null,
          banner_url: form.banner_url || null,
          status: form.status,
          updated_at: new Date().toISOString(),
        } as any)
        .eq("id", store.id);
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
    setTimeout(() => setCopied(false), 2000);
    toast.success("Store link copied!");
  };

  return (
    <div className="max-w-3xl mx-auto pb-16">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Store Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your storefront appearance and publishing status.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={form.status} />
          <Button variant="outline" size="sm" asChild className="gap-1.5">
            <Link to="/stores/$slug" params={{ slug: store.slug }} target="_blank">
              <Eye className="w-3.5 h-3.5" />
              Preview
            </Link>
          </Button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ── Public link ─────────────────────────────────────────── */}
        <div className="bg-card border rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-sm">Your store URL</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground font-mono truncate">
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{publicUrl}</span>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="gap-1.5 shrink-0"
            >
              <Copy className="w-3.5 h-3.5" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button variant="outline" size="sm" asChild className="gap-1.5 shrink-0">
              <a href={publicUrl} target="_blank" rel="noreferrer">
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>

        {/* ── Publishing status ─────────────────────────────────── */}
        <div className="bg-card border rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-sm">Store visibility</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {form.status === "published"
                  ? "Your store is live and visible to the public."
                  : "Your store is in draft mode. Only you can preview it."}
              </p>
            </div>
            <Switch
              id="store-status"
              checked={form.status === "published"}
              onCheckedChange={(checked) =>
                setForm({ ...form, status: checked ? "published" : "draft" })
              }
            />
          </div>
          <p className="text-[11px] text-muted-foreground bg-muted/50 rounded-lg p-3">
            💡 When published, only products with <strong>Active</strong> status will
            appear in your store.
          </p>
        </div>

        {/* ── Store details ─────────────────────────────────────── */}
        <div className="bg-card border rounded-xl p-5 space-y-5">
          <h3 className="font-semibold text-sm border-b pb-3">Store details</h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-name">
                Store Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="edit-name"
                required
                value={form.name}
                onChange={(e) => {
                  const val = e.target.value;
                  setForm((f) => ({
                    ...f,
                    name: val,
                    slug: f.slug === slugify(f.name) ? slugify(val) : f.slug,
                  }));
                }}
                placeholder="My Fashion Store"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-slug">URL Slug</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                  /stores/
                </span>
                <Input
                  id="edit-slug"
                  value={form.slug}
                  onChange={(e) =>
                    setForm({ ...form, slug: slugify(e.target.value) })
                  }
                  className="pl-[60px]"
                  placeholder="my-fashion-store"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="edit-desc">Description</Label>
            <textarea
              id="edit-desc"
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Tell buyers what makes your store special…"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="edit-cat">Category</Label>
              <select
                id="edit-cat"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
                className="w-full rounded-md border border-input bg-background h-10 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="edit-loc">Location (optional)</Label>
              <Input
                id="edit-loc"
                value={form.location}
                onChange={(e) =>
                  setForm({ ...form, location: e.target.value })
                }
                placeholder="e.g. Dubai, UAE"
              />
            </div>
          </div>
        </div>

        {/* ── Images ───────────────────────────────────────────────── */}
        <div className="bg-card border rounded-xl p-5 space-y-5">
          <h3 className="font-semibold text-sm border-b pb-3">Store images</h3>
          <div className="grid gap-6 sm:grid-cols-2">
            <ImageUploadBox
              label="Store Logo"
              hint="Square image, JPG/PNG/WEBP, max 5 MB"
              url={form.logo_url}
              uploading={uploading.logo}
              onChange={(e) => handleFileChange(e, "logo_url")}
              aspect="square"
            />
            <ImageUploadBox
              label="Banner Image"
              hint="Wide image (1200×400+), JPG/PNG/WEBP, max 5 MB"
              url={form.banner_url}
              uploading={uploading.banner}
              onChange={(e) => handleFileChange(e, "banner_url")}
              aspect="wide"
            />
          </div>
        </div>

        {/* ── Submit ───────────────────────────────────────────────── */}
        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="submit"
            disabled={saving || uploading.logo || uploading.banner}
            className="h-10 px-6 gap-2 font-semibold"
          >
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  );
}

// ─── Route Component ──────────────────────────────────────────────────────────

function SellerStore() {
  const { user, roles, refreshRoles, loading: authLoading } = useAuth();
  const { language } = useLocale();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [upgrading, setUpgrading] = useState(false);

  const { data: store, isLoading: storeLoading } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("owner_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in to access this page.");
      navigate({ to: "/login" });
    }
  }, [user, authLoading, navigate]);

  if (authLoading || storeLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  const isSeller = roles.includes("seller");

  const becomeSeller = async () => {
    setUpgrading(true);
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !authUser)
        throw new Error("No authenticated user found. Please sign in again.");
      const { error } = await supabase.from("user_roles").insert({
        user_id: authUser.id,
        role: "seller",
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

  if (!isSeller) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-6">
          <Store className="w-7 h-7 text-primary" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          {t("become_a_seller", language)}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Join Saloree's seller hub to open your store, showcase your products,
          and start earning.
        </p>
        <div className="mt-6">
          <Button
            onClick={becomeSeller}
            disabled={upgrading}
            className="w-full h-11 text-base"
          >
            {upgrading ? "Registering…" : t("become_a_seller", language)}
          </Button>
        </div>
      </div>
    );
  }

  // If no store yet → show create flow
  if (!store) {
    return (
      <CreateStoreForm
        userId={user.id}
        onCreated={() => {
          qc.invalidateQueries({ queryKey: ["my-store"] });
          navigate({ to: "/seller" });
        }}
      />
    );
  }

  // Store exists → show settings edit
  return <EditStoreForm store={store} userId={user.id} />;
}
