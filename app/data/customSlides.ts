export interface Slide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export const customSlides: Slide[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
    title: "The Royal Utilisation Services (Pvt.) Ltd",
    subtitle: "46+ Years of Excellence",
    description:
      "Pioneer in energy sector with comprehensive infrastructure development in Oil, Gas & Power since 1977",
    ctaText: "View Our Projects",
    ctaLink: "/projects",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
    title: "Cross Country Pipeline Experts",
    subtitle: "HDD River Crossing",
    description:
      "Specialized construction of 42-inch high pressure natural gas pipelines using horizontal directional drilling",
    ctaText: "Our Expertise",
    ctaLink: "/expertise",
  },
];
