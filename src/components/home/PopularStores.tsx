import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Store as StoreIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PopularStores() {
  const { data: stores = [], isLoading } = useQuery({
    queryKey: ["home-popular-stores"],
    queryFn: async () => {
      const { data: storesData, error } = await supabase
        .from("stores")
        .select("id, name, slug, logo_url, description, category, location, status")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("[PopularStores] Supabase error:", error);
        return [];
      }

      if (!storesData || storesData.length === 0) return [];

      const storeIds = storesData.map((s) => s.id);
      const { data: productsData } = await supabase
        .from("products")
        .select("id, store_id, title, featured_image")
        .in("store_id", storeIds)
        .eq("status", "active")
        .order("created_at", { ascending: false });

      return storesData.map((store) => {
        const storeProducts = (productsData ?? [])
          .filter((p) => p.store_id === store.id)
          .slice(0, 3);
        return {
          ...store,
          products: storeProducts,
        };
      });
    },
  });

  if (!isLoading && stores.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-end justify-between mb-8 sm:mb-10">
        <div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Popular Stores
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">
            Explore independent sellers on Saloree
          </p>
        </div>
        <Link
          to="/marketplace"
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#E11D48] transition-colors"
        >
          <span>All Stores</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-soft animate-pulse"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-slate-200" />
                <div className="flex-1">
                  <div className="h-4 w-2/3 bg-slate-200 rounded" />
                  <div className="h-3 w-1/3 bg-slate-200 rounded mt-2" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="aspect-square bg-slate-200 rounded-lg" />
                <div className="aspect-square bg-slate-200 rounded-lg" />
                <div className="aspect-square bg-slate-200 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex gap-6 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {stores.map((store) => {
            const firstLetter = (store.name || "S").charAt(0).toUpperCase();
            return (
              <Link
                key={store.id}
                to="/stores/$slug"
                params={{ slug: store.slug }}
                className="min-w-[280px] sm:min-w-0 flex-1 bg-white border border-slate-200 rounded-2xl p-4 hover:border-[#E11D48]/40 transition-all duration-300 hover:-translate-y-1 shadow-soft hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="w-12 h-12 border border-slate-100">
                      {store.logo_url && <AvatarImage src={store.logo_url} alt={store.name} />}
                      <AvatarFallback className="bg-slate-900 text-white font-bold text-base">
                        {firstLetter}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="font-bold text-sm text-slate-900 truncate">{store.name}</h3>
                      {store.category && (
                        <p className="text-xs text-slate-500 truncate mt-0.5">{store.category}</p>
                      )}
                    </div>
                  </div>

                  {/* 3 Real Product Thumbnails from this store */}
                  <div className="grid grid-cols-3 gap-2">
                    {Array.from({ length: 3 }).map((_, idx) => {
                      const prod = store.products[idx];
                      return (
                        <div
                          key={idx}
                          className="rounded-lg aspect-square bg-slate-100 overflow-hidden border border-slate-100 relative"
                        >
                          {prod && prod.featured_image ? (
                            <img
                              src={prod.featured_image}
                              alt={prod.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                              <StoreIcon className="size-4" />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
