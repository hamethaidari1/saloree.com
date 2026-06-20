import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.png";
import hero3 from "@/assets/hero-3.png";
import hero4 from "@/assets/hero-4.png";
import { useHeroSlides } from "@/hooks/useSiteSettings";

type HeroSlide = {
  id: string;
  image: string;
  alt: string;
};

const AUTOPLAY_MS = 3000;
const TRANSITION_MS = 800;
const SWIPE_OFFSET_THRESHOLD = 60;
const SWIPE_VELOCITY_THRESHOLD = 500;

const defaultHeroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    image: hero1,
    alt: "Premium marketplace hero banner featuring modern home and lifestyle products",
  },
  {
    id: "hero-2",
    image: hero2,
    alt: "Saloree marketplace banner showcasing curated shopping collections",
  },
  {
    id: "hero-3",
    image: hero3,
    alt: "Marketplace promotional banner with stylish featured products",
  },
  {
    id: "hero-4",
    image: hero4,
    alt: "Saloree hero banner highlighting premium shopping and product discovery",
  },
];

export function HeroSlider() {
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef<number | null>(null);

  const { data: dbSlides = [] } = useHeroSlides();

  const heroSlides = useMemo(() => {
    const activeDb = dbSlides.filter((s) => s.is_enabled);
    if (activeDb.length > 0) {
      return activeDb.map((s) => ({
        id: s.id,
        image: s.image_url,
        alt: s.alt_text,
      }));
    }
    return defaultHeroSlides;
  }, [dbSlides]);

  const totalSlides = heroSlides.length;

  // Safeguard index if totalSlides changes
  useEffect(() => {
    if (activeIndex >= totalSlides) {
      setActiveIndex(0);
    }
  }, [totalSlides, activeIndex]);

  const currentSlide = heroSlides[activeIndex] || heroSlides[0] || defaultHeroSlides[0];
  const nextSlideIndex = useMemo(() => (activeIndex + 1) % totalSlides, [activeIndex, totalSlides]);

  const clearAutoplay = () => {
    if (autoplayRef.current !== null) {
      window.clearTimeout(autoplayRef.current);
      autoplayRef.current = null;
    }
  };

  const goToSlide = (nextIndex: number) => {
    setDirection(nextIndex > activeIndex ? 1 : -1);
    setActiveIndex((nextIndex + totalSlides) % totalSlides);
  };

  const paginate = (nextDirection: number) => {
    setDirection(nextDirection);
    setActiveIndex((currentIndex) => (currentIndex + nextDirection + totalSlides) % totalSlides);
  };

  useEffect(() => {
    const preloaders = heroSlides.map((slide) => {
      const image = new window.Image();
      image.src = slide.image;
      return image;
    });

    return () => {
      preloaders.forEach((image) => {
        image.onload = null;
        image.onerror = null;
      });
    };
  }, [heroSlides]);

  useEffect(() => {
    if (isPaused || totalSlides <= 1) {
      clearAutoplay();
      return;
    }

    clearAutoplay();
    autoplayRef.current = window.setTimeout(() => {
      paginate(1);
    }, AUTOPLAY_MS);

    return clearAutoplay;
  }, [activeIndex, isPaused, totalSlides]);

  const slideVariants = {
    enter: (customDirection: number) => ({
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.05,
      x: shouldReduceMotion ? 0 : customDirection > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      scale: 1,
      x: 0,
    },
    exit: (customDirection: number) => ({
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.02,
      x: shouldReduceMotion ? 0 : customDirection > 0 ? -24 : 24,
    }),
  };

  if (!currentSlide) return null;

  return (
    <section
      aria-label="Homepage hero slider"
      tabIndex={0}
      className="group relative h-[320px] rounded-[24px] shadow-[0_24px_70px_rgba(15,23,42,0.16)] outline-none sm:h-[360px] lg:h-[420px]"
      style={{ touchAction: "pan-y" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          paginate(-1);
        }
        if (event.key === "ArrowRight") {
          event.preventDefault();
          paginate(1);
        }
      }}
    >
      <div className="absolute inset-0 bg-slate-100" />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.10),rgba(255,255,255,.02))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.24),rgba(255,255,255,0)_34%),radial-gradient(circle_at_bottom_right,rgba(239,68,68,0.14),rgba(239,68,68,0)_28%)]"
      />

      <div className="absolute inset-0 rounded-[24px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: shouldReduceMotion ? 0.01 : TRANSITION_MS / 1000,
              ease: [0.22, 1, 0.36, 1],
            }}
            drag={shouldReduceMotion ? false : "x"}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_, info) => {
              const shouldSwipe =
                Math.abs(info.offset.x) > SWIPE_OFFSET_THRESHOLD ||
                Math.abs(info.velocity.x) > SWIPE_VELOCITY_THRESHOLD;

              if (!shouldSwipe) return;
              paginate(info.offset.x < 0 ? 1 : -1);
            }}
            className="absolute inset-0 will-change-transform"
          >
            <div className="relative flex h-full w-full items-center justify-center overflow-visible px-6 py-8 sm:px-8 sm:py-10 lg:px-10 lg:py-12">
              <motion.img
                src={currentSlide.image}
                alt={currentSlide.alt}
                loading="eager"
                decoding="async"
                draggable={false}
                className="h-full w-full object-contain object-center will-change-transform [transform:translateZ(0)]"
                animate={shouldReduceMotion ? { y: 0 } : { y: [0, -8, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }
                }
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {totalSlides > 1 && (
        <img
          src={heroSlides[nextSlideIndex]?.image || ""}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          className="pointer-events-none absolute h-0 w-0 opacity-0"
        />
      )}

      {totalSlides > 1 && (
        <>
          <motion.button
            type="button"
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-secondary shadow-lg backdrop-blur-md transition-colors hover:bg-white sm:left-4 sm:h-11 sm:w-11"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06, x: -2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={() => paginate(-1)}
          >
            <ChevronLeft className="size-4 sm:size-5" />
          </motion.button>

          <motion.button
            type="button"
            aria-label="Next slide"
            className="absolute right-3 top-1/2 z-10 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/80 text-secondary shadow-lg backdrop-blur-md transition-colors hover:bg-white sm:right-4 sm:h-11 sm:w-11"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.06, x: 2 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
            onClick={() => paginate(1)}
          >
            <ChevronRight className="size-4 sm:size-5" />
          </motion.button>

          <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2 sm:bottom-5">
            {heroSlides.map((slide, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-7 bg-primary shadow-[0_0_0_4px_rgba(255,255,255,0.18)]"
                      : "w-2.5 bg-slate-300/90 hover:bg-slate-200"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
