// app/admin/clients/page.tsx
import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ClientsResponse } from '@/types/client';
import ClientsClient from '../components/ClientsClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin - Manage Clients',
  description: 'Create, edit, and manage client logos',
};

async function getClients(): Promise<ClientsResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/clients`,
      {
        cache : 'no-store',
        headers: { 'Content-Type': 'application/json' },
      }
    );
    
    if (!res.ok) throw new Error('Failed to fetch clients');
    return await res.json();
  } catch (error) {
    console.error('Error fetching clients:', error);
    return null;
  }
}

export default async function AdminClientsPage() {
  const clientsData = await getClients();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Our Clients</h1>
          <p className="text-gray-600 mt-1">Manage client logos and information</p>
        </div>
        <Button asChild>
          <Link href="/admin/clients/new">
            <Plus className="h-4 w-4 mr-2" />
            Add Client
          </Link>
        </Button>
      </div>

      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
        <ClientsClient initialData={clientsData} />
      </Suspense>
    </div>
  );
}