import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
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
}

const AUTOPLAY_MS = 3000;

const slides: SlideData[] = [
  {
    id: "slide-mega-deals",
    theme: "MEGA DEALS",
    headline: "Unbeatable Mega Deals",
    subtitle: "Save up to 70% on top products with limited-time discount codes and flash pricing.",
    buttonText: "Shop Deals",
    buttonLink: "/marketplace",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=800&q=80",
    bgGradient: "linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #4C1D95 100%)",
    textColor: "text-white",
    accentColor: "text-red-400"
  },
  {
    id: "slide-electronics",
    theme: "ELECTRONICS MEGA SALE",
    headline: "Upgrade Your Digital Life",
    subtitle: "Discover premium laptops, smartphones, headphones and smart gadgets with unbeatable prices.",
    buttonText: "Shop Electronics",
    buttonLink: "/categories/electronics",
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80",
    bgGradient: "linear-gradient(135deg, #020617 0%, #0F172A 50%, #1E1B4B 100%)",
    textColor: "text-white",
    accentColor: "text-purple-400"
  },
  {
    id: "slide-fashion",
    theme: "FASHION WEEK",
    headline: "Wear Your Confidence",
    subtitle: "Discover the newest trends from top designer brands at special prices.",
    buttonText: "Shop Fashion",
    buttonLink: "/categories/fashion",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80",
    bgGradient: "linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FECDD3 100%)",
    textColor: "text-gray-900",
    accentColor: "text-rose-600"
  },
  {
    id: "slide-home",
    theme: "MODERN HOME COLLECTION",
    headline: "Make Home Beautiful",
    subtitle: "Premium furniture, aesthetic decor, and kitchen essentials for modern living.",
    buttonText: "Shop Home",
    buttonLink: "/categories/home-living",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    bgGradient: "linear-gradient(135deg, #FAF8F5 0%, #F5EFEB 50%, #EAE0D5 100%)",
    textColor: "text-gray-900",
    accentColor: "text-amber-700"
  },
  {
    id: "slide-beauty",
    theme: "BEAUTY & HEALTH",
    headline: "Glow Every Day",
    subtitle: "Luxury skincare, cosmetic collections, and wellness products with exclusive offers.",
    buttonText: "Shop Beauty",
    buttonLink: "/categories/beauty",
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=800&q=80",
    bgGradient: "linear-gradient(135deg, #FAF5FF 0%, #F3E8FF 50%, #E9D5FF 100%)",
    textColor: "text-gray-900",
    accentColor: "text-purple-600"
  },
  {
    id: "slide-seller",
    theme: "SELL ON SALOREE",
    headline: "Open Your Store & Start Selling",
    subtitle: "Join thousands of successful sellers. Create your shop, upload products, and reach millions of customers.",
    buttonText: "Become a Seller",
    buttonLink: "/register",
    buttonText2: "Start Shopping",
    buttonLink2: "/marketplace",
    image: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80",
    bgGradient: "linear-gradient(135deg, #0F172A 0%, #0F766E 50%, #115E59 100%)",
    textColor: "text-white",
    accentColor: "text-teal-300"
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

  useEffect(() => {
    if (isPaused) {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
      return;
    }

    const intervalTime = 30;
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
      className="relative w-full h-[400px] md:h-[480px] lg:h-[540px] rounded-[24px] overflow-hidden shadow-2xl group border border-gray-100"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
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

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_45%)]" />
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:30px_30px]" />

      <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16 lg:px-24">
        <AnimatePresence mode="wait" custom={direction}>
          <div key={currentSlide.id} className="w-full h-full flex items-center">
            <div className="grid lg:grid-cols-12 gap-8 items-center w-full">
              <motion.div 
                className="col-span-12 lg:col-span-7 z-10 text-left space-y-4 md:space-y-6"
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
                  {currentSlide.headline}
                </motion.h1>
                <motion.p variants={textVariants} className={`text-xs sm:text-sm md:text-base leading-relaxed max-w-lg ${currentSlide.textColor === "text-white" ? "text-gray-300" : "text-gray-600"}`}>
                  {currentSlide.subtitle}
                </motion.p>
                <motion.div variants={textVariants} className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="lg" className={`rounded-full px-6 font-bold active:scale-95 transition-all shadow-md ${
                    currentSlide.textColor === "text-white" 
                      ? "bg-red-500 hover:bg-red-600 text-white shadow-red-500/20 border-none" 
                      : "bg-gray-900 hover:bg-black text-white border-none"
                  }`}>
                    <Link to={currentSlide.buttonLink as any}>
                      {currentSlide.buttonText}
                      <ArrowRight className="ml-2 size-4" />
                    </Link>
                  </Button>
                  {currentSlide.buttonText2 && currentSlide.buttonLink2 && (
                    <Button asChild variant="outline" size="lg" className={`rounded-full px-6 font-bold active:scale-95 transition-all ${
                      currentSlide.textColor === "text-white"
                        ? "border-white/30 text-white hover:bg-white/10"
                        : "border-gray-300 text-gray-900 hover:bg-gray-100"
                    }`}>
                      <Link to={currentSlide.buttonLink2 as any}>
                        {currentSlide.buttonText2}
                      </Link>
                    </Button>
                  )}
                </motion.div>
              </motion.div>
              <motion.div 
                className="hidden lg:flex lg:col-span-5 justify-center relative"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={imageVariants}
              >
                <motion.div 
                  animate={shouldReduceMotion ? {} : { y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative max-w-full"
                >
                  <div className={`absolute inset-0 rounded-full blur-3xl opacity-20 ${
                    currentSlide.textColor === "text-white" ? "bg-purple-500" : "bg-amber-500"
                  }`} />
                  <img
                    src={currentSlide.image}
                    alt={currentSlide.headline}
                    className="max-h-[340px] rounded-2xl object-cover shadow-2xl border border-white/10 select-none pointer-events-none"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-10 md:size-12 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="size-5 md:size-6 text-white" />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-10 md:size-12 rounded-full bg-white/15 hover:bg-white/35 backdrop-blur-md text-white border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer shadow-lg hover:scale-105 active:scale-95 z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="size-5 md:size-6 text-white" />
      </button>

      <div className="absolute bottom-6 inset-x-0 flex items-center justify-center gap-2 z-20">
        {slides.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className="relative h-2 rounded-full overflow-hidden transition-all duration-300 bg-white/20 hover:bg-white/40 cursor-pointer"
              style={{ width: isActive ? "40px" : "8px" }}
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
