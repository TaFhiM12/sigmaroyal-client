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
    <div className="min-h-screen bg-white">
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
  return <div className="bg-[#f4f7fb] px-4 py-16"><div className="mx-auto h-[520px] max-w-7xl animate-pulse rounded-[32px] bg-white" /></div>;
}

function ClientStatsSkeleton() {
  return <div className="bg-white px-4 py-20"><div className="mx-auto h-64 max-w-7xl animate-pulse rounded-[28px] bg-slate-100" /></div>;
}

function ClientCTASkeleton() {
  return <div className="mx-auto mb-20 h-80 max-w-7xl animate-pulse rounded-[32px] bg-slate-900" />;
}
