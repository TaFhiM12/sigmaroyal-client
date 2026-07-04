// app/components/Clients/ClientStats.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Briefcase, Award, CheckCircle, Building2 } from 'lucide-react';
import { useCompanyStats } from '@/hooks/useCompanyStats';

export default function ClientStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const companyStats = useCompanyStats();

  const stats = [
    { icon: Building2, value: companyStats?.clients ?? 0, label: 'Active Clients', color: 'from-blue-500 to-[var(--brand-blue)]' },
    { icon: Briefcase, value: companyStats?.projects.total ?? 0, label: 'Projects Recorded', color: 'from-[var(--brand-blue)] to-[var(--brand-blue)]' },
    { icon: Users, value: companyStats?.teamMembers ?? 0, label: 'Team Members', color: 'from-[var(--brand-red)] to-[var(--brand-red)]' },
    { icon: Award, value: companyStats?.certifications ?? 0, label: 'Active Certifications', color: 'from-[var(--brand-blue)] to-[var(--brand-blue)]' },
  ].filter((stat) => stat.value > 0);

  return (
    <section ref={ref} className="py-16 bg-linear-to-b from-[#f7faff] to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-navy)]">
            Partnership <span className="text-red-600">Impact</span>
          </h2>
          <p className="text-[var(--brand-muted)] mt-2">Building lasting relationships that drive success</p>
        </motion.div>

        {stats.length > 0 && <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-[#eef4ff] hover:shadow-xl transition-all">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[var(--brand-navy)] mb-2">
                  {stat.value}
                </div>
                <div className="text-[var(--brand-muted)] text-sm font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>}

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-[#eef4ff] rounded-full">
            <CheckCircle className="w-4 h-4 text-[var(--brand-blue)]" />
            <span className="text-sm text-[var(--brand-copy)]">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-[var(--brand-copy)]">Government Enlisted</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
