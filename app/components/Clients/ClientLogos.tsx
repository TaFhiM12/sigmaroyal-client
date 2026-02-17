// components/clients/ClientShowcase.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  Award, 
  Users,
  Clock,
  CheckCircle
} from 'lucide-react';
import { clientLogos, clientNames } from '@/app/data/client';

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

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      // Swipe left
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % clientLogos.length);
    }
    if (touchStart - touchEnd < -75) {
      // Swipe right
      setDirection(-1);
      setActiveIndex((prev) => (prev - 1 + clientLogos.length) % clientLogos.length);
    }
  };

  return (
    <section ref={containerRef} className="py-12 md:py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 md:w-125 h-64 md:h-125 bg-red-100 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-0 w-64 md:w-125 h-64 md:h-125 bg-blue-100 rounded-full blur-3xl opacity-20" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-30 md:opacity-100" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #e5e7eb 1px, transparent 0)',
          backgroundSize: '20px 20px md:40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        {/* Header - Always visible on mobile */}
        <div className="max-w-5xl mx-auto mb-10 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 md:gap-3 bg-red-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
              <Building2 className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
              <span className="text-xs md:text-sm font-semibold text-red-700">TRUSTED BY NATIONAL ENERGY LEADERS</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
              Trusted by 
              <span className="relative ml-2 md:ml-3 block sm:inline">
                <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                  National Energy Leaders
                </span>
                <motion.span
                  initial={{ width: 0 }}
                  animate={isInView ? { width: '100%' } : {}}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute -bottom-2 left-0 h-0.5 md:h-1 bg-gradient-to-r from-red-600 to-red-300 rounded-full"
                />
              </span>
            </h2>

            <p className="text-sm md:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Partnering with PetroBangla subsidiaries, power producers, and global EPC partners to deliver critical energy infrastructure.
            </p>
          </motion.div>

          {/* Stats Cards - Now visible on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-8 md:mt-12"
          >
            {[
              { icon: Clock, label: 'Years of Experience', value: '46+' },
              { icon: Building2, label: 'Projects Completed', value: '50+' },
              { icon: Users, label: 'Permanent Employees', value: '195+' },
              { icon: CheckCircle, label: 'ISO Certified', value: '9001 • 14001 • 45001' },
            ].map((stat, index) => (
              <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-4 border border-gray-100 shadow-sm">
                <stat.icon className="w-4 h-4 md:w-5 md:h-5 text-red-600 mb-1 md:mb-2" />
                <div className="text-lg md:text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main Showcase Area */}
        <div className="max-w-6xl mx-auto">
          {/* Client Spotlight - With touch support for mobile */}
          <div 
            className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl md:rounded-3xl p-4 md:p-8 lg:p-12 overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 md:opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '20px 20px md:30px 30px'
              }} />
            </div>

            {/* Active Client Display */}
            <div className="relative z-10">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 50 : -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -50 : 50 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-center"
                >
                  {/* Logo Display */}
                  <div className="relative w-full">
                    <div className="relative aspect-square max-w-[200px] md:max-w-[300px] mx-auto">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-red-500/20 rounded-full blur-2xl md:blur-3xl animate-pulse" />
                      
                      {/* Logo Container */}
                      <div className="relative w-full h-full bg-white rounded-2xl md:rounded-3xl shadow-xl md:shadow-2xl flex items-center justify-center p-4 md:p-8">
                        <Image
                          src={`/client/${clientLogos[activeIndex]}`}
                          alt={clientNames[activeIndex]}
                          width={150}
                          height={75}
                          className="w-full h-auto object-contain"
                          priority={activeIndex === 0}
                        />
                      </div>

                      {/* Enlistment Badge for PetroBangla subsidiaries */}
                      {(activeIndex === 0 || activeIndex === 1 || activeIndex === 2 || activeIndex === 3) && (
                        <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-red-600 text-white text-[10px] md:text-xs font-bold px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-lg">
                          Enlisted
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="text-white text-center md:text-left">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3 md:space-y-4"
                    >
                      <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm px-3 md:px-4 py-1 md:py-2 rounded-full border border-red-500/30">
                        <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-red-400" />
                        <span className="text-xs md:text-sm font-medium text-red-300">
                          {activeIndex === 5 ? 'International Partner' : 
                           activeIndex === 11 ? 'Power Project' : 
                           'Government Partner'}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold leading-tight px-2 md:px-0">
                        {clientNames[activeIndex]}
                      </h3>

                      <p className="text-sm md:text-base text-gray-300 max-w-md mx-auto md:mx-0">
                        Key stakeholder in Bangladesh&apos;s oil, gas pipeline and power infrastructure development.
                      </p>

                      {/* Mobile Counter */}
                      <div className="md:hidden flex items-center justify-center gap-2 pt-2">
                        <span className="text-xs text-gray-400">
                          {activeIndex + 1} / {clientLogos.length}
                        </span>
                      </div>

                      {/* Partnership highlights - Hidden on mobile, shown on desktop */}
                      <div className="hidden md:flex items-center gap-4 pt-4">
                        <div className="flex -space-x-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                            {(activeIndex + 1).toString()}
                          </div>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
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

            {/* Progress Indicators - Dots only (no arrows) */}
            <div className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8">
              {clientLogos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`
                    rounded-full transition-all duration-300
                    ${index === activeIndex 
                      ? 'w-6 md:w-8 h-1.5 md:h-2 bg-red-500' 
                      : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-white/30 hover:bg-white/50'
                    }
                  `}
                  aria-label={`View ${clientNames[index]}`}
                />
              ))}
            </div>
          </div>

          {/* Client Grid Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-10 md:mt-16"
          >
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h4 className="text-sm md:text-lg font-semibold text-gray-900">All Partners & Clients</h4>
              <span className="text-xs md:text-sm text-gray-500">
                {clientLogos.length} Organizations
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 md:gap-3">
              {clientLogos.map((logo, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`
                    relative aspect-square bg-white rounded-lg md:rounded-xl border-2 transition-all duration-300 p-2 md:p-4
                    ${index === activeIndex 
                      ? 'border-red-500 shadow-md md:shadow-lg shadow-red-100' 
                      : 'border-gray-100 hover:border-red-200'
                    }
                  `}
                  title={clientNames[index]}
                >
                  <Image
                    src={`/client/${logo}`}
                    alt={clientNames[index]}  
                    fill
                    className="object-contain p-1 md:p-2"
                    sizes="(max-width: 640px) 25vw, (max-width: 768px) 20vw, (max-width: 1024px) 16vw, 12vw"
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
            className="flex justify-center mt-8 md:mt-12"
          >
            <div className="inline-flex items-center gap-2 md:gap-3 bg-gray-50 px-4 md:px-6 py-2 md:py-3 rounded-full border border-gray-200">
              <Award className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
              <span className="text-xs md:text-sm text-gray-600">
                Enlisted with PetroBangla, TITAS GAS, JALALABAD GAS, PGCL • Since 1977
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}