// app/admin/projects/page.tsx
import { Suspense } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ProjectsResponse } from '@/types/projects';
import ProjectsClient from '../components/ProjectsClient';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: 'Admin - Manage Projects',
  description: 'Create, edit, and manage projects',
};

async function getProjects(): Promise<ProjectsResponse | null> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/projects?limit=100`,
      {
        cache: 'no-store',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!res.ok) throw new Error('Failed to fetch projects');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return null;
  }
}

export default async function AdminProjectsPage() {
  const projectsData = await getProjects();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your project portfolio</p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      {/* Projects Table Client Component */}
      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-lg" />}>
        <ProjectsClient initialData={projectsData} />
      </Suspense>
    </div>
  );
}