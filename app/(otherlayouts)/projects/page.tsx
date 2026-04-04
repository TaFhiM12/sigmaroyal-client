// app/projects/page.tsx
import { Suspense } from 'react';
import { ProjectsSkeleton } from '@/app/components/projects/ProjectsSkeleton';
import { ProjectsResponse } from '@/types/projects';
import ProjectsClient from '@/app/components/projects/ProjectClients';

export const metadata = {
  title: "Projects | The Royal Utilisation Services",
  description: "Explore our portfolio of oil & gas, power sector, and energy infrastructure projects across Bangladesh.",
};

export const revalidate = 3600;

async function getProjects(): Promise<ProjectsResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects?limit=50`,
      { 
        next: { revalidate: 3600 },
        headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status}`);
      return null;
    }
    
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export default async function ProjectsPage() {
  const initialData = await getProjects();
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsClient initialData={initialData} />
    </Suspense>
  );
}