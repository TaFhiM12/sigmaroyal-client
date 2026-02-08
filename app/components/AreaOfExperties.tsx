"use client";

import React, { useState, useEffect, useRef } from "react";
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

const AreaOfExpertise = ({ className }: AreaOfExpertiseProps) => {
  const [activeTab, setActiveTab] = useState("oil-gas");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null); // Added this line
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const expertiseAreas: Record<string, ExpertiseAreaProps> = {
    "oil-gas": {
      title: "Oil & Gas Sector",
      description: "Comprehensive solutions for natural gas, LPG, and LNG infrastructure with advanced pipeline technology",
      icon: <Droplets className="h-6 w-6" />,
      color: "from-red-600 to-orange-500",
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
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
    },
    "power": {
      title: "Power Sector",
      description: "End-to-end power plant construction and maintenance services with cutting-edge technology",
      icon: <Zap className="h-6 w-6" />,
      color: "from-amber-500 to-yellow-500",
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
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070"
    },
    "process": {
      title: "Process Plant",
      description: "Specialized engineering for refineries and petrochemical facilities",
      icon: <Factory className="h-6 w-6" />,
      color: "from-blue-600 to-cyan-500",
      features: [
        "Refineries",
        "Petrochemicals"
      ],
      highlights: [
        "Refinery Projects",
        "Chemical Processing",
        "Safety Standards"
      ],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070"
    },
    "engineering": {
      title: "Engineering & Services",
      description: "Complete LPG solutions and specialized equipment for energy distribution",
      icon: <Wrench className="h-6 w-6" />,
      color: "from-emerald-600 to-green-500",
      features: [
        "Complete set of auto LPG dispensing station equipment (Storage tank, pump, dispenser etc)",
        "LPG solution for industry household and auto LPG station",
        "3 wheeler and 4 wheeler LPG kit",
        "LPG domestic meter",
        "Bullet Tank, Carousel and other equipment in LPG mother plant & satellite plant",
        "Bullet tank, fabrication & commissioning of spherical tank, LPG transportation line"
      ],
      highlights: [
        "Auto LPG Stations",
        "Spherical Tanks",
        "Turnkey Solutions"
      ],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070"
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const tabContentVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      }
    },
    exit: { opacity: 0, x: 20 }
  };

  const badgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      }
    }
  };

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 py-24", // Fixed: bg-gradient-to-b
        className
      )}
    >
      {/* Animated Background Elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-red-600/10 to-transparent" /> {/* Fixed: bg-gradient-to-b */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      
      {/* Floating Elements */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
        className="absolute top-20 left-10 opacity-10"
      >
        <Wind className="h-40 w-40 text-red-600" />
      </motion.div>
      
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
        className="absolute bottom-20 right-10 opacity-10"
      >
        <Wind className="h-40 w-40 text-blue-600" />
      </motion.div>

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" /> {/* Fixed: bg-gradient-to-r */}
            <Sparkles className="h-5 w-5 text-red-600" />
            <span className="text-sm font-semibold text-red-700 tracking-wider">
              CORE COMPETENCIES
            </span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" /> {/* Fixed: bg-gradient-to-r */}
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="text-gray-900">Areas of</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800 ml-4"> {/* Fixed: bg-gradient-to-r */}
              Expertise
            </span>
          </motion.h2>

          <motion.p 
            variants={itemVariants}
            className="text-lg text-gray-600 leading-relaxed"
          >
            {yearsExperience}+ years of specialized knowledge in energy infrastructure development, 
            delivering innovative solutions across multiple sectors with uncompromising 
            quality and safety standards.
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid lg:grid-cols-3 gap-8"
        >
          {/* Left Column - Tabs Navigation */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-2xl"> {/* Fixed: bg-gradient-to-br */}
                <h3 className="text-xl font-bold text-white mb-6">Expertise Categories</h3>
                <div className="space-y-2">
                  {Object.entries(expertiseAreas).map(([key, area]) => (
                    <motion.button
                      key={key}
                      onClick={() => setActiveTab(key)}
                      onMouseEnter={() => setHoveredCard(key)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className={cn(
                        "w-full text-left p-4 rounded-xl transition-all duration-300 group relative overflow-hidden",
                        activeTab === key 
                          ? `bg-gradient-to-r ${area.color} text-white shadow-lg`  // Fixed: bg-gradient-to-r
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      )}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center gap-3 relative z-10">
                        <div className={cn(
                          "p-2 rounded-lg transition-colors",
                          activeTab === key ? "bg-white/20" : "bg-white/10"
                        )}>
                          {area.icon}
                        </div>
                        <span className="font-semibold">{area.title}</span>
                        <ArrowRight className={cn(
                          "ml-auto h-4 w-4 transition-transform",
                          activeTab === key ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        )} />
                      </div>
                      
                      {/* Animated background on hover */}
                      <motion.div
                        className={cn(
                          "absolute inset-0 z-0",
                          activeTab === key ? "opacity-100" : "opacity-0"
                        )}
                        initial={false}
                        animate={{
                          background: activeTab === key 
                            ? `linear-gradient(135deg, var(--tw-gradient-stops))`
                            : 'transparent'
                        }}
                      />
                    </motion.button>
                  ))}
                </div>

                {/* Stats */}
                <motion.div 
                  variants={itemVariants}
                  className="mt-8 pt-6 border-t border-white/20"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">4</div>
                      <div className="text-xs text-gray-400">Expertise Sectors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white">25+</div>
                      <div className="text-xs text-gray-400">Services</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Tab Content */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={tabContentVariants}
                className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
              >
                {activeTab && expertiseAreas[activeTab] && (
                  <>
                    {/* Content Header with Image */}
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <Image
                        src={expertiseAreas[activeTab].image || "/placeholder.jpg"}
                        alt={expertiseAreas[activeTab].title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> {/* Fixed: bg-gradient-to-t */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${expertiseAreas[activeTab].color}`}> {/* Fixed: bg-gradient-to-br */}
                            {expertiseAreas[activeTab].icon}
                          </div>
                          <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {expertiseAreas[activeTab].title}
                          </h3>
                        </div>
                        <p className="text-gray-200">
                          {expertiseAreas[activeTab].description}
                        </p>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 md:p-8">
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-3 mb-8">
                        {expertiseAreas[activeTab].highlights.map((highlight, index) => (
                          <motion.span
                            key={highlight}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-full text-sm font-medium" // Fixed: bg-gradient-to-r
                          >
                            <CheckCircle className="h-3 w-3 text-green-500" />
                            {highlight}
                          </motion.span>
                        ))}
                      </div>

                      {/* Features List */}
                      <div className="space-y-4">
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Services</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {expertiseAreas[activeTab].features.map((feature, index) => (
                            <motion.div
                              key={feature}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.2 + index * 0.05 }}
                              className="group flex items-start gap-3 p-4 rounded-lg hover:bg-red-50 transition-all duration-300 cursor-pointer"
                              whileHover={{ x: 5 }}
                            >
                              <div className={`p-2 rounded-md bg-gradient-to-br ${expertiseAreas[activeTab].color} mt-0.5`}> {/* Fixed: bg-gradient-to-br */}
                                <Shield className="h-4 w-4 text-white" />
                              </div>
                              <span className="text-gray-700 group-hover:text-gray-900">
                                {feature}
                              </span>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Projects Reference */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="mt-8 pt-6 border-t border-gray-200"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 mb-2">
                              Featured Project
                            </h4>
                            <p className="text-gray-600">
                              {activeTab === "oil-gas" 
                                ? "07 Nos. capacity of 60 MMSCFD Project at B-baria"
                                : activeTab === "power"
                                ? "588.31 MW CCPP Project at Sonargaon, Narayanganj"
                                : "Multiple ongoing projects nationwide"
                              }
                            </p>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-3 rounded-lg bg-gradient-to-r ${expertiseAreas[activeTab].color} text-white font-semibold hover:shadow-lg transition-shadow`} // Fixed: bg-gradient-to-r
                          >
                            View Projects
                          </motion.button>
                        </div>
                      </motion.div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Additional Info */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid md:grid-cols-3 gap-4"
            >
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200"> {/* Fixed: bg-gradient-to-br */}
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-gray-900">Technology</span>
                </div>
                <p className="text-sm text-gray-600">
                  Latest HDD, SCADA, and PLC systems ensuring precision and safety
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200"> {/* Fixed: bg-gradient-to-br */}
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-gray-900">Safety</span>
                </div>
                <p className="text-sm text-gray-600">
                  ISO certified safety protocols with zero compromise on quality
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-200"> {/* Fixed: bg-gradient-to-br */}
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles className="h-5 w-5 text-red-600" />
                  <span className="font-semibold text-gray-900">Innovation</span>
                </div>
                <p className="text-sm text-gray-600">
                  Continuous R&D for sustainable and efficient energy solutions
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Floating Expertise Badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={controls}
          transition={{ delay: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: <Zap />, label: "Power Specialists", color: "border-amber-300 bg-amber-50" },
            { icon: <Factory />, label: "Plant Engineering", color: "border-blue-300 bg-blue-50" },
            { icon: <Droplets />, label: "LPG Solutions", color: "border-emerald-300 bg-emerald-50" },
          ].map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full border",
                badge.color
              )}
            >
              <div className="text-gray-700">
                {badge.icon}
              </div>
              <span className="text-sm font-medium text-gray-800">
                {badge.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AreaOfExpertise;