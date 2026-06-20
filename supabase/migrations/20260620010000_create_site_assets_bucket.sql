-- Create site-assets bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for site-assets
CREATE POLICY "Public read site-assets" ON storage.objects FOR SELECT USING (bucket_id = 'site-assets');
CREATE POLICY "Admin upload site-assets" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='site-assets' AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));
CREATE POLICY "Admin update site-assets" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id='site-assets' AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));
CREATE POLICY "Admin delete site-assets" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='site-assets' AND EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role IN ('admin', 'super_admin', 'content_admin')));
