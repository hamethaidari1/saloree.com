import { o as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-DfK1yIpk.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { c as require_jsx_runtime } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { i as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { n as useHeroSlides, r as useSiteSettings, t as useFooterLinks } from "./useSiteSettings-9teR3ZGn.mjs";
import { A as Save, G as Megaphone, It as ChevronDown, Lt as Check, N as Plus, Nt as ChevronUp, Q as LoaderCircle, Wt as ArrowUp, Yt as ArrowDown, at as Info, ot as Image, p as Trash2, s as Upload, st as ImagePlay, tt as LayoutGrid, y as Sparkles } from "../_libs/lucide-react.mjs";
import { n as cn, t as Button } from "./button-Cr1ZI0g1.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as usePromoBanners, t as useHomepageSections } from "./usePromoBanners-xfkvpWl6.mjs";
import { t as Input } from "./input-FnO9yJXZ.mjs";
import { t as Label } from "./label-CgGkF99L.mjs";
import { a as SelectItemIndicator, c as SelectPortal, d as SelectSeparator$1, f as SelectTrigger$1, i as SelectItem$1, l as SelectScrollDownButton$1, m as SelectViewport, n as SelectContent$1, o as SelectItemText, p as SelectValue$1, r as SelectIcon, s as SelectLabel$1, t as Select$1, u as SelectScrollUpButton$1 } from "../_libs/@radix-ui/react-select+[...].mjs";
import { t as Switch } from "./switch-CJrKX_u5.mjs";
import { t as Textarea } from "./textarea-C10Q6cLJ.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/saloree-control.content-D_QPhR7H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}));
CardFooter.displayName = "CardFooter";
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background cursor-pointer data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4 opacity-50" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectScrollUpButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronUp, { className: "h-4 w-4" })
}));
SelectScrollUpButton.displayName = SelectScrollUpButton$1.displayName;
var SelectScrollDownButton = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton$1, {
	ref,
	className: cn("flex cursor-default items-center justify-center py-1", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-4 w-4" })
}));
SelectScrollDownButton.displayName = SelectScrollDownButton$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-select-content-transform-origin)", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollUpButton, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
			className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
			children
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectScrollDownButton, {})
	]
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectLabel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectLabel$1, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", className),
	...props
}));
SelectLabel.displayName = SelectLabel$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute right-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
var SelectSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectSeparator$1, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
SelectSeparator.displayName = SelectSeparator$1.displayName;
function AdminContentManager() {
	const queryClient = useQueryClient();
	const [activeTab, setActiveTab] = (0, import_react.useState)("hero");
	const { data: settings, isLoading: loadingSettings } = useSiteSettings();
	const { data: slides = [], isLoading: loadingSlides } = useHeroSlides();
	const { data: sections, isLoading: loadingSections } = useHomepageSections();
	const { data: banners = [], isLoading: loadingBanners } = usePromoBanners();
	const { data: footerLinks = [], isLoading: loadingFooterLinks } = useFooterLinks();
	const [uploading, setUploading] = (0, import_react.useState)(null);
	const [heroTitle, setHeroTitle] = (0, import_react.useState)("");
	const [heroSubtitle, setHeroSubtitle] = (0, import_react.useState)("");
	const [heroButtonText, setHeroButtonText] = (0, import_react.useState)("");
	const [heroButtonLink, setHeroButtonLink] = (0, import_react.useState)("");
	const [showCategories, setShowCategories] = (0, import_react.useState)(true);
	const [showNewArrivals, setShowNewArrivals] = (0, import_react.useState)(true);
	const [showFeatured, setShowFeatured] = (0, import_react.useState)(true);
	const [categoriesTitle, setCategoriesTitle] = (0, import_react.useState)("");
	const [newArrivalsTitle, setNewArrivalsTitle] = (0, import_react.useState)("");
	const [featuredTitle, setFeaturedTitle] = (0, import_react.useState)("");
	const [logoUrl, setLogoUrl] = (0, import_react.useState)("");
	const [primaryColor, setPrimaryColor] = (0, import_react.useState)("#ef4444");
	const [buttonColor, setButtonColor] = (0, import_react.useState)("#ef4444");
	const [footerText, setFooterText] = (0, import_react.useState)("");
	const [footerDescription, setFooterDescription] = (0, import_react.useState)("");
	const [facebookUrl, setFacebookUrl] = (0, import_react.useState)("");
	const [twitterUrl, setTwitterUrl] = (0, import_react.useState)("");
	const [instagramUrl, setInstagramUrl] = (0, import_react.useState)("");
	const [linkedinUrl, setLinkedinUrl] = (0, import_react.useState)("");
	const [youtubeUrl, setYoutubeUrl] = (0, import_react.useState)("");
	const [initialized, setInitialized] = (0, import_react.useState)(false);
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
			const socials = settings.social_links || {};
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
	const handleFileUpload = async (e, target) => {
		if (!e.target.files || e.target.files.length === 0) return;
		const file = e.target.files[0];
		setUploading(target);
		try {
			const { data: isAdmin, error: roleCheckError } = await supabase.rpc("is_content_admin");
			if (roleCheckError) console.error("[ContentUpload] Role check RPC error:", roleCheckError);
			if (!isAdmin) {
				console.error("[ContentUpload] User does not have content admin role. Checking user_roles...");
				const { data: roles } = await supabase.from("user_roles").select("role, user_id");
				console.log("[ContentUpload] Current user roles:", roles);
				const { data: { user } } = await supabase.auth.getUser();
				console.log("[ContentUpload] Current user ID:", user?.id);
				toast.error("Upload failed: Your account does not have permission to upload files. Run fix_content_manager_rls.sql in the Supabase SQL Editor to assign admin role.", { duration: 8e3 });
				return;
			}
			const fileExt = file.name.split(".").pop();
			const filePath = `content/${`${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`}`;
			console.log("[ContentUpload] Uploading to site-assets:", filePath);
			const { error: uploadError } = await supabase.storage.from("site-assets").upload(filePath, file);
			if (uploadError) {
				console.error("[ContentUpload] Supabase storage upload error:", uploadError);
				if (uploadError.message.includes("Bucket not found") || uploadError.message.includes("not found")) toast.error("Upload failed: Storage bucket 'site-assets' is missing. Run fix_content_manager_rls.sql in the Supabase SQL Editor.", { duration: 6e3 });
				else if (uploadError.message.includes("row-level security") || uploadError.message.includes("policy")) toast.error("Upload failed: Storage RLS policy blocked the upload. Run fix_content_manager_rls.sql in the Supabase SQL Editor.", { duration: 8e3 });
				else toast.error(`Upload failed: ${uploadError.message}`);
				return;
			}
			const { data: { publicUrl } } = supabase.storage.from("site-assets").getPublicUrl(filePath);
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
			} else if (target === "new-slide") await handleAddSlide(publicUrl);
			else if (target === "new-banner") await handleAddBanner(publicUrl);
		} catch (err) {
			console.error("[ContentUpload] Unknown file upload error:", err);
			toast.error("An unexpected error occurred during upload.");
		} finally {
			setUploading(null);
		}
	};
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
					youtube: youtubeUrl
				},
				updated_at: (/* @__PURE__ */ new Date()).toISOString()
			});
			if (error) {
				console.error("[SaveBranding] Supabase error saving site settings:", error);
				toast.error(`Save failed: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["site_settings"] });
			toast.success("Branding and Hero settings saved successfully!");
		} catch (err) {
			console.error("[SaveBranding] Unexpected error saving settings:", err);
			toast.error("An unexpected error occurred while saving.");
		}
	};
	const handleAddSlide = async (url) => {
		try {
			const nextOrder = slides.length > 0 ? Math.max(...slides.map((s) => s.display_order)) + 1 : 0;
			const { error } = await supabase.from("hero_slides").insert({
				image_url: url,
				alt_text: "New Hero Slide",
				display_order: nextOrder,
				is_enabled: true
			});
			if (error) {
				console.error("[AddSlide] Supabase error adding slide:", error);
				toast.error(`Failed to add slide: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["hero_slides"] });
			toast.success("Slide added successfully!");
		} catch (err) {
			console.error("[AddSlide] Unexpected error:", err);
		}
	};
	const handleUpdateSlide = async (id, updates) => {
		try {
			const { error } = await supabase.from("hero_slides").update(updates).eq("id", id);
			if (error) {
				console.error("[UpdateSlide] Supabase error updating slide:", error);
				toast.error(`Update failed: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["hero_slides"] });
			toast.success("Slide updated!");
		} catch (err) {
			console.error("[UpdateSlide] Unexpected error:", err);
		}
	};
	const handleDeleteSlide = async (id) => {
		try {
			const { error } = await supabase.from("hero_slides").delete().eq("id", id);
			if (error) {
				console.error("[DeleteSlide] Supabase error deleting slide:", error);
				toast.error(`Delete failed: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["hero_slides"] });
			toast.success("Slide deleted.");
		} catch (err) {
			console.error("[DeleteSlide] Unexpected error:", err);
		}
	};
	const handleReorderSlides = async (index, direction) => {
		if (direction === "up" && index === 0) return;
		if (direction === "down" && index === slides.length - 1) return;
		const targetIndex = direction === "up" ? index - 1 : index + 1;
		const slideA = slides[index];
		const slideB = slides[targetIndex];
		try {
			const { error } = await supabase.from("hero_slides").upsert([{
				id: slideA.id,
				display_order: slideB.display_order,
				image_url: slideA.image_url,
				alt_text: slideA.alt_text
			}, {
				id: slideB.id,
				display_order: slideA.display_order,
				image_url: slideB.image_url,
				alt_text: slideB.alt_text
			}]);
			if (error) {
				console.error("[ReorderSlides] Supabase error reordering slides:", error);
				toast.error(`Failed to reorder: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["hero_slides"] });
		} catch (err) {
			console.error("[ReorderSlides] Unexpected error:", err);
		}
	};
	const handleSaveSections = async () => {
		try {
			const { error } = await supabase.from("homepage_sections").upsert({
				id: "default",
				show_categories: showCategories,
				show_new_arrivals: showNewArrivals,
				show_featured: showFeatured,
				categories_title: categoriesTitle,
				new_arrivals_title: newArrivalsTitle,
				featured_title: featuredTitle
			});
			if (error) {
				console.error("[SaveSections] Supabase error saving homepage sections:", error);
				toast.error(`Save failed: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["homepage_sections"] });
			toast.success("Homepage sections settings saved successfully!");
		} catch (err) {
			console.error("[SaveSections] Unexpected error saving sections:", err);
			toast.error("An unexpected error occurred.");
		}
	};
	const handleAddBanner = async (url) => {
		try {
			const nextOrder = banners.length > 0 ? Math.max(...banners.map((b) => b.display_order)) + 1 : 0;
			const { error } = await supabase.from("promo_banners").insert({
				image_url: url,
				banner_text: "New Promo Banner",
				button_link: "/marketplace",
				button_text: "Shop Now",
				display_order: nextOrder,
				is_enabled: true
			});
			if (error) {
				console.error("[AddBanner] Supabase error adding promo banner:", error);
				toast.error(`Failed to add banner: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
			toast.success("Promo banner added successfully!");
		} catch (err) {
			console.error("[AddBanner] Unexpected error:", err);
		}
	};
	const handleUpdateBanner = async (id, updates) => {
		try {
			const { error } = await supabase.from("promo_banners").update(updates).eq("id", id);
			if (error) {
				console.error("[UpdateBanner] Supabase error updating banner:", error);
				toast.error(`Update failed: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
			toast.success("Banner updated!");
		} catch (err) {
			console.error("[UpdateBanner] Unexpected error:", err);
		}
	};
	const handleDeleteBanner = async (id) => {
		try {
			const { error } = await supabase.from("promo_banners").delete().eq("id", id);
			if (error) {
				console.error("[DeleteBanner] Supabase error deleting banner:", error);
				toast.error(`Delete failed: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
			toast.success("Promo banner deleted.");
		} catch (err) {
			console.error("[DeleteBanner] Unexpected error:", err);
		}
	};
	const handleReorderBanners = async (index, direction) => {
		if (direction === "up" && index === 0) return;
		if (direction === "down" && index === banners.length - 1) return;
		const targetIndex = direction === "up" ? index - 1 : index + 1;
		const bannerA = banners[index];
		const bannerB = banners[targetIndex];
		try {
			const { error } = await supabase.from("promo_banners").upsert([{
				id: bannerA.id,
				display_order: bannerB.display_order,
				image_url: bannerA.image_url,
				banner_text: bannerA.banner_text,
				button_link: bannerA.button_link
			}, {
				id: bannerB.id,
				display_order: bannerA.display_order,
				image_url: bannerB.image_url,
				banner_text: bannerB.banner_text,
				button_link: bannerB.button_link
			}]);
			if (error) {
				console.error("[ReorderBanners] Supabase error reordering banners:", error);
				toast.error(`Failed to reorder: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["promo_banners"] });
		} catch (err) {
			console.error("[ReorderBanners] Unexpected error:", err);
		}
	};
	const [newLinkLabel, setNewLinkLabel] = (0, import_react.useState)("");
	const [newLinkUrl, setNewLinkUrl] = (0, import_react.useState)("");
	const [newLinkCategory, setNewLinkCategory] = (0, import_react.useState)("Company");
	const handleAddFooterLink = async () => {
		if (!newLinkLabel || !newLinkUrl) {
			toast.error("Please fill in both the label and link URL.");
			return;
		}
		try {
			const nextOrder = footerLinks.length > 0 ? Math.max(...footerLinks.map((l) => l.display_order)) + 1 : 0;
			const { error } = await supabase.from("footer_links").insert({
				label: newLinkLabel,
				url: newLinkUrl,
				category: newLinkCategory,
				display_order: nextOrder
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
		} catch (err) {
			console.error("[AddFooterLink] Unexpected error:", err);
		}
	};
	const handleDeleteFooterLink = async (id) => {
		try {
			const { error } = await supabase.from("footer_links").delete().eq("id", id);
			if (error) {
				console.error("[DeleteFooterLink] Supabase error deleting link:", error);
				toast.error(`Delete failed: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["footer_links"] });
			toast.success("Footer link deleted.");
		} catch (err) {
			console.error("[DeleteFooterLink] Unexpected error:", err);
		}
	};
	const handleReorderFooterLinks = async (index, direction) => {
		if (direction === "up" && index === 0) return;
		if (direction === "down" && index === footerLinks.length - 1) return;
		const targetIndex = direction === "up" ? index - 1 : index + 1;
		const linkA = footerLinks[index];
		const linkB = footerLinks[targetIndex];
		try {
			const { error } = await supabase.from("footer_links").upsert([{
				id: linkA.id,
				display_order: linkB.display_order,
				label: linkA.label,
				url: linkA.url,
				category: linkA.category
			}, {
				id: linkB.id,
				display_order: linkA.display_order,
				label: linkB.label,
				url: linkB.url,
				category: linkB.category
			}]);
			if (error) {
				console.error("[ReorderFooterLinks] Supabase error reordering links:", error);
				toast.error(`Failed to reorder: ${error.message}`);
				return;
			}
			queryClient.invalidateQueries({ queryKey: ["footer_links"] });
		} catch (err) {
			console.error("[ReorderFooterLinks] Unexpected error:", err);
		}
	};
	if ((loadingSettings || loadingSlides || loadingSections || loadingBanners || loadingFooterLinks) && !initialized) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[350px] items-center justify-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ml-3 text-sm text-muted-foreground",
			children: "Loading configurations…"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-3xl font-extrabold tracking-tight",
			children: "Content Manager"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted-foreground mt-1",
			children: "Customize the homepage layout, colors, slider, banners, and links on Saloree's public website."
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			value: activeTab,
			onValueChange: setActiveTab,
			className: "w-full",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "grid w-full grid-cols-4 bg-muted/80 p-1 rounded-xl",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "hero",
							className: "rounded-lg gap-2 text-xs sm:text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlay, { className: "size-4" }), " Hero & Slider"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "sections",
							className: "rounded-lg gap-2 text-xs sm:text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" }), " Homepage Sections"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "banners",
							className: "rounded-lg gap-2 text-xs sm:text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "size-4" }), " Promo Banners"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsTrigger, {
							value: "branding",
							className: "rounded-lg gap-2 text-xs sm:text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4" }), " Branding & Footer"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "hero",
					className: "mt-4 space-y-4 focus-visible:outline-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "shadow-soft border-slate-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Hero Section Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Configure the primary title, subtitle, and CTA button of the homepage hero banner." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "heroTitle",
											children: "Hero Title"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "heroTitle",
											value: heroTitle,
											onChange: (e) => setHeroTitle(e.target.value),
											placeholder: "e.g. Shop everything you need, all in one place"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "heroSubtitle",
											children: "Hero Subtitle"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
											id: "heroSubtitle",
											value: heroSubtitle,
											onChange: (e) => setHeroSubtitle(e.target.value),
											placeholder: "e.g. Discover top products from trusted sellers at the best prices.",
											rows: 3
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "heroButtonText",
												children: "CTA Button Text"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "heroButtonText",
												value: heroButtonText,
												onChange: (e) => setHeroButtonText(e.target.value),
												placeholder: "e.g. Shop Now"
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "heroButtonLink",
												children: "CTA Button Link"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "heroButtonLink",
												value: heroButtonLink,
												onChange: (e) => setHeroButtonLink(e.target.value),
												placeholder: "e.g. /marketplace"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
								className: "justify-end border-t bg-muted/20 px-6 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: handleSaveHeroAndBranding,
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save Hero Settings"]
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "shadow-soft border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between space-y-0 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Hero Slides Manager" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Upload, remove, toggle, and reorder images shown in the homepage hero slider." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "relative cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 cursor-pointer",
									children: [
										uploading === "new-slide" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
										"Add Slide Image",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											className: "hidden",
											disabled: uploading !== null,
											onChange: (e) => handleFileUpload(e, "new-slide")
										})
									]
								})
							}) })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: slides.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed p-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { className: "mx-auto h-12 w-12 text-muted-foreground/50" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-semibold",
									children: "No custom slides uploaded"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: "The homepage is currently falling back to the 4 default product banner assets."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: slides.map((slide, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-24 w-40 shrink-0 overflow-hidden rounded-lg border bg-slate-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: slide.image_url,
											alt: slide.alt_text,
											className: "h-full w-full object-contain"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "absolute bottom-1 right-1 cursor-pointer rounded bg-black/60 p-1 text-white hover:bg-black transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												className: "hidden",
												onChange: (e) => handleFileUpload(e, `slide-${slide.id}`)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 space-y-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-xs font-semibold text-muted-foreground",
												children: "Alt Text (Accessibility)"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												value: slide.alt_text,
												onChange: (e) => handleUpdateSlide(slide.id, { alt_text: e.target.value }),
												placeholder: "Describe this slide image..."
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex items-center gap-6",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
													checked: slide.is_enabled,
													onCheckedChange: (checked) => handleUpdateSlide(slide.id, { is_enabled: checked })
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-sm font-medium",
													children: slide.is_enabled ? "Active" : "Disabled"
												})]
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-1.5 border-t pt-3 sm:border-t-0 sm:pt-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												disabled: index === 0,
												onClick: () => handleReorderSlides(index, "up"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												disabled: index === slides.length - 1,
												onClick: () => handleReorderSlides(index, "down"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
												onClick: () => handleDeleteSlide(slide.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})
										]
									})
								]
							}, slide.id))
						}) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "sections",
					className: "mt-4 focus-visible:outline-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "shadow-soft border-slate-100",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Homepage Layout Manager" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Toggle the visibility of sections on the public homepage and rename section headings." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border p-4 space-y-4 bg-slate-50/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-base font-semibold",
													children: "Shop by Category Section"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Show/hide the dynamic product category cards grid."
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: showCategories,
												onCheckedChange: setShowCategories
											})]
										}), showCategories && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "catTitle",
												children: "Section Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "catTitle",
												value: categoriesTitle,
												onChange: (e) => setCategoriesTitle(e.target.value),
												placeholder: "e.g. Shop by Category"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border p-4 space-y-4 bg-slate-50/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-base font-semibold",
													children: "New Arrivals Section"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Show/hide recently added active products."
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: showNewArrivals,
												onCheckedChange: setShowNewArrivals
											})]
										}), showNewArrivals && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "newTitle",
												children: "Section Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "newTitle",
												value: newArrivalsTitle,
												onChange: (e) => setNewArrivalsTitle(e.target.value),
												placeholder: "e.g. New Arrivals"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "rounded-xl border p-4 space-y-4 bg-slate-50/30",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-0.5",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-base font-semibold",
													children: "Featured Products Section"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Show/hide products filtered as featured."
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
												checked: showFeatured,
												onCheckedChange: setShowFeatured
											})]
										}), showFeatured && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "featuredTitle",
												children: "Section Title"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "featuredTitle",
												value: featuredTitle,
												onChange: (e) => setFeaturedTitle(e.target.value),
												placeholder: "e.g. Featured Products"
											})]
										})]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
								className: "justify-end border-t bg-muted/20 px-6 py-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									onClick: handleSaveSections,
									className: "gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save Sections Layout"]
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
					value: "banners",
					className: "mt-4 focus-visible:outline-none",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "shadow-soft border-slate-100",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
							className: "flex flex-row items-center justify-between space-y-0 pb-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Homepage Promo Banners" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Promote deals or stores via eye-catching cards placed between homepage sections." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "relative cursor-pointer",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "flex items-center gap-2 cursor-pointer",
									children: [
										uploading === "new-banner" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
										"Add Promo Banner",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											accept: "image/*",
											className: "hidden",
											disabled: uploading !== null,
											onChange: (e) => handleFileUpload(e, "new-banner")
										})
									]
								})
							}) })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: banners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-dashed p-10 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { className: "mx-auto h-12 w-12 text-muted-foreground/50" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm font-semibold",
									children: "No promotional banners configured"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground mt-1",
									children: "Upload a high-quality promo banner to showcase campaigns or top categories."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "space-y-4",
							children: banners.map((banner, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-4 rounded-xl border p-4 lg:flex-row lg:items-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative h-28 w-48 shrink-0 overflow-hidden rounded-lg border bg-slate-50",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
											src: banner.image_url,
											alt: banner.banner_text,
											className: "h-full w-full object-cover"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "absolute bottom-1 right-1 cursor-pointer rounded bg-black/60 p-1 text-white hover:bg-black transition",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "file",
												accept: "image/*",
												className: "hidden",
												onChange: (e) => handleFileUpload(e, `banner-${banner.id}`)
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 grid gap-3 sm:grid-cols-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs font-semibold text-muted-foreground",
													children: "Banner Text (Campaign Message)"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: banner.banner_text,
													onChange: (e) => handleUpdateBanner(banner.id, { banner_text: e.target.value }),
													placeholder: "e.g. Up to 40% off on Tech Gadgets!"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs font-semibold text-muted-foreground",
													children: "Button Link"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: banner.button_link,
													onChange: (e) => handleUpdateBanner(banner.id, { button_link: e.target.value }),
													placeholder: "e.g. /marketplace?q=electronics"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													className: "text-xs font-semibold text-muted-foreground",
													children: "Button Text"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													value: banner.button_text || "Shop Now",
													onChange: (e) => handleUpdateBanner(banner.id, { button_text: e.target.value }),
													placeholder: "e.g. Explore Deals"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "flex items-center gap-6 mt-3 sm:mt-0",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
														checked: banner.is_enabled,
														onCheckedChange: (checked) => handleUpdateBanner(banner.id, { is_enabled: checked })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-sm font-medium",
														children: banner.is_enabled ? "Active" : "Disabled"
													})]
												})
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-1 px-1 border-t pt-3 lg:border-t-0 lg:pt-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												disabled: index === 0,
												onClick: () => handleReorderBanners(index, "up"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												disabled: index === banners.length - 1,
												onClick: () => handleReorderBanners(index, "down"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												variant: "ghost",
												size: "icon",
												className: "text-destructive hover:bg-destructive/10 hover:text-destructive",
												onClick: () => handleDeleteBanner(banner.id),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
											})
										]
									})
								]
							}, banner.id))
						}) })]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "branding",
					className: "mt-4 space-y-4 focus-visible:outline-none",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "shadow-soft border-slate-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Branding Settings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Customize colors, branding logos, and header details to match Saloree's custom identity." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-col gap-6 sm:flex-row sm:items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border bg-slate-50 flex items-center justify-center p-2",
											children: [logoUrl ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
												src: logoUrl,
												alt: "Logo preview",
												className: "max-h-full max-w-full object-contain"
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-xs text-muted-foreground",
												children: "Default logo"
											}), uploading === "logo" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "absolute inset-0 bg-black/50 flex items-center justify-center text-white",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-5 animate-spin" })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 space-y-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Website Header Logo" }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														asChild: true,
														variant: "outline",
														size: "sm",
														className: "relative cursor-pointer",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
															className: "cursor-pointer",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-3.5 mr-2 inline" }),
																" Upload Custom Logo",
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
																	type: "file",
																	accept: "image/*",
																	className: "hidden",
																	disabled: uploading !== null,
																	onChange: (e) => handleFileUpload(e, "logo")
																})
															]
														})
													}), logoUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "sm",
														className: "text-destructive hover:bg-destructive/10",
														onClick: () => setLogoUrl(""),
														children: "Reset to default"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Suggest PNG or transparent WebP around 200x80px."
												})
											]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "grid gap-4 sm:grid-cols-2 border-t pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "primaryCol",
													children: "Primary Branding Color"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														id: "primaryCol",
														type: "color",
														value: primaryColor,
														onChange: (e) => setPrimaryColor(e.target.value),
														className: "h-9 w-12 cursor-pointer rounded-lg border p-0.5"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: primaryColor,
														onChange: (e) => setPrimaryColor(e.target.value),
														placeholder: "#ef4444",
														maxLength: 7,
														className: "font-mono text-sm uppercase"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Applies to highlights, text primary, and accents."
												})
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "btnCol",
													children: "Primary Button Color"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
														id: "btnCol",
														type: "color",
														value: buttonColor,
														onChange: (e) => setButtonColor(e.target.value),
														className: "h-9 w-12 cursor-pointer rounded-lg border p-0.5"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														value: buttonColor,
														onChange: (e) => setButtonColor(e.target.value),
														placeholder: "#ef4444",
														maxLength: 7,
														className: "font-mono text-sm uppercase"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: "Applies specifically to primary background CTA buttons."
												})
											]
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
									className: "justify-end border-t bg-muted/20 px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleSaveHeroAndBranding,
										className: "gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save Branding Settings"]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "shadow-soft border-slate-100",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Footer Information & Socials" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Customize description, copyrights, and direct links to social media accounts." })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
									className: "space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "footerDesc",
												children: "Footer Description"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
												id: "footerDesc",
												value: footerDescription,
												onChange: (e) => setFooterDescription(e.target.value),
												placeholder: "e.g. A modern multi-vendor marketplace where anyone can launch a store and start selling.",
												rows: 2
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												htmlFor: "footerCopyright",
												children: "Footer Copyright Text"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
												id: "footerCopyright",
												value: footerText,
												onChange: (e) => setFooterText(e.target.value),
												placeholder: "e.g. © 2026 Saloree. All rights reserved."
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "border-t pt-4 space-y-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
												className: "text-base font-semibold",
												children: "Social Links"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid gap-4 sm:grid-cols-2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "fb",
															className: "text-xs",
															children: "Facebook URL"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "fb",
															value: facebookUrl,
															onChange: (e) => setFacebookUrl(e.target.value),
															placeholder: "facebook.com/saloree"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "tw",
															className: "text-xs",
															children: "Twitter / X URL"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "tw",
															value: twitterUrl,
															onChange: (e) => setTwitterUrl(e.target.value),
															placeholder: "x.com/saloree"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "ig",
															className: "text-xs",
															children: "Instagram URL"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "ig",
															value: instagramUrl,
															onChange: (e) => setInstagramUrl(e.target.value),
															placeholder: "instagram.com/saloree"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "ln",
															className: "text-xs",
															children: "LinkedIn URL"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "ln",
															value: linkedinUrl,
															onChange: (e) => setLinkedinUrl(e.target.value),
															placeholder: "linkedin.com/company/saloree"
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "grid gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
															htmlFor: "yt",
															className: "text-xs",
															children: "YouTube URL"
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
															id: "yt",
															value: youtubeUrl,
															onChange: (e) => setYoutubeUrl(e.target.value),
															placeholder: "youtube.com/@saloree"
														})]
													})
												]
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
									className: "justify-end border-t bg-muted/20 px-6 py-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: handleSaveHeroAndBranding,
										className: "gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), " Save Footer Settings"]
									})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "shadow-soft border-slate-100",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Footer Links Manager" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Add, group, or delete links displayed under category columns in the public footer." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "space-y-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border p-4 bg-slate-50/20 space-y-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											className: "text-sm font-semibold",
											children: "Add New Link"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "grid gap-4 sm:grid-cols-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "label",
														className: "text-xs",
														children: "Link Label"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "label",
														value: newLinkLabel,
														onChange: (e) => setNewLinkLabel(e.target.value),
														placeholder: "e.g. Terms of Service"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "url",
														className: "text-xs",
														children: "Link URL"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
														id: "url",
														value: newLinkUrl,
														onChange: (e) => setNewLinkUrl(e.target.value),
														placeholder: "e.g. /terms or https://..."
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "grid gap-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "category",
														className: "text-xs",
														children: "Category Header"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
														value: newLinkCategory,
														onValueChange: setNewLinkCategory,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
															id: "category",
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select Category" })
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectContent, { children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																value: "Company",
																children: "Company"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																value: "Shop",
																children: "Shop"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																value: "Become a Seller",
																children: "Become a Seller"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
																value: "Support",
																children: "Support"
															})
														] })]
													})]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex justify-end pt-2",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
												onClick: handleAddFooterLink,
												size: "sm",
												className: "gap-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), " Add Link"]
											})
										})
									]
								}), footerLinks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-dashed p-10 text-center text-muted-foreground text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "mx-auto size-8 text-muted-foreground/50 mb-2" }), "No custom footer links added. Currently showing the default marketplace links."]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										className: "text-sm font-semibold",
										children: "Active Footer Links"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "divide-y rounded-xl border",
										children: footerLinks.map((link, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center justify-between p-3.5 hover:bg-slate-50/50",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "grid",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-sm",
													children: link.label
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: [
														link.url,
														" •",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "font-medium text-slate-600",
															children: link.category
														})
													]
												})]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-1",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														className: "h-8 w-8",
														disabled: index === 0,
														onClick: () => handleReorderFooterLinks(index, "up"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														className: "h-8 w-8",
														disabled: index === footerLinks.length - 1,
														onClick: () => handleReorderFooterLinks(index, "down"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
														variant: "ghost",
														size: "icon",
														className: "h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive",
														onClick: () => handleDeleteFooterLink(link.id),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
													})
												]
											})]
										}, link.id))
									})]
								})]
							})]
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { AdminContentManager as component };
