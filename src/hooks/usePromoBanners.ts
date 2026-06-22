import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isSchemaMissingError } from "@/lib/utils";

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
