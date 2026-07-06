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
    isFree: true,
    price: 0,
    previewImage: "/src/assets/saloree_minimal_theme_preview_1782422811157.png",
    benefit: "Best for clean and minimalistic catalog layout structures.",
    features: ["Responsive design", "Fast loading", "Custom colors", "Mobile optimized"],
    isPopular: false,
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
    isFree: true,
    price: 0,
    previewImage: "/src/assets/saloree_fashion_theme_preview_1782422824021.png",
    benefit: "Immersive editorial visuals designed specifically for fashion lines.",
    features: ["Responsive design", "Fast loading", "Custom colors", "Mobile optimized"],
    isPopular: true,
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
    isFree: true,
    price: 0,
    previewImage: "/src/assets/saloree_electronics_theme_preview_1782422835384.png",
    benefit: "High-contrast dark layout prioritizing technical specifications.",
    features: ["Responsive design", "Fast loading", "Custom colors", "Mobile optimized"],
    isPopular: false,
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
    isFree: false,
    price: 30.99,
    previewImage: "/src/assets/saloree_premium_theme_preview_1782422849406.png",
    benefit: "Soft, warm tones crafted to highlight premium beauty and cosmetics.",
    features: ["Responsive design", "Fast loading", "Custom colors", "Mobile optimized"],
    isPopular: false,
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
    isFree: false,
    price: 60.00,
    previewImage: "/src/assets/saloree_premium_theme_preview_1782422849406.png",
    benefit: "Sleek gold-on-black layout for high-end boutique brands.",
    features: ["Responsive design", "Fast loading", "Custom colors", "Mobile optimized"],
    isPopular: false,
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
    isFree: false,
    price: 30.99,
    previewImage: "/src/assets/saloree_premium_theme_preview_1782422849406.png",
    benefit: "Cozy layout styling designed for home furniture and decor.",
    features: ["Responsive design", "Fast loading", "Custom colors", "Mobile optimized"],
    isPopular: false,
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
    isFree: false,
    price: 45.99,
    previewImage: "/src/assets/saloree_premium_theme_preview_1782422849406.png",
    benefit: "Cyberpunk neon vibes built to maximize digital download sales.",
    features: ["Responsive design", "Fast loading", "Custom colors", "Mobile optimized"],
    isPopular: false,
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
    isFree: false,
    price: 45.99,
    previewImage: "/src/assets/saloree_premium_theme_preview_1782422849406.png",
    benefit: "High-density product grid format for large catalog marketplaces.",
    features: ["Responsive design", "Fast loading", "Custom colors", "Mobile optimized"],
    isPopular: false,
  },
];

