// app/components/projects/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { Briefcase, Target, Award, Clock, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  stats: {
    total: number;
    completed: number;
    ongoing: number;
    sectors: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const statCards = [
    { icon: Briefcase, value: stats.total.toString(), label: 'Total Projects', color: 'from-red-500 to-red-700' },
    { icon: Clock, value: stats.ongoing.toString(), label: 'Active Projects', color: 'from-gray-500 to-gray-700' },
    { icon: Award, value: stats.completed.toString(), label: 'Completed', color: 'from-red-500 to-red-700' },
    { icon: Target, value: stats.sectors.toString(), label: 'Sectors', color: 'from-gray-500 to-gray-700' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full mb-6"
          >
            <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
            <span className="text-xs md:text-sm font-semibold text-red-700 tracking-wider">
              OUR PORTFOLIO
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4"
          >
            <span className="text-gray-900">Featured</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
              Projects
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-12"
          >
            Discover our portfolio of successful energy infrastructure projects across Bangladesh
          </motion.p>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {statCards.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className={`inline-flex p-2 md:p-3 rounded-lg bg-gradient-to-br ${stat.color} mb-3`}>
                  <stat.icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12"
          >
            <Button
              asChild
              size="lg"
              className="group bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-6 text-base rounded-xl font-semibold transition-all duration-300"
            >
              <Link href="/contact">
                <span className="mr-3">Discuss Your Project</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}