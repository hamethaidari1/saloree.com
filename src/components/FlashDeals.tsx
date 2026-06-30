import { Link } from "@tanstack/react-router";
import { Flame, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

interface FlashDealsProps {
  products: ProductCardData[];
  isLoading?: boolean;
}

export function FlashDeals({ products, isLoading }: FlashDealsProps) {
  const deals = products.slice(0, 4);

  if (isLoading || deals.length === 0) return null;

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
          <div className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-gray-700 shadow-sm sm:flex">
            <Clock className="size-4 text-red-500" />
            Ends soon
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
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
