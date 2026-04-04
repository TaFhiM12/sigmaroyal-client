// app/components/Clients/ClientTestimonials.tsx
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote, Star, Building2 } from 'lucide-react';

const testimonials = [
  {
    quote: "The Royal Utilisation Services has been our trusted partner for over a decade. Their expertise in energy infrastructure is unmatched, delivering projects on time with exceptional quality standards.",
    name: "Md. Hasan Ali",
    position: "Director",
    company: "PetroEnergy Bangladesh",
    rating: 5,
    initials: "MH"
  },
  {
    quote: "Working with this team has transformed our LPG distribution network. Their innovative solutions and commitment to safety have significantly improved our operational efficiency.",
    name: "Ayesha Rahman",
    position: "CEO",
    company: "GasTech Solutions",
    rating: 5,
    initials: "AR"
  },
  {
    quote: "Exceptional professionalism and technical expertise. They delivered our pipeline project ahead of schedule while maintaining the highest safety standards.",
    name: "Engr. Kamal Hossain",
    position: "Project Director",
    company: "PGCL",
    rating: 5,
    initials: "KH"
  }
];

export default function ClientTestimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-96 h-96 bg-red-100 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-100 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full mb-4">
            <Quote className="w-4 h-4 text-red-600" />
            <span className="text-sm font-semibold text-red-700">TESTIMONIALS</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our <span className="text-red-600">Clients Say</span>
          </h2>
          <p className="text-gray-600 mt-4">Real feedback from our valued partners</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 hover:shadow-2xl transition-all"
            >
              <Quote className="w-10 h-10 text-red-200 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 text-sm">
                "{testimonial.quote}"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.position}</div>
                  <div className="flex items-center gap-1 mt-1">
                    <Building2 className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-400">{testimonial.company}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <div className="px-4 py-2 bg-green-50 rounded-full text-sm text-green-700">✓ 100% Satisfaction</div>
          <div className="px-4 py-2 bg-blue-50 rounded-full text-sm text-blue-700">✓ 98% Repeat Business</div>
          <div className="px-4 py-2 bg-purple-50 rounded-full text-sm text-purple-700">✓ 25+ Years Trust</div>
        </motion.div>
      </div>
    </section>
  );
}