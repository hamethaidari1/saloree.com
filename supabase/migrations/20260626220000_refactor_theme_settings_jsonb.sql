-- Migration: Phase 1 Theme Customizer Refactor
-- Adds settings JSONB (if missing) and migrates existing optional columns into it.
-- Does NOT drop old columns yet for backward compatibility.

-- 1. Ensure settings column exists
ALTER TABLE public.store_theme_settings ADD COLUMN IF NOT EXISTS settings JSONB DEFAULT '{}'::jsonb;

-- 2. Migrate existing data into the settings column
UPDATE public.store_theme_settings
SET settings = settings || jsonb_strip_nulls(jsonb_build_object(
    'announcement_text', announcement_text,
    'announcement_bg', announcement_bg,
    'announcement_text_color', announcement_text_color,
    'show_announcement', show_announcement,
    'accent_color', accent_color,
    'button_color', button_color,
    'font_family', font_family,
    'homepage_layout', homepage_layout,
    'card_style', card_style,
    'hero_title', hero_title,
    'hero_subtitle', hero_subtitle,
    'cta_text', cta_text,
    'about_title', about_title,
    'about_text', about_text,
    'social_instagram', social_instagram,
    'social_twitter', social_twitter,
    'social_facebook', social_facebook,
    'social_tiktok', social_tiktok,
    'footer_text', footer_text
));

-- 3. Fix RLS policies to be robust
DROP POLICY IF EXISTS "Anyone reads store_theme_settings" ON public.store_theme_settings;
DROP POLICY IF EXISTS "Owner inserts store_theme_settings" ON public.store_theme_settings;
DROP POLICY IF EXISTS "Owner updates store_theme_settings" ON public.store_theme_settings;
DROP POLICY IF EXISTS "Owner deletes store_theme_settings" ON public.store_theme_settings;

CREATE POLICY "Anyone reads store_theme_settings" ON public.store_theme_settings
    FOR SELECT USING (true);

CREATE POLICY "Owner inserts store_theme_settings" ON public.store_theme_settings
    FOR INSERT WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.store_theme_installations inst
            JOIN public.stores s ON s.id = inst.store_id
            WHERE inst.id = store_theme_settings.theme_installation_id 
            AND s.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owner updates store_theme_settings" ON public.store_theme_settings
    FOR UPDATE USING (
        EXISTS (
            SELECT 1 FROM public.store_theme_installations inst
            JOIN public.stores s ON s.id = inst.store_id
            WHERE inst.id = store_theme_settings.theme_installation_id 
            AND s.owner_id = auth.uid()
        )
    ) WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.store_theme_installations inst
            JOIN public.stores s ON s.id = inst.store_id
            WHERE inst.id = store_theme_settings.theme_installation_id 
            AND s.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owner deletes store_theme_settings" ON public.store_theme_settings
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM public.store_theme_installations inst
            JOIN public.stores s ON s.id = inst.store_id
            WHERE inst.id = store_theme_settings.theme_installation_id 
            AND s.owner_id = auth.uid()
        )
    );

-- 4. Reload PostgREST schema cache
NOTIFY pgrst, 'reload schema';
