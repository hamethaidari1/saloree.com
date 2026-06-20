import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Product — Saloree` },
      { name: "description", content: `Buy ${params.slug} on Saloree.` },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useParams();
  const cart = useCart();
  const { language, formatPrice, translateCategory } = useLocale();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select(
          "*, stores(id, name, slug, logo_url), categories(name, slug), product_images(image_url)",
        )
        .eq("slug", slug)
        .eq("status", "active")
        .maybeSingle();

      if (error) {
        console.error("[product-page] Supabase error:", error);
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-muted-foreground">Loading...</div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
          Unable to load this product right now.
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="rounded-md border border-dashed p-10 text-center text-sm text-muted-foreground">
          Product not found.
        </div>
      </div>
    );
  }

  const images = [
    product.featured_image,
    ...(product.product_images?.map((i: { image_url: string }) => i.image_url) ?? []),
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-8">
      <nav className="mb-4 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">
          {t("home", language)}
        </Link>{" "}
        /{" "}
        <Link to="/marketplace" className="hover:text-primary">
          {t("marketplace", language)}
        </Link>{" "}
        / <span className="text-foreground line-clamp-1 inline">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg border bg-muted">
            {images[0] ? (
              <img src={images[0]} alt={product.title} className="h-full w-full object-cover" />
            ) : (
              <div className="grid h-full place-items-center text-sm text-muted-foreground">
                No image
              </div>
            )}
          </div>
          {images.length > 1 && (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {images.slice(0, 5).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="aspect-square w-full rounded-md border object-cover"
                />
              ))}
            </div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{product.title}</h1>
          {product.stores && (
            <Link
              to="/stores/$slug"
              params={{ slug: product.stores.slug }}
              className="mt-1 inline-block text-sm text-primary hover:underline"
            >
              {t("sold_by", language)} {product.stores.name}
            </Link>
          )}
          {product.categories && (
            <p className="mt-2 text-sm text-muted-foreground">
              {translateCategory(product.categories.name)}
            </p>
          )}
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="size-4 fill-amber-400 text-amber-400" /> 4.7
            </span>
          </div>
          <p className="mt-4 text-3xl font-extrabold">{formatPrice(Number(product.price))}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {product.stock > 0
              ? `${product.stock} ${t("in_stock", language)}`
              : t("out_of_stock", language)}
          </p>

          <p className="mt-6 whitespace-pre-wrap text-sm leading-relaxed">
            {product.description || "No description provided."}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center rounded-md border">
              <button
                className="h-10 w-10 text-lg"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <button className="h-10 w-10 text-lg" onClick={() => setQty((q) => q + 1)}>
                +
              </button>
            </div>
            <Button
              size="lg"
              disabled={product.stock <= 0}
              onClick={() => {
                cart.add(
                  {
                    product_id: product.id,
                    slug: product.slug || product.id,
                    store_id: product.store_id,
                    store_name: product.stores?.name || "Unknown store",
                    title: product.title,
                    price: Number(product.price),
                    featured_image: product.featured_image,
                  },
                  qty,
                );
                toast.success("Added to cart");
              }}
            >
              <ShoppingCart className="size-4" /> {t("add_to_cart", language)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
