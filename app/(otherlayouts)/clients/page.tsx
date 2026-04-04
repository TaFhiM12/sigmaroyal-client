// app/clients/page.tsx
import { Suspense } from 'react';
import ClientHero from '@/app/components/Clients/ClientHero';
import ClientShowcase from '@/app/components/Clients/ClientShowcase';
import ClientStats from '@/app/components/Clients/ClientStats';
import ClientTestimonials from '@/app/components/Clients/ClientTestimonials';
import ClientCTA from '@/app/components/Clients/ClientCTA';
import ClientPartners from '@/app/components/Clients/ClientPartnership';

export const revalidate = 3600;

export const metadata = {
  title: "Our Clients | The Royal Utilisation Services",
  description: "We are proud to work with leading organizations across Bangladesh, including PetroBangla subsidiaries, power producers, and global EPC partners.",
};

export default function ClientPage() {
  return (
    <div className="min-h-screen bg-white">
      <Suspense fallback={<ClientHeroSkeleton />}>
        <ClientHero />
      </Suspense>
      <Suspense fallback={<ClientShowcaseSkeleton />}>
        <ClientShowcase />
      </Suspense>
      <Suspense fallback={<ClientStatsSkeleton />}>
        <ClientStats />
      </Suspense>
      <Suspense fallback={<ClientTestimonialsSkeleton />}>
        <ClientTestimonials />
      </Suspense>
      <Suspense fallback={<ClientPartnersSkeleton />}>
        <ClientPartners />
      </Suspense>
      <Suspense fallback={<ClientCTASkeleton />}>
        <ClientCTA />
      </Suspense>
    </div>
  );
}

// Skeletons
function ClientHeroSkeleton() {
  return <div className="h-screen bg-gray-900 animate-pulse" />;
}

function ClientShowcaseSkeleton() {
  return <div className="py-20 bg-white"><div className="container mx-auto px-4"><div className="h-96 bg-gray-100 rounded-2xl animate-pulse" /></div></div>;
}

function ClientStatsSkeleton() {
  return <div className="py-12 bg-gray-50"><div className="container mx-auto px-4"><div className="grid grid-cols-4 gap-4"><div className="h-28 bg-gray-200 rounded-xl animate-pulse" /><div className="h-28 bg-gray-200 rounded-xl animate-pulse" /><div className="h-28 bg-gray-200 rounded-xl animate-pulse" /><div className="h-28 bg-gray-200 rounded-xl animate-pulse" /></div></div></div>;
}

function ClientTestimonialsSkeleton() {
  return <div className="py-20 bg-white"><div className="container mx-auto px-4"><div className="h-96 bg-gray-100 rounded-2xl animate-pulse" /></div></div>;
}

function ClientPartnersSkeleton() {
  return <div className="py-12 bg-gray-50"><div className="container mx-auto px-4"><div className="h-32 bg-gray-200 rounded-xl animate-pulse" /></div></div>;
}

function ClientCTASkeleton() {
  return <div className="h-64 bg-red-600 animate-pulse" />;
}