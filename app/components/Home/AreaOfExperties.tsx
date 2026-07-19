"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, useAnimation, useScroll, useTransform, MotionValue, Variants } from "framer-motion";
import { 
  Factory, 
  Zap, 
  Droplets, 
  Wrench, 
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import yearsExperience from "@/lib/yearsExperience";

interface ExpertiseAreaProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  features: string[];
  highlights: string[];
  image?: string;
}

interface AreaOfExpertiseProps {
  className?: string;
  heading?: string;
  description?: string;
  showHeader?: boolean;
}

// Define specific tab keys as a type
type ExpertiseTab = "oil-gas" | "power" | "process" | "engineering";

const AreaOfExpertise = ({ className, heading, description, showHeader = true }: AreaOfExpertiseProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
  const stackRef = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    // Check if mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Memoize expertise areas to prevent re-creation on every render
  const expertiseAreas = useMemo(() => ({
    "oil-gas": {
      title: "Oil & Gas Sector",
      description: "Comprehensive solutions for natural gas, LPG, and LNG infrastructure with advanced pipeline technology",
      icon: <Droplets className="h-5 w-5 md:h-6 md:w-6" />,
      color: "from-blue-950 to-blue-700",
      features: [
        "Cross Country Pipeline Construction in NG, LPG & LNG Sector",
        "River Crossing by HDD method",
        "Installation & Commissioning of LPG storage tank, pump and pipeline",
        "LPG Solution for industry, household and auto LPG station",
        "Associate civil works, Metering works"
      ],
      highlights: [
        "HDD Technology",
        "42-inch Pipeline",
        "Safety Certified"
      ],
      image: "/banner/banner1.jpeg"
    },
    "power": {
      title: "Power Sector",
      description: "End-to-end power plant construction and maintenance services with cutting-edge technology",
      icon: <Zap className="h-5 w-5 md:h-6 md:w-6" />,
      color: "from-blue-950 to-blue-800",
      features: [
        "Fabrication, Erection, Installation & Commissioning of all piping, Tank, Structure",
        "Insulation Works of pipe & tank",
        "Installation & Commissioning of mechanical & Electrical equipment",
        "Instrumentation & Control System (SCADA & PLC)"
      ],
      highlights: [
        "588.31 MW CCPP",
        "SCADA Systems",
        "Turnkey Solutions"
      ],
      image: "/banner/banner3.jpg"
    },
    "process": {
      title: "Process Plant",
      description: "Specialized engineering for refineries and petrochemical facilities",
      icon: <Factory className="h-5 w-5 md:h-6 md:w-6" />,
      color: "from-blue-900 to-blue-700",
      features: [
        "Refineries",
        "Petrochemicals"
      ],
      highlights: [
        "Refinery Projects",
        "Chemical Processing",
        "Safety Standards"
      ],
      image: "/banner/banner4.jpg"
    },
    "engineering": {
      title: "Engineering & Services",
      description: "Complete LPG solutions and specialized equipment for energy distribution",
      icon: <Wrench className="h-5 w-5 md:h-6 md:w-6" />,
      color: "from-blue-950 to-blue-800",
      features: [
        "Complete set of auto LPG dispensing station equipment",
        "LPG solution for industry household and auto LPG station",
        "3 wheeler and 4 wheeler LPG kit",
        "LPG domestic meter",
        "Bullet Tank, Carousel and other equipment",
        "Spherical tank fabrication & commissioning"
      ],
      highlights: [
        "Auto LPG Stations",
        "Spherical Tanks",
        "Turnkey Solutions"
      ],
      image: "/banner/banner5.jpg"
    }
  }), []);

  // Simplified animations for mobile performance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: isMobile ? 0.3 : 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  const fadeUpVariants: Variants = {
    hidden: { y: isMobile ? 10 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const expertiseEntries = Object.entries(expertiseAreas) as [ExpertiseTab, typeof expertiseAreas[ExpertiseTab]][];

  return (
    <section
      ref={ref}
      className={cn(
        "site-canvas relative py-12 md:py-20",
        className
      )}
    >
      {(["oil-gas", "power", "process", "engineering"] as ExpertiseTab[]).map((anchor) => (
        <span key={anchor} id={anchor} className="pointer-events-none absolute top-0 scroll-mt-28" />
      ))}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-600/35 to-transparent" />

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        {showHeader && (
          <motion.div
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="mx-auto mb-8 grid max-w-7xl gap-6 md:mb-12 md:grid-cols-[0.95fr_1.05fr] md:items-end"
          >
            <div>
              <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-900 shadow-sm">
                <Sparkles className="h-4 w-4 text-blue-700" />
                <span>Core Competencies</span>
              </motion.div>

              <motion.h2
                variants={fadeUpVariants}
                className="max-w-3xl text-4xl font-extrabold leading-tight tracking-normal text-(--brand-navy) md:text-5xl lg:text-6xl"
              >
                {heading || <>Areas of <span className="brand-text-gradient">Expertise</span></>}
              </motion.h2>
              <div className="mt-5 h-1 w-28 rounded-full bg-linear-to-r from-blue-600 via-blue-700 to-red-600" />
            </div>

            <motion.p
              variants={itemVariants}
              className="max-w-2xl text-base font-medium leading-8 text-(--brand-muted) md:justify-self-end md:text-lg"
            >
              {description || (
                <>
                  {yearsExperience} years of specialized knowledge in energy infrastructure development,
                  delivering innovative solutions with uncompromising quality and safety.
                </>
              )}
            </motion.p>
          </motion.div>
        )}

        {/* Scroll Stack */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mx-auto max-w-7xl"
        >
          <div className="space-y-6 md:hidden">
            {expertiseEntries.map(([key, area], index) => (
              <ExpertisePanel
                key={key}
                area={area}
                index={index}
                total={expertiseEntries.length}
                reversed={index % 2 === 1}
                priority={index === 0}
              />
            ))}
          </div>

          <div
            ref={stackRef}
            className="relative hidden md:block"
            style={{ height: `${expertiseEntries.length * 105}vh` }}
          >
            <div className="sticky top-24 h-[calc(100vh-8rem)] min-h-[620px]">
              <div className="relative h-full">
                {expertiseEntries.map(([key, area], index) => (
                  <ExpertiseDeckPanel
                    key={key}
                    area={area}
                    index={index}
                    total={expertiseEntries.length}
                    progress={scrollYProgress}
                    reversed={index % 2 === 1}
                    priority={index === 0}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

function ExpertiseDeckPanel({
  area,
  index,
  total,
  progress,
  reversed,
  priority,
}: {
  area: ExpertiseAreaProps;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reversed: boolean;
  priority: boolean;
}) {
  const step = 1 / total;
  const start = index * step;
  const hold = Math.min(start + step * 0.16, 1);
  const end = Math.min(start + step * 0.86, 1);
  const isLast = index === total - 1;
  const y = useTransform(progress, [start, hold, end], ["0%", "0%", isLast ? "0%" : "-112%"]);
  const opacity = useTransform(progress, [start, hold, end], [1, 1, isLast ? 1 : 0.98]);

  return (
    <ExpertisePanel
      area={area}
      index={index}
      total={total}
      reversed={reversed}
      priority={priority}
      className="absolute inset-0 h-full"
      style={{
        y,
        opacity,
        zIndex: total - index,
      }}
    />
  );
}

function ExpertisePanel({
  area,
  index,
  total,
  reversed,
  priority,
  className,
  style,
}: {
  area: ExpertiseAreaProps;
  index: number;
  total: number;
  reversed: boolean;
  priority: boolean;
  className?: string;
  style?: React.ComponentProps<typeof motion.article>["style"];
}) {
  return (
    <motion.article
      className={cn(
        "group grid overflow-hidden border border-white/10 bg-[#070b14] shadow-[0_28px_80px_rgba(15,23,42,0.28)] md:grid-cols-[1.08fr_0.92fr]",
        reversed && "md:grid-cols-[0.92fr_1.08fr]",
        className
      )}
      style={style}
    >
      <div className={cn("relative min-h-72 overflow-hidden md:min-h-full", reversed && "md:order-2")}>
        <Image
          src={area.image || "/banner/banner1.jpeg"}
          alt={area.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 55vw"
          priority={priority}
        />
        <div className="absolute inset-0 bg-linear-to-tr from-blue-950/55 via-blue-950/10 to-transparent" />
        <div className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-blue-950/70 px-3 py-1 text-xs font-extrabold uppercase tracking-[0.16em] text-white/85 backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </div>
      </div>

      <div className="flex min-h-72 flex-col justify-center bg-[#070b14] px-6 py-8 md:min-h-full md:px-12 lg:px-16">
        <div className="mb-8 flex h-16 w-16 items-center justify-center bg-red-600 text-white shadow-[0_16px_35px_rgba(220,38,38,0.28)] [clip-path:polygon(0_0,76%_0,100%_24%,100%_100%,0_100%)] md:h-20 md:w-20">
          {area.icon}
        </div>

        <h3 className="max-w-md text-3xl font-extrabold leading-tight tracking-normal text-white md:text-4xl lg:text-5xl">
          {area.title}
        </h3>

        <div className="my-6 h-px max-w-md bg-white/16" />

        <p className="max-w-xl text-base font-medium leading-7 text-white/62">
          {area.description}
        </p>

        <div className="mt-6 grid gap-3 text-sm font-semibold text-white/78 sm:grid-cols-2">
          {area.features.slice(0, 4).map((feature) => (
            <div key={feature} className="flex gap-2">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-white/10 pt-5">
          {area.highlights.map((highlight) => (
            <span
              key={highlight}
              className="inline-flex rounded-full border border-white/14 bg-white/[0.03] px-3 py-1 text-xs font-bold text-white/70"
            >
              {highlight}
            </span>
          ))}
        </div>

        <Link
          href="/portfolio"
          className="mt-8 inline-flex w-fit items-center gap-2 text-base font-extrabold text-white transition-colors hover:text-red-400"
        >
          View Details
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </motion.article>
  );
}

export default AreaOfExpertise;
