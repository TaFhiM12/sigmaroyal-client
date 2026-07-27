export interface ShowcaseImage {
  id: string;
  imageUrl: string;
  title: string;
  location: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}
