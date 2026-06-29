import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  product_id: string;
  slug: string;
  store_id: string;
  store_name: string;
  title: string;
  price: number;
  featured_image: string | null;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const KEY = "saloree.cart.v1";

type LegacyCartItem = {
  productId?: string;
  storeId?: string;
  title?: string;
  price?: number;
  image?: string | null;
  quantity?: number;
};

function normalizeCartItem(item: CartItem | LegacyCartItem): CartItem | null {
  const product_id = "product_id" in item ? item.product_id : item.productId;
  const store_id = "store_id" in item ? item.store_id : item.storeId;

  if (!product_id || !store_id || !item.title) {
    return null;
  }

  return {
    product_id,
    slug: "slug" in item && item.slug ? item.slug : product_id,
    store_id,
    store_name: "store_name" in item && item.store_name ? item.store_name : "Unknown store",
    title: item.title,
    price: Number(item.price ?? 0),
    featured_image: "featured_image" in item ? (item.featured_image ?? null) : (item.image ?? null),
    quantity: Math.max(1, Number(item.quantity ?? 1)),
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      setReady(true);
      return;
    }
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Array<CartItem | LegacyCartItem>;
        setItems(parsed.map(normalizeCartItem).filter((item): item is CartItem => item !== null));
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, ready]);

  const add: CartContextValue["add"] = (item, qty = 1) => {
    setItems((prev) => {
      const ex = prev.find((p) => p.product_id === item.product_id);
      if (ex) {
        return prev.map((p) =>
          p.product_id === item.product_id ? { ...p, quantity: p.quantity + Math.max(1, qty) } : p,
        );
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };
  const remove: CartContextValue["remove"] = (productId) =>
    setItems((prev) => prev.filter((p) => p.product_id !== productId));
  const setQty: CartContextValue["setQty"] = (productId, qty) =>
    setItems((prev) =>
      prev.map((p) => (p.product_id === productId ? { ...p, quantity: Math.max(1, qty) } : p)),
    );
  const clear = () => setItems([]);

  const count = items.reduce((s, i) => s + i.quantity, 0);
  const total = items.reduce((s, i) => s + i.quantity * i.price, 0);

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be inside CartProvider");
  return ctx;
}
