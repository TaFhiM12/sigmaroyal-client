export interface HytorcProduct {
  id: string;
  categoryId: string;
  name: string;
  imageUrl: string;
  targetUrl?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HytorcCategory {
  id: string;
  title: string;
  slug: string;
  breadcrumb: string;
  headline: string;
  description: string;
  highlight?: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  products: HytorcProduct[];
}

export interface HytorcApiResponse {
  success: boolean;
  message: string;
  data: HytorcCategory[];
}

export interface HytorcSingleApiResponse {
  success: boolean;
  message: string;
  data: HytorcCategory;
}

export interface AuthLoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: {
      email: string;
      role: string;
      name: string;
    };
  };
}
