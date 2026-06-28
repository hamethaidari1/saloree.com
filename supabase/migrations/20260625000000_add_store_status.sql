-- Add status column to stores table for draft/published publishing flow
ALTER TABLE public.stores
  ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published'));

-- Add category and location columns for onboarding
ALTER TABLE public.stores
  ADD COLUMN IF NOT EXISTS category TEXT,
  ADD COLUMN IF NOT EXISTS location TEXT;

-- Add updated_at column so settings can track changes
ALTER TABLE public.stores
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

COMMENT ON COLUMN public.stores.status IS 'draft = not publicly visible; published = live on storefront';
