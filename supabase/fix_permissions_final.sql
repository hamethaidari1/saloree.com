-- ============================================================
-- SALOREE CONTENT MANAGER — COMPLETE PERMISSION FIX
-- Run this in: https://supabase.com/dashboard/project/yjxgdohfrkqdcahtxezz/sql/new
-- ============================================================

-- ─── STEP 1: Check what users exist with those emails ────────
SELECT
  id,
  email,
  created_at,
  last_sign_in_at
FROM auth.users
WHERE email IN ('hamedhaidari2023@gmail.com', 'designwithhamed@gmail.com');

-- ─── STEP 2: Check their current roles ───────────────────────
SELECT
  au.email,
  ur.role::text AS role,
  ur.user_id
FROM public.user_roles ur
JOIN auth.users au ON au.id = ur.user_id
WHERE au.email IN ('hamedhaidari2023@gmail.com', 'designwithhamed@gmail.com');

-- ─── STEP 3: Add admin role to BOTH users (by email lookup) ──
-- Inserts admin role for hamedhaidari2023@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'hamedhaidari2023@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- Inserts admin role for designwithhamed@gmail.com
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::public.app_role
FROM auth.users
WHERE email = 'designwithhamed@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;

-- ─── STEP 4: Ensure super_admin and content_admin enum values exist ──
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'super_admin'
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'super_admin';
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumlabel = 'content_admin'
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role')
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'content_admin';
  END IF;
END$$;

-- ─── STEP 5: Create/replace the SECURITY DEFINER helper ──────
-- SECURITY DEFINER means it runs with elevated privileges and
-- bypasses RLS on user_roles — required for storage policies.
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

GRANT EXECUTE ON FUNCTION public.is_content_admin() TO authenticated;
GRANT EXECUTE ON FUNCTION public.is_content_admin() TO anon;

-- ─── STEP 6: Rebuild user_roles RLS to allow admins to see ALL roles ─
-- The current policy only lets users see their OWN row.
-- Storage subqueries need the function above (SECURITY DEFINER) to work.
-- We also ensure service_role has full access.
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users see own roles"          ON public.user_roles;
DROP POLICY IF EXISTS "Admins see all roles"         ON public.user_roles;
DROP POLICY IF EXISTS "Service role full access"     ON public.user_roles;

CREATE POLICY "Users see own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id OR public.is_content_admin());

-- ─── STEP 7: Rebuild ALL table RLS policies ──────────────────

-- site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read site_settings"   ON public.site_settings;
DROP POLICY IF EXISTS "Admin write site_settings"   ON public.site_settings;
DROP POLICY IF EXISTS "Admins write site_settings"  ON public.site_settings;

CREATE POLICY "Public read site_settings"
  ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admin write site_settings"
  ON public.site_settings FOR ALL TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- hero_slides
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read hero_slides"   ON public.hero_slides;
DROP POLICY IF EXISTS "Admin write hero_slides"   ON public.hero_slides;
DROP POLICY IF EXISTS "Admins write hero_slides"  ON public.hero_slides;

CREATE POLICY "Public read hero_slides"
  ON public.hero_slides FOR SELECT USING (true);

CREATE POLICY "Admin write hero_slides"
  ON public.hero_slides FOR ALL TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- homepage_sections
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read homepage_sections"   ON public.homepage_sections;
DROP POLICY IF EXISTS "Admin write homepage_sections"   ON public.homepage_sections;
DROP POLICY IF EXISTS "Admins write homepage_sections"  ON public.homepage_sections;

CREATE POLICY "Public read homepage_sections"
  ON public.homepage_sections FOR SELECT USING (true);

CREATE POLICY "Admin write homepage_sections"
  ON public.homepage_sections FOR ALL TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- promo_banners
ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read promo_banners"   ON public.promo_banners;
DROP POLICY IF EXISTS "Admin write promo_banners"   ON public.promo_banners;
DROP POLICY IF EXISTS "Admins write promo_banners"  ON public.promo_banners;

CREATE POLICY "Public read promo_banners"
  ON public.promo_banners FOR SELECT USING (true);

CREATE POLICY "Admin write promo_banners"
  ON public.promo_banners FOR ALL TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- footer_links
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public read footer_links"   ON public.footer_links;
DROP POLICY IF EXISTS "Admin write footer_links"   ON public.footer_links;
DROP POLICY IF EXISTS "Admins write footer_links"  ON public.footer_links;

CREATE POLICY "Public read footer_links"
  ON public.footer_links FOR SELECT USING (true);

CREATE POLICY "Admin write footer_links"
  ON public.footer_links FOR ALL TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

-- ─── STEP 8: Rebuild storage RLS for site-assets ─────────────
-- Drop every possible variant name
DROP POLICY IF EXISTS "Public read site-assets"           ON storage.objects;
DROP POLICY IF EXISTS "Admin upload site-assets"          ON storage.objects;
DROP POLICY IF EXISTS "Admin update site-assets"          ON storage.objects;
DROP POLICY IF EXISTS "Admin delete site-assets"          ON storage.objects;
DROP POLICY IF EXISTS "Admin upload site assets"          ON storage.objects;
DROP POLICY IF EXISTS "Admin update site assets"          ON storage.objects;
DROP POLICY IF EXISTS "Admin delete site assets"          ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload site-assets"  ON storage.objects;

CREATE POLICY "Public read site-assets"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Admin upload site-assets"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );

CREATE POLICY "Admin update site-assets"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );

CREATE POLICY "Admin delete site-assets"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );

-- ─── STEP 9: Ensure site-assets bucket is public ─────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets', 'site-assets', true, 10485760,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public           = true,
  file_size_limit  = 10485760;

-- ─── STEP 10: FULL AUDIT — verify everything ─────────────────

-- 10a: Show both users with their roles
SELECT
  '=== USER ROLES ===' AS section,
  au.email,
  ur.role::text AS assigned_role
FROM public.user_roles ur
JOIN auth.users au ON au.id = ur.user_id
WHERE au.email IN ('hamedhaidari2023@gmail.com', 'designwithhamed@gmail.com');

-- 10b: Show active policies on all 5 tables + storage
SELECT
  '=== POLICIES ===' AS section,
  schemaname,
  tablename,
  policyname,
  cmd,
  permissive
FROM pg_policies
WHERE
  (schemaname = 'public' AND tablename IN (
    'site_settings','hero_slides','homepage_sections','promo_banners','footer_links','user_roles'
  ))
  OR
  (schemaname = 'storage' AND tablename = 'objects' AND policyname LIKE '%site-assets%')
ORDER BY schemaname, tablename, policyname;

-- 10c: Confirm function exists
SELECT
  '=== FUNCTION ===' AS section,
  routine_name,
  security_type
FROM information_schema.routines
WHERE routine_schema = 'public'
  AND routine_name = 'is_content_admin';

-- 10d: Confirm site-assets bucket exists
SELECT
  '=== BUCKET ===' AS section,
  id,
  name,
  public,
  file_size_limit
FROM storage.buckets
WHERE id = 'site-assets';

-- 10e: Confirm all 5 content tables exist
SELECT
  '=== TABLES ===' AS section,
  table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN (
    'site_settings','hero_slides','homepage_sections','promo_banners','footer_links'
  )
ORDER BY table_name;
