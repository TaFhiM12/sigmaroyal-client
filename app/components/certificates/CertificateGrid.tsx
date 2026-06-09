// app/components/certificates/CertificateGrid.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {  Eye, Download, X } from 'lucide-react';
import { Certification } from '@/types/certification';

export default function CertificateGrid() {
  const [certificates, setCertificates] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/certifications`);
      const data = await res.json();
      if (data.success) {
        // Filter only active certifications
        setCertificates(data.data.filter((cert: Certification) => cert.isActive));
      }
    } catch (error) {
      console.error('Error fetching certificates:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-[#eef4ff] animate-pulse rounded-xl h-48" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-red-600 to-transparent" />
              <span className="text-sm font-semibold text-red-700 tracking-wider">
                OUR CREDENTIALS
              </span>
              <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-red-600 to-transparent" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--brand-navy)] mb-4">
              Certifications &{" "}
              <span className="text-red-600">Accreditations</span>
            </h1>
            <p className="text-[var(--brand-muted)] text-lg">
              Recognized for excellence in quality, safety, and environmental management
            </p>
          </div>

          {/* Certifications Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white rounded-xl border border-[#d8e4f5] p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                onClick={() => setSelectedCert(cert)}
              >
                {/* Image Container */}
                <div className="relative h-32 mb-4">
                  <Image
                    src={cert.src}
                    alt={cert.title}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                {/* Title */}
                <h3 className="text-sm font-semibold text-[var(--brand-navy)] text-center mb-2 line-clamp-2">
                  {cert.title}
                </h3>
                
                {/* Short Label */}
                <p className="text-xs text-red-600 text-center font-medium">
                  {cert.shortLabel}
                </p>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-[var(--brand-navy)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center">
                  <button className="bg-white text-[var(--brand-navy)] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-red-600 hover:text-white transition-colors">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats Section */}
          {certificates.length > 0 && (
            <div className="mt-16 bg-linear-to-r from-red-600 to-red-700 rounded-2xl p-8 text-center">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {certificates.length}+
                  </div>
                  <div className="text-red-100 text-sm">Active Certifications</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    100%
                  </div>
                  <div className="text-red-100 text-sm">Compliance Rate</div>
                </div>
                <div className="hidden md:block">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    ISO Certified
                  </div>
                  <div className="text-red-100 text-sm">International Standards</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-[var(--brand-navy)]/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={() => setSelectedCert(null)}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div
            className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image */}
            <div className="relative aspect-video bg-[#eef4ff]">
              <Image
                src={selectedCert.src}
                alt={selectedCert.title}
                fill
                className="object-contain p-8"
              />
            </div>

            {/* Info */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-[var(--brand-navy)] mb-2">
                {selectedCert.title}
              </h3>
              <p className="text-red-600 font-medium mb-4">
                {selectedCert.shortLabel}
              </p>
              
              {/* Download Button */}
              <a
                href={selectedCert.src}
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Certificate
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}