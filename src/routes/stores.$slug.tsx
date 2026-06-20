import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/stores/$slug")({
  head: ({ params }) => ({ meta: [{ title: `${params.slug} — Saloree Store` }] }),
  component: StorePage,
});

function StorePage() {
  const { slug } = Route.useParams();
  const { user, loading: authLoading } = useAuth();
  const {
    data: store,
    error: storeError,
    isLoading: storeLoading,
  } = useQuery({
    queryKey: ["store", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      if (error) {
        console.error("[store-page] Supabase error:", error);
        throw error;
      }
      return data;
    },
  });
  const isOwnerPreview = !!user && !!store && user.id === store.owner_id;

  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["store-products", store?.id, isOwnerPreview],
    enabled: !!store?.id && !authLoading,
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("store_id", store!.id)
        .order("created_at", { ascending: false });

      query = isOwnerPreview
        ? query.in("status", ["draft", "active"])
        : query.eq("status", "active");

      const { data, error } = await query;

      if (error) {
        console.error("[store-products] Supabase error:", error);
        throw error;
      }
      return (data ?? []) as ProductCardData[];
    },
  });

  if (storeLoading || authLoading) {
    return <div className="p-10 text-center text-sm text-muted-foreground">Loading...</div>;
  }

  if (storeError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
          Unable to load this store right now.
        </div>
      </div>
    );
  }

  if (!store) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
          Store not found.
        </div>
      </div>
    );
  }

  const storeName = store.name || "Store";
  const storeDescription = store.description || "No description available yet.";
  const storeInitial = (storeName || "S").charAt(0);

  return (
    <div>
      <div className="relative h-48 w-full overflow-hidden bg-primary-soft sm:h-64">
        {store.banner_url ? (
          <img
            src={store.banner_url}
            alt={`${storeName} banner`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-primary-soft text-sm text-muted-foreground">
            No banner available
          </div>
        )}
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-10">
        <div className="-mt-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-6">
          <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-xl border-4 border-background bg-card shadow-card">
            {store.logo_url ? (
              <img src={store.logo_url} alt={storeName} className="h-full w-full object-cover" />
            ) : (
              <span className="text-3xl font-bold text-primary">{storeInitial}</span>
            )}
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold sm:text-3xl">{storeName}</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{storeDescription}</p>
            {isOwnerPreview && (
              <p className="mt-2 text-xs font-medium text-primary">
                Seller preview: draft and active products are visible here.
              </p>
            )}
          </div>
        </div>

        <h2 className="mt-8 text-xl font-bold">Products</h2>
        {productsError ? (
          <div className="mt-3 rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
            Unable to load store products right now.
          </div>
        ) : productsLoading ? (
          <div className="mt-3 text-sm text-muted-foreground">Loading...</div>
        ) : (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {(products ?? []).map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
            {products && products.length === 0 && (
              <p className="col-span-full rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
                {isOwnerPreview
                  ? "No active products yet. Draft products appear here for seller preview."
                  : "No active products yet."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
