"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { Briefcase, Users, Target, Award, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import yearsExperience from "@/lib/yearsExperience";
import Link from "next/link";

interface AboutUsProps {
  className?: string;
}

const AboutUs = ({ className }: AboutUsProps) => {
  const ref = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

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

  // Simplified animations for mobile performance
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.1 : 0.3,
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

  const scaleVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut" as const,
      }
    }
  };

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-linear-to-b from-slate-50 via-white to-white py-12 md:py-24",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.035)_1px,transparent_1px)] bg-size-[64px_64px]" />
      <motion.div
        aria-hidden="true"
        animate={!isMobile ? { x: ["-20%", "20%", "-20%"] } : undefined}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-blue-700/40 to-transparent"
      />

      {/* Simplified background elements - only show on desktop */}
      {!isMobile && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 18, 0], opacity: [0.18, 0.28, 0.18] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-0 top-14 h-44 w-1/2 bg-linear-to-l from-blue-700/10 to-transparent blur-2xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, -14, 0], opacity: [0.14, 0.24, 0.14] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-12 left-0 h-36 w-1/2 bg-linear-to-r from-red-600/8 to-transparent blur-2xl"
          />
        </>
      )}

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start"
        >
          {/* Left Column - Company Introduction */}
          <div className="space-y-6">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="section-kicker">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                <span>SINCE 1977</span>
              </div>

              <h2 className="section-title overflow-hidden">
                <motion.span
                  variants={fadeUpVariants}
                  className="inline-block"
                >
                  Pioneering
                </motion.span>
                <br />
                <motion.span
                  variants={fadeUpVariants}
                  className="brand-text-gradient inline-block"
                >
                  Energy Excellence
                </motion.span>
              </h2>
              <motion.div
                initial={{ scaleX: 0, transformOrigin: "left" }}
                animate={controls}
                variants={{
                  hidden: { scaleX: 0 },
                  visible: {
                    scaleX: 1,
                    transition: { duration: 0.75, ease: "easeOut" },
                  },
                }}
                className="section-underline"
              />

              <div className="space-y-4">
                <p className="section-copy">
                  <span className="font-bold text-gray-900">
                    The Royal Utilisation Services (Pvt.) Ltd
                  </span>
                  , together with{" "}
                  <span className="font-bold text-gray-900">
                    Sigma Construction Company
                  </span>
                  , stands as a pioneer in Bangladesh&apos;s energy sector with
                  over{" "}
                  <span className="font-bold text-red-600">{yearsExperience} years</span> of
                  unparalleled experience since 1977.
                </p>
                <p className="section-copy">
                  We are one of the foremost infrastructure developers in the
                  Oil, Gas & Power sector, delivering comprehensive solutions
                  that power the nation&apos;s growth.
                </p>
              </div>
            </motion.div>

            {/* Featured Projects */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="section-title-sm">
                Featured Projects
              </h3>
              
              <div className="space-y-3">
                {[
                  {
                    title: "588.31 MW CCPP Project",
                    location: "Sonargaon, Narayanganj",
                    description: "Combined Cycle Power Plant",
                  },
                  {
                    title: "07 Nos. capacity of 60 MMSCFD Project",
                    location: "B-baria",
                    description: "Gas Processing & Distribution",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={project.title}
                    initial="hidden"
                    animate={controls}
                    variants={fadeUpVariants}
                    custom={index}
                    whileHover={
                      !isMobile
                        ? {
                            y: -8,
                            scale: 1.012,
                            boxShadow: "0 24px 60px rgba(15, 23, 42, 0.16)",
                            transition: { duration: 0.28, ease: "easeOut" },
                          }
                        : undefined
                    }
                    className="brand-card group relative overflow-hidden p-4 transition-colors duration-300 hover:border-blue-300 md:p-6"
                  >
                    <motion.div
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-24 bg-linear-to-r from-transparent via-white/60 to-transparent opacity-0 group-hover:opacity-100"
                      initial={{ x: "-140%" }}
                      whileHover={!isMobile ? { x: "720%" } : undefined}
                      transition={{ duration: 0.9, ease: "easeOut" }}
                    />
                    <div className="flex items-start gap-3">
                      <motion.div
                        whileHover={!isMobile ? { rotate: -4, scale: 1.06 } : undefined}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-800 to-blue-600 md:h-12 md:w-12"
                      >
                        <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base md:text-lg font-extrabold text-gray-900 line-clamp-2">
                          {project.title}
                        </h4>
                        <p className="text-xs md:text-sm text-red-600 font-medium mt-1">
                          {project.location}
                        </p>
                        <p className="section-copy-sm mt-2 line-clamp-2">
                          {project.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Services */}
          <div className="space-y-8">
            {/* Stats Grid - Simplified for mobile */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={containerVariants}
              className="grid grid-cols-2 gap-4 md:gap-6"
            >
              {[
                {
                  value: `${yearsExperience}+`,
                  label: "Years Experience",
                  icon: <Award className="h-6 w-6 md:h-8 md:w-8" />,
                  color: "from-blue-800 to-blue-600",
                },
                {
                  value: "500+",
                  label: "Projects",
                  icon: <Briefcase className="h-6 w-6 md:h-8 md:w-8" />,
                  color: "from-blue-950 to-blue-800",
                },
                {
                  value: "50+",
                  label: "Engineers",
                  icon: <Users className="h-6 w-6 md:h-8 md:w-8" />,
                  color: "from-blue-800 to-blue-600",
                },
                {
                  value: "100%",
                  label: "Satisfaction",
                  icon: <Target className="h-6 w-6 md:h-8 md:w-8" />,
                  color: "from-blue-950 to-blue-800",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleVariants}
                  whileHover={
                    !isMobile
                      ? {
                          y: -10,
                          rotateX: 4,
                          rotateY: -3,
                          scale: 1.015,
                          boxShadow: "0 28px 70px rgba(15, 23, 42, 0.16)",
                          transition: { duration: 0.25, ease: "easeOut" },
                        }
                      : undefined
                  }
                  className="brand-card group relative overflow-hidden p-4 [transform-style:preserve-3d] md:p-6"
                >
                  <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-linear-to-r from-blue-700 via-blue-600 to-red-600 transition-transform duration-500 group-hover:scale-x-100" />
                  <motion.div
                    aria-hidden="true"
                    className="absolute -right-12 top-0 h-full w-20 bg-linear-to-r from-transparent via-blue-100/45 to-transparent opacity-0 group-hover:opacity-100"
                    initial={{ x: -90, rotate: 12 }}
                    whileHover={!isMobile ? { x: 180 } : undefined}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  />
                  <div className="relative space-y-2">
                    <div
                      className={cn(
                        "inline-flex rounded-lg bg-linear-to-br p-2 shadow-[0_12px_28px_rgba(30,64,175,0.22)] transition-transform duration-300 group-hover:-translate-y-1 md:p-3",
                        stat.color
                      )}
                    >
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-extrabold text-gray-900">
                      {stat.value}
                    </div>
                    <p className="text-xs md:text-sm font-medium text-black">
                      {stat.label}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={fadeUpVariants}
              className="pt-4"
            >
              <Button
                asChild
                size={isMobile ? "default" : "lg"}
                className="brand-button-primary group relative w-full overflow-hidden rounded-lg px-6 py-4 text-base transition-transform duration-300 hover:-translate-y-1 md:w-auto md:px-8 md:py-6 md:text-lg"
              >
                <Link href="/about">
                  <span className="absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/20 transition-transform duration-700 group-hover:translate-x-80" />
                  <span className="mr-2 md:mr-3 text-xs sm:text-sm md:text-base lg:text-lg">Discover Our Journey</span>
                  <ChevronRight className="h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 md:group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission & Vision Section - Stack on mobile */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-12 md:mt-24 space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8"
        >
          {/* Mission Card */}
          <motion.div variants={cardVariants} className="relative">
            <div className="brand-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 md:p-3 bg-blue-50 rounded-lg">
                  <Target className="h-5 w-5 md:h-6 md:w-6 text-blue-700" />
                </div>
                <h3 className="section-title-sm">Mission</h3>
              </div>
              <div className="space-y-3">
                <p className="section-copy-sm">
                  To be among the leading contractors for delivering a personalized
                  standard of services that pertains to a level of excellence.
                </p>
                <p className="section-copy-sm">
                  To provide the most efficient, trustworthy, high-quality service
                  while ensuring international standards of safety and quality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={cardVariants} className="relative">
            <div className="brand-card p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 md:p-3 bg-blue-50 rounded-lg">
                  <Eye className="h-5 w-5 md:h-6 md:w-6 text-blue-700" />
                </div>
                <h3 className="section-title-sm">Vision</h3>
              </div>
              <div className="space-y-3">
                <p className="section-copy-sm">
                  To have a viable business suitable for sustainable development by
                  assuring the topmost quality and safety.
                </p>
                <p className="section-copy-sm">
                  Having a commitment to long term business relationships with our
                  Clients while providing guidance and innovation in worldwide
                  business.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Simple decorative line */}
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          transition={{ delay: isMobile ? 0 : 0.5, duration: 0.8 }}
          className="mt-8 md:mt-16 h-0.5 bg-linear-to-r from-transparent via-blue-700 to-transparent rounded-full"
        />
      </div>
    </section>
  );
};

export default AboutUs;
