// app/admin/projects/new/page.tsx
"use client";
import { Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProjectForm from '../../components/ProjectForm';



export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/admin/projects">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Projects
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-[var(--brand-navy)]">Create New Project</h1>
          <p className="text-[var(--brand-muted)] mt-1">Add a new project to your portfolio</p>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle>Project Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading...</div>}>
            <ProjectForm
              onSuccess={() => {
                window.location.href = '/admin/projects';
              }}
              onCancel={() => {
                window.location.href = '/admin/projects';
              }}
            />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}