import { Link } from "@tanstack/react-router";
import { ArrowRight, Percent, Tag } from "lucide-react";
import heroImg from "@/assets/hero-1.jpg";

export function HomeHero() {
  return (
    <div className="w-full overflow-hidden">
      {/* Main Hero Banner */}
      <section className="relative h-[480px] sm:h-[520px] lg:h-[600px] w-full bg-slate-100 overflow-hidden">
        <img
          src={heroImg}
          alt="Saloree Fashion & Lifestyle Collection"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent sm:from-white/90 sm:via-white/50" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-center items-start">
          <span className="text-[#E11D48] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase mb-3 sm:mb-4">
            GLOW EVERY DAY
          </span>
          <h1 className="font-editorial text-4xl sm:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[1.05] mb-4 sm:mb-6 text-slate-900">
            Summer Vibes<br />
            <span className="text-slate-900 sm:text-transparent sm:[-webkit-text-stroke:1.5px_rgba(0,0,0,0.7)]">
              Collection 2026
            </span>
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 mb-6 sm:mb-8 max-w-md leading-relaxed">
            Discover curated essentials and top products from independent sellers across the globe.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-3 bg-black text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold hover:bg-[#E11D48] transition-all duration-300 shadow-md hover:shadow-xl"
            >
              <span>Shop Now</span>
              <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center justify-center bg-white/80 backdrop-blur border border-slate-300 text-slate-900 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs sm:text-sm font-semibold hover:bg-white transition-all duration-300"
            >
              Explore
            </Link>
          </div>
        </div>
      </section>

      {/* Promotional Band (Flash Sale / Special Deals Banner) */}
      <section className="bg-[#E11D48] text-white py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-pulse" />
            <span className="font-extrabold tracking-wide uppercase">FLASH SALE & SPECIAL OFFERS</span>
          </div>

          <div className="flex items-center gap-2 font-semibold">
            <Tag className="size-4 shrink-0" />
            <span>Up to 70% OFF Selected Items</span>
          </div>

          <Link
            to="/marketplace"
            className="inline-flex items-center gap-1 font-bold text-xs uppercase underline underline-offset-4 hover:text-slate-200 transition-colors"
          >
            VIEW ALL PRODUCTS →
          </Link>
        </div>
      </section>
    </div>
  );
}
