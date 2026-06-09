export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  department: string;
  bio: string;
  photoUrl: string;
  phone?: string | null;
  email?: string | null;
  isActive: boolean;
  experienceYears?: number | null;
  education?: string | null;
  orderIndex?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface TeamResponse {
  success: boolean;
  data: TeamMember[];
  message?: string;
}

export interface TeamCategory {
  label: string;
  slug: string;
  department?: string;
}
