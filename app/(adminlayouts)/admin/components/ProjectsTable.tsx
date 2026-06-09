"use client";

import React, { useState } from "react";
import { Edit, Trash2, Eye, Star, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types/projects";

interface ProjectsTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => Promise<void>;
  loading?: boolean;
}

const statusColors = {
  COMPLETED: "bg-[#eef4ff] text-[var(--brand-blue)]",
  ONGOING: "bg-blue-100 text-blue-800",
};

const statusLabels = {
  COMPLETED: "Completed",
  ONGOING: "Ongoing",
};

export default function ProjectsTable({
  projects,
  onEdit,
  onDelete,
  loading,
}: ProjectsTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteTitle, setDeleteTitle] = useState<string>("");
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleteId) {
      setDeleting(true);
      await onDelete(deleteId);
      setDeleting(false);
      setDeleteId(null);
    }
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

  if (projects.length === 0) {
    return (
      <div className="text-center py-12 bg-[#f7faff] rounded-lg">
        <p className="text-[var(--brand-muted)]">
          No projects found. Create your first project!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-white overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Sector</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-20">Featured</TableHead>
              <TableHead className="w-20">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id} className="hover:bg-[#f7faff]">
                <TableCell>
                  {project.images && project.images[0] ? (
                    <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                      <Image
                        src={project.images[0].url}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 bg-[#eef4ff] rounded-lg flex items-center justify-center">
                      <span className="text-xs text-[var(--brand-muted)]">No img</span>
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">
                  <div>
                    <p className="line-clamp-1">{project.title}</p>
                    <p className="text-xs text-[var(--brand-muted)]">{project.slug}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {project.sector.replace("_", " ")}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-50 truncate">
                  {project.client}
                </TableCell>
                <TableCell className="max-w-37.5 truncate">
                  {project.location}
                </TableCell>
                <TableCell>
                  <Badge className={statusColors[project.status]}>
                    {statusLabels[project.status]}
                  </Badge>
                </TableCell>
                <TableCell>
                  {project.featured && (
                    <Star className="h-4 w-4 text-[var(--brand-red)] fill-[var(--brand-red)]" />
                  )}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/projects/${project.id}`}>
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit(project)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setDeleteId(project.id);
                          setDeleteTitle(project.title);
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteTitle}&quot;? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
