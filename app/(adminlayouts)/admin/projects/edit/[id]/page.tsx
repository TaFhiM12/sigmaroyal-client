// app/admin/projects/edit/[id]/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectForm from '../../../components/ProjectForm';
import { Project } from '@/types/projects';

interface EditProjectPageProps {
  params: {
    id: string;
  };
}

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // console.log('Fetching project with ID:', params.id);
        // console.log('API URL:', `${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}`);
        
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/${params.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        // console.log('Response status:', res.status);
        
        if (!res.ok) {
          const text = await res.text();
          console.error('Response body:', text);
          throw new Error(`Failed to fetch project: ${res.status}`);
        }
        
        const data = await res.json();
        // console.log('Fetched project data:', data);
        
        if (data.success && data.data) {
          setProject(data.data);
        } else {
          setError('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch project');
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchProject();
    }
  }, [params.id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
        <p className="text-gray-600 mb-6">{error || "The project you're looking for doesn't exist."}</p>
        <Button asChild>
          <Link href="/admin/projects">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
          <p className="text-gray-600 mt-1">Update project information</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectForm
            project={project}
            onSuccess={() => router.push('/admin/projects')}
            onCancel={() => router.push('/admin/projects')}
          />
        </CardContent>
      </Card>
    </div>
  );
}