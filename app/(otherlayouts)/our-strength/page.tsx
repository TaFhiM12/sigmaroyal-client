'use client';

import { useRef } from 'react';
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
  Briefcase,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import yearsExperience from '@/lib/yearsExperience';
import { useCompanyStats } from '@/hooks/useCompanyStats';

export default function OurStrength() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const companyStats = useCompanyStats();

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
        'Experienced energy-sector leadership',
        'Strategic vision and operational excellence',
        'Proven track record in energy sector'
      ]
    },
    {
      icon: HardHat,
      title: 'Technical Staff',
      description: 'Trained professionals with certification',
      color: 'from-[var(--brand-blue)] to-[var(--brand-blue)]',
      bgColor: 'bg-[#eef4ff]',
      textColor: 'text-[var(--brand-blue)]',
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
      color: 'from-[var(--brand-red)] to-[var(--brand-red)]',
      bgColor: 'bg-red-50',
      textColor: 'text-[var(--brand-red)]',
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
      color: 'from-[var(--brand-blue)] to-[var(--brand-blue)]',
      bgColor: 'bg-[#eef4ff]',
      textColor: 'text-[var(--brand-blue)]',
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
      color: 'from-[var(--brand-blue)] to-[var(--brand-blue)]',
      bgColor: 'bg-[#eef4ff]',
      textColor: 'text-[var(--brand-blue)]',
      details: [
        'Safety-first culture',
        'Regular safety audits',
        'Employee well-being priority'
      ]
    }
  ];

  // Statistics
  const stats = [
    { value: companyStats?.yearsOperating ?? yearsExperience, label: 'Years Operating', icon: TrendingUp, alwaysShow: true },
    { value: companyStats?.teamMembers ?? 0, label: 'Team Members', icon: Users },
    { value: companyStats?.projects.completed ?? 0, label: 'Completed Projects', icon: Briefcase },
    { value: companyStats?.certifications ?? 0, label: 'Active Certifications', icon: Award },
  ].filter((stat) => stat.alwaysShow || stat.value > 0);

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
    <section ref={ref} className="relative overflow-hidden bg-linear-to-b from-[#f7faff] to-white py-8 md:py-12">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="space-y-10 md:space-y-12"
        >
          {/* Stats Grid */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-[#eef4ff] text-center"
                >
                  <div className="inline-flex p-2 md:p-3 bg-red-50 rounded-lg mb-2 md:mb-3">
                    <Icon className="w-4 h-4 md:w-6 md:h-6 text-red-600" />
                  </div>
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--brand-navy)]">{stat.value}</div>
                  <p className="text-xs md:text-sm text-[var(--brand-muted)]">{stat.label}</p>
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
                  className="group relative bg-white rounded-2xl shadow-lg overflow-hidden border border-[#eef4ff]"
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
                        <h3 className="text-lg font-bold text-[var(--brand-navy)]">{strength.title}</h3>
                        <p className="text-sm text-[var(--brand-muted)]">{strength.description}</p>
                      </div>
                    </div>

                    {/* Details List */}
                    <ul className="space-y-2">
                      {strength.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <CheckCircle className={cn("w-4 h-4 mt-0.5 shrink-0", strength.textColor)} />
                          <span className="text-[var(--brand-muted)]">{detail}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Hover Effect Decoration */}
                    <div className="absolute bottom-0 right-0 w-20 h-20 bg-[#f7faff] rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity" />
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
          <motion.div variants={fadeInUp} className="bg-[var(--brand-navy)] rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex p-3 bg-red-600 rounded-xl mb-4">
                  <ClipboardCheck className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Standard Project Management
                </h3>
                <p className="text-blue-50/80 mb-4">
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
                    <li key={index} className="flex items-center gap-2 text-blue-50/80">
                      <CheckCircle className="w-4 h-4 text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {['PMP Certified', 'ISO Standards', 'Safety First', 'Quality Focus'].map((item, index) => (
                  <div key={index} className="bg-blue-950/70 p-4 rounded-xl text-center">
                    <Star className="w-5 h-5 text-[var(--brand-red)] mx-auto mb-2" />
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
