// components/contact/ContactHero.tsx
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactHero() {
  return (
    <section className="relative bg-linear-to-br from-gray-900 via-gray-900 to-black py-20 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069')] bg-cover bg-center opacity-10" />
        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/80 to-transparent" />
      </div>
      
      <div className="container relative mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-1 bg-red-600 rounded-full" />
            <span className="text-sm font-semibold text-red-400 tracking-wider">
              GET IN TOUCH
            </span>
          </div>

         

          <p className="text-xl text-gray-300 leading-relaxed mb-8 max-w-3xl">
            Ready to power your next energy project? Reach out to our expert team for consultation,
            project inquiries, or partnership opportunities. We&apos;re here to help you succeed.
          </p>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <Phone className="h-5 w-5 text-red-400" />
              <a href="tel:+8802222281246" className="text-white font-medium hover:text-red-300 transition-colors">
                +88 02222281246
              </a>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <Mail className="h-5 w-5 text-red-400" />
              <a href="mailto:info@sigma-royal.com" className="text-white font-medium hover:text-red-300 transition-colors">
                info@sigma-royal.com
              </a>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
              <MapPin className="h-5 w-5 text-red-400" />
              <span className="text-white font-medium">Dhaka 1206</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}