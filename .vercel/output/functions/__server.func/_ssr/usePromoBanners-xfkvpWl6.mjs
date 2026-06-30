import { t as supabase } from "./client-DfK1yIpk.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { r as isSchemaMissingError } from "./button-Cr1ZI0g1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/usePromoBanners-xfkvpWl6.js
function useHomepageSections() {
	return useQuery({
		queryKey: ["homepage_sections"],
		queryFn: async () => {
			const { data, error } = await supabase.from("homepage_sections").select("*").maybeSingle();
			if (error) {
				if (isSchemaMissingError(error)) {
					console.warn("[useHomepageSections] Table 'homepage_sections' does not exist yet. Please run supabase/apply_content_manager.sql in the Supabase SQL Editor.", error);
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
				footer_title: "Footer"
			};
		},
		retry: false
	});
}
function usePromoBanners() {
	return useQuery({
		queryKey: ["promo_banners"],
		queryFn: async () => {
			const { data, error } = await supabase.from("promo_banners").select("*").order("display_order", { ascending: true });
			if (error) {
				if (isSchemaMissingError(error)) {
					console.warn("[usePromoBanners] Table 'promo_banners' does not exist yet. Please run supabase/apply_content_manager.sql in the Supabase SQL Editor.", error);
					return [];
				}
				console.error("[usePromoBanners] Supabase error:", error);
			}
			return data ?? [];
		},
		retry: false
	});
}
//#endregion
export { usePromoBanners as n, useHomepageSections as t };
