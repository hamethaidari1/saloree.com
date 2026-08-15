import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Flame, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

interface FlashDealsProps {
  products: ProductCardData[];
  isLoading?: boolean;
}

export function FlashDeals({ products, isLoading }: FlashDealsProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 32, seconds: 15 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <section className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50/50 via-white to-orange-50/50 p-4 shadow-soft sm:p-6 animate-pulse">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="h-6 w-32 bg-gray-200 rounded-full" />
            <div className="h-4 w-48 bg-gray-200 rounded-full" />
          </div>
          <div className="h-10 w-24 bg-gray-200 rounded-full" />
        </div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-200 rounded-2xl" />
          ))}
        </div>
      </section>
    );
  }

  const deals = products.slice(0, 4);

  if (deals.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-red-200 bg-red-50/30 p-8 text-center">
        <Flame className="mx-auto size-12 text-red-400 opacity-60 animate-bounce" />
        <h3 className="mt-4 text-base font-bold text-gray-900">No Flash Deals active today</h3>
        <p className="mt-1 text-xs text-muted-foreground">Check back tomorrow for hot deals!</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-red-100 bg-gradient-to-br from-red-50 via-white to-orange-50 p-4 shadow-soft sm:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600">
            <Flame className="size-4" />
            Flash Deals
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 sm:text-2xl">
            Limited-time offers
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Hot deals selected for today. Grab them before they are gone.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm">
            <Clock className="size-4 text-red-500 animate-pulse" />
            <span className="text-muted-foreground mr-1 text-[11px] font-medium">Ends in:</span>
            <span className="font-mono bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-xs">
              {String(timeLeft.hours).padStart(2, "0")}
            </span>
            <span className="text-red-500 font-bold">:</span>
            <span className="font-mono bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-xs">
              {String(timeLeft.minutes).padStart(2, "0")}
            </span>
            <span className="text-red-500 font-bold">:</span>
            <span className="font-mono bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-xs">
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>

          <Button asChild className="rounded-full bg-[#FF3B3B] hover:bg-[#E03030]">
            <Link to="/marketplace">
              View all
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {deals.map((product) => (
          <ProductCard key={product.id} p={product} />
        ))}
      </div>
    </section>
  );
}

