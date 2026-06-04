// app/admin/certifications/CertificationsClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CertificationsResponse, Certification } from '@/types/certification';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import CertificationsTable from './CertificationsTable';
import CertificationForm from './CertificationForm';
import { getAdminAuthHeaders } from '@/lib/admin-auth';

interface CertificationsClientProps {
  initialData: CertificationsResponse | null;
}

export default function CertificationsClient({ initialData }: CertificationsClientProps) {
  const router = useRouter();
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (initialData?.success) {
      setCertifications(initialData.data);
      setLoading(false);
    } else {
      fetchCertifications();
    }
  }, [initialData]);

  const fetchCertifications = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/certifications`);
      const data = await res.json();
      if (data.success) {
        setCertifications(data.data);
      }
    } catch (error) {
      console.error('Error fetching certifications:', error);
      toast.error('Failed to load certifications');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/certifications/${id}`, {
        method: 'DELETE',
        headers: getAdminAuthHeaders(),
      });
      
      if (res.ok) {
        toast.success('Certification deleted successfully');
        await fetchCertifications();
        router.refresh();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting certification:', error);
      toast.error('Failed to delete certification');
    }
  };

  const handleReorder = async (ids: string[]) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/certifications/reorder`, {
        method: 'POST',
        headers: getAdminAuthHeaders(),
        body: JSON.stringify({ ids }),
      });
      
      if (res.ok) {
        toast.success('Order updated successfully');
        await fetchCertifications();
        router.refresh();
      } else {
        throw new Error('Failed to reorder');
      }
    } catch (error) {
      console.error('Error reordering certifications:', error);
      toast.error('Failed to update order');
    }
  };

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingCertification(null);
    fetchCertifications();
    router.refresh();
  };

  return (
    <>
      <CertificationsTable
        certifications={certifications}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onReorder={handleReorder}
        loading={loading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCertification ? 'Edit Certification' : 'Create New Certification'}</DialogTitle>
            <DialogDescription>
              {editingCertification 
                ? 'Update the certification details below.' 
                : 'Fill in the details to create a new certification.'}
            </DialogDescription>
          </DialogHeader>
          <CertificationForm
            certification={editingCertification || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}