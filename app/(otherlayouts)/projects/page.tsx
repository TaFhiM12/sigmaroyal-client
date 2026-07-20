// app/projects/page.tsx
import { Suspense } from 'react';
import { ProjectsSkeleton } from '@/app/components/projects/ProjectsSkeleton';
import { ProjectsResponse } from '@/types/projects';
import ProjectsClient from '@/app/components/projects/ProjectClients';
import { apiUrl } from '@/lib/api';

export const metadata = {
  title: "Projects | The Royal Utilisation Services",
  description: "Explore our portfolio of oil & gas, power sector, and energy infrastructure projects across Bangladesh.",
};

export const revalidate = 3600;

const normalizeStatus = (status?: string | string[]) => {
  const value = Array.isArray(status) ? status[0] : status;
  const normalizedStatus = value?.toUpperCase();

  return normalizedStatus === 'COMPLETED' || normalizedStatus === 'ONGOING' || normalizedStatus === 'UPCOMING'
    ? normalizedStatus
    : undefined;
};

async function getProjects(status?: string): Promise<ProjectsResponse | null> {
  try {
    const params = new URLSearchParams({ limit: '50', sortBy: 'updatedAt', sortOrder: 'desc' });
    if (status) params.set('status', status);

    const res = await fetch(
      apiUrl(`/projects?${params.toString()}`),
      { 
        next: { revalidate: 3600 },
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!res.ok) {
      return null;
    }

    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch {
    return null;
  }
}

interface ProjectsPageProps {
  searchParams?: Promise<{ status?: string | string[] }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const params = searchParams ? await searchParams : {};
  const initialStatus = normalizeStatus(params.status);
  const initialData = await getProjects(initialStatus);

  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsClient initialData={initialData} initialStatus={initialStatus} />
    </Suspense>
  );
}
