// app/components/projects/ProjectsSkeleton.tsx
'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ProjectsSkeleton() {
  return (
    <div className="site-canvas min-h-screen">
      {/* Hero Skeleton */}
      <section className="border-b border-[#d8e4f5] bg-white py-4 md:py-5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-8 w-64" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-11 w-28 rounded-lg" />
              ))}
              <Skeleton className="h-11 w-24 rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4 py-4 md:py-5">
        <Skeleton className="h-9 w-full mb-4" />
        
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
