import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

const searchSchema = z.object({
  q: z.string().optional(),
  cat: z.string().optional(),
});

export const Route = createFileRoute("/marketplace")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Marketplace — Saloree" },
      {
        name: "description",
        content: "Browse thousands of products from sellers across the Saloree marketplace.",
      },
    ],
  }),
  component: Marketplace,
});

function Marketplace() {
  const { q, cat } = Route.useSearch();
  const [localQ, setLocalQ] = useState(q ?? "");
  const navigate = Route.useNavigate();
  const { language } = useLocale();

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => (await supabase.from("categories").select("*").order("name")).data ?? [],
  });

  const { data: products, isLoading } = useQuery({
    queryKey: ["marketplace", q, cat],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, stores(name, slug, logo_url), categories!inner(name, slug)",
        )
        .eq("status", "active")
        .order("created_at", { ascending: false })
        .limit(60);
      if (q && q.trim()) query = query.textSearch("search_tsv", q.trim(), { type: "websearch" });
      if (cat) query = query.eq("categories.slug", cat);
      const { data, error } = await query;
      if (error) {
        console.error("[marketplace-products] Supabase error:", error);
        throw error;
      }
      return (data ?? []) as ProductCardData[];
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <header className="mb-4">
        <h1 className="text-2xl font-bold">Marketplace</h1>
        <p className="text-sm text-muted-foreground">{q ? `Results for "${q}"` : "All products"}</p>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ search: { q: localQ, cat } });
        }}
        className="mb-4 flex gap-2"
      >
        <input
          value={localQ}
          onChange={(e) => setLocalQ(e.target.value)}
          placeholder="Search products..."
          className="h-10 flex-1 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button className="h-10 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90">
          Search
        </button>
      </form>

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <aside className="rounded-lg border bg-card p-3 lg:sticky lg:top-24 lg:self-start">
          <h2 className="mb-2 text-sm font-semibold">Categories</h2>
          <ul className="space-y-1 text-sm">
            <li>
              <button
                onClick={() => navigate({ search: { q, cat: undefined } })}
                className={`block w-full rounded-md px-2 py-1.5 text-left hover:bg-accent ${!cat ? "bg-accent font-semibold" : ""}`}
              >
                All
              </button>
            </li>
            {(categories ?? []).map((c) => (
              <li key={c.id}>
                <Link
                  to="/categories/$slug"
                  params={{ slug: c.slug }}
                  className={`block rounded-md px-2 py-1.5 hover:bg-accent ${cat === c.slug ? "bg-accent font-semibold" : ""}`}
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        <div>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : products && products.length ? (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
              No products found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
