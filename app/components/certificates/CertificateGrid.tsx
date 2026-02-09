// components/certificates/CertificateGrid.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ZoomIn, Shield, Award, CheckCircle, ExternalLink } from 'lucide-react';

interface Certificate {
  src: string;
  title: string;
}

interface CertificateGridProps {
  certificates: Certificate[];
}

export default function CertificateGrid({ certificates }: CertificateGridProps) {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  return (
    <>
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
              <span className="text-sm font-semibold text-red-700 tracking-wider">
                RECOGNIZED STANDARDS
              </span>
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Accreditations & <span className="text-red-600">Certifications</span>
            </h2>
            <p className="text-gray-600">
              Our commitment to quality, safety, and environmental responsibility is validated through these certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <div
                key={index}
                onClick={() => setSelectedCertificate(cert)}
                className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl hover:border-red-200 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-video bg-gray-100 overflow-hidden">
                  <Image
                    src={cert.src}
                    alt={cert.title}
                    fill
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ZoomIn className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                      {index % 3 === 0 ? (
                        <Shield className="h-5 w-5 text-red-600" />
                      ) : index % 3 === 1 ? (
                        <Award className="h-5 w-5 text-red-600" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {cert.title}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>View Certificate</span>
                        <ExternalLink className="h-3 w-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[60vh] bg-gray-900">
              <Image
                src={selectedCertificate.src}
                alt={selectedCertificate.title}
                fill
                className="object-contain p-8"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedCertificate.title}
              </h3>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setSelectedCertificate(null)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                  Close
                </button>
                <a
                  href={selectedCertificate.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Download
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}