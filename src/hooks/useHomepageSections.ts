import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { isSchemaMissingError } from "@/lib/utils";

export interface HomepageSectionsData {
  id: string;
  show_categories: boolean;
  show_new_arrivals: boolean;
  show_featured: boolean;
  categories_title: string;
  new_arrivals_title: string;
  featured_title: string;
  created_at: string;

  // Extra UI configurations
  show_how_it_works?: boolean;
  how_it_works_title?: string;
  show_trending_products?: boolean;
  trending_products_title?: string;
  flash_sale_enabled?: boolean;
  flash_sale_title?: string;
  show_statistics?: boolean;
  statistics_title?: string;
  show_top_sellers?: boolean;
  top_sellers_title?: string;
  show_featured_brands?: boolean;
  featured_brands_title?: string;
  show_why_saloree?: boolean;
  why_saloree_title?: string;
  show_customer_reviews?: boolean;
  customer_reviews_title?: string;
  show_mobile_app?: boolean;
  mobile_app_title?: string;
  show_newsletter?: boolean;
  newsletter_title?: string;
  show_footer?: boolean;
  footer_title?: string;
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
      
      if (!data) return null;
      
      return {
        ...data,
        show_how_it_works: true,
        how_it_works_title: "How It Works",
        show_trending_products: true,
        trending_products_title: "Trending Products",
        flash_sale_enabled: true,
        flash_sale_title: "Flash Sale",
        show_statistics: true,
        statistics_title: "Our Global Reach",
        show_top_sellers: true,
        top_sellers_title: "Top Sellers",
        show_featured_brands: true,
        featured_brands_title: "Featured Brands",
        show_why_saloree: true,
        why_saloree_title: "Why Saloree?",
        show_customer_reviews: true,
        customer_reviews_title: "What Our Customers Say",
        show_mobile_app: true,
        mobile_app_title: "Download Our Mobile App",
        show_newsletter: true,
        newsletter_title: "Stay Updated!",
        show_footer: true,
        footer_title: "Footer",
      } as HomepageSectionsData;
    },
    retry: false,
  });
}
