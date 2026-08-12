export function BrandPartners() {
  const brands = [
    { name: "Lumina", fontStyle: "font-bold" },
    { name: "Aurum", fontStyle: "font-bold italic" },
    { name: "Nimbus", fontStyle: "font-extrabold tracking-widest" },
    { name: "Vertex", fontStyle: "font-semibold tracking-wider" },
    { name: "Flux", fontStyle: "font-black" },
  ];

  return (
    <section className="border-y border-slate-200 py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[10px] sm:text-xs uppercase tracking-[0.2em] text-slate-400 mb-6 font-bold">
          TRUSTED BY LEADING BRANDS WORLDWIDE
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 sm:gap-x-16 gap-y-6 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 text-slate-800">
          {brands.map((b) => (
            <span key={b.name} className={`font-editorial text-2xl sm:text-3xl ${b.fontStyle}`}>
              {b.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
