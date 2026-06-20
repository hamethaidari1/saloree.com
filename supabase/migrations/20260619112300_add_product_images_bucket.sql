-- Add position column to product_images table
ALTER TABLE public.product_images ADD COLUMN IF NOT EXISTS position INTEGER NOT NULL DEFAULT 0;

-- Create product-images bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Policies for product-images
CREATE POLICY "Public read product-images" ON storage.objects FOR SELECT USING (bucket_id = 'product-images');
CREATE POLICY "Auth upload own product-images" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id='product-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth update own product-images" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id='product-images' AND (storage.foldername(name))[1] = auth.uid()::text);
CREATE POLICY "Auth delete own product-images" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id='product-images' AND (storage.foldername(name))[1] = auth.uid()::text);
