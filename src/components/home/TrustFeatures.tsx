import { Truck, ShieldCheck, RefreshCw, Lock, Headphones } from "lucide-react";

export function TrustFeatures() {
  const features = [
    {
      icon: Truck,
      title: "Worldwide Shipping",
      subtitle: "Global delivery support",
    },
    {
      icon: Lock,
      title: "Secure Checkout",
      subtitle: "Encrypted transactions",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      subtitle: "See our refund policy",
    },
    {
      icon: ShieldCheck,
      title: "Buyer Protection",
      subtitle: "Verified order guarantee",
    },
    {
      icon: Headphones,
      title: "Customer Support",
      subtitle: "Dedicated help desk",
    },
  ];

  return (
    <section className="border-y border-[var(--color-hairline)] py-8 bg-[var(--color-surface-alt)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 sm:gap-8 text-center">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="flex flex-col items-center justify-center p-2">
                <div className="w-10 h-10 rounded-full bg-white border border-[var(--color-hairline)] flex items-center justify-center mb-2.5">
                  <Icon className="size-5 text-[var(--color-brand)]" />
                </div>
                <div className="font-heading text-sm font-bold text-[var(--color-ink)] mb-0.5">
                  {item.title}
                </div>
                <div className="text-[11px] text-[var(--color-text-muted)] font-medium">
                  {item.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
