// app/admin/components/CertificationsTable.tsx
'use client';

import React, { useState } from 'react';
import { Edit, Trash2,  GripVertical,  Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Certification } from '@/types/certification';

interface CertificationsTableProps {
  certifications: Certification[];
  onEdit: (certification: Certification) => void;
  onDelete: (id: string) => Promise<void>;
  onReorder?: (ids: string[]) => Promise<void>;
  loading?: boolean;
}

export default function CertificationsTable({ 
  certifications, 
  onEdit, 
  onDelete, 
  onReorder,
  loading 
}: CertificationsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string>('');
  const [deleting, setDeleting] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [orderedIds, setOrderedIds] = useState<string[]>(certifications.map(c => c.id));

  const handleDelete = async () => {
    if (deleteId) {
      setDeleting(true);
      await onDelete(deleteId);
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleReorder = async () => {
    if (onReorder) {
      await onReorder(orderedIds);
      setIsReorderMode(false);
    }
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    const newIds = [...orderedIds];
    const [movedId] = newIds.splice(fromIndex, 1);
    newIds.splice(toIndex, 0, movedId);
    setOrderedIds(newIds);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-[#eef4ff] animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (certifications.length === 0) {
    return (
      <div className="text-center py-12 bg-[#f7faff] rounded-lg">
        <p className="text-[var(--brand-muted)]">No certifications found. Create your first certification!</p>
      </div>
    );
  }

  const displayItems = isReorderMode ? orderedIds.map(id => certifications.find(c => c.id === id)!) : certifications;

  return (
    <>
      <div className="rounded-lg border bg-white overflow-x-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Certifications List</h3>
          {onReorder && (
            <div className="flex gap-2">
              {isReorderMode ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsReorderMode(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleReorder} className="bg-[var(--brand-blue)] hover:bg-[var(--brand-blue)]">
                    <Check className="h-4 w-4 mr-1" />
                    Save Order
                  </Button>
                </>
              ) : (
                <Button variant="outline" size="sm" onClick={() => setIsReorderMode(true)}>
                  <GripVertical className="h-4 w-4 mr-1" />
                  Reorder
                </Button>
              )}
            </div>
          )}
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Order</TableHead>
              <TableHead className="w-12">File</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Short Label</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayItems.map((certification, index) => (
              <TableRow key={certification.id} className="hover:bg-[#f7faff]">
                <TableCell>
                  {isReorderMode ? (
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveItem(index, index - 1)}
                        disabled={index === 0}
                        className="h-8 w-8 p-0"
                      >
                        ↑
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => moveItem(index, index + 1)}
                        disabled={index === displayItems.length - 1}
                        className="h-8 w-8 p-0"
                      >
                        ↓
                      </Button>
                    </div>
                  ) : (
                    <span className="text-sm text-[var(--brand-muted)]">{certification.order}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#eef4ff]">
                    <Image
                      src={certification.src}
                      alt={certification.title}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <p className="line-clamp-1">{certification.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{certification.shortLabel}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={certification.isActive ? 'bg-[#eef4ff] text-[var(--brand-blue)]' : 'bg-[#eef4ff] text-[var(--brand-navy)]'}>
                    {certification.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(certification)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(certification.id);
                        setDeleteTitle(certification.title);
                      }}
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Certification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteTitle}&quot;? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700" disabled={deleting}>
              {deleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
