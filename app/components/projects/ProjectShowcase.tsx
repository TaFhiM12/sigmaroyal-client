// app/components/projects/ProjectShowcase.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  MapPin, 
  Calendar,
  ArrowUpRight,
  Droplets,
  Zap,
  Sparkles,
  Clock,
  Award,
  Building2,
  Eye
} from 'lucide-react';
import { Project } from '@/types/projects';

interface ProjectShowcaseProps {
  projects: Project[];
  loading: boolean;
  onProjectClick: (project: Project) => void;
}

const getSectorIcon = (sector: string) => {
  const icons: Record<string, React.ReactNode> = {
    OIL_GAS: <Droplets className="h-4 w-4" />,
    POWER_SECTOR: <Zap className="h-4 w-4" />,
  };
  return icons[sector] || <Zap className="h-4 w-4" />;
};

const getSectorColor = (sector: string) => {
  const colors: Record<string, { 
    bg: string; 
    text: string; 
    border: string; 
    linear: string;
  }> = {
    OIL_GAS: { 
      bg: 'bg-red-50', 
      text: 'text-red-700', 
      border: 'border-red-200',
      linear: 'from-red-600 to-red-700',
    },
    POWER_SECTOR: { 
      bg: 'bg-gray-50', 
      text: 'text-gray-700', 
      border: 'border-gray-200',
      linear: 'from-gray-600 to-gray-800',
    },
  };
  return colors[sector] || colors.OIL_GAS;
};

const isValidImageUrl = (url: string): boolean => {
  return url.includes('unsplash.com') && url.startsWith('http');
};

const getValidImageUrl = (project: Project): string | null => {
  if (project.images && project.images.length > 0) {
    const imageUrl = project.images[0].url;
    if (isValidImageUrl(imageUrl)) {
      return imageUrl;
    }
  }
  return null;
};

