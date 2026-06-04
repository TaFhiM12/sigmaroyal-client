'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { 
  Clock,
  Award,
  Briefcase,
  Users,
} from 'lucide-react';
import yearsExperience from '@/lib/yearsExperience';

export default function PrefaceContent() {
  const textRef = useRef<HTMLDivElement>(null);
  const isTextInView = useInView(textRef, { once: true, amount: 0.3 });

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  

  return (
    <section className="relative bg-linear-to-b from-slate-50 to-white py-12 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/8 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          ref={textRef}
          variants={staggerContainer}
          initial="hidden"
          animate={isTextInView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Main Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Text Content */}
            <div className="space-y-8">
              {/* Title Section */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <div className="section-kicker">
                  <Clock className="w-4 h-4 text-blue-700" />
                  <span>SINCE 1977</span>
                </div>
                
                <h2 className="section-title">
                  <span>Pioneering</span>
                  <br />
                  <span className="brand-text-gradient">
                    Energy Excellence
                  </span>
                </h2>
                <div className="section-underline" />
              </motion.div>

              {/* Description */}
              <motion.div variants={fadeInUp} className="space-y-4">
                <p className="section-copy">
                  <span className="font-bold text-gray-900">The Royal Utilisation Services (Pvt.) Ltd</span>
                  , together with{' '}
                  <span className="font-bold text-gray-900">Sigma Construction Company</span>
                  , stands as a pioneer in Bangladesh&apos;s energy sector with over{' '}
                  <span className="font-bold text-red-600">{yearsExperience} years</span> of experience since 1977.
                </p>
                
                <p className="section-copy">
                  We are one of the leading infrastructure developer in Oil, Gas and Power Sector in Bangladesh pursuing business in Pipeline Construction including Mechanical, Electrical & Civil works.
                </p>

                <p className="section-copy">
                  Recently we stepped in the business relating to LPG covering reticulated system,{' '}
                  <span className="font-medium text-red-600">Auto LPG Dispensing Station (ALDS)</span>,{' '}
                  <span className="font-medium text-red-600">Conventional Buoy Mooring (CBM)</span>,{' '}
                  <span className="font-medium text-red-600">Pipe Line End Manifold (PLEM)</span>,{' '}
                  spherical tank, bullet tank etc.
                </p>
              </motion.div>

              {/* Stats Grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 pt-4">
                {[
                  { value: `${yearsExperience}+`, label: 'Years Experience', icon: Award },
                  { value: '500+', label: 'Projects', icon: Briefcase },
                  { value: '50+', label: 'Engineers', icon: Users },
                ].map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex p-2 bg-blue-50 rounded-lg mb-2">
                        <Icon className="w-5 h-5 text-blue-700" />
                      </div>
                      <div className="text-xl font-extrabold text-gray-900">{stat.value}</div>
                      <p className="text-xs font-medium text-gray-600">{stat.label}</p>
                    </div>
                  );
                })}
              </motion.div>

              {/* Company Logos */}
              <motion.div variants={fadeInUp} className="space-y-4 pt-4">
                {/* Royal Utilisation */}
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="brand-card flex items-center gap-4 p-4 hover:shadow-md transition-all border-l-4 border-blue-700"
                >
                  <div className="relative w-[40px] h-[50px] shrink-0 bg-slate-50 rounded-md">
                    <Image 
                      src="/preface/logo.png" 
                      alt="The Royal Utilisation Services Logo" 
                      fill 
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      The Royal Utilisation Services (Pvt.)Limited
                    </h3>
                    <p className="text-xs font-medium text-gray-600">Energy Infrastructure Pioneer</p>
                  </div>
                </motion.div>

                {/* Sigma Construction */}
                <motion.div 
                  whileHover={{ x: 10 }}
                  className="brand-card flex items-center gap-4 p-4 hover:shadow-md transition-all border-l-4 border-blue-700"
                >
                  <div className="relative w-[40px] h-[45px] shrink-0 bg-slate-50 rounded-md">
                    <Image 
                      src="/preface/logo2.png" 
                      alt="Sigma Construction Company Logo" 
                      fill 
                      className="object-contain p-1"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900">
                      Sigma Construction Company
                    </h3>
                    <p className="text-xs font-medium text-gray-600">Construction & Engineering Excellence</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column - CEO Portrait */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative flex justify-center lg:justify-end items-start"
            >
              <div className="relative group">
                {/* Decorative Elements */}
                <div className="absolute -inset-4 bg-linear-to-r from-blue-700 to-blue-500 rounded-full opacity-20 group-hover:opacity-30 blur-xl transition-opacity" />
                <div className="absolute inset-0 rounded-full border-2 border-blue-200 group-hover:border-blue-300 transition-colors" />
                
                {/* Image Container */}
                <div className="relative w-70 h-70 sm:w-80 sm:h-80 lg:w-95 lg:h-95 rounded-full overflow-hidden shadow-xl">
                  <Image
                    src="/preface/ceo-corporate.jpeg"
                    alt="Managing Director"
                    fill
                    className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Caption */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white px-6 py-3 rounded-lg shadow-lg border border-slate-200">
                  <p className="text-sm font-bold text-gray-900">Managing Director</p>
                  <p className="text-xs font-medium text-gray-600">The Royal Utilisation Services & Sigma Construction</p>
                </div>
              </div>
            </motion.div>
          </div>

         

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isTextInView ? { width: "100%" } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="h-px bg-linear-to-r from-transparent via-blue-700 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  );
}
