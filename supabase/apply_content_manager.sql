-- ============================================================
-- SALOREE CONTENT MANAGER — FULL SETUP SCRIPT
-- Run this in: https://supabase.com/dashboard/project/yjxgdohfrkqdcahtxezz/sql/new
-- This script is fully idempotent (safe to run multiple times)
-- ============================================================

-- ─── STEP 1: Extend app_role enum ────────────────────────────
-- We use DO blocks because ALTER TYPE ADD VALUE cannot run inside a transaction
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

-- ─── STEP 2: Create site_settings ────────────────────────────
CREATE TABLE IF NOT EXISTS public.site_settings (
  id                 TEXT PRIMARY KEY DEFAULT 'default',
  hero_title         TEXT,
  hero_subtitle      TEXT,
  hero_button_text   TEXT,
  hero_button_link   TEXT,
  logo_url           TEXT,
  primary_color      TEXT,
  button_color       TEXT,
  footer_text        TEXT,
  footer_description TEXT,
  social_links       JSONB DEFAULT '{}'::jsonb,
  created_at         TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at         TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

-- Drop and recreate policies (idempotent)
DROP POLICY IF EXISTS "Public read site_settings"  ON public.site_settings;
DROP POLICY IF EXISTS "Admin write site_settings"   ON public.site_settings;

CREATE POLICY "Public read site_settings" ON public.site_settings
  FOR SELECT USING (true);

CREATE POLICY "Admin write site_settings" ON public.site_settings
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  );

-- Seed default row
INSERT INTO public.site_settings (
  id, hero_title, hero_subtitle, hero_button_text, hero_button_link,
  primary_color, button_color,
  footer_text, footer_description, social_links
) VALUES (
  'default',
  'Shop everything you need, all in one place',
  'Discover top products from trusted sellers at the best prices.',
  'Shop Now',
  '/marketplace',
  '#ef4444',
  '#ef4444',
  '© 2025 Saloree. All rights reserved.',
  'Your one-stop marketplace for everything you need.',
  '{"facebook":"","twitter":"","instagram":"","linkedin":"","youtube":""}'
)
ON CONFLICT (id) DO NOTHING;

-- ─── STEP 3: Create hero_slides ──────────────────────────────
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url     TEXT NOT NULL,
  alt_text      TEXT NOT NULL DEFAULT 'Hero Slide',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_enabled    BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.hero_slides TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.hero_slides TO authenticated;
GRANT ALL ON public.hero_slides TO service_role;

DROP POLICY IF EXISTS "Public read hero_slides"  ON public.hero_slides;
DROP POLICY IF EXISTS "Admin write hero_slides"   ON public.hero_slides;

CREATE POLICY "Public read hero_slides" ON public.hero_slides
  FOR SELECT USING (true);

CREATE POLICY "Admin write hero_slides" ON public.hero_slides
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  );

-- ─── STEP 4: Create homepage_sections ────────────────────────
CREATE TABLE IF NOT EXISTS public.homepage_sections (
  id                 TEXT PRIMARY KEY DEFAULT 'default',
  show_categories    BOOLEAN NOT NULL DEFAULT true,
  show_new_arrivals  BOOLEAN NOT NULL DEFAULT true,
  show_featured      BOOLEAN NOT NULL DEFAULT true,
  categories_title   TEXT NOT NULL DEFAULT 'Shop by Category',
  new_arrivals_title TEXT NOT NULL DEFAULT 'New Arrivals',
  featured_title     TEXT NOT NULL DEFAULT 'Featured Products',
  created_at         TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.homepage_sections TO anon, authenticated;
GRANT INSERT, UPDATE ON public.homepage_sections TO authenticated;
GRANT ALL ON public.homepage_sections TO service_role;

DROP POLICY IF EXISTS "Public read homepage_sections"  ON public.homepage_sections;
DROP POLICY IF EXISTS "Admin write homepage_sections"   ON public.homepage_sections;

CREATE POLICY "Public read homepage_sections" ON public.homepage_sections
  FOR SELECT USING (true);

CREATE POLICY "Admin write homepage_sections" ON public.homepage_sections
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  );

