// app/components/projects/ProjectMosaic.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  MapPin, 
  Calendar,
  ChevronRight,
  Zap,
  Droplets,
  Clock,
  CheckCircle,
  ArrowUpRight,
  Search
} from 'lucide-react';
import { Project } from '@/types/projects';

interface ProjectMosaicProps {
  projects: Project[];
  loading: boolean;
  onProjectClick: (project: Project) => void;
}

// Helper functions
const getSectorIcon = (sector: string) => {
  const icons: Record<string, React.ReactNode> = {
    OIL_GAS: <Droplets className="h-5 w-5" />,
    POWER_SECTOR: <Zap className="h-5 w-5" />,
  };
  return icons[sector] || <Zap className="h-5 w-5" />;
};

const getSectorColor = (sector: string) => {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    OIL_GAS: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
    POWER_SECTOR: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200' },
  };
  return colors[sector] || { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200' };
};

// Demo images array for consistent display
const demoImages = [
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070&auto=format&fit=crop",
];

const getProjectImage = (project: Project) => {
  // Use a deterministic index based on project id
  const index = project.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % demoImages.length;
  return demoImages[index];
};

export function ProjectMosaic({ projects, loading, onProjectClick }: ProjectMosaicProps) {
  if (loading) {
    return <MosaicSkeleton />;
  }

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
          <Search className="h-12 w-12 text-gray-400" />
        </div>
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">No projects found</h3>
        <p className="text-gray-600">Try adjusting your filters or search term</p>
      </motion.div>
    );
  }

  // Split projects into ongoing and completed
  const ongoingProjects = projects.filter(p => p.status === 'ONGOING');
  const completedProjects = projects.filter(p => p.status === 'COMPLETED');

  return (
    <div className="space-y-12">
      {/* Ongoing Projects Section */}
      {ongoingProjects.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Active Projects</h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {ongoingProjects.length} in progress
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ongoingProjects.map((project, index) => (
              <OngoingProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        </motion.section>
      )}

      {/* Completed Projects - Masonry Grid */}
      {completedProjects.length > 0 && (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Completed Projects</h2>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              {completedProjects.length} delivered
            </span>
          </div>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {completedProjects.map((project, index) => (
              <CompletedProjectCard 
                key={project.id} 
                project={project}
                index={index}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}

// Ongoing Project Card - Horizontal Layout
function OngoingProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const sectorColors = getSectorColor(project.sector);
  const imageUrl = getProjectImage(project);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden border-2 border-blue-100 hover:border-blue-300 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
        <motion.div 
          initial={{ width: "0%" }}
          animate={{ width: "75%" }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-blue-500"
        />
      </div>

      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="relative md:w-2/5 h-48 md:h-auto overflow-hidden">
          <Image
            src={imageUrl}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/50 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
              <Clock className="h-3 w-3" />
              ONGOING
            </span>
          </div>

          {/* Sector Badge */}
          <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full border ${sectorColors.bg} ${sectorColors.text} ${sectorColors.border} text-xs font-medium flex items-center gap-1`}>
            {getSectorIcon(project.sector)}
            <span>{project.sector === 'OIL_GAS' ? 'Oil & Gas' : 'Power'}</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {project.description || project.scopeOfWork}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span className="line-clamp-1">{project.location}</span>
            </div>
            
            {project.duration && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>Duration: {project.duration}</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-600">{project.client}</span>
            <motion.div
              animate={{ x: 0 }}
              whileHover={{ x: 4 }}
              className="flex items-center gap-1 text-blue-600 font-medium"
            >
              View Details
              <ArrowUpRight className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Completed Project Card - Vertical Masonry
function CompletedProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const sectorColors = getSectorColor(project.sector);
  const imageUrl = getProjectImage(project);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-green-300 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer break-inside-avoid mb-6"
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-medium flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            COMPLETED
          </span>
        </div>

        {/* Sector Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full border bg-white/90 backdrop-blur-sm ${sectorColors.text} ${sectorColors.border} text-xs font-medium flex items-center gap-1`}>
          {getSectorIcon(project.sector)}
          <span>{project.sector === 'OIL_GAS' ? 'Oil & Gas' : 'Power'}</span>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-lg font-bold text-white line-clamp-2 group-hover:text-green-200 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="space-y-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
            <span className="line-clamp-1">{project.location}</span>
          </div>
          
          <p className="text-sm text-gray-500 line-clamp-2">
            {project.description || project.scopeOfWork}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">{project.client}</span>
          <motion.div
            animate={{ x: 0 }}
            whileHover={{ x: 4 }}
            className="flex items-center gap-1 text-green-600 text-sm font-medium"
          >
            Details
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton Loader
function MosaicSkeleton() {
  return (
    <div className="space-y-12">
      <div>
        <div className="h-10 w-48 bg-gray-200 rounded-lg mb-6 animate-pulse" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200">
              <div className="flex">
                <div className="w-2/5 h-48 bg-gray-200 animate-pulse" />
                <div className="flex-1 p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <div className="h-10 w-48 bg-gray-200 rounded-lg mb-6 animate-pulse" />
        <div className="columns-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 mb-6">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}