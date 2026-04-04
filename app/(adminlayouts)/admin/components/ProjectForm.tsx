// app/admin/components/ProjectForm.tsx - Complete working version

"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Save, X, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import CloudinaryUpload from "./CloudinaryUpload";
import { Project, ProjectFormData } from "@/types/projects";

interface ProjectFormProps {
  project?: Project;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const sectors = [
  { value: "OIL_GAS", label: "Oil & Gas" },
  { value: "POWER_SECTOR", label: "Power Sector" },
];

const statuses = [
  { value: "COMPLETED", label: "Completed" },
  { value: "ONGOING", label: "Ongoing" },
  { value: "UPCOMING", label: "Upcoming" },
];

export default function ProjectForm({
  project,
  onSuccess,
  onCancel,
}: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [existingImages, setExistingImages] = useState<Array<{ id: string; url: string; caption?: string | null }>>(project?.images || []);
  const [deletedImageIds, setDeletedImageIds] = useState<string[]>([]);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: project?.title || "",
    slug: project?.slug || "",
    sector: project?.sector || "OIL_GAS",
    client: project?.client || "",
    companyRole: project?.companyRole || "",
    location: project?.location || "",
    capacity: project?.capacity || "",
    duration: project?.duration || "",
    year: project?.year?.toString() || "",
    scopeOfWork: project?.scopeOfWork || "",
    description: project?.description || "",
    status: project?.status || "COMPLETED",
    featured: project?.featured || false,
  });

  // Auto-generate slug from title
  useEffect(() => {
    if (!project && formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setFormData((prev) => ({ ...prev, slug }));
    }
  }, [formData.title, project]);

  // In ProjectForm.tsx - Update handleSubmit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    // Separate images: new ones (temp-) vs existing ones (real IDs)
    const newImages = existingImages
      .filter(img => img.id.startsWith('temp-'))
      .map(img => ({
        url: img.url,
        caption: img.caption || null,
      }));

    const keepImageIds = existingImages
      .filter(img => !img.id.startsWith('temp-'))
      .map(img => img.id);

    const submitData = {
      ...formData,
      year: formData.year ? parseInt(formData.year) : null,
      images: newImages,
      existingImageIds: keepImageIds,
      deleteImageIds: deletedImageIds,
    };

    const url = project
      ? `${process.env.NEXT_PUBLIC_API_URL}/projects/${project.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/projects`;

    const method = project ? "PUT" : "POST";

    console.log('Submitting to:', url);
    console.log('Submit data:', submitData);

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(submitData),
    });

    console.log('Response status:', res.status);
    
    const data = await res.json();
    console.log('Response data:', data);

    if (!res.ok) throw new Error(data.message || "Failed to save project");

    toast.success(
      project
        ? "Project updated successfully"
        : "Project created successfully",
    );
    onSuccess?.();
    router.refresh();
  } catch (err) {
    console.error('Submit error:', err);
    setError(err instanceof Error ? err.message : "Something went wrong");
    toast.error("Failed to save project");
  } finally {
    setLoading(false);
  }
};

  const handleImageUpload = (urls: string[]) => {
    const newImages = urls.map((url, index) => ({
      id: `temp-${Date.now()}-${index}-${Math.random()}`,
      url: url,
      caption: null,
    }));
    
    setExistingImages([...existingImages, ...newImages]);
    toast.success(`${urls.length} image(s) uploaded successfully`);
  };

  const handleRemoveImage = (imageId: string) => {
    if (imageId.startsWith('temp-')) {
      // Remove temp image
      setExistingImages(existingImages.filter((img) => img.id !== imageId));
    } else {
      // Mark existing image for deletion
      setDeletedImageIds([...deletedImageIds, imageId]);
      setExistingImages(existingImages.filter((img) => img.id !== imageId));
      toast.success("Image will be deleted on save");
    }
  };

  const handleMoveImageUp = (index: number) => {
    if (index === 0) return;
    const newImages = [...existingImages];
    [newImages[index], newImages[index - 1]] = [newImages[index - 1], newImages[index]];
    setExistingImages(newImages);
  };

  const handleMoveImageDown = (index: number) => {
    if (index === existingImages.length - 1) return;
    const newImages = [...existingImages];
    [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
    setExistingImages(newImages);
  };

  const handleSetAsFeatured = (index: number) => {
    const newImages = [...existingImages];
    const [selectedImage] = newImages.splice(index, 1);
    newImages.unshift(selectedImage);
    setExistingImages(newImages);
    toast.success("Featured image updated");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Information</TabsTrigger>
          <TabsTrigger value="details">Project Details</TabsTrigger>
          <TabsTrigger value="images">Images</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the core details of the project
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                    placeholder="e.g., Meghnaghat 335 MW Power Plant"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug *</Label>
                  <Input
                    id="slug"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    required
                    placeholder="auto-generated-from-title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sector">Sector *</Label>
                  <Select
                    value={formData.sector}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sector: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      {sectors.map((sector) => (
                        <SelectItem key={sector.value} value={sector.value}>
                          {sector.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status *</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) =>
                      setFormData({ ...formData, status: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="client">Client *</Label>
                  <Input
                    id="client"
                    value={formData.client}
                    onChange={(e) =>
                      setFormData({ ...formData, client: e.target.value })
                    }
                    required
                    placeholder="e.g., Bangladesh Power Development Board"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="companyRole">Company Role *</Label>
                  <Input
                    id="companyRole"
                    value={formData.companyRole}
                    onChange={(e) =>
                      setFormData({ ...formData, companyRole: e.target.value })
                    }
                    required
                    placeholder="e.g., EPC Contractor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    required
                    placeholder="e.g., Meghnaghat, Narayanganj"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="featured">Featured Project</Label>
                    <Switch
                      id="featured"
                      checked={formData.featured}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, featured: checked })
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Technical specifications and scope
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    value={formData.capacity}
                    onChange={(e) =>
                      setFormData({ ...formData, capacity: e.target.value })
                    }
                    placeholder="e.g., 335 MW"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., 24 Months"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                    placeholder="e.g., 2023"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="scopeOfWork">Scope of Work *</Label>
                <Textarea
                  id="scopeOfWork"
                  value={formData.scopeOfWork}
                  onChange={(e) =>
                    setFormData({ ...formData, scopeOfWork: e.target.value })
                  }
                  required
                  rows={4}
                  placeholder="Detailed description of the work scope..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={6}
                  placeholder="Full project description..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Project Images</CardTitle>
              <CardDescription>
                Upload and manage project gallery images. First image will be the featured/banner image.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CloudinaryUpload
                onUpload={handleImageUpload}
                existingImages={existingImages}
                onRemove={handleRemoveImage}
                onMoveUp={handleMoveImageUp}
                onMoveDown={handleMoveImageDown}
                onSetAsFeatured={handleSetAsFeatured}
                multiple={true}
                maxFiles={10}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 sticky bottom-0 bg-white py-4 border-t">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          <X className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          {loading
            ? "Saving..."
            : project
              ? "Update Project"
              : "Create Project"}
        </Button>
      </div>
    </form>
  );
}