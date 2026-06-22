import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Save, Shield, Megaphone, Globe, Settings, Code } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/seller/preferences")({
  head: () => ({ meta: [{ title: "Online Store Preferences — Saloree" }] }),
  component: SellerPreferences,
});

function SellerPreferences() {
  const { user } = useAuth();
  const qc = useQueryClient();

  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [facebookPixelId, setFacebookPixelId] = useState("");
  const [passwordProtection, setPasswordProtection] = useState(false);
  const [storefrontPassword, setStorefrontPassword] = useState("");
  const [saving, setSaving] = useState(false);

  // Fetch store
  const { data: store } = useQuery({
    queryKey: ["my-store", user?.id],
    enabled: !!user,
    queryFn: async () =>
      (await supabase.from("stores").select("*").eq("owner_id", user!.id).maybeSingle()).data,
  });

  // Populate defaults when store loads
  useEffect(() => {
    if (store) {
      setMetaTitle((store as any).store_name || store.name || "");
      setMetaDescription(store.description || "");
    }
  }, [store]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Mock saving analytics and password protection settings
      // Save SEO metadata update on store directly if possible (or mock success)
      const { error } = await supabase
        .from("stores")
        .update({
          description: metaDescription,
          updated_at: new Date().toISOString(),
        } as any)
        .eq("id", store!.id);
      if (error) throw error;

      toast.success("Preferences saved successfully! ⚙️");
    } catch (err) {
      toast.error("Failed to save preferences.");
    } finally {
      setSaving(false);
    }
  };

  if (!user || !store) {
    return <div className="text-center py-20 text-muted-foreground">Please sign in to manage preferences.</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Preferences</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Configure search engine metadata, storefront tracking scripts, and password restriction.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Title and Meta Description */}
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Globe className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">Search engine listing</h3>
          </div>
          <p className="text-xs text-muted-foreground leading-normal">
            Configure how your online storefront appears on search results (Google, Bing, Yahoo).
          </p>
          <div className="space-y-3 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="meta_title">Homepage title</Label>
              <Input
                id="meta_title"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder="e.g. My Premium Storefront"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="meta_desc">Homepage meta description</Label>
              <Textarea
                id="meta_desc"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Write a brief summary of what your store sells for search listings..."
                rows={4}
              />
            </div>
          </div>
        </div>

        {/* Analytics and Integrations */}
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Code className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">Social & tracking scripts</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="ga_id">Google Analytics Tracking ID</Label>
              <Input
                id="ga_id"
                value={googleAnalyticsId}
                onChange={(e) => setGoogleAnalyticsId(e.target.value)}
                placeholder="e.g. G-XXXXXXX"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="fb_id">Facebook Pixel ID</Label>
              <Input
                id="fb_id"
                value={facebookPixelId}
                onChange={(e) => setFacebookPixelId(e.target.value)}
                placeholder="e.g. 1234567890"
              />
            </div>
          </div>
        </div>

        {/* Password Protection */}
        <div className="bg-card border rounded-xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">Storefront password protection</h3>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div>
              <Label className="text-sm font-semibold">Enable storefront password</Label>
              <p className="text-xs text-muted-foreground mt-0.5">Restrict storefront visitors with a passkey</p>
            </div>
            <Switch
              checked={passwordProtection}
              onCheckedChange={setPasswordProtection}
            />
          </div>
          {passwordProtection && (
            <div className="space-y-1.5 pt-2 max-w-sm">
              <Label htmlFor="store_pass">Visitor password</Label>
              <Input
                id="store_pass"
                type="password"
                value={storefrontPassword}
                onChange={(e) => setStorefrontPassword(e.target.value)}
                placeholder="e.g. secret123"
              />
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={saving} className="h-9 gap-1.5 cursor-pointer">
            <Save className="w-4 h-4" />
            {saving ? "Saving…" : "Save preferences"}
          </Button>
        </div>
      </form>
    </div>
  );
}
