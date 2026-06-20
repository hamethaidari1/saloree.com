alter table public.orders
  add column if not exists full_name text,
  add column if not exists phone text,
  add column if not exists email text,
  add column if not exists country text,
  add column if not exists city text,
  add column if not exists address text,
  add column if not exists notes text,
  add column if not exists subtotal numeric(10, 2),
  add column if not exists total numeric(10, 2);

alter table public.order_items
  add column if not exists store_id uuid,
  add column if not exists title text,
  add column if not exists price numeric(10, 2),
  add column if not exists total numeric(10, 2),
  add column if not exists created_at timestamptz not null default now();

update public.orders
set
  full_name = coalesce(full_name, shipping_address ->> 'name'),
  country = coalesce(country, shipping_address ->> 'country'),
  city = coalesce(city, shipping_address ->> 'city'),
  address = coalesce(address, shipping_address ->> 'line1'),
  notes = coalesce(notes, shipping_address ->> 'notes'),
  subtotal = coalesce(subtotal, total_amount),
  total = coalesce(total, total_amount)
where
  full_name is null
  or country is null
  or city is null
  or address is null
  or subtotal is null
  or total is null;

update public.order_items oi
set
  store_id = coalesce(oi.store_id, p.store_id),
  title = coalesce(oi.title, p.title),
  price = coalesce(oi.price, oi.unit_price),
  total = coalesce(oi.total, oi.unit_price * oi.quantity)
from public.products p
where p.id = oi.product_id;

create index if not exists idx_order_items_store_id on public.order_items(store_id);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
