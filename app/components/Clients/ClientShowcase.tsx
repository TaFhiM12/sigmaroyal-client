// app/components/Clients/ClientShowcase.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';
import { Client } from '@/types/client';

export default function ClientShowcase() {
  const [clients, setClients] = useState<Client[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`);
      const data = await res.json();
      if (data.success) {
        const activeClients = data.data.filter((c: Client) => c.isActive).sort((a: Client, b: Client) => a.order - b.order);
        setClients(activeClients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % clients.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + clients.length) % clients.length);

  if (loading) {
    return (
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-72 bg-[#eef4ff] rounded-lg animate-pulse" />
        </div>
      </section>
    );
  }

  if (clients.length === 0) return null;

  const activeClient = clients[activeIndex];

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-white py-8">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-5 flex flex-col gap-3 rounded-lg border border-[#d8e4f5] bg-white/90 px-4 py-3 shadow-sm md:flex-row md:items-center md:justify-between"
        >
          <div className="flex min-w-0 flex-col gap-2 md:flex-row md:items-center md:gap-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-red-700">
              <Sparkles className="h-3.5 w-3.5" />
              Partners
            </span>
            <p className="truncate text-sm font-semibold text-[var(--brand-muted)]">
              Trusted organizations across Bangladesh energy infrastructure.
            </p>
          </div>
          <span className="h-1.5 w-16 rounded-full bg-red-600" />
        </motion.div>

        {/* Main Showcase */}
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-end gap-2 mb-3">
            <button
              onClick={prevSlide}
              className="rounded-lg border border-[#d8e4f5] bg-white p-2 text-[var(--brand-muted)] shadow-sm transition-all hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="rounded-lg border border-[#d8e4f5] bg-white p-2 text-[var(--brand-muted)] shadow-sm transition-all hover:bg-red-600 hover:text-white hover:border-red-600"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Featured Client Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeClient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden rounded-lg border border-slate-800 bg-linear-to-br from-slate-950 to-[var(--brand-navy)] shadow-xl"
            >
              <div className="grid gap-5 p-5 md:grid-cols-[280px_1fr] md:p-6">
                {/* Logo Section */}
                <div className="flex min-h-40 items-center justify-center rounded-lg bg-white p-6">
                  <div className="relative h-28 w-full">
                    <Image
                      src={activeClient.logoUrl}
                      alt={activeClient.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="space-y-3 text-white">
                  <div className="inline-flex items-center gap-2 bg-red-600/20 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-[var(--brand-blue)] rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-red-300">Active Partner</span>
                  </div>
                  <h3 className="text-2xl font-extrabold">{activeClient.name}</h3>
                  {activeClient.website && (
                    <a
                      href={activeClient.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-50/80 hover:text-red-400 transition-colors"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <p className="text-sm leading-relaxed text-blue-50/80">
                    A valued partner in Bangladesh's energy infrastructure development, contributing to major projects across oil, gas, and power sectors.
                  </p>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pb-5">
                {clients.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 rounded-full transition-all ${
                      index === activeIndex ? 'w-8 bg-red-500' : 'w-3 bg-blue-800'
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Client Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--brand-muted)]">All Partners</h3>
              <span className="text-sm font-semibold text-[var(--brand-muted)]">{clients.length} Organizations</span>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {clients.map((client, index) => (
                <motion.button
                  key={client.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setActiveIndex(index)}
                  className={`relative rounded-lg border bg-white p-3 transition-all ${
                    index === activeIndex
                      ? 'border-red-500 shadow-md shadow-red-100'
                      : 'border-[#d8e4f5] hover:border-red-200 hover:shadow-md'
                  }`}
                >
                  <div className="relative h-12 w-full">
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
        </div>
      </div>
    </section>
  );
}
