// app/projects/types/index.ts
export interface ProjectImage {
  id: string;
  url: string;
  caption: string | null;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  sector: 'OIL_GAS' | 'POWER_SECTOR';
  client: string;
  companyRole: string;
  location: string;
  capacity: string | null;
  duration: string | null;
  year: number | null;
  scopeOfWork: string;
  description: string | null;
  status: 'COMPLETED' | 'ONGOING';
  featured: boolean;
  images: ProjectImage[];
  createdAt: string;
  updatedAt: string;
}

export interface SectorCount {
  _count: { sector: number };
  sector: string;
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
    bySector: SectorCount[];
  };
  data: Project[];
}

export interface FilterOption {
  value: string;
  label: string;
}