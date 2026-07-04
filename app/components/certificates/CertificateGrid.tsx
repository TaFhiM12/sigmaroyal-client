// app/components/certificates/CertificateGrid.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AlertCircle, Download, Eye, Minus, Plus, RotateCcw, RotateCw, X } from 'lucide-react';
import { Certification } from '@/types/certification';

function isImageCertificate(src?: string | null) {
  if (!src) return false;

  const cleanSrc = src.split('?')[0].toLowerCase();
  if (cleanSrc.endsWith('.pdf') || cleanSrc.includes('/raw/upload/')) return false;

  return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(cleanSrc) || cleanSrc.includes('/image/upload/');
}

export default function CertificateGrid() {
  const [certificates, setCertificates] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [modalZoom, setModalZoom] = useState(1);
  const [modalRotation, setModalRotation] = useState(0);

  useEffect(() => {
    setMounted(true);
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const res = await fetch('/api/certifications', {
        cache: 'no-store',
        headers: { Accept: 'application/json' },
      });
      const data = await res.json();
      if (data.success) {
        // Filter only active certifications
        setCertificates(data.data.filter((cert: Certification) => cert.isActive));
      }
    } catch {
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const openCertificate = (cert: Certification) => {
    setModalZoom(1);
    setModalRotation(0);
    setSelectedCert(cert);
  };

  const gridClassName = certificates.length === 1
    ? 'mx-auto grid max-w-[720px] grid-cols-1 gap-7'
    : 'mx-auto grid max-w-7xl grid-cols-1 gap-7 lg:grid-cols-2';
  const selectedIsImage = selectedCert ? isImageCertificate(selectedCert.src) : false;

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="bg-[#f6f8fc] py-10 md:py-14">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-7 lg:grid-cols-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-[72vh] min-h-[560px] animate-pulse rounded-lg border border-[#d8e4f5] bg-white lg:h-[78vh] lg:min-h-[720px]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="py-10 md:py-14 bg-[#f6f8fc]">
        <div className="container mx-auto px-4 md:px-6">
          <div className={gridClassName}>
            {certificates.map((cert, index) => (
              <motion.button
                type="button"
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="group relative block overflow-hidden rounded-lg border border-[#cbdcf3] bg-white p-3 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#8eabd3] hover:shadow-2xl hover:shadow-[#0b1533]/12 focus:outline-none focus:ring-4 focus:ring-[#2a7de1]/20 md:p-4"
                onClick={() => openCertificate(cert)}
                aria-label={`Open ${cert.title}`}
              >
                <span className="sr-only">{cert.title}</span>

                <div className="relative h-[72vh] min-h-[560px] overflow-hidden rounded-md border border-[#e4ecf7] bg-[#f9fbff] shadow-inner lg:h-[78vh] lg:min-h-[720px]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(42,125,225,0.09),_transparent_34%)]" />

                  <div className="relative z-10 flex h-full w-full items-center justify-center bg-white p-2">
                    {isImageCertificate(cert.src) ? (
                      <Image
                        src={cert.src}
                        alt={cert.title}
                        width={1400}
                        height={1980}
                        priority={index < 2}
                        sizes={certificates.length === 1 ? '(max-width: 768px) 100vw, 720px' : '(max-width: 1024px) 100vw, 50vw'}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.015]"
                      />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center p-8 text-center">
                        <AlertCircle className="mb-4 h-10 w-10 text-red-600" />
                        <p className="text-base font-bold text-[var(--brand-navy)]">Image required</p>
                        <p className="mt-2 max-w-sm text-sm text-[var(--brand-muted)]">
                          Re-upload this certificate as an image from admin.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pointer-events-none absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/95 text-[var(--brand-blue)] shadow-lg shadow-[#0b1533]/12 transition-transform duration-300 group-hover:scale-105">
                  <Eye className="h-5 w-5" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedCert && (
        <div
          className="fixed inset-0 z-50 bg-[var(--brand-navy)]/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={() => setSelectedCert(null)}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          <div
            className="relative flex h-[92vh] max-h-[92vh] w-full max-w-[min(96vw,1800px)] flex-col overflow-hidden rounded-lg bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute left-4 top-4 z-20 flex flex-wrap items-center gap-2 rounded-lg border border-white/15 bg-[var(--brand-navy)]/90 p-2 text-white shadow-xl backdrop-blur">
              <button
                type="button"
                onClick={() => setModalZoom((value) => Math.max(0.7, value - 0.15))}
                className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-white/10"
                aria-label="Zoom out"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-14 text-center text-xs font-bold">{Math.round(modalZoom * 100)}%</span>
              <button
                type="button"
                onClick={() => setModalZoom((value) => Math.min(2.4, value + 0.15))}
                className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-white/10"
                aria-label="Zoom in"
              >
                <Plus className="h-4 w-4" />
              </button>
              <div className="h-6 w-px bg-white/15" />
              <button
                type="button"
                onClick={() => setModalRotation((value) => (value + 270) % 360)}
                className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-white/10"
                aria-label="Rotate left"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setModalRotation((value) => (value + 90) % 360)}
                className="flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-white/10"
                aria-label="Rotate right"
              >
                <RotateCw className="h-4 w-4" />
              </button>
            </div>

            {/* Preview */}
            <div className="relative min-h-0 flex-1 overflow-auto bg-[#eef4ff]">
              {selectedIsImage ? (
                <div className="flex min-h-full items-center justify-center p-4 md:p-6">
                  <div
                    className="flex h-full min-h-[520px] w-full items-center justify-center transition-transform duration-200"
                    style={{ transform: `scale(${modalZoom}) rotate(${modalRotation}deg)` }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={selectedCert.src}
                      alt={selectedCert.title}
                      className="max-h-[calc(92vh-180px)] max-w-full object-contain"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex h-full min-h-[520px] flex-col items-center justify-center p-8 text-center">
                  <AlertCircle className="mb-4 h-12 w-12 text-red-600" />
                  <p className="text-2xl font-bold text-[var(--brand-navy)]">Image required</p>
                  <p className="mt-2 max-w-lg text-sm text-[var(--brand-muted)]">
                    This record is not an image URL. Re-upload the certificate as JPG, PNG, WEBP, SVG, GIF, or AVIF from admin.
                  </p>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between md:p-6">
              <div>
                <h3 className="text-xl font-bold text-[var(--brand-navy)] mb-1">
                  {selectedCert.title}
                </h3>
                <p className="text-red-600 font-semibold">
                  {selectedCert.shortLabel}
                </p>
              </div>
              
              <a
                href={selectedCert.src}
                download
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-red-700"
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
