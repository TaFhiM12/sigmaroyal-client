// app/components/Clients/ClientStats.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Clock, Trophy, Award, CheckCircle, Building2, TrendingUp } from 'lucide-react';

export default function ClientStats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { icon: Users, value: '50+', label: 'Active Partnerships', color: 'from-blue-500 to-cyan-500' },
    { icon: Clock, value: '25+', label: 'Years Average Partnership', color: 'from-green-500 to-emerald-500' },
    { icon: Trophy, value: '98%', label: 'Retention Rate', color: 'from-yellow-500 to-orange-500' },
    { icon: Award, value: 'ISO', label: 'Quality Certified', color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <section ref={ref} className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Partnership <span className="text-red-600">Impact</span>
          </h2>
          <p className="text-gray-600 mt-2">Building lasting relationships that drive success</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-gray-700">ISO 9001:2015</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-700">Government Enlisted</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-full">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-gray-700">100% Compliance</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}