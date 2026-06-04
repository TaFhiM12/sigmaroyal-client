"use client";

import Image from "next/image";
import Link from "next/link";
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

  // Calculate items per view based on screen size
  const getItemsPerView = () => {
    if (typeof window === 'undefined') return 4;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    if (window.innerWidth < 1280) return 3;
    return 4;
  };

  const [itemsPerView, setItemsPerView] = useState(4);
  const totalItems = category.products.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerView(getItemsPerView());
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
    <section className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 pb-24">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/5 rounded-full blur-3xl animate-pulse" />
        
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 mb-6 animate-slideInLeft">
              <div className="w-12 h-0.5 bg-gradient-to-r from-red-600 to-red-700" />
              <Sparkles className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-600 uppercase tracking-wider">HYTORC Series</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight animate-slideInLeft animation-delay-200">
              {category.headline}
            </h1>
            
            <div className="mt-6 flex flex-wrap gap-3 animate-slideInLeft animation-delay-400">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-white">Industry Leading</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                <Shield className="w-4 h-4 text-red-400" />
                <span className="text-sm text-white">Precision Engineering</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-white">Certified Quality</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative bottom curve */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 110C120 100 240 80 360 75C480 70 600 80 720 85C840 90 960 90 1080 85C1200 80 1320 70 1380 65L1440 60V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        {/* Description Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 md:p-10 mb-16 transform hover:scale-[1.01] transition-all duration-300">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700">
            {category.description}
          </p>
          {category.highlight && (
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center animate-bounce">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-red-600 uppercase tracking-wider mb-1">Key Highlight</h3>
                  <p className="text-gray-800 font-semibold text-lg">{category.highlight}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Products Carousel Section */}
        <div>
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                Available Models
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-red-600 to-red-700 mt-2 rounded-full" />
            </div>
            
            {/* Carousel Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-gray-600 hover:text-red-600"
                title={isAutoPlaying ? "Pause" : "Play"}
              >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={prevSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-gray-600 hover:text-red-600"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-sm text-gray-500">
                {currentIndex + 1} / {maxIndex + 1}
              </div>
              <button
                onClick={nextSlide}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all text-gray-600 hover:text-red-600"
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
                        <div className="absolute inset-10 bg-gradient-to-r from-red-500/20 via-orange-500/20 to-red-500/20 rounded-full blur-3xl animate-pulse" />
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
                        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-orange-500 rounded-full animate-float animation-delay-200" />
                        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-400 rounded-full animate-float animation-delay-500" />
                        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full animate-float animation-delay-700" />
                      </div>
                    </div>
                    
                    {/* Product Name */}
                    <div className="text-center mt-6 transform group-hover:translate-y-1 transition-all duration-300">
                      <h3 className="text-base md:text-lg font-semibold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
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
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${
                  currentIndex === idx
                    ? "w-8 h-2 bg-gradient-to-r from-red-600 to-red-700"
                    : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
              <Shield className="w-6 h-6 text-red-600 group-hover:text-white transition-all duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">Industrial Grade</h3>
            <p className="text-gray-600 text-sm">Built for heavy-duty applications with maximum durability</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
              <Zap className="w-6 h-6 text-red-600 group-hover:text-white transition-all duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">Precision Accuracy</h3>
            <p className="text-gray-600 text-sm">±1% torque accuracy for critical bolting applications</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 transition-all duration-300 group-hover:scale-110">
              <Award className="w-6 h-6 text-red-600 group-hover:text-white transition-all duration-300" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-red-600 transition-colors">Certified Quality</h3>
            <p className="text-gray-600 text-sm">ISO certified with comprehensive warranty coverage</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-10 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/5 to-red-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <div className="max-w-2xl mx-auto relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-600/20 rounded-full mb-4 group-hover:scale-110 transition-all duration-300">
              <Wrench className="w-8 h-8 text-red-400" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Need Technical Support?
            </h3>
            <p className="text-gray-300 mb-6">
              Our team of certified engineers is ready to help you select the right tool for your application.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:-translate-y-0.5 hover:scale-105">
                Contact Our Experts
              </button>
              <button className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all hover:-translate-y-0.5">
                Download Brochure
              </button>
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