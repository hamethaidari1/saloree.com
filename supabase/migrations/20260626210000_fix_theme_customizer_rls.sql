-- Ensure storage buckets exist and are public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'store-logos', 'store-logos', true, 10485760,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public           = true,
  file_size_limit  = 10485760;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'store-banners', 'store-banners', true, 10485760,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public           = true,
  file_size_limit  = 10485760;

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-assets', 'site-assets', true, 10485760,
  ARRAY['image/jpeg','image/png','image/webp','image/gif','image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public           = true,
  file_size_limit  = 10485760;

-- Ensure all Theme Customizer settings columns exist in store_theme_settings
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS announcement_text TEXT DEFAULT 'Free shipping on all orders over $50!';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS announcement_bg TEXT DEFAULT '#111827';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS announcement_text_color TEXT DEFAULT '#ffffff';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS show_announcement BOOLEAN DEFAULT true;
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS logo_url TEXT DEFAULT '';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS banner_url TEXT DEFAULT '';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS primary_color TEXT DEFAULT '#6366f1';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS bg_color TEXT DEFAULT '#ffffff';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS accent_color TEXT DEFAULT '#f1f5f9';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS button_color TEXT DEFAULT '#6366f1';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS font_family TEXT DEFAULT '''Inter'', sans-serif';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS homepage_layout TEXT DEFAULT 'standard';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS card_style TEXT DEFAULT 'shadow';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS hero_title TEXT DEFAULT 'Welcome to My Store';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS hero_subtitle TEXT DEFAULT 'Discover amazing products curated just for you';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS cta_text TEXT DEFAULT 'Shop Now';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS about_title TEXT DEFAULT 'About Our Store';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS about_text TEXT DEFAULT 'We are dedicated to providing the best products and service to our customers.';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS social_instagram TEXT DEFAULT '';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS social_twitter TEXT DEFAULT '';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS social_facebook TEXT DEFAULT '';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS social_tiktok TEXT DEFAULT '';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS footer_text TEXT DEFAULT '';
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}'::jsonb;

-- Notify PostgREST to reload schema cache
NOTIFY pgrst, 'reload schema';

-- Fix RLS policies for store_theme_installations
DROP POLICY IF EXISTS "Anyone reads store_theme_installations" ON public.store_theme_installations;
DROP POLICY IF EXISTS "Store owner manages store_theme_installations" ON public.store_theme_installations;
DROP POLICY IF EXISTS "Admins manage store_theme_installations" ON public.store_theme_installations;

CREATE POLICY "Anyone reads store_theme_installations" ON public.store_theme_installations
  FOR SELECT USING (true);

CREATE POLICY "Owner inserts store_theme_installations" ON public.store_theme_installations
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.stores s 
    WHERE s.id = store_theme_installations.store_id 
      AND s.owner_id = auth.uid()
  ));

CREATE POLICY "Owner updates store_theme_installations" ON public.store_theme_installations
  FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.stores s 
    WHERE s.id = store_theme_installations.store_id 
      AND s.owner_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.stores s 
    WHERE s.id = store_theme_installations.store_id 
      AND s.owner_id = auth.uid()
  ));

CREATE POLICY "Owner deletes store_theme_installations" ON public.store_theme_installations
  FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.stores s 
    WHERE s.id = store_theme_installations.store_id 
      AND s.owner_id = auth.uid()
  ));

CREATE POLICY "Admins manage store_theme_installations" ON public.store_theme_installations
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));


-- Fix RLS policies for store_theme_settings
DROP POLICY IF EXISTS "Anyone reads store_theme_settings" ON public.store_theme_settings;
DROP POLICY IF EXISTS "Store owner manages store_theme_settings" ON public.store_theme_settings;
DROP POLICY IF EXISTS "Admins manage store_theme_settings" ON public.store_theme_settings;

CREATE POLICY "Anyone reads store_theme_settings" ON public.store_theme_settings
  FOR SELECT USING (true);

CREATE POLICY "Owner inserts store_theme_settings" ON public.store_theme_settings
  FOR INSERT TO authenticated
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.store_theme_installations inst
    JOIN public.stores s ON s.id = inst.store_id
    WHERE inst.id = store_theme_settings.theme_installation_id 
      AND s.owner_id = auth.uid()
  ));

CREATE POLICY "Owner updates store_theme_settings" ON public.store_theme_settings
  FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.store_theme_installations inst
    JOIN public.stores s ON s.id = inst.store_id
    WHERE inst.id = store_theme_settings.theme_installation_id 
      AND s.owner_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.store_theme_installations inst
    JOIN public.stores s ON s.id = inst.store_id
    WHERE inst.id = store_theme_settings.theme_installation_id 
      AND s.owner_id = auth.uid()
  ));

CREATE POLICY "Owner deletes store_theme_settings" ON public.store_theme_settings
  FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.store_theme_installations inst
    JOIN public.stores s ON s.id = inst.store_id
    WHERE inst.id = store_theme_settings.theme_installation_id 
      AND s.owner_id = auth.uid()
  ));

CREATE POLICY "Admins manage store_theme_settings" ON public.store_theme_settings
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));


-- Fix storage policies for store-logos
DROP POLICY IF EXISTS "Public read store-logos" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload own store-logos" ON storage.objects;
DROP POLICY IF EXISTS "Auth update own store-logos" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete own store-logos" ON storage.objects;

CREATE POLICY "Public read store-logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'store-logos');

CREATE POLICY "Auth upload own store-logos" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'store-logos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Auth update own store-logos" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'store-logos' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'store-logos' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Auth delete own store-logos" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'store-logos' AND (storage.foldername(name))[1] = auth.uid()::text);


-- Fix storage policies for store-banners
DROP POLICY IF EXISTS "Public read store-banners" ON storage.objects;
DROP POLICY IF EXISTS "Auth upload own store-banners" ON storage.objects;
DROP POLICY IF EXISTS "Auth update own store-banners" ON storage.objects;
DROP POLICY IF EXISTS "Auth delete own store-banners" ON storage.objects;

CREATE POLICY "Public read store-banners" ON storage.objects
  FOR SELECT USING (bucket_id = 'store-banners');

CREATE POLICY "Auth upload own store-banners" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'store-banners' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Auth update own store-banners" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'store-banners' AND (storage.foldername(name))[1] = auth.uid()::text)
  WITH CHECK (bucket_id = 'store-banners' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE POLICY "Auth delete own store-banners" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'store-banners' AND (storage.foldername(name))[1] = auth.uid()::text);
