// app/components/projects/HeroSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, Award, Briefcase, CalendarClock, Clock, Target } from 'lucide-react';
import Link from 'next/link';

interface HeroSectionProps {
  stats: {
    total: number;
    completed: number;
    ongoing: number;
    upcoming: number;
    sectors: number;
  };
}

export function HeroSection({ stats }: HeroSectionProps) {
  const statCards = [
    { icon: Briefcase, value: stats.total.toString(), label: 'Total', color: 'bg-red-600 text-white' },
    { icon: CalendarClock, value: stats.upcoming.toString(), label: 'Upcoming', color: 'bg-[#eef4ff] text-[var(--brand-blue)]' },
    { icon: Clock, value: stats.ongoing.toString(), label: 'Active', color: 'bg-blue-950 text-white' },
    { icon: Award, value: stats.completed.toString(), label: 'Done', color: 'bg-red-50 text-red-700' },
    { icon: Target, value: stats.sectors.toString(), label: 'Sectors', color: 'bg-[#eef4ff] text-[var(--brand-copy)]' },
  ];

  return (
    <section className="relative overflow-hidden border-b border-[#d8e4f5] bg-white py-4 md:py-5">
      <motion.div
        aria-hidden="true"
        initial={{ x: '-20%' }}
        animate={{ x: '20%' }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-red-500/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"
      />
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between"
          >
            <div className="flex min-w-0 flex-col gap-2 lg:flex-row lg:items-center lg:gap-4">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-red-100 bg-red-50 px-2.5 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600 shadow-[0_0_0_3px_rgba(220,38,38,0.12)]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-red-700">
                  Portfolio
                </span>
              </div>
              <p className="max-w-xl truncate text-sm font-semibold text-(--brand-muted)">
                Energy infrastructure delivery references across Bangladesh.
              </p>
            </div>

            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap lg:flex-nowrap">
                {statCards.map((stat) => (
                  <div
                    key={stat.label}
                    className="group flex h-11 min-w-[118px] items-center gap-2 rounded-lg border border-[#d8e4f5] bg-white/90 px-2.5 shadow-sm backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                  >
                    <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md ${stat.color}`}>
                      <stat.icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base font-extrabold leading-none text-(--brand-navy)">
                        {stat.value}
                      </div>
                      <div className="mt-0.5 truncate text-[11px] font-bold text-(--brand-muted)">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/contact"
                className="group inline-flex h-11 w-fit shrink-0 items-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-extrabold text-white shadow-sm shadow-red-600/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-md"
              >
                Discuss
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
