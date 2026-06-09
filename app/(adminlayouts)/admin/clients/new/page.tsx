// app/admin/clients/new/page.tsx
'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ClientForm from '../../components/ClientForm';

export default function NewClientPage() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/clients">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Clients
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[var(--brand-navy)]">Add New Client</h1>
          <p className="text-[var(--brand-muted)] mt-1">Add a new client to your portfolio</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm
            onSuccess={() => router.push('/admin/clients')}
            onCancel={() => router.push('/admin/clients')}
          />
        </CardContent>
      </Card>
    </div>
  );
}