-- Provider-agnostic reference used to make webhook-driven order creation
-- idempotent (a given payment provider can redeliver the same "payment
-- succeeded" event more than once). Distinct from the PayPal-specific
-- paypal_order_id / paypal_capture_id columns, which are left in place
-- but are no longer written to now that PayPal has been replaced by
-- Stripe Checkout — this column holds the Stripe Checkout Session id
-- (and, going forward, would hold any future provider's own reference).
alter table public.orders
  add column if not exists provider_reference text;

create index if not exists idx_orders_provider_reference
  on public.orders(provider_reference);
