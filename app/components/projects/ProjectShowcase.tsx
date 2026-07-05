// app/components/projects/ProjectShowcase.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowUpRight, Briefcase, CalendarClock, CheckCircle, Clock, FileText, MapPin } from 'lucide-react';
import { Project } from '@/types/projects';
import { getProjectSectorLabel } from '@/lib/project-sectors';

interface ProjectShowcaseProps {
  projects: Project[];
  loading: boolean;
  onProjectClick: (project: Project) => void;
  activeStatus?: string;
}

const placeholderImages = [
  'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=900&auto=format',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&auto=format',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=900&auto=format',
];

const getProjectImage = (project: Project): string => {
  if (project.images?.[0]?.url) return project.images[0].url;

  const index = project.id.charCodeAt(0) % placeholderImages.length;
  return placeholderImages[index];
};

const getSectorLabel = (project: Project) => getProjectSectorLabel(project.sector);

export function ProjectShowcase({
  projects,
  loading,
  onProjectClick,
  activeStatus = 'all',
}: ProjectShowcaseProps) {
  if (loading) return <ShowcaseSkeleton />;

  if (projects.length === 0) {
    return (
      <div className="py-16 text-center">
        <div className="mb-4 inline-flex rounded-full bg-[#eef4ff] p-4">
          <Briefcase className="h-8 w-8 text-[var(--brand-muted)]" />
        </div>
        <p className="text-lg font-semibold text-[var(--brand-muted)]">No projects found</p>
      </div>
    );
  }

  const upcomingProjects = projects.filter((project) => project.status === 'UPCOMING');
  const ongoingProjects = projects.filter((project) => project.status === 'ONGOING');
  const completedProjects = projects.filter((project) => project.status === 'COMPLETED');
  const isStatusView = activeStatus === 'COMPLETED' || activeStatus === 'ONGOING' || activeStatus === 'UPCOMING';
  const pageSummary =
    activeStatus === 'UPCOMING'
      ? { eyebrow: 'Planned delivery', title: 'Upcoming Projects' }
      : activeStatus === 'ONGOING'
      ? { eyebrow: 'Delivery in progress', title: 'Ongoing Projects' }
      : activeStatus === 'COMPLETED'
        ? { eyebrow: 'Delivered work', title: 'Completed Projects' }
        : null;

  return (
    <div className="space-y-6">
      {pageSummary && (
        <div className="flex flex-col gap-2 border-b border-[#d8e4f5] pb-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-red-600">
              {pageSummary.eyebrow}
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-[var(--brand-navy)]">{pageSummary.title}</h2>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
            {projects.length} references
          </span>
        </div>
      )}

      {upcomingProjects.length > 0 && (
        <ProjectCatalog
          title="Upcoming Projects"
          projects={upcomingProjects}
          showHeader={!isStatusView}
          onProjectClick={onProjectClick}
        />
      )}

      {ongoingProjects.length > 0 && (
        <ProjectCatalog
          title="Ongoing Projects"
          projects={ongoingProjects}
          showHeader={!isStatusView}
          onProjectClick={onProjectClick}
        />
      )}

      {completedProjects.length > 0 && (
        <ProjectCatalog
          title="Completed Projects"
          projects={completedProjects}
          showHeader={!isStatusView}
          onProjectClick={onProjectClick}
        />
      )}
    </div>
  );
}

