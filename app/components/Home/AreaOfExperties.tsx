"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView, useAnimation, AnimatePresence, Variants } from "framer-motion";
import { 
  Factory, 
  Zap, 
  Droplets, 
  Wrench, 
  Wind,
  Cpu,
  Shield,
  ArrowRight,
  Sparkles,
  CheckCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
}

// Define specific tab keys as a type
type ExpertiseTab = "oil-gas" | "power" | "process" | "engineering";

const AreaOfExpertise = ({ className }: AreaOfExpertiseProps) => {
  const [activeTab, setActiveTab] = useState<ExpertiseTab>("oil-gas");
  const [hoveredCard, setHoveredCard] = useState<ExpertiseTab | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef(null);
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

  // Memoize expertise areas to prevent re-creation on every render
  const expertiseAreas = useMemo(() => ({
    "oil-gas": {
      title: "Oil & Gas Sector",
      description: "Comprehensive solutions for natural gas, LPG, and LNG infrastructure with advanced pipeline technology",
      icon: <Droplets className="h-5 w-5 md:h-6 md:w-6" />,
      color: "from-red-600 to-red-700",
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
      color: "from-gray-600 to-gray-800",
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
      image: "/banner/banner1.jpeg"
    },
    "process": {
      title: "Process Plant",
      description: "Specialized engineering for refineries and petrochemical facilities",
      icon: <Factory className="h-5 w-5 md:h-6 md:w-6" />,
      color: "from-red-600 to-red-700",
      features: [
        "Refineries",
        "Petrochemicals"
      ],
      highlights: [
        "Refinery Projects",
        "Chemical Processing",
        "Safety Standards"
      ],
      image: "/banner/banner1.jpeg"
    },
    "engineering": {
      title: "Engineering & Services",
      description: "Complete LPG solutions and specialized equipment for energy distribution",
      icon: <Wrench className="h-5 w-5 md:h-6 md:w-6" />,
      color: "from-gray-600 to-gray-800",
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
      image: "/banner/banner1.jpeg"
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

  const tabContentVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: isMobile ? 0.3 : 0.5,
        ease: "easeOut" as const,
      }
    },
  };

  const scaleVariants: Variants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: isMobile ? 0.4 : 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-linear-to-b from-gray-50 via-white to-gray-50 py-12 md:py-24",
        className
      )}
    >
      {/* Simplified Background - Only on desktop */}
      {!isMobile && (
        <>
          <div className="absolute top-0 left-0 w-full h-32 bg-linear-to-b from-red-600/10 to-transparent" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gray-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
        </>
      )}

      {/* Only show floating animation on desktop */}
      {!isMobile && (
        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
          className="absolute top-20 left-10 opacity-5"
        >
          <Wind className="h-40 w-40 text-gray-600" />
        </motion.div>
      )}

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section - Optimized */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-8 md:mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-3 md:mb-4">
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-r from-transparent via-red-600 to-transparent" />
            <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
            <span className="text-xs md:text-sm font-semibold text-red-700 tracking-wider">
              CORE COMPETENCIES
            </span>
            <div className="w-8 md:w-12 h-0.5 bg-linear-to-r from-transparent via-red-600 to-transparent" />
          </motion.div>

          <motion.h2 
            variants={fadeUpVariants}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6"
          >
            <span className="text-gray-900">Areas of</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800 ml-2 md:ml-4">
              Expertise
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-base md:text-lg text-gray-600 leading-relaxed"
          >
            {yearsExperience}+ years of specialized knowledge in energy infrastructure development, 
            delivering innovative solutions with uncompromising quality and safety.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="space-y-8 lg:grid lg:grid-cols-3 lg:gap-8 lg:space-y-0"
        >
          {/* Left Column - Tabs Navigation */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-1">
            <div className="sticky top-24 space-y-3 md:space-y-4">
              <div className="bg-linear-to-br from-gray-900 to-gray-800 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-lg">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Expertise Categories</h3>
                <div className="space-y-2">
                  {(Object.entries(expertiseAreas) as [ExpertiseTab, typeof expertiseAreas[ExpertiseTab]][]).map(([key, area]) => (
                    <button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      onMouseEnter={() => !isMobile && setHoveredCard(key)}
                      onMouseLeave={() => !isMobile && setHoveredCard(null)}
                      className={cn(
                        "w-full text-left p-3 md:p-4 rounded-lg md:rounded-xl transition-all duration-200",
                        activeTab === key 
                          ? `bg-linear-to-r ${area.color} text-white shadow-md` 
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      )}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <div className={cn(
                          "p-1.5 md:p-2 rounded-md transition-colors",
                          activeTab === key ? "bg-white/20" : "bg-white/10"
                        )}>
                          {area.icon}
                        </div>
                        <span className="text-sm md:text-base font-semibold">{area.title}</span>
                        <ArrowRight className={cn(
                          "ml-auto h-3 w-3 md:h-4 md:w-4 transition-transform",
                          activeTab === key ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
                        )} />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Stats - Simplified for mobile */}
                <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/20">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">4</div>
                      <div className="text-xs text-gray-400">Expertise Sectors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl md:text-2xl font-bold text-white">25+</div>
                      <div className="text-xs text-gray-400">Services</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tab Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={tabContentVariants}
                className="bg-white rounded-xl md:rounded-2xl shadow-lg overflow-hidden border border-gray-200"
              >
                {activeTab && expertiseAreas[activeTab] && (
                  <>
                    {/* Content Header with Image - Optimized */}
                    <div className="relative h-40 md:h-56 overflow-hidden">
                      <Image
                        src={expertiseAreas[activeTab].image || "/placeholder.jpg"}
                        alt={expertiseAreas[activeTab].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={activeTab === "oil-gas"}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
                        <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2">
                          <div className={`p-1.5 md:p-2 rounded-md bg-linear-to-br ${expertiseAreas[activeTab].color}`}>
                            {expertiseAreas[activeTab].icon}
                          </div>
                          <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                            {expertiseAreas[activeTab].title}
                          </h3>
                        </div>
                        <p className="text-sm md:text-base text-gray-200 line-clamp-2">
                          {expertiseAreas[activeTab].description}
                        </p>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-4 md:p-6 lg:p-8">
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                        {expertiseAreas[activeTab].highlights.map((highlight) => (
                          <span
                            key={highlight}
                            className="inline-flex items-center gap-1 md:gap-2 px-3 py-1.5 bg-linear-to-r from-gray-50 to-white border border-gray-200 rounded-full text-xs md:text-sm font-medium"
                          >
                            <CheckCircle className="h-3 w-3 text-red-600" />
                            {highlight}
                          </span>
                        ))}
                      </div>

                      {/* Features List */}
                      <div className="space-y-3 md:space-y-4">
                        <h4 className="text-base md:text-lg font-semibold text-gray-900">Key Services</h4>
                        <div className="space-y-2 md:space-y-3">
                          {expertiseAreas[activeTab].features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-start gap-2 md:gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors duration-200"
                            >
                              <div className={`p-1.5 md:p-2 rounded-md bg-linear-to-br ${expertiseAreas[activeTab].color} mt-0.5`}>
                                <Shield className="h-3 w-3 md:h-4 md:w-4 text-white" />
                              </div>
                              <span className="text-sm md:text-base text-gray-700">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Projects Reference */}
                      <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div>
                            <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-1 md:mb-2">
                              Featured Project
                            </h4>
                            <p className="text-sm md:text-base text-gray-600">
                              {activeTab === "oil-gas" 
                                ? "07 Nos. capacity of 60 MMSCFD Project at B-baria"
                                : activeTab === "power"
                                ? "588.31 MW CCPP Project at Sonargaon, Narayanganj"
                                : "Multiple ongoing projects nationwide"
                              }
                            </p>
                          </div>
                          <button
                            className={`px-4 py-2 md:px-6 md:py-3 rounded-lg bg-linear-to-r ${expertiseAreas[activeTab].color} text-white font-semibold text-sm md:text-base hover:shadow-md transition-shadow`}
                          >
                            View Projects
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Additional Info - Optimized */}
            <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              <div className="bg-linear-to-br from-gray-50 to-white p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <Cpu className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                  <span className="text-sm md:text-base font-semibold text-gray-900">Technology</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  Latest HDD, SCADA, and PLC systems ensuring precision and safety
                </p>
              </div>
              
              <div className="bg-linear-to-br from-gray-50 to-white p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <Shield className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                  <span className="text-sm md:text-base font-semibold text-gray-900">Safety</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  ISO certified safety protocols with zero compromise on quality
                </p>
              </div>
              
              <div className="bg-linear-to-br from-gray-50 to-white p-4 md:p-6 rounded-lg md:rounded-xl border border-gray-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <Sparkles className="h-4 w-4 md:h-5 md:w-5 text-red-600" />
                  <span className="text-sm md:text-base font-semibold text-gray-900">Innovation</span>
                </div>
                <p className="text-xs md:text-sm text-gray-600">
                  Continuous R&D for sustainable and efficient energy solutions
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Expertise Badges - Simplified */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          transition={{ delay: 0.5 }}
          className="mt-8 md:mt-16 flex flex-wrap justify-center gap-3"
        >
          {[
            { icon: <Zap className="h-4 w-4 md:h-5 md:w-5" />, label: "Power Specialists", color: "border-gray-300 bg-gray-50" },
            { icon: <Factory className="h-4 w-4 md:h-5 md:w-5" />, label: "Plant Engineering", color: "border-red-300 bg-red-50" },
            { icon: <Droplets className="h-4 w-4 md:h-5 md:w-5" />, label: "LPG Solutions", color: "border-gray-300 bg-gray-50" },
          ].map((badge) => (
            <div
              key={badge.label}
              className={cn(
                "flex items-center gap-1 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border",
                badge.color
              )}
            >
              <div className="text-gray-700">
                {badge.icon}
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-800">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AreaOfExpertise;