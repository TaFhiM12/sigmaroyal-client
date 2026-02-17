import yearsExperience from "@/lib/yearsExperience";
import { CarouselSlide } from "@/types/carouselSlide";

export const customSlides: CarouselSlide[] = [
  {
    id: 1,
    image: "/banner/banner1.jpeg",
    title: "Engineering Energy Infrastructure Since 1977",
    subtitle: `${yearsExperience}+ Years of Excellence in Oil, Gas & Power`,
    description:
      "ISO-certified EPC contractor delivering cross-country pipelines, LNG/LPG systems, power plants and large-scale infrastructure projects across Bangladesh.",
    ctaText: "Explore Our Projects",
    ctaLink: "/projects",
  },
  {
    id: 2,
    image: "/banner/banner2.png",
    title: "Cross-Country Pipeline & HDD Specialists",
    subtitle: "High-Pressure Gas Transmission & River Crossings",
    description:
      "Proven expertise in large-diameter pipeline construction, horizontal directional drilling (HDD), RMS and CTMS facilities.",
    ctaText: "Pipeline Projects",
    ctaLink: "/projects/pipeline",
  },
  {
    id: 3,
    image: "/banner/banner3.jpg",
    title: "Comprehensive LNG & LPG Infrastructure Solutions",
    subtitle: "Design • Fabrication • Installation • Commissioning",
    description:
      "Complete industrial and commercial LPG systems including storage tanks, manifold systems, auto LPG stations and reticulated networks.",
    ctaText: "Our Energy Solutions",
    ctaLink: "/solutions",
  },
  {
    id: 4,
    image: "/banner/banner4.jpg",
    title: "Power Plant & Process Infrastructure Construction",
    subtitle: "Civil, Mechanical, Electrical & Instrumentation Works",
    description:
      "Balance of Plant construction, gas transmission systems and full EPC support for major power generation facilities.",
    ctaText: "Power Projects",
    ctaLink: "/projects/power",
  },
  {
    id: 5,
    image: "/banner/banner5.jpg",
    title: "Trusted by National & International Energy Leaders",
    subtitle: "PetroBangla Enlisted • ISO Certified • Government Approved",
    description:
      "Delivering complex energy infrastructure projects with safety, precision and long-term operational reliability.",
    ctaText: "Our Clients",
    ctaLink: "/clients",
  },
];