function ProjectCatalog({
  title,
  projects,
  showHeader,
  onProjectClick,
}: {
  title: string;
  projects: Project[];
  showHeader: boolean;
  onProjectClick: (project: Project) => void;
}) {
  const [featuredProject, ...catalogProjects] = projects;

  return (
    <section className="space-y-5">
      {showHeader && (
        <div className="flex items-center justify-between border-b border-[#d8e4f5] pb-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-red-600">
              Project Catalogue
            </p>
            <h2 className="mt-1 text-xl font-extrabold text-[var(--brand-navy)]">{title}</h2>
          </div>
          <span className="h-1.5 w-16 rounded-full bg-red-600" />
        </div>
      )}

      <FeaturedProject
        project={featuredProject}
        imageUrl={getProjectImage(featuredProject)}
        onClick={() => onProjectClick(featuredProject)}
      />

      {catalogProjects.length > 0 && (
        <div className="bg-[#eaf0f3] px-3 py-4 sm:px-4 md:px-5">
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {catalogProjects.map((project, index) => (
              <ProjectCatalogueTile
                key={project.id}
                project={project}
                index={index}
                imageUrl={getProjectImage(project)}
                onClick={() => onProjectClick(project)}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

function FeaturedProject({
  project,
  imageUrl,
  onClick,
}: {
  project: Project;
  imageUrl: string;
  onClick: () => void;
}) {
  const statusMeta = getProjectStatusMeta(project.status);
  const StatusIcon = statusMeta.icon;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClick}
      className="group grid w-full overflow-hidden bg-white text-left shadow-sm transition-all duration-300 hover:shadow-lg md:grid-cols-[1.06fr_1fr]"
    >
      <div className="relative min-h-64 overflow-hidden bg-[#eef4ff] md:min-h-80">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-tr from-blue-950/25 to-transparent" />
      </div>

      <div className="flex min-h-64 flex-col justify-center px-5 py-6 md:px-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-px w-12 bg-[#d8e4f5]" />
          <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-red-600">
            {statusMeta.eyebrow}
          </span>
        </div>

        <h3 className="max-w-xl text-xl font-semibold leading-snug text-[var(--brand-navy)] md:text-2xl">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 max-w-xl text-sm leading-6 text-[var(--brand-muted)]">
          {project.description || project.scopeOfWork}
        </p>

        <div className="mt-5 grid gap-2 text-xs font-semibold text-[var(--brand-muted)] sm:grid-cols-2">
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-red-600" />
            {project.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-red-600" />
            {project.client}
          </span>
        </div>

        <div className="mt-6 inline-flex w-fit items-center gap-2 text-sm font-extrabold text-red-600">
          View project
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </motion.button>
  );
}

function ProjectCatalogueTile({
  project,
  index,
  imageUrl,
  onClick,
}: {
  project: Project;
  index: number;
  imageUrl: string;
  onClick: () => void;
}) {
  const statusMeta = getProjectStatusMeta(project.status);
  const StatusIcon = statusMeta.icon;

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: index * 0.04 }}
      onClick={onClick}
      className="group bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-48 overflow-hidden bg-[#eef4ff]">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="px-5 py-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-[var(--brand-muted)]">
            {getSectorLabel(project)}
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[var(--brand-muted)]">
            <StatusIcon className="h-3.5 w-3.5 text-red-600" />
            {statusMeta.label}
          </span>
        </div>

        <h3 className="min-h-12 text-base font-semibold leading-snug text-[var(--brand-navy)] group-hover:text-red-600">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-4 text-xs leading-5 text-[var(--brand-muted)]">
          {project.description || project.scopeOfWork}
        </p>

        <div className="mt-5 space-y-2 border-t border-[#eef4ff] pt-4 text-xs font-semibold text-[var(--brand-muted)]">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-red-600" />
            <span className="truncate">{project.location}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-red-600" />
            <span className="truncate">{project.client}</span>
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-2 text-xs font-extrabold text-red-600">
          <FileText className="h-3.5 w-3.5" />
          View details
        </div>
      </div>
    </motion.button>
  );
}

function getProjectStatusMeta(status: Project['status']) {
  if (status === 'UPCOMING') {
    return {
      label: 'Upcoming',
      eyebrow: 'Planned delivery',
      icon: CalendarClock,
    };
  }

  if (status === 'ONGOING') {
    return {
      label: 'Ongoing',
      eyebrow: 'Active delivery',
      icon: Clock,
    };
  }

  return {
    label: 'Completed',
    eyebrow: 'Delivered reference',
    icon: CheckCircle,
  };
}

function ShowcaseSkeleton() {
  return (
    <div className="space-y-5">
      <div className="grid overflow-hidden bg-white shadow-sm md:grid-cols-2">
        <div className="h-72 animate-pulse bg-[#d8e4f5]" />
        <div className="space-y-4 p-6">
          <div className="h-4 w-32 animate-pulse bg-[#d8e4f5]" />
          <div className="h-7 w-3/4 animate-pulse bg-[#d8e4f5]" />
          <div className="h-20 w-full animate-pulse bg-[#eef4ff]" />
        </div>
      </div>
      <div className="grid gap-4 bg-[#eaf0f3] p-4 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white">
            <div className="h-48 animate-pulse bg-[#d8e4f5]" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-24 animate-pulse bg-[#d8e4f5]" />
              <div className="h-6 w-4/5 animate-pulse bg-[#d8e4f5]" />
              <div className="h-16 w-full animate-pulse bg-[#eef4ff]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
