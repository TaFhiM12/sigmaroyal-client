"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, cubicBezier } from "framer-motion";
import { ChevronDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroCarouselProps } from "@/types/carouselSlide";
import { customSlides } from "@/app/data/carousel";
import yearsExperience from "@/lib/yearsExperience";


const slideVariants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 2.4, ease: cubicBezier(0.4, 0, 0.2, 1) },
  },
  exit: {
    opacity: 0,
    transition: { duration: 2.4, ease: cubicBezier(0.4, 0, 0.2, 1) },
  },
};

const contentVariants = {
  hidden: {
    opacity: 0,
    filter: "blur(3px)",
    WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 100%)",
    maskImage: "radial-gradient(circle at center, black 0%, black 100%)",
  },
  visible: (i: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    WebkitMaskImage: "radial-gradient(circle at center, black 0%, black 100%)",
    maskImage: "radial-gradient(circle at center, black 0%, black 100%)",
    transition: {
      delay: 0.45 + i * 0.16,
      duration: 1.15,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    filter: "blur(2px)",
    WebkitMaskImage: "radial-gradient(circle at center, transparent 72%, black 100%)",
    maskImage: "radial-gradient(circle at center, transparent 72%, black 100%)",
    transition: {
      delay: i * 0.05,
      duration: 1.45,
      ease: cubicBezier(0.45, 0, 0.55, 1),
    },
  }),
};

const letterVariants = {
  hidden: { opacity: 0, filter: "blur(7px)", scale: 0.88 },
  visible: (index: number) => ({
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      delay: 0.55 + index * 0.022,
      duration: 0.55,
      ease: cubicBezier(0.16, 1, 0.3, 1),
    },
  }),
  exit: (index: number) => ({
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.86,
    transition: {
      delay: index * 0.018,
      duration: 0.48,
      ease: cubicBezier(0.4, 0, 0.6, 1),
    },
  }),
};

const contentLayerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: cubicBezier(0.16, 1, 0.3, 1) },
  },
  exit: {
    opacity: [1, 1, 0],
    transition: {
      duration: 1.45,
      times: [0, 0.82, 1],
      ease: cubicBezier(0.4, 0, 0.6, 1),
    },
  },
};

const lineVariants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { delay: 0.1, duration: 0.9, ease: cubicBezier(0.22, 1, 0.36, 1) },
  },
  exit: { scaleX: 0, originX: 1, transition: { duration: 0.35 } },
};

const cinematicMoves = [
  { x: ["-1%", "1%"], y: ["-0.6%", "0.6%"], scale: [1.04, 1.1] },
  { x: ["1%", "-1%"], y: ["0.6%", "-0.4%"], scale: [1.1, 1.04] },
  { x: ["-0.7%", "0.7%"], y: ["1%", "-0.7%"], scale: [1.04, 1.1] },
  { x: ["0.7%", "-1%"], y: ["-0.7%", "0.7%"], scale: [1.1, 1.04] },
];


