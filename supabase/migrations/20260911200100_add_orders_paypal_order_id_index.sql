-- Fast lookup / duplicate-capture check for paypal.ts's
-- capturePayPalOrderFn, which queries orders by paypal_order_id.
create index if not exists idx_orders_paypal_order_id on public.orders(paypal_order_id);
