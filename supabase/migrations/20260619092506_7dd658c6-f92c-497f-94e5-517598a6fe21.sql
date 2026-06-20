
CREATE POLICY "Public read media" ON storage.objects FOR SELECT USING (bucket_id = 'saloree-media');
CREATE POLICY "Auth upload own folder" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='saloree-media' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth update own folder" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id='saloree-media' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth delete own folder" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='saloree-media' AND (storage.foldername(name))[1] = auth.uid()::text);
