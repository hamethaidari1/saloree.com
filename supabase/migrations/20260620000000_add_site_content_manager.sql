-- Alter app_role enum to add new admin roles
-- We use COMMIT; and start a new block if needed, but since Postgres allows ALTER TYPE ADD VALUE, we do it safely.
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'super_admin';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'content_admin';

-- Create site_settings table
CREATE TABLE IF NOT EXISTS public.site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_button_text TEXT,
  hero_button_link TEXT,
  logo_url TEXT,
  primary_color TEXT,
  button_color TEXT,
  footer_text TEXT,
  footer_description TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on site_settings
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Create hero_slides table
CREATE TABLE IF NOT EXISTS public.hero_slides (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  alt_text TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on hero_slides
ALTER TABLE public.hero_slides ENABLE ROW LEVEL SECURITY;

-- Create homepage_sections table
CREATE TABLE IF NOT EXISTS public.homepage_sections (
  id TEXT PRIMARY KEY DEFAULT 'default',
  show_categories BOOLEAN NOT NULL DEFAULT true,
  show_new_arrivals BOOLEAN NOT NULL DEFAULT true,
  show_featured BOOLEAN NOT NULL DEFAULT true,
  categories_title TEXT NOT NULL DEFAULT 'Shop by Category',
  new_arrivals_title TEXT NOT NULL DEFAULT 'New Arrivals',
  featured_title TEXT NOT NULL DEFAULT 'Featured Products',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on homepage_sections
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

-- Create promo_banners table
CREATE TABLE IF NOT EXISTS public.promo_banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  banner_text TEXT NOT NULL,
  button_link TEXT NOT NULL,
  button_text TEXT NOT NULL DEFAULT 'Shop Now',
  display_order INTEGER NOT NULL DEFAULT 0,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on promo_banners
ALTER TABLE public.promo_banners ENABLE ROW LEVEL SECURITY;

-- Create footer_links table
CREATE TABLE IF NOT EXISTS public.footer_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Company',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on footer_links
ALTER TABLE public.footer_links ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Site Settings (Read: Public, Write: Admins/Super Admins/Content Admins)
CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin write site_settings" ON public.site_settings FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));

-- RLS Policies for Hero Slides
CREATE POLICY "Public read hero_slides" ON public.hero_slides FOR SELECT USING (true);
CREATE POLICY "Admin write hero_slides" ON public.hero_slides FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));

-- RLS Policies for Homepage Sections
CREATE POLICY "Public read homepage_sections" ON public.homepage_sections FOR SELECT USING (true);
CREATE POLICY "Admin write homepage_sections" ON public.homepage_sections FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));

-- RLS Policies for Promo Banners
CREATE POLICY "Public read promo_banners" ON public.promo_banners FOR SELECT USING (true);
CREATE POLICY "Admin write promo_banners" ON public.promo_banners FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));

-- RLS Policies for Footer Links
CREATE POLICY "Public read footer_links" ON public.footer_links FOR SELECT USING (true);
CREATE POLICY "Admin write footer_links" ON public.footer_links FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));

-- Create storage bucket site-assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for site-assets bucket
CREATE POLICY "Public read site-assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
CREATE POLICY "Admin upload site-assets" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-assets' AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));
CREATE POLICY "Admin update site-assets" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-assets' AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));
CREATE POLICY "Admin delete site-assets" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-assets' AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));
