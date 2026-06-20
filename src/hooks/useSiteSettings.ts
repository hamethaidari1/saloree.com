import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/** Checks whether the Supabase error is a "table/schema not found" error */
function isSchemaMissingError(error: any): boolean {
  const msg = error?.message ?? "";
  return (
    msg.includes("schema cache") ||
    msg.includes("relation") ||
    msg.includes("does not exist") ||
    msg.includes("not found")
  );
}

export function useSiteSettings() {
  return useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .maybeSingle();
      if (error) {
        if (isSchemaMissingError(error)) {
          console.warn(
            "[useSiteSettings] Table 'site_settings' does not exist yet. " +
              "Please run supabase/apply_content_manager.sql in the Supabase SQL Editor.",
            error
          );
          return null;
        }
        console.error("[useSiteSettings] Supabase error:", error);
      }
      return data ?? null;
    },
    retry: false,
  });
}

export function useHeroSlides() {
  return useQuery({
    queryKey: ["hero_slides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_slides")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) {
        if (isSchemaMissingError(error)) {
          console.warn(
            "[useHeroSlides] Table 'hero_slides' does not exist yet. " +
              "Please run supabase/apply_content_manager.sql in the Supabase SQL Editor.",
            error
          );
          return [];
        }
        console.error("[useHeroSlides] Supabase error:", error);
      }
      return data ?? [];
    },
    retry: false,
  });
}

export function useHomepageSections() {
  return useQuery({
    queryKey: ["homepage_sections"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("homepage_sections")
        .select("*")
        .maybeSingle();
      if (error) {
        if (isSchemaMissingError(error)) {
          console.warn(
            "[useHomepageSections] Table 'homepage_sections' does not exist yet. " +
              "Please run supabase/apply_content_manager.sql in the Supabase SQL Editor.",
            error
          );
          return null;
        }
        console.error("[useHomepageSections] Supabase error:", error);
      }
      return data ?? null;
    },
    retry: false,
  });
}

export function usePromoBanners() {
  return useQuery({
    queryKey: ["promo_banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("promo_banners")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) {
        if (isSchemaMissingError(error)) {
          console.warn(
            "[usePromoBanners] Table 'promo_banners' does not exist yet. " +
              "Please run supabase/apply_content_manager.sql in the Supabase SQL Editor.",
            error
          );
          return [];
        }
        console.error("[usePromoBanners] Supabase error:", error);
      }
      return data ?? [];
    },
    retry: false,
  });
}

export function useFooterLinks() {
  return useQuery({
    queryKey: ["footer_links"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("footer_links")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) {
        if (isSchemaMissingError(error)) {
          console.warn(
            "[useFooterLinks] Table 'footer_links' does not exist yet. " +
              "Please run supabase/apply_content_manager.sql in the Supabase SQL Editor.",
            error
          );
          return [];
        }
        console.error("[useFooterLinks] Supabase error:", error);
      }
      return data ?? [];
    },
    retry: false,
  });
}
