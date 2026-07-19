'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Client } from '@/types/client';
import ClientForm from '../../../components/ClientForm';

interface EditClientPageProps {
  params: {
    id: string;
  };
}

export default function EditClientPage({ params }: EditClientPageProps) {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch client');
        const data = await res.json();
        setClient(data.data);
      } catch (error) {
        console.error('Error fetching client:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClient();
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-(--brand-navy) mb-2">Client Not Found</h2>
        <p className="text-(--brand-muted) mb-6">The client you&apos;re looking for doesn&apos;t exist.</p>
        <Button asChild>
          <Link href="/admin/clients">Back to Clients</Link>
        </Button>
      </div>
    );
  }

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
          <h1 className="text-3xl font-bold text-(--brand-navy)">Edit Client</h1>
          <p className="text-(--brand-muted) mt-1">Update client information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Client Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientForm
            client={client}
            onSuccess={() => router.push('/admin/clients')}
            onCancel={() => router.push('/admin/clients')}
          />
        </CardContent>
      </Card>
    </div>
  );
}