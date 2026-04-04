// app/components/projects/ProjectShowcase.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { MapPin, Calendar, Briefcase, Clock, CheckCircle, Eye, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Project } from '@/types/projects';

interface ProjectShowcaseProps {
  projects: Project[];
  loading: boolean;
  onProjectClick: (project: Project) => void;
}

// Placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&auto=format",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&auto=format",
];

const getProjectImage = (project: Project): string => {
  if (project.images && project.images.length > 0 && project.images[0]?.url) {
    return project.images[0].url;
  }
  const index = project.id.charCodeAt(0) % placeholderImages.length;
  return placeholderImages[index];
};

const getSectorColor = (sector: string) => {
  return sector === 'OIL_GAS' 
    ? { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', badge: 'bg-red-600' }
    : { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', badge: 'bg-gray-700' };
};

export function ProjectShowcase({ projects, loading, onProjectClick }: ProjectShowcaseProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (loading) {
    return <ShowcaseSkeleton />;
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex p-4 bg-gray-100 rounded-full mb-4">
          <Briefcase className="h-8 w-8 text-gray-400" />
        </div>
        <p className="text-gray-500 text-lg">No projects found</p>
      </div>
    );
  }

  const ongoingProjects = projects.filter(p => p.status === 'ONGOING');
  const completedProjects = projects.filter(p => p.status === 'COMPLETED');

  return (
    <div className="space-y-16">
      {/* Ongoing Projects */}
      {ongoingProjects.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-50 rounded-lg">
              <Clock className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Active Projects</h2>
            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
              {ongoingProjects.length}
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {ongoingProjects.map((project) => (
              <OngoingCard
                key={project.id}
                project={project}
                imageUrl={getProjectImage(project)}
                isHovered={hoveredId === project.id}
                onHover={() => setHoveredId(project.id)}
                onLeave={() => setHoveredId(null)}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Projects */}
      {completedProjects.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gray-100 rounded-lg">
              <CheckCircle className="h-5 w-5 text-gray-600" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-900">Completed Projects</h2>
            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              {completedProjects.length}
            </span>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project) => (
              <CompletedCard
                key={project.id}
                project={project}
                imageUrl={getProjectImage(project)}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Ongoing Project Card
function OngoingCard({ project, imageUrl, isHovered, onHover, onLeave, onClick }: any) {
  const sectorColors = getSectorColor(project.sector);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-red-300 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
          <div className="h-full w-3/4 bg-red-600 rounded-full" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-red-600 text-white rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="h-3 w-3" />
            ONGOING
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {project.title}
        </h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400" />
            <span className="line-clamp-1">{project.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="h-4 w-4 text-gray-400" />
            <span className="line-clamp-1">{project.client}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{project.duration || 'In Progress'}</span>
          <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

// Completed Project Card
function CompletedCard({ project, imageUrl, onClick }: any) {
  const sectorColors = getSectorColor(project.sector);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        
        <div className={`absolute inset-0 bg-black/50 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Eye className="h-8 w-8 text-white" />
        </div>

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-gray-700 text-white rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            COMPLETED
          </span>
        </div>

        {project.year && (
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full">
              {project.year}
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-red-600 transition-colors">
          {project.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <MapPin className="h-3.5 w-3.5 text-gray-400" />
          <span className="line-clamp-1">{project.location}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{project.client.split(' ').slice(0, 2).join(' ')}</span>
          <ArrowUpRight className="h-3.5 w-3.5 text-gray-400 group-hover:text-red-600 transition-colors" />
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton Loader
function ShowcaseSkeleton() {
  return (
    <div className="space-y-16">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="h-80 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse" />
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-72 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}