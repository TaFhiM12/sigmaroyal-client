// app/admin/certifications/edit/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Certification } from '@/types/certification';
import CertificationForm from '../../../components/CertificationForm';

interface EditCertificationPageProps {
  params: {
    id: string;
  };
}

export default function EditCertificationPage({ params }: EditCertificationPageProps) {
  const router = useRouter();
  const [certification, setCertification] = useState<Certification | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCertification = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/certifications/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch certification');
        const data = await res.json();
        setCertification(data.data);
      } catch (error) {
        console.error('Error fetching certification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertification();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!certification) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-(--brand-navy) mb-2">Certification Not Found</h2>
        <p className="text-(--brand-muted) mb-6">The certification you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/admin/certifications">Back to Certifications</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/certifications">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Certifications
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-(--brand-navy)">Edit Certification</h1>
          <p className="text-(--brand-muted) mt-1">Update certification information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certification Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CertificationForm
            certification={certification}
            onSuccess={() => router.push('/admin/certifications')}
            onCancel={() => router.push('/admin/certifications')}
          />
        </CardContent>
      </Card>
    </div>
  );
}
