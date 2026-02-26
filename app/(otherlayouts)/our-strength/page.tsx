'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { 
  Users,
  Wrench,
  Award,
  Shield,
  ClipboardCheck,
  HardHat,
  CheckCircle,
  Star,
  TrendingUp,
  Zap,
  Building2,
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function OurStrength() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Strength categories
  const strengths = [
    {
      icon: Users,
      title: 'Management',
      description: 'Qualified and experienced leadership team',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      details: [
        'Industry veterans with 20+ years experience',
        'Strategic vision and operational excellence',
        'Proven track record in energy sector'
      ]
    },
    {
      icon: HardHat,
      title: 'Technical Staff',
      description: 'Trained professionals with certification',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
      details: [
        'Regular training and skill development',
        'Qualified engineers and technicians',
        'Industry-recognized certifications'
      ]
    },
    {
      icon: Wrench,
      title: 'Equipment & Machineries',
      description: 'State-of-the-art equipment for all projects',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      textColor: 'text-amber-600',
      details: [
        'Modern construction equipment',
        'Specialized machinery for pipeline',
        'Regular maintenance and upgrades'
      ]
    },
    {
      icon: Award,
      title: 'ISO 9001:2015',
      description: 'Quality Management System',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      details: [
        'Certified quality management',
        'Continuous improvement process',
        'International standards compliance'
      ]
    },
    {
      icon: Shield,
      title: 'ISO 14001:2015',
      description: 'Environmental Management',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      details: [
        'Environmental responsibility',
        'Sustainable practices',
        'Eco-friendly operations'
      ]
    },
    {
      icon: ClipboardCheck,
      title: 'OHSAS 18001:2007',
      description: 'Occupational Health & Safety',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      details: [
        'Safety-first culture',
        'Regular safety audits',
        'Employee well-being priority'
      ]
    }
  ];

  // Statistics
  const stats = [
    { value: '195+', label: 'Permanent Employees', icon: Users },
    { value: '46+', label: 'Years Experience', icon: TrendingUp },
    { value: '50+', label: 'Projects Completed', icon: Briefcase },
    { value: '9001', label: 'ISO Certified', icon: Award, sublabel: '14001 • 45001' }
  ];

  // Certifications
  const certifications = [
    { name: 'ISO 9001:2015', description: 'Quality Management' },
    { name: 'ISO 14001:2015', description: 'Environmental Management' },
    { name: 'OHSAS 18001:2007', description: 'Health & Safety' }
  ];

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

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section ref={ref} className="relative bg-linear-to-b from-gray-50 to-white py-12 md:py-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full mb-4"
            >
              <Zap className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-700 tracking-wider">OUR STRENGTH</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              <span className="text-gray-900">Built on</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800">
                Strong Foundations
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600"
            >
              Leveraging decades of experience, qualified professionals, and world-class certifications to deliver excellence
            </motion.p>
          </div>

          {/* Stats Grid */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-100 text-center"
                >
                  <div className="inline-flex p-2 md:p-3 bg-red-50 rounded-lg mb-2 md:mb-3">
                    <Icon className="w-4 h-4 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</div>
                  <p className="text-xs md:text-sm text-gray-500">{stat.label}</p>
                  {stat.sublabel && (
                    <p className="text-[10px] md:text-xs text-red-600 mt-1">{stat.sublabel}</p>
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Strengths Grid */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {strengths.map((strength, index) => {
              const Icon = strength.icon;
              return (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ y: -5 }}
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
                >
                  {/* Colored Top Bar */}
                  <div className={cn("h-2 bg-linear-to-r", strength.color)} />

                  <div className="p-6">
                    {/* Icon and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={cn("p-3 rounded-xl", strength.bgColor)}>
                        <Icon className={cn("w-6 h-6", strength.textColor)} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{strength.title}</h3>
                        <p className="text-sm text-gray-500">{strength.description}</p>
                      </div>
                    </div>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {strength.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className={cn("w-4 h-4 mt-0.5 shrink-0", strength.textColor)} />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Hover Effect Decoration */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-gray-50 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Certifications Banner */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-red-600 to-red-800 rounded-2xl opacity-90" />
            <div className="relative p-8 md:p-12 rounded-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    International Certifications
                  </h3>
                  <p className="text-red-100">
                    Committed to global standards of quality, safety, and environmental management
                  </p>
                </div>

                <div className="flex flex-wrap justify-center gap-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/30">
                      <p className="text-white font-semibold text-sm">{cert.name}</p>
                      <p className="text-red-100 text-xs">{cert.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Management Excellence */}
          <motion.div variants={fadeInUp} className="bg-gray-900 rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex p-3 bg-red-600 rounded-xl mb-4">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Standard Project Management
                </h3>
                <p className="text-gray-300 mb-4">
                  Implemented by Project Management Professionals (PMP®) ensuring:
                </p>
                <ul className="space-y-2">
                  {[
                    'On-time project delivery',
                    'Budget compliance',
                    'Quality assurance',
                    'Risk management',
                    'Stakeholder communication'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {['PMP Certified', 'ISO Standards', 'Safety First', 'Quality Focus'].map((item, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-xl text-center">
                    <Star className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                    <p className="text-white text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="text-center">
            <button className="group inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300">
              Discover Our Capabilities
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}