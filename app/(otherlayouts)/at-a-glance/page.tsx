'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Building2,
  Calendar,
  Clock,
  MapPin,
  Briefcase,
  HardHat,
  CheckCircle,
  TrendingUp,
  Users,
  Landmark,
  Mail,
  Globe,
  User,
  Phone,
  FileText,
  Activity,
  Target,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AtAGlancePage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Company information organized by sections
  const companyInfo = {
    basic: [
      { icon: Building2, label: 'Name of the Company', value: 'The Royal Utilisation Services (Pvt.) Ltd.' },
      { icon: Calendar, label: 'Date of Incorporation', value: '1977' },
      { icon: Clock, label: 'Total Experiences', value: '47 Years' },
      { icon: MapPin, label: 'Business Office', value: 'House#383, Road#28, New DOHS, Mohakhali, Dhaka-1206' },
      { icon: Briefcase, label: 'Status of the Company', value: 'Private Limited Company' }
    ],
    business: [
      { icon: Target, label: 'Business Line', value: 'Infrastructure Development', subvalue: 'Engineering and Construction Services in Oil & Gas Sector, Power Sector, Process Plant etc.' },
      { icon: CheckCircle, label: 'Major Projects Completed', value: 'More than 50 projects during last 5 Years' },
      { icon: Activity, label: 'On-going Projects', value: '7 Projects' }
    ],
    leadership: [
      { icon: User, label: 'Director & CEO', value: 'Zulfiquer Haider' },
      { icon: Users, label: 'Total Employee (Permanent)', value: '195' }
    ],
    contact: [
      { icon: Landmark, label: 'Bankers', value: 'Pubali Bank Limited' },
      { icon: Mail, label: 'Email Address', value: 'zhaider@sigma-royal.com', subvalue: 'zhaider.rusl@gmail.com' },
      { icon: Globe, label: 'Website', value: 'www.sigma-royal.com' }
    ]
  };

  // Key metrics for cards
  const metrics = [
    { icon: Calendar, value: '47', label: 'Years of Experience', suffix: 'Years', color: 'from-red-500 to-red-600' },
    { icon: CheckCircle, value: '50+', label: 'Projects (5 Years)', suffix: 'Completed', color: 'from-blue-500 to-blue-600' },
    { icon: Activity, value: '7', label: 'Ongoing Projects', suffix: 'Active', color: 'from-emerald-500 to-emerald-600' },
    { icon: Users, value: '195', label: 'Permanent Employees', suffix: 'Staff', color: 'from-amber-500 to-amber-600' }
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
          className="space-y-12"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <motion.div 
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 rounded-full mb-4"
            >
              <FileText className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-700 tracking-wider">COMPANY SNAPSHOT</span>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4"
            >
              <span className="text-gray-900">At a</span>
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-800">
                Glance
              </span>
            </motion.h1>
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600"
            >
              A quick overview of The Royal Utilisation Services (Pvt.) Ltd. - your trusted partner in energy infrastructure since 1977
            </motion.p>
          </div>

          {/* Key Metrics Cards */}
          <motion.div variants={fadeInUp} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => {
              const Icon = metric.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                  <div className={cn("h-2 bg-linear-to-r", metric.color)} />
                  <div className="p-6 text-center">
                    <div className="inline-flex p-3 bg-gray-50 rounded-full mb-3">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{metric.value}</div>
                    <p className="text-sm text-gray-500 mt-1">{metric.label}</p>
                    <p className="text-xs text-gray-400">{metric.suffix}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Main Information Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <motion.div variants={scaleIn} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-red-600" />
                Basic Information
              </h2>
              
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {companyInfo.basic.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className={cn(
                        "p-4 flex items-start gap-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors",
                        index === 0 ? "rounded-t-2xl" : "",
                        index === companyInfo.basic.length - 1 ? "rounded-b-2xl" : ""
                      )}
                    >
                      <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                        <p className="text-base font-semibold text-gray-900">{item.value}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Right Column - Business & Leadership */}
            <motion.div variants={scaleIn} className="space-y-6">
              {/* Business Info */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <Briefcase className="w-6 h-6 text-red-600" />
                  Business Overview
                </h2>
                
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {companyInfo.business.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                            <p className="text-base font-semibold text-gray-900">{item.value}</p>
                            {item.subvalue && (
                              <p className="text-sm text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg">
                                {item.subvalue}
                              </p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Leadership & Contact */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <User className="w-6 h-6 text-red-600" />
                  Leadership & Contact
                </h2>
                
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  {/* Leadership */}
                  {companyInfo.leadership.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                            <p className="text-base font-semibold text-gray-900">{item.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}

                  {/* Contact Info */}
                  {companyInfo.contact.map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start gap-4">
                          <div className="shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                            <Icon className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-500 mb-1">{item.label}</p>
                            {item.subvalue ? (
                              <>
                                <p className="text-base font-semibold text-gray-900">{item.value}</p>
                                <p className="text-sm text-gray-600 mt-1">{item.subvalue}</p>
                              </>
                            ) : (
                              <p className="text-base font-semibold text-gray-900">{item.value}</p>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Company Status Banner */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-red-600 to-red-800 rounded-2xl opacity-90" />
            <div className="relative p-8 rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white/20 rounded-xl">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Private Limited Company</h3>
                    <p className="text-red-100">Incorporated in 1977 | 47+ Years of Excellence</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-white text-sm">ISO 9001:2015</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-white text-sm">ISO 14001:2015</p>
                  </div>
                  <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-white text-sm">OHSAS 18001:2007</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quick Contact Strip */}
          <motion.div variants={fadeInUp} className="bg-gray-900 rounded-xl p-6">
            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="text-sm">zhaider@sigma-royal.com</span>
              </div>
              <div className="w-px h-4 bg-gray-700 my-auto" />
              <div className="flex items-center gap-2 text-gray-300">
                <Mail className="w-4 h-4 text-red-500" />
                <span className="text-sm">zhaider.rusl@gmail.com</span>
              </div>
              <div className="w-px h-4 bg-gray-700 my-auto" />
              <div className="flex items-center gap-2 text-gray-300">
                <Globe className="w-4 h-4 text-red-500" />
                <span className="text-sm">www.sigma-royal.com</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}