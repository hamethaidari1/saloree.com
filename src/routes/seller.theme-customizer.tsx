import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Megaphone,
  Type,
  Image as ImageIcon,
  Sparkles,
  Layers,
  Grid,
  Info,
  Share2,
  Settings,
  ChevronLeft,
  Smartphone,
  Monitor,
  Save,
  Menu,
  Footprints,
  Eye,
  Sliders,
  Type as FontIcon,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { storage } from "@/lib/storage";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type CustomizerSearch = {
  id?: string;
};

export const Route = createFileRoute("/seller/theme-customizer")({
  validateSearch: (search: Record<string, unknown>): CustomizerSearch => {
    return {
      id: search.id as string | undefined,
    };
  },
  head: () => ({ meta: [{ title: "Theme Customizer — Saloree Seller" }] }),
  component: ThemeCustomizer,
});

// ─── Options ──────────────────────────────────────────────────────────────────
const FONT_OPTIONS = [
  { label: "Inter (Modern)", value: "'Inter', sans-serif" },
  { label: "Roboto (Clean)", value: "'Roboto', sans-serif" },
  { label: "Outfit (Friendly)", value: "'Outfit', sans-serif" },
  { label: "Playfair Display (Editorial)", value: "'Playfair Display', serif" },
  { label: "Lora (Elegant)", value: "'Lora', serif" },
  { label: "Merriweather (Warm)", value: "'Merriweather', serif" },
  { label: "Space Grotesk (Tech)", value: "'Space Grotesk', sans-serif" },
  { label: "Cormorant Garamond (Luxury)", value: "'Cormorant Garamond', serif" },
];

const LAYOUT_OPTIONS = [
  { label: "Standard (Hero + Grid)", value: "standard" },
  { label: "Full Width Hero", value: "fullwidth" },
  { label: "Sidebar Filter", value: "sidebar" },
  { label: "Magazine Style", value: "magazine" },
];

const CARD_STYLE_OPTIONS = [
  { label: "Minimal Card", value: "minimal" },
  { label: "Shadow Card", value: "shadow" },
  { label: "Bordered Card", value: "bordered" },
  { label: "Image-First Card", value: "image-first" },
];

type CustomizerSettings = {
  announcement_text: string;
  announcement_bg: string;
  announcement_text_color: string;
  show_announcement: boolean;
  logo_url: string;
  banner_url: string;
  primary_color: string;
  bg_color: string;
  accent_color: string;
  button_color: string;
  font_family: string;
  homepage_layout: string;
  card_style: string;
  hero_title: string;
  hero_subtitle: string;
  cta_text: string;
  about_title: string;
  about_text: string;
  social_instagram: string;
  social_twitter: string;
  social_facebook: string;
  social_tiktok: string;
  footer_text: string;
};

const DEFAULT_SETTINGS: CustomizerSettings = {
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
  footer_text: "",

};

// ─── Color Input Component ──────────────────────────────────────────────────
function ColorInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value || "#ffffff"}
          onChange={(e) => onChange(e.target.value)}
          className="w-7 h-7 rounded border cursor-pointer p-0"
        />
        <Input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 text-xs font-mono"
        />
      </div>
    </div>
  );
}

