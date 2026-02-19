import CertificateGrid from "@/app/components/certificates/CertificateGrid";
import CertificateProcess from "@/app/components/certificates/CertificateProcess";
import CertificateStandards from "@/app/components/certificates/CertificateStandards";
import { certifications } from "@/app/data/certifications";

export const metadata = {
  title: "RUSL | Certificates",
};

export default function CertificatePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <CertificateGrid certificates={certifications} />
      <CertificateStandards />
      <CertificateProcess />
    </div>
  );
}
