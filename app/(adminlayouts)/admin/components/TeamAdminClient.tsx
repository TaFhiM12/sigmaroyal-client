"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { Edit, ImagePlus, Loader2, Plus, Save, Search, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { teamCategories, defaultTeamPhoto } from "@/app/data/team";
import { apiUrl } from "@/lib/api";
import { getAdminAuthHeaders } from "@/lib/admin-auth";
import { TeamMember, TeamResponse } from "@/types/team";

type TeamFormData = {
  name: string;
  designation: string;
  department: string;
  photoUrl: string;
  orderIndex: number;
  isActive: boolean;
};

const departments = teamCategories
  .filter((category) => category.department)
  .map((category) => category.department as string);

function toFormData(member?: TeamMember): TeamFormData {
  return {
    name: member?.name || "",
    designation: member?.designation || "",
    department: member?.department || departments[0],
    photoUrl: member?.photoUrl || defaultTeamPhoto,
    orderIndex: member?.orderIndex || 0,
    isActive: member?.isActive ?? true,
  };
}

export default function TeamAdminClient({ initialMembers }: { initialMembers: TeamMember[] }) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [query, setQuery] = useState("");
  const [department, setDepartment] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamFormData>(toFormData());
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPreview, setSelectedPreview] = useState("");
  const [deleteMember, setDeleteMember] = useState<TeamMember | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const matchesDepartment = department === "all" || member.department === department;
      const haystack = `${member.name} ${member.designation} ${member.department}`.toLowerCase();
      return matchesDepartment && haystack.includes(query.toLowerCase());
    });
  }, [department, members, query]);

  const refreshMembers = async () => {
    const res = await fetch(apiUrl("/employees?includeInactive=true"), { cache: "no-store" });
    const data = (await res.json()) as TeamResponse;
    if (data.success) setMembers(data.data);
  };

  const openCreateForm = () => {
    setEditingMember(null);
    setFormData(toFormData());
    resetSelectedImage();
    setFormOpen(true);
  };

  const openEditForm = (member: TeamMember) => {
    setEditingMember(member);
    setFormData(toFormData(member));
    resetSelectedImage();
    setFormOpen(true);
  };

  const resetSelectedImage = () => {
    if (selectedPreview) URL.revokeObjectURL(selectedPreview);
    setSelectedFile(null);
    setSelectedPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    if (selectedPreview) URL.revokeObjectURL(selectedPreview);
    setSelectedFile(file);
    setSelectedPreview(URL.createObjectURL(file));
  };

  const uploadToCloudinary = async (file: File): Promise<string> => {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      throw new Error("Cloudinary cloud name is not configured");
    }

    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", "projects_upload");
    uploadData.append("folder", "royal-utilisation/team");

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: uploadData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error?.message || "Image upload failed");
    }

    return data.secure_url;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSaving(true);

    try {
      let photoUrl = formData.photoUrl || defaultTeamPhoto;

      if (selectedFile) {
        toast.loading("Uploading team photo...", { id: "team-photo-upload" });
        photoUrl = await uploadToCloudinary(selectedFile);
        toast.success("Team photo uploaded", { id: "team-photo-upload" });
      }

      const url = editingMember ? apiUrl(`/employees/${editingMember.id}`) : apiUrl("/employees");
      const res = await fetch(url, {
        method: editingMember ? "PUT" : "POST",
        headers: getAdminAuthHeaders(),
        body: JSON.stringify({
          ...formData,
          bio: "",
          photoUrl,
        }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save team member");
      }

      toast.success(editingMember ? "Team member updated" : "Team member added");
      setFormOpen(false);
      resetSelectedImage();
      await refreshMembers();
    } catch (error) {
      toast.dismiss("team-photo-upload");
      toast.error(error instanceof Error ? error.message : "Failed to save team member");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteMember) return;

    try {
      const res = await fetch(apiUrl(`/employees/${deleteMember.id}`), {
        method: "DELETE",
        headers: getAdminAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete team member");

      toast.success("Team member deleted");
      setDeleteMember(null);
      await refreshMembers();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete team member");
    }
  };

  useEffect(() => {
    return () => {
      if (selectedPreview) URL.revokeObjectURL(selectedPreview);
    };
  }, [selectedPreview]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 rounded-lg border border-[#d8e4f5] bg-white p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--brand-muted)]" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search team"
              className="w-full pl-9 sm:w-72"
            />
          </div>
          <Select value={department} onValueChange={setDepartment}>
            <SelectTrigger className="w-full sm:w-56">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={openCreateForm} className="bg-[var(--brand-red)] hover:bg-[var(--brand-navy)]">
          <Plus className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-[#d8e4f5] bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-20">Photo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Designation</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="w-24">Order</TableHead>
              <TableHead className="w-24">Status</TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-full bg-[#eef4ff]">
                    <Image src={member.photoUrl} alt={member.name} fill sizes="48px" className="object-cover" />
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-[var(--brand-navy)]">{member.name}</TableCell>
                <TableCell>{member.designation}</TableCell>
                <TableCell>{member.department}</TableCell>
                <TableCell>{member.orderIndex || 0}</TableCell>
                <TableCell>
                  <Badge className={member.isActive ? "bg-[#eef4ff] text-[var(--brand-blue)]" : "bg-[#f7faff] text-[var(--brand-muted)]"}>
                    {member.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="sm" onClick={() => openEditForm(member)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-[var(--brand-red)]" onClick={() => setDeleteMember(member)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!filteredMembers.length && (
          <div className="py-12 text-center text-sm text-[var(--brand-muted)]">No team members found.</div>
        )}
      </div>

      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingMember ? "Edit Team Member" : "Add Team Member"}</DialogTitle>
            <DialogDescription>Upload a professional team photo to Cloudinary or paste an existing image URL.</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input id="name" required value={formData.name} onChange={(event) => setFormData({ ...formData, name: event.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designation">Designation *</Label>
                  <Input id="designation" required value={formData.designation} onChange={(event) => setFormData({ ...formData, designation: event.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Department *</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orderIndex">Display Order</Label>
                  <Input
                    id="orderIndex"
                    type="number"
                    value={formData.orderIndex}
                    onChange={(event) => setFormData({ ...formData, orderIndex: Number(event.target.value) || 0 })}
                  />
                </div>
                <div className="space-y-3 md:col-span-2">
                  <Label>Team Photo</Label>
                  <div className="grid gap-4 rounded-lg border border-[#d8e4f5] bg-[#f7faff] p-4 md:grid-cols-[1fr_132px] md:items-center">
                    <div className="space-y-3">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleImageSelect}
                        className="hidden"
                      />

                      <div className="flex flex-wrap gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={saving}
                        >
                          <ImagePlus className="mr-2 h-4 w-4" />
                          Select Image
                        </Button>
                        {selectedFile && (
                          <Button type="button" variant="outline" onClick={resetSelectedImage} disabled={saving}>
                            <X className="mr-2 h-4 w-4" />
                            Remove
                          </Button>
                        )}
                      </div>

                      {selectedFile ? (
                        <p className="text-sm font-semibold text-[var(--brand-blue)]">
                          <Upload className="mr-1 inline h-4 w-4" />
                          {selectedFile.name} will upload when you save.
                        </p>
                      ) : (
                        <p className="text-sm text-[var(--brand-muted)]">
                          JPG, PNG, or WEBP up to 5MB. The uploaded image will replace the current photo.
                        </p>
                      )}

                      <div className="space-y-2">
                        <Label htmlFor="photoUrl" className="text-xs text-[var(--brand-muted)]">
                          Existing Image URL
                        </Label>
                        <Input
                          id="photoUrl"
                          value={formData.photoUrl}
                          onChange={(event) => setFormData({ ...formData, photoUrl: event.target.value })}
                          placeholder={defaultTeamPhoto}
                        />
                      </div>
                    </div>

                    <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-white bg-[#eef4ff] shadow-lg shadow-[rgb(8_32_74_/_0.10)]">
                      <Image
                        src={selectedPreview || formData.photoUrl || defaultTeamPhoto}
                        alt="Team photo preview"
                        fill
                        sizes="128px"
                        className="object-cover object-[center_18%]"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 md:col-span-2">
                  <div>
                    <Label htmlFor="isActive">Show on Website</Label>
                    <p className="text-xs text-[var(--brand-muted)]">Inactive members stay in admin but hide from public pages.</p>
                  </div>
                  <Switch id="isActive" checked={formData.isActive} onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })} />
                </div>
              </CardContent>
            </Card>

            <div className="sticky bottom-0 flex justify-end gap-3 border-t bg-white py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormOpen(false);
                  resetSelectedImage();
                }}
                disabled={saving}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button type="submit" className="bg-[var(--brand-red)] hover:bg-[var(--brand-navy)]" disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                {saving ? (selectedFile ? "Uploading..." : "Saving...") : "Save Member"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={Boolean(deleteMember)} onOpenChange={() => setDeleteMember(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteMember?.name}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-[var(--brand-red)] hover:bg-[var(--brand-navy)]">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
