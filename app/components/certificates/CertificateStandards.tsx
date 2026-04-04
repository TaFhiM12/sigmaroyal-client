// app/components/certificates/CertificateStandards.tsx
'use client';

import { useState, useEffect } from 'react';
import { ShieldCheck, Globe, Users, Target, Award } from 'lucide-react';
import { Certification } from '@/types/certification';

export default function CertificateStandards() {
  const [certifications, setCertifications] = useState<Certification[]>([]);

  useEffect(() => {
    let isMounted = true;

    const fetchCertifications = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/certifications`);
        const data = await res.json();

        if (isMounted && data.success) {
          setCertifications(data.data.filter((cert: Certification) => cert.isActive));
        }
      } catch (error) {
        console.error('Error fetching certifications:', error);
      }
    };

    void fetchCertifications();

    return () => {
      isMounted = false;
    };
  }, []);

  // Group certifications by category
  const standards = [
    {
      icon: <ShieldCheck className="h-8 w-8" />,
      title: "Quality Management",
      description: "ISO 9001:2015 certified processes ensuring consistent quality across all projects",
      keywords: ["ISO 9001", "Quality", "Management"]
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Health & Safety",
      description: "Comprehensive occupational health and safety management systems",
      keywords: ["ISO 45001", "OHSAS", "Safety"]
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Environmental",
      description: "Environmental management systems for sustainable operations",
      keywords: ["ISO 14001", "Environment"]
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Industry Compliance",
      description: "Regulatory and industry-specific certifications",
      keywords: ["PGCL", "TGTDCL", "DCCI", "Enlistment"]
    },
  ];

  const getMatchingCertifications = (keywords: string[]) => {
    return certifications.filter(cert => 
      keywords.some(keyword => 
        cert.title.includes(keyword) || cert.shortLabel.includes(keyword)
      )
    );
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            <span className="text-sm font-semibold text-red-700 tracking-wider">
              QUALITY STANDARDS
            </span>
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Compliance Framework</span>
          </h2>
          <p className="text-gray-600">
            Integrated management systems ensuring excellence in every aspect of our operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {standards.map((standard, index) => {
            const matchingCerts = getMatchingCertifications(standard.keywords);
            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-red-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-red-50 rounded-xl mb-4">
                  <div className="text-red-600">
                    {standard.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {standard.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {standard.description}
                </p>
                <div className="space-y-2">
                  {matchingCerts.length > 0 ? (
                    matchingCerts.slice(0, 3).map((cert, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                        <span className="text-xs font-medium text-gray-700">{cert.shortLabel}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full" />
                      <span className="text-xs text-gray-500">Certifications pending</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Certification Count Badge */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-gray-100">
            <Award className="w-5 h-5 text-red-600" />
            <span className="text-gray-700">
              <span className="font-bold text-red-600">{certifications.length}</span> Active Certifications & Accreditations
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}