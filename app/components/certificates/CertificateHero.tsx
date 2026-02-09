// components/certificates/CertificateHero.tsx
import { Shield, Award, FileCheck } from 'lucide-react';

export default function CertificateHero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-black py-20 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2074')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/80 to-transparent" />
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-red-600 rounded-full" />
            <span className="text-sm font-semibold text-red-400 tracking-wider">
              QUALITY & COMPLIANCE
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Our
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-500 ml-4">
              Certifications
            </span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
            46+ years of commitment to excellence, backed by internationally recognized certifications
            and industry compliance standards that guarantee the highest quality in energy infrastructure.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <Shield className="h-5 w-5 text-red-400" />
              <span className="text-white font-medium">ISO Certified</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <Award className="h-5 w-5 text-red-400" />
              <span className="text-white font-medium">Industry Approved</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <FileCheck className="h-5 w-5 text-red-400" />
              <span className="text-white font-medium">Regulatory Compliant</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}