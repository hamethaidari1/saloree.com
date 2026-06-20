import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

export const Route = createFileRoute("/categories/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug} — Saloree` },
      { name: "description", content: `Shop ${params.slug} on Saloree.` },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { slug } = Route.useParams();
  const { data: category } = useQuery({
    queryKey: ["category", slug],
    queryFn: async () => {
      const { data } = await supabase.from("categories").select("*").eq("slug", slug).maybeSingle();
      if (!data) throw notFound();
      return data;
    },
  });
  const { data: products } = useQuery({
    queryKey: ["products", "by-cat", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, stores(name, slug, logo_url), categories!inner(name, slug)",
        )
        .eq("status", "active")
        .eq("categories.slug", slug)
        .order("created_at", { ascending: false });
      if (error) {
        console.error("[category-products] Supabase error:", error);
        throw error;
      }
      return (data ?? []) as ProductCardData[];
    },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/marketplace" className="hover:text-primary">
          Marketplace
        </Link>{" "}
        / <span className="text-foreground">{category?.name ?? slug}</span>
      </nav>
      <h1 className="text-2xl font-bold sm:text-3xl">{category?.name ?? slug}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{products?.length ?? 0} products</p>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {(products ?? []).map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
        {products && products.length === 0 && (
          <p className="col-span-full rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
            No products yet.
          </p>
        )}
      </div>
    </div>
  );
}
