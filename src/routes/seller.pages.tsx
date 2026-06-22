import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Edit, Trash2, Globe, Eye, FileText } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

export const Route = createFileRoute("/seller/pages")({
  head: () => ({ meta: [{ title: "Online Store Pages — Saloree" }] }),
  component: SellerPages,
});

function SellerPages() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  // Fetch store
  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("stores").select("*").eq("owner_id", user!.id).maybeSingle()).data,
  });

  // Fetch pages
  const { data: pages = [], isLoading } = useQuery({
    queryKey: ["store-pages", store?.id],
    enabled: !!store?.id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("store_pages" as any)
        .select("*")
        .eq("store_id", store!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as any[];
    },
  });

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!store?.id) throw new Error("Store not found");
      const payload = {
        store_id: store.id,
        title,
        slug: slug.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        content,
        is_published: isPublished,
        updated_at: new Date().toISOString(),
      };

      if (editingPage) {
        const { error } = await supabase
          .from("store_pages" as any)
          .update(payload)
          .eq("id", editingPage.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("store_pages" as any)
          .insert({ ...payload, created_at: new Date().toISOString() });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-pages", store?.id] });
      toast.success(editingPage ? "Page updated! 📝" : "Page created! 📄");
      handleClose();
    },
    onError: (err) => {
      toast.error("Failed to save page: " + err.message);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("store_pages" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["store-pages", store?.id] });
      toast.success("Page deleted.");
    },
    onError: (err) => {
      toast.error("Failed to delete page: " + err.message);
    },
  });

  const handleOpenAdd = () => {
    setEditingPage(null);
    setTitle("");
    setSlug("");
    setContent("");
    setIsPublished(true);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (page: any) => {
    setEditingPage(page);
    setTitle(page.title);
    setSlug(page.slug);
    setContent(page.content || "");
    setIsPublished(page.is_published);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setEditingPage(null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingPage) {
      // Auto-generate slug for new pages
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
    }
  };

  if (!user || !store) {
    return <div className="text-center py-20 text-muted-foreground">Please sign in to manage pages.</div>;
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Pages</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Create, edit, and manage custom pages (e.g. About, Contact, FAQ) for your store.
          </p>
        </div>
        <Button onClick={handleOpenAdd} className="h-9 gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" /> Add page
        </Button>
      </div>

      {/* Pages list */}
      {isLoading ? (
        <div className="text-center py-10 text-muted-foreground">Loading pages…</div>
      ) : pages.length === 0 ? (
        <div className="rounded-xl border border-dashed p-16 text-center">
          <div className="text-5xl mb-4">📄</div>
          <h3 className="text-lg font-semibold mb-1">Add pages to your store</h3>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-4">
            Custom pages give your customers more details about your brand, sizing charts, returns policies, or contact details.
          </p>
          <Button onClick={handleOpenAdd} size="sm" className="cursor-pointer">
            Create page
          </Button>
        </div>
      ) : (
        <div className="bg-card border rounded-xl overflow-hidden shadow-sm">
          <div className="divide-y">
            {pages.map((page) => (
              <div key={page.id} className="p-4 flex items-center justify-between gap-4 hover:bg-muted/10 transition">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm truncate text-foreground">{page.title}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${page.is_published ? "bg-green-500/10 text-green-500" : "bg-yellow-500/10 text-yellow-500"}`}>
                      {page.is_published ? "Visible" : "Hidden"}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Globe className="w-3.5 h-3.5" />
                    <span className="truncate">/stores/{store.slug}/pages/{page.slug}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" asChild>
                    <a href={`/stores/${store.slug}?page=${page.slug}`} target="_blank" rel="noreferrer">
                      <Eye className="w-4 h-4 text-muted-foreground" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => handleOpenEdit(page)}>
                    <Edit className="w-4 h-4 text-muted-foreground" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:bg-destructive/10 cursor-pointer"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this page?")) {
                        deleteMutation.mutate(page.id);
                      }
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={(v) => !v && handleClose()}>
        <DialogContent className="sm:max-w-xl max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingPage ? "Edit page" : "Add page"}</DialogTitle>
            <DialogDescription>
              Write content for your custom page. Slugs are used to generate custom page URLs.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. About Our Brand"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="about-our-brand"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="content">Content (HTML / Plain Text)</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your page details here..."
                rows={8}
              />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div>
                <Label className="text-sm font-semibold">Visibility</Label>
                <p className="text-xs text-muted-foreground">Make this page active on your storefront</p>
              </div>
              <Switch
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={() => saveMutation.mutate()} disabled={!title.trim() || !slug.trim() || saveMutation.isPending}>
              {saveMutation.isPending ? "Saving…" : "Save Page"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
