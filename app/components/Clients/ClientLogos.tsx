// app/components/Clients/ClientLogos.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Sparkles, 
  Award, 
  CheckCircle,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Client } from '@/types/client';

export default function ClientLogos() {
  const [clients, setClients] = useState<Client[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`);
      const data = await res.json();
      if (data.success) {
        const activeClients = data.data
          .filter((client: Client) => client.isActive)
          .sort((a: Client, b: Client) => a.order - b.order);
        setClients(activeClients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isHovered || clients.length === 0) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % clients.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered, clients.length]);

  const nextSlide = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % clients.length);
    setIsHovered(true);
    setTimeout(() => setIsHovered(false), 10000);
  };

  const prevSlide = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + clients.length) % clients.length);
    setIsHovered(true);
    setTimeout(() => setIsHovered(false), 10000);
  };

  if (loading) {
    return (
      <section className="site-canvas py-20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-96 bg-[#d8e4f5] rounded-2xl"></div>
          </div>
        </div>
      </section>
    );
  }

  if (clients.length === 0) return null;

  const activeClient = clients[activeIndex];

  return (
    <section ref={containerRef} className="site-canvas relative overflow-hidden py-20">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-50 rounded-full blur-3xl opacity-30" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header with Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-6">
            <Building2 className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700">OUR PARTNERS & CLIENTS</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-(--brand-navy) mb-4">
            Trusted by{' '}
            <span className="bg-linear-to-r from-red-600 to-[var(--brand-red)] bg-clip-text text-transparent">
              Industry Leaders
            </span>
          </h2>
          <p className="text-(--brand-muted) text-lg">
            Partnering with leading organizations to deliver critical energy infrastructure across Bangladesh
          </p>
        </motion.div>

        {/* Featured Client Showcase */}
        <div className="max-w-6xl mx-auto">
          {/* Navigation Arrows */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white border border-[#d8e4f5] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white border border-[#d8e4f5] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-300"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Client Spotlight Card */}
          <div 
            className="relative bg-linear-to-br from-[var(--brand-navy)] to-[var(--brand-navy)] rounded-3xl overflow-hidden shadow-2xl"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Animated Border Glow */}
            <div className="absolute inset-0 bg-linear-to-r from-red-500 via-[var(--brand-red)] to-[var(--brand-red)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px', borderRadius: 'inherit' }} />
            
            <div className="relative bg-linear-to-br from-[var(--brand-navy)] to-[var(--brand-navy)] rounded-3xl p-8 md:p-12">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeClient.id}
                  custom={direction}
                  initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="grid md:grid-cols-2 gap-8 items-center"
                >
                  {/* Logo Section */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-red-500 to-[var(--brand-red)] rounded-2xl blur-2xl opacity-30 animate-pulse" />
                    <div className="relative bg-white rounded-2xl p-8 flex items-center justify-center min-h-75 shadow-xl">
                      <div className="relative w-full h-48">
                        <Image
                          src={activeClient.logoUrl}
                          alt={activeClient.name}
                          fill
                          className="object-contain"
                          priority
                        />
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className="text-white space-y-4">
                    <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Sparkles className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium text-red-300">Trusted Partner</span>
                    </div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">
                      {activeClient.name}
                    </h3>
                    
                    {activeClient.website && (
                      <a 
                        href={activeClient.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-blue-50/80 hover:text-red-400 transition-colors"
                      >
                        Visit Website →
                      </a>
                    )}
                    
                    <div className="pt-4">
                      <div className="flex items-center gap-2 text-sm text-(--brand-muted)">
                        <CheckCircle className="w-4 h-4 text-[var(--brand-blue)]" />
                        <span>Verified Partner</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Progress Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {clients.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setDirection(index > activeIndex ? 1 : -1);
                      setActiveIndex(index);
                    }}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === activeIndex 
                        ? 'w-8 bg-red-500' 
                        : 'w-4 bg-blue-800 hover:bg-[#eef4ff]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Client Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-(--brand-navy)">All Partners & Clients</h3>
              <span className="text-sm text-(--brand-muted)">{clients.length} Organizations</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {clients.map((client, index) => (
                <motion.button
                  key={client.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  className={`relative group p-4 bg-white rounded-xl border-2 transition-all duration-300 ${
                    index === activeIndex 
                      ? 'border-red-500 shadow-lg shadow-red-100' 
                      : 'border-[#eef4ff] hover:border-red-200 hover:shadow-md'
                  }`}
                >
                  <div className="relative h-16 w-full">
                    <Image
                      src={client.logoUrl}
                      alt={client.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {index === activeIndex && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center mt-12"
          >
            <div className="inline-flex items-center gap-3 bg-linear-to-r from-red-50 to-red-50 px-6 py-3 rounded-full border border-red-200 shadow-sm">
              <Award className="w-5 h-5 text-red-600" />
              <span className="text-sm text-[var(--brand-copy)]">
                Enlisted with PetroBangla, TITAS GAS, JALALABAD GAS, PGCL • Since 1977
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
