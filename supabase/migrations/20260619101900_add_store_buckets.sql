-- Create buckets if they don't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('store-logos', 'store-logos', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public)
VALUES ('store-banners', 'store-banners', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for store-logos
CREATE POLICY "Public read store-logos" ON storage.objects FOR SELECT USING (bucket_id = 'store-logos');
CREATE POLICY "Auth upload own store-logos" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='store-logos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth update own store-logos" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id='store-logos' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth delete own store-logos" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='store-logos' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Policies for store-banners
CREATE POLICY "Public read store-banners" ON storage.objects FOR SELECT USING (bucket_id = 'store-banners');
CREATE POLICY "Auth upload own store-banners" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='store-banners' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth update own store-banners" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id='store-banners' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth delete own store-banners" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='store-banners' AND (storage.foldername(name))[1] = auth.uid()::text);
