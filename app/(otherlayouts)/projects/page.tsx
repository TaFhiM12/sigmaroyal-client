// app/projects/page.tsx (Server Component)
import { Suspense } from 'react';
import { ProjectsSkeleton } from '@/app/components/projects/ProjectsSkeleton';
import { ProjectsResponse } from '@/types/projects';
import ProjectsClient from '@/app/components/projects/ProjectClients';

export const metadata = {
  title: "RUSL | Project",
};

export const revalidate = 3600;

async function getProjects(): Promise<ProjectsResponse | null> {
  try {
    const res = await fetch(
      'https://sigmaroyal-server.onrender.com/api/v1/projects?limit=50',
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
  console.log(initialData);
  return (
    <Suspense fallback={<ProjectsSkeleton />}>
      <ProjectsClient initialData={initialData} />
    </Suspense>
  );
}