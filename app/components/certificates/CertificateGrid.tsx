'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Download,
  Stamp,
  Ribbon,
  BadgeCheck,
  FileCheck,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface Certificate {
  src: string;
  title: string;
}

interface CertificateShowcaseProps {
  certificates: Certificate[];
}

// Helper function to generate short labels from titles
const generateLabel = (title: string): string => {
  if (title.includes('PGCL Enlistment')) return 'PGCL';
  if (title.includes('ISO 9001')) return 'ISO 9001';
  if (title.includes('DCCI')) return 'DCCI';
  if (title.includes('ISO 14001')) return 'ISO 14001';
  if (title.includes('RJSC')) return 'RJSC';
  if (title.includes('ISO 45001')) return 'ISO 45001';
  if (title.includes('TGTDCL')) return 'TGTDCL';
  if (title.includes('IEB')) return 'IEB';
  if (title.includes('OHSAS')) return 'OHSAS';
  
  // Fallback: take first 2-3 words
  const words = title.split(' ');
  if (words.length >= 3) {
    return `${words[0]} ${words[1]}`;
  }
  return title.substring(0, 10) + '...';
};

export default function CertificateShowcase({ certificates }: CertificateShowcaseProps) {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Add unique IDs to certificates
  const certificatesWithIds = certificates.map((cert, index) => ({
    ...cert,
    id: `cert-${index}`
  }));

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % certificatesWithIds.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, certificatesWithIds.length]);

  // Pause auto-play when user interacts
  const handleManualChange = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
    
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => {
      setIsAutoPlaying(true);
    }, 10000);
  };

  const nextSlide = () => {
    handleManualChange((activeIndex + 1) % certificatesWithIds.length);
  };

  const prevSlide = () => {
    handleManualChange((activeIndex - 1 + certificatesWithIds.length) % certificatesWithIds.length);
  };

  // Scroll active indicator into view on mobile
  useEffect(() => {
    if (timelineRef.current) {
      const activeButton = timelineRef.current.children[activeIndex] as HTMLElement;
      if (activeButton) {
        activeButton.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [activeIndex]);

  // Create a unique array for the marquee with unique keys
  const marqueeItems = [...certificatesWithIds, ...certificatesWithIds].map((cert, index) => ({
    ...cert,
    uniqueKey: `${cert.id}-${index}`
  }));

  return (
    <>
      <section ref={containerRef} className="py-16 md:py-24 bg-white relative overflow-hidden">
        {/* Minimal Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-40 left-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-70" />
          <div className="absolute bottom-40 right-0 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-70" />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-red-50 px-3 py-1.5 md:px-4 md:py-2 rounded-full mb-4 md:mb-6"
            >
              <Stamp className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
              <span className="text-xs md:text-sm font-medium text-red-700">Official Recognition</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-3 md:mb-4 tracking-tight px-2"
            >
              Our
              <span className="font-bold text-red-600 block mt-1 md:mt-2">Certifications & Accreditations</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-16 md:w-24 h-0.5 bg-red-600 mx-auto mt-6 md:mt-8"
            />
          </div>

          {/* Mobile Navigation Arrows */}
          <div className="flex justify-between items-center mb-6 md:hidden">
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-colors"
              aria-label="Previous certificate"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-medium text-gray-500">
              {activeIndex + 1} / {certificatesWithIds.length}
            </span>
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-red-600 hover:text-white transition-colors"
              aria-label="Next certificate"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Horizontal Scrolling Timeline - Mobile Optimized */}
          <div className="relative mb-16 md:mb-32">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200 -translate-y-1/2" />
            
            <div 
              ref={timelineRef}
              className="flex overflow-x-auto pb-4 md:pb-0 gap-4 md:gap-0 md:overflow-visible md:justify-between relative scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {certificatesWithIds.map((cert, index) => (
                <motion.button
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  onClick={() => handleManualChange(index)}
                  className="relative group shrink-0 md:shrink px-2 md:px-0"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 mt-1">
                    <div className={`
                      w-8 h-8 md:w-12 md:h-12 rounded-full border-2 transition-all duration-300
                      ${activeIndex === index 
                        ? 'border-red-600 bg-red-600 scale-110' 
                        : 'border-gray-300 bg-white group-hover:border-red-400'
                      }
                    `}>
                      {/* <div className={`
                        absolute -top-1 -right-1 w-2 h-2 md:w-4 md:h-4 rounded-full
                        ${activeIndex === index ? 'bg-red-400' : 'bg-gray-300'}
                      `} /> */}
                    </div>
                  </div>

                  {/* Label - Hidden on mobile, shown on desktop */}
                  <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className={`
                      text-sm font-medium transition-colors duration-300
                      ${activeIndex === index ? 'text-red-600' : 'text-gray-400'}
                    `}>
                      {generateLabel(cert.title)}
                    </span>
                  </div>

                  {/* Mobile Label - Shows below dot */}
                  <div className="md:hidden mt-2 text-center ">
                    <span className={`
                      text-xs font-medium transition-colors duration-300
                      ${activeIndex === index ? 'text-red-600' : 'text-gray-400'}
                    `}>
                      {generateLabel(cert.title)}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Featured Certificate Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center bg-gray-50 rounded-2xl md:rounded-3xl p-4 md:p-8 lg:p-12"
            >
              {/* Left Side - Certificate Image */}
              <div className="relative order-2 lg:order-1">
                <div className="relative aspect-4/3 bg-white rounded-xl md:rounded-2xl shadow-lg md:shadow-xl overflow-hidden group">
                  <Image
                    src={certificatesWithIds[activeIndex].src}
                    alt={certificatesWithIds[activeIndex].title}
                    fill
                    className="object-contain p-3 md:p-6 transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => setSelectedCert(certificatesWithIds[activeIndex])}
                      className="bg-white text-gray-900 px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base font-medium flex items-center gap-2 hover:bg-red-600 hover:text-white transition-colors"
                    >
                      <Eye className="w-3 h-3 md:w-4 md:h-4" />
                      Preview
                    </button>
                  </div>

                  {/* Decorative Elements - Hidden on mobile */}
                  <div className="hidden md:block absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-red-600/30" />
                  <div className="hidden md:block absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-red-600/30" />
                </div>
              </div>

              {/* Right Side - Certificate Details */}
              <div className="space-y-4 md:space-y-6 order-1 lg:order-2">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-red-600 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-full">
                  <Ribbon className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-medium">{generateLabel(certificatesWithIds[activeIndex].title)}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight">
                  {certificatesWithIds[activeIndex].title}
                </h3>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                  <button
                    onClick={() => setSelectedCert(certificatesWithIds[activeIndex])}
                    className="px-4 md:px-8 py-3 md:py-4 bg-gray-900 text-white rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <BadgeCheck className="w-4 h-4 md:w-5 md:h-5" />
                    View Certificate
                  </button>
                  <a
                    href={certificatesWithIds[activeIndex].src}
                    download
                    className="px-4 md:px-8 py-3 md:py-4 border-2 border-gray-200 text-gray-700 rounded-lg md:rounded-xl text-sm md:text-base font-medium hover:border-red-600 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                    Download
                  </a>
                </div>

                {/* Auto-play indicator */}
                <div className="flex items-center gap-2 pt-2">
                  <div className="h-1 flex-1 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      key={activeIndex}
                      initial={{ width: 0 }}
                      animate={{ width: isAutoPlaying ? '100%' : 0 }}
                      transition={{ duration: 5, ease: 'linear' }}
                      className="h-full bg-red-600"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Certificate Strip - Floating Badges - Hidden on mobile */}
          <div className="hidden md:block mt-20 overflow-hidden">
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex gap-8 whitespace-nowrap"
            >
              {marqueeItems.map((item) => (
                <div
                  key={item.uniqueKey}
                  className="inline-flex items-center gap-4 px-6 py-3 bg-gray-50 rounded-full border border-gray-100"
                >
                  <FileCheck className="w-5 h-5 text-red-600" />/
                  <span className="text-gray-700 font-medium">{generateLabel(item.title)}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm p-4"
            onClick={() => setSelectedCert(null)}
          >
            <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
              <button
                onClick={() => setSelectedCert(null)}
                className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-5xl w-full">
                {/* Certificate Image */}
                <div className="relative aspect-4/3 bg-gray-100 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={selectedCert.src}
                    alt={selectedCert.title}
                    fill
                    className="object-contain p-4 md:p-12"
                  />

                  {/* Download Button */}
                  <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6">
                    <a
                      href={selectedCert.src}
                      download
                      className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-red-600 text-white rounded-full text-sm md:text-base hover:bg-red-700 transition-colors shadow-lg"
                    >
                      <Download className="w-3 h-3 md:w-4 md:h-4" />
                      Download
                    </a>
                  </div>
                </div>

                {/* Certificate Info */}
                <div className="mt-4 md:mt-6">
                  <h4 className="text-base md:text-xl font-bold text-gray-900">{selectedCert.title}</h4>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}