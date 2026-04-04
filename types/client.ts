// types/client.ts
export interface Client {
  id: string;
  name: string;
  logoUrl: string;
  website: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ClientFormData {
  name: string;
  logoUrl: string;
  website: string;
  order: number;
  isActive: boolean;
}

export interface ClientsResponse {
  success: boolean;
  data: Client[];
  message?: string;
}