export function ProjectShowcase({ projects, loading, onProjectClick }: ProjectShowcaseProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  if (loading) {
    return <ShowcaseSkeleton />;
  }

  if (projects.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-32"
      >
        <div className="inline-flex items-center justify-center w-32 h-32 bg-linear-to-br from-red-50 to-gray-50 rounded-full mb-8">
          <Sparkles className="h-16 w-16 text-red-400" />
        </div>
        <h3 className="text-4xl font-light text-gray-900 mb-4">No projects found</h3>
        <p className="text-gray-400 text-lg">Try adjusting your filters</p>
      </motion.div>
    );
  }

  const ongoing = projects.filter(p => p.status === 'ONGOING');
  const completed = projects.filter(p => p.status === 'COMPLETED');

  return (
    <div className="space-y-32">
      {/* Ongoing Projects */}
      {ongoing.length > 0 && (
        <section className="relative">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl py-8 mb-16 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-16 h-16 bg-linear-to-br from-red-600 to-red-700 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 tracking-tight wrap-break-word">

                    IN PROGRESS
                  </h2>
                  <p className="text-gray-500 text-lg mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    {ongoing.length} active project{ongoing.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-24">
            {ongoing.map((project, index) => (
              <OngoingFeature 
                key={project.id} 
                project={project} 
                index={index}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Completed Projects */}
      {completed.length > 0 && (
        <section className="relative">
          <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl py-8 mb-16 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-16 h-16 bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl flex items-center justify-center">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-gray-900 tracking-tight wrap-break-word">
                    COMPLETED
                  </h2>
                  <p className="text-gray-500 text-lg mt-2">
                    {completed.length} delivered project{completed.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Project - First completed project gets hero treatment */}
          {completed.length > 0 && (
            <div className="mb-24">
              <CompletedHero 
                project={completed[0]} 
                onClick={() => onProjectClick(completed[0])}
              />
            </div>
          )}

          {/* Remaining Projects Grid */}
          {completed.length > 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
              {completed.slice(1).map((project, index) => (
                <CompletedGridItem
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => onProjectClick(project)}
                />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

// Ongoing Project Feature
function OngoingFeature({ 
  project, 
  index, 
  onHover,
  onLeave,
  onClick 
}: { 
  project: Project; 
  index: number; 
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const imageUrl = getValidImageUrl(project);
  const sectorColors = getSectorColor(project.sector);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      onHoverStart={onHover}
      onHoverEnd={onLeave}
      onClick={onClick}
      className="group relative cursor-pointer"
    >
      <div className="relative grid lg:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div
  className={`relative ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
                <div className="text-center">
                  <div className="text-7xl mb-3 text-gray-400">🏗️</div>
                  <p className="text-sm text-gray-500">Project visualization</p>
                </div>
              </div>
            )}
            
            <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <div className="px-3 py-1.5 bg-red-600 text-white rounded-full text-xs font-medium flex items-center gap-1 shadow-lg">
                <Clock className="h-3 w-3" />
                ONGOING
              </div>
            </div>

            {/* Location Badge */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex gap-2">
                <div className="flex-1 bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                  <div className="text-xs text-white/60">Location</div>
                  <div className="text-sm font-medium text-white truncate">{project.location}</div>
                </div>
                {project.duration && (
                  <div className="flex-1 bg-black/50 backdrop-blur-sm rounded-lg p-2 border border-white/10">
                    <div className="text-xs text-white/60">Duration</div>
                    <div className="text-sm font-medium text-white">{project.duration}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={`${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'} space-y-4`}>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 bg-linear-to-r ${sectorColors.linear} text-white rounded-full text-xs font-medium`}>
                {project.sector === 'OIL_GAS' ? 'OIL & GAS' : 'POWER'}
              </span>
              {project.featured && (
                <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">
                  FEATURED
                </span>
              )}
            </div>
            
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {project.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed line-clamp-3">
              {project.description || project.scopeOfWork}
            </p>
          </div>

          {/* Key Info */}
          <div className="grid grid-cols-2 gap-4 py-4">
            <div>
              <div className="text-xs text-gray-500">Client</div>
              <div className="font-medium text-gray-900">{project.client}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Role</div>
              <div className="font-medium text-gray-900">{project.companyRole}</div>
            </div>
            {project.capacity && (
              <div className="col-span-2">
                <div className="text-xs text-gray-500">Capacity</div>
                <div className="font-medium text-gray-900">{project.capacity}</div>
              </div>
            )}
          </div>

          <button className="flex items-center gap-2 text-red-600 font-medium group/btn">
            <span>View Details</span>
            <ArrowUpRight className="h-4 w-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Hero Completed Project
function CompletedHero({ project, onClick }: { project: Project; onClick: () => void }) {
  const imageUrl = getValidImageUrl(project);
  const sectorColors = getSectorColor(project.sector);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
      className="group relative cursor-pointer rounded-3xl overflow-hidden h-125 shadow-2xl"
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-1000"
          sizes="100vw"
          priority
          unoptimized
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-800 to-gray-900">
          <div className="text-center text-white/30">
            <div className="text-9xl mb-6">🏆</div>
            <p className="text-2xl">Completed Project</p>
          </div>
        </div>
      )}
      
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 bg-linear-to-r ${sectorColors.linear} text-white rounded-full text-sm font-medium`}>
              {project.sector === 'OIL_GAS' ? 'Oil & Gas' : 'Power'}
            </span>
            {project.featured && (
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm border border-yellow-500/30">
                FEATURED
              </span>
            )}
          </div>
          
          <h3 className="text-4xl md:text-5xl font-bold mb-3">{project.title}</h3>
          
          <p className="text-white/80 mb-6 line-clamp-2">
            {project.description || project.scopeOfWork}
          </p>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-400" />
              <span>{project.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-red-400" />
              <span>{project.client}</span>
            </div>
            {project.year && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-red-400" />
                <span>{project.year}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Completed Grid Item
function CompletedGridItem({ 
  project, 
  index, 
  onClick 
}: { 
  project: Project; 
  index: number; 
  onClick: () => void;
}) {
  const imageUrl = getValidImageUrl(project);
  const sectorColors = getSectorColor(project.sector);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 shadow-lg hover:shadow-xl h-full flex flex-col">
        <div className="relative h-56 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200">
              <div className="text-5xl text-gray-400">🏆</div>
            </div>
          )}
          
          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-black/60 transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <Eye className="h-8 w-8 text-white" />
          </div>
          
          {/* Sector Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 ${sectorColors.bg} ${sectorColors.text} text-xs font-medium rounded-full flex items-center gap-1`}>
              {getSectorIcon(project.sector)}
              <span>{project.sector === 'OIL_GAS' ? 'Oil & Gas' : 'Power'}</span>
            </span>
          </div>

          {/* Year Badge */}
          {project.year && (
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                {project.year}
              </span>
            </div>
          )}
        </div>

        <div className="p-5 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {project.title}
          </h3>
          
          <div className="space-y-2 mb-3 flex-1">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
              <span className="line-clamp-1">{project.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building2 className="h-3.5 w-3.5 text-gray-400" />
              <span className="line-clamp-1">{project.client}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <span className="text-xs text-gray-500">{project.duration || 'Completed'}</span>
            <ArrowUpRight className="h-4 w-4 text-gray-400 group-hover:text-red-600 transition-colors" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Skeleton Loader
function ShowcaseSkeleton() {
  return (
    <div className="space-y-32">
      <div>
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl py-8 mb-16">
          <div className="w-64 h-16 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
        <div className="space-y-24">
          {[1, 2].map(i => (
            <div key={i} className="grid lg:grid-cols-2 gap-8">
              <div className="aspect-4/3 bg-gray-200 rounded-3xl animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl py-8 mb-16">
          <div className="w-64 h-16 bg-gray-200 rounded-2xl animate-pulse" />
        </div>
        <div className="h-125 bg-gray-200 rounded-3xl mb-12 animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}