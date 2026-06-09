// app/admin/certifications/page.tsx
import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CertificationsResponse } from '@/types/certification';
import CertificationsClient from '../components/CertificationsClient';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'RUSL | Manage Certifications',
  description: 'Create, edit, and manage certifications',
};

async function getCertifications(): Promise<CertificationsResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/certifications`,
      {
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    if (!res.ok) throw new Error('Failed to fetch certifications');
    return await res.json();
  } catch (error) {
    console.error('Error fetching certifications:', error);
    return null;
  }
}

export default async function AdminCertificationsPage() {
  const certificationsData = await getCertifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[var(--brand-navy)]">Certifications</h1>
          <p className="text-[var(--brand-muted)] mt-1">Manage your certifications and credentials</p>
        </div>
        <Button asChild>
          <Link href="/admin/certifications/new">
            <Plus className="h-4 w-4 mr-2" />
            New Certification
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div className="h-96 bg-[#eef4ff] animate-pulse rounded-lg" />}>
        <CertificationsClient initialData={certificationsData} />
      </Suspense>
    </div>
  );
}