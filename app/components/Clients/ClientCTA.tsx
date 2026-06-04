// app/components/Clients/ClientCTA.tsx
'use client';

import { useMemo, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Building2, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const PARTICLE_POSITIONS = [
  { top: '12%', left: '8%' },
  { top: '24%', left: '18%' },
  { top: '38%', left: '6%' },
  { top: '62%', left: '14%' },
  { top: '78%', left: '9%' },
  { top: '16%', left: '34%' },
  { top: '46%', left: '28%' },
  { top: '84%', left: '36%' },
  { top: '10%', left: '52%' },
  { top: '34%', left: '48%' },
  { top: '68%', left: '56%' },
  { top: '88%', left: '51%' },
  { top: '18%', left: '70%' },
  { top: '44%', left: '76%' },
  { top: '72%', left: '68%' },
  { top: '8%', left: '88%' },
  { top: '30%', left: '92%' },
  { top: '58%', left: '84%' },
  { top: '80%', left: '91%' },
  { top: '94%', left: '74%' },
];

export default function ClientCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const particles = useMemo(
    () =>
      PARTICLE_POSITIONS.map((position, i) => ({
        id: i,
        ...position,
      })),
    []
  );

  return (
    <section ref={ref} className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700">
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: [0, 0.5, 0], scale: [0, 1, 0] } : {}}
              transition={{ duration: 3, delay: particle.id * 0.2, repeat: Infinity }}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: particle.top,
                left: particle.left,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl mb-6">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Partner With Us?
          </h2>
          
          <p className="text-lg text-red-100 mb-8 max-w-2xl mx-auto">
            Join our network of industry leaders. Let's build the future of energy infrastructure together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-red-600 hover:bg-gray-100 hover:text-red-700 shadow-lg">
              <Link href="/contact">
                Become a Partner
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Link href="/projects">
                View Our Projects
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-8 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2 text-white/80">
              <Mail className="w-4 h-4" />
              <span className="text-sm">info@sigma-royal.com</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Phone className="w-4 h-4" />
              <span className="text-sm">+88 02222229238</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
