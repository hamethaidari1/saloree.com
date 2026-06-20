import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/seller/store")({
  component: SellerStore,
});

const slugify = (name: string) => {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^a-z0-9-]/g, "") // Remove non-alphanumeric/non-hyphen characters
    .replace(/-+/g, "-") // Collapse consecutive hyphens
    .replace(/^-|-$/g, ""); // Trim hyphens from start/end
};

function SellerStore() {
  const { user, roles, refreshRoles, loading: authLoading } = useAuth();
  const { language } = useLocale();
  const navigate = useNavigate();
  const qc = useQueryClient();

  // Query to check if the user already has a store
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

  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
    logo_url: "",
    banner_url: "",
  });
  const [saving, setSaving] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState({ logo_url: false, banner_url: false });

  // Initialize form state if store is fetched (in case of edit/view fallback)
  useEffect(() => {
    if (store) {
      const rawStore = store as any;
      setForm({
        name: rawStore.name || "",
        slug: rawStore.slug || "",
        description: rawStore.description || "",
        logo_url: rawStore.logo_url || "",
        banner_url: rawStore.banner_url || "",
      });
    }
  }, [store]);

  // 1. Authentication Redirect
  useEffect(() => {
    if (!authLoading && !user) {
      toast.error("Please sign in first to access this page.");
      navigate({ to: "/login" });
    }
  }, [user, authLoading, navigate]);

  // 2. Redirect if store already exists
  useEffect(() => {
    if (store) {
      toast.info("You already have a store. Redirecting to your dashboard.");
      navigate({ to: "/seller" });
    }
  }, [store, navigate]);

  if (authLoading || storeLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (!user) return null;

  // 3. Upgrade Flow: If user does not have the 'seller' role
  const isSeller = roles.includes("seller");

  const becomeSeller = async () => {
    setUpgrading(true);
    try {
      const {
        data: { user: authUser },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !authUser) {
        throw new Error("No authenticated user found. Please sign in again.");
      }

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
        <h2 className="text-2xl font-bold tracking-tight">{t("become_a_seller", language)}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Join Saloree's seller hub to open your store, showcase your products, and start earning.
        </p>
        <div className="mt-6">
          <Button onClick={becomeSeller} disabled={upgrading} className="w-full h-11 text-base">
            {upgrading ? "..." : t("become_a_seller", language)}
          </Button>
        </div>
      </div>
    );
  }

  // Helper function to handle input change for Name (and auto-slug generation)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setForm((f) => ({
      ...f,
      name: val,
      slug: slugify(val),
    }));
  };

  // 4. File uploads validation and action
  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "logo_url" | "banner_url",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format
    const allowedFormats = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedFormats.includes(file.type)) {
      toast.error("Unsupported file format. Please upload JPG, JPEG, PNG, or WEBP.");
      return;
    }

    // Validate size (5 MB limit)
    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size exceeds the 5 MB limit.");
      return;
    }

    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !authUser) {
      toast.error("No authenticated user found. Please sign in again.");
      return;
    }

    const bucket = field === "logo_url" ? "store-logos" : "store-banners";
    const folder = field === "logo_url" ? "logos" : "banners";

    setUploadingFiles((prev) => ({ ...prev, [field]: true }));
    try {
      const url = await storage.upload(file, { userId: authUser.id, folder, bucket });
      setForm((f) => ({ ...f, [field]: url }));
      toast.success("File uploaded successfully!");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "File upload failed.");
    } finally {
      setUploadingFiles((prev) => ({ ...prev, [field]: false }));
    }
  };

  // 5. Submit form & validate slug uniqueness
  const saveStore = async (e: React.FormEvent) => {
    e.preventDefault();

    // Retrieve active authenticated user securely
    const {
      data: { user: authUser },
      error: authError,
    } = await supabase.auth.getUser();
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
      // Validate slug uniqueness
      const { data: existingSlugStore, error: checkError } = await supabase
        .from("stores")
        .select("id")
        .eq("slug", finalSlug)
        .maybeSingle();

      if (checkError) throw checkError;

      if (existingSlugStore) {
        toast.error("This slug is already taken. Please choose another name or slug.");
        setSaving(false);
        return;
      }

      // Exact schema mapping: owner_id, name, slug, description, logo_url, banner_url
      const payload = {
        owner_id: authUser.id,
        name: form.name.trim(),
        slug: finalSlug,
        description: form.description.trim() || null,
        logo_url: form.logo_url || null,
        banner_url: form.banner_url || null,
      };

      // Log the payload to the browser console for debugging
      console.log("Inserting store payload to Supabase:", payload);

      // Insert record to Supabase
      const { error: insertError } = await supabase.from("stores").insert(payload as any);
      if (insertError) throw insertError;

      toast.success("Store created successfully!");
      qc.invalidateQueries({ queryKey: ["my-store"] });

      // Redirect to /seller
      navigate({ to: "/seller" });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create store.");
    } finally {
      setSaving(false);
    }
  };

  const isUploading = uploadingFiles.logo_url || uploadingFiles.banner_url;

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <form onSubmit={saveStore} className="grid gap-6 rounded-lg border bg-card p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {t("seller_store_settings", language)}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Set up your public profile to start listing products on Saloree.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1.5 text-sm">
            <span className="font-semibold">{t("store_name_label", language)}</span>
            <input
              required
              type="text"
              value={form.name}
              onChange={handleNameChange}
              placeholder="e.g. My Amazing Store"
              className="h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>

          <label className="grid gap-1.5 text-sm">
            <span className="font-semibold">URL slug</span>
            <input
              required
              type="text"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
              placeholder="my-amazing-store"
              className="h-10 rounded-md border border-input bg-background px-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
        </div>

        <label className="grid gap-1.5 text-sm">
          <span className="font-semibold">{t("store_description_label", language)}</span>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="Tell buyers about your shop, values, and items..."
            className="rounded-md border border-input bg-background p-3 outline-none focus:ring-2 focus:ring-ring resize-none"
          />
        </label>

        <div className="grid gap-6 sm:grid-cols-2 border-t pt-6">
          <div className="grid gap-2">
            <span className="text-sm font-semibold">Store Logo</span>
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted border flex items-center justify-center">
                {form.logo_url ? (
                  <img src={form.logo_url} alt="Logo" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-muted-foreground">No Logo</span>
                )}
              </div>
              <div className="grid gap-1">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={uploadingFiles.logo_url}
                  onChange={(e) => handleFileChange(e, "logo_url")}
                  className="text-xs text-muted-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-2.5 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/95"
                />
                <span className="text-[10px] text-muted-foreground">JPG, PNG, WEBP up to 5 MB</span>
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <span className="text-sm font-semibold">Banner Image</span>
            <div className="flex items-center gap-4">
              <div className="h-16 w-28 shrink-0 overflow-hidden rounded-md bg-muted border flex items-center justify-center">
                {form.banner_url ? (
                  <img src={form.banner_url} alt="Banner" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-muted-foreground">No Banner</span>
                )}
              </div>
              <div className="grid gap-1">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  disabled={uploadingFiles.banner_url}
                  onChange={(e) => handleFileChange(e, "banner_url")}
                  className="text-xs text-muted-foreground file:mr-2 file:rounded-md file:border-0 file:bg-primary file:px-2.5 file:py-1.5 file:text-xs file:font-semibold file:text-primary-foreground hover:file:bg-primary/95"
                />
                <span className="text-[10px] text-muted-foreground">JPG, PNG, WEBP up to 5 MB</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <Button
            type="submit"
            disabled={saving || isUploading}
            className="w-full sm:w-auto px-6 h-11 text-base font-semibold"
          >
            {saving ? "..." : isUploading ? "..." : t("seller_save", language)}
          </Button>
        </div>
      </form>
    </div>
  );
}
