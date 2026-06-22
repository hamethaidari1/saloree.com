-- Create store themes table
CREATE TABLE public.store_themes (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  preview_image_url TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  primary_color TEXT NOT NULL,
  bg_color TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  button_color TEXT NOT NULL,
  font_family TEXT NOT NULL,
  gradient TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed built-in Shopify-style themes
INSERT INTO public.store_themes (id, name, category, description, price, primary_color, bg_color, accent_color, button_color, font_family, gradient, tags) VALUES
('saloree-minimal', 'Saloree Minimal', 'General', 'Clean white layout with focused typography. Perfect for any niche.', 0.00, '#6366f1', '#ffffff', '#f1f5f9', '#6366f1', '''Inter'', sans-serif', 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)', ARRAY['clean', 'modern', 'versatile']),
('saloree-fashion', 'Saloree Fashion Store', 'Fashion', 'Bold editorial look with large hero imagery. Made for style brands.', 0.00, '#ec4899', '#fdf2f8', '#fce7f3', '#ec4899', '''Playfair Display'', serif', 'linear-gradient(135deg,#ec4899 0%,#f43f5e 100%)', ARRAY['elegant', 'fashion', 'lifestyle']),
('saloree-electronics', 'Saloree Electronics Store', 'Electronics', 'Dark, techy layout with blue accents. Ideal for gadgets and tech.', 0.00, '#3b82f6', '#0f172a', '#1e293b', '#3b82f6', '''Roboto'', sans-serif', 'linear-gradient(135deg,#3b82f6 0%,#06b6d4 100%)', ARRAY['dark', 'tech', 'modern']),
('saloree-beauty', 'Saloree Beauty Store', 'Beauty', 'Soft pink tones with luxurious feel. Great for cosmetics and skincare.', 0.00, '#db2777', '#fff7ed', '#fde8d8', '#db2777', '''Lora'', serif', 'linear-gradient(135deg,#db2777 0%,#f97316 100%)', ARRAY['soft', 'luxury', 'feminine']),
('saloree-luxury', 'Saloree Luxury', 'Luxury', 'Gold and black for premium brands. Exudes sophistication and class.', 0.00, '#ca8a04', '#0a0a0a', '#1a1a1a', '#ca8a04', '''Cormorant Garamond'', serif', 'linear-gradient(135deg,#ca8a04 0%,#d4af37 100%)', ARRAY['gold', 'premium', 'dark']),
('saloree-home', 'Saloree Home & Kitchen', 'Home', 'Warm earthy palette. Great for furniture, decor and home goods.', 0.00, '#d97706', '#fefce8', '#fef3c7', '#d97706', '''Merriweather'', serif', 'linear-gradient(135deg,#d97706 0%,#16a34a 100%)', ARRAY['warm', 'earthy', 'cozy']),
('saloree-digital', 'Saloree Digital Products', 'Digital', 'Futuristic neon gradient feel for software, courses and downloads.', 0.00, '#7c3aed', '#0f0a1e', '#1e1040', '#7c3aed', '''Space Grotesk'', sans-serif', 'linear-gradient(135deg,#7c3aed 0%,#2563eb 100%)', ARRAY['dark', 'neon', 'digital']),
('saloree-classic', 'Saloree Classic Marketplace', 'Marketplace', 'Multi-vendor inspired layout with bold cards and category strips.', 0.00, '#0ea5e9', '#f8fafc', '#e0f2fe', '#0ea5e9', '''Outfit'', sans-serif', 'linear-gradient(135deg,#0ea5e9 0%,#6366f1 100%)', ARRAY['colorful', 'grid', 'marketplace'])
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  category = EXCLUDED.category,
  description = EXCLUDED.description,
  primary_color = EXCLUDED.primary_color,
  bg_color = EXCLUDED.bg_color,
  accent_color = EXCLUDED.accent_color,
  button_color = EXCLUDED.button_color,
  font_family = EXCLUDED.font_family,
  gradient = EXCLUDED.gradient,
  tags = EXCLUDED.tags;

-- Enable RLS for store_themes
ALTER TABLE public.store_themes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads store_themes" ON public.store_themes FOR SELECT USING (true);
CREATE POLICY "Admins manage store_themes" ON public.store_themes FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT ON public.store_themes TO anon, authenticated;
GRANT ALL ON public.store_themes TO service_role;

-- Create store theme installations table
CREATE TABLE public.store_theme_installations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  theme_id TEXT REFERENCES public.store_themes(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enforce at most one published theme per store at database level
CREATE UNIQUE INDEX store_theme_installations_published_idx ON public.store_theme_installations(store_id) WHERE (is_published = true);

-- Enable RLS for store_theme_installations
ALTER TABLE public.store_theme_installations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads store_theme_installations" ON public.store_theme_installations FOR SELECT USING (true);
CREATE POLICY "Store owner manages store_theme_installations" ON public.store_theme_installations FOR ALL
  USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Admins manage store_theme_installations" ON public.store_theme_installations FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT ON public.store_theme_installations TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.store_theme_installations TO authenticated;
GRANT ALL ON public.store_theme_installations TO service_role;

-- Create store theme settings table
CREATE TABLE public.store_theme_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_installation_id UUID NOT NULL REFERENCES public.store_theme_installations(id) ON DELETE CASCADE UNIQUE,
  announcement_text TEXT DEFAULT '',
  announcement_bg TEXT DEFAULT '#111827',
  announcement_text_color TEXT DEFAULT '#ffffff',
  show_announcement BOOLEAN DEFAULT true,
  logo_url TEXT,
  banner_url TEXT,
  primary_color TEXT,
  bg_color TEXT,
  accent_color TEXT,
  button_color TEXT,
  font_family TEXT,
  homepage_layout TEXT,
  card_style TEXT,
  hero_title TEXT,
  hero_subtitle TEXT,
  cta_text TEXT,
  about_title TEXT DEFAULT 'About Our Store',
  about_text TEXT DEFAULT 'We are dedicated to providing the best products and service to our customers.',
  social_instagram TEXT,
  social_twitter TEXT,
  social_facebook TEXT,
  social_tiktok TEXT,
  footer_text TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for store_theme_settings
ALTER TABLE public.store_theme_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads store_theme_settings" ON public.store_theme_settings FOR SELECT USING (true);
CREATE POLICY "Store owner manages store_theme_settings" ON public.store_theme_settings FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.store_theme_installations inst
    JOIN public.stores s ON s.id = inst.store_id
    WHERE inst.id = theme_installation_id AND s.owner_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.store_theme_installations inst
    JOIN public.stores s ON s.id = inst.store_id
    WHERE inst.id = theme_installation_id AND s.owner_id = auth.uid()
  ));
CREATE POLICY "Admins manage store_theme_settings" ON public.store_theme_settings FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT ON public.store_theme_settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.store_theme_settings TO authenticated;
GRANT ALL ON public.store_theme_settings TO service_role;

-- Create store pages table
CREATE TABLE public.store_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  content TEXT,
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(store_id, slug)
);

-- Enable RLS for store_pages
ALTER TABLE public.store_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published store_pages" ON public.store_pages FOR SELECT 
  USING (is_published = true OR EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Store owner manages store_pages" ON public.store_pages FOR ALL
  USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Admins manage store_pages" ON public.store_pages FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT ON public.store_pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.store_pages TO authenticated;
GRANT ALL ON public.store_pages TO service_role;

-- Create store navigation items table
CREATE TABLE public.store_navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  menu_name TEXT NOT NULL DEFAULT 'main-menu',
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for store_navigation_items
ALTER TABLE public.store_navigation_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads store_navigation_items" ON public.store_navigation_items FOR SELECT USING (true);
CREATE POLICY "Store owner manages store_navigation_items" ON public.store_navigation_items FOR ALL
  USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Admins manage store_navigation_items" ON public.store_navigation_items FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT ON public.store_navigation_items TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.store_navigation_items TO authenticated;
GRANT ALL ON public.store_navigation_items TO service_role;
