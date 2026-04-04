// app/certificates/page.tsx
import { Suspense } from 'react';
import CertificateGrid from "@/app/components/certificates/CertificateGrid";
import CertificateProcess from "@/app/components/certificates/CertificateProcess";
import CertificateStandards from "@/app/components/certificates/CertificateStandards";

export const metadata = {
  title: "Certifications | The Royal Utilisation Services",
  description: "View our professional certifications and accreditations including ISO 9001, ISO 14001, ISO 45001, and industry-specific enlistments.",
};

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse" />}>
        <CertificateGrid />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <CertificateStandards />
      </Suspense>
      <Suspense fallback={<div className="h-64 bg-gray-100 animate-pulse" />}>
        <CertificateProcess />
      </Suspense>
    </div>
  );
}