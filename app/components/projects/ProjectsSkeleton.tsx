// app/components/projects/ProjectsSkeleton.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ProjectsSkeleton() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Hero Skeleton */}
      <section className="bg-linear-to-r from-red-700 to-red-900 py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-12 w-64 mx-auto mb-4 bg-white/20" />
          <Skeleton className="h-6 w-96 max-w-full mx-auto mb-12 bg-white/20" />
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 bg-white/20 rounded-2xl" />
            ))}
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-12 w-full mb-8" />
        
        <div className="space-y-12">
          <div>
            <Skeleton className="h-10 w-48 mb-6" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {[1, 2].map(i => (
                <Skeleton key={i} className="h-64 rounded-2xl" />
              ))}
            </div>
          </div>
          
          <div>
            <Skeleton className="h-10 w-48 mb-6" />
            <div className="columns-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <Skeleton key={i} className="h-48 rounded-2xl mb-6" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}