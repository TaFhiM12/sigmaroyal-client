// app/components/projects/ProjectsClient.tsx
'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Project, ProjectsResponse } from '@/types/projects';
import { ProjectModal } from './ProjectModal';
import { ProjectShowcase } from './ProjectShowcase';
import { apiUrl } from '@/lib/api';

interface ProjectsClientProps {
  initialData?: ProjectsResponse | null;
  initialStatus?: 'COMPLETED' | 'ONGOING' | 'UPCOMING';
}

const statusRank: Record<Project['status'], number> = {
  UPCOMING: 0,
  ONGOING: 1,
  COMPLETED: 2,
};

const sortProjectsByDeliveryStatus = (items: Project[]) => {
  return [...items].sort((a, b) => {
    const statusOrder = statusRank[a.status] - statusRank[b.status];
    if (statusOrder !== 0) return statusOrder;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
};

export default function ProjectsClient({ initialData, initialStatus }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const fetchProjects = useCallback(async (statusFilter: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: '50', sortBy: 'updatedAt', sortOrder: 'desc' });
      if (statusFilter !== 'all') {
        params.set('status', statusFilter);
      }

      const res = await fetch(
        apiUrl(`/projects?${params.toString()}`),
        { cache: 'no-store' }
      );
      
      if (!res.ok) throw new Error(`Projects API returned ${res.status}`);

      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        throw new Error('Projects API returned a non-JSON response');
      }
      
      const data: ProjectsResponse = await res.json();
      
      if (data.success) {
        const sortedProjects = sortProjectsByDeliveryStatus(data.data);
        setProjects(sortedProjects);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize with server data
  useEffect(() => {
    if (initialData?.success) {
      const sortedProjects = sortProjectsByDeliveryStatus(initialData.data);
      setProjects(sortedProjects);
      setLoading(false);
    } else {
      fetchProjects(initialStatus || 'all');
    }
  }, [fetchProjects, initialData, initialStatus]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-(--brand-navy) mb-2">Unable to Load Projects</h2>
          <p className="text-(--brand-muted) mb-6">{error}</p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="site-canvas min-h-screen"
    >
      <div className="container mx-auto px-4 py-4 md:py-5">
        <ProjectShowcase 
          projects={projects}
          loading={loading}
          onProjectClick={setSelectedProject}
          activeStatus={initialStatus || 'all'}
        />
      </div>

      <ProjectModal 
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
}
