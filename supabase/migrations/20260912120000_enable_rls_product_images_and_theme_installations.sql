-- =========================================================================
-- Enable Row Level Security and add granular access policies for:
-- 1. public.product_images
-- 2. public.store_theme_installations
--
-- Background:
-- The Supabase security advisor identified that RLS was disabled on both
-- tables, allowing unrestricted anonymous reads and writes.
--
-- Analysis of consumers:
-- - product_images:
--     * Public storefront (products.$slug.tsx) selects image_url.
--     * Seller product manager (seller.products.tsx) selects, inserts, and
--       deletes images for products owned by the seller's store.
-- - store_theme_installations:
--     * Public storefront (stores.$slug.tsx) selects the active theme where
--       is_published = true to render store branding and layout.
--     * Seller theme manager (seller.themes.tsx & seller.theme-customizer.tsx)
--       selects, inserts, updates (publish/rename), and deletes installations
--       for stores owned by auth.uid().
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. product_images
-- -------------------------------------------------------------------------

ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;

-- Clean up any existing legacy policies
DROP POLICY IF EXISTS "Anyone reads product images" ON public.product_images;
DROP POLICY IF EXISTS "Store owner manages product images" ON public.product_images;
DROP POLICY IF EXISTS "product_images_select_public" ON public.product_images;
DROP POLICY IF EXISTS "product_images_insert_seller" ON public.product_images;
DROP POLICY IF EXISTS "product_images_update_seller" ON public.product_images;
DROP POLICY IF EXISTS "product_images_delete_seller" ON public.product_images;
DROP POLICY IF EXISTS "product_images_admin_all" ON public.product_images;

-- Public read: product images are public storefront content
CREATE POLICY "product_images_select_public"
  ON public.product_images FOR SELECT
  USING (true);

-- Seller insert: owner of store that owns parent product
CREATE POLICY "product_images_insert_seller"
  ON public.product_images FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.products p
      JOIN public.stores s ON s.id = p.store_id
      WHERE p.id = product_images.product_id
        AND s.owner_id = auth.uid()
    )
  );

-- Seller update: owner of store that owns parent product
CREATE POLICY "product_images_update_seller"
  ON public.product_images FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      JOIN public.stores s ON s.id = p.store_id
      WHERE p.id = product_images.product_id
        AND s.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.products p
      JOIN public.stores s ON s.id = p.store_id
      WHERE p.id = product_images.product_id
        AND s.owner_id = auth.uid()
    )
  );

-- Seller delete: owner of store that owns parent product
CREATE POLICY "product_images_delete_seller"
  ON public.product_images FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.products p
      JOIN public.stores s ON s.id = p.store_id
      WHERE p.id = product_images.product_id
        AND s.owner_id = auth.uid()
    )
  );

-- Admin manage all
CREATE POLICY "product_images_admin_all"
  ON public.product_images FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Ensure table permissions
GRANT SELECT ON public.product_images TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_images TO authenticated;
GRANT ALL ON public.product_images TO service_role;


-- -------------------------------------------------------------------------
-- 2. store_theme_installations
-- -------------------------------------------------------------------------

ALTER TABLE public.store_theme_installations ENABLE ROW LEVEL SECURITY;

-- Clean up any existing legacy policies
DROP POLICY IF EXISTS "Anyone reads store_theme_installations" ON public.store_theme_installations;
DROP POLICY IF EXISTS "Store owner manages store_theme_installations" ON public.store_theme_installations;
DROP POLICY IF EXISTS "Owner inserts store_theme_installations" ON public.store_theme_installations;
DROP POLICY IF EXISTS "Owner updates store_theme_installations" ON public.store_theme_installations;
DROP POLICY IF EXISTS "Owner deletes store_theme_installations" ON public.store_theme_installations;
DROP POLICY IF EXISTS "Admins manage store_theme_installations" ON public.store_theme_installations;
DROP POLICY IF EXISTS "store_theme_installations_select_published" ON public.store_theme_installations;
DROP POLICY IF EXISTS "store_theme_installations_select_owner" ON public.store_theme_installations;
DROP POLICY IF EXISTS "store_theme_installations_insert_owner" ON public.store_theme_installations;
DROP POLICY IF EXISTS "store_theme_installations_update_owner" ON public.store_theme_installations;
DROP POLICY IF EXISTS "store_theme_installations_delete_owner" ON public.store_theme_installations;
DROP POLICY IF EXISTS "store_theme_installations_admin_all" ON public.store_theme_installations;

-- Narrow public read: public storefront (routes/stores.$slug.tsx) selects the active
-- published theme installation to render styling, layout, and colors for store visitors.
CREATE POLICY "store_theme_installations_select_published"
  ON public.store_theme_installations FOR SELECT
  USING (is_published = true);

-- Seller read: store owner reads all theme installations for their store (published & draft)
CREATE POLICY "store_theme_installations_select_owner"
  ON public.store_theme_installations FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.stores s
      WHERE s.id = store_theme_installations.store_id
        AND s.owner_id = auth.uid()
    )
  );

-- Seller insert: store owner installs or duplicates a theme for their store
CREATE POLICY "store_theme_installations_insert_owner"
  ON public.store_theme_installations FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.stores s
      WHERE s.id = store_theme_installations.store_id
        AND s.owner_id = auth.uid()
    )
  );

-- Seller update: store owner publishes, renames, or edits theme installations
CREATE POLICY "store_theme_installations_update_owner"
  ON public.store_theme_installations FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.stores s
      WHERE s.id = store_theme_installations.store_id
        AND s.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.stores s
      WHERE s.id = store_theme_installations.store_id
        AND s.owner_id = auth.uid()
    )
  );

-- Seller delete: store owner deletes unneeded themes
CREATE POLICY "store_theme_installations_delete_owner"
  ON public.store_theme_installations FOR DELETE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.stores s
      WHERE s.id = store_theme_installations.store_id
        AND s.owner_id = auth.uid()
    )
  );

-- Admin manage all
CREATE POLICY "store_theme_installations_admin_all"
  ON public.store_theme_installations FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Ensure table permissions
GRANT SELECT ON public.store_theme_installations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.store_theme_installations TO authenticated;
GRANT ALL ON public.store_theme_installations TO service_role;
