-- ============================================================
-- SALOREE CONTENT MANAGER — RLS FULL AUDIT & FIX
-- Paste this in: https://supabase.com/dashboard/project/yjxgdohfrkqdcahtxezz/sql/new
-- Run this AFTER the previous apply_content_manager.sql
-- ============================================================

-- ─── STEP 1: Create a SECURITY DEFINER helper function ───────
-- This bypasses RLS on user_roles so storage policies can query it.
-- Without SECURITY DEFINER, the cross-schema subquery in storage
-- policies can fail silently, causing "row violates RLS policy".
CREATE OR REPLACE FUNCTION public.is_content_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role::text IN ('admin', 'super_admin', 'content_admin')
  );
$$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.is_content_admin() TO authenticated;

-- ─── STEP 2: Quick diagnosis — check what roles the current user has ─
-- This will show in the results so you can confirm your user has a valid role.
SELECT
  ur.role::text AS role,
  ur.user_id,
  auth.uid() AS current_uid,
  (auth.uid() = ur.user_id) AS is_my_role,
  public.is_content_admin() AS is_content_admin_result
FROM public.user_roles ur
WHERE ur.user_id = auth.uid();

-- ─── STEP 3: Fix RLS on site_settings ────────────────────────
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site_settings"  ON public.site_settings;
DROP POLICY IF EXISTS "Admin write site_settings"  ON public.site_settings;
DROP POLICY IF EXISTS "Admins write site_settings" ON public.site_settings;

CREATE POLICY "Public read site_settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Admin write site_settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- ─── STEP 4: Fix RLS on hero_slides ──────────────────────────
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read hero_slides"  ON public.hero_slides;
DROP POLICY IF EXISTS "Admin write hero_slides"  ON public.hero_slides;
DROP POLICY IF EXISTS "Admins write hero_slides" ON public.hero_slides;

CREATE POLICY "Public read hero_slides"
  ON public.hero_slides FOR SELECT
  USING (true);

CREATE POLICY "Admin write hero_slides"
  ON public.hero_slides FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- ─── STEP 5: Fix RLS on homepage_sections ────────────────────
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read homepage_sections"  ON public.homepage_sections;
DROP POLICY IF EXISTS "Admin write homepage_sections"  ON public.homepage_sections;
DROP POLICY IF EXISTS "Admins write homepage_sections" ON public.homepage_sections;

CREATE POLICY "Public read homepage_sections"
  ON public.homepage_sections FOR SELECT
  USING (true);

CREATE POLICY "Admin write homepage_sections"
  ON public.homepage_sections FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- ─── STEP 6: Fix RLS on promo_banners ────────────────────────
ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read promo_banners"  ON public.promo_banners;
DROP POLICY IF EXISTS "Admin write promo_banners"  ON public.promo_banners;
DROP POLICY IF EXISTS "Admins write promo_banners" ON public.promo_banners;

CREATE POLICY "Public read promo_banners"
  ON public.promo_banners FOR SELECT
  USING (true);

CREATE POLICY "Admin write promo_banners"
  ON public.promo_banners FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- ─── STEP 7: Fix RLS on footer_links ─────────────────────────
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read footer_links"  ON public.footer_links;
DROP POLICY IF EXISTS "Admin write footer_links"  ON public.footer_links;
DROP POLICY IF EXISTS "Admins write footer_links" ON public.footer_links;

CREATE POLICY "Public read footer_links"
  ON public.footer_links FOR SELECT
  USING (true);

CREATE POLICY "Admin write footer_links"
  ON public.footer_links FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- ─── STEP 8: Fix storage RLS for site-assets ─────────────────
-- Drop ALL possible old policy names to avoid conflicts
DROP POLICY IF EXISTS "Public read site-assets"        ON storage.objects;
DROP POLICY IF EXISTS "Admin upload site-assets"       ON storage.objects;
DROP POLICY IF EXISTS "Admin update site-assets"       ON storage.objects;
DROP POLICY IF EXISTS "Admin delete site-assets"       ON storage.objects;
DROP POLICY IF EXISTS "Admin upload site assets"       ON storage.objects;
DROP POLICY IF EXISTS "Admin update site assets"       ON storage.objects;
DROP POLICY IF EXISTS "Admin delete site assets"       ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload site-assets" ON storage.objects;

-- Recreate storage policies using the SECURITY DEFINER helper
CREATE POLICY "Public read site-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Admin upload site-assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );

CREATE POLICY "Admin update site-assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );

CREATE POLICY "Admin delete site-assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );

-- ─── STEP 9: Ensure site-assets bucket exists and is public ──
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets', 'site-assets', true, 10485760,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760;

-- ─── STEP 10: Assign admin role to current user if missing ────
-- This adds 'admin' role to your currently-logged-in user if you don't have any content admin role.
-- Only runs if you have NO admin/super_admin/content_admin role.
DO $$
DECLARE
  v_uid UUID := auth.uid();
BEGIN
  IF v_uid IS NULL THEN
    RAISE NOTICE 'No authenticated user found. Make sure you are logged in before running this script.';
    RETURN;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = v_uid
      AND role::text IN ('admin', 'super_admin', 'content_admin')
  ) THEN
    -- Upsert admin role for current user
    INSERT INTO public.user_roles (user_id, role)
    VALUES (v_uid, 'admin')
    ON CONFLICT (user_id, role) DO NOTHING;
    RAISE NOTICE 'Assigned admin role to user %', v_uid;
  ELSE
    RAISE NOTICE 'User % already has a content admin role.', v_uid;
  END IF;
END$$;

-- ─── STEP 11: Final verification ─────────────────────────────
SELECT 'ROLES CHECK' AS check_type,
  ur.role::text AS my_role,
  public.is_content_admin() AS can_write_content
FROM public.user_roles ur
WHERE ur.user_id = auth.uid()

UNION ALL

SELECT 'POLICIES CHECK' AS check_type,
  policyname AS my_role,
  true AS can_write_content
FROM pg_policies
WHERE tablename IN ('site_settings','hero_slides','homepage_sections','promo_banners','footer_links')
   OR (schemaname = 'storage' AND tablename = 'objects' AND policyname LIKE '%site-assets%')
ORDER BY check_type, my_role;
