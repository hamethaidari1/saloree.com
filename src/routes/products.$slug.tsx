import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  CheckCircle2, 
  Lock, 
  Plus, 
  Minus, 
  ArrowRight, 
  ChevronRight, 
  X, 
  Maximize2, 
  ChevronLeft, 
  ChevronRight as ChevronRightIcon,
  MessageSquare,
  Sparkles,
  Info
} from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { useWishlist } from "@/lib/wishlist";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/products/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Product — Saloree` },
      { name: "description", content: `Buy ${params.slug} on Saloree.` },
    ],
  }),
  component: ProductPage,
});

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  isLocal?: boolean;
}

const DEFAULT_REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Sarah K.",
    rating: 5,
    date: "2026-06-15",
    title: "Absolutely gorgeous and high quality!",
    content: "Exceeded my expectations. The material is premium, and the details are very well crafted. Definitely worth the price. Delivery was also super fast!"
  },
  {
    id: "rev-2",
    author: "David M.",
    rating: 4,
    date: "2026-06-10",
    title: "Very nice product, matches description",
    content: "Matches the product descriptions perfectly. The packaging was great. Very solid build. Only minor complaint is the delivery was delayed by one day, but the support was extremely helpful."
  },
  {
    id: "rev-3",
    author: "Elena R.",
    rating: 5,
    date: "2026-06-02",
    title: "Highly recommended seller!",
    content: "Outstanding customer care and top notch item. I'll definitely shop from this store again. Super secure checkout experience too."
  }
];

function ProductPage() {
  const { slug } = Route.useParams();
  const cart = useCart();
  const navigate = useNavigate();
  const { language, formatPrice, translateCategory } = useLocale();
  const wishlist = useWishlist();

  const [qty, setQty] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZooming, setIsZooming] = useState(false);
  const [activeTab, setActiveTab] = useState<"desc" | "specs" | "reviews">("desc");
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxActiveIndex, setLightboxActiveIndex] = useState(0);
  const [lightboxZoom, setLightboxZoom] = useState(false);

  const [reviews, setReviews] = useState<Review[]>(DEFAULT_REVIEWS);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");

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
          "*, stores(*), categories(id, name, slug), product_images(image_url)",
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

  const { data: relatedProducts } = useQuery({
    queryKey: ["related-products", product?.category_id, product?.id],
    enabled: !!product?.category_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, stores(name, slug, logo_url), categories(name, slug)")
        .eq("category_id", product.category_id)
        .neq("id", product.id)
        .eq("status", "active")
        .limit(8);

      if (error) {
        console.error("[product-page] Related products error:", error);
        return [];
      }
      return data ?? [];
    },
  });

  const { data: storeProducts } = useQuery({
    queryKey: ["store-products", product?.store_id, product?.id],
    enabled: !!product?.store_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*, stores(name, slug, logo_url), categories(name, slug)")
        .eq("store_id", product.store_id)
        .neq("id", product.id)
        .eq("status", "active")
        .limit(4);

      if (error) {
        console.error("[product-page] Store products error:", error);
        return [];
      }
      return data ?? [];
    },
  });

  useEffect(() => {
    setActiveImageIndex(0);
    setQty(1);
    setIsZooming(false);
    setLightboxActiveIndex(0);
    setIsLightboxOpen(false);
    setLightboxZoom(false);
    setActiveTab("desc");
  }, [product?.id]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 animate-pulse space-y-8">
        <div className="h-4 bg-slate-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
            <div className="hidden md:flex flex-col gap-3 w-20 shrink-0">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square bg-slate-200 rounded-xl"></div>
              ))}
            </div>
            <div className="flex-1 aspect-square bg-slate-200 rounded-2xl"></div>
          </div>
          <div className="lg:col-span-5 space-y-6">
            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            <div className="h-12 bg-slate-200 rounded w-1/3"></div>
            <div className="h-24 bg-slate-200 rounded w-full"></div>
            <div className="h-12 bg-slate-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl border-2 border-dashed border-slate-200 p-12 text-center text-sm text-muted-foreground shadow-sm">
          {error ? "Unable to load this product right now." : "Product not found or is no longer active."}
          <div className="mt-6">
            <Button asChild className="rounded-full px-6">
              <Link to="/marketplace">Back to Marketplace</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const images = Array.from(
    new Set(
      [
        product.featured_image,
        ...(product.product_images?.map((i: { image_url: string }) => i.image_url) ?? []),
      ].filter(Boolean) as string[]
    )
  ).slice(0, 5);

  const stock = product.stock ?? 0;
  const isWish = wishlist.has(product.id);
  const compareAtPrice = (product as any).compare_at_price ? Number((product as any).compare_at_price) : null;
  const hasDiscount = compareAtPrice && compareAtPrice > product.price;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleAddToCart = () => {
    cart.add(
      {
        product_id: product.id,
        slug: product.slug || product.id,
        store_id: product.store_id,
        store_name: product.stores?.store_name || "Unknown store",
        title: product.title,
        price: Number(product.price),
        featured_image: product.featured_image,
      },
      qty,
    );
    toast.success("Added to cart");
  };

  const handleBuyNow = () => {
    cart.add(
      {
        product_id: product.id,
        slug: product.slug || product.id,
        store_id: product.store_id,
        store_name: product.stores?.store_name || "Unknown store",
        title: product.title,
        price: Number(product.price),
        featured_image: product.featured_image,
      },
      qty,
    );
    navigate({ to: "/checkout" });
  };

  const handleWishlistToggle = async () => {
    const isAdded = await wishlist.toggle(product.id);
    toast.success(isAdded ? "Added to wishlist" : "Removed from wishlist");
  };

  const handleOpenLightbox = (index: number) => {
    setLightboxActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewContent.trim() || !reviewTitle.trim()) {
      return toast.error("Please fill out all review fields.");
    }
    const newRev: Review = {
      id: `local-${Date.now()}`,
      author: reviewName,
      rating: reviewRating,
      date: new Date().toISOString().split("T")[0],
      title: reviewTitle,
      content: reviewContent,
      isLocal: true
    };
    setReviews([newRev, ...reviews]);
    setReviewName("");
    setReviewTitle("");
    setReviewContent("");
    setReviewRating(5);
    toast.success("Review submitted locally for demonstration!");
  };

  const getStockBadge = () => {
    if (stock <= 0) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-700 border border-rose-100">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-600 animate-ping"></span>
          {t("out_of_stock", language)}
        </span>
      );
    }
    if (stock <= 5) {
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-100">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-600 animate-pulse"></span>
          Only {stock} left in stock - order soon!
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
        {t("in_stock", language)}
      </span>
    );
  };

  const renderSpecsTable = () => {
    const dbSpecs = (product as any).specifications;
    if (dbSpecs && typeof dbSpecs === "object") {
      return (
        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full text-left text-sm border-collapse">
            <tbody>
              {Object.entries(dbSpecs).map(([key, val]) => (
                <tr key={key} className="border-b last:border-b-0 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700 bg-slate-50/30 w-1/3 border-r capitalize">
                    {key.replace(/_/g, " ")}
                  </td>
                  <td className="p-4 text-slate-600">{String(val)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="overflow-x-auto rounded-2xl border bg-card shadow-sm">
          <table className="w-full text-left text-sm border-collapse">
            <tbody>
              <tr className="border-b hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-700 bg-slate-50/20 w-1/3 border-r">Category</td>
                <td className="p-4 text-slate-600">
                  {product.categories ? translateCategory(product.categories.name) : "Uncategorized"}
                </td>
              </tr>
              <tr className="border-b hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-700 bg-slate-50/20 w-1/3 border-r">Store Name</td>
                <td className="p-4 text-slate-600">
                  {product.stores?.store_name || "Unknown store"}
                </td>
              </tr>
              <tr className="border-b hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-700 bg-slate-50/20 w-1/3 border-r">Availability</td>
                <td className="p-4 text-slate-600 font-medium">
                  {stock > 0 ? `In Stock (${stock} items available)` : "Out of Stock"}
                </td>
              </tr>
              <tr className="hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-semibold text-slate-700 bg-slate-50/20 w-1/3 border-r">Product SKU / ID</td>
                <td className="p-4 text-slate-600 font-mono text-xs text-primary">
                  {product.id}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Info className="size-4 text-slate-400" />
          <span>Real-time technical specifications will load here once configured by the seller.</span>
        </p>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground bg-slate-100/50 p-3 rounded-2xl w-fit">
        <Link to="/" className="hover:text-primary transition-colors">
          {t("home", language)}
        </Link>
        <ChevronRight className="size-3 text-slate-400" />
        <Link to="/marketplace" className="hover:text-primary transition-colors">
          {t("marketplace", language)}
        </Link>
        {product.categories && (
          <>
            <ChevronRight className="size-3 text-slate-400" />
            <Link
              to="/categories/$slug"
              params={{ slug: product.categories.slug }}
              className="hover:text-primary transition-colors"
            >
              {translateCategory(product.categories.name)}
            </Link>
          </>
        )}
        <ChevronRight className="size-3 text-slate-400" />
        <span className="text-foreground truncate max-w-[200px] sm:max-w-xs font-bold">{product.title}</span>
      </nav>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start mb-16">
        <div className="lg:col-span-7 flex flex-col md:flex-row gap-4">
          {images.length > 1 && (
            <div className="hidden md:flex flex-col gap-3 w-20 shrink-0 select-none">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative aspect-square w-full overflow-hidden rounded-xl border bg-slate-50 transition-all ${
                    activeImageIndex === i
                      ? "border-2 border-primary shadow-sm scale-102"
                      : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}

          <div className="flex-1 relative aspect-square w-full overflow-hidden rounded-3xl border bg-slate-50 shadow-soft select-none group">
            <div 
              className="w-full h-full cursor-zoom-in relative"
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsZooming(true)}
              onMouseLeave={() => setIsZooming(false)}
              onClick={() => handleOpenLightbox(activeImageIndex)}
            >
              {images[activeImageIndex] ? (
                <img
                  src={images[activeImageIndex]}
                  alt={product.title}
                  className="h-full w-full object-contain transition-transform duration-75"
                  style={
                    isZooming
                      ? {
                          transform: "scale(1.8)",
                          transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
                        }
                      : undefined
                  }
                />
              ) : (
                <div className="grid h-full place-items-center text-sm text-muted-foreground bg-muted">
                  {t("no_image", language)}
                </div>
              )}
            </div>
            
            <button
              onClick={() => handleOpenLightbox(activeImageIndex)}
              className="absolute bottom-4 right-4 bg-white/95 text-slate-800 p-2.5 rounded-full shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white active:scale-95"
              title="View fullscreen"
            >
              <Maximize2 className="size-4" />
            </button>
          </div>

          {images.length > 1 && (
            <div className="flex md:hidden gap-2 overflow-x-auto py-1 scrollbar-none select-none">
              {images.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-xl border bg-slate-50 transition-all ${
                    activeImageIndex === i
                      ? "border-2 border-primary shadow-sm"
                      : "border-slate-200 opacity-60"
                  }`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 lg:sticky lg:top-6 self-start flex flex-col gap-6">
          <div className="bg-card rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-soft space-y-4">
            <div>
              {product.categories && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary bg-primary-soft/40 px-2 py-0.5 rounded">
                  {translateCategory(product.categories.name)}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-secondary mt-2 leading-snug tracking-tight">
                {product.title}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs">
                {product.stores && (
                  <div className="flex items-center text-muted-foreground bg-slate-100 px-3 py-1 rounded-full border">
                    <span className="mr-1">{t("sold_by", language)}</span>
                    <Link
                      to="/stores/$slug"
                      params={{ slug: product.stores.slug }}
                      className="font-bold text-secondary hover:text-primary transition-colors"
                    >
                      {product.stores.store_name}
                    </Link>
                    <CheckCircle2 className="size-3.5 fill-blue-500 text-white ml-1 shadow-sm rounded-full" />
                  </div>
                )}
                <div className="flex items-center gap-1 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
                  <Star className="size-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-amber-600">4.8</span>
                  <span className="text-muted-foreground font-normal ml-1">(Demo Rating)</span>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-secondary tracking-tight">
                {formatPrice(Number(product.price))}
              </span>
              {hasDiscount && (
                <>
                  <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/60">
                    {formatPrice(Number(compareAtPrice))}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-bold text-red-700 ring-1 ring-inset ring-red-600/10">
                    {Math.round(((compareAtPrice - product.price) / compareAtPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div>
              {getStockBadge()}
            </div>

            <div className="rounded-2xl bg-slate-50 border p-4 space-y-2.5 text-xs">
              <div className="flex gap-2">
                <Truck className="size-4 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-secondary">Free Delivery Eligibility</p>
                  <p className="text-muted-foreground mt-0.5 leading-snug">Free shipping on orders over $35. Delivered in 2-4 business days.</p>
                </div>
              </div>
              <div className="flex gap-2 border-t pt-2.5">
                <RotateCcw className="size-4 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-secondary">Simple Returns</p>
                  <p className="text-muted-foreground mt-0.5 leading-snug">Returnable or exchangeable within 30 days of receipt.</p>
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                {stock > 0 && (
                  <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50 p-1 shadow-inner shrink-0">
                    <button
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white active:scale-95 transition-all shadow-none border-none bg-transparent cursor-pointer"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      disabled={qty <= 1}
                    >
                      <Minus className="size-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-bold text-secondary select-none">{qty}</span>
                    <button
                      className="h-10 w-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-white active:scale-95 transition-all shadow-none border-none bg-transparent cursor-pointer"
                      onClick={() => setQty((q) => Math.min(stock, q + 1))}
                      disabled={qty >= stock}
                    >
                      <Plus className="size-4" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                    isWish
                      ? "border-rose-200 bg-rose-50 text-rose-500 shadow-sm"
                      : "border-slate-200 hover:bg-slate-50 text-slate-400 hover:text-rose-500"
                  }`}
                  title={isWish ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <Heart className={`size-5 transition-transform ${isWish ? "fill-rose-500 scale-110" : ""}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-3 pt-1">
                <Button
                  size="lg"
                  className="w-full py-6 rounded-2xl text-sm font-bold shadow-md shadow-primary/10 transition-transform active:scale-99 hover:brightness-105"
                  disabled={stock <= 0}
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="size-4 mr-2" /> {t("add_to_cart", language)}
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full py-6 rounded-2xl text-sm font-bold border border-slate-200 bg-white hover:bg-slate-50/80 active:scale-99 text-slate-800"
                  disabled={stock <= 0}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            </div>

            <div className="pt-2 border-t text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                <Lock className="size-3 text-slate-400" />
                <span>Guaranteed Safe & Secure Checkout</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-1 select-none">
                <div className="h-6 w-10 border border-slate-100 rounded bg-white flex items-center justify-center shadow-soft" title="Visa">
                  <svg viewBox="0 0 24 15" className="h-4 w-auto"><path fill="#1A1F71" d="M9.362 12.115l.896-5.542h1.442l-.896 5.542zM15.405 6.745c-.29-.115-.75-.24-1.312-.24-1.443 0-2.457.77-2.467 1.87-.01.813.725 1.263 1.278 1.535.568.278.759.45.757.697-.004.376-.45.548-.867.548-.578 0-.91-.128-1.393-.343l-.196-.093-.207 1.29c.346.16.985.297 1.644.303 1.533 0 2.532-.758 2.548-1.93.013-.642-.383-1.13-1.226-1.533-.51-.257-.822-.43-.82-.693.003-.228.257-.472.822-.472.463-.008.803.1.1.201l.12.056.208-1.282zM18.847 6.573h-1.112c-.343 0-.602.1-.75.45l-2.128 5.092h1.513l.3-.834h1.848l.174.834h1.332l-1.177-5.542zm-.896 3.49l.528-1.464.303 1.464h-.831zM5.565 6.573L4.103 10.45l-.155-.794c-.266-.91-.978-1.89-1.91-2.383v.09l1.782 4.752h1.517l2.259-5.542H5.565z"/><path fill="#D2A241" d="M2.518 6.573H.064L0 6.721c1.905.487 3.167 1.666 3.687 3.078l-.53-2.656c-.092-.444-.356-.554-.639-.57z"/></svg>
                </div>
                <div className="h-6 w-10 border border-slate-100 rounded bg-white flex items-center justify-center shadow-soft" title="Mastercard">
                  <svg viewBox="0 0 24 15" className="h-4 w-auto"><circle cx="8" cy="7.5" r="5" fill="#EB001B"/><circle cx="16" cy="7.5" r="5" fill="#F79E1B" fillOpacity="0.8"/><path fill="#FF5F00" d="M12 11.233c.896-.757 1.466-1.9 1.466-3.177s-.57-2.42-1.466-3.178c-.896.758-1.466 1.901-1.466 3.178s.57 2.42 1.466 3.177z"/></svg>
                </div>
                <div className="h-6 w-10 border border-slate-100 rounded bg-white flex items-center justify-center shadow-soft" title="PayPal">
                  <svg viewBox="0 0 24 15" className="h-4 w-auto"><path fill="#003087" d="M5.89 2.13h4.63c1.39 0 2.45.31 3.16.94.67.6 1.01 1.43 1.01 2.5 0 .84-.2 1.58-.6 2.22s-1 .13-1.78.13H9.28l-.75 4.75H5.14L6.8 2.13H5.89z"/><path fill="#0079C1" d="M8.28 7.92h3.94c1.22 0 2.16-.27 2.78-.8.59-.5.88-1.22.88-2.14 0-.74-.18-1.39-.53-1.95s-.96-.13-1.84-.13H8.97l-.69 4.36v.66z"/><path fill="#00457C" d="M8.97 3.68h3.94c.88 0 1.49.19 1.84.58.35.39.53.94.53 1.66 0 .92-.29 1.64-.88 2.14s-1.56.8-2.78.8H8.28l.69-4.36v-.82z"/></svg>
                </div>
                <div className="h-6 w-10 border border-slate-100 rounded bg-white flex items-center justify-center shadow-soft" title="Stripe">
                  <svg viewBox="0 0 24 15" className="h-3 w-auto"><path fill="#635BFF" d="M24 6.8c0-.7-.4-1.2-1-1.2-1.2 0-2.4.6-2.4 2v4.8c0 .7.4 1.2 1 1.2s1.1-.3 1.1-.9V9.6c0-1 .6-1.5 1.3-1.5V6.8zm-6.2.2c-.3 0-.5.2-.6.4v.2h-.1C17 6.4 16 6 15 6c-2.4 0-4 1.6-4 4s1.6 4 4 4c1 0 2-.4 2.1-1.1h.1v.2c0 .4.2.6.5.6s.6-.2.6-.6V7c0-.2-.2-.2-.5-.2zm-2.2 5.5c-1.3 0-2.1-.9-2.1-2.2s.8-2.2 2.1-2.2c1.2 0 2 .9 2 2.2 0 1.3-.8 2.2-2 2.2zm-6.5-6.5c-.3 0-.5.2-.6.4v.3h-.1C8.2 6.4 7.4 6 6.3 6c-2.1 0-3.6 1.4-3.6 3.6v.1c0 2.2 1.4 3.7 3.6 3.7c1 0 1.9-.4 2-.9h.1v.4c0 .3.2.5.5.5s.5-.2.5-.5V7.4c.1-.2-.1-.4-.4-.4zm-2.4 5.3c-1.1 0-1.8-.7-1.8-1.8v-.1c0-1.1.7-1.8 1.8-1.8 1 0 1.8.7 1.8 1.8v.1c.1 1.1-.7 1.8-1.8 1.8zM0 7.4c0 .3.2.5.5.5.7 0 1.2.4 1.2 1v.2C.7 9.3 0 10 0 11.2c0 1.4 1.2 2.4 3.2 2.4 1 0 1.8-.2 2.4-.6v.1c0 .3.2.5.5.5s.5-.2.5-.5V9.4c0-2.2-1.4-3.4-3.7-3.4C1.5 6 .3 6.6 0 7.4zm4 4c0 .6-.4.9-1 .9-.7 0-1.1-.3-1.1-.8 0-.5.4-.8 1.1-.8.6.1 1 .3 1 .7z"/></svg>
                </div>
                <div className="h-6 w-10 border border-slate-100 rounded bg-slate-950 flex items-center justify-center shadow-soft" title="Apple Pay">
                  <svg viewBox="0 0 24 15" className="h-3 w-auto" fill="white"><path d="M7.4 2.8c-.8.6-1.5.6-1.9.6-.3 0-.8-.1-1.2-.3-.5-.3-1.1-.8-1.1-1.6 0-1.3 1.1-1.5 1.5-1.5.3 0 .7.1 1 .3.2.1.6.4.7.6.6-.7 1.4-.7 1.7-.7.4 0 1 .1 1.4.4.4.3.7.8.7 1.5 0 .9-.8 1.5-1.4 1.5-.4 0-.8-.1-1-.4v1.2H7.4V2.8zm8.6-2.1c-.8 0-1.5.5-1.7 1.1h-.1V.8h-1.6v4.6h1.7V3.5c0-.9.6-1.3 1.1-1.3.5 0 1 .3 1 1v2.2h1.7V3.1c0-1.5-.9-2.4-2.1-2.4zm5.8 2.4l.9-2.3h-1.8l-1.3 3.3h-.1L18.2.8h-1.8l2.2 4.9-.7 1.6h1.8l3.1-4.9h-1.6V3.1zM5.5.8C5.2 1 4.7 1.1 4.3 1c-.3-.1-.5-.4-.5-.7 0-.3.2-.5.5-.6C4.8-.4 5.3-.2 5.5.1c.2.3.2.6 0 .7z"/></svg>
                </div>
                <div className="h-6 w-10 border border-slate-100 rounded bg-white flex items-center justify-center shadow-soft" title="Google Pay">
                  <svg viewBox="0 0 24 15" className="h-3.5 w-auto"><path fill="#EA4335" d="M3.7 7.2C3.1 7.2 2.6 7 2.2 6.6c-.4-.4-.6-.9-.6-1.5s.2-1.1.6-1.5c.4-.4.9-.6 1.5-.6.5 0 1 .2 1.3.5.3.3.5.8.5 1.4v.3H2.8c0 .3.1.5.3.7.2.2.4.3.7.3.5 0 .9-.2 1.1-.7l1.1.5c-.5.8-1.3 1.2-2.3 1.2zm1.6-3.8c-.1-.3-.3-.5-.6-.5-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7h1.7c-.1-.3-.2-.4-.2-.5z"/><path fill="#4285F4" d="M9.1 7.2c-.3 0-.6-.1-.9-.3-.3-.2-.5-.5-.6-.9l1.1-.4c.2.4.5.6.9.6.4 0 .7-.2.9-.4.2-.2.3-.4.3-.7V5h-.1c-.2.3-.6.5-1.1.5-1 0-1.8-.8-1.8-1.8S8.6 2 9.6 2c.5 0 .9.2 1.1.5h.1v-.4h1.2v3.7c0 .9-.3 1.5-.8 1.9-.4.4-1 .5-1.7.5zm1.5-3.5c0-.6-.4-1-1-1s-1 .4-1 1 .4 1 1 1 1-.4 1-1z"/><path fill="#34A853" d="M14.6 7c-.5 0-.9-.2-1.3-.5-.4-.4-.6-.9-.6-1.5s.2-1.1.6-1.5c.4-.4.9-.6 1.3-.6s.9.2 1.3.5v-.4H17v4.8h-1.2v-.4c-.4.3-.8.6-1.2.6zm.5-3.3c-.3 0-.5.1-.7.3-.2.2-.3.4-.3.7s.1.5.3.7c.2.2.4.3.7.3s.5-.1.7-.3c.2-.2.3-.4.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3z"/><path fill="#FBBC05" d="M19.1 2.2h1.2v4.8h-1.2z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {product.stores && (
            <div className="bg-card rounded-3xl border border-slate-100 p-6 shadow-soft space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                  {product.stores.logo_url ? (
                    <img src={product.stores.logo_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Sparkles className="size-6 text-primary" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-extrabold text-slate-800 text-sm leading-tight">
                      {product.stores.store_name}
                    </h3>
                    <CheckCircle2 className="size-4 fill-blue-500 text-white shadow-sm rounded-full" title="Verified Seller" />
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5 uppercase font-bold tracking-wider">Verified Seller Partner</p>
                </div>
              </div>

              {product.stores.description && (
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {product.stores.description}
                </p>
              )}

              <Button
                variant="outline"
                className="w-full rounded-2xl text-xs font-semibold py-5 border-slate-200 hover:bg-slate-50 text-slate-700"
                asChild
              >
                <Link to="/stores/$slug" params={{ slug: product.stores.slug }}>
                  {t("visit_store", language)} <ArrowRight className="size-3.5 ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="mb-16">
        <div className="flex border-b border-slate-200 mb-6 overflow-x-auto scrollbar-none select-none">
          <button
            onClick={() => setActiveTab("desc")}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 mr-8 shrink-0 cursor-pointer ${
              activeTab === "desc"
                ? "border-primary text-secondary"
                : "border-transparent text-muted-foreground hover:text-secondary"
            }`}
          >
            {t("product_desc_title", language)}
          </button>
          
          <button
            onClick={() => setActiveTab("specs")}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 mr-8 shrink-0 cursor-pointer ${
              activeTab === "specs"
                ? "border-primary text-secondary"
                : "border-transparent text-muted-foreground hover:text-secondary"
            }`}
          >
            Specifications
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 text-sm font-bold uppercase tracking-wider transition-all border-b-2 shrink-0 cursor-pointer flex items-center gap-1.5 ${
              activeTab === "reviews"
                ? "border-primary text-secondary"
                : "border-transparent text-muted-foreground hover:text-secondary"
            }`}
          >
            <MessageSquare className="size-4" />
            <span>Customer Reviews ({reviews.length})</span>
          </button>
        </div>

        <div className="bg-card rounded-3xl border border-slate-100 p-6 sm:p-8 shadow-soft min-h-[200px]">
          <AnimatePresence mode="wait">
            {activeTab === "desc" && (
              <motion.div
                key="desc-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="whitespace-pre-wrap text-sm text-slate-600 leading-relaxed font-normal"
              >
                {product.description || "No description provided for this product."}
              </motion.div>
            )}

            {activeTab === "specs" && (
              <motion.div
                key="specs-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
              >
                {renderSpecsTable()}
              </motion.div>
            )}

            {activeTab === "reviews" && (
              <motion.div
                key="reviews-tab"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-5 space-y-6">
                  <div className="rounded-2xl bg-slate-50/50 border p-6 space-y-4">
                    <h3 className="font-extrabold text-slate-800 text-base">Write a Review</h3>
                    <p className="text-xs text-muted-foreground">Submit a demo review to test the layout immediately.</p>
                    
                    <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs font-semibold text-slate-700">
                      <label className="block space-y-1">
                        <span>Your Name</span>
                        <input
                          type="text"
                          required
                          value={reviewName}
                          onChange={(e) => setReviewName(e.target.value)}
                          placeholder="e.g. Alex Johnson"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-normal outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </label>
                      <div className="space-y-1">
                        <span>Overall Rating</span>
                        <div className="flex items-center gap-1.5 select-none pt-1">
                          {[1, 2, 3, 4, 5].map((stars) => (
                            <button
                              type="button"
                              key={stars}
                              onClick={() => setReviewRating(stars)}
                              className="text-slate-300 hover:scale-110 active:scale-95 transition-all cursor-pointer bg-transparent border-none p-0"
                            >
                              <Star className={`size-6 ${stars <= reviewRating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <label className="block space-y-1">
                        <span>Review Title</span>
                        <input
                          type="text"
                          required
                          value={reviewTitle}
                          onChange={(e) => setReviewTitle(e.target.value)}
                          placeholder="Summarize your review"
                          className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white font-normal outline-none focus:ring-2 focus:ring-primary/20"
                        />
                      </label>
                      <label className="block space-y-1">
                        <span>Detailed Review</span>
                        <textarea
                          required
                          rows={4}
                          value={reviewContent}
                          onChange={(e) => setReviewContent(e.target.value)}
                          placeholder="What did you like or dislike about this product?"
                          className="w-full p-3 rounded-xl border border-slate-200 bg-white font-normal outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                        />
                      </label>
                      <Button type="submit" className="w-full py-5 rounded-xl font-bold text-xs">
                        Submit Review
                      </Button>
                    </form>
                  </div>
                </div>
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b">
                    <span className="font-extrabold text-slate-800 text-sm">Customer Feedback</span>
                    <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider bg-slate-100 px-2 py-0.5 rounded">Demo Sandboxed UI</span>
                  </div>
                  <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                    {reviews.map((rev) => (
                      <div key={rev.id} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/20 space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-800 text-sm">{rev.author}</span>
                            {rev.isLocal && (
                              <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 rounded px-1">
                                Added Just Now
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-muted-foreground">{rev.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`size-3.5 ${i < rev.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"}`} />
                          ))}
                        </div>
                        <h4 className="font-bold text-slate-800 text-sm leading-snug">{rev.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-normal">{rev.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-secondary tracking-tight">Related Products</h2>
            <div className="h-0.5 bg-slate-100 flex-1 mx-6 hidden sm:block"></div>
            <Link
              to="/marketplace"
              search={{ category: product.categories?.slug }}
              className="text-xs font-bold text-primary hover:underline shrink-0 flex items-center gap-1"
            >
              {t("view_all", language)} <ArrowRight className="size-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} p={p as any} />
            ))}
          </div>
        </div>
      )}

      {storeProducts && storeProducts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-extrabold text-secondary tracking-tight">More from {product.stores?.store_name}</h2>
            <div className="h-0.5 bg-slate-100 flex-1 mx-6 hidden sm:block"></div>
            {product.stores && (
              <Link
                to="/stores/$slug"
                params={{ slug: product.stores.slug }}
                className="text-xs font-bold text-primary hover:underline shrink-0 flex items-center gap-1"
              >
                {t("visit_store", language)} <ArrowRight className="size-3.5" />
              </Link>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {storeProducts.map((p) => (
              <ProductCard key={p.id} p={p as any} />
            ))}
          </div>
        </div>
      )}

      {stock > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-3 z-40 flex items-center justify-between gap-3 shadow-lg select-none">
          <div className="flex flex-col">
            <span className="text-[10px] text-muted-foreground uppercase font-bold truncate max-w-[120px]">{product.title}</span>
            <span className="text-base font-extrabold text-secondary">{formatPrice(Number(product.price))}</span>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={handleWishlistToggle}
              className={`rounded-xl border border-slate-200 px-3 py-4 ${isWish ? "text-rose-500" : "text-slate-400"}`}
            >
              <Heart className={`size-4 ${isWish ? "fill-rose-500" : ""}`} />
            </Button>
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="rounded-xl px-5 font-bold py-4 text-xs"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4"
          >
            <div className="flex items-center justify-between text-white p-2">
              <span className="text-xs font-bold text-slate-300">
                Image {lightboxActiveIndex + 1} of {images.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLightboxZoom(!lightboxZoom)}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full cursor-pointer transition-colors"
                  title="Toggle Zoom"
                >
                  <Maximize2 className="size-4" />
                </button>
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full cursor-pointer transition-colors"
                  title="Close Preview"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 flex items-center justify-between gap-4 max-h-[75vh]">
              <button
                disabled={images.length <= 1}
                onClick={() => setLightboxActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white p-3 rounded-full cursor-pointer select-none transition-colors border-none"
              >
                <ChevronLeft className="size-6" />
              </button>

              <div className="flex-1 h-full flex items-center justify-center p-4">
                <motion.img
                  key={lightboxActiveIndex}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  src={images[lightboxActiveIndex]}
                  alt=""
                  className={`max-h-full max-w-full object-contain rounded-2xl select-none transition-transform duration-200 ${
                    lightboxZoom ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
                  }`}
                  onClick={() => setLightboxZoom(!lightboxZoom)}
                />
              </div>

              <button
                disabled={images.length <= 1}
                onClick={() => setLightboxActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white p-3 rounded-full cursor-pointer select-none transition-colors border-none"
              >
                <ChevronRightIcon className="size-6" />
              </button>
            </div>

            {images.length > 1 && (
              <div className="flex justify-center gap-3 p-4 select-none">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxActiveIndex(i)}
                    className={`relative h-12 w-12 rounded-xl overflow-hidden border transition-all ${
                      lightboxActiveIndex === i
                        ? "border-2 border-primary scale-105"
                        : "border-white/20 opacity-50"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