-- Seed default row
INSERT INTO public.homepage_sections (
  id, show_categories, show_new_arrivals, show_featured,
  categories_title, new_arrivals_title, featured_title
) VALUES (
  'default', true, true, true,
  'Shop by Category', 'New Arrivals', 'Featured Products'
)
ON CONFLICT (id) DO NOTHING;

-- ─── STEP 5: Create promo_banners ────────────────────────────
CREATE TABLE IF NOT EXISTS public.promo_banners (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url     TEXT NOT NULL,
  banner_text   TEXT NOT NULL DEFAULT 'Promotional Banner',
  button_link   TEXT NOT NULL DEFAULT '/marketplace',
  button_text   TEXT NOT NULL DEFAULT 'Shop Now',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_enabled    BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.promo_banners TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.promo_banners TO authenticated;
GRANT ALL ON public.promo_banners TO service_role;

DROP POLICY IF EXISTS "Public read promo_banners"  ON public.promo_banners;
DROP POLICY IF EXISTS "Admin write promo_banners"   ON public.promo_banners;

CREATE POLICY "Public read promo_banners" ON public.promo_banners
  FOR SELECT USING (true);

CREATE POLICY "Admin write promo_banners" ON public.promo_banners
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  );

-- ─── STEP 6: Create footer_links ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.footer_links (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label         TEXT NOT NULL,
  url           TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'Company',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.footer_links TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.footer_links TO authenticated;
GRANT ALL ON public.footer_links TO service_role;

DROP POLICY IF EXISTS "Public read footer_links"  ON public.footer_links;
DROP POLICY IF EXISTS "Admin write footer_links"   ON public.footer_links;

CREATE POLICY "Public read footer_links" ON public.footer_links
  FOR SELECT USING (true);

CREATE POLICY "Admin write footer_links" ON public.footer_links
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  );

-- Seed some default footer links
INSERT INTO public.footer_links (label, url, category, display_order) VALUES
  ('About Us',     '/about',      'Company',  0),
  ('Contact',      '/contact',    'Company',  1),
  ('Marketplace',  '/marketplace','Shop',     0),
  ('Sell on Saloree', '/seller',  'Shop',     1),
  ('Privacy Policy',  '/privacy', 'Legal',    0),
  ('Terms of Service','/terms',   'Legal',    1)
ON CONFLICT DO NOTHING;

-- ─── STEP 7: Create site-assets storage bucket ───────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets',
  'site-assets',
  true,
  10485760,  -- 10 MB max
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760;

-- Storage policies (drop & recreate)
DROP POLICY IF EXISTS "Public read site-assets"   ON storage.objects;
DROP POLICY IF EXISTS "Admin upload site-assets"  ON storage.objects;
DROP POLICY IF EXISTS "Admin update site-assets"  ON storage.objects;
DROP POLICY IF EXISTS "Admin delete site-assets"  ON storage.objects;

CREATE POLICY "Public read site-assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');

CREATE POLICY "Admin upload site-assets" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'site-assets'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  );

CREATE POLICY "Admin update site-assets" ON storage.objects
  FOR UPDATE TO authenticated
  USING (
    bucket_id = 'site-assets'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  );

CREATE POLICY "Admin delete site-assets" ON storage.objects
  FOR DELETE TO authenticated
  USING (
    bucket_id = 'site-assets'
    AND EXISTS (
      SELECT 1 FROM public.user_roles
      WHERE user_id = auth.uid()
        AND role IN ('admin', 'super_admin', 'content_admin')
    )
  );

-- ─── STEP 8: Verify tables exist (quick sanity check) ─────────
SELECT
  table_name,
  (SELECT COUNT(*) FROM information_schema.columns c WHERE c.table_name = t.table_name AND c.table_schema = 'public') AS column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN ('site_settings','hero_slides','homepage_sections','promo_banners','footer_links')
ORDER BY table_name;
