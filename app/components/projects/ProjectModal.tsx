// app/components/projects/ProjectModal.tsx
'use client';

import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import {
  X,
  MapPin,
  Calendar,
  Clock,
  Award,
  Briefcase,
  Droplets,
  Zap,
  Download,
  Share2,
  Shield,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  ExternalLink,
  Heart,
  Bookmark,
  Layers,
  Ruler,
  Factory,
  Globe,
  Building2,
  Sparkles,
  Camera,
  ChevronDown,
  ChevronUp,
  Info,
  TrendingUp,
  HardHat,
  FileText,
  Linkedin,
  Twitter,
  Facebook,
  Mail,
  Link2,
  Check,
  ArrowUpRight
} from 'lucide-react';
import { Project } from '@/types/projects';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

interface SectorConfig {
  primary: string;
  secondary: string;
  accent: string;
  gradient: string;
  light: string;
  dark: string;
  text: string;
  border: string;
  glow: string;
  bgLight: string;
}

const getSectorIcon = (sector: string): React.ReactNode => {
  const icons: Record<string, React.ReactNode> = {
    OIL_GAS: <Droplets className="h-4 w-4 sm:h-5 sm:w-5" />,
    POWER_SECTOR: <Zap className="h-4 w-4 sm:h-5 sm:w-5" />,
  };
  return icons[sector] || <Zap className="h-4 w-4 sm:h-5 sm:w-5" />;
};

const getSectorConfig = (sector: string): SectorConfig => {
  const config: Record<string, SectorConfig> = {
    OIL_GAS: { 
      primary: 'from-rose-600 to-rose-700',
      secondary: 'from-rose-500 to-rose-600',
      accent: 'rose',
      gradient: 'bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600',
      light: 'from-rose-400 to-rose-500',
      dark: 'from-rose-800 to-rose-900',
      text: 'text-rose-600',
      border: 'border-rose-200',
      glow: 'shadow-rose-600/30',
      bgLight: 'bg-rose-50'
    },
    POWER_SECTOR: { 
      primary: 'from-gray-700 to-gray-900',
      secondary: 'from-gray-600 to-gray-800',
      accent: 'gray',
      gradient: 'bg-gradient-to-r from-gray-700 via-gray-600 to-gray-800',
      light: 'from-gray-400 to-gray-500',
      dark: 'from-gray-900 to-black',
      text: 'text-gray-700',
      border: 'border-gray-300',
      glow: 'shadow-gray-700/30',
      bgLight: 'bg-gray-50'
    },
  };
  return config[sector] || config.OIL_GAS;
};

// Custom hook for scroll handling with proper typing
const useSafeScroll = (containerRef: React.RefObject<HTMLDivElement | null>) => {
  const [scrollValues, setScrollValues] = useState({
    scrollYProgress: 0.5,
    scrollY: 0
  });
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = container.scrollTop;
          const scrollHeight = container.scrollHeight - container.clientHeight;
          const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
          
          setScrollValues({
            scrollYProgress: progress,
            scrollY: scrollTop
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    handleScroll();
    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [containerRef]);

  const smoothProgress = useSpring(scrollValues.scrollYProgress, {
    damping: 20,
    stiffness: 100,
    restDelta: 0.001
  });

  return { scrollYProgress: smoothProgress };
};

// Detail Item Component with proper typing
interface DetailItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
  config: SectorConfig;
}

