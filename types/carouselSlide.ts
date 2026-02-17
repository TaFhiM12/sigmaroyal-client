export interface CarouselSlide {
  id: number;
  image: string;
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface HeroCarouselProps {
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  showProgressBar?: boolean;
  className?: string;
}

export interface BannerImage {
    id: number
    image: string
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
}
