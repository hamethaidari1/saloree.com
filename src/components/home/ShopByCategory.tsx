import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import beautyImg from "@/assets/categories.imgs/Beauty & Health.png.jpg";
import electronicsImg from "@/assets/categories.imgs/Electronics.png.jpg";
import fashionImg from "@/assets/categories.imgs/Fashion.png.jpg";
import homeImg from "@/assets/categories.imgs/Home & Kitchen.png.jpg";
import sportsImg from "@/assets/categories.imgs/Sports & Outdoors.png.jpg";
import booksImg from "@/assets/categories.imgs/Books & Stationery.png.jpg";
import toysImg from "@/assets/categories.imgs/Toys & Games.png.jpg";
import automotiveImg from "@/assets/categories.imgs/Automotive.png.jpg";

export function ShopByCategory() {
  const categoryItems = [
    {
      title: "Beauty & Apothecary",
      shortTitle: "BEAUTY",
      slug: "beauty",
      image: beautyImg,
      featured: true,
    },
    {
      title: "Electronics",
      shortTitle: "TECH",
      slug: "electronics",
      image: electronicsImg,
      featured: false,
    },
    {
      title: "Fashion",
      shortTitle: "FASHION",
      slug: "fashion",
      image: fashionImg,
      featured: false,
    },
    {
      title: "Home & Living",
      shortTitle: "HOME",
      slug: "home-kitchen",
      image: homeImg,
      featured: false,
    },
    {
      title: "Sportswear",
      shortTitle: "SPORTS",
      slug: "sports-outdoors",
      image: sportsImg,
      featured: false,
    },
    {
      title: "Books & Stationery",
      shortTitle: "BOOKS",
      slug: "books-stationery",
      image: booksImg,
      featured: false,
    },
    {
      title: "Toys & Games",
      shortTitle: "TOYS",
      slug: "toys-games",
      image: toysImg,
      featured: false,
    },
    {
      title: "Automotive",
      shortTitle: "AUTO",
      slug: "automotive",
      image: automotiveImg,
      featured: false,
    },
  ];

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-8 sm:mb-10">
        <div>
          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900">
            Shop by Category
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 sm:mt-2">
            Browse our curated collections
          </p>
        </div>
        <Link
          to="/marketplace"
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-900 hover:text-[#E11D48] transition-colors"
        >
          <span>View All</span>
          <ArrowRight className="size-4" />
        </Link>
      </div>

      {/* Mobile Circular Category Selector (Matching UX Pilot Mobile Reference) */}
      <div className="flex sm:hidden overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4 mb-6">
        {categoryItems.map((cat) => (
          <Link
            key={`mobile-${cat.slug}`}
            to="/categories/$slug"
            params={{ slug: cat.slug }}
            className="flex flex-col items-center shrink-0 w-20 text-center group"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 border border-slate-200 group-hover:border-[#E11D48] transition-all bg-slate-50 shadow-sm">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-[10px] font-bold tracking-wider text-slate-800 uppercase mt-2 group-hover:text-[#E11D48] truncate max-w-full">
              {cat.shortTitle}
            </span>
          </Link>
        ))}
      </div>

      {/* Bento-style Category Grid (Desktop & Tablet Layout) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
        {/* Main Large Featured Card */}
        <Link
          to="/categories/$slug"
          params={{ slug: categoryItems[0].slug }}
          className="group relative overflow-hidden rounded-2xl aspect-square md:col-span-2 md:row-span-2 shadow-sm hover:shadow-xl transition-all duration-300"
        >
          <img
            src={categoryItems[0].image}
            alt={categoryItems[0].title}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-editorial">
              {categoryItems[0].title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 mt-1 opacity-90">
              Discover curated collection
            </p>
          </div>
        </Link>

        {/* 4 Secondary Grid Cards */}
        {categoryItems.slice(1, 5).map((cat) => (
          <Link
            key={cat.slug}
            to="/categories/$slug"
            params={{ slug: cat.slug }}
            className="group relative overflow-hidden rounded-2xl aspect-square shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-sm sm:text-base font-bold font-editorial">
                {cat.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
