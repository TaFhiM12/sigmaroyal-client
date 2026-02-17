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
        "relative overflow-hidden bg-linear-to-b from-gray-50 to-white py-12 md:py-24",
        className
      )}
    >
      {/* Simplified background elements - only show on desktop */}
      {!isMobile && (
        <>
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
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
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full">
                <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                <span className="text-xs md:text-sm font-semibold text-red-700 tracking-wider">
                  SINCE 1977
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                <span className="text-gray-900">Pioneering</span>
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800">
                  Energy Excellence
                </span>
              </h2>

              <div className="space-y-4">
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
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
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  We are one of the foremost infrastructure developers in the
                  Oil, Gas & Power sector, delivering comprehensive solutions
                  that power the nation&apos;s growth.
                </p>
              </div>
            </motion.div>

            {/* Featured Projects */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900">
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
                    className="bg-white p-4 md:p-6 rounded-xl border border-gray-200 hover:border-red-300 transition-colors duration-300"
                  >
                    <div className="flex items-start gap-3">
                      <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                        <Briefcase className="h-5 w-5 md:h-6 md:w-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-base md:text-lg font-bold text-gray-900 line-clamp-2">
                          {project.title}
                        </h4>
                        <p className="text-xs md:text-sm text-red-600 font-medium mt-1">
                          {project.location}
                        </p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
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
                  color: "from-red-500 to-red-700",
                },
                {
                  value: "500+",
                  label: "Projects",
                  icon: <Briefcase className="h-6 w-6 md:h-8 md:w-8" />,
                  color: "from-gray-500 to-gray-700",
                },
                {
                  value: "50+",
                  label: "Engineers",
                  icon: <Users className="h-6 w-6 md:h-8 md:w-8" />,
                  color: "from-red-500 to-red-700",
                },
                {
                  value: "100%",
                  label: "Satisfaction",
                  icon: <Target className="h-6 w-6 md:h-8 md:w-8" />,
                  color: "from-gray-500 to-gray-700",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={scaleVariants}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100"
                >
                  <div className="space-y-2">
                    <div
                      className={cn(
                        "inline-flex p-2 md:p-3 rounded-lg bg-linear-to-br",
                        stat.color
                      )}
                    >
                      <div className="text-white">{stat.icon}</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">
                      {stat.value}
                    </div>
                    <p className="text-xs md:text-sm font-medium text-gray-600">
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
                className="w-full md:w-auto group bg-linear-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-6 md:px-8 py-4 md:py-6 text-base md:text-lg rounded-xl font-semibold transition-all duration-300"
              >
                <Link href="/about">
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
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 md:p-3 bg-red-50 rounded-lg">
                  <Target className="h-5 w-5 md:h-6 md:w-6 text-red-600" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Mission</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <p className="text-sm md:text-base leading-relaxed">
                  To be among the leading contractors for delivering a personalized
                  standard of services that pertains to a level of excellence.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
                  To provide the most efficient, trustworthy, high-quality service
                  while ensuring international standards of safety and quality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={cardVariants} className="relative">
            <div className="bg-white p-6 md:p-8 rounded-xl border border-gray-200">
              <div className="flex items-center gap-3 mb-4 md:mb-6">
                <div className="p-2 md:p-3 bg-gray-50 rounded-lg">
                  <Eye className="h-5 w-5 md:h-6 md:w-6 text-gray-700" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">Vision</h3>
              </div>
              <div className="space-y-3 text-gray-600">
                <p className="text-sm md:text-base leading-relaxed">
                  To have a viable business suitable for sustainable development by
                  assuring the topmost quality and safety.
                </p>
                <p className="text-sm md:text-base leading-relaxed">
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
          className="mt-8 md:mt-16 h-0.5 bg-linear-to-r from-transparent via-red-600 to-transparent rounded-full"
        />
      </div>
    </section>
  );
};

export default AboutUs;