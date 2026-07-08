-- Fix RLS policies for store_theme_settings
DROP POLICY IF EXISTS "Anyone reads store_theme_settings" ON public.store_theme_settings;
DROP POLICY IF EXISTS "Owner inserts store_theme_settings" ON public.store_theme_settings;
DROP POLICY IF EXISTS "Owner updates store_theme_settings" ON public.store_theme_settings;
DROP POLICY IF EXISTS "Owner deletes store_theme_settings" ON public.store_theme_settings;

CREATE POLICY "Anyone reads store_theme_settings" ON public.store_theme_settings
    FOR SELECT USING (true);

CREATE POLICY "Owner inserts store_theme_settings" ON public.store_theme_settings
    FOR INSERT TO authenticated
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.store_theme_installations inst
            JOIN public.stores s ON s.id = inst.store_id
            WHERE inst.id = theme_installation_id 
            AND s.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owner updates store_theme_settings" ON public.store_theme_settings
    FOR UPDATE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.store_theme_installations inst
            JOIN public.stores s ON s.id = inst.store_id
            WHERE inst.id = theme_installation_id 
            AND s.owner_id = auth.uid()
        )
    ) WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.store_theme_installations inst
            JOIN public.stores s ON s.id = inst.store_id
            WHERE inst.id = theme_installation_id 
            AND s.owner_id = auth.uid()
        )
    );

CREATE POLICY "Owner deletes store_theme_settings" ON public.store_theme_settings
    FOR DELETE TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM public.store_theme_installations inst
            JOIN public.stores s ON s.id = inst.store_id
            WHERE inst.id = theme_installation_id 
            AND s.owner_id = auth.uid()
        )
    );
