// app/admin/components/ClientsTable.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { Edit, Trash2, GripVertical, Check, ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import Image from 'next/image';
import { Client } from '@/types/client';
import { toast } from 'sonner';

interface ClientsTableProps {
  clients: Client[];
  onEdit: (client: Client) => void;
  onDelete: (id: string) => Promise<void>;
  onReorder?: (ids: string[]) => Promise<void>;
  loading?: boolean;
  onRefresh?: () => Promise<void>;
}

export default function ClientsTable({ 
  clients, 
  onEdit, 
  onDelete, 
  onReorder,
  loading,
  onRefresh
}: ClientsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>('');
  const [deleting, setDeleting] = useState(false);
  const [isReorderMode, setIsReorderMode] = useState(false);
  const [orderedIds, setOrderedIds] = useState<string[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize orderedIds when clients change or reorder mode is entered
  useEffect(() => {
    if (isReorderMode) {
      setOrderedIds(clients.map(c => c.id));
    }
  }, [isReorderMode, clients]);

  const handleDelete = async () => {
    if (deleteId) {
      setDeleting(true);
      await onDelete(deleteId);
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleReorder = async () => {
    if (!onReorder || orderedIds.length === 0) return;
    
    setIsSaving(true);
    try {
      await onReorder(orderedIds);
      setIsReorderMode(false);
      toast.success('Order updated successfully');
      if (onRefresh) await onRefresh();
    } catch (error) {
      console.error('Reorder failed:', error);
      toast.error('Failed to update order');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelReorder = () => {
    setIsReorderMode(false);
    setOrderedIds([]);
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= orderedIds.length) return;
    const newIds = [...orderedIds];
    const [movedId] = newIds.splice(fromIndex, 1);
    newIds.splice(toIndex, 0, movedId);
    setOrderedIds(newIds);
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-lg" />
        ))}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-gray-500">No clients found. Create your first client!</p>
      </div>
    );
  }

  // Display items based on reorder mode
  const displayItems = isReorderMode 
    ? orderedIds.map(id => clients.find(c => c.id === id)!).filter(Boolean)
    : clients;

  return (
    <>
      <div className="rounded-lg border bg-white overflow-x-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Our Clients ({clients.length})</h3>
          {onReorder && (
            <div className="flex gap-2">
              {isReorderMode ? (
                <>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCancelReorder}
                    disabled={isSaving}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Cancel
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleReorder} 
                    className="bg-green-600 hover:bg-green-700"
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <Check className="h-4 w-4 mr-1" />
                    )}
                    {isSaving ? 'Saving...' : 'Save Order'}
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
              <TableHead className="w-24">Order</TableHead>
              <TableHead className="w-16">Logo</TableHead>
              <TableHead>Client Name</TableHead>
              <TableHead>Website</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayItems.map((client, index) => (
              <TableRow key={client.id} className="hover:bg-gray-50">
                <TableCell>
                  {isReorderMode ? (
                    <div className="flex items-center gap-1">
                      <span className="text-sm text-gray-400 w-6 text-center">{index + 1}</span>
                      <div className="flex flex-col">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(index, index - 1)}
                          disabled={index === 0}
                          className="h-6 w-6 p-0"
                        >
                          ↑
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => moveItem(index, index + 1)}
                          disabled={index === displayItems.length - 1}
                          className="h-6 w-6 p-0"
                        >
                          ↓
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-gray-600">{client.order}</span>
                  )}
                </TableCell>
                <TableCell>
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={client.logoUrl}
                      alt={client.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <p className="line-clamp-1">{client.name}</p>
                </TableCell>
                <TableCell>
                  {client.website ? (
                    <a
                      href={client.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 text-sm"
                    >
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">Not provided</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={client.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                    {client.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => onEdit(client)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setDeleteId(client.id);
                        setDeleteName(client.name);
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
            <AlertDialogTitle>Delete Client</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteName}&quot;? This action cannot be undone.
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