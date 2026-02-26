// app/components/projects/ProjectsClient.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

// Components
import { Project, ProjectsResponse } from '@/types/projects';
// import { HeroSection } from './HeroSection';
import { FilterBar } from './FilterBar';
import { ProjectModal } from './ProjectModal';
import { ProjectShowcase } from './ProjectShowcase';

interface ProjectsClientProps {
  initialData?: ProjectsResponse | null;
}

export default function ProjectsClient({ initialData }: ProjectsClientProps) {
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
  // console.log(stats);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  // Initialize with server data
  useEffect(() => {
    if (initialData?.success) {
      // Sort projects to show ongoing first
      const sortedProjects = [...initialData.data].sort((a, b) => {
        if (a.status === 'ONGOING' && b.status !== 'ONGOING') return -1;
        if (a.status !== 'ONGOING' && b.status === 'ONGOING') return 1;
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
      
      setProjects(sortedProjects);
      setFilteredProjects(sortedProjects);
      setStats({
        total: initialData.meta.total,
        completed: initialData.counts.completed,
        ongoing: initialData.counts.ongoing,
        sectors: initialData.counts.bySector.length
      });
      setLoading(false);
    } else {
      fetchProjects();
    }
  }, [initialData]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        'https://sigmaroyal-server.onrender.com/api/v1/projects?limit=50',
        { cache: 'no-store' }
      );
      
      if (!res.ok) throw new Error('Failed to fetch');
      
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
          total: data.meta.total,
          completed: data.counts.completed,
          ongoing: data.counts.ongoing,
          sectors: data.counts.bySector.length
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

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
      className="min-h-screen bg-white"
    >
      {/* <HeroSection stats={stats} /> */}
      
      <div className="container mx-auto px-4 py-12">
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          selectedSector={selectedSector}
          onSectorChange={setSelectedSector}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
          onReset={resetFilters}
          totalResults={filteredProjects.length}
        />

        <ProjectShowcase 
          projects={filteredProjects} 
          loading={loading}
          onProjectClick={setSelectedProject}
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