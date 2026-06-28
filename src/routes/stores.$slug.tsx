import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef, useMemo } from "react";
import {
  Star,
  CheckCircle2,
  Calendar,
  Package2,
  Share2,
  Heart,
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Search,
  ArrowUpDown,
  ChevronRight,
  MessageSquare,
  Clock,
  Sparkles,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { useAuth } from "@/lib/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

type StoreSearch = {
  page?: string;
};

type StoreTab =
  | "home"
  | "products"
  | "about"
  | "reviews"
  | "shipping"
  | "contact";

type SortMode = "newest" | "price_asc" | "price_desc" | "popular";

type StoreData = {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  banner_url: string | null;
  description: string | null;
  status: string;
  created_at: string;
};

type NavItem = {
  id: string;
  title: string;
  url: string;
  display_order: number;
};

type ThemeSettings = {
  primary_color?: string;
  bg_color?: string;
  accent_color?: string;
  button_color?: string;
  font_family?: string;
  hero_title?: string;
  hero_subtitle?: string;
  cta_text?: string;
  footer_text?: string;
  logo_url?: string;
  banner_url?: string;
  show_announcement?: boolean;
  announcement_text?: string;
  announcement_bg?: string;
  announcement_text_color?: string;
  about_title?: string;
  about_text?: string;
  card_style?: string;
  social_instagram?: string;
  social_twitter?: string;
  social_facebook?: string;
  social_tiktok?: string;
};

type CustomPage = {
  id: string;
  title: string;
  content: string;
  slug: string;
  is_published: boolean;
};

interface DemoReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  isLocal?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const FOLLOWED_STORES_KEY = "saloree.followed_stores.v1";

const DEMO_STORE_REVIEWS: DemoReview[] = [
  {
    id: "sr-1",
    author: "Amira J.",
    rating: 5,
    date: "2026-06-18",
    title: "Exceptional store experience!",
    content:
      "Every product arrived exactly as described. The packaging was premium and shipping was lightning fast. Definitely my go-to store now.",
  },
  {
    id: "sr-2",
    author: "Mark T.",
    rating: 4,
    date: "2026-06-12",
    title: "Great quality and fast shipping",
    content:
      "Very happy with my purchase. Product quality is excellent and the seller was very responsive when I had a question. Will buy again.",
  },
  {
    id: "sr-3",
    author: "Sara L.",
    rating: 5,
    date: "2026-06-05",
    title: "Highly trustworthy seller",
    content:
      "I've ordered from this store three times now and every experience has been perfect. Secure checkout, genuine products, and amazing customer service.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isDarkBg(hex: string): boolean {
  const color = hex.replace("#", "");
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum < 0.5;
}

function formatJoinDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function getFollowedStores(): string[] {
  try {
    const raw = localStorage.getItem(FOLLOWED_STORES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function toggleFollowStore(storeId: string): boolean {
  const followed = getFollowedStores();
  const idx = followed.indexOf(storeId);
  if (idx === -1) {
    followed.push(storeId);
    localStorage.setItem(FOLLOWED_STORES_KEY, JSON.stringify(followed));
    return true;
  } else {
    followed.splice(idx, 1);
    localStorage.setItem(FOLLOWED_STORES_KEY, JSON.stringify(followed));
    return false;
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SocialIcon = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) =>
  href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white"
    >
      {children}
    </a>
  ) : null;

function StarDisplay({
  rating,
  max = 5,
}: {
  rating: number;
  max?: number;
}) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          className={`size-3.5 ${
            i < Math.floor(rating)
              ? "fill-amber-400 text-amber-400"
              : i < rating
                ? "fill-amber-300 text-amber-300"
                : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
}

function StoreSkeleton() {
  return (
    <div className="animate-pulse bg-slate-50 min-h-screen">
      <div className="h-16 bg-slate-300" />
      <div className="h-72 bg-slate-200" />
      <div className="h-12 bg-white border-b border-slate-100" />
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-xl border bg-white">
            <div className="aspect-square bg-slate-200 rounded-t-xl" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-slate-200 rounded w-3/4" />
              <div className="h-3 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Route Definition ─────────────────────────────────────────────────────────

export const Route = createFileRoute("/stores/$slug")({
  validateSearch: (search: Record<string, unknown>): StoreSearch => ({
    page: search.page as string | undefined,
  }),
  head: ({ params }) => ({
    meta: [{ title: `${params.slug} — Saloree Store` }],
  }),
  component: StorePage,
});

// ─── Main Component ───────────────────────────────────────────────────────────

function StorePage() {
  const { slug } = Route.useParams();
  const { page: searchPage } = Route.useSearch();
  const { user, loading: authLoading } = useAuth();

  // UI state
  const [activeTab, setActiveTab] = useState<StoreTab>("home");
  const tabsRef = useRef<HTMLDivElement>(null);

  // Products tab state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("newest");

  // Follow state
  const [isFollowing, setIsFollowing] = useState(false);

  // Reviews state
  const [storeReviews, setStoreReviews] =
    useState<DemoReview[]>(DEMO_STORE_REVIEWS);
  const [reviewName, setReviewName] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewContent, setReviewContent] = useState("");
  const [hoverRating, setHoverRating] = useState(0);

  // ── Supabase queries (preserve existing) ────────────────────────────────────

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
      if (error) throw error;
      return data as StoreData | null;
    },
  });

  const isOwnerPreview =
    !!user && !!store && user.id === store.owner_id;

  const { data: activeInstallation } = useQuery({
    queryKey: ["store-active-installation-public", store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_theme_installations" as any)
        .select("*, store_theme_settings(*)")
        .eq("store_id", store!.id)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data as any;
    },
  });

  const themeSettings: ThemeSettings | null =
    activeInstallation?.store_theme_settings?.[0] ?? null;

  const { data: navItems = [] } = useQuery({
    queryKey: ["store-nav-items-public", store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_navigation_items" as any)
        .select("*")
        .eq("store_id", store!.id)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as NavItem[];
    },
  });

  const { data: currentPage } = useQuery({
    queryKey: ["store-custom-page", store?.id, searchPage],
    enabled: !!store?.id && !!searchPage,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_pages" as any)
        .select("*")
        .eq("store_id", store!.id)
        .eq("slug", searchPage!)
        .eq("is_published", true)
        .maybeSingle();
      if (error) throw error;
      return data as CustomPage | null;
    },
  });

  const {
    data: products = [],
    isLoading: productsLoading,
  } = useQuery({
    queryKey: ["store-products", store?.id, isOwnerPreview],
    enabled: !!store?.id && !authLoading,
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select(
          "id, slug, store_id, title, price, featured_image, status, created_at, stores(name, slug, logo_url), categories(name, slug)",
        )
        .eq("store_id", store!.id)
        .order("created_at", { ascending: false });

      query = isOwnerPreview
        ? query.in("status", ["draft", "active"])
        : query.eq("status", "active");

      const { data, error } = await query;
      if (error) throw error;
      return (data ?? []) as ProductCardData[];
    },
  });

  // ── Effects ────────────────────────────────────────────────────────────────

  useEffect(() => {
    if (store?.id) {
      setIsFollowing(getFollowedStores().includes(store.id));
    }
  }, [store?.id]);

  // ── Theme values (preserve existing logic exactly) ──────────────────────────

  const ts = themeSettings;
  const primaryColor = ts?.primary_color || "#6366f1";
  const bgColor = ts?.bg_color || "#ffffff";
  const accentColor = ts?.accent_color || "#f1f5f9";
  const buttonColor = ts?.button_color || primaryColor;
  const fontFamily = ts?.font_family || "'Inter', sans-serif";
  const ctaText = ts?.cta_text || "Shop Now";
  const logoUrl = ts?.logo_url || store?.logo_url;
  const bannerUrl = ts?.banner_url || store?.banner_url;
  const darkBg = isDarkBg(bgColor);
  const textColor = darkBg ? "#ffffff" : "#111827";
  const mutedColor = darkBg
    ? "rgba(255,255,255,0.6)"
    : "rgba(17,24,39,0.5)";

  // ── Computed values ────────────────────────────────────────────────────────

  const storeName = store?.name || "Store";
  const storeInitial = storeName.charAt(0).toUpperCase();
  const joinedDate = store?.created_at
    ? formatJoinDate(store.created_at)
    : null;
  const productCount = products.length;

  const heroTitle =
    ts?.hero_title || store?.name || "Welcome";
  const heroSubtitle =
    ts?.hero_subtitle || store?.description || "Discover our products";
  const footerText =
    `© ${new Date().getFullYear()} ${storeName}, Powered by Saloree`;

  const categoryOptions = useMemo(() => {
    const cats = new Map<string, string>();
    products.forEach((p) => {
      if (p.categories?.slug && p.categories?.name) {
        cats.set(p.categories.slug, p.categories.name);
      }
    });
    return Array.from(cats.entries()).map(([catSlug, name]) => ({
      slug: catSlug,
      name,
    }));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((p) => p.title.toLowerCase().includes(q));
    }

    if (selectedCategory) {
      result = result.filter(
        (p) => p.categories?.slug === selectedCategory,
      );
    }

    switch (sortMode) {
      case "price_asc":
        result.sort((a, b) => Number(a.price) - Number(b.price));
        break;
      case "price_desc":
        result.sort((a, b) => Number(b.price) - Number(a.price));
        break;
      case "popular":
        result.sort((a, b) => {
          let sumA = 0,
            sumB = 0;
          for (let i = 0; i < a.id.length; i++)
            sumA += a.id.charCodeAt(i);
          for (let i = 0; i < b.id.length; i++)
            sumB += b.id.charCodeAt(i);
          return sumB - sumA;
        });
        break;
      default: // newest — already sorted from query
        break;
    }

    return result;
  }, [products, searchQuery, selectedCategory, sortMode]);

  const featuredProducts = useMemo(() => products.slice(0, 4), [products]);
  const newArrivals = useMemo(() => products.slice(0, 4), [products]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleFollow = () => {
    if (!store?.id) return;
    const nowFollowing = toggleFollowStore(store.id);
    setIsFollowing(nowFollowing);
    toast.success(
      nowFollowing ? `Following ${storeName}!` : `Unfollowed ${storeName}`,
    );
  };

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: storeName, url });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Store link copied to clipboard!");
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !reviewName.trim() ||
      !reviewTitle.trim() ||
      !reviewContent.trim()
    ) {
      return toast.error("Please fill in all review fields.");
    }
    const newRev: DemoReview = {
      id: `local-${Date.now()}`,
      author: reviewName,
      rating: reviewRating,
      date: new Date().toISOString().split("T")[0],
      title: reviewTitle,
      content: reviewContent,
      isLocal: true,
    };
    setStoreReviews([newRev, ...storeReviews]);
    setReviewName("");
    setReviewTitle("");
    setReviewContent("");
    setReviewRating(5);
    toast.success("Review submitted locally for demonstration!");
  };

  // ── Loading state ──────────────────────────────────────────────────────────

  if (storeLoading || authLoading) return <StoreSkeleton />;

  if (storeError || !store) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="text-5xl mb-4">🏪</div>
          <h1 className="text-2xl font-bold mb-2">Store Not Found</h1>
          <p className="text-muted-foreground mb-6">
            This store doesn't exist or may have been removed.
          </p>
          <Link
            to="/"
            className="text-primary hover:underline font-medium"
          >
            ← Back to Saloree
          </Link>
        </div>
      </div>
    );
  }

  // ── Draft store guard ─────────────────────────────────────────────────────
  const isDraft = store.status !== "published";
  if (isDraft && !isOwnerPreview) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-5">🚧</div>
          <h1 className="text-2xl font-bold mb-2 text-slate-800">Store Not Available</h1>
          <p className="text-slate-500 mb-6">
            This store hasn't been published yet. Check back later!
          </p>
          <Link
            to="/"
            className="inline-block px-5 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
          >
            ← Browse Saloree
          </Link>
        </div>
      </div>
    );
  }

  // ── Custom Page (preserve existing behavior exactly) ───────────────────────

  if (searchPage) {
    return (
      <div
        style={{
          background: bgColor,
          color: textColor,
          fontFamily,
          minHeight: "100vh",
        }}
        className="flex flex-col"
      >
        {ts?.show_announcement && ts?.announcement_text && (
          <div
            className="px-4 py-2 text-center text-xs font-semibold transition"
            style={{
              background: ts.announcement_bg || "#111827",
              color: ts.announcement_text_color || "#ffffff",
            }}
          >
            {ts.announcement_text}
          </div>
        )}
        <nav
          className="sticky top-0 z-50 flex items-center gap-4 px-6 py-3.5 shadow-sm"
          style={{ background: primaryColor }}
        >
          <Link
            to="/stores/$slug"
            params={{ slug }}
            className="flex items-center gap-3"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                className="h-8 w-8 rounded-lg object-cover"
                alt={storeName}
              />
            ) : (
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{ background: buttonColor }}
              >
                {storeInitial}
              </div>
            )}
            <span className="text-white font-bold text-base">
              {storeName}
            </span>
          </Link>
          <div className="flex-1" />
          <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-white/95 mr-4">
            <Link
              to="/stores/$slug"
              params={{ slug }}
              className="hover:text-white transition"
            >
              Home
            </Link>
            {navItems.map((item) => {
              const isCustomPage = item.url.startsWith("/pages/");
              const pageSlug = isCustomPage
                ? item.url.replace("/pages/", "")
                : null;
              return pageSlug ? (
                <Link
                  key={item.id}
                  to="/stores/$slug"
                  params={{ slug }}
                  search={{ page: pageSlug }}
                  className="hover:text-white transition"
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  key={item.id}
                  href={
                    item.url.startsWith("/")
                      ? item.url
                      : `https://${item.url}`
                  }
                  target={item.url.startsWith("/") ? "_self" : "_blank"}
                  rel="noreferrer"
                  className="hover:text-white transition"
                >
                  {item.title}
                </a>
              );
            })}
          </div>
          {isOwnerPreview && (
            <Link
              to="/seller"
              className="text-xs text-white/80 hover:text-white underline underline-offset-2 mr-2"
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div className="flex-1 max-w-4xl w-full mx-auto px-6 py-12">
          {currentPage ? (
            <article className="space-y-6">
              <h1
                className="text-3xl font-extrabold"
                style={{ color: primaryColor }}
              >
                {currentPage.title}
              </h1>
              <div
                className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap"
                style={{ color: textColor }}
                dangerouslySetInnerHTML={{
                  __html: currentPage.content || "",
                }}
              />
              <div className="pt-8">
                <Link
                  to="/stores/$slug"
                  params={{ slug }}
                  className="text-xs font-semibold hover:underline inline-flex items-center gap-1"
                  style={{ color: primaryColor }}
                >
                  ← Back to Store Home
                </Link>
              </div>
            </article>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-xl font-bold mb-2">Page Not Found</h2>
              <p
                className="text-muted-foreground text-sm mb-6"
                style={{ color: mutedColor }}
              >
                The page you requested is not published or does not exist.
              </p>
              <Link
                to="/stores/$slug"
                params={{ slug }}
                className="text-xs font-semibold hover:underline"
                style={{ color: primaryColor }}
              >
                Back to Store Home
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Tab content renderers ──────────────────────────────────────────────────

  const renderHomeTab = () => (
    <div className="space-y-14">
      {/* Trust Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          {
            icon: <CheckCircle2 className="size-5" />,
            title: "Verified Seller",
            desc: "Identity confirmed",
          },
          {
            icon: <ShieldCheck className="size-5" />,
            title: "Secure Checkout",
            desc: "256-bit SSL encryption",
          },
          {
            icon: <Truck className="size-5" />,
            title: "Fast Shipping",
            desc: "2–4 business days",
          },
          {
            icon: <RotateCcw className="size-5" />,
            title: "Easy Returns",
            desc: "30-day return policy",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="flex flex-col items-center gap-2 p-4 rounded-2xl border bg-card text-center shadow-soft"
          >
            <div
              className="p-2.5 rounded-xl text-white"
              style={{ background: primaryColor }}
            >
              {item.icon}
            </div>
            <p className="text-xs font-bold text-secondary">{item.title}</p>
            <p className="text-[11px] text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      {productsLoading ? (
        <div className="space-y-4">
          <div className="h-6 bg-slate-200 rounded w-48 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="rounded-xl border animate-pulse bg-card"
              >
                <div className="aspect-square bg-slate-200 rounded-t-xl" />
                <div className="p-3 space-y-2">
                  <div className="h-3 bg-slate-200 rounded w-3/4" />
                  <div className="h-3 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="text-5xl mb-3">📦</div>
          <p className="font-semibold text-lg mb-1 text-secondary">
            No products yet
          </p>
          <p className="text-sm text-muted-foreground">
            {isOwnerPreview
              ? "Add your first product from your seller dashboard."
              : "This store hasn't added any products yet. Check back soon!"}
          </p>
          {isOwnerPreview && (
            <Link
              to="/seller/products"
              className="inline-block mt-4 px-5 py-2.5 rounded-full font-semibold text-white text-sm"
              style={{ background: primaryColor }}
            >
              + Add Product
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* Featured */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-secondary flex items-center gap-2">
                  <Sparkles
                    className="size-5"
                    style={{ color: primaryColor }}
                  />{" "}
                  Featured Products
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Handpicked by the store
                </p>
              </div>
              <button
                onClick={() => setActiveTab("products")}
                className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition"
                style={{ color: primaryColor }}
              >
                View All <ChevronRight className="size-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {featuredProducts.map((p) => (
                <ProductCard key={p.id} p={p} />
              ))}
            </div>
          </section>

          {/* New Arrivals */}
          {newArrivals.length > 0 && (
            <section>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-extrabold text-secondary">
                    🆕 New Arrivals
                  </h2>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Recently added to the store
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab("products")}
                  className="text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition"
                  style={{ color: primaryColor }}
                >
                  Browse All <ChevronRight className="size-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {newArrivals.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      {/* Store Description Preview */}
      {store.description && (
        <section
          className="rounded-3xl p-8 border"
          style={{ background: primaryColor + "08" }}
        >
          <h2 className="text-lg font-extrabold text-secondary mb-3">
            About This Store
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4">
            {store.description}
          </p>
          <button
            onClick={() => setActiveTab("about")}
            className="mt-4 text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition"
            style={{ color: primaryColor }}
          >
            Read more <ChevronRight className="size-4" />
          </button>
        </section>
      )}

      {/* Theme About section (if configured) */}
      {ts?.about_title && ts?.about_text && (
        <section className="py-12 border-t">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">{ts.about_title}</h2>
            <p
              className="text-sm leading-relaxed whitespace-pre-line"
              style={{ color: mutedColor }}
            >
              {ts.about_text}
            </p>
          </div>
        </section>
      )}
    </div>
  );

  const renderProductsTab = () => (
    <div className="space-y-6">
      {/* Search + Sort */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            placeholder={`Search products in ${storeName}…`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl border border-slate-200 bg-card text-sm focus:outline-none focus:ring-2 transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1 shrink-0">
            <ArrowUpDown className="size-3.5" /> Sort:
          </span>
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value as SortMode)}
            className="text-xs font-semibold border border-slate-200 rounded-xl px-3 py-2.5 bg-card focus:outline-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Category Pills */}
      {categoryOptions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
              !selectedCategory
                ? "text-white border-transparent shadow-sm"
                : "text-muted-foreground border-slate-200 bg-card hover:bg-slate-50"
            }`}
            style={
              !selectedCategory
                ? { background: primaryColor }
                : undefined
            }
          >
            All Products ({productCount})
          </button>
          {categoryOptions.map((cat) => (
            <button
              key={cat.slug}
              onClick={() =>
                setSelectedCategory(
                  selectedCategory === cat.slug ? null : cat.slug,
                )
              }
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                selectedCategory === cat.slug
                  ? "text-white border-transparent shadow-sm"
                  : "text-muted-foreground border-slate-200 bg-card hover:bg-slate-50"
              }`}
              style={
                selectedCategory === cat.slug
                  ? { background: primaryColor }
                  : undefined
              }
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}

      {/* Results count */}
      {(searchQuery || selectedCategory) && (
        <p className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-bold text-secondary">
            {filteredProducts.length}
          </span>{" "}
          {filteredProducts.length === 1 ? "product" : "products"}
          {searchQuery && (
            <>
              {" "}
              for "<span className="font-medium">{searchQuery}</span>"
            </>
          )}
          {selectedCategory && (
            <>
              {" "}
              in{" "}
              <span className="font-medium">
                {categoryOptions.find((c) => c.slug === selectedCategory)?.name}
              </span>
            </>
          )}
        </p>
      )}

      {/* Product Grid */}
      {productsLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="rounded-xl border animate-pulse bg-card">
              <div className="aspect-square bg-slate-200 rounded-t-xl" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 rounded-3xl border-2 border-dashed border-slate-200">
          <div className="text-4xl mb-3">🔍</div>
          <p className="font-semibold text-secondary mb-1">
            No products found
          </p>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search or category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory(null);
            }}
            className="mt-4 text-xs font-semibold underline"
            style={{ color: primaryColor }}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </div>
  );

  const renderAboutTab = () => (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        {/* Store Description */}
        <section className="bg-card rounded-3xl border p-8 shadow-soft space-y-4">
          <h2 className="text-lg font-extrabold text-secondary">
            About {storeName}
          </h2>
          {store.description ? (
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {store.description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No description provided yet.
            </p>
          )}
        </section>

        {/* Business Info */}
        <section className="bg-card rounded-3xl border p-8 shadow-soft space-y-4">
          <h2 className="text-lg font-extrabold text-secondary">
            Business Information
          </h2>
          <div className="space-y-0 text-sm divide-y divide-slate-100">
            <div className="flex items-center gap-3 py-3">
              <Calendar className="size-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Member since</span>
              <span className="ml-auto font-semibold text-secondary">
                {joinedDate || "—"}
              </span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <Package2 className="size-4 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">Total active products</span>
              <span className="ml-auto font-semibold text-secondary">
                {productCount}
              </span>
            </div>
            <div className="flex items-center gap-3 py-3">
              <CheckCircle2
                className="size-4 shrink-0"
                style={{ color: primaryColor }}
              />
              <span className="text-muted-foreground">Seller status</span>
              <span
                className="ml-auto font-semibold"
                style={{ color: primaryColor }}
              >
                Verified ✓
              </span>
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="bg-card rounded-3xl border p-8 shadow-soft space-y-5">
          <h2 className="text-lg font-extrabold text-secondary">
            Store Policies
          </h2>
          <div className="space-y-5 text-sm text-muted-foreground divide-y divide-slate-100">
            {[
              {
                icon: <Truck className="size-4 shrink-0 mt-0.5" style={{ color: primaryColor }} />,
                title: "Shipping Policy",
                text: "Orders are processed within 1–2 business days. Free shipping on orders over $35. Delivery takes 2–5 business days.",
              },
              {
                icon: <RotateCcw className="size-4 shrink-0 mt-0.5" style={{ color: primaryColor }} />,
                title: "Return Policy",
                text: "Items can be returned within 30 days of delivery in original condition. Contact the seller to initiate a return.",
              },
              {
                icon: <ShieldCheck className="size-4 shrink-0 mt-0.5" style={{ color: primaryColor }} />,
                title: "Privacy & Security",
                text: "Your payment information is never stored. All transactions are encrypted with 256-bit SSL. Buyer protection on all orders.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 pt-5 first:pt-0">
                {item.icon}
                <div>
                  <p className="font-semibold text-secondary mb-1">
                    {item.title}
                  </p>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Store Card */}
        <div className="bg-card rounded-3xl border p-6 shadow-soft text-center space-y-4">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={storeName}
              className="w-20 h-20 rounded-2xl object-cover mx-auto border-2 shadow-sm"
              style={{ borderColor: primaryColor + "30" }}
            />
          ) : (
            <div
              className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-3xl font-extrabold text-white shadow-sm"
              style={{ background: primaryColor }}
            >
              {storeInitial}
            </div>
          )}
          <div>
            <h3 className="font-extrabold text-secondary">{storeName}</h3>
            <div className="flex items-center justify-center gap-1 mt-1">
              <CheckCircle2 className="size-4 fill-blue-500 text-white" />
              <span className="text-xs font-semibold text-blue-600">
                Verified Store
              </span>
            </div>
          </div>
          <button
            onClick={handleFollow}
            className="w-full py-2.5 rounded-2xl font-semibold text-sm transition active:scale-[0.98]"
            style={
              isFollowing
                ? {
                    background: "#f1f5f9",
                    color: "#374151",
                    border: "1px solid #e2e8f0",
                  }
                : { background: primaryColor, color: "#fff" }
            }
          >
            {isFollowing ? "✓ Following" : `Follow ${storeName}`}
          </button>
          <button
            onClick={handleShare}
            className="w-full py-2.5 rounded-2xl font-semibold text-sm border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 transition flex items-center justify-center gap-2"
          >
            <Share2 className="size-4" /> Share Store
          </button>
        </div>

        {/* Social Links */}
        {ts &&
          (ts.social_instagram ||
            ts.social_twitter ||
            ts.social_facebook ||
            ts.social_tiktok) && (
            <div className="bg-card rounded-3xl border p-6 shadow-soft space-y-3">
              <h3 className="text-sm font-extrabold text-secondary">
                Follow on Social
              </h3>
              <div className="flex flex-wrap gap-2">
                {ts.social_instagram && (
                  <a
                    href={ts.social_instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-semibold"
                  >
                    Instagram
                  </a>
                )}
                {ts.social_twitter && (
                  <a
                    href={ts.social_twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-semibold"
                  >
                    X / Twitter
                  </a>
                )}
                {ts.social_facebook && (
                  <a
                    href={ts.social_facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold"
                  >
                    Facebook
                  </a>
                )}
                {ts.social_tiktok && (
                  <a
                    href={ts.social_tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-semibold"
                  >
                    TikTok
                  </a>
                )}
              </div>
            </div>
          )}
      </div>
    </div>
  );

  const renderReviewsTab = () => {
    const avgRating =
      storeReviews.reduce((sum, r) => sum + r.rating, 0) /
      storeReviews.length;
    const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
      star,
      count: storeReviews.filter((r) => r.rating === star).length,
    }));

    return (
      <div className="space-y-10">
        {/* Demo label */}
        <div className="flex items-start gap-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-2xl px-4 py-3">
          <span className="text-amber-500 shrink-0 mt-0.5">⚠</span>
          <span>
            <strong>Demo Reviews</strong> — These are placeholder reviews for
            demonstration purposes only. Real reviews will load once a reviews
            system is connected to the database.
          </span>
        </div>

        {/* Rating Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card rounded-3xl border p-8 shadow-soft flex flex-col items-center justify-center gap-3">
            <div
              className="text-7xl font-black"
              style={{ color: primaryColor }}
            >
              {avgRating.toFixed(1)}
            </div>
            <StarDisplay rating={avgRating} />
            <p className="text-sm text-muted-foreground">
              {storeReviews.length} reviews (demo)
            </p>
          </div>
          <div className="bg-card rounded-3xl border p-8 shadow-soft space-y-3">
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-3 text-sm">
                <span className="w-4 text-muted-foreground font-medium text-right">
                  {star}
                </span>
                <Star className="size-3.5 fill-amber-400 text-amber-400 shrink-0" />
                <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(count / storeReviews.length) * 100}%`,
                      background: primaryColor,
                    }}
                  />
                </div>
                <span className="text-muted-foreground text-xs w-4">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review Cards */}
        <div className="space-y-4">
          {storeReviews.map((rev) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl border p-6 shadow-soft space-y-3"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-sm shrink-0"
                    style={{ background: primaryColor }}
                  >
                    {rev.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-secondary text-sm">
                      {rev.author}
                    </p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <StarDisplay rating={rev.rating} />
                      {rev.isLocal && (
                        <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
                          Local
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {rev.date}
                </span>
              </div>
              <p className="font-semibold text-secondary text-sm">
                {rev.title}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {rev.content}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Submit Review Form */}
        <div className="bg-card rounded-3xl border p-8 shadow-soft space-y-5">
          <h3 className="font-extrabold text-secondary flex items-center gap-2">
            <MessageSquare
              className="size-5"
              style={{ color: primaryColor }}
            />{" "}
            Write a Review
          </h3>
          <p className="text-xs text-muted-foreground">
            Reviews are stored locally for demonstration only. A real review
            system will be connected in a future update.
          </p>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your name"
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm bg-card focus:outline-none focus:ring-2"
              />
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl border border-slate-200 bg-card">
                <span className="text-xs text-muted-foreground">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setReviewRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    <Star
                      className={`size-5 transition ${
                        star <= (hoverRating || reviewRating)
                          ? "fill-amber-400 text-amber-400"
                          : "fill-slate-200 text-slate-200"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <input
              type="text"
              placeholder="Review title"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm bg-card focus:outline-none focus:ring-2"
            />
            <textarea
              rows={4}
              placeholder="Share your experience with this store…"
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm resize-none bg-card focus:outline-none focus:ring-2"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-2xl font-semibold text-sm text-white transition hover:opacity-90 active:scale-95"
              style={{ background: primaryColor }}
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    );
  };

  const renderShippingTab = () => (
    <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
      {[
        {
          icon: <Truck className="size-6" />,
          title: "Shipping Policy",
          items: [
            "Orders processed within 1–2 business days",
            "Free standard shipping on orders over $35",
            "Standard shipping: 2–5 business days",
            "Express shipping available at checkout",
            "International shipping available to select countries",
          ],
        },
        {
          icon: <RotateCcw className="size-6" />,
          title: "Return Policy",
          items: [
            "30-day return window from delivery date",
            "Items must be in original, unused condition",
            "Free return shipping on defective items",
            "Refunds processed within 5–7 business days",
            "Contact store to initiate a return request",
          ],
        },
        {
          icon: <ShieldCheck className="size-6" />,
          title: "Buyer Protection",
          items: [
            "All orders protected by Saloree Buyer Guarantee",
            "Full refund if item not received",
            "Refund if item significantly not as described",
            "Secure payment processing with SSL encryption",
            "Dispute resolution support available 24/7",
          ],
        },
        {
          icon: <Lock className="size-6" />,
          title: "Payment & Security",
          items: [
            "Accepted: Visa, Mastercard, PayPal, Apple Pay",
            "256-bit SSL encryption on all transactions",
            "Payment info never stored on our servers",
            "PCI DSS compliant payment processing",
            "Verified by Saloree marketplace standards",
          ],
        },
      ].map((card) => (
        <div
          key={card.title}
          className="bg-card rounded-3xl border p-6 shadow-soft space-y-4"
        >
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-2xl text-white"
              style={{ background: primaryColor }}
            >
              {card.icon}
            </div>
            <h3 className="font-extrabold text-secondary">{card.title}</h3>
          </div>
          <ul className="space-y-2.5">
            {card.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2
                  className="size-3.5 shrink-0 mt-0.5"
                  style={{ color: primaryColor }}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );

  const renderContactTab = () => (
    <div className="max-w-2xl space-y-6">
      <div className="bg-card rounded-3xl border p-8 shadow-soft space-y-6">
        <h2 className="text-lg font-extrabold text-secondary">
          Contact {storeName}
        </h2>
        <div className="space-y-3">
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
            <div
              className="p-2.5 rounded-xl text-white shrink-0"
              style={{ background: primaryColor }}
            >
              <Clock className="size-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-secondary text-sm">
                Response Time
              </p>
              <p className="text-xs text-muted-foreground">
                Usually responds within 24 hours
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 shrink-0">
              Fast Responder
            </span>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl border border-slate-100 bg-slate-50/50">
            <div
              className="p-2.5 rounded-xl text-white shrink-0"
              style={{ background: primaryColor }}
            >
              <MessageSquare className="size-5" />
            </div>
            <div>
              <p className="font-semibold text-secondary text-sm">
                Message the Seller
              </p>
              <p className="text-xs text-muted-foreground">
                Ask about products, custom orders, or policies
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <button
            className="w-full py-3.5 rounded-2xl font-bold text-white transition hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            style={{ background: primaryColor }}
          >
            <MessageSquare className="size-5" /> Contact Seller
          </button>
          <p className="text-[11px] text-center text-muted-foreground">
            Messaging will be available once the seller messaging system is
            live.
          </p>
        </div>
      </div>

      <div className="bg-card rounded-3xl border p-6 shadow-soft space-y-4">
        <h3 className="font-extrabold text-secondary text-sm">
          Trust & Safety
        </h3>
        <div className="grid grid-cols-2 gap-3 text-xs text-muted-foreground">
          {[
            { label: "Verified Seller", badge: "✓" },
            { label: "Secure Payments", badge: "🔒" },
            { label: "Buyer Protection", badge: "🛡" },
            { label: "Easy Returns", badge: "↩" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span>{item.badge}</span> {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Tabs config ────────────────────────────────────────────────────────────

  const tabs: { id: StoreTab; label: string }[] = [
    { id: "home", label: "Home" },
    { id: "products", label: `Products (${productCount})` },
    { id: "about", label: "About" },
    { id: "reviews", label: "Reviews" },
    { id: "shipping", label: "Shipping & Returns" },
    { id: "contact", label: "Contact" },
  ];

  // ── Main render ────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      {/* Announcement Bar */}
      {ts?.show_announcement && ts?.announcement_text && (
        <div
          className="px-4 py-2 text-center text-xs font-semibold"
          style={{
            background: ts.announcement_bg || "#111827",
            color: ts.announcement_text_color || "#ffffff",
          }}
        >
          {ts.announcement_text}
        </div>
      )}

      {/* Draft Store Preview Banner */}
      {isDraft && isOwnerPreview && (
        <div className="bg-amber-500 text-slate-900 px-4 py-2.5 text-center text-xs font-bold flex items-center justify-center gap-2 border-b border-amber-600 shadow-sm">
          <span>⚠️ You are previewing your store in draft mode. Visitors cannot see this store until you publish it.</span>
          <Link
            to="/seller/store"
            className="underline hover:text-slate-950 font-extrabold ml-1"
          >
            Go to Store Settings to Publish
          </Link>
        </div>
      )}

      {/* ── Store Navbar (theme-colored) ──────────────────────────────────── */}
      <nav
        className="sticky top-0 z-50 flex items-center gap-4 px-6 py-3.5 shadow-sm"
        style={{ background: primaryColor, fontFamily }}
      >
        <Link
          to="/stores/$slug"
          params={{ slug }}
          className="flex items-center gap-3"
          onClick={() => setActiveTab("home")}
        >
          {logoUrl ? (
            <img
              src={logoUrl}
              className="h-8 w-8 rounded-lg object-cover border border-white/20"
              alt={storeName}
            />
          ) : (
            <div
              className="h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
              style={{ background: buttonColor }}
            >
              {storeInitial}
            </div>
          )}
          <span className="text-white font-bold text-base">{storeName}</span>
        </Link>

        <div className="flex-1" />

        {/* Dynamic nav items (preserve existing) */}
        <div className="hidden sm:flex items-center gap-4 text-xs font-semibold text-white/95 mr-4">
          <button
            onClick={() => setActiveTab("home")}
            className={`transition ${activeTab === "home" ? "text-white" : "text-white/70 hover:text-white"}`}
          >
            Home
          </button>
          {navItems.map((item) => {
            const isCustomPage = item.url.startsWith("/pages/");
            const pageSlug = isCustomPage
              ? item.url.replace("/pages/", "")
              : null;
            return pageSlug ? (
              <Link
                key={item.id}
                to="/stores/$slug"
                params={{ slug }}
                search={{ page: pageSlug }}
                className="text-white/70 hover:text-white transition"
              >
                {item.title}
              </Link>
            ) : (
              <a
                key={item.id}
                href={
                  item.url.startsWith("/")
                    ? item.url
                    : `https://${item.url}`
                }
                target={item.url.startsWith("/") ? "_self" : "_blank"}
                rel="noreferrer"
                className="text-white/70 hover:text-white transition"
              >
                {item.title}
              </a>
            );
          })}
        </div>

        {isOwnerPreview && (
          <Link
            to="/seller"
            className="text-xs text-white/80 hover:text-white underline underline-offset-2 mr-2"
          >
            Dashboard
          </Link>
        )}
      </nav>

      {/* Owner preview badge */}
      {isOwnerPreview && (
        <div className="flex items-center gap-2 px-6 py-2.5 bg-primary/10 border-b border-primary/20 text-xs shrink-0">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>Seller Preview Mode — drafts are visible</span>
          <Link
            to="/seller/theme-customizer"
            search={{ id: activeInstallation?.id }}
            className="ml-auto text-primary hover:underline font-semibold"
          >
            ✏️ Customize Theme
          </Link>
        </div>
      )}

      {/* ── Store Hero (theme-colored) ────────────────────────────────────── */}
      <div
        className="relative overflow-hidden shrink-0"
        style={{
          background: bannerUrl
            ? `url(${bannerUrl}) center/cover no-repeat`
            : `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 60%, ${accentColor} 100%)`,
          minHeight: "280px",
        }}
      >
        {bannerUrl && <div className="absolute inset-0 bg-black/50" />}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-end gap-6">
          {/* Logo */}
          <div className="shrink-0">
            {logoUrl ? (
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={logoUrl}
                alt={storeName}
                className="w-24 h-24 rounded-3xl object-cover border-4 border-white/30 shadow-2xl"
              />
            ) : (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black text-white border-4 border-white/30 shadow-2xl"
                style={{ background: buttonColor }}
              >
                {storeInitial}
              </motion.div>
            )}
          </div>

          {/* Store Info */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex-1 pb-1"
          >
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h1
                className="text-2xl sm:text-3xl font-extrabold text-white leading-tight"
                style={{ fontFamily }}
              >
                {storeName}
              </h1>
              <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-white text-xs font-bold">
                <CheckCircle2 className="size-3.5 fill-white text-white" />{" "}
                Verified
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-white/80 text-xs mt-1">
              {joinedDate && (
                <span className="flex items-center gap-1">
                  <Calendar className="size-3.5" /> Joined {joinedDate}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Package2 className="size-3.5" /> {productCount} products
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-3.5 fill-amber-400 text-amber-400" />{" "}
                4.8
                <span className="text-white/60 ml-0.5">(Demo)</span>
              </span>
            </div>
            {store.description && (
              <p className="text-white/80 text-xs mt-2 max-w-lg line-clamp-2 leading-relaxed">
                {store.description}
              </p>
            )}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex items-center gap-2 shrink-0 self-end pb-1"
          >
            <button
              onClick={handleFollow}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition active:scale-95"
              style={
                isFollowing
                  ? {
                      background: "rgba(255,255,255,0.2)",
                      color: "#fff",
                      backdropFilter: "blur(8px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }
                  : { background: "#ffffff", color: primaryColor }
              }
            >
              <Heart
                className={`size-4 ${isFollowing ? "fill-white text-white" : ""}`}
              />
              {isFollowing ? "Following" : "Follow"}
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm bg-white/15 text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 transition active:scale-95"
            >
              <Share2 className="size-4" /> Share
            </button>
          </motion.div>
        </div>
      </div>

      {/* ── Sticky Tab Navigation ─────────────────────────────────────────── */}
      <div
        ref={tabsRef}
        className="sticky top-[57px] z-40 bg-white border-b border-slate-200 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 px-4 py-4 text-xs font-semibold transition-colors whitespace-nowrap border-b-2 border-transparent ${
                  activeTab === tab.id
                    ? "text-secondary"
                    : "text-muted-foreground hover:text-secondary"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="store-tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{ background: primaryColor }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ───────────────────────────────────────────────────── */}
      <div className="flex-1">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              {activeTab === "home" && renderHomeTab()}
              {activeTab === "products" && renderProductsTab()}
              {activeTab === "about" && renderAboutTab()}
              {activeTab === "reviews" && renderReviewsTab()}
              {activeTab === "shipping" && renderShippingTab()}
              {activeTab === "contact" && renderContactTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Footer (preserve existing) ────────────────────────────────────── */}
      <footer
        className="border-t mt-auto"
        style={{
          background: primaryColor + "12",
          borderColor: primaryColor + "30",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                className="h-8 w-8 rounded-lg object-cover"
                alt={storeName}
              />
            ) : (
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-sm font-bold text-white"
                style={{ background: primaryColor }}
              >
                {storeInitial}
              </div>
            )}
            <span className="font-semibold text-sm text-foreground">
              {storeName}
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-2">
            <SocialIcon href={ts?.social_instagram || ""} label="Instagram">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={ts?.social_twitter || ""} label="Twitter">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={ts?.social_facebook || ""} label="Facebook">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </SocialIcon>
            <SocialIcon href={ts?.social_tiktok || ""} label="TikTok">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.26 8.26 0 004.83 1.55V6.84a4.85 4.85 0 01-1.06-.15z" />
              </svg>
            </SocialIcon>
          </div>

          <p className="text-xs text-muted-foreground">{footerText}</p>
        </div>
      </footer>
    </div>
  );
}
