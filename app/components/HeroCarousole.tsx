"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface HeroCarouselProps {
  slides?: CarouselSlide[];
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showProgressBar?: boolean;
  className?: string;
}

const HeroCarousel = ({
  slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
      title: "Pioneering Energy Solutions",
      subtitle: "Since 1977",
      description: "46+ years of excellence in oil, gas & power infrastructure development",
      ctaText: "Explore Our Projects",
      ctaLink: "#projects",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
      title: "Pipeline Construction Experts",
      subtitle: "Cross Country & River Crossing",
      description: "Specialized in NG, LPG & LNG pipeline construction using HDD method",
      ctaText: "View Our Expertise",
      ctaLink: "#expertise",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070",
      title: "LPG Solutions Provider",
      subtitle: "Complete Turnkey Solutions",
      description: "From Auto LPG stations to industrial & household LPG systems",
      ctaText: "Discover Solutions",
      ctaLink: "#solutions",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
      title: "Power Plant Construction",
      subtitle: "Balance of Plant & More",
      description: "Fabrication & construction of steam, fuel, and lube oil pipelines",
      ctaText: "Learn About Power",
      ctaLink: "#power",
    },
  ],
  autoPlayInterval = 5000,
  showControls = true,
  showIndicators = true,
  showProgressBar = true,
  className,
}: HeroCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [progress, setProgress] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    setProgress(0);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setProgress(0);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    setProgress(0);
  };

  // Auto-play functionality with progress tracking
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + 100 / (autoPlayInterval / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, nextSlide]);

  // Reset progress when slide changes
  useEffect(() => {
    setProgress(0);
  }, [currentSlide]);

  return (
    <section className={cn("relative w-full h-screen overflow-hidden", className)}>
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            index === currentSlide
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-full"
          )}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="100vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
              <div className="max-w-2xl text-white">
                {/* Subtitles/Badges */}
                {slide.subtitle && (
                  <div className="mb-4 md:mb-6">
                    <span className="inline-block bg-red-600 text-white text-sm md:text-base font-semibold px-4 py-2 rounded-full">
                      {slide.subtitle}
                    </span>
                  </div>
                )}

                {/* Main Title */}
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-4 md:mb-6">
                  {slide.title}
                </h1>

                {/* Description */}
                {slide.description && (
                  <p className="text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 md:mb-10 max-w-lg">
                    {slide.description}
                  </p>
                )}

                {/* Call to Action */}
                {slide.ctaText && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 text-white px-8 py-6 text-lg rounded-none font-semibold transition-all duration-300 hover:scale-105"
                    >
                      <a href={slide.ctaLink || "#"}>{slide.ctaText}</a>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      size="lg"
                      className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-none font-semibold transition-all duration-300"
                    >
                      <a href="#contact">Contact Us</a>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar */}
      {showProgressBar && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/50">
          <div
            className="h-full bg-red-600 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      

      {/* Slide Indicators */}
      {showIndicators && (
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 w-2 md:h-3 md:w-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2",
                index === currentSlide
                  ? "bg-red-600 w-8 md:w-10"
                  : "bg-white/50 hover:bg-white/80"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Company Info Overlay (Optional) */}
      <div className="absolute bottom-4 left-4 md:left-8 md:bottom-8">
        <div className="text-white/80 text-sm md:text-base">
          <p className="font-semibold">Since 1977 • 46+ Years of Excellence</p>
          <p className="text-white/60">Pioneers in Oil, Gas & Power Infrastructure</p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 right-4 md:right-8 md:bottom-8 animate-bounce">
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs mb-1">Scroll</span>
          <ChevronRight className="h-4 w-4 rotate-90" />
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;