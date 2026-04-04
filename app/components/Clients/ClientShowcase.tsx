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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="h-96 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </section>
    );
  }

  if (clients.length === 0) return null;

  const activeClient = clients[activeIndex];

  return (
    <section ref={containerRef} className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700">OUR PARTNERS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Trusted by{' '}
            <span className="text-red-600">Industry Leaders</span>
          </h2>
          <p className="text-gray-600 mt-4">
            We partner with the most respected organizations in the energy sector
          </p>
        </motion.div>

        {/* Main Showcase */}
        <div className="max-w-6xl mx-auto">
          {/* Navigation */}
          <div className="flex justify-end gap-2 mb-4">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white border border-gray-200 hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
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
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
                {/* Logo Section */}
                <div className="bg-white rounded-xl p-8 flex items-center justify-center min-h-[250px]">
                  <div className="relative w-full h-32">
                    <Image
                      src={activeClient.logoUrl}
                      alt={activeClient.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Info Section */}
                <div className="text-white space-y-4">
                  <div className="inline-flex items-center gap-2 bg-red-600/20 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-red-300">Active Partner</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold">{activeClient.name}</h3>
                  {activeClient.website && (
                    <a
                      href={activeClient.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <p className="text-gray-300 text-sm leading-relaxed">
                    A valued partner in Bangladesh's energy infrastructure development, contributing to major projects across oil, gas, and power sectors.
                  </p>
                </div>
              </div>

              {/* Progress Dots */}
              <div className="flex justify-center gap-2 pb-8">
                {clients.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`h-1 rounded-full transition-all ${
                      index === activeIndex ? 'w-8 bg-red-500' : 'w-3 bg-gray-600'
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
            className="mt-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">All Partners</h3>
              <span className="text-sm text-gray-500">{clients.length} Organizations</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {clients.map((client, index) => (
                <motion.button
                  key={client.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setActiveIndex(index)}
                  className={`p-4 bg-white rounded-xl border-2 transition-all ${
                    index === activeIndex
                      ? 'border-red-500 shadow-lg shadow-red-100'
                      : 'border-gray-100 hover:border-red-200 hover:shadow-md'
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