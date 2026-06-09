export interface PageContent {
  id: string;
  slug: string;
  label: string;
  path: string | null;
  heroTitle: string | null;
  heroSubtitle: string | null;
  heroImageUrl: string | null;
  introTitle: string | null;
  introBody: string | null;
  sections: unknown;
  seoTitle: string | null;
  seoDescription: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageContentFormData {
  label: string;
  path: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  introTitle: string;
  introBody: string;
  sections: string;
  seoTitle: string;
  seoDescription: string;
  isPublished: boolean;
}
