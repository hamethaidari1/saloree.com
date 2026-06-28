-- Prevent duplicate theme installations: a store can only install the same theme once.
-- We use CREATE UNIQUE INDEX ... IF NOT EXISTS so this is safe to run even if re-applied.

-- Drop the old non-unique index on (store_id) first if it is not there, otherwise this will coexist.
-- Add unique constraint on (store_id, theme_id) so the same theme_id cannot be installed twice per store.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes
    WHERE tablename = 'store_theme_installations'
      AND indexname = 'store_theme_installations_store_theme_unique'
  ) THEN
    CREATE UNIQUE INDEX store_theme_installations_store_theme_unique
      ON public.store_theme_installations(store_id, theme_id);
  END IF;
END $$;
