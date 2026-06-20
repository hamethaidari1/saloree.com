import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  useSiteSettings,
  useHeroSlides,
  useHomepageSections,
  usePromoBanners,
  useFooterLinks,
} from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Loader2,
  Save,
  Sparkles,
  LayoutGrid,
  ImagePlay,
  Megaphone,
  Info,
} from "lucide-react";

export const Route = createFileRoute("/saloree-control/content")({
  component: AdminContentManager,
});

function AdminContentManager() {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("hero");

  // Fetch current data
  const { data: settings, isLoading: loadingSettings } = useSiteSettings();
  const { data: slides = [], isLoading: loadingSlides } = useHeroSlides();
  const { data: sections, isLoading: loadingSections } = useHomepageSections();
  const { data: banners = [], isLoading: loadingBanners } = usePromoBanners();
  const { data: footerLinks = [], isLoading: loadingFooterLinks } = useFooterLinks();

  const [uploading, setUploading] = useState<string | null>(null);

  // States for Hero settings
  const [heroTitle, setHeroTitle] = useState("");
  const [heroSubtitle, setHeroSubtitle] = useState("");
  const [heroButtonText, setHeroButtonText] = useState("");
  const [heroButtonLink, setHeroButtonLink] = useState("");

  // States for Sections settings
  const [showCategories, setShowCategories] = useState(true);
  const [showNewArrivals, setShowNewArrivals] = useState(true);
  const [showFeatured, setShowFeatured] = useState(true);
  const [categoriesTitle, setCategoriesTitle] = useState("");
  const [newArrivalsTitle, setNewArrivalsTitle] = useState("");
  const [featuredTitle, setFeaturedTitle] = useState("");

  // States for Branding
  const [logoUrl, setLogoUrl] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#ef4444");
  const [buttonColor, setButtonColor] = useState("#ef4444");
  const [footerText, setFooterText] = useState("");
  const [footerDescription, setFooterDescription] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Form Initializations when loaded
  const [initialized, setInitialized] = useState(false);

  if ((settings || sections) && !initialized) {
    if (settings) {
      setHeroTitle(settings.hero_title || "");
      setHeroSubtitle(settings.hero_subtitle || "");
      setHeroButtonText(settings.hero_button_text || "");
      setHeroButtonLink(settings.hero_button_link || "");
      setLogoUrl(settings.logo_url || "");
      setPrimaryColor(settings.primary_color || "#ef4444");
      setButtonColor(settings.button_color || "#ef4444");
      setFooterText(settings.footer_text || "");
      setFooterDescription(settings.footer_description || "");
      const socials = (settings.social_links as any) || {};
      setFacebookUrl(socials.facebook || "");
      setTwitterUrl(socials.twitter || "");
      setInstagramUrl(socials.instagram || "");
      setLinkedinUrl(socials.linkedin || "");
      setYoutubeUrl(socials.youtube || "");
    }
    if (sections) {
      setShowCategories(sections.show_categories);
      setShowNewArrivals(sections.show_new_arrivals);
      setShowFeatured(sections.show_featured);
      setCategoriesTitle(sections.categories_title || "");
      setNewArrivalsTitle(sections.new_arrivals_title || "");
      setFeaturedTitle(sections.featured_title || "");
    }
    setInitialized(true);
  }

  // --- Upload Helper ---
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, target: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploading(target);

    try {
      // Pre-check: verify user has content admin role before attempting upload
      const { data: isAdmin, error: roleCheckError } = await supabase.rpc("is_content_admin");
      if (roleCheckError) {
        console.error("[ContentUpload] Role check RPC error:", roleCheckError);
      }
      if (!isAdmin) {
        console.error("[ContentUpload] User does not have content admin role. Checking user_roles...");
        const { data: roles } = await supabase.from("user_roles").select("role, user_id");
        console.log("[ContentUpload] Current user roles:", roles);
        const { data: { user } } = await supabase.auth.getUser();
        console.log("[ContentUpload] Current user ID:", user?.id);
        toast.error(
          "Upload failed: Your account does not have permission to upload files. " +
          "Run fix_content_manager_rls.sql in the Supabase SQL Editor to assign admin role.",
          { duration: 8000 }
        );
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;
      const filePath = `content/${fileName}`;

      console.log("[ContentUpload] Uploading to site-assets:", filePath);
      const { error: uploadError } = await supabase.storage
        .from("site-assets")
        .upload(filePath, file);

      if (uploadError) {
        console.error("[ContentUpload] Supabase storage upload error:", uploadError);
        if (uploadError.message.includes("Bucket not found") || uploadError.message.includes("not found")) {
          toast.error(
            "Upload failed: Storage bucket 'site-assets' is missing. Run fix_content_manager_rls.sql in the Supabase SQL Editor.",
            { duration: 6000 }
          );
        } else if (uploadError.message.includes("row-level security") || uploadError.message.includes("policy")) {
          toast.error(
            "Upload failed: Storage RLS policy blocked the upload. Run fix_content_manager_rls.sql in the Supabase SQL Editor.",
            { duration: 8000 }
          );
        } else {
          toast.error(`Upload failed: ${uploadError.message}`);
        }
        return;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from("site-assets").getPublicUrl(filePath);

      console.log("[ContentUpload] Upload successful, public URL:", publicUrl);

      if (target === "logo") {
        setLogoUrl(publicUrl);
        toast.success("Logo uploaded. Remember to save changes!");
      } else if (target.startsWith("slide-")) {
        const id = target.split("slide-")[1];
        await handleUpdateSlide(id, { image_url: publicUrl });
      } else if (target.startsWith("banner-")) {
        const id = target.split("banner-")[1];
        await handleUpdateBanner(id, { image_url: publicUrl });
      } else if (target === "new-slide") {
        await handleAddSlide(publicUrl);
      } else if (target === "new-banner") {
        await handleAddBanner(publicUrl);
      }
    } catch (err: any) {
      console.error("[ContentUpload] Unknown file upload error:", err);
      toast.error("An unexpected error occurred during upload.");
    } finally {
      setUploading(null);
    }
  };


  // --- Hero & Branding Operations ---
  const handleSaveHeroAndBranding = async () => {
    try {
      const { error } = await supabase.from("site_settings").upsert({
        id: "default",
        hero_title: heroTitle,
        hero_subtitle: heroSubtitle,
        hero_button_text: heroButtonText,
        hero_button_link: heroButtonLink,
        logo_url: logoUrl,
        primary_color: primaryColor,
        button_color: buttonColor,
        footer_text: footerText,
        footer_description: footerDescription,
        social_links: {
          facebook: facebookUrl,
          twitter: twitterUrl,
          instagram: instagramUrl,
          linkedin: linkedinUrl,
          youtube: youtubeUrl,
        },
        updated_at: new Date().toISOString(),
      });

      if (error) {
        console.error("[SaveBranding] Supabase error saving site settings:", error);
        toast.error(`Save failed: ${error.message}`);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      toast.success("Branding and Hero settings saved successfully!");
    } catch (err: any) {
      console.error("[SaveBranding] Unexpected error saving settings:", err);
      toast.error("An unexpected error occurred while saving.");
    }
  };

  // --- Slide Operations ---
  const handleAddSlide = async (url: string) => {
    try {
      const nextOrder = slides.length > 0 ? Math.max(...slides.map((s) => s.display_order)) + 1 : 0;
      const { error } = await supabase.from("hero_slides").insert({
        image_url: url,
        alt_text: "New Hero Slide",
        display_order: nextOrder,
        is_enabled: true,
      });

      if (error) {
        console.error("[AddSlide] Supabase error adding slide:", error);
        toast.error(`Failed to add slide: ${error.message}`);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["hero_slides"] });
      toast.success("Slide added successfully!");
    } catch (err: any) {
      console.error("[AddSlide] Unexpected error:", err);
    }
  };

  const handleUpdateSlide = async (id: string, updates: any) => {
    try {
      const { error } = await supabase.from("hero_slides").update(updates).eq("id", id);
      if (error) {
        console.error("[UpdateSlide] Supabase error updating slide:", error);
        toast.error(`Update failed: ${error.message}`);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["hero_slides"] });
      toast.success("Slide updated!");
    } catch (err: any) {
      console.error("[UpdateSlide] Unexpected error:", err);
    }
  };

  const handleDeleteSlide = async (id: string) => {
    try {
      const { error } = await supabase.from("hero_slides").delete().eq("id", id);
      if (error) {
        console.error("[DeleteSlide] Supabase error deleting slide:", error);
        toast.error(`Delete failed: ${error.message}`);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["hero_slides"] });
      toast.success("Slide deleted.");
    } catch (err: any) {
      console.error("[DeleteSlide] Unexpected error:", err);
    }
  };

  const handleReorderSlides = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === slides.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const slideA = slides[index];
    const slideB = slides[targetIndex];

    try {
      const { error } = await supabase.from("hero_slides").upsert([
        {
          id: slideA.id,
          display_order: slideB.display_order,
          image_url: slideA.image_url,
          alt_text: slideA.alt_text,
        },
        {
          id: slideB.id,
          display_order: slideA.display_order,
          image_url: slideB.image_url,
          alt_text: slideB.alt_text,
        },
      ]);

      if (error) {
        console.error("[ReorderSlides] Supabase error reordering slides:", error);
        toast.error(`Failed to reorder: ${error.message}`);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["hero_slides"] });
    } catch (err: any) {
      console.error("[ReorderSlides] Unexpected error:", err);
    }
  };

  // --- Section Settings Operations ---
  const handleSaveSections = async () => {
    try {
      const { error } = await supabase.from("homepage_sections").upsert({
        id: "default",
        show_categories: showCategories,
        show_new_arrivals: showNewArrivals,
        show_featured: showFeatured,
        categories_title: categoriesTitle,
        new_arrivals_title: newArrivalsTitle,
        featured_title: featuredTitle,
      });

      if (error) {
        console.error("[SaveSections] Supabase error saving homepage sections:", error);
        toast.error(`Save failed: ${error.message}`);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["homepage_sections"] });
      toast.success("Homepage sections settings saved successfully!");
    } catch (err: any) {
      console.error("[SaveSections] Unexpected error saving sections:", err);
      toast.error("An unexpected error occurred.");
    }
  };

  // --- Promo Banners Operations ---
  const handleAddBanner = async (url: string) => {
    try {
      const nextOrder =
        banners.length > 0 ? Math.max(...banners.map((b) => b.display_order)) + 1 : 0;
      const { error } = await supabase.from("promo_banners").insert({
        image_url: url,
        banner_text: "New Promo Banner",
        button_link: "/marketplace",
        button_text: "Shop Now",
        display_order: nextOrder,
        is_enabled: true,
      });

      if (error) {
        console.error("[AddBanner] Supabase error adding promo banner:", error);
        toast.error(`Failed to add banner: ${error.message}`);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
      toast.success("Promo banner added successfully!");
    } catch (err: any) {
      console.error("[AddBanner] Unexpected error:", err);
    }
  };

  const handleUpdateBanner = async (id: string, updates: any) => {
    try {
      const { error } = await supabase.from("promo_banners").update(updates).eq("id", id);
      if (error) {
        console.error("[UpdateBanner] Supabase error updating banner:", error);
        toast.error(`Update failed: ${error.message}`);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
      toast.success("Banner updated!");
    } catch (err: any) {
      console.error("[UpdateBanner] Unexpected error:", err);
    }
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      const { error } = await supabase.from("promo_banners").delete().eq("id", id);
      if (error) {
        console.error("[DeleteBanner] Supabase error deleting banner:", error);
        toast.error(`Delete failed: ${error.message}`);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
      toast.success("Promo banner deleted.");
    } catch (err: any) {
      console.error("[DeleteBanner] Unexpected error:", err);
    }
  };

  const handleReorderBanners = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === banners.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const bannerA = banners[index];
    const bannerB = banners[targetIndex];

    try {
      const { error } = await supabase.from("promo_banners").upsert([
        {
          id: bannerA.id,
          display_order: bannerB.display_order,
          image_url: bannerA.image_url,
          banner_text: bannerA.banner_text,
          button_link: bannerA.button_link,
        },
        {
          id: bannerB.id,
          display_order: bannerA.display_order,
          image_url: bannerB.image_url,
          banner_text: bannerB.banner_text,
          button_link: bannerB.button_link,
        },
      ]);

      if (error) {
        console.error("[ReorderBanners] Supabase error reordering banners:", error);
        toast.error(`Failed to reorder: ${error.message}`);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
    } catch (err: any) {
      console.error("[ReorderBanners] Unexpected error:", err);
    }
  };

  // --- Footer Links Operations ---
  const [newLinkLabel, setNewLinkLabel] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");
  const [newLinkCategory, setNewLinkCategory] = useState("Company");

  const handleAddFooterLink = async () => {
    if (!newLinkLabel || !newLinkUrl) {
      toast.error("Please fill in both the label and link URL.");
      return;
    }

    try {
      const nextOrder =
        footerLinks.length > 0 ? Math.max(...footerLinks.map((l) => l.display_order)) + 1 : 0;
      const { error } = await supabase.from("footer_links").insert({
        label: newLinkLabel,
        url: newLinkUrl,
        category: newLinkCategory,
        display_order: nextOrder,
      });

      if (error) {
        console.error("[AddFooterLink] Supabase error adding link:", error);
        toast.error(`Failed to add link: ${error.message}`);
        return;
      }

      setNewLinkLabel("");
      setNewLinkUrl("");
      queryClient.invalidateQueries({ queryKey: ["footer_links"] });
      toast.success("Footer link added successfully!");
    } catch (err: any) {
      console.error("[AddFooterLink] Unexpected error:", err);
    }
  };

  const handleDeleteFooterLink = async (id: string) => {
    try {
      const { error } = await supabase.from("footer_links").delete().eq("id", id);
      if (error) {
        console.error("[DeleteFooterLink] Supabase error deleting link:", error);
        toast.error(`Delete failed: ${error.message}`);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["footer_links"] });
      toast.success("Footer link deleted.");
    } catch (err: any) {
      console.error("[DeleteFooterLink] Unexpected error:", err);
    }
  };

  const handleReorderFooterLinks = async (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === footerLinks.length - 1) return;

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    const linkA = footerLinks[index];
    const linkB = footerLinks[targetIndex];

    try {
      const { error } = await supabase.from("footer_links").upsert([
        {
          id: linkA.id,
          display_order: linkB.display_order,
          label: linkA.label,
          url: linkA.url,
          category: linkA.category,
        },
        {
          id: linkB.id,
          display_order: linkA.display_order,
          label: linkB.label,
          url: linkB.url,
          category: linkB.category,
        },
      ]);

      if (error) {
        console.error("[ReorderFooterLinks] Supabase error reordering links:", error);
        toast.error(`Failed to reorder: ${error.message}`);
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["footer_links"] });
    } catch (err: any) {
      console.error("[ReorderFooterLinks] Unexpected error:", err);
    }
  };

  const loadingAny =
    loadingSettings || loadingSlides || loadingSections || loadingBanners || loadingFooterLinks;

  if (loadingAny && !initialized) {
    return (
      <div className="flex h-[350px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-3 text-sm text-muted-foreground">Loading configurations…</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Content Manager</h1>
        <p className="text-muted-foreground mt-1">
          Customize the homepage layout, colors, slider, banners, and links on Saloree's public
          website.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-muted/80 p-1 rounded-xl">
          <TabsTrigger value="hero" className="rounded-lg gap-2 text-xs sm:text-sm">
            <ImagePlay className="size-4" /> Hero & Slider
          </TabsTrigger>
          <TabsTrigger value="sections" className="rounded-lg gap-2 text-xs sm:text-sm">
            <LayoutGrid className="size-4" /> Homepage Sections
          </TabsTrigger>
          <TabsTrigger value="banners" className="rounded-lg gap-2 text-xs sm:text-sm">
            <Megaphone className="size-4" /> Promo Banners
          </TabsTrigger>
          <TabsTrigger value="branding" className="rounded-lg gap-2 text-xs sm:text-sm">
            <Sparkles className="size-4" /> Branding & Footer
          </TabsTrigger>
        </TabsList>

        {/* ─── TABS: HERO & SLIDER ─── */}
        <TabsContent value="hero" className="mt-4 space-y-4 focus-visible:outline-none">
          <Card className="shadow-soft border-slate-100">
            <CardHeader>
              <CardTitle>Hero Section Settings</CardTitle>
              <CardDescription>
                Configure the primary title, subtitle, and CTA button of the homepage hero banner.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="heroTitle">Hero Title</Label>
                <Input
                  id="heroTitle"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="e.g. Shop everything you need, all in one place"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="e.g. Discover top products from trusted sellers at the best prices."
                  rows={3}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="heroButtonText">CTA Button Text</Label>
                  <Input
                    id="heroButtonText"
                    value={heroButtonText}
                    onChange={(e) => setHeroButtonText(e.target.value)}
                    placeholder="e.g. Shop Now"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="heroButtonLink">CTA Button Link</Label>
                  <Input
                    id="heroButtonLink"
                    value={heroButtonLink}
                    onChange={(e) => setHeroButtonLink(e.target.value)}
                    placeholder="e.g. /marketplace"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-muted/20 px-6 py-4">
              <Button onClick={handleSaveHeroAndBranding} className="gap-2">
                <Save className="size-4" /> Save Hero Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-soft border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Hero Slides Manager</CardTitle>
                <CardDescription>
                  Upload, remove, toggle, and reorder images shown in the homepage hero slider.
                </CardDescription>
              </div>
              <div>
                <Button asChild variant="outline" className="relative cursor-pointer">
                  <label className="flex items-center gap-2 cursor-pointer">
                    {uploading === "new-slide" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                    Add Slide Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading !== null}
                      onChange={(e) => handleFileUpload(e, "new-slide")}
                    />
                  </label>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {slides.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center">
                  <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm font-semibold">No custom slides uploaded</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The homepage is currently falling back to the 4 default product banner assets.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.id}
                      className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center"
                    >
                      <div className="relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border bg-slate-50">
                        <img
                          src={slide.image_url}
                          alt={slide.alt_text}
                          className="h-full w-full object-contain"
                        />
                        <label className="absolute bottom-1 right-1 cursor-pointer rounded bg-black/60 p-1 text-white hover:bg-black transition">
                          <Upload className="size-3" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, `slide-${slide.id}`)}
                          />
                        </label>
                      </div>

                      <div className="flex-1 space-y-3">
                        <div className="grid gap-1">
                          <Label className="text-xs font-semibold text-muted-foreground">
                            Alt Text (Accessibility)
                          </Label>
                          <Input
                            value={slide.alt_text}
                            onChange={(e) =>
                              handleUpdateSlide(slide.id, { alt_text: e.target.value })
                            }
                            placeholder="Describe this slide image..."
                          />
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={slide.is_enabled}
                              onCheckedChange={(checked) =>
                                handleUpdateSlide(slide.id, { is_enabled: checked })
                              }
                            />
                            <span className="text-sm font-medium">
                              {slide.is_enabled ? "Active" : "Disabled"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-1.5 border-t pt-3 sm:border-t-0 sm:pt-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={index === 0}
                          onClick={() => handleReorderSlides(index, "up")}
                        >
                          <ArrowUp className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={index === slides.length - 1}
                          onClick={() => handleReorderSlides(index, "down")}
                        >
                          <ArrowDown className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeleteSlide(slide.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TABS: HOMEPAGE SECTIONS ─── */}
        <TabsContent value="sections" className="mt-4 focus-visible:outline-none">
          <Card className="shadow-soft border-slate-100">
            <CardHeader>
              <CardTitle>Homepage Layout Manager</CardTitle>
              <CardDescription>
                Toggle the visibility of sections on the public homepage and rename section
                headings.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category section settings */}
              <div className="rounded-xl border p-4 space-y-4 bg-slate-50/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-semibold">Shop by Category Section</Label>
                    <p className="text-xs text-muted-foreground">
                      Show/hide the dynamic product category cards grid.
                    </p>
                  </div>
                  <Switch checked={showCategories} onCheckedChange={setShowCategories} />
                </div>
                {showCategories && (
                  <div className="grid gap-2">
                    <Label htmlFor="catTitle">Section Title</Label>
                    <Input
                      id="catTitle"
                      value={categoriesTitle}
                      onChange={(e) => setCategoriesTitle(e.target.value)}
                      placeholder="e.g. Shop by Category"
                    />
                  </div>
                )}
              </div>

              {/* New Arrivals settings */}
              <div className="rounded-xl border p-4 space-y-4 bg-slate-50/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-semibold">New Arrivals Section</Label>
                    <p className="text-xs text-muted-foreground">
                      Show/hide recently added active products.
                    </p>
                  </div>
                  <Switch checked={showNewArrivals} onCheckedChange={setShowNewArrivals} />
                </div>
                {showNewArrivals && (
                  <div className="grid gap-2">
                    <Label htmlFor="newTitle">Section Title</Label>
                    <Input
                      id="newTitle"
                      value={newArrivalsTitle}
                      onChange={(e) => setNewArrivalsTitle(e.target.value)}
                      placeholder="e.g. New Arrivals"
                    />
                  </div>
                )}
              </div>

              {/* Featured Products settings */}
              <div className="rounded-xl border p-4 space-y-4 bg-slate-50/30">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base font-semibold">Featured Products Section</Label>
                    <p className="text-xs text-muted-foreground">
                      Show/hide products filtered as featured.
                    </p>
                  </div>
                  <Switch checked={showFeatured} onCheckedChange={setShowFeatured} />
                </div>
                {showFeatured && (
                  <div className="grid gap-2">
                    <Label htmlFor="featuredTitle">Section Title</Label>
                    <Input
                      id="featuredTitle"
                      value={featuredTitle}
                      onChange={(e) => setFeaturedTitle(e.target.value)}
                      placeholder="e.g. Featured Products"
                    />
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-muted/20 px-6 py-4">
              <Button onClick={handleSaveSections} className="gap-2">
                <Save className="size-4" /> Save Sections Layout
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* ─── TABS: PROMO BANNERS ─── */}
        <TabsContent value="banners" className="mt-4 focus-visible:outline-none">
          <Card className="shadow-soft border-slate-100">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div>
                <CardTitle>Homepage Promo Banners</CardTitle>
                <CardDescription>
                  Promote deals or stores via eye-catching cards placed between homepage sections.
                </CardDescription>
              </div>
              <div>
                <Button asChild variant="outline" className="relative cursor-pointer">
                  <label className="flex items-center gap-2 cursor-pointer">
                    {uploading === "new-banner" ? (
                      <Loader2 className="size-4 animate-spin" />
                    ) : (
                      <Plus className="size-4" />
                    )}
                    Add Promo Banner
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={uploading !== null}
                      onChange={(e) => handleFileUpload(e, "new-banner")}
                    />
                  </label>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {banners.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center">
                  <Megaphone className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-2 text-sm font-semibold">No promotional banners configured</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Upload a high-quality promo banner to showcase campaigns or top categories.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {banners.map((banner, index) => (
                    <div
                      key={banner.id}
                      className="flex flex-col gap-4 rounded-xl border p-4 lg:flex-row lg:items-center"
                    >
                      <div className="relative h-28 w-48 shrink-0 overflow-hidden rounded-lg border bg-slate-50">
                        <img
                          src={banner.image_url}
                          alt={banner.banner_text}
                          className="h-full w-full object-cover"
                        />
                        <label className="absolute bottom-1 right-1 cursor-pointer rounded bg-black/60 p-1 text-white hover:bg-black transition">
                          <Upload className="size-3" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, `banner-${banner.id}`)}
                          />
                        </label>
                      </div>

                      <div className="flex-1 grid gap-3 sm:grid-cols-2">
                        <div className="grid gap-1">
                          <Label className="text-xs font-semibold text-muted-foreground">
                            Banner Text (Campaign Message)
                          </Label>
                          <Input
                            value={banner.banner_text}
                            onChange={(e) =>
                              handleUpdateBanner(banner.id, { banner_text: e.target.value })
                            }
                            placeholder="e.g. Up to 40% off on Tech Gadgets!"
                          />
                        </div>

                        <div className="grid gap-1">
                          <Label className="text-xs font-semibold text-muted-foreground">
                            Button Link
                          </Label>
                          <Input
                            value={banner.button_link}
                            onChange={(e) =>
                              handleUpdateBanner(banner.id, { button_link: e.target.value })
                            }
                            placeholder="e.g. /marketplace?q=electronics"
                          />
                        </div>

                        <div className="grid gap-1">
                          <Label className="text-xs font-semibold text-muted-foreground">
                            Button Text
                          </Label>
                          <Input
                            value={banner.button_text || "Shop Now"}
                            onChange={(e) =>
                              handleUpdateBanner(banner.id, { button_text: e.target.value })
                            }
                            placeholder="e.g. Explore Deals"
                          />
                        </div>

                        <div className="flex items-center gap-6 mt-3 sm:mt-0">
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={banner.is_enabled}
                              onCheckedChange={(checked) =>
                                handleUpdateBanner(banner.id, { is_enabled: checked })
                              }
                            />
                            <span className="text-sm font-medium">
                              {banner.is_enabled ? "Active" : "Disabled"}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-1 px-1 border-t pt-3 lg:border-t-0 lg:pt-0">
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={index === 0}
                          onClick={() => handleReorderBanners(index, "up")}
                        >
                          <ArrowUp className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          disabled={index === banners.length - 1}
                          onClick={() => handleReorderBanners(index, "down")}
                        >
                          <ArrowDown className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleDeleteBanner(banner.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ─── TABS: BRANDING & FOOTER ─── */}
        <TabsContent value="branding" className="mt-4 space-y-4 focus-visible:outline-none">
          <Card className="shadow-soft border-slate-100">
            <CardHeader>
              <CardTitle>Branding Settings</CardTitle>
              <CardDescription>
                Customize colors, branding logos, and header details to match Saloree's custom
                identity.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border bg-slate-50 flex items-center justify-center p-2">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      alt="Logo preview"
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <span className="text-xs text-muted-foreground">Default logo</span>
                  )}
                  {uploading === "logo" && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                      <Loader2 className="size-5 animate-spin" />
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-2">
                  <Label>Website Header Logo</Label>
                  <div className="flex items-center gap-3">
                    <Button asChild variant="outline" size="sm" className="relative cursor-pointer">
                      <label className="cursor-pointer">
                        <Upload className="size-3.5 mr-2 inline" /> Upload Custom Logo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploading !== null}
                          onChange={(e) => handleFileUpload(e, "logo")}
                        />
                      </label>
                    </Button>
                    {logoUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10"
                        onClick={() => setLogoUrl("")}
                      >
                        Reset to default
                      </Button>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Suggest PNG or transparent WebP around 200x80px.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 border-t pt-4">
                <div className="grid gap-2">
                  <Label htmlFor="primaryCol">Primary Branding Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="primaryCol"
                      type="color"
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded-lg border p-0.5"
                    />
                    <Input
                      value={primaryColor}
                      onChange={(e) => setPrimaryColor(e.target.value)}
                      placeholder="#ef4444"
                      maxLength={7}
                      className="font-mono text-sm uppercase"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Applies to highlights, text primary, and accents.
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="btnCol">Primary Button Color</Label>
                  <div className="flex items-center gap-3">
                    <input
                      id="btnCol"
                      type="color"
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      className="h-9 w-12 cursor-pointer rounded-lg border p-0.5"
                    />
                    <Input
                      value={buttonColor}
                      onChange={(e) => setButtonColor(e.target.value)}
                      placeholder="#ef4444"
                      maxLength={7}
                      className="font-mono text-sm uppercase"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Applies specifically to primary background CTA buttons.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-muted/20 px-6 py-4">
              <Button onClick={handleSaveHeroAndBranding} className="gap-2">
                <Save className="size-4" /> Save Branding Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-soft border-slate-100">
            <CardHeader>
              <CardTitle>Footer Information & Socials</CardTitle>
              <CardDescription>
                Customize description, copyrights, and direct links to social media accounts.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="footerDesc">Footer Description</Label>
                <Textarea
                  id="footerDesc"
                  value={footerDescription}
                  onChange={(e) => setFooterDescription(e.target.value)}
                  placeholder="e.g. A modern multi-vendor marketplace where anyone can launch a store and start selling."
                  rows={2}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="footerCopyright">Footer Copyright Text</Label>
                <Input
                  id="footerCopyright"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  placeholder="e.g. © 2026 Saloree. All rights reserved."
                />
              </div>

              <div className="border-t pt-4 space-y-4">
                <Label className="text-base font-semibold">Social Links</Label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-1">
                    <Label htmlFor="fb" className="text-xs">
                      Facebook URL
                    </Label>
                    <Input
                      id="fb"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                      placeholder="facebook.com/saloree"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="tw" className="text-xs">
                      Twitter / X URL
                    </Label>
                    <Input
                      id="tw"
                      value={twitterUrl}
                      onChange={(e) => setTwitterUrl(e.target.value)}
                      placeholder="x.com/saloree"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="ig" className="text-xs">
                      Instagram URL
                    </Label>
                    <Input
                      id="ig"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                      placeholder="instagram.com/saloree"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="ln" className="text-xs">
                      LinkedIn URL
                    </Label>
                    <Input
                      id="ln"
                      value={linkedinUrl}
                      onChange={(e) => setLinkedinUrl(e.target.value)}
                      placeholder="linkedin.com/company/saloree"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="yt" className="text-xs">
                      YouTube URL
                    </Label>
                    <Input
                      id="yt"
                      value={youtubeUrl}
                      onChange={(e) => setYoutubeUrl(e.target.value)}
                      placeholder="youtube.com/@saloree"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-muted/20 px-6 py-4">
              <Button onClick={handleSaveHeroAndBranding} className="gap-2">
                <Save className="size-4" /> Save Footer Settings
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-soft border-slate-100">
            <CardHeader>
              <CardTitle>Footer Links Manager</CardTitle>
              <CardDescription>
                Add, group, or delete links displayed under category columns in the public footer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-xl border p-4 bg-slate-50/20 space-y-4">
                <Label className="text-sm font-semibold">Add New Link</Label>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="grid gap-1">
                    <Label htmlFor="label" className="text-xs">
                      Link Label
                    </Label>
                    <Input
                      id="label"
                      value={newLinkLabel}
                      onChange={(e) => setNewLinkLabel(e.target.value)}
                      placeholder="e.g. Terms of Service"
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="url" className="text-xs">
                      Link URL
                    </Label>
                    <Input
                      id="url"
                      value={newLinkUrl}
                      onChange={(e) => setNewLinkUrl(e.target.value)}
                      placeholder="e.g. /terms or https://..."
                    />
                  </div>
                  <div className="grid gap-1">
                    <Label htmlFor="category" className="text-xs">
                      Category Header
                    </Label>
                    <Select value={newLinkCategory} onValueChange={setNewLinkCategory}>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Company">Company</SelectItem>
                        <SelectItem value="Shop">Shop</SelectItem>
                        <SelectItem value="Become a Seller">Become a Seller</SelectItem>
                        <SelectItem value="Support">Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <Button onClick={handleAddFooterLink} size="sm" className="gap-1">
                    <Plus className="size-4" /> Add Link
                  </Button>
                </div>
              </div>

              {footerLinks.length === 0 ? (
                <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground text-sm">
                  <Info className="mx-auto size-8 text-muted-foreground/50 mb-2" />
                  No custom footer links added. Currently showing the default marketplace links.
                </div>
              ) : (
                <div className="space-y-3">
                  <Label className="text-sm font-semibold">Active Footer Links</Label>
                  <div className="divide-y rounded-xl border">
                    {footerLinks.map((link, index) => (
                      <div
                        key={link.id}
                        className="flex items-center justify-between p-3.5 hover:bg-slate-50/50"
                      >
                        <div className="grid">
                          <span className="font-semibold text-sm">{link.label}</span>
                          <span className="text-xs text-muted-foreground">
                            {link.url} •{" "}
                            <span className="font-medium text-slate-600">{link.category}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={index === 0}
                            onClick={() => handleReorderFooterLinks(index, "up")}
                          >
                            <ArrowUp className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={index === footerLinks.length - 1}
                            onClick={() => handleReorderFooterLinks(index, "down")}
                          >
                            <ArrowDown className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                            onClick={() => handleDeleteFooterLink(link.id)}
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
