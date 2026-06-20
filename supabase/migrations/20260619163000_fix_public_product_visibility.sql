-- Ensure RLS is enabled
alter table public.products enable row level security;
alter table public.stores enable row level security;
alter table public.categories enable row level security;

-- Drop existing public read policies
drop policy if exists "Anyone reads products" on public.products;
drop policy if exists "Anyone reads stores" on public.stores;
drop policy if exists "Anyone reads categories" on public.categories;

-- Create public read policies
create policy "Anyone reads products" on public.products for select using (true);
create policy "Anyone reads stores" on public.stores for select using (true);
create policy "Anyone reads categories" on public.categories for select using (true);
