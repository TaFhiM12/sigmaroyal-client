"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, cubicBezier } from "framer-motion";
import { ChevronDown, ArrowRight, Play, Pause } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroCarouselProps } from "@/types/carouselSlide";
import { customSlides } from "@/app/data/carousel";
import yearsExperience from "@/lib/yearsExperience";


const slideVariants = {
  enter: { opacity: 0, scale: 1.04 },
  center: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.1, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.7, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
};

const contentVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.18 + i * 0.13,
      duration: 0.72,
      ease: cubicBezier(0.22, 1, 0.36, 1),
    },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.35 } },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.1, duration: 0.9, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
  exit: { scaleX: 0, originX: 1, transition: { duration: 0.35 } },
};


const HeroCarousel = ({
  autoPlayInterval = 6000,
  showProgressBar = true,
  className,
}: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % customSlides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === 0 ? customSlides.length - 1 : prev - 1
    );
    setProgress(0);
  }, []);

  // Progress tick
  useEffect(() => {
    if (!isPlaying) {
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    if (progressRef.current) clearInterval(progressRef.current);

    progressRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (autoPlayInterval / 100);
      });
    }, 100);

    return () => {
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, autoPlayInterval, nextSlide]);

  // Reset on slide change
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  const slide = customSlides[currentSlide];

  return (
    <section
      className={cn(
        "relative w-full h-screen min-h-150 overflow-hidden bg-neutral-950",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Background Slides ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {/* Parallax image wrapper */}
          <motion.div
            className="absolute inset-[-4%] w-[108%] h-[108%]"
            style={{ x: springX, y: springY }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={currentSlide === 0}
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>

          {/* Layered overlays */}
          <div className="absolute inset-0 bg-linear-to-r from-neutral-950/90 via-neutral-950/60 to-neutral-950/10" />
          <div className="absolute inset-0 bg-linear-to-t from-neutral-950/80 via-transparent to-neutral-950/20" />
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* ── Slide Counter (top right) ── */}
      {/* <div className="absolute top-6 right-6 md:top-10 md:right-10 z-20 flex items-center gap-3">
        <span className="text-red-500 font-mono text-xs tracking-[0.25em] uppercase">
          {String(currentSlide + 1).padStart(2, "0")}
        </span>
        <span className="w-8 h-px bg-white/25" />
        <span className="text-white/35 font-mono text-xs tracking-[0.25em] uppercase">
          {String(customSlides.length).padStart(2, "0")}
        </span>
      </div> */}

      {/* ── Main Content ── */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-5 md:px-10 lg:px-16">
          <div className="max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div key={currentSlide} className="space-y-5 md:space-y-7">

                {/* Accent line */}
                <motion.div
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-0.5 w-16 bg-red-600"
                />

                {/* Badge / Subtitle */}
                {slide.subtitle && (
                  <motion.div
                    custom={0}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <span className="inline-flex items-center gap-2 bg-red-600/15 border border-red-600/40 text-red-400 text-[10px] md:text-xs font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      {slide.subtitle}
                    </span>
                  </motion.div>
                )}

                {/* Headline */}
                <motion.h1
                  custom={1}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight text-white"
                  style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                  {slide.title}
                </motion.h1>

                {/* Description */}
                {slide.description && (
                  <motion.p
                    custom={2}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="text-sm md:text-base lg:text-lg text-white/60 max-w-lg leading-relaxed font-light tracking-wide"
                  >
                    {slide.description}
                  </motion.p>
                )}

                {/* CTA Buttons */}
                {slide.ctaText && (
                  <motion.div
                    custom={3}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-wrap gap-3 md:gap-4 pt-2"
                  >
                    <Button
                      asChild
                      className="group relative bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-none font-semibold tracking-wide transition-all duration-300 overflow-hidden border-0"
                    >
                      <a href={slide.ctaLink || "#"} className="flex items-center gap-2">
                        <span className="relative z-10">{slide.ctaText}</span>
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 relative z-10" />
                        <span className="absolute inset-0 bg-white/10 translate-x-[-110%] group-hover:translate-x-0 transition-transform duration-500 ease-out skew-x-[-8deg]" />
                      </a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="group bg-transparent border border-white/25 hover:border-white/60 text-white hover:bg-white/8 px-6 md:px-8 py-5 md:py-6 text-sm md:text-base rounded-none font-semibold tracking-wide transition-all duration-300 backdrop-blur-sm"
                    >
                      <a href="#contact">Contact Us</a>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Navigation Dots + Prev/Next ── */}
      <div className="absolute bottom-12 md:bottom-16 left-5 md:left-10 lg:left-16 z-20 hidden md:flex items-center gap-5">
        {/* Prev */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        >
          <ArrowRight className="w-3.5 h-3.5 rotate-180" />
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {customSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              className="group relative flex items-center justify-center"
            >
              <span
                className={cn(
                  "block transition-all duration-500 rounded-full",
                  i === currentSlide
                    ? "w-8 h-2 bg-red-600"
                    : "w-2 h-2 bg-white/30 group-hover:bg-white/60"
                )}
              />
            </button>
          ))}
        </div>

        {/* Next */}
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        {/* Play / Pause */}
        <button
          onClick={() => setIsPlaying((v) => !v)}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all duration-300 hover:scale-110 backdrop-blur-sm ml-1"
        >
          {isPlaying ? (
            <Pause className="w-3 h-3" />
          ) : (
            <Play className="w-3 h-3 translate-x-px" />
          )}
        </button>
      </div>

      {/* ── Company Stamp (bottom right) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-12 md:bottom-16 right-5 md:right-10 z-20 text-right"
      >
        <p className="text-white/70 text-xs md:text-sm font-semibold tracking-widest uppercase">
          Since 1977
        </p>
        <p className="text-white/35 text-[10px] md:text-xs tracking-wider mt-0.5">
          {yearsExperience}+ Years of Excellence
        </p>
        <p className="text-white/25 text-[9px] md:text-[10px] tracking-widest uppercase mt-0.5">
          Oil · Gas · Power Infrastructure
        </p>
      </motion.div>

      {/* ── Progress Bar ── */}
      {showProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-white/8 z-20">
          <motion.div
            className="h-full bg-red-600"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
          />
        </div>
      )}

      {/* ── Scroll Indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-1.5"
      >
        <span className="text-white/30 text-[9px] tracking-[0.3em] uppercase font-medium">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown className="w-4 h-4 text-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroCarousel;