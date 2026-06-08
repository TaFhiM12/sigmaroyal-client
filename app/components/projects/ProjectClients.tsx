// app/components/projects/ProjectsClient.tsx
'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Project, ProjectsResponse } from '@/types/projects';
import { FilterBar } from './FilterBar';
import { ProjectModal } from './ProjectModal';
import { ProjectShowcase } from './ProjectShowcase';
import { HeroSection } from './HeroSection';
import { apiUrl } from '@/lib/api';

interface ProjectsClientProps {
  initialData?: ProjectsResponse | null;
  initialStatus?: 'COMPLETED' | 'ONGOING';
}

const getStatsTotal = (data: ProjectsResponse) => {
  return data.counts.completed + data.counts.ongoing || data.meta.total;
};

export default function ProjectsClient({ initialData, initialStatus }: ProjectsClientProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    ongoing: 0,
    sectors: 0
  });
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>(initialStatus || 'all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const fetchProjects = useCallback(async (statusFilter: string) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({ limit: '50' });
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
        const sortedProjects = [...data.data].sort((a, b) => {
          if (a.status === 'ONGOING' && b.status !== 'ONGOING') return -1;
          if (a.status !== 'ONGOING' && b.status === 'ONGOING') return 1;
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        
        setProjects(sortedProjects);
        setFilteredProjects(sortedProjects);
        setStats({
          total: getStatsTotal(data),
          completed: data.counts.completed,
          ongoing: data.counts.ongoing,
          sectors: data.counts.bySector?.length || 0
        });
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
      const sortedProjects = [...initialData.data].sort((a, b) => {
        if (a.status === 'ONGOING' && b.status !== 'ONGOING') return -1;
        if (a.status !== 'ONGOING' && b.status === 'ONGOING') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setProjects(sortedProjects);
      setFilteredProjects(sortedProjects);
      setStats({
        total: getStatsTotal(initialData),
        completed: initialData.counts.completed,
        ongoing: initialData.counts.ongoing,
        sectors: initialData.counts.bySector?.length || 0
      });
      setLoading(false);
    } else {
      fetchProjects(initialStatus || 'all');
    }
  }, [fetchProjects, initialData, initialStatus]);

  useEffect(() => {
    setSelectedStatus(initialStatus || 'all');
  }, [initialStatus]);

  // Filter and sort projects
  useEffect(() => {
    let filtered = [...projects];

    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSector !== 'all') {
      filtered = filtered.filter(p => p.sector === selectedSector);
    }

    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    filtered.sort((a, b) => {
      if (a.status === 'ONGOING' && b.status !== 'ONGOING') return -1;
      if (a.status !== 'ONGOING' && b.status === 'ONGOING') return 1;
      
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'year-desc':
          return (b.year || 0) - (a.year || 0);
        case 'year-asc':
          return (a.year || 0) - (b.year || 0);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, searchQuery, selectedSector, selectedStatus, sortBy]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSector('all');
    setSelectedStatus('all');
    setSortBy('newest');
    fetchProjects('all');
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
    fetchProjects(status);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Projects</h2>
          <p className="text-gray-600 mb-6">{error}</p>
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
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
    >
      <HeroSection stats={stats} />
      
      <div className="container mx-auto px-4 py-4 md:py-5">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSector={selectedSector}
          onSectorChange={setSelectedSector}
          selectedStatus={selectedStatus}
          onStatusChange={handleStatusChange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={resetFilters}
          totalResults={filteredProjects.length}
        />

        <ProjectShowcase 
          projects={filteredProjects} 
          loading={loading}
          onProjectClick={setSelectedProject}
          activeStatus={selectedStatus}
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
