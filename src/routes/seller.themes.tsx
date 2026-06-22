import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MoreHorizontal, Palette, ExternalLink, Copy, Edit2, Trash2, Globe, Smartphone, Monitor } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/seller/themes")({
  head: () => ({ meta: [{ title: "Online Store Themes — Saloree" }] }),
  component: SellerThemes,
});

// ─── Built-in themes ──────────────────────────────────────────────────────────
const BUILTIN_THEMES = [
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
    tags: ["clean", "modern", "versatile"],
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
    tags: ["elegant", "fashion", "lifestyle"],
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
    tags: ["dark", "tech", "modern"],
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
    tags: ["soft", "luxury", "feminine"],
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
    tags: ["gold", "premium", "dark"],
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
    tags: ["warm", "earthy", "cozy"],
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
    tags: ["dark", "neon", "digital"],
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
    tags: ["colorful", "grid", "marketplace"],
  },
];

// ─── Theme Preview Frame ──────────────────────────────────────────────────────
function FakeStorePreview({
  primaryColor,
  bgColor,
  accentColor,
  fontFamily,
  gradient,
  mobile,
}: {
  primaryColor: string;
  bgColor: string;
  accentColor: string;
  fontFamily: string;
  gradient: string;
  mobile?: boolean;
}) {
  const isDark = bgColor === "#0a0a0a" || bgColor === "#0f172a" || bgColor === "#0f0a1e";
  const textColor = isDark ? "#ffffff" : "#111827";

  return (
    <div
      className={`rounded-xl border overflow-hidden shadow-md flex flex-col transition-all duration-300 ${mobile ? "w-[130px] h-[210px] shrink-0" : "flex-1 h-[210px]"}`}
      style={{ background: bgColor, color: textColor, fontFamily }}
    >
      {/* Fake Navbar */}
      <div
        className="px-2 py-1.5 flex items-center justify-between"
        style={{ background: primaryColor }}
      >
        <div className="w-10 h-2 bg-white/30 rounded" />
        <div className="flex gap-1">
          <div className="w-4 h-2 bg-white/30 rounded" />
          <div className="w-4 h-2 bg-white/30 rounded" />
        </div>
      </div>
      {/* Announcement */}
      <div className="bg-black/10 py-0.5 text-[6px] text-center opacity-85">
        Free shipping on all orders over $50
      </div>
      {/* Hero banner */}
      <div
        className="py-6 px-3 text-center flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: gradient }}
      >
        <div className="text-[9px] font-bold text-white leading-tight">Spring Collection</div>
        <div className="text-[6px] text-white/70 mt-0.5 mb-1.5 max-w-[80px]">New arrivals here</div>
        <div
          className="px-2 py-0.5 rounded-full text-[5px] font-semibold"
          style={{ background: bgColor, color: primaryColor }}
        >
          Shop Now
        </div>
      </div>
      {/* Product grid */}
      <div className={`p-2 grid gap-1.5 flex-1 ${mobile ? "grid-cols-2" : "grid-cols-3"}`}>
        {[...Array(mobile ? 2 : 3)].map((_, i) => (
          <div key={i} className="border rounded p-1 flex flex-col gap-1" style={{ borderColor: primaryColor + "20", background: accentColor }}>
            <div className="h-6 rounded bg-black/5" style={{ background: primaryColor + "15" }} />
            <div className="h-1 w-2/3 rounded bg-black/10" />
            <div className="h-1 w-1/3 rounded bg-black/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Theme Preview Modal ─────────────────────────────────────────────────────
function ThemePreviewModal({
  theme,
  open,
  onClose,
  onAdd,
  adding,
}: {
  theme: (typeof BUILTIN_THEMES)[0] | null;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  adding: boolean;
}) {
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  if (!theme) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-4xl w-full p-0 gap-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-6 pt-5 pb-4 border-b flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="text-lg font-bold">{theme.name}</DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">{theme.description}</p>
          </div>
          <div className="flex items-center gap-2 ml-auto mr-4">
            <button
              onClick={() => setViewMode("desktop")}
              className={`p-1.5 rounded-md transition cursor-pointer ${viewMode === "desktop" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("mobile")}
              className={`p-1.5 rounded-md transition cursor-pointer ${viewMode === "mobile" ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onClose}>
              Close
            </Button>
            <Button size="sm" disabled={adding} onClick={onAdd}>
              {adding ? "Adding…" : "Add to Library (Free)"}
            </Button>
          </div>
        </DialogHeader>

        <div className="bg-muted/40 p-6 flex justify-center items-start min-h-[400px]">
          <div
            className={`transition-all duration-300 overflow-hidden rounded-xl shadow-2xl border border-border bg-background`}
            style={{
              width: viewMode === "mobile" ? "320px" : "100%",
              maxWidth: viewMode === "mobile" ? "320px" : "640px",
            }}
          >
            {/* Fake Theme Render */}
            <div style={{ background: theme.bgColor, color: theme.bgColor === "#0a0a0a" || theme.bgColor === "#0f172a" || theme.bgColor === "#0f0a1e" ? "#ffffff" : "#111827", fontFamily: theme.fontFamily }}>
              <div className="flex items-center gap-3 px-4 py-3" style={{ background: theme.primaryColor }}>
                <div className="w-20 h-4 bg-white/30 rounded" />
                <div className="flex-1" />
                <div className="w-12 h-4 bg-white/30 rounded" />
                <div className="w-12 h-4 bg-white/30 rounded" />
              </div>
              <div className="px-4 py-12 text-center" style={{ background: theme.gradient }}>
                <div className="text-white text-lg font-bold mb-1">Welcome to My Store</div>
                <div className="text-white/70 text-xs mb-4">Discover amazing products</div>
                <div className="inline-block px-5 py-2 rounded-full text-xs font-semibold" style={{ background: theme.bgColor, color: theme.primaryColor }}>
                  Shop Now
                </div>
              </div>
              <div className="p-4 grid grid-cols-3 gap-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="rounded-lg overflow-hidden border p-2" style={{ borderColor: theme.primaryColor + "30", background: theme.accentColor }}>
                    <div className="h-16 rounded bg-black/5" style={{ background: theme.primaryColor + "15" }} />
                    <div className="w-3/4 h-2 rounded mt-2 bg-black/20" />
                    <div className="w-1/3 h-2 rounded mt-1 bg-black/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
function SellerThemes() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();

  // State modals
  const [previewTheme, setPreviewTheme] = useState<(typeof BUILTIN_THEMES)[0] | null>(null);
  const [renameInst, setRenameInst] = useState<any | null>(null);
  const [renameName, setRenameName] = useState("");
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [publishingId, setPublishingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [addingId, setAddingId] = useState<string | null>(null);

  // Fetch seller's store
  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("stores").select("*").eq("owner_id", user!.id).maybeSingle()).data as any,
  });

  // Fetch all installed themes
  const { data: installations = [], isLoading: installationsLoading } = useQuery({
    queryKey: ["store-theme-installations", store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_theme_installations" as any)
        .select("*, store_theme_settings(*)")
        .eq("store_id", store!.id)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });

  // Automatically install minimal theme if no theme installations exist
  useEffect(() => {
    if (store?.id && !installationsLoading && installations.length === 0) {
      const autoInstallDefault = async () => {
        try {
          const defaultTheme = BUILTIN_THEMES[0]; // minimal
          const { data: inst, error: instErr } = (await supabase
            .from("store_theme_installations" as any)
            .insert({
              store_id: store.id,
              theme_id: defaultTheme.id,
              name: `${defaultTheme.name} - Published`,
              is_published: true,
            })
            .select()
            .single()) as any;

          if (instErr) throw instErr;

          const { error: settingsErr } = await supabase
            .from("store_theme_settings" as any)
            .insert({
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
              footer_text: `© ${new Date().getFullYear()} ${store.name || "My Store"}. All rights reserved.`,
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
  }, [store?.id, installations, installationsLoading, qc]);

  // Mutations
  const addThemeMutation = useMutation({
    mutationFn: async (theme: (typeof BUILTIN_THEMES)[0]) => {
      if (!store?.id) throw new Error("No store found");
      const { data: inst, error: instErr } = (await supabase
        .from("store_theme_installations" as any)
        .insert({
          store_id: store.id,
          theme_id: theme.id,
          name: theme.name,
          is_published: false,
        })
        .select()
        .single()) as any;
      if (instErr) throw instErr;

      const { error: settingsErr } = await supabase
        .from("store_theme_settings" as any)
        .insert({
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
          footer_text: `© ${new Date().getFullYear()} ${store.name || "My Store"}. All rights reserved.`,
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
    },
  });

  const publishThemeMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!store?.id) throw new Error("No store found");
      // Set all to false
      const { error: resetErr } = await supabase
        .from("store_theme_installations" as any)
        .update({ is_published: false })
        .eq("store_id", store.id);
      if (resetErr) throw resetErr;

      // Set targeted to true
      const { error: publishErr } = await supabase
        .from("store_theme_installations" as any)
        .update({ is_published: true })
        .eq("id", id);
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
    },
  });

  const duplicateThemeMutation = useMutation({
    mutationFn: async (id: string) => {
      const srcInst = installations.find((i) => i.id === id);
      if (!srcInst) throw new Error("Source theme not found");
      const srcSettings = srcInst.store_theme_settings?.[0] || {};

      const { data: newInst, error: instErr } = (await supabase
        .from("store_theme_installations" as any)
        .insert({
          store_id: store!.id,
          theme_id: srcInst.theme_id,
          name: `${srcInst.name} (Copy)`,
          is_published: false,
        })
        .select()
        .single()) as any;
      if (instErr) throw instErr;

      const { error: settingsErr } = await supabase
        .from("store_theme_settings" as any)
        .insert({
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
          social_tiktok: srcSettings.social_tiktok,
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
    },
  });

  const renameThemeMutation = useMutation({
    mutationFn: async ({ id, name }: { id: string; name: string }) => {
      const { error } = await supabase
        .from("store_theme_installations" as any)
        .update({ name, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-theme-installations", store?.id] });
      toast.success("Theme renamed! ✏️");
      setRenameInst(null);
    },
    onError: (err) => {
      toast.error("Failed to rename: " + err.message);
    },
  });

  const deleteThemeMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("store_theme_installations" as any)
        .delete()
        .eq("id", id);
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
    },
  });

  if (!user) {
    return <div className="text-center py-20 text-muted-foreground">Please sign in to manage themes.</div>;
  }

  if (!store) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground mb-4">You need a store to manage themes.</p>
        <Button onClick={() => navigate({ to: "/seller/store" })}>Create Store</Button>
      </div>
    );
  }

  const currentTheme = installations.find((i) => i.is_published);
  const draftThemes = installations.filter((i) => !i.is_published);

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground">Themes</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage and customize the look and feel of your online store.
        </p>
      </div>

      {/* 1. CURRENT THEME */}
      <section className="bg-card rounded-xl border p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h3 className="font-bold text-lg text-foreground">Current theme</h3>
            <p className="text-xs text-muted-foreground mt-0.5">This theme is live on your store.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild className="h-9 cursor-pointer">
              <a href={`/stores/${store.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                <ExternalLink className="w-3.5 h-3.5" />
                View store
              </a>
            </Button>
            <Button
              size="sm"
              onClick={() => navigate({ to: "/seller/theme-customizer", search: { id: currentTheme?.id } })}
              className="h-9 gap-1.5 cursor-pointer"
            >
              <Palette className="w-3.5 h-3.5" />
              Customize
            </Button>
            {currentTheme && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9 cursor-pointer">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => {
                      setDuplicatingId(currentTheme.id);
                      duplicateThemeMutation.mutate(currentTheme.id);
                    }}
                    disabled={duplicatingId === currentTheme.id}
                  >
                    <Copy className="w-4 h-4 mr-2" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      setRenameInst(currentTheme);
                      setRenameName(currentTheme.name);
                    }}
                  >
                    <Edit2 className="w-4 h-4 mr-2" /> Rename
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        {currentTheme ? (
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1 w-full flex items-center justify-center gap-4 bg-muted/30 p-4 rounded-xl border border-border">
              <FakeStorePreview
                primaryColor={currentTheme.store_theme_settings?.[0]?.primary_color || "#6366f1"}
                bgColor={currentTheme.store_theme_settings?.[0]?.bg_color || "#ffffff"}
                accentColor={currentTheme.store_theme_settings?.[0]?.accent_color || "#f1f5f9"}
                fontFamily={currentTheme.store_theme_settings?.[0]?.font_family || "'Inter', sans-serif"}
                gradient={BUILTIN_THEMES.find((t) => t.id === currentTheme.theme_id)?.gradient || "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)"}
              />
              <FakeStorePreview
                primaryColor={currentTheme.store_theme_settings?.[0]?.primary_color || "#6366f1"}
                bgColor={currentTheme.store_theme_settings?.[0]?.bg_color || "#ffffff"}
                accentColor={currentTheme.store_theme_settings?.[0]?.accent_color || "#f1f5f9"}
                fontFamily={currentTheme.store_theme_settings?.[0]?.font_family || "'Inter', sans-serif"}
                gradient={BUILTIN_THEMES.find((t) => t.id === currentTheme.theme_id)?.gradient || "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)"}
                mobile
              />
            </div>
            <div className="md:w-72 space-y-3 shrink-0 text-center md:text-left">
              <div>
                <h4 className="font-bold text-xl text-foreground">{currentTheme.name}</h4>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-1.5">
                  <span className="text-[10px] bg-green-500/10 text-green-500 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Published
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    Updated {new Date(currentTheme.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {BUILTIN_THEMES.find((t) => t.id === currentTheme.theme_id)?.description || ""}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-10 text-center text-muted-foreground">No published theme. Add one below.</div>
        )}
      </section>

      {/* 2. DRAFT THEMES */}
      <section className="space-y-4">
        <div>
          <h3 className="font-bold text-lg text-foreground">Theme library</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Manage draft themes before publishing them live.</p>
        </div>

        {draftThemes.length === 0 ? (
          <div className="bg-card rounded-xl border p-8 text-center text-muted-foreground text-sm">
            Your library is empty. Discover and add themes below.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {draftThemes.map((draft) => {
              const th = BUILTIN_THEMES.find((t) => t.id === draft.theme_id);
              return (
                <div key={draft.id} className="bg-card rounded-xl border p-4 flex flex-col justify-between hover:shadow-md transition gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-semibold text-sm leading-tight text-foreground truncate">{draft.name}</h4>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 cursor-pointer">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setDuplicatingId(draft.id);
                              duplicateThemeMutation.mutate(draft.id);
                            }}
                            disabled={duplicatingId === draft.id}
                          >
                            <Copy className="w-4 h-4 mr-2" /> Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setRenameInst(draft);
                              setRenameName(draft.name);
                            }}
                          >
                            <Edit2 className="w-4 h-4 mr-2" /> Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this theme draft?")) {
                                setDeletingId(draft.id);
                                deleteThemeMutation.mutate(draft.id);
                              }
                            }}
                            disabled={deletingId === draft.id}
                            className="text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      Added {new Date(draft.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs h-8 cursor-pointer"
                      onClick={() => navigate({ to: "/seller/theme-customizer", search: { id: draft.id } })}
                    >
                      Customize
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 text-xs h-8 cursor-pointer"
                      disabled={publishingId === draft.id}
                      onClick={() => {
                        setPublishingId(draft.id);
                        publishThemeMutation.mutate(draft.id);
                      }}
                    >
                      {publishingId === draft.id ? "Publishing…" : "Publish"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 3. DISCOVER THEMES */}
      <section className="space-y-4">
        <div>
          <h3 className="font-bold text-lg text-foreground">Discover themes</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Explore free templates from the Saloree Theme Store.</p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {BUILTIN_THEMES.map((theme) => {
            const isInstalled = installations.some((i) => i.theme_id === theme.id);
            return (
              <div key={theme.id} className="bg-card rounded-xl border overflow-hidden hover:shadow-lg transition flex flex-col justify-between group">
                <div className="relative h-32" style={{ background: theme.gradient }}>
                  <span className="absolute top-2 left-2 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded bg-black/35 text-white">
                    {theme.category}
                  </span>
                  <span className="absolute top-2 right-2 text-[10px] font-semibold px-2 py-0.5 rounded bg-white text-primary">
                    Free
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm text-foreground">{theme.name}</h4>
                    <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                      {theme.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 text-xs h-8 cursor-pointer" onClick={() => setPreviewTheme(theme)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 text-xs h-8 cursor-pointer"
                      disabled={addingId === theme.id}
                      onClick={() => {
                        setAddingId(theme.id);
                        addThemeMutation.mutate(theme);
                      }}
                    >
                      {addingId === theme.id ? "Adding…" : "Add"}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Rename Dialog */}
      <Dialog open={!!renameInst} onOpenChange={(v) => !v && setRenameInst(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Rename theme</DialogTitle>
            <DialogDescription>
              Enter a new name for your theme installation.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={renameName}
              onChange={(e) => setRenameName(e.target.value)}
              placeholder="My customized theme"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameInst(null)}>
              Cancel
            </Button>
            <Button
              onClick={() =>
                renameInst &&
                renameThemeMutation.mutate({ id: renameInst.id, name: renameName })
              }
              disabled={!renameName.trim()}
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Modal */}
      <ThemePreviewModal
        theme={previewTheme}
        open={!!previewTheme}
        onClose={() => setPreviewTheme(null)}
        adding={previewTheme ? addingId === previewTheme.id : false}
        onAdd={() => previewTheme && (setAddingId(previewTheme.id), addThemeMutation.mutate(previewTheme))}
      />
    </div>
  );
}
