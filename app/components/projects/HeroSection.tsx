// app/components/projects/HeroSection.tsx (Fixed gradient classes)
'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  stats: {
    total: number;
    completed: number;
    ongoing: number;
    sectors: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center bg-white overflow-hidden">
      {/* Minimal background - Fixed gradient classes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-gradient-to-br from-gray-50 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-gray-50 to-transparent" />
      </div>

      <div className="container relative mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <span className="text-xs font-medium text-gray-400 tracking-widest uppercase">
              Our Portfolio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-bold text-gray-900 mb-6 tracking-tight"
          >
            Projects
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto"
          >
            Engineering excellence in energy infrastructure
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.total}</div>
              <div className="text-xs text-gray-400 mt-1">Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{stats.ongoing}</div>
              <div className="text-xs text-gray-400 mt-1">Ongoing</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600">{stats.completed}</div>
              <div className="text-xs text-gray-400 mt-1">Completed</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <ArrowDown className="h-5 w-5 text-gray-300" />
      </motion.div>
    </section>
  );
}