"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { Briefcase, Users, Target, Award, ChevronRight, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import yearsExperience from "@/lib/yearsExperience";

interface AboutUsProps {
  className?: string;
}

const AboutUs = ({ className }: AboutUsProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const statVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  const projectVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const highlightVariants: Variants = {
    hidden: { width: "0%" },
    visible: {
      width: "100%",
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      }
    }
  };

  return (
    <section
      ref={ref}
      className={cn(
        "relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24",
        className
      )}
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Company Introduction */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-sm font-semibold text-red-700 tracking-wider">
                  SINCE 1977
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="text-gray-900">Pioneering</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                  Energy Excellence
                </span>
              </h2>

              <div className="relative">
                <div className="text-lg text-gray-600 leading-relaxed space-y-4">
                  <p>
                    <span className="font-bold text-gray-900">
                      The Royal Utilisation Services (Pvt.) Ltd
                    </span>
                    , together with{" "}
                    <span className="font-bold text-gray-900">
                      Sigma Construction Company
                    </span>
                    , stands as a pioneer in Bangladesh&apos;s energy sector with
                    over{" "}
                    <span className="font-bold text-red-600">{yearsExperience} years</span> of
                    unparalleled experience since 1977.
                  </p>
                  <p>
                    We are one of the foremost infrastructure developers in the
                    Oil, Gas & Power sector, delivering comprehensive solutions
                    that power the nation&apos;s growth.
                  </p>
                </div>
                
                {/* Highlight underline effect */}
                <motion.div
                  variants={highlightVariants}
                  className="absolute -bottom-2 left-0 h-0.5 bg-gradient-to-r from-red-600/50 to-transparent"
                />
              </div>
            </motion.div>

            {/* Featured Projects - Animated List */}
            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Featured Projects
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    title: "588.31 MW CCPP Project",
                    location: "Sonargaon, Narayanganj",
                    description: "Combined Cycle Power Plant Construction",
                  },
                  {
                    title: "07 Nos. capacity of 60 MMSCFD Project",
                    location: "B-baria",
                    description: "Gas Processing & Distribution",
                  },
                ].map((project, index) => (
                  <motion.div
                    key={project.title}
                    variants={projectVariants}
                    custom={index}
                    className="group bg-white p-6 rounded-xl border border-gray-200 hover:border-red-300 transition-all duration-300 hover:shadow-xl cursor-pointer"
                  >
                    <div className="flex items-start gap-4">
                      <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 group-hover:text-red-700 transition-colors">
                          {project.title}
                        </h4>
                        <p className="text-sm text-red-600 font-medium mt-1">
                          {project.location}
                        </p>
                        <p className="text-gray-600 mt-2">{project.description}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-2 transition-all duration-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Stats & Services */}
          <div className="space-y-12">
            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-2 gap-6"
            >
              {[
                {
                  value: `${yearsExperience}+`,
                  label: "Years Experience",
                  icon: <Award className="h-8 w-8" />,
                  color: "from-red-500 to-red-700",
                },
                {
                  value: "500+",
                  label: "Projects Completed",
                  icon: <Briefcase className="h-8 w-8" />,
                  color: "from-gray-500 to-gray-700",
                },
                {
                  value: "50+",
                  label: "Expert Engineers",
                  icon: <Users className="h-8 w-8" />,
                  color: "from-red-500 to-red-700",
                },
                {
                  value: "100%",
                  label: "Client Satisfaction",
                  icon: <Target className="h-8 w-8" />,
                  color: "from-gray-500 to-gray-700",
                },
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={statVariants}
                  className="relative group"
                >
                  <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-xl bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                        stat.color
                      )}
                    />
                    <div className="relative">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={cn(
                            "p-3 rounded-lg bg-gradient-to-br",
                            stat.color
                          )}
                        >
                          <div className="text-white">{stat.icon}</div>
                        </div>
                        <div className="text-4xl font-bold text-gray-900">
                          {stat.value}
                        </div>
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              variants={itemVariants}
              className="pt-6"
            >
              <Button
                asChild
                size="lg"
                className="group bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white px-8 py-6 text-lg rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <a href="/about">
                  <span className="mr-3">Discover Our Journey</span>
                  <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Mission & Vision Section */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="mt-24 grid md:grid-cols-2 gap-8"
        >
          {/* Mission Card */}
          <motion.div variants={cardVariants} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 to-gray-700 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white p-8 rounded-2xl border border-gray-200">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 bg-red-50 rounded-lg">
                  <Target className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Mission</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  To be among the leading contractors for delivering a personalized
                  standard of services that pertains to a level of excellence.
                </p>
                <p className="leading-relaxed">
                  To provide the most efficient, trustworthy, high-quality service
                  while ensuring international standards of safety and quality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={cardVariants} className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-700 to-red-600 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-white p-8 rounded-2xl border border-gray-200">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <Eye className="h-6 w-6 text-gray-700" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Vision</h3>
              </div>
              <div className="space-y-4 text-gray-600">
                <p className="leading-relaxed">
                  To have a viable business suitable for sustainable development by
                  assuring the topmost quality and safety.
                </p>
                <p className="leading-relaxed">
                  Having a commitment to long term business relationships with our
                  Clients while providing guidance and innovation in worldwide
                  business.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative bottom element */}
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          transition={{ delay: 1, duration: 1.5 }}
          className="mt-16 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent rounded-full"
        />
      </div>
    </section>
  );
};

export default AboutUs;