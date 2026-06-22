import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/seller/content")({
  component: SellerContent,
});

function SellerContent() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Content</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Manage media, files, and brand assets for your online storefront.
        </p>
      </div>
      <div className="rounded-xl border border-dashed p-16 text-center">
        <div className="text-5xl mb-4">📁</div>
        <h3 className="text-lg font-semibold mb-1">Manage brand assets</h3>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Upload images, logos, banners and files to display across your theme and pages.
        </p>
      </div>
    </div>
  );
}
