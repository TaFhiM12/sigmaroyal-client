// types/certification.ts
export interface Certification {
  id: string;
  title: string;
  shortLabel: string;
  src: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CertificationFormData {
  title: string;
  shortLabel: string;
  src: string;
  order: number;
  isActive: boolean;
}

export interface CertificationsResponse {
  success: boolean;
  data: Certification[];
  message?: string;
}