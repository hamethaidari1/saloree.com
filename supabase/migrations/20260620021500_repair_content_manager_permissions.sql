-- Repair content-manager permissions and restore helper functions relied on by RLS.

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumlabel = 'super_admin'
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role' AND typnamespace = 'public'::regnamespace)
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'super_admin';
  END IF;
END$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_enum
    WHERE enumlabel = 'content_admin'
      AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_role' AND typnamespace = 'public'::regnamespace)
  ) THEN
    ALTER TYPE public.app_role ADD VALUE 'content_admin';
  END IF;
END$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  );
$$;

CREATE OR REPLACE FUNCTION public.has_any_role(_user_id uuid, _roles public.app_role[])
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = ANY(_roles)
  );
$$;

CREATE OR REPLACE FUNCTION public.is_content_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    public.has_any_role(
      auth.uid(),
      ARRAY['admin', 'super_admin', 'content_admin']::public.app_role[]
    ),
    false
  );
$$;

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.has_any_role(uuid, public.app_role[]) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_any_role(uuid, public.app_role[]) TO authenticated, service_role;
REVOKE EXECUTE ON FUNCTION public.is_content_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_content_admin() TO authenticated, service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.user_roles TO authenticated;
GRANT INSERT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

DROP POLICY IF EXISTS "Users see own roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins see all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Content admins see all roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users add own seller role" ON public.user_roles;
DROP POLICY IF EXISTS "Content admins insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Content admins update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Content admins delete roles" ON public.user_roles;

CREATE POLICY "Users see own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Content admins see all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.is_content_admin());

CREATE POLICY "Users add own seller role"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND role = 'seller'::public.app_role
  );

CREATE POLICY "Content admins insert roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.is_content_admin());

CREATE POLICY "Content admins update roles"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

CREATE POLICY "Content admins delete roles"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (public.is_content_admin());

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

GRANT SELECT ON public.hero_slides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;

GRANT SELECT ON public.homepage_sections TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.homepage_sections TO authenticated;
GRANT ALL ON public.homepage_sections TO service_role;

GRANT SELECT ON public.promo_banners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.promo_banners TO authenticated;
GRANT ALL ON public.promo_banners TO service_role;

GRANT SELECT ON public.footer_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.footer_links TO authenticated;
GRANT ALL ON public.footer_links TO service_role;

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admin write site_settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins write site_settings" ON public.site_settings;

CREATE POLICY "Public read site_settings"
  ON public.site_settings
  FOR SELECT
  USING (true);

CREATE POLICY "Admin write site_settings"
  ON public.site_settings
  FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

DROP POLICY IF EXISTS "Public read hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Admin write hero_slides" ON public.hero_slides;
DROP POLICY IF EXISTS "Admins write hero_slides" ON public.hero_slides;

CREATE POLICY "Public read hero_slides"
  ON public.hero_slides
  FOR SELECT
  USING (true);

CREATE POLICY "Admin write hero_slides"
  ON public.hero_slides
  FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

DROP POLICY IF EXISTS "Public read homepage_sections" ON public.homepage_sections;
DROP POLICY IF EXISTS "Admin write homepage_sections" ON public.homepage_sections;
DROP POLICY IF EXISTS "Admins write homepage_sections" ON public.homepage_sections;

CREATE POLICY "Public read homepage_sections"
  ON public.homepage_sections
  FOR SELECT
  USING (true);

CREATE POLICY "Admin write homepage_sections"
  ON public.homepage_sections
  FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

DROP POLICY IF EXISTS "Public read promo_banners" ON public.promo_banners;
DROP POLICY IF EXISTS "Admin write promo_banners" ON public.promo_banners;
DROP POLICY IF EXISTS "Admins write promo_banners" ON public.promo_banners;

CREATE POLICY "Public read promo_banners"
  ON public.promo_banners
  FOR SELECT
  USING (true);

CREATE POLICY "Admin write promo_banners"
  ON public.promo_banners
  FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

DROP POLICY IF EXISTS "Public read footer_links" ON public.footer_links;
DROP POLICY IF EXISTS "Admin write footer_links" ON public.footer_links;
DROP POLICY IF EXISTS "Admins write footer_links" ON public.footer_links;

CREATE POLICY "Public read footer_links"
  ON public.footer_links
  FOR SELECT
  USING (true);

CREATE POLICY "Admin write footer_links"
  ON public.footer_links
  FOR ALL
  TO authenticated
  USING (public.is_content_admin())
  WITH CHECK (public.is_content_admin());

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets',
  'site-assets',
  true,
  10485760,
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE
SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

DROP POLICY IF EXISTS "Public read site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin update site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete site-assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin upload site assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin update site assets" ON storage.objects;
DROP POLICY IF EXISTS "Admin delete site assets" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated upload site-assets" ON storage.objects;

CREATE POLICY "Public read site-assets"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'site-assets');

CREATE POLICY "Admin upload site-assets"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );

CREATE POLICY "Admin update site-assets"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  )
  WITH CHECK (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );

CREATE POLICY "Admin delete site-assets"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'site-assets'
    AND public.is_content_admin()
  );
