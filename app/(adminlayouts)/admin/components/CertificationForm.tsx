// app/admin/components/CertificationForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, X, Loader2, AlertCircle, Upload, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Certification, CertificationFormData } from '@/types/certification';
import { getAdminAuthHeaders } from '@/lib/admin-auth';

interface CertificationFormProps {
  certification?: Certification;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function CertificationForm({ certification, onSuccess, onCancel }: CertificationFormProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string>(certification?.src || '');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formData, setFormData] = useState<CertificationFormData>({
    title: certification?.title || '',
    shortLabel: certification?.shortLabel || '',
    src: certification?.src || '',
    order: certification?.order || 0,
    isActive: certification?.isActive ?? true,
  });

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      toast.error('Certificate file must be less than 15MB');
      return;
    }

    setSelectedFile(file);
    setMediaPreview(URL.createObjectURL(file));
    toast.success('Certificate image selected.');
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'projects_upload');
    formData.append('folder', 'royal-utilisation/certificates');

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
      let certificateUrl = formData.src;

      if (selectedFile) {
        setUploading(true);
        certificateUrl = await uploadToCloudinary(selectedFile);
        setUploading(false);
      }

      const submitData = {
        ...formData,
        src: certificateUrl,
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
      setUploading(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    return () => {
      if (mediaPreview && mediaPreview !== certification?.src) {
        URL.revokeObjectURL(mediaPreview);
      }
    };
  }, [mediaPreview, certification?.src]);

  if (!mounted) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Certification Information</CardTitle>
            <CardDescription>Add or edit certification details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="h-20 animate-pulse rounded-lg bg-[#eef4ff]" />
              <div className="h-20 animate-pulse rounded-lg bg-[#eef4ff]" />
              <div className="h-20 animate-pulse rounded-lg bg-[#eef4ff]" />
              <div className="h-20 animate-pulse rounded-lg bg-[#eef4ff]" />
            </div>
            <div className="h-80 animate-pulse rounded-lg bg-[#eef4ff]" />
          </CardContent>
        </Card>
      </div>
    );
  }

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

          {/* Certificate Upload */}
          <div className="space-y-2">
            <Label>Certification File</Label>
            <div className="border-2 border-dashed border-[#b9cff0] rounded-lg p-4 text-center hover:border-red-500 transition-colors bg-[#f7faff]">
              <input
                type="file"
                id="certificate-file"
                accept="image/*"
                onChange={handleMediaSelect}
                className="hidden"
              />

              {mediaPreview ? (
                <div className="space-y-3">
                  <div className="overflow-hidden rounded-lg border border-[#d8e4f5] bg-white shadow-sm">
                    <div className="relative h-72 bg-[#eaf0f8]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={mediaPreview}
                        alt="Certificate preview"
                        className="h-full w-full object-contain p-4"
                      />
                    </div>

                    <div className="flex flex-col gap-2 border-t border-[#edf2f8] px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="text-left">
                        <p className="text-sm font-bold text-[var(--brand-navy)]">
                          Image preview loaded
                        </p>
                        <p className="text-xs text-[var(--brand-muted)]">
                          Confirm this is the correct certificate before saving.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-[#eef4ff] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-[var(--brand-blue)]">
                        <ImageIcon className="h-3 w-3" />
                        Ready to save
                      </div>
                    </div>
                  </div>

                  <label
                    htmlFor="certificate-file"
                    className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-[#d8e4f5] bg-white px-4 py-2 text-sm font-semibold text-[var(--brand-navy)] transition-colors hover:border-red-200 hover:text-red-600"
                  >
                    Click to change certificate file
                  </label>
                </div>
              ) : (
                <label htmlFor="certificate-file" className="block cursor-pointer p-6">
                  <div>
                    <Upload className="h-12 w-12 mx-auto text-[var(--brand-muted)] mb-3" />
                    <p className="text-sm text-[var(--brand-muted)]">Click to upload certificate image</p>
                    <p className="text-xs text-[var(--brand-muted)] mt-1">Any image format up to 15MB</p>
                  </div>
                </label>
              )}
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
