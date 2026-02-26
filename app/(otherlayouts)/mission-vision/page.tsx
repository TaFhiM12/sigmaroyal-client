'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Target,
  Eye,
  Heart,
  Shield,
  Globe,
  Users,
  Star,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Compass
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MissionVisionPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // Core values
  const values = [
    { icon: Shield, name: 'Quality', description: 'International standards of safety and quality' },
    { icon: Heart, name: 'Trust', description: 'Building long-term relationships with clients' },
    { icon: Globe, name: 'Innovation', description: 'Providing guidance and innovation worldwide' },
    { icon: Users, name: 'Integrity', description: 'Honesty and immense strength in delivery' }
  ];

  // Strategic goals
  const goals = [
    { icon: Star, label: 'Excellence', color: 'from-amber-500 to-amber-600' },
    { icon: Shield, label: 'Safety', color: 'from-blue-500 to-blue-600' },
    { icon: TrendingUp, label: 'Growth', color: 'from-emerald-500 to-emerald-600' },
    { icon: Globe, label: 'Global', color: 'from-purple-500 to-purple-600' }
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
      
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />

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
              <Compass className="w-4 h-4 text-red-600" />
              <span className="text-sm font-semibold text-red-700 tracking-wider">OUR PURPOSE</span>
            </motion.div>
            
            
            
            <motion.p 
              variants={fadeInUp}
              className="text-lg text-gray-600"
            >
              Driving excellence in energy infrastructure through unwavering commitment to quality, safety, and innovation
            </motion.p>
          </div>

          {/* Main Grid - Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Mission Card */}
            <motion.div 
              variants={scaleIn}
              className="group relative"
            >
              {/* Background Gradient */}
              <div className="absolute -inset-1 bg-linear-to-r from-red-600 to-red-800 rounded-3xl opacity-20 group-hover:opacity-30 blur transition-opacity" />
              
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-red-600 to-red-800 p-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Target className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">Mission</h2>
                      <p className="text-red-100 text-sm mt-1">What drives us forward</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full" />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        To be among the leading contractors for delivering a personalized standard of services that pertains to a level of excellence.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-red-600 rounded-full" />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        To provide the most efficient, trustworthy, high-quality service while ensuring international standards of safety and quality.
                      </p>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {['Excellence', 'Efficiency', 'Trust', 'Quality'].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-red-600" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-red-50 rounded-tl-full" />
              </div>
            </motion.div>

            {/* Vision Card */}
            <motion.div 
              variants={scaleIn}
              className="group relative"
            >
              {/* Background Gradient */}
              <div className="absolute -inset-1 bg-linear-to-r from-gray-700 to-gray-900 rounded-3xl opacity-20 group-hover:opacity-30 blur transition-opacity" />
              
              <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Header */}
                <div className="bg-linear-to-r from-gray-800 to-gray-900 p-8">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                      <Eye className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-white">Vision</h2>
                      <p className="text-gray-300 text-sm mt-1">Where we're heading</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        To have a viable business suitable for sustainable development by assuring the topmost quality and safety.
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <div className="shrink-0">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mt-1">
                          <div className="w-2 h-2 bg-gray-600 rounded-full" />
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">
                        Having a commitment to long term business relationships with our Clients while providing guidance and innovation in worldwide business by delivering a wide range of services built on quality, safety, honesty and immense strength.
                      </p>
                    </div>
                  </div>

                  {/* Key Points */}
                  <div className="grid grid-cols-2 gap-3 pt-4">
                    {['Sustainability', 'Innovation', 'Relationships', 'Strength'].map((item, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-50 rounded-tl-full" />
              </div>
            </motion.div>
          </div>

          {/* Core Values Section */}
          <motion.div variants={fadeInUp} className="pt-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Core <span className="text-red-600">Values</span>
              </h2>
              <p className="text-gray-600 mt-2">The principles that guide everything we do</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center group"
                  >
                    <div className="inline-flex p-3 bg-red-50 rounded-xl mb-4 group-hover:bg-red-100 transition-colors">
                      <Icon className="w-6 h-6 text-red-600" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{value.name}</h3>
                    <p className="text-sm text-gray-500">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Strategic Goals */}
          <motion.div variants={fadeInUp} className="relative">
            <div className="absolute inset-0 bg-linear-to-r from-red-600 to-red-800 rounded-2xl opacity-5" />
            <div className="relative p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Strategic <span className="text-red-600">Priorities</span>
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {goals.map((goal, index) => {
                  const Icon = goal.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className={cn(
                        "inline-flex p-4 rounded-xl bg-linear-to-br text-white mb-3",
                        goal.color
                      )}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{goal.label}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Commitment Statement */}
          <motion.div 
            variants={fadeInUp}
            className="text-center max-w-4xl mx-auto pt-8"
          >
            <div className="inline-flex p-2 bg-red-50 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-red-600" />
            </div>
            <p className="text-xl text-gray-700 italic">
              "Committed to delivering excellence through quality, safety, honesty, and immense strength"
            </p>
            <div className="flex justify-center gap-2 mt-6">
              <div className="w-12 h-0.5 bg-red-600" />
              <div className="w-12 h-0.5 bg-gray-300" />
              <div className="w-12 h-0.5 bg-gray-300" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}