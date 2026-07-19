// app/admin/certifications/new/page.tsx
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CertificationForm from '../../components/CertificationForm';

export default function NewCertificationPage() {
  const router = useRouter();

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
          <h1 className="text-3xl font-bold text-(--brand-navy)">Create New Certification</h1>
          <p className="text-(--brand-muted) mt-1">Add a new certification to your portfolio</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Certification Information</CardTitle>
        </CardHeader>
        <CardContent>
          <CertificationForm
            onSuccess={() => router.push('/admin/certifications')}
            onCancel={() => router.push('/admin/certifications')}
          />
        </CardContent>
      </Card>
    </div>
  );
}