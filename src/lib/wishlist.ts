import { HelpCircleIcon } from "lucide-react";
import { useState, useEffect } from "react";

const WISHLIST_KEY = "saloree.wishlist.v1";

export interface WishlistItem {
  product_id: string;
  added_at: string;
}

/**
 * Client-side wishlist service.
 * Structured asynchronously so it can be easily swapped for a Supabase-backed API in the future.
 */
export const wishlistService = {
  async getItems(): Promise<WishlistItem[]> {
    try {
      const raw = localStorage.getItem(WISHLIST_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },



  async add(productId: string): Promise<WishlistItem[]> {
    const items = await this.getItems();
    if (items.some((i) => i.product_id === productId)) {
      return items;
    }
    const newItems = [...items, { product_id: productId, added_at: new Date().toISOString() }];
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(newItems));
    return newItems;
  },

  async remove(productId: string): Promise<WishlistItem[]> {
    const items = await this.getItems();
    const newItems = items.filter((i) => i.product_id !== productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(newItems));
    return newItems;
  },

  async toggle(productId: string): Promise<{ items: WishlistItem[]; isAdded: boolean }> {
    const items = await this.getItems();
    const isAdded = items.some((i) => i.product_id === productId);
    let newItems: WishlistItem[];
    if (isAdded) {
      newItems = await this.remove(productId);
    } else {
      newItems = await this.add(productId);
    }
    return { items: newItems, isAdded: !isAdded };
  }
};

/**
 * A custom hook to use the wishlist in React components.
 */
export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    wishlistService.getItems().then((res) => {
      setItems(res);
      setLoading(false);
    });
  }, []);

  const toggle = async (productId: string) => {
    const { items: newItems, isAdded } = await wishlistService.toggle(productId);
    setItems(newItems);
    return isAdded;
  };

  const has = (productId: string) => {
    return items.some((i) => i.product_id === productId);
  };

  return {
    items,
    loading,
    toggle,
    has,
  };
}
