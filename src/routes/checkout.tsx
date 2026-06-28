import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useCart } from "@/lib/cart";
import { supabase } from "@/integrations/supabase/client";
import { useLocale } from "@/lib/locale";
import { t } from "@/lib/i18n";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { createPayPalOrderFn, capturePayPalOrderFn } from "@/lib/paypal";
import { 
  Lock, ShieldCheck, CheckCircle, ChevronRight, ArrowLeft, 
  HelpCircle, User, Mail, Phone, MapPin, Building2, Map, FileText,
  CreditCard, Info, AlertCircle, ShoppingCart
} from "lucide-react";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Saloree" }] }),
  component: Checkout,
});

function Checkout() {
  const { user } = useAuth();
  const { items, clear } = useCart();
  const { language, formatPrice } = useLocale();
  const navigate = useNavigate();
  
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: user?.email ?? "",
    country: "",
    city: "",
    address: "",
    notes: "",
  });
  
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);

  // Compute total dynamically in USD
  const subtotalUSD = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingUSD = 0; // Free shipping for now
  const totalUSD = subtotalUSD + shippingUSD;

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/5">
          <Lock className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Secure Checkout</h1>
        <p className="mt-3 text-base text-slate-600">Sign in or create an account to proceed with your order securely.</p>
        <div className="mt-8 flex justify-center gap-4">
          <Button asChild className="h-12 px-8 font-semibold text-base">
            <Link to="/login">{t("login", language)}</Link>
          </Button>
          <Button asChild variant="outline" className="h-12 px-8 font-semibold text-base border-slate-300">
            <Link to="/register">{t("sign_up", language)}</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
          <ShoppingCart className="h-10 w-10 text-slate-400" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="mt-3 text-base text-slate-600 mb-8">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Button asChild className="h-12 px-8 font-semibold text-base">
          <Link to="/marketplace">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  const createOrderInDatabase = async (paypalOrderId: string, paypalCaptureId: string) => {
    const itemsByStore: Record<string, typeof items> = {};
    for (const item of items) {
      if (!item.store_id) throw new Error(`Cart item "${item.title}" is missing store information.`);
      if (!itemsByStore[item.store_id]) itemsByStore[item.store_id] = [];
      itemsByStore[item.store_id].push(item);
    }

    const storeIds = Object.keys(itemsByStore);
    if (storeIds.length === 0) throw new Error("Your cart is empty.");

    for (const storeId of storeIds) {
      const storeItems = itemsByStore[storeId];
      const storeSubtotal = storeItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const orderPayload = {
        customer_id: user.id,
        store_id: storeId,
        full_name: form.full_name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        country: form.country.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        notes: form.notes.trim() || null,
        subtotal: storeSubtotal,
        total: storeSubtotal,
        total_amount: storeSubtotal,
        shipping_address: {
          full_name: form.full_name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          country: form.country.trim(),
          city: form.city.trim(),
          address: form.address.trim(),
          notes: form.notes.trim(),
        },
        status: "processing", 
        paypal_order_id: paypalOrderId,
        paypal_capture_id: paypalCaptureId,
        payment_provider: "paypal",
        payment_status: "paid",
        paid_at: new Date().toISOString(),
      };

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert(orderPayload)
        .select("id")
        .single();

      if (orderError) {
        console.error("[checkout-order-creation-failed]", orderError);
        throw new Error(`Failed to create order. Details: ${orderError.message}`);
      }

      const orderItemsPayload = storeItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        store_id: item.store_id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
        unit_price: item.price,
      }));

      const { error: orderItemsError } = await supabase.from("order_items").insert(orderItemsPayload);

      if (orderItemsError) {
        console.error("[checkout-order-items-creation-failed]", orderItemsError);
        throw new Error(`Failed to create items. Details: ${orderItemsError.message}`);
      }
    }
  };

  const getMissingFields = () => {
    const required = ["full_name", "email", "country", "city", "address", "phone"];
    return required.filter((field) => !form[field as keyof typeof form]?.trim());
  };

  const isFormValid = () => getMissingFields().length === 0;

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const initialOptions = {
    clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture",
  };

  // Date estimation
  const today = new Date();
  const deliveryStart = new Date(today);
  deliveryStart.setDate(today.getDate() + 3);
  const deliveryEnd = new Date(today);
  deliveryEnd.setDate(today.getDate() + 5);

  const deliveryRange = `${deliveryStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${deliveryEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

  return (
    <div className="min-h-screen bg-[#F7F9FA] pb-24">
      {/* Checkout Header / Breadcrumbs */}
      <header className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Link to="/cart" className="hover:text-slate-900 transition-colors flex items-center gap-1">
              Cart
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-slate-900">Details & Payment</span>
            <ChevronRight className="h-4 w-4 text-slate-300" />
            <span className="text-slate-400">Confirmation</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-600 text-sm font-semibold">
            <ShieldCheck className="h-5 w-5" />
            <span className="hidden sm:inline tracking-wide uppercase text-xs">Secure Checkout</span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <Link to="/cart" className="text-slate-500 hover:text-slate-900 flex items-center gap-1.5 text-sm font-semibold transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Return to cart
          </Link>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_420px] items-start">
          
          {/* LEFT COLUMN - DETAILS */}
          <div className="space-y-8">
            
            {/* Billing / Shipping Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <div className="mb-8 border-b border-slate-100 pb-5">
                <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                  <User className="h-6 w-6 text-slate-400" />
                  Shipping & Billing Details
                </h2>
                <p className="text-sm text-slate-500 mt-2">Please enter your delivery information.</p>
              </div>

              <div className="grid gap-6">
                {/* Full Name & Phone */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        value={form.full_name}
                        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                        onBlur={() => handleBlur("full_name")}
                        className={`h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
                          touched.full_name && !form.full_name ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {touched.full_name && !form.full_name && <p className="text-xs text-red-500 font-medium">Full name is required.</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        required
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        onBlur={() => handleBlur("phone")}
                        className={`h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
                          touched.phone && !form.phone ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {touched.phone && !form.phone && <p className="text-xs text-red-500 font-medium">Phone number is required.</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      required
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      onBlur={() => handleBlur("email")}
                      className={`h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
                        touched.email && !form.email ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {touched.email && !form.email && <p className="text-xs text-red-500 font-medium">Valid email is required for order updates.</p>}
                </div>

                {/* Country & City */}
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                      Country / Region <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <Map className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="United States"
                        value={form.country}
                        onChange={(e) => setForm({ ...form, country: e.target.value })}
                        onBlur={() => handleBlur("country")}
                        className={`h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
                          touched.country && !form.country ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {touched.country && !form.country && <p className="text-xs text-red-500 font-medium">Country is required.</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        required
                        type="text"
                        placeholder="New York"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        onBlur={() => handleBlur("city")}
                        className={`h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
                          touched.city && !form.city ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {touched.city && !form.city && <p className="text-xs text-red-500 font-medium">City is required.</p>}
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="123 Main St, Apt 4B"
                      value={form.address}
                      onChange={(e) => setForm({ ...form, address: e.target.value })}
                      onBlur={() => handleBlur("address")}
                      className={`h-12 w-full rounded-lg border bg-slate-50/50 pl-11 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
                        touched.address && !form.address ? "border-red-400 focus:border-red-500 focus:ring-red-500/20 bg-red-50/50" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {touched.address && !form.address && <p className="text-xs text-red-500 font-medium">Street address is required.</p>}
                </div>

                {/* Notes */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-1">
                    Delivery Notes <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-4 left-3.5 flex items-start pointer-events-none">
                      <FileText className="h-5 w-5 text-slate-400" />
                    </div>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50/50 pl-11 pr-4 py-3.5 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 resize-none"
                      placeholder="Any special instructions for delivery..."
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-slate-500 pb-8">
              <HelpCircle className="h-4 w-4" />
              Need help? <a href="#" className="text-slate-900 hover:underline font-semibold">Contact Customer Support</a>
            </div>

          </div>

          {/* RIGHT COLUMN - STICKY ORDER SUMMARY & PAYMENT */}
          <aside className="lg:sticky lg:top-8 h-fit space-y-6">
            
            <div className="rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
              <div className="bg-white border-b border-slate-100 px-6 sm:px-8 py-5">
                <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>
              </div>
              
              <div className="px-6 sm:px-8 py-6">
                <ul className="space-y-5 mb-8">
                  {items.map((it) => (
                    <li key={it.product_id} className="flex items-start gap-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center">
                        {it.featured_image ? (
                          <img src={it.featured_image} alt={it.title} className="h-full w-full object-cover" />
                        ) : (
                          <ShoppingCart className="h-6 w-6 text-slate-300" />
                        )}
                      </div>
                      <div className="flex flex-1 flex-col min-h-[4rem] justify-center">
                        <div className="flex justify-between gap-4">
                          <span className="text-sm font-semibold text-slate-900 line-clamp-2 leading-snug">{it.title}</span>
                          <span className="text-sm font-bold text-slate-900 whitespace-nowrap">{formatPrice(it.price * it.quantity)}</span>
                        </div>
                        <div className="mt-1 text-sm text-slate-500">
                          Qty: {it.quantity}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="space-y-3.5 border-t border-slate-100 pt-6 text-sm text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-900">{formatPrice(subtotalUSD)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-emerald-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span className="text-slate-400">Calculated at payment</span>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between border-t border-slate-200 pt-6">
                  <span className="text-lg font-bold text-slate-900">Total</span>
                  <div className="text-right">
                    <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{formatPrice(totalUSD)}</span>
                    <p className="text-[11px] text-slate-500 uppercase font-bold tracking-widest mt-1">USD</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#F7F9FA] px-6 sm:px-8 py-5 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 shrink-0">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="text-sm">
                    <p className="font-bold text-slate-900">Estimated Delivery</p>
                    <p className="text-slate-600">{deliveryRange}</p>
                  </div>
                </div>
              </div>

              {/* INTEGRATED PAYMENT SECTION */}
              <div className="border-t border-slate-200 bg-white px-6 sm:px-8 py-6">
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-slate-400" />
                    Payment
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-600">
                    <Lock className="h-3.5 w-3.5" />
                    <span className="text-[11px] font-bold uppercase tracking-wider">Encrypted</span>
                  </div>
                </div>

                {!isFormValid() ? (
                  <div className="rounded-lg border-2 border-dashed border-slate-200 bg-[#F7F9FA] p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-200/50">
                      <Lock className="h-5 w-5 text-slate-500" />
                    </div>
                    <h4 className="text-[15px] font-bold text-slate-900">Payment Locked</h4>
                    <p className="mt-1.5 text-sm text-slate-600 max-w-[280px] mx-auto leading-relaxed">
                      Complete billing details to unlock secure PayPal payment.
                    </p>
                    {Object.keys(touched).length > 0 && getMissingFields().length > 0 && (
                      <div className="mt-4 flex items-start gap-2.5 text-left bg-red-50 text-red-700 p-3.5 rounded-md text-sm border border-red-100">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold">Missing required fields:</strong>
                          <ul className="list-disc pl-4 mt-1.5 space-y-0.5 opacity-90">
                            {getMissingFields().map(f => (
                              <li key={f}>{f.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="rounded-lg border border-slate-200 p-5 bg-[#F7F9FA]">
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[13px] font-bold text-slate-900 uppercase tracking-wide">Pay Securely</span>
                        </div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-90" />
                      </div>
                      
                      <div className="min-h-[150px]">
                        <PayPalScriptProvider options={initialOptions}>
                          <PayPalButtons
                            style={{ layout: "vertical", shape: "rect", color: "gold" }}
                            createOrder={async () => {
                              try {
                                const payload = items.map(item => ({
                                  productId: item.product_id,
                                  quantity: item.quantity
                                }));
                                const { orderId } = await createPayPalOrderFn({ data: payload });
                                return orderId;
                              } catch (error) {
                                console.error("Create order failed", error);
                                toast.error("Could not initiate PayPal checkout");
                                throw error;
                              }
                            }}
                            onApprove={async (data, actions) => {
                              setLoading(true);
                              try {
                                const result = await capturePayPalOrderFn({ data: data.orderID });
                                if (result.success && result.captureId) {
                                  await createOrderInDatabase(data.orderID, result.captureId);
                                  clear();
                                  toast.success(t("order_success", language));
                                  navigate({ to: "/orders" });
                                } else {
                                  toast.error("Payment was not completed successfully.");
                                }
                              } catch (error) {
                                console.error("Capture order failed", error);
                                toast.error("Payment capture failed. Please contact support.");
                              } finally {
                                setLoading(false);
                              }
                            }}
                            onCancel={() => {
                              toast.info("Payment cancelled. You can try again when ready.");
                            }}
                            onError={(err) => {
                              console.error("PayPal Error:", err);
                              toast.error("An error occurred with PayPal.");
                            }}
                          />
                        </PayPalScriptProvider>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Trust Badges under the entire card */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center justify-center text-center gap-2 p-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                <ShieldCheck className="h-5 w-5 text-emerald-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight">Secure<br/>Checkout</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2 p-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                <CheckCircle className="h-5 w-5 text-blue-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight">PayPal<br/>Protected</span>
              </div>
              <div className="flex flex-col items-center justify-center text-center gap-2 p-3 rounded-lg bg-white border border-slate-200 shadow-sm">
                <Lock className="h-5 w-5 text-slate-600" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 leading-tight">Encrypted<br/>Payment</span>
              </div>
            </div>

            <p className="text-xs text-center text-slate-500 px-4 pt-2">
              Your payment information is processed securely by PayPal. Saloree never stores your credit card details or PayPal credentials.
            </p>
          </aside>

        </div>
      </div>
    </div>
  );
}
