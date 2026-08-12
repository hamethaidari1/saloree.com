import { useState } from "react";
import heroImg from "@/assets/hero-1.jpg";

export function SeeTheDifference() {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-16 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-editorial text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              See the Difference
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              Discover quality craftsmanship and curated collections across Saloree
            </p>
          </div>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl group bg-slate-900 select-none">
            <img
              src={heroImg}
              alt="Saloree Editorial Showcase"
              className="absolute inset-0 w-full h-full object-cover filter brightness-105 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

            <div className="absolute bottom-6 left-6 text-white max-w-sm">
              <span className="text-[10px] uppercase tracking-widest text-slate-300 font-bold bg-black/40 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                EDITORIAL HIGHLIGHT
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-editorial mt-2">
                Premium Marketplace Standards
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
