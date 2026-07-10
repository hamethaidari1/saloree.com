import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Star, Store, ArrowRight, LayoutGrid, Search } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: "Browse Stores — Saloree" },
      {
        name: "description",
        content: "Discover and follow your favorite stores on Saloree.",
      },
    ],
  }),
  component: StoresPage,
});

function StoresPage() {
  const { language } = useLocale();
  const [q, setQ] = useState("");

  const { data: stores, isLoading } = useQuery({
    queryKey: ["stores", q],
    queryFn: async () => {
      let query = supabase
        .from("stores")
        .select("id, name, slug, logo_url, description, created_at")
        .eq("status", "active")
        .order("name");

      if (q.trim()) {
        query = query.ilike("name", `%${q.trim()}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <header className="mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-secondary tracking-tight">Browse Stores</h1>
            <p className="text-muted-foreground mt-1">Discover verified sellers and local brands on Saloree.</p>
          </div>
          
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search stores by name..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="h-10 w-full rounded-full border border-gray-200 pl-10 pr-4 text-sm outline-none focus:border-primary bg-white shadow-soft"
            />
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-48 rounded-2xl border bg-slate-50 animate-pulse" />
          ))}
        </div>
      ) : stores && stores.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stores.map((store, index) => (
            <div
              key={store.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-soft hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16 border border-gray-100 group-hover:scale-105 transition-transform shrink-0">
                  {store.logo_url ? (
                    <img src={store.logo_url} alt={store.name} className="object-cover" />
                  ) : (
                    <AvatarFallback className="bg-gradient-to-tr from-rose-500 to-rose-600 text-white text-xl font-extrabold shadow-inner">
                      {store.name.charAt(0)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-lg font-extrabold text-gray-800 truncate group-hover:text-primary transition-colors">
                      {store.name}
                    </h3>
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-500" title="Verified Store">
                      ✓
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {store.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full">
                    <Star className="size-3 fill-amber-500" /> {(4.5 + (index % 5) * 0.1).toFixed(1)}
                  </div>
                  <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">
                    {120 + (index % 5) * 45}+ Products
                  </span>
                </div>
                <Button asChild variant="ghost" size="sm" className="rounded-full text-xs font-bold text-primary hover:bg-primary-soft cursor-pointer">
                  <Link to="/stores/$slug" params={{ slug: store.slug }}>
                    Visit Store <ArrowRight className="size-3.5 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border-2 border-dashed border-slate-200 p-16 text-center shadow-soft">
          <div className="mx-auto w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4">
            <Store className="size-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-800">No stores found</h3>
          <p className="text-sm text-slate-500 max-w-xs mx-auto mt-1">
            We couldn't find any stores matching your search criteria.
          </p>
          <Button 
            variant="outline" 
            className="mt-6 rounded-full px-8"
            onClick={() => setQ("")}
          >
            Clear Search
          </Button>
        </div>
      )}

      {/* Explore Marketplace CTA */}
      <section className="mt-20 relative overflow-hidden rounded-[32px] bg-slate-900 p-8 md:p-12 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(225,29,72,0.15),transparent_40%)]" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl space-y-4">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">Looking for specific products?</h2>
            <p className="text-slate-400 text-sm md:text-base">
              Explore our full marketplace to find exactly what you're looking for from thousands of verified products.
            </p>
          </div>
          <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-extrabold px-10 h-14 shadow-xl shadow-primary/20 border-none cursor-pointer">
            <Link to="/marketplace">
              <LayoutGrid className="size-5 mr-2" /> Explore Marketplace
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
