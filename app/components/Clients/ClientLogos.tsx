// components/clients/ClientLogos.tsx
import Image from 'next/image';

const clientLogos = [
  'client-1.png',
  'client-2.png',
  'client-3.png',
  'client-4.png',
  'client-5.png',
  'client-6.png',
  'client-7.png',
  'client-8.png',,
  'client-9.png',
  'client-10.png',
  'client-11.png',
  'client-12.png',
];

export default function ClientLogos() {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-red-600 to-transparent" />
            <span className="text-sm font-semibold text-red-700 tracking-wider">
              TRUSTED BY INDUSTRY LEADERS
            </span>
            <div className="w-8 h-0.5 bg-linear-to-r from-transparent via-red-600 to-transparent" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Esteemed <span className="text-red-600">Client Portfolio</span>
          </h2>
          <p className="text-gray-600">
            We are proud to collaborate with renowned organizations across the energy sector
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {clientLogos.map((logo, index) => (
            <div
              key={index}
              className="group relative aspect-square bg-white rounded-xl shadow-md border border-gray-200 flex items-center justify-center p-8 transition-all duration-300 hover:shadow-xl hover:border-red-200 hover:-translate-y-2"
            >
              <Image
                src={`/client/${logo}`}
                alt={`Client ${index + 1}`}
                width={120}
                height={60}
                className="w-full h-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-0.5 bg-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}