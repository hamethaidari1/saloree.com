import { Mail, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function NewsletterSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-soft">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center mx-auto mb-6 text-[#E11D48]">
          <Mail className="size-6" />
        </div>
        
        <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-4">
          Stay Updated with Saloree
        </h2>
        <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto mb-8 leading-relaxed">
          Discover new drops, trending stores, and exclusive marketplace offers direct to your inbox.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 bg-white border border-slate-300 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-[#E11D48] transition-colors shadow-sm placeholder:text-slate-400"
            disabled
          />
          <Link
            to="/marketplace"
            className="bg-black text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#E11D48] transition-colors shadow-sm inline-flex items-center justify-center gap-2 shrink-0"
          >
            <span>Explore Deals</span>
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-wider">
          JOIN OUR GLOBAL MARKETPLACE COMMUNITY
        </p>
      </div>
    </section>
  );
}
