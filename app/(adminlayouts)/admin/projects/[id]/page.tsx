// app/projects/[id]/page.tsx
import { notFound } from 'next/navigation';
import { Calendar, MapPin, Building2, Briefcase, Gauge, Clock, ArrowLeft, CheckCircle, Clock as ClockIcon, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getProjectSectorLabel } from '@/lib/project-sectors';

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

interface ProjectImage {
  id: string;
  url: string;
  caption: string | null;
}

interface Project {
  id: string;
  title: string;
  slug: string;
  sector: string;
  client: string;
  companyRole: string;
  location: string;
  capacity: string | null;
  duration: string | null;
  year: number | null;
  scopeOfWork: string;
  description: string | null;
  status: 'COMPLETED' | 'ONGOING' | 'UPCOMING';
  featured: boolean;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

async function getProject(id: string): Promise<Project | null> {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`;
    const res = await fetch(url, { cache: "no-store" });
    
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch project');
    }
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("FETCH ERROR:", error);
    return null;
  }
}

// Format status badge
const getStatusBadge = (status: string) => {
  const statusConfig = {
    COMPLETED: { 
      label: 'Completed', 
      className: 'bg-[#eef4ff] text-[var(--brand-blue)] border-[#d8e4f5]',
      icon: CheckCircle
    },
    ONGOING: { 
      label: 'Ongoing', 
      className: 'bg-blue-100 text-blue-800 border-blue-200',
      icon: ClockIcon
    },
    UPCOMING: { 
      label: 'Upcoming', 
      className: 'bg-red-50 text-[var(--brand-red)] border-red-100',
      icon: Calendar
    },
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.COMPLETED;
  const Icon = config.icon;
  return (
    <Badge className={`${config.className} flex items-center gap-1 px-3 py-1`}>
      <Icon className="h-3 w-3" />
      {config.label}
    </Badge>
  );
};

// Format sector
const getSectorLabel = (sector: string) => {
  const sectorMap: Record<string, { label: string; color: string }> = {
    OIL_GAS: { label: getProjectSectorLabel(sector), color: 'from-[var(--brand-red)] to-red-500' },
    POWER_SECTOR: { label: getProjectSectorLabel(sector), color: 'from-blue-500 to-[var(--brand-blue)]' },
  };
  return sectorMap[sector] || { label: getProjectSectorLabel(sector), color: 'from-[var(--brand-blue)] to-[var(--brand-blue)]' };
};

export default async function ProjectViewPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const sectorInfo = getSectorLabel(project.sector);
  const featuredImage = project.images?.[0];
  const galleryImages = project.images?.slice(1) || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-[#f7faff] to-white">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] lg:h-[75vh] overflow-hidden">
        {featuredImage ? (
          <>
            <Image
              src={featuredImage.url}
              alt={project.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[var(--brand-navy)] via-[var(--brand-navy)]/50 to-transparent" />
          </>
        ) : (
          <div className={`absolute inset-0 bg-linear-to-br ${sectorInfo.color}`} />
        )}
        
        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap gap-3 mb-4">
              {getStatusBadge(project.status)}
              <Badge className={`bg-linear-to-r ${sectorInfo.color} text-white border-0 px-3 py-1`}>
                {sectorInfo.label}
              </Badge>
              {project.featured && (
                <Badge className="bg-red-500 text-white border-0 flex items-center gap-1 px-3 py-1">
                  <Star className="h-3 w-3" />
                  Featured Project
                </Badge>
              )}
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl leading-tight">
              {project.title}
            </h1>
            
            <p className="text-lg md:text-xl text-blue-50 mb-6 max-w-2xl">
              {project.client}
            </p>
            
            <Link href="/projects">
              <Button variant="outline" className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Overview Card */}
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="bg-linear-to-r from-red-600 to-red-700 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Project Overview</h2>
              </div>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-[#f7faff] rounded-lg">
                      <Building2 className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wide">Client</p>
                        <p className="font-semibold text-[var(--brand-navy)]">{project.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-[#f7faff] rounded-lg">
                      <Briefcase className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wide">Company Role</p>
                        <p className="font-semibold text-[var(--brand-navy)]">{project.companyRole}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 p-3 bg-[#f7faff] rounded-lg">
                      <MapPin className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wide">Location</p>
                        <p className="font-semibold text-[var(--brand-navy)]">{project.location}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {project.capacity && (
                      <div className="flex items-start gap-3 p-3 bg-[#f7faff] rounded-lg">
                        <Gauge className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wide">Capacity</p>
                          <p className="font-semibold text-[var(--brand-navy)]">{project.capacity}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.duration && (
                      <div className="flex items-start gap-3 p-3 bg-[#f7faff] rounded-lg">
                        <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wide">Duration</p>
                          <p className="font-semibold text-[var(--brand-navy)]">{project.duration}</p>
                        </div>
                      </div>
                    )}
                    
                    {project.year && (
                      <div className="flex items-start gap-3 p-3 bg-[#f7faff] rounded-lg">
                        <Calendar className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <p className="text-xs text-[var(--brand-muted)] uppercase tracking-wide">Year</p>
                          <p className="font-semibold text-[var(--brand-navy)]">{project.year}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Scope of Work */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[var(--brand-navy)] mb-3 flex items-center gap-2">
                    <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                    Scope of Work
                  </h3>
                  <p className="text-[var(--brand-copy)] leading-relaxed whitespace-pre-wrap">
                    {project.scopeOfWork}
                  </p>
                </div>

                {/* Description */}
                {project.description && (
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--brand-navy)] mb-3 flex items-center gap-2">
                      <span className="w-1 h-6 bg-red-600 rounded-full"></span>
                      Description
                    </h3>
                    <p className="text-[var(--brand-copy)] leading-relaxed whitespace-pre-wrap">
                      {project.description}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Gallery Section */}
            {galleryImages.length > 0 && (
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="bg-linear-to-r from-[var(--brand-navy)] to-[var(--brand-navy)] px-6 py-4">
                  <h2 className="text-xl font-semibold text-white">Project Gallery</h2>
                  <p className="text-blue-50/80 text-sm mt-1">View all project images</p>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {galleryImages.map((image, index) => (
                      <div 
                        key={image.id} 
                        className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
                      >
                        <Image
                          src={image.url}
                          alt={`${project.title} - Image ${index + 2}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-[var(--brand-navy)]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <span className="text-white text-sm font-medium bg-[var(--brand-navy)]/60 px-3 py-1 rounded-full">
                            View Image
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Info Card */}
            <Card className="border-0 shadow-lg sticky top-6">
              <div className="bg-linear-to-r from-red-600 to-red-700 px-6 py-4 rounded-t-xl">
                <h3 className="text-lg font-semibold text-white">Quick Information</h3>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-[#eef4ff]">
                    <span className="text-[var(--brand-muted)] text-sm">Project ID</span>
                    <span className="font-mono text-xs text-[var(--brand-navy)] bg-[#eef4ff] px-2 py-1 rounded">
                      {project.id.slice(-8)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#eef4ff]">
                    <span className="text-[var(--brand-muted)] text-sm">Status</span>
                    <div>{getStatusBadge(project.status)}</div>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[#eef4ff]">
                    <span className="text-[var(--brand-muted)] text-sm">Sector</span>
                    <span className="text-[var(--brand-navy)] font-medium">{sectorInfo.label}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[var(--brand-muted)] text-sm">Featured</span>
                    <span className={`text-sm font-medium ${project.featured ? 'text-[var(--brand-red)]' : 'text-[var(--brand-muted)]'}`}>
                      {project.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                <Separator />

                {/* Contact CTA */}
                <div className="bg-linear-to-r from-red-50 to-red-50 rounded-lg p-4 text-center">
                  <p className="text-[var(--brand-copy)] text-sm mb-3">Interested in this project?</p>
                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Contact Us
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {project.images?.length || 0}
                    </div>
                    <div className="text-xs text-[var(--brand-muted)] mt-1">Images</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {project.year || 'N/A'}
                    </div>
                    <div className="text-xs text-[var(--brand-muted)] mt-1">Year</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
