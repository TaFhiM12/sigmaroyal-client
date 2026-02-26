'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  Eye, 
  ChevronRight,
  BookOpen,
  Briefcase,
  Building2,
  HardHat,
  Award,
  Shield,
  Calendar,
  ArrowRight,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PortfolioPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Company statistics
  const stats = [
    { icon: Calendar, value: '47+', label: 'Years Experience' },
    { icon: Briefcase, value: '500+', label: 'Projects Completed' },
    { icon: Building2, value: '100+', label: 'Happy Clients' },
    { icon: Award, value: '25+', label: 'Industry Awards' }
  ];

  // Project categories
  const categories = [
    { name: 'Oil & Gas', count: '156 Projects', color: 'from-amber-500 to-amber-700' },
    { name: 'Power Sector', count: '89 Projects', color: 'from-blue-500 to-blue-700' },
    { name: 'Pipeline Construction', count: '234 Projects', color: 'from-emerald-500 to-emerald-700' },
    { name: 'LPG Systems', count: '67 Projects', color: 'from-purple-500 to-purple-700' },
    { name: 'Marine Facilities', count: '34 Projects', color: 'from-cyan-500 to-cyan-700' },
    { name: 'Storage Tanks', count: '42 Projects', color: 'from-rose-500 to-rose-700' }
  ];

  // Featured projects
  const featuredProjects = [
    {
      title: '588.31 MW CCPP Project',
      location: 'Sonargaon, Narayanganj',
      description: 'Combined Cycle Power Plant Construction',
      year: '2023',
      category: 'Power Sector'
    },
    {
      title: '60 MMSCFD Gas Processing',
      location: 'Brahmanbaria',
      description: 'Gas Processing & Distribution Facility',
      year: '2022',
      category: 'Oil & Gas'
    },
    {
      title: 'Auto LPG Dispensing Station',
      location: 'Multiple Locations',
      description: 'Network of ALDS Across Bangladesh',
      year: '2024',
      category: 'LPG Systems'
    }
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

  return (
    <>
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
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full mb-4">
                <BookOpen className="w-4 h-4 text-red-600" />
                <span className="text-sm font-semibold text-red-700 tracking-wider">OUR PORTFOLIO</span>
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                <span className="text-gray-900">Company</span>
                <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800">
                  Portfolio
                </span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-gray-600">
                Explore our comprehensive portfolio showcasing 47+ years of excellence in energy infrastructure development
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Eye className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Preview Portfolio
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a
                href="/companyPortfolio.pdf"
                download
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 rounded-xl font-semibold border-2 border-gray-200 hover:border-red-300 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Download PDF
              </a>
            </motion.div>

            {/* Stats Grid */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                    <div className="inline-flex p-3 bg-red-50 rounded-lg mb-3">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                );
              })}
            </motion.div>

            {/* Categories Grid */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Project <span className="text-red-600">Categories</span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={cn(
                      "p-6 rounded-xl text-white cursor-pointer bg-linear-to-br",
                      category.color
                    )}
                  >
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/90">{category.count}</p>
                    <div className="mt-4 flex items-center gap-2 text-white/80 text-sm">
                      <span>View Projects</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Featured Projects */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center">
                Featured <span className="text-red-600">Projects</span>
              </h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {featuredProjects.map((project, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                  >
                    <div className="h-2 bg-red-600" />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-xs font-semibold text-red-600 bg-red-50 px-2 py-1 rounded-full">
                          {project.category}
                        </span>
                        <span className="text-sm text-gray-400">{project.year}</span>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                      <p className="text-sm text-gray-500 mb-3">{project.location}</p>
                      <p className="text-sm text-gray-600">{project.description}</p>
                      <button className="mt-4 text-red-600 hover:text-red-700 font-medium text-sm inline-flex items-center gap-1 group">
                        Read More
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline/Experience Section */}
            <motion.div variants={fadeInUp} className="bg-gray-900 text-white rounded-2xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-3xl font-bold mb-4">47+ Years of Excellence</h3>
                  <p className="text-gray-300 mb-6">
                    Since 1977, we have been at the forefront of Bangladesh's energy sector, delivering world-class infrastructure projects that power the nation's growth.
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-900" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-400">Trusted by industry leaders</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {['1977', '1990', '2005', '2024'].map((year, index) => (
                    <div key={index} className="text-center p-4 bg-gray-800 rounded-xl">
                      <div className="text-2xl font-bold text-red-400">{year}</div>
                      <p className="text-xs text-gray-400">Milestone Year</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* PDF Preview Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full max-w-5xl h-[80vh] bg-gray-900 rounded-xl overflow-hidden">
                {/* PDF Viewer */}
                <iframe
                  src="/companyPortfolio.pdf"
                  className="w-full h-full"
                  title="Company Portfolio"
                />
                
                {/* Download Overlay */}
                <div className="absolute bottom-4 right-4">
                  <a
                    href="/companyPortfolio.pdf"
                    download
                    className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-lg"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}