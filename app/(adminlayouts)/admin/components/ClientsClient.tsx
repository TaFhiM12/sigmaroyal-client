// app/admin/clients/ClientsClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { ClientsResponse, Client } from '@/types/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import ClientsTable from '../components/ClientsTable';
import ClientForm from '../components/ClientForm';

interface ClientsClientProps {
  initialData: ClientsResponse | null;
}

export default function ClientsClient({ initialData }: ClientsClientProps) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (initialData?.success && initialData.data) {
      setClients(initialData.data);
      setLoading(false);
    } else {
      fetchClients();
    }
  }, [initialData]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients`);
      const data = await res.json();
      if (data.success) {
        setClients(data.data);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/${id}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success('Client deleted successfully');
        await fetchClients();
        router.refresh();
      } else {
        throw new Error(data.message || 'Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete client');
    }
  };

  const handleReorder = async (ids: string[]) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/clients/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });
      
      if (res.ok) {
        toast.success('Order updated successfully');
        await fetchClients();
        router.refresh();
      } else {
        throw new Error('Failed to reorder');
      }
    } catch (error) {
      console.error('Error reordering clients:', error);
      toast.error('Failed to update order');
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClient(client);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingClient(null);
    fetchClients();
    router.refresh();
  };

  return (
    <>
      <ClientsTable
        clients={clients}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        loading={loading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingClient ? 'Edit Client' : 'Add New Client'}</DialogTitle>
            <DialogDescription>
              {editingClient 
                ? 'Update the client details below.' 
                : 'Fill in the details to add a new client.'}
            </DialogDescription>
          </DialogHeader>
          <ClientForm
            client={editingClient || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}