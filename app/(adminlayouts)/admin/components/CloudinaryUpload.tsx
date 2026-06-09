// app/admin/components/CloudinaryUpload.tsx
'use client';

import React, { useState, useRef } from 'react';
import { Upload, X, Star, Loader2, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface CloudinaryUploadProps {
  onUpload: (urls: string[]) => void;
  existingImages?: Array<{ id: string; url: string; caption?: string | null }>;
  onRemove?: (id: string) => void;
  onMoveUp?: (index: number) => void;
  onMoveDown?: (index: number) => void;
  onSetAsFeatured?: (index: number) => void;
  multiple?: boolean;
  maxFiles?: number;
  folder?: string;
}

export default function CloudinaryUpload({
  onUpload,
  existingImages = [],
  onRemove,
  onMoveUp,
  onMoveDown,
  onSetAsFeatured,
  multiple = true,
  maxFiles = 10,
  folder = 'royal-utilisation/projects',
}: CloudinaryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFiles = (files: File[]) => {
    
    if (files.length === 0) return;

    if (selectedFiles.length + files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} images`);
      return;
    }

    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024;

      if (!isValidType) alert(`${file.name} is not an image file`);
      if (!isValidSize) alert(`${file.name} exceeds 10MB limit`);
      return isValidType && isValidSize;
    });

    if (validFiles.length === 0) return;

    const newPreviewUrls = validFiles.map(file => URL.createObjectURL(file));
    setSelectedFiles([...selectedFiles, ...validFiles]);
    setPreviewUrls([...previewUrls, ...newPreviewUrls]);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    processFiles(Array.from(e.target.files || []));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    processFiles(Array.from(e.dataTransfer.files || []));
  };

  const removeSelectedFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'projects_upload');
      formData.append('folder', folder);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        );

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error?.message || 'Upload failed');
        }
        
        const data = await res.json();
        uploadedUrls.push(data.secure_url);
      } catch (error) {
        console.error('Upload failed:', error);
        alert(`Failed to upload ${file.name}`);
      }
    }

    onUpload(uploadedUrls);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setUploading(false);
    
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const cancelUpload = () => {
    previewUrls.forEach(url => URL.revokeObjectURL(url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-4">
      {/* File Input Area */}
      <div className="space-y-3">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !uploading && fileInputRef.current?.click()}
          className={`rounded-lg border-2 border-dashed p-6 text-center cursor-pointer transition-colors ${
            isDragging
              ? 'border-red-500 bg-red-50'
              : 'border-[#b9cff0] bg-white hover:border-red-400 hover:bg-red-50/40'
          } ${uploading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          <Upload className="h-6 w-6 mx-auto text-[var(--brand-muted)]" />
          <p className="mt-3 text-sm font-medium text-[var(--brand-copy)]">
            Drag and drop image files here
          </p>
          <p className="text-xs text-[var(--brand-muted)] mt-1">
            or click this area to browse files
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <Upload className="h-4 w-4 mr-2" />
            Select Images
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple={multiple}
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
          <p className="text-xs text-[var(--brand-muted)]">
            Max {maxFiles} images, 10MB each (JPG, PNG, WEBP)
          </p>
        </div>

        {/* Selected Files Preview */}
        {previewUrls.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[var(--brand-copy)]">
                {previewUrls.length} file(s) selected
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={cancelUpload} disabled={uploading}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleUpload} disabled={uploading} className="bg-red-600 hover:bg-red-700">
                  {uploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                  {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative group">
                  <div className="relative aspect-video rounded-lg overflow-hidden border bg-[#eef4ff]">
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeSelectedFile(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                    disabled={uploading}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Existing Images Gallery with Order Controls */}
      {existingImages.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-[var(--brand-copy)]">
            Gallery Images ({existingImages.length}) - First image is featured/banner
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((image, index) => (
              <div key={image.id} className="relative group">
                <div className="relative aspect-video rounded-lg overflow-hidden border bg-[#eef4ff]">
                  <Image
                    src={image.url}
                    alt="Project"
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover"
                  />
                  {index === 0 && (
                    <div className="absolute top-2 left-2">
                      <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded flex items-center gap-1">
                        <Star className="h-3 w-3" /> Featured
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Image Controls Overlay */}
                <div className="absolute inset-0 bg-[var(--brand-navy)]/70 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-1 flex-wrap p-1">
                  {onSetAsFeatured && index !== 0 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onSetAsFeatured(index)}
                      className="h-7 px-2 text-xs"
                    >
                      <Star className="h-3 w-3 mr-1" />
                      Set Featured
                    </Button>
                  )}
                  {onMoveUp && index > 0 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onMoveUp(index)}
                      className="h-7 w-7 p-0"
                    >
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                  )}
                  {onMoveDown && index < existingImages.length - 1 && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => onMoveDown(index)}
                      className="h-7 w-7 p-0"
                    >
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  )}
                  {onRemove && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onRemove(image.id)}
                      className="h-7 w-7 p-0"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--brand-muted)] mt-2">
            Tip: Drag or use arrows to reorder. The first image will be used as the featured/banner image.
          </p>
        </div>
      )}
    </div>
  );
}