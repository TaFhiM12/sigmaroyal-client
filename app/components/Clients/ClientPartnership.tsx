// app/components/Clients/ClientPartners.tsx
'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Client } from '@/types/client';

export default function ClientPartners() {
  const [clients, setClients] = useState<Client[]>([]);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const fetchClients = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`);
      const data = await res.json();
      if (data.success) {
        const activeClients = data.data.filter((c: Client) => c.isActive).sort((a: Client, b: Client) => a.order - b.order);
        setClients(activeClients);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (clients.length === 0) return null;

  return (
    <section ref={ref} className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-700">Trusted by Leading Organizations</h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {clients.map((client, index) => (
            <motion.div
              key={client.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              className="grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="relative w-24 h-16 md:w-32 md:h-20">
                <Image
                  src={client.logoUrl}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}