import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, ArrowUp, ArrowDown, Link2 } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/seller/navigation")({
  head: () => ({ meta: [{ title: "Navigation Menus — Saloree" }] }),
  component: SellerNavigation,
});

function SellerNavigation() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);

  // Fetch store
  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("stores").select("*").eq("owner_id", user!.id).maybeSingle()).data,
  });

  // Fetch navigation items
  const { data: navItems = [], isLoading } = useQuery({
    queryKey: ["store-nav-items", store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_navigation_items" as any)
        .select("*")
        .eq("store_id", store!.id)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as any[];
    },
  });

  // Automatically seed default links if none exist
  useEffect(() => {
    if (store?.id && !isLoading && navItems.length === 0) {
      const seedDefaults = async () => {
        try {
          const defaults = [
            { store_id: store.id, title: "Catalog", url: "#products", display_order: 1 },
          ];
          const { error } = await supabase.from("store_navigation_items" as any).insert(defaults);
          if (error) throw error;
          qc.invalidateQueries({ queryKey: ["store-nav-items", store.id] });
        } catch (err) {
          console.error("Failed to seed default navigation items:", err);
        }
      };
      seedDefaults();
    }
  }, [store?.id, navItems, isLoading, qc]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!store?.id) throw new Error("Store not found");
      const payload = {
        store_id: store.id,
        menu_name: "main-menu",
        title,
        url,
        display_order: displayOrder,
        updated_at: new Date().toISOString(),
      };

      if (editingItem) {
        const { error } = await supabase
          .from("store_navigation_items" as any)
          .update(payload)
          .eq("id", editingItem.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("store_navigation_items" as any)
          .insert({ ...payload, created_at: new Date().toISOString() });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-nav-items", store?.id] });
      toast.success(editingItem ? "Link updated!" : "Link added to menu!");
      handleClose();
    },
    onError: (err) => {
      toast.error("Failed to save navigation link: " + err.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("store_navigation_items" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-nav-items", store?.id] });
      toast.success("Navigation link removed.");
    },
    onError: (err) => {
      toast.error("Failed to delete link: " + err.message);
    },
  });

  // Reorder mutations
  const moveItem = useMutation({
    mutationFn: async ({ item, direction }: { item: any; direction: "up" | "down" }) => {
      const currentIndex = navItems.findIndex((n) => n.id === item.id);
      if (direction === "up" && currentIndex === 0) return;
      if (direction === "down" && currentIndex === navItems.length - 1) return;

      const swapWith = navItems[direction === "up" ? currentIndex - 1 : currentIndex + 1];

      const { error: err1 } = await supabase
        .from("store_navigation_items" as any)
        .update({ display_order: swapWith.display_order })
        .eq("id", item.id);
      if (err1) throw err1;

      const { error: err2 } = await supabase
        .from("store_navigation_items" as any)
        .update({ display_order: item.display_order })
        .eq("id", swapWith.id);
      if (err2) throw err2;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-nav-items", store?.id] });
    },
  });

  const handleOpenAdd = () => {
    setEditingItem(null);
    setTitle("");
    setUrl("");
    setDisplayOrder(navItems.length > 0 ? Math.max(...navItems.map((n) => n.display_order)) + 1 : 1);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item: any) => {
    setEditingItem(item);
    setTitle(item.title);
    setUrl(item.url);
    setDisplayOrder(item.display_order);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  if (!user || !store) {
    return <div className="text-center py-20 text-muted-foreground">Please sign in to manage navigation.</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Navigation</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize header navigation menus for your storefront catalog and pages.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="h-9 gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" /> Add menu item
        </Button>
      </div>

      {/* Navigation List */}
      <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
        <div>
          <h3 className="font-semibold text-sm text-foreground">Main menu</h3>
          <p className="text-xs text-muted-foreground mt-0.5 font-medium">Links displayed in the header navbar</p>
        </div>

        {isLoading ? (
          <div className="text-center py-10 text-muted-foreground">Loading navigation…</div>
        ) : navItems.length === 0 ? (
          <div className="text-center py-6 text-sm text-muted-foreground">No menu links. Add one above.</div>
        ) : (
          <div className="border rounded-lg overflow-hidden bg-background divide-y">
            {navItems.map((item, index) => (
              <div key={item.id} className="p-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <button
                      disabled={index === 0}
                      onClick={() => moveItem.mutate({ item, direction: "up" })}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      disabled={index === navItems.length - 1}
                      onClick={() => moveItem.mutate({ item, direction: "down" })}
                      className="text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-foreground">{item.title}</span>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground mt-0.5">
                      <Link2 className="w-3 h-3" />
                      <span>{item.url}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => handleOpenEdit(item)}>
                    <Edit2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer"
                    onClick={() => {
                      if (confirm("Are you sure you want to remove this navigation item?")) {
                        deleteMutation.mutate(item.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={(v) => !v && handleClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit navigation link" : "Add navigation link"}</DialogTitle>
            <DialogDescription>
              Create links to storefront pages, hashtag identifiers (e.g. #products), or external websites.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="link_title">Link Name</Label>
              <Input
                id="link_title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. About Us"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="link_url">Destination Link / URL</Label>
              <Input
                id="link_url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g. /pages/about, #products, or external domain"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="link_order">Display Order</Label>
              <Input
                id="link_order"
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={!title.trim() || !url.trim() || saveMutation.isPending}>
              {saveMutation.isPending ? "Saving…" : "Save Link"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