const HeroCarousel = ({
  slides = customSlides,
  autoPlayInterval = 10000,
  className,
}: HeroCarouselProps) => {
  const slideItems = slides.length > 0 ? slides : customSlides;
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Keep automatic slide rotation without displaying carousel controls.
  useEffect(() => {
    if (slideItems.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideItems.length);
    }, autoPlayInterval);
    return () => window.clearInterval(timer);
  }, [autoPlayInterval, slideItems.length]);

  const slide = slideItems[currentSlide] || slideItems[0];

  return (
    <section
      className={cn(
        "relative min-h-160 h-[100svh] w-full overflow-hidden bg-[var(--brand-navy)] md:min-h-150",
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
            <motion.div
              className="absolute inset-0 will-change-transform"
              initial={{
                x: cinematicMoves[currentSlide % cinematicMoves.length].x[0],
                y: cinematicMoves[currentSlide % cinematicMoves.length].y[0],
                scale: cinematicMoves[currentSlide % cinematicMoves.length].scale[0],
              }}
              animate={{
                x: cinematicMoves[currentSlide % cinematicMoves.length].x[1],
                y: cinematicMoves[currentSlide % cinematicMoves.length].y[1],
                scale: cinematicMoves[currentSlide % cinematicMoves.length].scale[1],
              }}
              transition={{
                duration: Math.max(autoPlayInterval / 1000 + 2.5, 12),
                ease: "linear",
              }}
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
          </motion.div>

          {/* Layered overlays */}
          <div className="absolute inset-0 bg-linear-to-r from-[var(--brand-navy)]/92 via-[var(--brand-navy)]/68 to-[var(--brand-navy)]/20" />
          <div className="absolute inset-0 bg-linear-to-t from-[var(--brand-navy)]/85 via-[var(--brand-navy)]/20 to-blue-950/25" />
          <div className="absolute inset-0 bg-linear-to-b from-blue-950/30 via-transparent to-transparent md:hidden" />
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
          {String(slideItems.length).padStart(2, "0")}
        </span>
      </div> */}

      {/* ── Main Content ── */}
      <div className="absolute inset-0 z-10 flex items-center pt-20 md:pb-12 md:pt-16 xl:pb-16">
        <div className="container mx-auto px-5 sm:px-6 md:px-10 lg:px-16">
          <div className="relative ml-0 mr-auto h-[430px] w-full max-w-[720px] md:h-[520px]">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={currentSlide}
                variants={contentLayerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0 flex w-full flex-col justify-start space-y-4 pt-4 sm:space-y-5 sm:pt-7 md:space-y-5 md:pt-12 xl:space-y-6 xl:pt-14"
              >

                {/* Accent line */}
                <motion.div
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="h-0.5 w-16 bg-blue-500 sm:w-20"
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
                    <span className="inline-flex max-w-full items-center gap-2 rounded-lg border border-blue-300/45 bg-blue-700/20 px-3 py-2 text-[10px] font-extrabold uppercase leading-relaxed tracking-[0.12em] text-blue-50 shadow-sm backdrop-blur-md sm:rounded-full sm:px-4 md:text-xs md:tracking-[0.2em]">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="min-w-0">{slide.subtitle}</span>
                    </span>
                  </motion.div>
                )}

                {/* Headline */}
                <motion.h1
                  className="max-w-[12ch] text-[34px] font-extrabold leading-[1.02] tracking-[-0.035em] text-white sm:max-w-[14ch] sm:text-5xl md:max-w-3xl md:text-[clamp(2.75rem,4.3vw,4.25rem)] md:leading-[0.98]"
                >
                  {slide.title.split(" ").map((word, wordIndex) => (
                    <span key={`${currentSlide}-word-${wordIndex}`} className="inline-block whitespace-nowrap">
                      {Array.from(word).map((letter, letterIndex) => {
                        const sequence = slide.title
                          .split(" ")
                          .slice(0, wordIndex)
                          .reduce((total, item) => total + item.length + 1, 0) + letterIndex;
                        return (
                          <motion.span
                            key={`${currentSlide}-${wordIndex}-${letterIndex}`}
                            custom={sequence}
                            variants={letterVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="inline-block origin-center"
                          >
                            {letter}
                          </motion.span>
                        );
                      })}
                      {wordIndex < slide.title.split(" ").length - 1 ? "\u00A0" : null}
                    </span>
                  ))}
                </motion.h1>

                {/* Description */}
                {slide.description && (
                  <motion.p
                    custom={2}
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="max-w-[36rem] text-[15px] font-medium leading-7 tracking-normal text-white/82 sm:text-base md:text-[15px] lg:text-base"
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
                    className="grid grid-cols-2 gap-3 pt-1 sm:flex sm:flex-wrap md:gap-3"
                  >
                    <Button
                      asChild
                      className="group relative h-12 overflow-hidden rounded-lg border-0 bg-blue-950 px-4 text-sm font-extrabold tracking-normal text-white transition-all duration-300 hover:bg-red-700 sm:h-13 sm:px-6 md:px-8"
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
                      className="group h-12 rounded-lg border border-white/25 bg-white/8 px-4 text-sm font-extrabold tracking-normal text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/14 hover:text-white sm:h-13 sm:px-6 md:px-8"
                    >
                      <a href="/contact">Contact Us</a>
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ── Company Stamp (bottom right) ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-8 right-5 z-20 hidden text-right sm:block md:bottom-16 md:right-10"
      >
        <p className="text-white/70 text-xs md:text-sm font-semibold tracking-widest uppercase">
          Since 1977
        </p>
        <p className="text-white/35 text-[10px] md:text-xs tracking-wider mt-0.5">
          {yearsExperience} Years Operating
        </p>
        <p className="text-white/25 text-[9px] md:text-[10px] tracking-widest uppercase mt-0.5">
          Oil · Gas · Power Infrastructure
        </p>
      </motion.div>

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