// ─── Center Preview Component ────────────────────────────────────────────────
function CenterPreview({
  settings,
  viewMode,
  storeName,
}: {
  settings: CustomizerSettings;
  viewMode: "desktop" | "mobile";
  storeName?: string;
}) {
  const isDark =
    settings.bg_color === "#0a0a0a" ||
    settings.bg_color === "#0f172a" ||
    settings.bg_color === "#0f0a1e";
  const textColor = isDark ? "#ffffff" : "#111827";
  const mutedTextColor = isDark ? "rgba(255, 255, 255, 0.6)" : "rgba(17, 24, 39, 0.6)";

  return (
    <div
      className={`transition-all duration-300 overflow-hidden rounded-xl border shadow-xl flex flex-col bg-background ${
        viewMode === "mobile" ? "w-[340px]" : "w-full max-w-3xl"
      }`}
      style={{
        background: settings.bg_color,
        color: textColor,
        fontFamily: settings.font_family,
        minHeight: "500px",
      }}
    >
      {/* Announcement Bar */}
      {settings.show_announcement && settings.announcement_text && (
        <div
          className="px-4 py-2 text-center text-xs font-medium transition"
          style={{ background: settings.announcement_bg, color: settings.announcement_text_color }}
        >
          {settings.announcement_text}
        </div>
      )}

      {/* Header / Navbar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ background: settings.primary_color, color: "#ffffff" }}
      >
        <div className="flex items-center gap-2">
          {settings.logo_url ? (
            <img src={settings.logo_url} className="h-6 w-6 object-cover rounded" alt="logo" />
          ) : (
            <div className="w-5 h-5 rounded bg-white/20 flex items-center justify-center font-bold text-xs">
              S
            </div>
          )}
          <span className="font-bold text-sm">Storefront</span>
        </div>
        <div className="flex gap-3 text-[10px] font-medium text-white/90">
          <span>Home</span>
          <span>Catalog</span>
          <span>About</span>
        </div>
      </div>

      {/* Hero Banner */}
      <div
        className="relative overflow-hidden py-16 px-6 text-center flex flex-col items-center justify-center border-b"
        style={{
          background: settings.banner_url
            ? `url(${settings.banner_url}) center/cover no-repeat`
            : `linear-gradient(135deg, ${settings.primary_color}, ${settings.accent_color})`,
        }}
      >
        {settings.banner_url && <div className="absolute inset-0 bg-black/50" />}
        <div className="relative z-10 max-w-md space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight">
            {settings.hero_title || "Welcome to My Store"}
          </h2>
          <p className="text-white/80 text-xs leading-relaxed">
            {settings.hero_subtitle || "Discover amazing products curated just for you"}
          </p>
          <button
            className="px-5 py-2 rounded-full text-xs font-semibold text-white shadow transition active:scale-95 cursor-pointer"
            style={{ background: settings.button_color }}
          >
            {settings.cta_text || "Shop Now"}
          </button>
        </div>
      </div>

      {/* Categories Strip */}
      <div className="px-4 py-4 border-b bg-black/5">
        <p className="text-[10px] uppercase font-bold tracking-wider mb-2" style={{ color: settings.primary_color }}>
          Featured Categories
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["Electronics", "Fashion", "Beauty", "Home"].map((cat) => (
            <span
              key={cat}
              className="px-3 py-1 rounded-full text-[10px] font-semibold border shrink-0 bg-white"
              style={{
                color: settings.primary_color,
                borderColor: settings.primary_color + "30",
              }}
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      <div className="p-4 space-y-3">
        <p className="text-xs font-bold" style={{ color: settings.primary_color }}>
          Featured Products
        </p>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: viewMode === "mobile" ? "1fr 1fr" : "repeat(3, 1fr)" }}
        >
          {[...Array(viewMode === "mobile" ? 4 : 6)].map((_, i) => (
            <div
              key={i}
              className={`overflow-hidden border p-2 flex flex-col justify-between ${
                settings.card_style === "bordered"
                  ? "border-2 rounded-xl"
                  : settings.card_style === "shadow"
                  ? "rounded-xl shadow-sm border"
                  : settings.card_style === "image-first"
                  ? "rounded-2xl"
                  : "rounded"
              }`}
              style={{
                background: settings.accent_color,
                borderColor: settings.primary_color + "20",
              }}
            >
              <div
                className="h-20 rounded bg-black/5 flex items-center justify-center text-[10px] text-muted-foreground"
                style={{ background: settings.primary_color + "10" }}
              >
                Product Image
              </div>
              <div className="mt-2 space-y-1">
                <div
                  className="h-2.5 rounded w-3/4 bg-black/15"
                  style={{ background: settings.primary_color + "30" }}
                />
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[10px] font-bold">$49.99</span>
                  <span
                    className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] text-white"
                    style={{ background: settings.button_color }}
                  >
                    +
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      {settings.about_title && (
        <div className="p-6 border-t bg-black/5 text-center space-y-2">
          <h3 className="font-bold text-sm">{settings.about_title}</h3>
          <p className="text-[11px] max-w-md mx-auto leading-relaxed" style={{ color: mutedTextColor }}>
            {settings.about_text}
          </p>
        </div>
      )}

      {/* Footer */}
      <div
        className="mt-auto px-4 py-6 border-t flex flex-col items-center justify-center gap-3 text-center"
        style={{ background: settings.primary_color + "10" }}
      >
        {/* Social Icons */}
        <div className="flex gap-2">
          {["instagram", "twitter", "facebook", "tiktok"].map((social) => {
            const hasLink = (settings as any)[`social_${social}`];
            return (
              <span
                key={social}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] text-white bg-white/20"
                style={{
                  background: hasLink ? settings.primary_color : "rgba(0,0,0,0.1)",
                  opacity: hasLink ? 1 : 0.4,
                }}
              >
                {social.charAt(0).toUpperCase()}
              </span>
            );
          })}
        </div>
        <p className="text-[10px]" style={{ color: mutedTextColor }}>
          © {new Date().getFullYear()} {storeName || "Store"}, Powered by Saloree
        </p>
      </div>
    </div>
  );
}

// ─── Main Customizer Component ────────────────────────────────────────────────
function ThemeCustomizer() {
  const { user } = useAuth();
  const qc = useQueryClient();
  const navigate = useNavigate();
  const { id } = Route.useSearch();

  const [activeSection, setActiveSection] = useState<string>("announcement");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");
  const [settings, setSettings] = useState<CustomizerSettings>(DEFAULT_SETTINGS);
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);

  // Fetch store
  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("stores").select("*").eq("owner_id", user!.id).maybeSingle()).data,
  });

  // Fetch installation settings
  const { data: installData, isLoading: installLoading } = useQuery({
    queryKey: ["customizer-installation", id, store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      // If we have a specific ID, load it
      if (id) {
        const { data, error } = await supabase
          .from("store_theme_installations" as any)
          .select("*, store_theme_settings(*)")
          .eq("id", id)
          .maybeSingle();
        if (error) throw error;
        return data as any;
      }
      // Otherwise load published
      const { data, error } = await supabase
        .from("store_theme_installations" as any)
        .select("*, store_theme_settings(*)")
        .eq("store_id", store!.id)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

  useEffect(() => {
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
        footer_text: jsonSettings.footer_text ?? dbSettings.footer_text ?? prev.footer_text,
      }));
      setLogoUrl(dbSettings.logo_url || "");
      setBannerUrl(dbSettings.banner_url || "");
    }
  }, [installData]);

  // Save Settings Mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      const installationId = id || installData?.id;
      if (!installationId) throw new Error("No theme installation selected.");

      // Build payload — split into core columns and JSONB settings
      const { footer_text: _ignored, logo_url: _logo, banner_url: _banner, primary_color: _primary, bg_color: _bg, ...optionalSettings } = settings;
      const payload = {
        theme_installation_id: installationId,
        logo_url: logoUrl,
        banner_url: bannerUrl,
        primary_color: settings.primary_color,
        bg_color: settings.bg_color,
        settings: {
          ...optionalSettings,
          footer_text: `\u00a9 ${new Date().getFullYear()} ${store?.name || "Store"}, Powered by Saloree`,
        },
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("store_theme_settings" as any)
        .upsert({
          ...payload,
          created_at: installData?.store_theme_settings?.[0]?.created_at || new Date().toISOString(),
        }, { onConflict: "theme_installation_id" });

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["customizer-installation"] });
      qc.invalidateQueries({ queryKey: ["store-theme-installations"] });
      toast.success("Theme settings saved successfully! 🎨");
    },
    onError: (err: any) => {
      console.error("[RLS Failure Log] Table: store_theme_settings, Policy: Owner updates/inserts store_theme_settings, Error Details:", {
        message: err?.message,
        details: err?.details,
        hint: err?.hint,
        code: err?.code,
        fullError: err
      });
      toast.error("Failed to save: " + err.message);
    },
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: "logo" | "banner") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "logo") setUploadingLogo(true);
    else setUploadingBanner(true);

    try {
      const bucket = type === "logo" ? "store-logos" : "store-banners";
      const folder = type === "logo" ? "logos" : "banners";
      
      // Verification helper checks before upload
      console.log(`[Storage Upload] Verifying parameters:`, {
        bucket,
        folder,
        userId: user?.id,
        userLoggedIn: !!user,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type
      });

      const url = await storage.upload(file, { userId: user!.id, folder, bucket });

      if (type === "logo") setLogoUrl(url);
      else setBannerUrl(url);

      toast.success("Image uploaded!");
    } catch (err: any) {
      console.error("Supabase Storage Upload Error Details:", {
        message: err?.message || "No error message",
        details: err?.details || "No details",
        hint: err?.hint || "No hint",
        statusCode: err?.status || err?.statusCode || err?.status_code || "No status code",
        fullError: err
      });
      // Propagate the real message instead of generic "Upload failed."
      toast.error(err?.message || "Upload failed.");
      // Do not swallow: rethrow/propagate if needed, but since it's a UI handler, logging and displaying it is standard.
    } finally {
      if (type === "logo") setUploadingLogo(false);
      else setUploadingBanner(false);
    }
  };

  const setVal = (key: keyof CustomizerSettings) => (v: any) =>
    setSettings((s) => ({ ...s, [key]: v }));

  if (!user || !store) {
    return <div className="text-center py-20 text-muted-foreground">Please sign in first.</div>;
  }

  if (installLoading) {
    return <div className="text-center py-20 text-muted-foreground">Loading theme customizer…</div>;
  }

  const sectionsList = [
    { id: "announcement", label: "Announcement bar", icon: Megaphone },
    { id: "header", label: "Header", icon: Menu },
    { id: "hero", label: "Hero banner", icon: ImageIcon },
    { id: "featured_products", label: "Featured products", icon: Sparkles },
    { id: "categories", label: "Categories", icon: Layers },
    { id: "product_grid", label: "Product grid", icon: Grid },
    { id: "about", label: "About store", icon: Info },
    { id: "social", label: "Social links", icon: Share2 },
    { id: "general", label: "Colors & Fonts", icon: Sliders },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] bg-card border rounded-xl overflow-hidden shadow">
      {/* Header bar */}
      <div className="px-4 py-3 border-b flex items-center justify-between bg-muted/20 shrink-0">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate({ to: "/seller/themes" })} className="h-8 gap-1.5 cursor-pointer">
            <ChevronLeft className="w-4 h-4" /> Back
          </Button>
          <span className="h-4 w-px bg-border" />
          <div>
            <h3 className="font-bold text-sm text-foreground leading-none">
              {installData?.name || "Theme Customizer"}
            </h3>
            <span className="text-[10px] text-muted-foreground">
              Editing: {installData?.is_published ? "Live theme" : "Draft theme"}
            </span>
          </div>
        </div>

        {/* View mode buttons */}
        <div className="flex items-center gap-1.5 bg-muted p-0.5 rounded-lg">
          <button
            onClick={() => setViewMode("desktop")}
            className={`p-1.5 rounded transition cursor-pointer ${
              viewMode === "desktop" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Monitor className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode("mobile")}
            className={`p-1.5 rounded transition cursor-pointer ${
              viewMode === "mobile" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Smartphone className="w-4 h-4" />
          </button>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="h-8 text-xs cursor-pointer">
            <a href={`/stores/${store.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" /> Preview Store
            </a>
          </Button>
          <Button size="sm" onClick={() => saveMutation.mutate()} disabled={saveMutation.isPending} className="h-8 text-xs gap-1.5 cursor-pointer">
            <Save className="w-3.5 h-3.5" />
            {saveMutation.isPending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      {/* Editor columns */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] divide-x border-t">
        {/* Left Side: Sections Selection */}
        <div className="overflow-y-auto p-4 space-y-4 bg-muted/10">
          <h4 className="font-bold text-xs uppercase text-muted-foreground tracking-wider mb-2">Sections</h4>
          <nav className="flex flex-col gap-1 text-sm">
            {sectionsList.map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-2 font-medium transition cursor-pointer ${
                    activeSection === sec.id
                      ? "bg-primary-soft text-primary font-semibold"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{sec.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Center: Live Preview frame */}
        <div className="overflow-y-auto p-6 bg-muted/40 flex justify-center items-start min-h-[400px]">
          <CenterPreview settings={settings} viewMode={viewMode} storeName={store?.name || "Store"} />
        </div>

        {/* Right Side: Configuration Editor */}
        <div className="overflow-y-auto p-5 bg-card space-y-6">
          <div className="border-b pb-3">
            <h4 className="font-bold text-sm text-foreground">
              {sectionsList.find((s) => s.id === activeSection)?.label} Settings
            </h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Customize properties below</p>
          </div>

          {activeSection === "announcement" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="show_ann" className="text-xs">Show announcement bar</Label>
                <Switch
                  id="show_ann"
                  checked={settings.show_announcement}
                  onCheckedChange={setVal("show_announcement")}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Announcement text</Label>
                <Input
                  value={settings.announcement_text}
                  onChange={(e) => setVal("announcement_text")(e.target.value)}
                  placeholder="Free shipping!"
                />
              </div>
              <ColorInput
                label="Background Color"
                value={settings.announcement_bg}
                onChange={setVal("announcement_bg")}
              />
              <ColorInput
                label="Text Color"
                value={settings.announcement_text_color}
                onChange={setVal("announcement_text_color")}
              />
            </div>
          )}

          {activeSection === "header" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Store Logo</Label>
                {logoUrl && (
                  <img src={logoUrl} className="h-16 w-16 object-cover rounded border" alt="preview" />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  disabled={uploadingLogo}
                  onChange={(e) => handleUpload(e, "logo")}
                  className="text-xs cursor-pointer"
                />
              </div>
            </div>
          )}

          {activeSection === "hero" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs">Hero Banner Image</Label>
                {bannerUrl && (
                  <img src={bannerUrl} className="h-16 w-32 object-cover rounded border" alt="preview" />
                )}
                <Input
                  type="file"
                  accept="image/*"
                  disabled={uploadingBanner}
                  onChange={(e) => handleUpload(e, "banner")}
                  className="text-xs cursor-pointer"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Hero Title</Label>
                <Input
                  value={settings.hero_title}
                  onChange={(e) => setVal("hero_title")(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Hero Subtitle</Label>
                <Textarea
                  value={settings.hero_subtitle}
                  onChange={(e) => setVal("hero_subtitle")(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">CTA Button Text</Label>
                <Input
                  value={settings.cta_text}
                  onChange={(e) => setVal("cta_text")(e.target.value)}
                />
              </div>
            </div>
          )}

          {activeSection === "featured_products" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Product Card Style</Label>
                <select
                  value={settings.card_style}
                  onChange={(e) => setVal("card_style")(e.target.value)}
                  className="w-full rounded-md border border-input h-9 px-3 text-sm bg-background"
                >
                  {CARD_STYLE_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeSection === "categories" && (
            <div className="text-xs text-muted-foreground p-3 bg-muted/40 rounded">
              Categories strip displays active collections/categories on your store automatically based on your products.
            </div>
          )}

          {activeSection === "product_grid" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Homepage Layout</Label>
                <select
                  value={settings.homepage_layout}
                  onChange={(e) => setVal("homepage_layout")(e.target.value)}
                  className="w-full rounded-md border border-input h-9 px-3 text-sm bg-background"
                >
                  {LAYOUT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {activeSection === "about" && (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Label className="text-xs">About Title</Label>
                <Input
                  value={settings.about_title}
                  onChange={(e) => setVal("about_title")(e.target.value)}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">About Text</Label>
                <Textarea
                  value={settings.about_text}
                  onChange={(e) => setVal("about_text")(e.target.value)}
                  rows={5}
                />
              </div>
            </div>
          )}

          {activeSection === "social" && (
            <div className="space-y-4">
              {["instagram", "twitter", "facebook", "tiktok"].map((social) => (
                <div key={social} className="space-y-1.5">
                  <Label className="text-xs uppercase font-medium">{social}</Label>
                  <Input
                    value={(settings as any)[`social_${social}`] || ""}
                    onChange={(e) => setVal(`social_${social}` as any)(e.target.value)}
                    placeholder={`https://${social}.com/...`}
                  />
                </div>
              ))}
            </div>
          )}



          {activeSection === "general" && (
            <div className="space-y-4">
              <ColorInput
                label="Primary Brand Color"
                value={settings.primary_color}
                onChange={setVal("primary_color")}
              />
              <ColorInput
                label="Background Color"
                value={settings.bg_color}
                onChange={setVal("bg_color")}
              />
              <ColorInput
                label="Accent / Card Background"
                value={settings.accent_color}
                onChange={setVal("accent_color")}
              />
              <ColorInput
                label="Button Color"
                value={settings.button_color}
                onChange={setVal("button_color")}
              />
              <div className="space-y-1.5 mt-2">
                <Label className="text-xs">Font Family</Label>
                <select
                  value={settings.font_family}
                  onChange={(e) => setVal("font_family")(e.target.value)}
                  className="w-full rounded-md border border-input h-9 px-3 text-sm bg-background"
                >
                  {FONT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