const DetailItem: React.FC<DetailItemProps> = ({ icon, label, value, highlight = false, config }) => {
  return (
    <motion.div 
      whileHover={{ x: 4 }}
      className={`flex items-start gap-2 sm:gap-3 pb-4 sm:pb-5 border-b border-gray-200 last:border-0 last:pb-0 group ${
        highlight ? `${config.bgLight} -mx-3 sm:-mx-4 px-3 sm:px-4 py-3 sm:py-4 rounded-xl border-0` : ''
      }`}
    >
      <div className={`${highlight ? config.text : 'text-gray-400 group-hover:text-gray-600'} shrink-0 mt-0.5 transition-colors`}>
        {React.cloneElement(icon as React.ReactElement<{ className?: string; strokeWidth?: number }>, { 
          className: 'h-4 w-4 sm:h-5 sm:w-5',
          strokeWidth: 2.5 
        })}
      </div>
      <div className="min-w-0 flex-1">
        <p className={`text-[10px] sm:text-xs uppercase tracking-wider font-bold mb-0.5 sm:mb-1 ${
          highlight ? config.text : 'text-gray-500'
        }`}>
          {label}
        </p>
        <p className={`text-sm sm:text-base font-bold truncate ${highlight ? `text-${config.accent}-900` : 'text-gray-900'}`}>
          {value}
        </p>
      </div>
    </motion.div>
  );
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'scope' | 'gallery'>('overview');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isModalReady, setIsModalReady] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Memoized values
  const sectorConfig = useMemo(() => 
    project ? getSectorConfig(project.sector) : getSectorConfig('OIL_GAS'), 
    [project]
  );
  
  const validImages = useMemo(() => 
    project?.images?.filter(img => img.url && img.url.startsWith('http')) || [], 
    [project]
  );
  
  const mainImage = useMemo(() => 
    validImages[currentImageIndex]?.url || validImages[0]?.url, 
    [validImages, currentImageIndex]
  );
  
  const hasMultipleImages = validImages.length > 1;

  // Fix: Cast the ref to the expected type
  const { scrollYProgress } = useSafeScroll(containerRef as React.RefObject<HTMLDivElement | null>);
  
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.3]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.2], [0, 10]);
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.1, 0.2], [-20, 0]);

  // Mounting effect
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Modal open/close effect
  useEffect(() => {
    if (!mounted) return;
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setCurrentImageIndex(0);
      const timer = setTimeout(() => setIsModalReady(true), 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'unset';
      setIsModalReady(false);
    }
  }, [isOpen, mounted]);

  // Keyboard events
  useEffect(() => {
    if (!mounted || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && validImages.length > 1) handlePrevImage();
      if (e.key === 'ArrowRight' && validImages.length > 1) handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, mounted, validImages.length, onClose]);

  // Scroll visibility
  useEffect(() => {
    if (!mounted || !containerRef.current || !isModalReady) return;

    const container = containerRef.current;
    const handleScroll = () => {
      setShowScrollTop(container.scrollTop > 400);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [mounted, isModalReady]);

  // Callbacks
  const handlePrevImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? validImages.length - 1 : prev - 1
    );
  }, [validImages.length]);

  const handleNextImage = useCallback(() => {
    setCurrentImageIndex((prev) => 
      prev === validImages.length - 1 ? 0 : prev + 1
    );
  }, [validImages.length]);

  const copyToClipboard = useCallback(() => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!project || !mounted) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-50"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-2 sm:inset-4 md:inset-6 lg:inset-8 xl:inset-12 z-50 overflow-hidden"
          >
            <div className="h-full bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden relative">
              {/* Floating Header */}
              {isModalReady && (
                <motion.div
                  style={{ opacity: headerOpacity, y: headerY }}
                  className="absolute top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 pointer-events-none"
                >
                  <div className="flex items-center justify-between max-w-7xl mx-auto">
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4 min-w-0">
                      <div className={`w-1 sm:w-1.5 md:w-2 h-6 sm:h-7 md:h-8 bg-gradient-to-b ${sectorConfig.primary} rounded-full flex-shrink-0`} />
                      <h3 className="text-base sm:text-lg md:text-xl font-black text-gray-900 truncate">
                        {project.title}
                      </h3>
                      <span className={`hidden sm:inline-flex px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r ${sectorConfig.primary} text-white rounded-full text-[10px] sm:text-xs font-bold flex-shrink-0`}>
                        {project.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 pointer-events-auto flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsLiked(!isLiked)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label={isLiked ? "Unlike" : "Like"}
                      >
                        <Heart className={`h-4 w-4 sm:h-5 sm:w-5 ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-600'}`} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsSaved(!isSaved)}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label={isSaved ? "Remove from saved" : "Save"}
                      >
                        <Bookmark className={`h-4 w-4 sm:h-5 sm:w-5 ${isSaved ? 'fill-amber-500 text-amber-500' : 'text-gray-600'}`} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                        aria-label="Close"
                      >
                        <X className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Main Scrollable Container */}
              <div 
                ref={containerRef}
                className="h-full overflow-y-auto custom-scrollbar"
                style={{ opacity: isModalReady ? 1 : 0 }}
              >
                {/* Hero Section */}
                <motion.div 
                  ref={heroRef}
                  style={{ scale: heroScale }}
                  className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-[90vh] w-full overflow-hidden"
                >
                  {/* Background Image */}
                  <motion.div 
                    style={{ opacity: heroOpacity, filter: `blur(${heroBlur}px)` }}
                    className="absolute inset-0"
                  >
                    {mainImage ? (
                      <Image
                        src={mainImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        priority
                        sizes="100vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
                    )}
                  </motion.div>

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${sectorConfig.primary}/20 mix-blend-overlay`} />

                  {/* Image Navigation */}
                  {hasMultipleImages && (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handlePrevImage}
                        className="absolute left-2 sm:left-4 md:left-6 lg:left-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all border border-white/20 group z-30"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 group-hover:-translate-x-1 transition-transform" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleNextImage}
                        className="absolute right-2 sm:right-4 md:right-6 lg:right-8 top-1/2 -translate-y-1/2 p-2 sm:p-3 md:p-4 bg-white/10 backdrop-blur-xl rounded-full text-white hover:bg-white/20 transition-all border border-white/20 group z-30"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                      
                      {/* Image Counter */}
                      <div className="absolute bottom-20 sm:bottom-24 md:bottom-28 lg:bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 bg-black/40 backdrop-blur-xl rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 z-30">
                        <Camera className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                        <div className="flex gap-1">
                          {validImages.map((_, i) => (
                            <motion.button
                              key={i}
                              whileHover={{ scale: 1.2 }}
                              onClick={() => setCurrentImageIndex(i)}
                              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                                i === currentImageIndex 
                                  ? `w-4 sm:w-6 md:w-8 bg-gradient-to-r ${sectorConfig.primary}` 
                                  : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/60'
                              }`}
                              aria-label={`Go to image ${i + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Hero Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 text-white z-20">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                      className="max-w-7xl mx-auto"
                    >
                      {/* Badges */}
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3, type: "spring" }}
                          className={`relative px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-gradient-to-r ${sectorConfig.primary} text-white rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-wide flex items-center gap-1 sm:gap-2 border border-white/20 shadow-2xl`}
                        >
                          {getSectorIcon(project.sector)}
                          <span className="hidden xs:inline">
                            {project.sector === 'OIL_GAS' ? 'OIL & GAS' : 'POWER SECTOR'}
                          </span>
                          <span className="xs:hidden">
                            {project.sector === 'OIL_GAS' ? 'O&G' : 'POWER'}
                          </span>
                        </motion.div>
                        
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.4, type: "spring" }}
                          className={`px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 ${
                            project.status === 'ONGOING' 
                              ? 'bg-blue-500/30 text-blue-200 border-blue-400/30' 
                              : 'bg-emerald-500/30 text-emerald-200 border-emerald-400/30'
                          } backdrop-blur-xl rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-wide border shadow-2xl flex items-center gap-1 sm:gap-2`}
                        >
                          {project.status === 'ONGOING' ? (
                            <>
                              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-green-500"></span>
                              </span>
                              <span className="hidden xs:inline">LIVE PROJECT</span>
                              <span className="xs:hidden">LIVE</span>
                            </>
                          ) : (
                            <>
                              <Award className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                              <span className="hidden xs:inline">COMPLETED</span>
                              <span className="xs:hidden">DONE</span>
                            </>
                          )}
                        </motion.div>

                        {project.featured && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, type: "spring" }}
                            className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 bg-amber-500/30 backdrop-blur-xl text-amber-200 rounded-full text-[10px] sm:text-xs md:text-sm font-bold tracking-wide border border-amber-400/30 shadow-2xl flex items-center gap-1 sm:gap-2"
                          >
                            <Sparkles className="h-2 w-2 sm:h-3 sm:w-3 md:h-4 md:w-4" />
                            <span className="hidden xs:inline">FEATURED</span>
                            <span className="xs:hidden">HOT</span>
                          </motion.div>
                        )}
                      </div>
                      
                      {/* Title */}
                      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black mb-2 sm:mb-3 md:mb-4 leading-tight tracking-tighter max-w-5xl">
                        {project.title.split(' ').map((word, i, arr) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 + i * 0.05 }}
                            className="inline-block mr-[0.2em] sm:mr-[0.3em]"
                          >
                            {word}
                            {i < arr.length - 1 && ' '}
                          </motion.span>
                        ))}
                      </h1>
                      
                      {/* Client */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex items-center gap-2 sm:gap-3 md:gap-4 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light"
                      >
                        <div className={`p-1.5 sm:p-2 md:p-2.5 lg:p-3 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/20`}>
                          <Building2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" />
                        </div>
                        <span className="truncate">{project.client}</span>
                      </motion.div>

                      {/* Quick Stats */}
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9 }}
                        className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8"
                      >
                        <div className="flex items-center gap-1 sm:gap-2">
                          <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
                          <span className="text-white/80 text-xs sm:text-sm truncate max-w-[100px] sm:max-w-[150px] md:max-w-none">
                            {project.location}
                          </span>
                        </div>
                        {project.duration && (
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
                            <span className="text-white/80 text-xs sm:text-sm">{project.duration}</span>
                          </div>
                        )}
                        {project.year && (
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-white/60" />
                            <span className="text-white/80 text-xs sm:text-sm">{project.year}</span>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Scroll Indicator */}
                  <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 z-30"
                  >
                    <ChevronDown className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white/60" />
                  </motion.div>
                </motion.div>

                {/* Content Section */}
                {isModalReady && (
                  <div className="bg-white">
                    {/* Tab Navigation - Responsive */}
                    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-gray-200 overflow-x-auto hide-scrollbar">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
                        <div className="flex gap-4 sm:gap-6 md:gap-8 min-w-max">
                          {[
                            { id: 'overview', label: 'Overview', icon: Info },
                            { id: 'scope', label: 'Scope', icon: FileText },
                            { id: 'gallery', label: 'Gallery', icon: Camera, count: validImages.length }
                          ].map((tab) => (
                            <motion.button
                              key={tab.id}
                              whileHover={{ y: -1 }}
                              whileTap={{ y: 0 }}
                              onClick={() => setActiveTab(tab.id as typeof activeTab)}
                              className={`relative py-2 sm:py-3 md:py-4 px-1 sm:px-2 text-xs sm:text-sm font-bold tracking-wide transition-colors flex items-center gap-1 sm:gap-2 whitespace-nowrap ${
                                activeTab === tab.id ? 'text-gray-900' : 'text-gray-400 hover:text-gray-600'
                              }`}
                            >
                              <tab.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                              <span className="hidden xs:inline">{tab.label}</span>
                              {tab.count && tab.count > 1 && (
                                <span className={`ml-0.5 sm:ml-1 px-1 sm:px-1.5 py-0.5 rounded-full text-[10px] sm:text-xs ${
                                  activeTab === tab.id 
                                    ? `bg-gradient-to-r ${sectorConfig.primary} text-white` 
                                    : 'bg-gray-100 text-gray-600'
                                }`}>
                                  {tab.count}
                                </span>
                              )}
                              {activeTab === tab.id && (
                                <motion.div
                                  layoutId="activeTab"
                                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${sectorConfig.primary}`}
                                />
                              )}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-12 lg:gap-16">
                        {/* Main Content Area */}
                        <div className="lg:col-span-2 space-y-8 sm:space-y-12 md:space-y-16">
                          {/* Overview Section */}
                          <AnimatePresence mode="wait">
                            {activeTab === 'overview' && (
                              <motion.section
                                key="overview"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                                  <div className={`w-1 sm:w-1.5 md:w-2 h-10 sm:h-12 md:h-16 bg-gradient-to-b ${sectorConfig.primary} rounded-full`} />
                                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                                    Project Overview
                                  </h2>
                                </div>
                                <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
                                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                                    {project.description || project.scopeOfWork}
                                  </p>
                                </div>

                                {/* Key Metrics - Responsive Grid */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 mt-6 sm:mt-8 md:mt-12">
                                  <motion.div
                                    whileHover={{ y: -2 }}
                                    className="text-center p-2 sm:p-3 md:p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200"
                                  >
                                    <HardHat className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${sectorConfig.text} mx-auto mb-1 sm:mb-2`} />
                                    <div className="text-base sm:text-lg md:text-2xl font-black text-gray-900">50+</div>
                                    <div className="text-[10px] sm:text-xs text-gray-500">Workers</div>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ y: -2 }}
                                    className="text-center p-2 sm:p-3 md:p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200"
                                  >
                                    <Shield className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${sectorConfig.text} mx-auto mb-1 sm:mb-2`} />
                                    <div className="text-base sm:text-lg md:text-2xl font-black text-gray-900">100%</div>
                                    <div className="text-[10px] sm:text-xs text-gray-500">Safety</div>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ y: -2 }}
                                    className="text-center p-2 sm:p-3 md:p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200"
                                  >
                                    <TrendingUp className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${sectorConfig.text} mx-auto mb-1 sm:mb-2`} />
                                    <div className="text-base sm:text-lg md:text-2xl font-black text-gray-900">24/7</div>
                                    <div className="text-[10px] sm:text-xs text-gray-500">Ops</div>
                                  </motion.div>
                                  <motion.div
                                    whileHover={{ y: -2 }}
                                    className="text-center p-2 sm:p-3 md:p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl border border-gray-200"
                                  >
                                    <Globe className={`h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 ${sectorConfig.text} mx-auto mb-1 sm:mb-2`} />
                                    <div className="text-base sm:text-lg md:text-2xl font-black text-gray-900">ISO</div>
                                    <div className="text-[10px] sm:text-xs text-gray-500">Certified</div>
                                  </motion.div>
                                </div>
                              </motion.section>
                            )}

                            {/* Scope of Work */}
                            {activeTab === 'scope' && project.scopeOfWork && (
                              <motion.section
                                key="scope"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                                  <div className={`w-1 sm:w-1.5 md:w-2 h-10 sm:h-12 md:h-16 bg-gradient-to-b ${sectorConfig.primary} rounded-full`} />
                                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                                    Scope of Work
                                  </h2>
                                </div>
                                <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200">
                                  <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                                    {project.scopeOfWork}
                                  </p>
                                </div>

                                {/* Technical Specifications */}
                                <div className="mt-8 sm:mt-10 md:mt-12">
                                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-4 sm:mb-5 md:mb-6 flex items-center gap-2">
                                    <Ruler className={`h-4 w-4 sm:h-5 sm:w-5 ${sectorConfig.text}`} />
                                    Technical Specs
                                  </h3>
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                    {project.capacity && (
                                      <motion.div
                                        whileHover={{ x: 2 }}
                                        className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200"
                                      >
                                        <div className={`p-1.5 sm:p-2 bg-gradient-to-r ${sectorConfig.primary} rounded-lg sm:rounded-xl`}>
                                          <Factory className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                          <div className="text-[10px] sm:text-xs text-gray-500">Capacity</div>
                                          <div className="text-xs sm:text-sm md:text-base font-bold text-gray-900 truncate">{project.capacity}</div>
                                        </div>
                                      </motion.div>
                                    )}
                                    {project.duration && (
                                      <motion.div
                                        whileHover={{ x: 2 }}
                                        className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl border border-gray-200"
                                      >
                                        <div className={`p-1.5 sm:p-2 bg-gradient-to-r ${sectorConfig.primary} rounded-lg sm:rounded-xl`}>
                                          <Clock className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                                        </div>
                                        <div className="min-w-0">
                                          <div className="text-[10px] sm:text-xs text-gray-500">Duration</div>
                                          <div className="text-xs sm:text-sm md:text-base font-bold text-gray-900 truncate">{project.duration}</div>
                                        </div>
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                              </motion.section>
                            )}

                            {/* Gallery Grid */}
                            {activeTab === 'gallery' && validImages.length > 0 && (
                              <motion.section
                                key="gallery"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -15 }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-8">
                                  <div className={`w-1 sm:w-1.5 md:w-2 h-10 sm:h-12 md:h-16 bg-gradient-to-b ${sectorConfig.primary} rounded-full`} />
                                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight">
                                    Project Gallery
                                  </h2>
                                </div>
                                
                                <div className={`grid gap-2 sm:gap-3 md:gap-4 transition-all duration-500 ${
                                  isGalleryExpanded ? 'grid-cols-1' : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3'
                                }`}>
                                  {validImages.map((image, index) => (
                                    <motion.div
                                      key={image.id}
                                      initial={{ opacity: 0, scale: 0.9 }}
                                      whileInView={{ opacity: 1, scale: 1 }}
                                      viewport={{ once: true, margin: "-50px" }}
                                      transition={{ delay: index * 0.05 }}
                                      whileHover={{ y: -4 }}
                                      onClick={() => setCurrentImageIndex(index)}
                                      className={`relative rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden cursor-pointer group bg-gray-100 shadow-md hover:shadow-xl transition-all duration-500 ${
                                        isGalleryExpanded ? 'aspect-video' : 'aspect-square'
                                      }`}
                                    >
                                      <Image
                                        src={image.url}
                                        alt={image.caption || project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 25vw"
                                        unoptimized
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                      
                                      <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 md:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                        <p className="text-white text-[10px] sm:text-xs md:text-sm font-medium truncate">
                                          {image.caption || `View ${index + 1}`}
                                        </p>
                                      </div>

                                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className={`p-1.5 sm:p-2 md:p-3 bg-gradient-to-r ${sectorConfig.primary} rounded-full shadow-2xl`}>
                                          <Maximize2 className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white" />
                                        </div>
                                      </div>

                                      {index === currentImageIndex && (
                                        <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-rose-600 text-white rounded-full text-[8px] sm:text-[10px] font-bold">
                                          CURRENT
                                        </div>
                                      )}
                                    </motion.div>
                                  ))}
                                </div>

                                {validImages.length > 6 && (
                                  <motion.button
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => setIsGalleryExpanded(!isGalleryExpanded)}
                                    className="mt-4 sm:mt-6 md:mt-8 w-full py-2 sm:py-2.5 md:py-3 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl text-gray-700 text-xs sm:text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 transition-colors"
                                  >
                                    <Layers className="h-3 w-3 sm:h-4 sm:w-4" />
                                    {isGalleryExpanded ? 'Show Less' : `Show All ${validImages.length}`}
                                  </motion.button>
                                )}
                              </motion.section>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                          <div className="sticky top-20 sm:top-24 space-y-4 sm:space-y-6 md:space-y-8">
                            {/* Key Information Card */}
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              className={`bg-gradient-to-br from-gray-50 to-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 border border-gray-200 shadow-lg`}
                            >
                              <h3 className="text-lg sm:text-xl md:text-2xl font-black text-gray-900 mb-4 sm:mb-5 md:mb-6 tracking-tight flex items-center gap-2">
                                <Info className={`h-4 w-4 sm:h-5 sm:w-5 ${sectorConfig.text}`} />
                                Details
                              </h3>
                              
                              <div className="space-y-3 sm:space-y-4 md:space-y-5">
                                <DetailItem 
                                  icon={<MapPin />} 
                                  label="Location" 
                                  value={project.location} 
                                  config={sectorConfig}
                                />
                                <DetailItem 
                                  icon={<Building2 />} 
                                  label="Client" 
                                  value={project.client} 
                                  config={sectorConfig}
                                />
                                <DetailItem 
                                  icon={<Briefcase />} 
                                  label="Role" 
                                  value={project.companyRole} 
                                  config={sectorConfig}
                                />
                                
                                {project.capacity && (
                                  <DetailItem 
                                    icon={<Shield />} 
                                    label="Capacity" 
                                    value={project.capacity} 
                                    highlight 
                                    config={sectorConfig}
                                  />
                                )}
                                
                                {project.duration && (
                                  <DetailItem 
                                    icon={<Clock />} 
                                    label="Duration" 
                                    value={project.duration} 
                                    config={sectorConfig}
                                  />
                                )}
                                
                                {project.year && (
                                  <DetailItem 
                                    icon={<Calendar />} 
                                    label="Year" 
                                    value={project.year.toString()} 
                                    config={sectorConfig}
                                  />
                                )}
                              </div>

                              {/* Progress Bar */}
                              {project.status === 'ONGOING' && (
                                <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gray-200">
                                  <div className="flex justify-between text-xs sm:text-sm mb-1 sm:mb-2">
                                    <span className="text-gray-600 font-medium">Progress</span>
                                    <span className={`font-black ${sectorConfig.text}`}>65%</span>
                                  </div>
                                  <div className="h-2 sm:h-2.5 md:h-3 bg-gray-200 rounded-full overflow-hidden">
                                    <motion.div
                                      initial={{ width: 0 }}
                                      whileInView={{ width: '65%' }}
                                      transition={{ duration: 1, delay: 0.5 }}
                                      className={`h-full bg-gradient-to-r ${sectorConfig.primary} rounded-full`}
                                    />
                                  </div>
                                </div>
                              )}
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.1 }}
                              className="space-y-2 sm:space-y-2.5 md:space-y-3"
                            >
                              <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className={`w-full bg-gradient-to-r ${sectorConfig.primary} text-white hover:shadow-xl rounded-xl sm:rounded-2xl h-12 sm:h-14 md:h-16 font-bold tracking-wide shadow-lg flex items-center justify-center gap-2 group relative overflow-hidden text-sm sm:text-base`}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-white/20"
                                  initial={{ x: '-100%' }}
                                  whileHover={{ x: '100%' }}
                                  transition={{ duration: 0.5 }}
                                />
                                <Download className="h-4 w-4 sm:h-5 sm:w-5 group-hover:animate-bounce" />
                                <span className="hidden xs:inline">Download Brief</span>
                                <span className="xs:hidden">Brief</span>
                              </motion.button>
                              
                              <div className="relative">
                                <motion.button
                                  whileHover={{ scale: 1.01 }}
                                  whileTap={{ scale: 0.99 }}
                                  onClick={() => setShowShareMenu(!showShareMenu)}
                                  className="w-full bg-white border border-gray-200 text-gray-900 hover:border-gray-300 hover:bg-gray-50 rounded-xl sm:rounded-2xl h-12 sm:h-14 md:h-16 font-bold tracking-wide shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group text-sm sm:text-base"
                                >
                                  <Share2 className="h-4 w-4 sm:h-5 sm:w-5 group-hover:rotate-12 transition-transform" />
                                  <span className="hidden xs:inline">Share</span>
                                  <span className="xs:hidden">Share</span>
                                </motion.button>

                                {/* Share Menu */}
                                <AnimatePresence>
                                  {showShareMenu && (
                                    <motion.div
                                      initial={{ opacity: 0, y: -8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -8 }}
                                      className="absolute bottom-full left-0 right-0 mb-2 bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 p-1 sm:p-2"
                                    >
                                      {[
                                        { icon: Linkedin, label: 'LinkedIn', color: 'text-blue-600' },
                                        { icon: Twitter, label: 'Twitter', color: 'text-sky-500' },
                                        { icon: Facebook, label: 'Facebook', color: 'text-blue-600' },
                                        { icon: Mail, label: 'Email', color: 'text-gray-600' },
                                      ].map((item) => (
                                        <motion.button
                                          key={item.label}
                                          whileHover={{ x: 2 }}
                                          className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-colors"
                                        >
                                          <item.icon className={`h-3 w-3 sm:h-4 sm:w-4 ${item.color}`} />
                                          <span className="text-xs sm:text-sm font-medium text-gray-700">{item.label}</span>
                                        </motion.button>
                                      ))}
                                      <div className="border-t border-gray-200 my-1" />
                                      <motion.button
                                        whileHover={{ x: 2 }}
                                        onClick={copyToClipboard}
                                        className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-colors"
                                      >
                                        {copied ? (
                                          <>
                                            <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                                            <span className="text-xs sm:text-sm font-medium text-green-600">Copied!</span>
                                          </>
                                        ) : (
                                          <>
                                            <Link2 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600" />
                                            <span className="text-xs sm:text-sm font-medium text-gray-700">Copy Link</span>
                                          </>
                                        )}
                                      </motion.button>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            </motion.div>

                            {/* Related Links */}
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.2 }}
                              className="space-y-1 sm:space-y-1.5 md:space-y-2"
                            >
                              <motion.a
                                whileHover={{ x: 2 }}
                                href="#"
                                className="flex items-center justify-between p-2 sm:p-3 md:p-4 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-colors group"
                              >
                                <span className="text-xs sm:text-sm font-medium text-gray-700">Similar Projects</span>
                                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-gray-600" />
                              </motion.a>
                              <motion.a
                                whileHover={{ x: 2 }}
                                href="#"
                                className="flex items-center justify-between p-2 sm:p-3 md:p-4 hover:bg-gray-50 rounded-lg sm:rounded-xl transition-colors group"
                              >
                                <span className="text-xs sm:text-sm font-medium text-gray-700">Portfolio</span>
                                <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-gray-600" />
                              </motion.a>
                            </motion.div>

                            {/* Project Meta */}
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: 0.3 }}
                              className="pt-4 sm:pt-5 md:pt-6"
                            >
                              <p className="text-[8px] sm:text-[10px] font-mono text-gray-400 tracking-wider text-center">
                                PROJECT ID
                              </p>
                              <p className="text-[10px] sm:text-xs font-mono text-gray-600 tracking-wider text-center mt-0.5 sm:mt-1 font-bold">
                                {project.id.slice(-8).toUpperCase()}
                              </p>
                              <p className="text-[8px] sm:text-[10px] text-gray-400 text-center mt-1 sm:mt-2">
                                {new Date(project.updatedAt).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </p>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Footer CTA */}
                {isModalReady && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={`bg-gradient-to-br ${sectorConfig.dark} text-white py-10 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 opacity-10">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                        className="absolute -top-1/2 -right-1/2 w-[400px] sm:w-[600px] md:w-[800px] h-[400px] sm:h-[600px] md:h-[800px] bg-gradient-to-r from-white/20 to-transparent rounded-full"
                      />
                      <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                        className="absolute -bottom-1/2 -left-1/2 w-[300px] sm:w-[400px] md:w-[600px] h-[300px] sm:h-[400px] md:h-[600px] bg-gradient-to-r from-white/10 to-transparent rounded-full"
                      />
                    </div>

                    <div className="max-w-7xl mx-auto text-center relative z-10">
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black mb-3 sm:mb-4 md:mb-5 lg:mb-6 tracking-tight"
                      >
                        Start Your Next Project?
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 font-light mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-4"
                      >
                        Let&apos;s discuss how we can help
                      </motion.p>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center px-4"
                      >
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 bg-white text-gray-900 rounded-xl sm:rounded-2xl font-black tracking-wide shadow-2xl flex items-center justify-center gap-2 text-sm sm:text-base md:text-lg`}
                        >
                          <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                          <span className="hidden xs:inline">Contact Us</span>
                          <span className="xs:hidden">Contact</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 bg-white/10 backdrop-blur-xl border border-white/30 text-white rounded-xl sm:rounded-2xl font-black tracking-wide hover:bg-white/20 shadow-2xl text-sm sm:text-base md:text-lg"
                        >
                          Portfolio
                        </motion.button>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Scroll to Top Button */}
              <AnimatePresence>
                {showScrollTop && isModalReady && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className={`absolute bottom-3 sm:bottom-4 md:bottom-6 lg:bottom-8 right-3 sm:right-4 md:right-6 lg:right-8 p-2 sm:p-3 md:p-4 bg-gradient-to-r ${sectorConfig.primary} text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-40`}
                    aria-label="Scroll to top"
                  >
                    <ChevronUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}