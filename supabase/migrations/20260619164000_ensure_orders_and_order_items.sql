-- 1. Create orders table if missing
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  store_id uuid not null references public.stores(id) on delete cascade,
  full_name text,
  phone text,
  email text,
  country text,
  city text,
  address text,
  notes text,
  subtotal numeric(10, 2),
  total numeric(10, 2),
  total_amount numeric(10, 2) not null,
  shipping_address jsonb,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);

-- 2. Create order_items table if missing
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete restrict,
  store_id uuid references public.stores(id) on delete cascade,
  title text,
  price numeric(10, 2),
  quantity integer not null check (quantity > 0),
  total numeric(10, 2),
  unit_price numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

-- 3. Enable RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- 4. Drop existing policies to avoid conflicts
drop policy if exists "Customer sees own orders" on public.orders;
drop policy if exists "Seller sees orders for own store" on public.orders;
drop policy if exists "Customer inserts own order" on public.orders;
drop policy if exists "Seller updates order status" on public.orders;
drop policy if exists "Admins manage orders" on public.orders;

drop policy if exists "View items of accessible order" on public.order_items;
drop policy if exists "Insert items for own order" on public.order_items;

-- 5. Create policies for public.orders
create policy "Customer sees own orders" on public.orders
  for select using (auth.uid() = customer_id);

create policy "Seller sees orders for own store" on public.orders
  for select using (exists (
    select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid()
  ));

create policy "Customer inserts own order" on public.orders
  for insert with check (auth.uid() = customer_id);

create policy "Seller updates order status" on public.orders
  for update using (exists (
    select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid()
  )) with check (exists (
    select 1 from public.stores s where s.id = store_id and s.owner_id = auth.uid()
  ));

create policy "Admins manage orders" on public.orders
  for all using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- 6. Create policies for public.order_items
create policy "View items of accessible order" on public.order_items
  for select using (exists (
    select 1 from public.orders o where o.id = order_id and (
      o.customer_id = auth.uid() or
      exists (select 1 from public.stores s where s.id = o.store_id and s.owner_id = auth.uid()) or
      public.has_role(auth.uid(), 'admin')
    )
  ));

create policy "Insert items for own order" on public.order_items
  for insert with check (exists (
    select 1 from public.orders o where o.id = order_id and o.customer_id = auth.uid()
  ));

-- 7. Ensure grants are correct
grant select, insert, update on public.orders to authenticated;
grant all on public.orders to service_role;
grant select, insert on public.order_items to authenticated;
grant all on public.order_items to service_role;
