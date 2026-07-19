'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  Clock3,
  Factory,
  MapPin,
  Share2,
  ShieldCheck,
  X,
} from 'lucide-react';
import { Project } from '@/types/projects';
import { getProjectSectorLabel } from '@/lib/project-sectors';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusLabel: Record<Project['status'], string> = {
  COMPLETED: 'Completed',
  ONGOING: 'In progress',
  UPCOMING: 'Upcoming',
};

function ProjectFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex gap-3 border-b border-slate-200 py-3 last:border-0">
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-0.5 text-sm font-semibold leading-5 text-slate-900">{value}</p>
      </div>
    </div>
  );
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [copied, setCopied] = useState(false);

  const images = useMemo(
    () => project?.images?.filter((image) => image.url?.startsWith('http')) ?? [],
    [project],
  );

  const previousImage = useCallback(() => {
    setCurrentImage((index) => (index === 0 ? images.length - 1 : index - 1));
  }, [images.length]);

  const nextImage = useCallback(() => {
    setCurrentImage((index) => (index === images.length - 1 ? 0 : index + 1));
  }, [images.length]);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft' && images.length > 1) previousImage();
      if (event.key === 'ArrowRight' && images.length > 1) nextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length, isOpen, nextImage, onClose, previousImage, project?.id]);

  const shareProject = async () => {
    const shareData = { title: project?.title ?? 'Project', url: window.location.href };
    if (navigator.share) {
      await navigator.share(shareData).catch(() => undefined);
      return;
    }

    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  if (!project) return null;

  const safeImageIndex = Math.min(currentImage, Math.max(images.length - 1, 0));
  const activeImage = images[safeImageIndex]?.url;
  const overview = project.description || project.scopeOfWork;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-0 backdrop-blur-sm sm:p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex h-full w-full max-w-6xl flex-col overflow-hidden bg-white shadow-2xl sm:h-auto sm:max-h-[92vh] sm:rounded-xl"
          >
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <span className="h-6 w-1 rounded-full bg-[var(--brand-red)]" />
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">Project reference</p>
                  <p className="truncate text-sm font-bold text-slate-900">{project.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close project details"
              >
                <X className="h-5 w-5" />
              </button>
            </header>

            <div className="overflow-y-auto overscroll-contain">
              <section className="grid border-b border-slate-200 lg:grid-cols-[1.45fr_1fr]">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 lg:aspect-auto lg:min-h-[430px]">
                  {activeImage ? (
                    <Image
                      src={activeImage}
                      alt={images[safeImageIndex]?.caption || project.title}
                      fill
                      priority
                      unoptimized
                      sizes="(max-width: 1024px) 100vw, 62vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-slate-900 text-sm font-semibold text-slate-400">
                      Project image not available
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={previousImage}
                        className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-md transition hover:bg-white"
                        aria-label="Previous image"
                      >
                        <ArrowLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-md transition hover:bg-white"
                        aria-label="Next image"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <span className="absolute bottom-4 right-4 rounded-md bg-slate-950/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                        {safeImageIndex + 1} / {images.length}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-col justify-center bg-slate-50 px-5 py-8 sm:px-8 lg:px-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-[var(--brand-red)] ring-1 ring-inset ring-red-200">
                      {getProjectSectorLabel(project.sector)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.13em] text-emerald-700 ring-1 ring-inset ring-emerald-200">
                      <ShieldCheck className="h-3 w-3" />
                      {statusLabel[project.status]}
                    </span>
                  </div>

                  <h2 id="project-modal-title" className="mt-5 text-2xl font-bold leading-tight tracking-[-0.025em] text-slate-950 sm:text-3xl">
                    {project.title}
                  </h2>
                  <p className="mt-4 line-clamp-4 text-sm leading-6 text-slate-600 sm:text-base">
                    {overview}
                  </p>

                  <div className="mt-7 grid gap-4 border-t border-slate-200 pt-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Client</p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">{project.client}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">Location</p>
                      <p className="mt-1 text-sm font-semibold leading-5 text-slate-900">{project.location}</p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="grid gap-8 px-5 py-8 sm:px-8 lg:grid-cols-[1fr_320px] lg:px-10 lg:py-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-9 bg-[var(--brand-red)]" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--brand-red)]">Project scope</p>
                  </div>
                  <h3 className="mt-3 text-xl font-bold text-slate-950">Scope of work</h3>
                  <p className="mt-4 max-w-3xl text-[15px] leading-7 text-slate-600">
                    {project.scopeOfWork || project.description}
                  </p>

                  {images.length > 1 && (
                    <div className="mt-9 border-t border-slate-200 pt-7">
                      
                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {images.map((image, index) => (
                          <button
                            type="button"
                            key={image.id}
                            onClick={() => setCurrentImage(index)}
                            className={`relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-100 ring-offset-2 transition ${
                              safeImageIndex === index
                                ? 'ring-2 ring-[var(--brand-red)]'
                                : 'hover:opacity-90 hover:ring-1 hover:ring-slate-300'
                            }`}
                            aria-label={`View image ${index + 1}`}
                          >
                            <Image
                              src={image.url}
                              alt={image.caption || `${project.title} image ${index + 1}`}
                              fill
                              unoptimized
                              sizes="(max-width: 640px) 45vw, 220px"
                              className="object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <aside className="h-fit rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-500">Project facts</p>
                  <div className="mt-2">
                    <ProjectFact icon={<Building2 className="h-4 w-4" />} label="Company role" value={project.companyRole} />
                    {project.capacity && (
                      <ProjectFact icon={<Factory className="h-4 w-4" />} label="Capacity" value={project.capacity} />
                    )}
                    {project.duration && (
                      <ProjectFact icon={<Clock3 className="h-4 w-4" />} label="Duration" value={project.duration} />
                    )}
                    {project.year && (
                      <ProjectFact icon={<CalendarDays className="h-4 w-4" />} label="Year" value={project.year.toString()} />
                    )}
                    <ProjectFact icon={<MapPin className="h-4 w-4" />} label="Project location" value={project.location} />
                  </div>
                  <button
                    type="button"
                    onClick={shareProject}
                    className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-md border border-slate-300 bg-white text-sm font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-100"
                  >
                    {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Share2 className="h-4 w-4" />}
                    {copied ? 'Link copied' : 'Share project'}
                  </button>
                </aside>
              </section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
