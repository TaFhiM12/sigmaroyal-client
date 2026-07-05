// types/project.ts
import { ProjectSector } from "@/lib/project-sectors";
export interface ProjectImage {
  id: string;
  url: string;
  caption: string | null;
  isMain?: boolean;
  publicId?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  sector: ProjectSector;
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

export interface ProjectsResponse {
  success: boolean;
  message: string;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  counts: {
    completed: number;
    ongoing: number;
    upcoming: number;
    bySector: Array<{ _count: { sector: number }; sector: string }>;
  };
  data: Project[];
}

export interface ProjectFormData {
  title: string;
  slug: string;
  sector: string;
  client: string;
  companyRole: string;
  location: string;
  capacity: string;
  duration: string;
  year: string;
  scopeOfWork: string;
  description: string;
  status: string;
  featured: boolean;
}
