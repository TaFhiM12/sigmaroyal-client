// components/clients/ClientCTA.tsx
import Link from 'next/link';
import { ChevronRight, Handshake } from 'lucide-react';

export default function ClientCTA() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-linear-to-br from-gray-900 to-black rounded-2xl overflow-hidden">
          <div className="relative p-8 md:p-12 lg:p-16">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-600/10 rounded-full translate-y-12 -translate-x-12" />
            
            <div className="relative max-w-3xl">
              <div className="flex items-center gap-3 mb-6">
                <Handshake className="h-6 w-6 text-red-400" />
                <span className="text-sm font-semibold text-red-400 tracking-wider">
                  PARTNERSHIP OPPORTUNITIES
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Power Your
                <span className="text-transparent bg-clip-text bg-linear-to-r from-red-400 to-red-300 ml-4">
                  Success?
                </span>
              </h2>

              <p className="text-xl text-gray-300 mb-8">
                Join our network of industry leaders. Let&apos;s build the future of energy infrastructure together with our 46+ years of expertise.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  Become a Partner
                  <ChevronRight className="h-5 w-5" />
                </Link>
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-red-600 text-red-600 hover:bg-red-600/10 font-semibold px-8 py-4 rounded-lg transition-all duration-300"
                >
                  View Our Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}