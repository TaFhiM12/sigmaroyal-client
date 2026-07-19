// app/clients/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const ClientShowcase = dynamic(() => import('@/app/components/Clients/ClientShowcase'), {
  loading: () => <ClientShowcaseSkeleton />,
});
const ClientStats = dynamic(() => import('@/app/components/Clients/ClientStats'), {
  loading: () => <ClientStatsSkeleton />,
});
const ClientCTA = dynamic(() => import('@/app/components/Clients/ClientCTA'), {
  loading: () => <ClientCTASkeleton />,
});

export const revalidate = 3600;

export const metadata = {
  title: "Our Clients | The Royal Utilisation Services",
  description: "We are proud to work with leading organizations across Bangladesh, including PetroBangla subsidiaries, power producers, and global EPC partners.",
};

export default function ClientPage() {
  return (
    <div className="site-canvas min-h-screen">
      <Suspense fallback={<ClientShowcaseSkeleton />}>
        <ClientShowcase />
      </Suspense>
      <Suspense fallback={<ClientStatsSkeleton />}>
        <ClientStats />
      </Suspense>
      <Suspense fallback={<ClientCTASkeleton />}>
        <ClientCTA />
      </Suspense>
    </div>
  );
}

function ClientShowcaseSkeleton() {
  return <div className="site-canvas py-8"><div className="container mx-auto px-4"><div className="h-72 bg-[#eef4ff] rounded-lg animate-pulse" /></div></div>;
}

function ClientStatsSkeleton() {
  return <div className="site-canvas py-12"><div className="container mx-auto px-4"><div className="grid grid-cols-4 gap-4"><div className="h-28 bg-[#d8e4f5] rounded-xl animate-pulse" /><div className="h-28 bg-[#d8e4f5] rounded-xl animate-pulse" /><div className="h-28 bg-[#d8e4f5] rounded-xl animate-pulse" /><div className="h-28 bg-[#d8e4f5] rounded-xl animate-pulse" /></div></div></div>;
}

function ClientCTASkeleton() {
  return <div className="h-64 bg-red-600 animate-pulse" />;
}
