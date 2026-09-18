-- products had RLS enabled with SELECT/INSERT/DELETE policies for sellers
-- but no UPDATE policy at all. With RLS enabled and no matching policy,
-- Postgres silently matches zero rows for an UPDATE rather than erroring —
-- so seller.products.tsx's edit form (e.g. flipping a product from "draft"
-- to "active") appeared to succeed (no error returned) while actually
-- changing nothing, and the product reverted to its real, unchanged status
-- on the next fetch/refresh.
create policy "Sellers can update own products"
  on public.products
  for update
  using (
    exists (
      select 1 from public.stores
      where stores.id = products.store_id and stores.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.stores
      where stores.id = products.store_id and stores.owner_id = auth.uid()
    )
  );
