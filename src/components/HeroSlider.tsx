import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Store, Globe, Smartphone, Laptop, ShoppingBag } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

interface SlideData {
  id: string;
  theme: string;
  headline: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  buttonText2?: string;
  buttonLink2?: string;
  image: string;
  bgGradient: string;
  textColor: string;
  accentColor: string;
  layout: "left-text" | "right-text" | "center-text" | "split-equal" | "neon-gaming" | "minimal-home" | "nature-split" | "global-hub";
}

const AUTOPLAY_MS = 3000;

const slides: SlideData[] = [
  {
    id: "slide-electronics",
    theme: "ELECTRONICS MEGA SALE",
    headline: "Upgrade Your Digital Life",
    subtitle: "Discover premium laptops, smartphones, headphones and smart gadgets with unbeatable prices.",
    buttonText: "Shop Electronics",
    buttonLink: "/categories/electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80", // Premium headphones
    bgGradient: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #311042 100%)",
    textColor: "text-white",
    accentColor: "text-purple-400",
    layout: "left-text"
  },
  {
    id: "slide-home",
    theme: "MODERN HOME COLLECTION",
    headline: "Make Home Beautiful",
    subtitle: "Premium furniture and home essentials for modern living.",
    buttonText: "Shop Home",
    buttonLink: "/categories/home-living",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80", // Scandinavian Sofa
    bgGradient: "linear-gradient(135deg, #FAF8F5 0%, #F5EFEB 50%, #EAE0D5 100%)",
    textColor: "text-gray-900",
    accentColor: "text-amber-700",
    layout: "minimal-home"
  },
  {
    id: "slide-adventure",
    theme: "ADVENTURE & OUTDOORS",
    headline: "Adventure Starts Here",
    subtitle: "Outdoor gear built for every journey.",
    buttonText: "Explore Collection",
    buttonLink: "/categories/sports",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=800&q=80", // Hiker
    bgGradient: "linear-gradient(135deg, #075985 0%, #0369A1 50%, #0284C7 100%)",
    textColor: "text-white",
    accentColor: "text-sky-300",
    layout: "nature-split"
  },
  {
    id: "slide-fashion",
    theme: "FASHION WEEK",
    headline: "Wear Your Confidence",
    subtitle: "Discover the newest trends from top brands.",
    buttonText: "Shop Fashion",
    buttonLink: "/categories/fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80", // Fashion Model
    bgGradient: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FECDD3 100%)",
    textColor: "text-gray-900",
    accentColor: "text-rose-600",
    layout: "right-text"
  },
  {
    id: "slide-beauty",
    theme: "BEAUTY COLLECTION",
    headline: "Glow Every Day",
    subtitle: "Luxury skincare and beauty products with exclusive offers.",
    buttonText: "Shop Beauty",
    buttonLink: "/categories/beauty",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80", // Cosmetics
    bgGradient: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #E9D5FF 100%)",
    textColor: "text-gray-900",
    accentColor: "text-purple-600",
    layout: "split-equal"
  },
  {
    id: "slide-gaming",
    theme: "GAMING WORLD",
    headline: "Level Up Your Game",
    subtitle: "Gaming laptops, consoles and accessories.",
    buttonText: "Shop Gaming",
    buttonLink: "/categories/gaming",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80", // Gaming keyboard setup
    bgGradient: "linear-gradient(135deg, #020617 0%, #0F172A 50%, #1E1B4B 100%)",
    textColor: "text-white",
    accentColor: "text-red-500",
    layout: "neon-gaming"
  },
  {
    id: "slide-kids",
    theme: "KIDS & TOYS",
    headline: "Play. Learn. Grow.",
    subtitle: "Educational toys and gifts for every child.",
    buttonText: "Discover Toys",
    buttonLink: "/categories/toys-games",
    image: "https://images.unsplash.com/photo-1515488042361-404e9250afef?auto=format&fit=crop&w=800&q=80", // Colorful toys
    bgGradient: "linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 50%, #ECFDF5 100%)",
    textColor: "text-gray-900",
    accentColor: "text-emerald-700",
    layout: "center-text"
  },
  {
    id: "slide-global",
    theme: "GLOBAL MARKETPLACE",
    headline: "Millions of Products. Thousands of Sellers.",
    subtitle: "Shop globally with secure payments and fast worldwide delivery.",
    buttonText: "Start Shopping",
    buttonLink: "/marketplace",
    buttonText2: "Become a Seller",
    buttonLink2: "/seller",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80", // Packages / Shipping
    bgGradient: "linear-gradient(135deg, #0F172A 0%, #0F766E 50%, #115E59 100%)",
    textColor: "text-white",
    accentColor: "text-teal-300",
    layout: "global-hub"
  }
];

