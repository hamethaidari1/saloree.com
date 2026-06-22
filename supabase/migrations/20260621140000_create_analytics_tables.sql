-- Analytics Events Table (tracks all storefront user actions)
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL, -- 'pageview' | 'product_view' | 'add_to_cart' | 'checkout_start' | 'purchase'
  session_id TEXT,
  visitor_id TEXT,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  order_id UUID REFERENCES public.orders(id) ON DELETE SET NULL,
  revenue NUMERIC(10,2),
  country TEXT,
  device TEXT, -- 'desktop' | 'mobile' | 'tablet'
  traffic_source TEXT, -- 'direct' | 'organic' | 'social' | 'email' | 'paid'
  page_path TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS analytics_events_store_idx ON public.analytics_events(store_id);
CREATE INDEX IF NOT EXISTS analytics_events_created_idx ON public.analytics_events(created_at);
CREATE INDEX IF NOT EXISTS analytics_events_type_idx ON public.analytics_events(event_type);

ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Store owner reads own analytics_events" ON public.analytics_events
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Anyone inserts analytics_events" ON public.analytics_events
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage analytics_events" ON public.analytics_events
  FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT, INSERT ON public.analytics_events TO anon, authenticated;
GRANT ALL ON public.analytics_events TO service_role;

-- Daily Sales Aggregates
CREATE TABLE IF NOT EXISTS public.daily_sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  gross_revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  net_revenue NUMERIC(12,2) NOT NULL DEFAULT 0,
  orders_count INTEGER NOT NULL DEFAULT 0,
  units_sold INTEGER NOT NULL DEFAULT 0,
  refunds_amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  platform_fees NUMERIC(12,2) NOT NULL DEFAULT 0,
  visitors INTEGER NOT NULL DEFAULT 0,
  new_customers INTEGER NOT NULL DEFAULT 0,
  returning_customers INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(store_id, date)
);
CREATE INDEX IF NOT EXISTS daily_sales_store_date_idx ON public.daily_sales(store_id, date);
ALTER TABLE public.daily_sales ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Store owner manages daily_sales" ON public.daily_sales
  FOR ALL USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Admins manage daily_sales" ON public.daily_sales FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT, INSERT, UPDATE ON public.daily_sales TO authenticated;
GRANT ALL ON public.daily_sales TO service_role;

-- Traffic Statistics
CREATE TABLE IF NOT EXISTS public.traffic_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  source TEXT NOT NULL, -- 'direct' | 'organic' | 'social' | 'email' | 'paid' | 'referral'
  device TEXT NOT NULL, -- 'desktop' | 'mobile' | 'tablet'
  country TEXT,
  visitors INTEGER NOT NULL DEFAULT 0,
  sessions INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(store_id, date, source, device, country)
);
ALTER TABLE public.traffic_statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Store owner manages traffic_statistics" ON public.traffic_statistics
  FOR ALL USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Admins manage traffic_statistics" ON public.traffic_statistics FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT, INSERT, UPDATE ON public.traffic_statistics TO authenticated;
GRANT ALL ON public.traffic_statistics TO service_role;

-- Customer Statistics
CREATE TABLE IF NOT EXISTS public.customer_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  new_customers INTEGER NOT NULL DEFAULT 0,
  returning_customers INTEGER NOT NULL DEFAULT 0,
  total_customers INTEGER NOT NULL DEFAULT 0,
  customer_lifetime_value NUMERIC(10,2) NOT NULL DEFAULT 0,
  repeat_purchase_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(store_id, date)
);
ALTER TABLE public.customer_statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Store owner manages customer_statistics" ON public.customer_statistics
  FOR ALL USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Admins manage customer_statistics" ON public.customer_statistics FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT, INSERT, UPDATE ON public.customer_statistics TO authenticated;
GRANT ALL ON public.customer_statistics TO service_role;

-- Product Statistics
CREATE TABLE IF NOT EXISTS public.product_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID NOT NULL REFERENCES public.stores(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER NOT NULL DEFAULT 0,
  add_to_cart INTEGER NOT NULL DEFAULT 0,
  units_sold INTEGER NOT NULL DEFAULT 0,
  revenue NUMERIC(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(store_id, product_id, date)
);
ALTER TABLE public.product_statistics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Store owner manages product_statistics" ON public.product_statistics
  FOR ALL USING (EXISTS (SELECT 1 FROM public.stores s WHERE s.id = store_id AND s.owner_id = auth.uid()));
CREATE POLICY "Admins manage product_statistics" ON public.product_statistics FOR ALL USING (public.has_role(auth.uid(),'admin'));
GRANT SELECT, INSERT, UPDATE ON public.product_statistics TO authenticated;
GRANT ALL ON public.product_statistics TO service_role;
