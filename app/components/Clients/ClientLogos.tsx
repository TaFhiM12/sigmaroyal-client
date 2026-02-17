// components/clients/ClientShowcase.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  Award, 
  ChevronRight,
  ChevronLeft,
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';

// Real Clients & Partners (Based on Company Brochure)
const clientLogos = [
  "client-1.png",  // Petrobangla
  "client-2.png",  // Titas Gas
  "client-3.png",  // Jalalabad Gas
  "client-4.png",  // PGCL
  "client-5.png",  // SGFL
  "client-6.png",  // China Petroleum Pipeline Engineering
  "client-7.png",  // EnergyPac
  "client-8.png",  // NEPC
  "client-9.png",  // BM LPG
  "client-10.png", // ACI
  "client-11.png", // Gas Transmission Company Limited
  "client-12.png", // Reliance Meghnaghat Project
];

const clientNames = [
  "PetroBangla - Bangladesh Oil, Gas & Mineral Corporation",
  "Titas Gas Transmission & Distribution Company Ltd.",
  "Jalalabad Gas Transmission & Distribution System Ltd.",
  "Pipeline Gas Company Limited (PGCL)",
  "Sylhet Gas Fields Limited (SGFL)",
  "China Petroleum Pipeline Engineering Co. Ltd.",
  "EnergyPac Power Generation Ltd.",
  "National Energy & Power Contractors (NEPC)",
  "BM LPG Limited",
  "ACI Limited",
  "Gas Transmission Company Limited (GTCL)",
  "Reliance Meghnaghat Power Project"
];

export default function ClientShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Auto-rotate clients
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % clientLogos.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovered]);

  const nextClient = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % clientLogos.length);
  };

  const prevClient = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + clientLogos.length) % clientLogos.length);
  };

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-linear-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-125 h-125 bg-red-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-125 h-125 bg-blue-100 rounded-full blur-3xl opacity-20" />
        
        {/* Grid Pattern - Fixed from radial-linear to radial-linear */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-linear(circle at 1px 1px, #e5e7eb 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header with Stat Badges */}
        <div className="max-w-5xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-3 bg-red-50 px-4 py-2 rounded-full mb-6">
              <Building2 className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-700">TRUSTED BY NATIONAL ENERGY LEADERS</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              Trusted by 
              <span className="relative ml-3">
                <span className="bg-linear-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  National Energy Leaders
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 h-1 bg-linear-to-r from-red-600 to-red-300 rounded-full"
                />
              </span>
            </h2>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Partnering with PetroBangla subsidiaries, power producers, and global EPC partners to deliver critical energy infrastructure.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { icon: Clock, label: 'Years of Experience', value: '46+' },
              { icon: Building2, label: 'Projects Completed', value: '50+' },
              { icon: Users, label: 'Permanent Employees', value: '195+' },
              { icon: CheckCircle, label: 'ISO Certified', value: '9001 • 14001 • 45001' },
            ].map((stat, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 shadow-sm">
                <stat.icon className="w-5 h-5 text-red-600 mb-2" />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main Showcase Area */}
        <div className="max-w-6xl mx-auto">
          {/* Client Spotlight */}
          <div 
            className="relative bg-linear-to-br from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Background Pattern - Fixed from radial-linear to radial-linear */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-linear(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '30px 30px'
              }} />
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevClient}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Previous client"
            >
              <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
            </button>
            
            <button
              onClick={nextClient}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Next client"
            >
              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            {/* Active Client Display */}
            <div className="relative z-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Logo Display */}
                  <div className="relative">
                    <div className="relative aspect-square max-w-75 mx-auto">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-3xl animate-pulse" />
                      
                      {/* Logo Container */}
                      <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl flex items-center justify-center p-8">
                        <Image
                          src={`/client/${clientLogos[activeIndex]}`}
                          alt={clientNames[activeIndex]}
                          width={200}
                          height={100}
                          className="w-full h-auto object-contain"
                          priority={activeIndex === 0}
                        />
                      </div>

                      {/* Enlistment Badge for PetroBangla subsidiaries */}
                      {(activeIndex === 0 || activeIndex === 1 || activeIndex === 2 || activeIndex === 3) && (
                        <div className="absolute -top-3 -right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                          Enlisted
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="text-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-4"
                    >
                      <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm px-4 py-2 rounded-full border border-red-500/30">
                        <Sparkles className="w-4 h-4 text-red-400" />
                        <span className="text-sm font-medium text-red-300">
                          {activeIndex === 5 ? 'International Partner' : 
                           activeIndex === 11 ? 'Power Project' : 
                           'Government Partner'}
                        </span>
                      </div>

                      <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                        {clientNames[activeIndex]}
                      </h3>

                      <p className="text-gray-300 text-base md:text-lg">
                        Key stakeholder in Bangladesh&apos;s oil, gas pipeline and power infrastructure development.
                      </p>

                      {/* Partnership highlights based on client type */}
                      <div className="flex items-center gap-4 pt-4">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                            {(activeIndex + 1).toString()}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-linear-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                            ✓
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">
                          {activeIndex === 0 ? 'Parent Organization' :
                           activeIndex === 5 ? 'Completed Pipeline Projects' :
                           activeIndex === 11 ? 'Meghnaghat Project' :
                           'Long-term Partnership'}
                        </span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {clientLogos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`
                    h-1.5 rounded-full transition-all duration-300
                    ${index === activeIndex 
                      ? 'w-8 bg-red-500' 
                      : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }
                  `}
                  aria-label={`View ${clientNames[index]}`}
                />
              ))}
            </div>
          </div>

          {/* Client Grid Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-lg font-semibold text-gray-900">All Partners & Clients</h4>
              <span className="text-sm text-gray-500">
                {clientLogos.length} Organizations • Enlisted with PetroBangla Subsidiaries
              </span>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {clientLogos.map((logo, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`
                    relative aspect-square bg-white rounded-xl border-2 transition-all duration-300 p-4
                    ${index === activeIndex 
                      ? 'border-red-500 shadow-lg shadow-red-100' 
                      : 'border-gray-100 hover:border-red-200'
                    }
                  `}
                  title={clientNames[index]}
                >
                  <Image
                    src={`/client/${logo}`}
                    alt={clientNames[index]}  
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 16vw"
                  />
                  
                  {/* Active Indicator */}
                  {index === activeIndex && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full"
                    />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <div className="inline-flex items-center gap-3 bg-gray-50 px-6 py-3 rounded-full border border-gray-200">
              <Award className="w-5 h-5 text-red-600" />
              <span className="text-sm text-gray-600">
                Enlisted with PetroBangla, TITAS GAS, JALALABAD GAS, PGCL • Since 1977
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}