// ─── Theme Preview Frame ──────────────────────────────────────────────────────
function FakeStorePreview({
  themeId,
  primaryColor,
  bgColor,
  accentColor,
  fontFamily,
  gradient,
  mobile,
}: {
  themeId: string;
  primaryColor: string;
  bgColor: string;
  accentColor: string;
  fontFamily: string;
  gradient: string;
  mobile?: boolean;
}) {
  const isDark = bgColor === "#0a0a0a" || bgColor === "#0f172a" || bgColor === "#0f0a1e" || themeId === "saloree-luxury" || themeId === "saloree-electronics" || themeId === "saloree-digital";
  const textColor = isDark ? "#ffffff" : "#1f2937";

  const isFashion = themeId === "saloree-fashion";
  const isElectronics = themeId === "saloree-electronics";
  const isBeauty = themeId === "saloree-beauty";
  const isLuxury = themeId === "saloree-luxury";
  const isHome = themeId === "saloree-home";
  const isDigital = themeId === "saloree-digital";

  return (
    <div
      className={`rounded-xl border overflow-hidden shadow-sm hover:shadow-md flex flex-col transition-all duration-300 select-none relative ${
        mobile ? "w-[125px] h-[200px] shrink-0" : "flex-1 h-[200px]"
      }`}
      style={{
        background: isLuxury ? "#0d0d0d" : isElectronics ? "#0b0f19" : isDigital ? "#0a0714" : bgColor,
        color: textColor,
        fontFamily: fontFamily,
        borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
      }}
    >
      {/* Fake Header */}
      <div
        className="px-2 py-1.5 flex items-center justify-between border-b"
        style={{
          background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
          borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
        }}
      >
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: primaryColor }} />
          <span className="text-[6px] font-bold tracking-tight" style={{ color: isDark ? "#ffffff" : "#111827" }}>
            {themeId === "saloree-minimal" ? "Minimal" : isFashion ? "Fashion" : isElectronics ? "Electro" : isBeauty ? "Beauty" : isLuxury ? "Luxury" : isHome ? "Home" : isDigital ? "Digital" : "Classic"}
          </span>
        </div>
        <div className="flex gap-1.5 text-[5px] font-medium opacity-80 scale-90 origin-right">
          <span>Shop</span>
          <span>About</span>
        </div>
      </div>

      {/* Announcement Bar */}
      {isFashion && (
        <div className="py-0.5 text-[4.5px] text-center uppercase tracking-wider text-white" style={{ background: primaryColor }}>
          MID-SEASON SALE: 30% OFF
        </div>
      )}
      {isElectronics && (
        <div className="py-0.5 text-[4.5px] text-center text-cyan-400 bg-cyan-950/40 border-b border-cyan-500/20 font-mono">
          ⚡ NEXT-GEN TECH IN STOCK
        </div>
      )}

      {/* Hero Banner Area */}
      <div
        className="py-4 px-2.5 text-center flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          background: gradient,
          minHeight: "55px",
        }}
      >
        <div className="absolute inset-0 bg-black/10 opacity-30 mix-blend-overlay" />
        <div className="relative z-10">
          <div className="text-[8px] font-extrabold text-white leading-tight uppercase tracking-wider">
            {isFashion ? "Summer Style" : isElectronics ? "Cyber Tech" : isLuxury ? "Golden Class" : isBeauty ? "Pure Glow" : isDigital ? "Neo Assets" : "New Collection"}
          </div>
          <div className="text-[5px] text-white/80 mt-0.5 mb-1.5 max-w-[90px] mx-auto scale-90 leading-tight">
            {isLuxury ? "Exquisite craft" : "Premium products"}
          </div>
          <div
            className="px-2 py-0.5 rounded-sm text-[4.5px] font-bold shadow-xs inline-block transition transform active:scale-95"
            style={{ background: "#ffffff", color: isDark ? "#111827" : primaryColor }}
          >
            Explore
          </div>
        </div>
      </div>

      {/* Product List/Grid */}
      <div className={`p-2 grid gap-1.5 flex-1 overflow-hidden ${mobile ? "grid-cols-2" : "grid-cols-3"}`}>
        {[...Array(mobile ? 2 : 3)].map((_, i) => (
          <div
            key={i}
            className="rounded p-1 flex flex-col gap-1 border"
            style={{
              borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
              background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.015)",
            }}
          >
            <div
              className="h-8 rounded relative overflow-hidden flex items-center justify-center bg-gray-50"
              style={{
                background: isFashion ? "#fce7f3" : isElectronics ? "#1e293b" : isLuxury ? "#1f1a0e" : isBeauty ? "#ffedd5" : isDigital ? "#120924" : accentColor,
              }}
            >
              <div className="text-[5px] font-bold opacity-40">
                {isFashion ? "👗" : isElectronics ? "💻" : isLuxury ? "⌚" : isBeauty ? "💄" : isHome ? "🛋️" : isDigital ? "🎮" : "📦"}
              </div>
            </div>
            <div className="h-1 w-2/3 rounded bg-black/10" style={{ background: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" }} />
            <div className="flex justify-between items-center mt-0.5">
              <div className="h-1 w-1/3 rounded bg-black/5" style={{ background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" }} />
              <div className="text-[5.5px] font-black" style={{ color: primaryColor }}>
                {isLuxury ? "$150" : isFashion ? "$45" : "$29"}
              </div>
            </div>
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
  isInstalled,
}: {
  theme: (typeof BUILTIN_THEMES)[0] | null;
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  adding: boolean;
  isInstalled: boolean;
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
            {isInstalled ? (
              <Button size="sm" disabled>
                Installed
              </Button>
            ) : theme.isFree ? (
              <Button size="sm" disabled={adding} onClick={onAdd}>
                {adding ? "Adding…" : "Add to Library (Free)"}
              </Button>
            ) : (
              <Button size="sm" onClick={onAdd}>
                Buy Theme (${theme.price.toFixed(2)})
              </Button>
            )}
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
              {/* Footer */}
              <div
                className="px-4 py-4 border-t text-center text-[10px] text-muted-foreground mt-4"
                style={{ background: theme.primaryColor + "10" }}
              >
                © {new Date().getFullYear()} Store, Powered by Saloree
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
  const [buyModalTheme, setBuyModalTheme] = useState<(typeof BUILTIN_THEMES)[0] | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch seller's store
  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("stores").select("*").eq("owner_id", user!.id).maybeSingle()).data as any,
  });

  // Fetch all installed themes — deduplicate by theme_id client-side as extra safety layer
  const { data: rawInstallations = [], isLoading: installationsLoading } = useQuery({
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

  // Client-side dedup: keep only the first (most-recently-updated) record per theme_id
  const installations = (() => {
    const seen = new Set<string>();
    return rawInstallations.filter((inst) => {
      if (seen.has(inst.theme_id)) return false;
      seen.add(inst.theme_id);
      return true;
    });
  })();

  // Set of installed theme IDs for O(1) lookup
  const installedThemeIds = new Set(installations.map((i) => i.theme_id));

  // Automatically install minimal theme if no theme installations exist at all
  useEffect(() => {
    if (store?.id && !installationsLoading && rawInstallations.length === 0) {
      const autoInstallDefault = async () => {
        try {
          const defaultTheme = BUILTIN_THEMES[0]; // minimal

          // Guard: check DB directly to avoid race conditions
          const { data: existing } = await supabase
            .from("store_theme_installations" as any)
            .select("id")
            .eq("store_id", store.id)
            .eq("theme_id", defaultTheme.id)
            .maybeSingle();
          if (existing) {
            // Already in DB — just refresh
            qc.invalidateQueries({ queryKey: ["store-theme-installations", store.id] });
            return;
          }

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
          console.log("Auto-installing default theme:", inst);

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
              footer_text: `© ${new Date().getFullYear()} ${store.name || "Store"}, Powered by Saloree`,
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
  }, [store?.id, rawInstallations.length, installationsLoading, qc]);

  // Mutations
  const addThemeMutation = useMutation({
    mutationFn: async (theme: (typeof BUILTIN_THEMES)[0]) => {
      if (!store?.id) throw new Error("No store found");

      // ── Duplicate guard: check DB before inserting ─────────────────────────
      const { data: existing } = await supabase
        .from("store_theme_installations" as any)
        .select("id")
        .eq("store_id", store.id)
        .eq("theme_id", theme.id)
        .maybeSingle();

      if (existing) {
        throw new Error("__ALREADY_INSTALLED__");
      }

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
      console.log("Adding new theme:", inst);
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
          footer_text: `© ${new Date().getFullYear()} ${store.name || "Store"}, Powered by Saloree`,
        });
      if (settingsErr) throw settingsErr;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-theme-installations", store?.id] });
      toast.success("Theme added to your library! 📦");
      setAddingId(null);
      setPreviewTheme(null);
    },
    onError: (err: Error) => {
      if (err.message === "__ALREADY_INSTALLED__") {
        toast.info("Theme already installed.");
      } else {
        toast.error("Failed to add theme: " + err.message);
      }
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
    <div className="space-y-10 max-w-6xl mx-auto pb-20">
      {/* ── Page Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Palette className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Theme Store</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage, customize, and discover themes for your Saloree store.
          </p>
        </div>
        <a
          href={`/stores/${store.slug}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 hover:text-indigo-700 border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 px-3.5 py-2 rounded-xl transition shrink-0"
        >
          <Globe className="w-3.5 h-3.5" />
          View Live Store
        </a>
      </div>

      {/* ── 1. CURRENT THEME ───────────────────────────────────────────── */}
      <section className="bg-card rounded-2xl border shadow-sm overflow-hidden">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b bg-muted/20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <div>
              <h3 className="font-bold text-base text-foreground">Current theme</h3>
              <p className="text-xs text-muted-foreground">This theme is live on your store.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => navigate({ to: "/seller/theme-customizer", search: { id: currentTheme?.id } })}
              className="h-9 gap-1.5 cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
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

        {currentTheme ? (() => {
          const builtinTheme = BUILTIN_THEMES.find((t) => t.id === currentTheme.theme_id);
          const primaryColor = currentTheme.store_theme_settings?.[0]?.primary_color || "#6366f1";
          const bgColor = currentTheme.store_theme_settings?.[0]?.bg_color || "#ffffff";
          const accentColor = currentTheme.store_theme_settings?.[0]?.accent_color || "#f1f5f9";
          const fontFamily = currentTheme.store_theme_settings?.[0]?.font_family || "'Inter', sans-serif";
          const gradient = builtinTheme?.gradient || "linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)";

          return (
            <div className="p-6 flex flex-col lg:flex-row items-start gap-6">
              {/* Desktop + Mobile Previews */}
              <div className="flex-1 w-full">
                {/* Browser frame wrapper */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 shadow-inner">
                  <div className="flex items-center gap-1.5 mb-3">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-green-400" />
                    <div className="flex-1 mx-3 h-5 bg-white border border-slate-200 rounded-md flex items-center px-2.5">
                      <span className="text-[9px] text-slate-400 font-mono truncate">saloree.com/stores/{store.slug}</span>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-3">
                    {/* Desktop mockup */}
                    <div className="flex-1">
                      <FakeStorePreview
                        themeId={currentTheme.theme_id}
                        primaryColor={primaryColor}
                        bgColor={bgColor}
                        accentColor={accentColor}
                        fontFamily={fontFamily}
                        gradient={gradient}
                      />
                    </div>
                    {/* Mobile mockup */}
                    <div className="shrink-0 flex items-stretch">
                      <div className="bg-slate-800 rounded-[14px] p-1.5 shadow-md border-2 border-slate-700">
                        <FakeStorePreview
                          themeId={currentTheme.theme_id}
                          primaryColor={primaryColor}
                          bgColor={bgColor}
                          accentColor={accentColor}
                          fontFamily={fontFamily}
                          gradient={gradient}
                          mobile
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Theme Info Panel */}
              <div className="lg:w-64 space-y-4 shrink-0">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1 text-[10px] bg-green-500/10 text-green-600 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider border border-green-500/20">
                      ● Live
                    </span>
                    {builtinTheme && (
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider">
                        {builtinTheme.category}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-lg text-foreground leading-tight">{currentTheme.name}</h4>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Updated {new Date(currentTheme.updated_at).toLocaleDateString()}
                  </p>
                </div>

                {builtinTheme && (
                  <p className="text-xs text-muted-foreground leading-relaxed border-l-2 border-indigo-200 pl-3">
                    {builtinTheme.description}
                  </p>
                )}

                {/* Color swatches */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Colors</p>
                  <div className="flex gap-2">
                    {[primaryColor, bgColor, accentColor].map((c, i) => (
                      <div
                        key={i}
                        title={c}
                        className="w-6 h-6 rounded-full border-2 border-white shadow-sm ring-1 ring-black/10"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="w-full h-9 text-xs font-semibold cursor-pointer"
                >
                  <a href={`/stores/${store.slug}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5" />
                    View Live Store
                  </a>
                </Button>
              </div>
            </div>
          );
        })() : (
          <div className="py-14 text-center text-muted-foreground px-6">
            <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
              <Palette className="w-6 h-6 text-muted-foreground/50" />
            </div>
            <p className="text-sm font-medium">No published theme</p>
            <p className="text-xs text-muted-foreground mt-1">Add a theme from the library below to get started.</p>
          </div>
        )}
      </section>

      {/* ── 2. THEME LIBRARY ───────────────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="font-bold text-lg text-foreground">Theme library</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Manage draft themes before publishing them live.</p>
          </div>
          {draftThemes.length > 0 && (
            <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2.5 py-1 rounded-full">
              {draftThemes.length} draft{draftThemes.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {draftThemes.length === 0 ? (
          <div className="bg-card rounded-2xl border border-dashed p-10 text-center text-muted-foreground text-sm">
            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center mx-auto mb-3">
              <Palette className="w-5 h-5 opacity-40" />
            </div>
            Your library is empty. Discover and add themes below.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {draftThemes.map((draft) => {
              const th = BUILTIN_THEMES.find((t) => t.id === draft.theme_id);
              return (
                <div
                  key={draft.id}
                  className="bg-card rounded-2xl border overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group"
                >
                  {/* Mini mockup preview */}
                  {th && (
                    <div className="relative bg-slate-50 border-b px-3 pt-3 pb-2">
                      <div className="flex items-center gap-1 mb-2">
                        <span className="w-1 h-1 rounded-full bg-red-400" />
                        <span className="w-1 h-1 rounded-full bg-amber-400" />
                        <span className="w-1 h-1 rounded-full bg-green-400" />
                        <div className="flex-1 mx-2 h-3.5 bg-white border border-slate-100 rounded text-[5px] font-mono text-slate-300 flex items-center px-1 truncate">
                          saloree.com
                        </div>
                      </div>
                      <div className="h-24 overflow-hidden rounded-lg">
                        <FakeStorePreview
                          themeId={th.id}
                          primaryColor={th.primaryColor}
                          bgColor={th.bgColor}
                          accentColor={th.accentColor}
                          fontFamily={th.fontFamily}
                          gradient={th.gradient}
                        />
                      </div>
                    </div>
                  )}

                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm leading-tight text-foreground truncate">{draft.name}</h4>
                        <p className="text-[11px] text-muted-foreground mt-0.5">
                          Added {new Date(draft.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 shrink-0 cursor-pointer">
                            <MoreHorizontal className="w-3.5 h-3.5" />
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

                    <div className="flex items-center gap-2 mt-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 text-xs h-9 cursor-pointer font-semibold"
                        onClick={() => navigate({ to: "/seller/theme-customizer", search: { id: draft.id } })}
                      >
                        Customize
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 text-xs h-9 cursor-pointer font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
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
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── 3. DISCOVER THEMES ──────────────────────────────────────────── */}
      <section className="space-y-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-xl text-foreground">Discover themes</h3>
            <p className="text-sm text-muted-foreground mt-0.5">
              Explore premium designs from the Saloree Theme Store.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-60">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <Input
              type="text"
              placeholder="Search themes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-9 pl-8 pr-8 text-sm rounded-xl border-slate-200 focus:border-indigo-300 focus:ring-indigo-100"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground text-xs font-bold w-4 h-4 flex items-center justify-center rounded"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "All Themes", emoji: "🏪" },
            { id: "free", label: "Free", emoji: "🎁" },
            { id: "premium", label: "Premium", emoji: "✦" },
            { id: "Fashion", label: "Fashion", emoji: "👗" },
            { id: "Electronics", label: "Electronics", emoji: "💻" },
            { id: "Luxury", label: "Luxury", emoji: "⌚" },
            { id: "Marketplace", label: "Marketplace", emoji: "🛍️" },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActiveFilter(btn.id)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full border transition-all duration-150 cursor-pointer ${
                activeFilter === btn.id
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              <span>{btn.emoji}</span>
              {btn.label}
            </button>
          ))}
        </div>

        {/* Themes Grid */}
        {(() => {
          const filteredThemes = BUILTIN_THEMES.filter((theme) => {
            // Search filter
            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase();
              if (
                !theme.name.toLowerCase().includes(q) &&
                !theme.description.toLowerCase().includes(q) &&
                !theme.category.toLowerCase().includes(q)
              ) {
                return false;
              }
            }

            // Category/Price filters
            if (activeFilter === "free") return theme.isFree;
            if (activeFilter === "premium") return !theme.isFree;
            if (activeFilter !== "all") {
              return theme.category.toLowerCase() === activeFilter.toLowerCase();
            }

            return true;
          });

          if (filteredThemes.length === 0) {
            return (
              <div className="text-center py-16 border rounded-2xl bg-muted/10 text-muted-foreground">
                No themes match your search or filter criteria.
              </div>
            );
          }

          return (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredThemes.map((theme) => {
                const isInstalled = installations.some((i) => i.theme_id === theme.id);
                return (
                  <div
                    key={theme.id}
                    className="bg-card rounded-2xl border overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm hover:-translate-y-1"
                  >
                    {/* Theme Card Header (Fake Browser Mockup) */}
                    <div className="relative border-b bg-slate-50/50 p-3.5 group-hover:bg-slate-100/50 transition-colors">
                      {/* Browser controls bar */}
                      <div className="flex items-center gap-1.5 mb-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                        <div className="h-4.5 bg-white border border-slate-100 rounded-md flex-1 mx-2 text-[6.5px] text-muted-foreground flex items-center px-2 select-none justify-center truncate font-mono">
                          saloree.com/themes/{theme.id}
                        </div>
                      </div>
                      
                      {/* Inner mockup container */}
                      <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-white border border-slate-100">
                        <FakeStorePreview
                          themeId={theme.id}
                          primaryColor={theme.primaryColor}
                          bgColor={theme.bgColor}
                          accentColor={theme.accentColor}
                          fontFamily={theme.fontFamily}
                          gradient={theme.gradient}
                        />

                        {/* Popular / Premium / Free Badge overlays */}
                        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 scale-90 origin-top-left">
                          <span className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-slate-900/90 text-white shadow-xs">
                            {theme.category}
                          </span>
                          {theme.isPopular && (
                            <span className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 shadow-xs">
                              ★ Popular
                            </span>
                          )}
                        </div>

                        <div className="absolute top-2 right-2 z-10 scale-90 origin-top-right">
                          {theme.isFree ? (
                            <span className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-green-500 text-white shadow-xs">
                              Free
                            </span>
                          ) : (
                            <span className="text-[9px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md bg-indigo-600 text-white shadow-xs">
                              ✦ Premium
                            </span>
                          )}
                        </div>

                        {/* Hover Overlay Button */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 z-20">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="text-xs h-9 px-4 rounded-full font-bold shadow-md cursor-pointer"
                            onClick={() => setPreviewTheme(theme)}
                          >
                            Preview Theme
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 flex-1 flex flex-col justify-between gap-5">
                      <div className="space-y-3">
                        <div className="flex items-baseline justify-between gap-2">
                          <h4 className="font-bold text-base text-foreground">{theme.name}</h4>
                          <span className="font-extrabold text-base text-slate-800 shrink-0">
                            {theme.isFree ? "Free" : `$${theme.price.toFixed(2)}`}
                          </span>
                        </div>
                        
                        <p className="text-xs text-muted-foreground leading-normal line-clamp-2">
                          {theme.description}
                        </p>

                        <p className="text-[11px] font-semibold text-indigo-600/95 italic bg-indigo-500/5 p-2 rounded-lg border border-indigo-500/10">
                          {theme.benefit}
                        </p>

                        {/* Features checklist */}
                        <div className="pt-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-1.5">Includes</p>
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-slate-600">
                            {theme.features.map((feat) => (
                              <div key={feat} className="flex items-center gap-1">
                                <span className="text-green-500 font-bold">✓</span>
                                <span className="truncate">{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Buy / Add button */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs h-9 cursor-pointer font-bold"
                          onClick={() => setPreviewTheme(theme)}
                        >
                          Preview
                        </Button>
                        {installedThemeIds.has(theme.id) ? (
                          <Button
                            size="sm"
                            className="flex-1 text-xs h-9 font-bold bg-green-600 hover:bg-green-600 text-white cursor-not-allowed opacity-80"
                            disabled
                          >
                            ✓ Installed
                          </Button>
                        ) : theme.isFree ? (
                          <Button
                            size="sm"
                            className="flex-1 text-xs h-9 cursor-pointer font-bold"
                            disabled={addingId === theme.id}
                            onClick={() => {
                              setAddingId(theme.id);
                              addThemeMutation.mutate(theme);
                            }}
                          >
                            {addingId === theme.id ? "Adding…" : "Add theme"}
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            className="flex-1 text-xs h-9 cursor-pointer font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                            onClick={() => setBuyModalTheme(theme)}
                          >
                            Buy theme
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })()}
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
        onAdd={() => {
          if (!previewTheme) return;
          if (previewTheme.isFree) {
            setAddingId(previewTheme.id);
            addThemeMutation.mutate(previewTheme);
          } else {
            setPreviewTheme(null);
            setBuyModalTheme(previewTheme);
          }
        }}
        isInstalled={installedThemeIds.has(previewTheme?.id || "")}
      />

      {/* Paid Theme / Coming Soon Dialog */}
      <Dialog open={!!buyModalTheme} onOpenChange={(v) => !v && setBuyModalTheme(null)}>
        <DialogContent className="sm:max-w-md text-center py-6">
          <DialogHeader>
            <div className="mx-auto w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl mb-3">
              ✦
            </div>
            <DialogTitle className="text-lg font-bold text-center">Theme purchases are coming soon</DialogTitle>
            <DialogDescription className="text-sm text-center">
              This premium theme costs <strong className="text-slate-800">${buyModalTheme?.price.toFixed(2)}</strong>.
            </DialogDescription>
          </DialogHeader>
          <div className="py-2 text-xs text-muted-foreground bg-slate-50 border rounded-lg p-3 my-2">
            Payment integration is currently disabled during development. Premium theme installations will be unlocked once checkout options go live.
          </div>
          <DialogFooter className="sm:justify-center">
            <Button variant="default" onClick={() => setBuyModalTheme(null)} className="h-9 px-6 font-bold cursor-pointer">
              Got it
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
