// components/clients/ClientHero.tsx
import { Building2 } from 'lucide-react';

export default function ClientHero() {
  return (
    <section className="relative bg-linear-to-br from-gray-900 via-gray-900 to-black py-20 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 to-transparent" />
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-red-600 rounded-full" />
            <span className="text-sm font-semibold text-red-400 tracking-wider">
              TRUSTED PARTNERSHIPS
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Our Valued
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-500 ml-4">
              Clients
            </span>
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
            Building lasting relationships with industry leaders across Bangladesh and beyond.
            46+ years of excellence in delivering energy infrastructure solutions that power progress.
          </p>

          <div className="flex flex-wrap gap-4">
            {[
              { label: "Oil & Gas Sector" },
              { label: "Power Generation" },
              { label: "Industrial Solutions" },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Building2 className="h-5 w-5 text-red-400" />
                <span className="text-white font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}