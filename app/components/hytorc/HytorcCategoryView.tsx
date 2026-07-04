"use client";

import Image from "next/image";
import { HytorcCategory } from "@/types/hytorc";
import { Wrench, ArrowRight, Zap, Shield, Award, Sparkles, CheckCircle, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface HytorcCategoryViewProps {
  category: HytorcCategory;
}

export default function HytorcCategoryView({ category }: HytorcCategoryViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(0);

  const [itemsPerView, setItemsPerView] = useState(4);
  const totalItems = category.products.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerView(3);
      } else {
        setItemsPerView(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= maxIndex) return 0;
        return prev + 1;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, maxIndex]);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
  }, [maxIndex]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
  }, [maxIndex]);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  };

  return (
    <section className="min-h-screen bg-linear-to-b from-[#f7faff] via-white to-[#f7faff] pb-14">
      {category.slug === "hydraulic" && (
        <>
          <span id="square-drive" className="pointer-events-none absolute scroll-mt-28" />
          <span id="hex-drive" className="pointer-events-none absolute scroll-mt-28" />
        </>
      )}
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
        <div className="mb-5 flex flex-col gap-3 rounded-lg border border-[#d8e4f5] bg-white/90 px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-red-700">
              <Sparkles className="h-3.5 w-3.5" />
              HYTORC Series
            </span>
            <p className="truncate text-sm font-semibold text-[var(--brand-muted)]">
              Precision bolting solutions, service support, and certified tooling.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#d8e4f5] bg-white px-3 text-xs font-bold text-[var(--brand-copy)]">
              <CheckCircle className="h-3.5 w-3.5 text-[var(--brand-blue)]" />
              Industry Leading
            </span>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#d8e4f5] bg-white px-3 text-xs font-bold text-[var(--brand-copy)]">
              <Shield className="h-3.5 w-3.5 text-red-500" />
              Precision Engineering
            </span>
            <span className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[#d8e4f5] bg-white px-3 text-xs font-bold text-[var(--brand-copy)]">
              <Award className="h-3.5 w-3.5 text-blue-600" />
              Certified Quality
            </span>
          </div>
        </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Description Card */}
        <div className="mb-8 rounded-lg border border-[#d8e4f5] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md md:p-6">
          <p className="text-base font-medium leading-7 text-[var(--brand-muted)] md:text-lg">
            {category.description}
          </p>
          {category.highlight && (
            <div className="mt-5 border-t border-[#eef4ff] pt-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-1 text-xs font-extrabold uppercase tracking-[0.14em] text-red-600">Key Highlight</h3>
                  <p className="text-base font-extrabold text-[var(--brand-navy)]">{category.highlight}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Carousel Section */}
        <div>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--brand-navy)]">
                Available Models
              </h2>
              <div className="w-20 h-1 bg-linear-to-r from-red-600 to-red-700 mt-2 rounded-full" />
            </div>
            
            {/* Carousel Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-full bg-[#eef4ff] hover:bg-[#d8e4f5] transition-all text-[var(--brand-muted)] hover:text-red-600"
                title={isAutoPlaying ? "Pause" : "Play"}
              >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-[#eef4ff] hover:bg-[#d8e4f5] transition-all text-[var(--brand-muted)] hover:text-red-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-sm text-[var(--brand-muted)]">
                {currentIndex + 1} / {maxIndex + 1}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-[#eef4ff] hover:bg-[#d8e4f5] transition-all text-[var(--brand-muted)] hover:text-red-600"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Carousel Container */}
          <div 
            className="relative overflow-hidden rounded-3xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {category.products.map((item, index) => (
                <div
                  key={item.id}
                  className="flex-shrink-0 px-4"
                  style={{ width: `${100 / itemsPerView}%` }}
                >
                  <div className="group relative">
                    {/* 3D Floating Effect Container */}
                    <div className="relative w-full aspect-square overflow-visible">
                      {/* Glow Effect Behind Product */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="absolute inset-10 bg-linear-to-r from-red-500/20 via-[var(--brand-red)]/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />
                      </div>
                      
                      {/* Product Image - High Resolution with 3D Transform */}
                      <div className="relative w-full h-full transform group-hover:scale-105 group-hover:rotate-3 transition-all duration-700 ease-out">
                        <Image
                          src={item.imageUrl}
                          alt={item.name}
                          fill
                          className="object-contain p-6 drop-shadow-2xl"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          priority={index < 4}
                          quality={100}
                        />
                      </div>
                      
                      {/* Floating Particles Effect on Hover */}
                      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-red-500 rounded-full animate-float" />
                        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-red-500 rounded-full animate-float animation-delay-200" />
                        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-400 rounded-full animate-float animation-delay-500" />
                        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-[var(--brand-red)] rounded-full animate-float animation-delay-700" />
                      </div>
                    </div>
                    
                    {/* Product Name */}
                    <div className="text-center mt-6 transform group-hover:translate-y-1 transition-all duration-300">
                      <h3 className="text-base md:text-lg font-semibold text-[var(--brand-navy)] group-hover:text-red-600 transition-colors duration-300">
                        {item.name}
                      </h3>
                      
                      {/* Learn More Link */}
                      {item.targetUrl && (
                        <div className="mt-2 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <span className="inline-flex items-center gap-1 text-sm font-medium text-red-600 group-hover:gap-2 transition-all duration-300 cursor-pointer">
                            View Details
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Gradient Overlays for Edge Products */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-[#f7faff] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-[#f7faff] to-transparent pointer-events-none" />
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? "w-8 h-2 bg-linear-to-r from-red-600 to-red-700"
                    : "w-2 h-2 bg-[#d8e4f5] hover:bg-[#b9cff0]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-[#d8e4f5] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
              <Shield className="w-6 h-6 text-red-600 group-hover:text-white transition-all duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--brand-navy)] mb-2 group-hover:text-red-600 transition-colors">Industrial Grade</h3>
            <p className="text-[var(--brand-muted)] text-sm">Built for heavy-duty applications with maximum durability</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-[#d8e4f5] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
              <Zap className="w-6 h-6 text-red-600 group-hover:text-white transition-all duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--brand-navy)] mb-2 group-hover:text-red-600 transition-colors">Precision Accuracy</h3>
            <p className="text-[var(--brand-muted)] text-sm">±1% torque accuracy for critical bolting applications</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-[#d8e4f5] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
              <Award className="w-6 h-6 text-red-600 group-hover:text-white transition-all duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--brand-navy)] mb-2 group-hover:text-red-600 transition-colors">Certified Quality</h3>
            <p className="text-[var(--brand-muted)] text-sm">ISO certified with comprehensive warranty coverage</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-linear-to-br from-[var(--brand-navy)] to-[var(--brand-navy)] rounded-2xl p-8 md:p-10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-linear-to-r from-red-600/0 via-red-600/5 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4 group-hover:scale-110 transition-all duration-300">
              <Wrench className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Need Technical Support?
            </h3>
            <p className="text-blue-50/80 mb-6">
              Our team of certified engineers is ready to help you select the right tool for your application.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 bg-linear-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5 hover:scale-105">
                Contact Our Experts
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>

      <style jsx>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-slideInLeft {
          animation: slideInLeft 0.6s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
