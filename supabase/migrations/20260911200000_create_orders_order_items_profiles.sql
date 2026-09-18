-- =========================================================================
-- profiles, orders, order_items: create the schema the app code already
-- assumes exists, matching column names/types read directly from
-- checkout.tsx, routes/orders.tsx, seller.orders.tsx, admin.orders.tsx,
-- admin.users.tsx, seller.index.tsx, seller.analytics.tsx, and the
-- (previously aspirational) type definitions in
-- src/integrations/supabase/types.ts.
-- =========================================================================

-- 1. profiles — 1:1 with auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz not null default now()
);

-- Backfill a profile for every existing auth user before we repoint
-- user_roles at profiles (below) — otherwise that FK add would fail for
-- any user_roles row whose user doesn't have a profile yet.
insert into public.profiles (id, email, full_name)
select u.id, u.email, u.raw_user_meta_data ->> 'full_name'
from auth.users u
on conflict (id) do nothing;

-- 2. Auto-create a profile row on signup (register.tsx already passes
-- full_name via auth.signUp's options.data, which lands in
-- raw_user_meta_data — no client-side insert exists or is needed).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 3. admin.users.tsx embeds roles via
--    `user_roles!user_roles_user_profile_fk(role)` — repoint the FK from
--    auth.users to profiles, under that exact constraint name, now that
--    every user_roles.user_id is guaranteed to have a matching profile.
alter table public.user_roles drop constraint if exists user_roles_user_id_fkey;
alter table public.user_roles
  add constraint user_roles_user_profile_fk
  foreign key (user_id) references public.profiles(id) on delete cascade;

-- 4. orders — columns match exactly what checkout.tsx inserts and what
-- orders.tsx / seller.orders.tsx / admin.orders.tsx / seller.index.tsx /
-- seller.analytics.tsx select.
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null,
  store_id uuid not null,
  full_name text,
  phone text,
  email text,
  country text,
  city text,
  address text,
  notes text,
  subtotal numeric,
  total numeric,
  total_amount numeric not null default 0,
  shipping_address jsonb not null default '{}'::jsonb,
  status text not null default 'pending',
  paypal_order_id text,
  paypal_capture_id text,
  payment_provider text,
  payment_status text,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint orders_status_check
    check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  -- Explicit name: seller.orders.tsx and admin.orders.tsx both embed via
  -- `profiles!orders_customer_profile_fk(...)`, so this exact name is load-bearing.
  constraint orders_customer_profile_fk
    foreign key (customer_id) references public.profiles(id) on delete restrict,
  constraint orders_store_id_fkey
    foreign key (store_id) references public.stores(id) on delete restrict
);

create index if not exists orders_customer_id_idx on public.orders(customer_id);
create index if not exists orders_store_id_idx on public.orders(store_id);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

-- 5. order_items — columns match exactly what checkout.tsx inserts and
-- what the order-detail views select (quantity, unit_price, price, title,
-- products(title)).
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete restrict,
  store_id uuid references public.stores(id) on delete set null,
  title text,
  price numeric,
  quantity integer not null check (quantity > 0),
  total numeric,
  unit_price numeric not null,
  created_at timestamptz not null default now()
);

create index if not exists order_items_order_id_idx on public.order_items(order_id);
create index if not exists order_items_product_id_idx on public.order_items(product_id);

-- =========================================================================
-- Row Level Security
-- =========================================================================

-- profiles: a user reads/updates only their own row; admins read all.
alter table public.profiles enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  to authenticated
  using (id = auth.uid());

create policy "profiles_select_admin"
  on public.profiles for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "profiles_update_own"
  on public.profiles for update
  to authenticated
  using (id = auth.uid())
  with check (id = auth.uid());

-- orders: customer reads own orders; seller reads orders for their store;
-- admin reads/manages all; only the authenticated customer can insert
-- their own order; sellers and admins can update status.
alter table public.orders enable row level security;

create policy "orders_select_customer"
  on public.orders for select
  to authenticated
  using (customer_id = auth.uid());

create policy "orders_select_seller"
  on public.orders for select
  to authenticated
  using (
    exists (
      select 1 from public.stores s
      where s.id = orders.store_id and s.owner_id = auth.uid()
    )
  );

create policy "orders_select_admin"
  on public.orders for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create policy "orders_insert_own"
  on public.orders for insert
  to authenticated
  with check (customer_id = auth.uid());

create policy "orders_update_seller"
  on public.orders for update
  to authenticated
  using (
    exists (
      select 1 from public.stores s
      where s.id = orders.store_id and s.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.stores s
      where s.id = orders.store_id and s.owner_id = auth.uid()
    )
  );

create policy "orders_update_admin"
  on public.orders for update
  to authenticated
  using (public.has_role(auth.uid(), 'admin'))
  with check (public.has_role(auth.uid(), 'admin'));

-- order_items: readable by whoever can read the parent order (customer,
-- relevant seller, or admin); insertable at checkout alongside the order.
alter table public.order_items enable row level security;

create policy "order_items_select_via_order"
  on public.order_items for select
  to authenticated
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id
        and (
          o.customer_id = auth.uid()
          or exists (
            select 1 from public.stores s
            where s.id = o.store_id and s.owner_id = auth.uid()
          )
          or public.has_role(auth.uid(), 'admin')
        )
    )
  );

create policy "order_items_insert_via_order"
  on public.order_items for insert
  to authenticated
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_items.order_id and o.customer_id = auth.uid()
    )
  );