export function HeroSlider() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressTimerRef = useRef<number | null>(null);

  const totalSlides = slides.length;

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % totalSlides);
    setProgress(0);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setProgress(0);
  };

  const goToSlide = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
    setProgress(0);
  };

  // Autoplay effect
  useEffect(() => {
    if (isPaused) {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      return;
    }

    const intervalTime = 30; // Milliseconds per tick
    const totalTicks = AUTOPLAY_MS / intervalTime;

    progressTimerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (100 / totalTicks);
      });
    }, intervalTime);

    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, [activeIndex, isPaused]);

  const currentSlide = slides[activeIndex];

  // Framer Motion Animation Variants
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, x: direction > 0 ? 30 : -30 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 70, 
        damping: 15, 
        delay: 0.15 
      } 
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.4 } }
  };

  const backgroundVariants: Variants = {
    initial: { opacity: 0.5 },
    animate: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <section
      aria-label="Homepage hero slider"
      className="relative w-full h-[460px] md:h-[520px] lg:h-[580px] rounded-[24px] overflow-hidden shadow-2xl group border border-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {/* Background slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentSlide.id}`}
          variants={backgroundVariants}
          initial="initial"
          animate="animate"
          className="absolute inset-0 transition-all duration-700"
          style={{ background: currentSlide.bgGradient }}
        />
      </AnimatePresence>

      {/* Decorative Grid Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_45%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

      {/* Main Slide Layouts Container */}
      <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16 lg:px-24">
        <AnimatePresence mode="wait" custom={direction}>
          <div key={currentSlide.id} className="w-full h-full flex items-center">
            {/* 1. LEFT TEXT LAYOUT */}
            {currentSlide.layout === "left-text" && (
              <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
                <motion.div 
                  className="lg:col-span-7 z-10 text-left space-y-4 md:space-y-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.p variants={textVariants} className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`}>
                    {currentSlide.theme}
                  </motion.p>
                  <motion.h1 variants={textVariants} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`}>
                    Upgrade Your <span className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">Digital Life</span>
                  </motion.h1>
                  <motion.p variants={textVariants} className="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
                    {currentSlide.subtitle}
                  </motion.p>
                  <motion.div variants={textVariants} className="flex gap-4 pt-2">
                    <Button asChild size="lg" className="rounded-full bg-[#FF3B3B] hover:bg-[#E03030] text-white px-8 font-bold shadow-lg shadow-red-500/25 active:scale-95 transition-all">
                      <Link to={currentSlide.buttonLink as any}>
                        {currentSlide.buttonText}
                        <ArrowRight className="ml-2 size-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="hidden lg:flex lg:col-span-5 justify-center relative"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={imageVariants}
                >
                  {/* Floating effect */}
                  <motion.div 
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-3xl" />
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.headline}
                      className="max-h-[380px] object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] select-none pointer-events-none"
                    />
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* 2. MINIMAL HOME LAYOUT */}
            {currentSlide.layout === "minimal-home" && (
              <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
                <motion.div 
                  className="lg:col-span-6 z-10 text-left space-y-4 md:space-y-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.p variants={textVariants} className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`}>
                    {currentSlide.theme}
                  </motion.p>
                  <motion.h1 variants={textVariants} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor} leading-tight`}>
                    Make Home <br /><span className="text-amber-800">Beautiful</span>
                  </motion.h1>
                  <motion.p variants={textVariants} className="text-sm md:text-base text-gray-600 max-w-md leading-relaxed">
                    {currentSlide.subtitle}
                  </motion.p>
                  <motion.div variants={textVariants} className="pt-2">
                    <Button asChild size="lg" className="rounded-full bg-amber-800 hover:bg-amber-900 text-white px-8 font-bold shadow-lg shadow-amber-800/10 active:scale-95 transition-all">
                      <Link to={currentSlide.buttonLink as any}>
                        {currentSlide.buttonText}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="hidden lg:flex lg:col-span-6 justify-end relative h-full items-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={imageVariants}
                >
                  <div className="relative rounded-[20px] overflow-hidden shadow-2xl border-4 border-white max-w-[480px]">
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.headline}
                      className="w-full object-cover aspect-[4/3] select-none pointer-events-none hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </motion.div>
              </div>
            )}

            {/* 3. NATURE SPLIT LAYOUT */}
            {currentSlide.layout === "nature-split" && (
              <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
                <motion.div 
                  className="lg:col-span-6 z-10 text-left space-y-4 md:space-y-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.p variants={textVariants} className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`}>
                    {currentSlide.theme}
                  </motion.p>
                  <motion.h1 variants={textVariants} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`}>
                    Adventure <br />Starts Here
                  </motion.h1>
                  <motion.p variants={textVariants} className="text-sm md:text-base text-sky-100 max-w-md leading-relaxed">
                    {currentSlide.subtitle}
                  </motion.p>
                  <motion.div variants={textVariants} className="pt-2">
                    <Button asChild size="lg" className="rounded-full bg-white text-sky-900 hover:bg-gray-100 px-8 font-bold shadow-lg active:scale-95 transition-all">
                      <Link to={currentSlide.buttonLink as any}>
                        {currentSlide.buttonText}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="hidden lg:flex lg:col-span-6 justify-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={imageVariants}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-sky-300/10 rounded-full blur-2xl" />
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.headline}
                      className="max-h-[360px] rounded-2xl object-cover aspect-[4/3] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] shadow-inner border border-white/20"
                    />
                  </div>
                </motion.div>
              </div>
            )}

            {/* 4. RIGHT TEXT LAYOUT */}
            {currentSlide.layout === "right-text" && (
              <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
                <motion.div 
                  className="hidden lg:flex lg:col-span-6 justify-start"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={imageVariants}
                >
                  <div className="relative rounded-[24px] overflow-hidden shadow-2xl border-2 border-white max-w-[420px]">
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.headline}
                      className="w-full object-cover aspect-[4/5] select-none pointer-events-none"
                    />
                  </div>
                </motion.div>
                <motion.div 
                  className="lg:col-span-6 z-10 text-left lg:text-right space-y-4 md:space-y-6 lg:ml-auto"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.p variants={textVariants} className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`}>
                    {currentSlide.theme}
                  </motion.p>
                  <motion.h1 variants={textVariants} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`}>
                    Wear Your <br /><span className="text-rose-600">Confidence</span>
                  </motion.h1>
                  <motion.p variants={textVariants} className="text-sm md:text-base text-gray-600 max-w-md lg:ml-auto leading-relaxed">
                    {currentSlide.subtitle}
                  </motion.p>
                  <motion.div variants={textVariants} className="pt-2">
                    <Button asChild size="lg" className="rounded-full bg-rose-600 hover:bg-rose-700 text-white px-8 font-bold shadow-lg shadow-rose-600/10 active:scale-95 transition-all">
                      <Link to={currentSlide.buttonLink as any}>
                        {currentSlide.buttonText}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            )}

            {/* 5. SPLIT EQUAL LAYOUT */}
            {currentSlide.layout === "split-equal" && (
              <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
                <motion.div 
                  className="z-10 text-left space-y-4 md:space-y-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.p variants={textVariants} className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`}>
                    {currentSlide.theme}
                  </motion.p>
                  <motion.h1 variants={textVariants} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`}>
                    Glow Every Day
                  </motion.h1>
                  <motion.p variants={textVariants} className="text-sm md:text-base text-gray-500 max-w-md leading-relaxed">
                    {currentSlide.subtitle}
                  </motion.p>
                  <motion.div variants={textVariants} className="pt-2">
                    <Button asChild size="lg" className="rounded-full bg-purple-600 hover:bg-purple-700 text-white px-8 font-bold shadow-lg active:scale-95 transition-all">
                      <Link to={currentSlide.buttonLink as any}>
                        {currentSlide.buttonText}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="hidden lg:flex justify-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={imageVariants}
                >
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.headline}
                    className="max-h-[350px] rounded-full aspect-square object-cover border-8 border-white shadow-2xl select-none pointer-events-none"
                  />
                </motion.div>
              </div>
            )}

            {/* 6. NEON GAMING LAYOUT */}
            {currentSlide.layout === "neon-gaming" && (
              <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
                <motion.div 
                  className="lg:col-span-7 z-10 text-left space-y-4 md:space-y-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.p variants={textVariants} className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`}>
                    {currentSlide.theme}
                  </motion.p>
                  <motion.h1 variants={textVariants} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`}>
                    Level Up <br /><span className="text-red-500 bg-red-500/10 px-2.5 py-0.5 rounded-lg border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.15)]">Your Game</span>
                  </motion.h1>
                  <motion.p variants={textVariants} className="text-sm md:text-base text-slate-400 max-w-md leading-relaxed">
                    {currentSlide.subtitle}
                  </motion.p>
                  <motion.div variants={textVariants} className="pt-2">
                    <Button asChild size="lg" className="rounded-full bg-red-500 hover:bg-red-600 text-white px-8 font-bold shadow-lg shadow-red-500/25 active:scale-95 transition-all">
                      <Link to={currentSlide.buttonLink as any}>
                        {currentSlide.buttonText}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="hidden lg:flex lg:col-span-5 justify-center relative"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={imageVariants}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-red-500/10 rounded-full blur-3xl" />
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.headline}
                      className="max-h-[340px] rounded-xl border border-slate-800 shadow-2xl object-cover aspect-[4/3] select-none pointer-events-none"
                    />
                  </div>
                </motion.div>
              </div>
            )}

            {/* 7. CENTER TEXT PLAYFUL LAYOUT */}
            {currentSlide.layout === "center-text" && (
              <div className="flex flex-col items-center justify-center text-center w-full z-10 space-y-4 md:space-y-6">
                <motion.p 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`}
                >
                  {currentSlide.theme}
                </motion.p>
                <motion.h1 
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight ${currentSlide.textColor}`}
                >
                  Play. Learn. Grow.
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-sm md:text-base text-emerald-800/80 max-w-lg leading-relaxed"
                >
                  {currentSlide.subtitle}
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="pt-2"
                >
                  <Button asChild size="lg" className="rounded-full bg-emerald-700 hover:bg-emerald-800 text-white px-8 font-bold shadow-lg shadow-emerald-700/20 active:scale-95 transition-all">
                    <Link to={currentSlide.buttonLink as any}>
                      {currentSlide.buttonText}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            )}

            {/* 8. GLOBAL HUB LAYOUT */}
            {currentSlide.layout === "global-hub" && (
              <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
                <motion.div 
                  className="lg:col-span-7 z-10 text-left space-y-4 md:space-y-6"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                >
                  <motion.p variants={textVariants} className={`text-xs md:text-sm font-bold tracking-[0.25em] uppercase ${currentSlide.accentColor}`}>
                    {currentSlide.theme}
                  </motion.p>
                  <motion.h1 variants={textVariants} className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight ${currentSlide.textColor} leading-tight`}>
                    Millions of Products. <br />
                    <span className="text-teal-300">Thousands of Sellers.</span>
                  </motion.h1>
                  <motion.p variants={textVariants} className="text-sm md:text-base text-gray-300 max-w-lg leading-relaxed">
                    {currentSlide.subtitle}
                  </motion.p>
                  <motion.div variants={textVariants} className="flex flex-wrap gap-4 pt-2">
                    <Button asChild size="lg" className="rounded-full bg-[#FF3B3B] hover:bg-[#E03030] text-white px-8 font-bold shadow-lg active:scale-95 transition-all">
                      <Link to={currentSlide.buttonLink as any}>
                        {currentSlide.buttonText}
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full border-white/30 text-white hover:bg-white/10 px-8 font-bold shadow-lg active:scale-95 transition-all">
                      <Link to={currentSlide.buttonLink2 as any}>
                        {currentSlide.buttonText2}
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div 
                  className="hidden lg:flex lg:col-span-5 justify-center"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={imageVariants}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-teal-500/10 rounded-full blur-3xl" />
                    <img
                      src={currentSlide.image}
                      alt={currentSlide.headline}
                      className="max-h-[320px] rounded-2xl object-cover shadow-2xl select-none pointer-events-none"
                    />
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-6 text-white" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-12 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="size-6 text-white" />
      </button>

      {/* Slide Indicators / Active Progress Indicators */}
      <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-2.5 z-20">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300 bg-white/20 hover:bg-white/40 cursor-pointer"
              style={{ width: isActive ? "42px" : "10px" }}
              aria-label={`Go to slide ${index + 1}`}
            >
              {isActive && (
                <div
                  className="absolute inset-y-0 left-0 bg-[#FF3B3B] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
