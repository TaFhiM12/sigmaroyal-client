// app/admin/projects/ProjectsClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Project, ProjectsResponse } from '@/types/projects';
import ProjectsTable from './ProjectsTable';
import ProjectForm from './ProjectForm';

interface ProjectsClientProps {
  initialData: ProjectsResponse | null;
}

export default function ProjectsClient({ initialData }: ProjectsClientProps) {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    if (initialData?.success) {
      setProjects(initialData.data);
      setLoading(false);
    } else {
      fetchProjects();
    }
  }, [initialData]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects?limit=100`);
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        toast.success('Project deleted successfully');
        await fetchProjects();
        router.refresh();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error('Failed to delete project');
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleFormSuccess = () => {
    setIsFormOpen(false);
    setEditingProject(null);
    fetchProjects();
    router.refresh();
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  // Listen for URL params to open new project form
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('new') === 'true') {
      handleNewProject();
      // Remove the query param
      window.history.replaceState({}, '', '/admin/projects');
    }
  }, []);

  return (
    <>
      <ProjectsTable
        projects={projects}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProject ? 'Edit Project' : 'Create New Project'}</DialogTitle>
          </DialogHeader>
          <ProjectForm
            project={editingProject || undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}