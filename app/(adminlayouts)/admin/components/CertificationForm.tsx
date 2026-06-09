// app/admin/components/CertificationForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, AlertCircle, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Image from 'next/image';
import { Certification, CertificationFormData } from '@/types/certification';
import { getAdminAuthHeaders } from '@/lib/admin-auth';

interface CertificationFormProps {
  certification?: Certification;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CertificationForm({ certification, onSuccess, onCancel }: CertificationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(certification?.src || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<CertificationFormData>({
    title: certification?.title || '',
    shortLabel: certification?.shortLabel || '',
    src: certification?.src || '',
    order: certification?.order || 0,
    isActive: certification?.isActive ?? true,
  });

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    setSelectedFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'projects_upload');
    formData.append('folder', 'royal-utilisation/projects');

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = formData.src;

      // Upload new image if selected
      if (selectedFile) {
        setUploading(true);
        imageUrl = await uploadToCloudinary(selectedFile);
        setUploading(false);
      }

      const submitData = {
        ...formData,
        src: imageUrl,
      };

      const url = certification
        ? `${process.env.NEXT_PUBLIC_API_URL}/certifications/${certification.id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/certifications`;

      const method = certification ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: getAdminAuthHeaders(),
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to save certification');

      toast.success(certification ? 'Certification updated successfully' : 'Certification created successfully');
      onSuccess?.();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      toast.error('Failed to save certification');
    } finally {
      setLoading(false);
    }
  };

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== certification?.src) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, certification?.src]);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Certification Information</CardTitle>
          <CardDescription>Add or edit certification details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                placeholder="e.g., ISO 9001:2015 Certification"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortLabel">Short Label *</Label>
              <Input
                id="shortLabel"
                value={formData.shortLabel}
                onChange={(e) => setFormData({ ...formData, shortLabel: e.target.value })}
                required
                placeholder="e.g., ISO 9001:2015"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
              <p className="text-xs text-[var(--brand-muted)]">Lower numbers appear first</p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="isActive">Active Status</Label>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
              <p className="text-xs text-[var(--brand-muted)]">Inactive certifications won&apos;t be shown on the website</p>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label>Certification Image</Label>
            <div className="border-2 border-dashed border-[#b9cff0] rounded-lg p-6 text-center hover:border-red-500 transition-colors">
              <input
                type="file"
                id="image"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageSelect}
                className="hidden"
              />
              <label htmlFor="image" className="cursor-pointer">
                {imagePreview ? (
                  <div className="relative">
                    <div className="relative w-48 h-32 mx-auto rounded-lg overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <p className="text-sm text-[var(--brand-muted)] mt-2">Click to change image</p>
                  </div>
                ) : (
                  <>
                    <Upload className="h-12 w-12 mx-auto text-[var(--brand-muted)] mb-3" />
                    <p className="text-sm text-[var(--brand-muted)]">Click to upload certification image</p>
                    <p className="text-xs text-[var(--brand-muted)] mt-1">PNG, JPG, WEBP up to 5MB</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={loading || uploading}>
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={loading || uploading}>
          {(loading || uploading) ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          {uploading ? 'Uploading...' : loading ? 'Saving...' : certification ? 'Update' : 'Create'}
        </Button>
      </div>
    </form>
  );
}