import { Footer2 } from '@/components/layouts/footer2';
import dynamic from 'next/dynamic';
import HeroCarousel from '../components/Home/HeroCarousole';
import { getPageContent } from '@/lib/page-content';
import { CarouselSlide } from '@/types/carouselSlide';

const AboutUs = dynamic(() => import('../components/Home/AboutUs'), {
  loading: () => <section className="h-[520px] bg-[#f7faff]" />,
});

const AreaOfExpertise = dynamic(() => import('../components/Home/AreaOfExperties'), {
  loading: () => <section className="h-[620px] bg-white" />,
});

export const metadata = {
  title: "RUSL | Home",
  description: "Engineering, construction and energy infrastructure services for oil, gas, power, LPG and industrial projects in Bangladesh.",
};

const parseSlides = (sections: unknown): CarouselSlide[] => {
  if (!Array.isArray(sections)) return [];

  return sections.filter((item): item is CarouselSlide => {
    if (!item || typeof item !== "object") return false;
    const slide = item as Partial<CarouselSlide>;
    return (
      typeof slide.id === "number" &&
      typeof slide.image === "string" &&
      typeof slide.title === "string"
    );
  });
};

export default async function Home() {
  const content = await getPageContent("home");
  const slides = parseSlides(content?.sections);

  return (
    <main className="min-h-screen bg-linear-to-b from-[#f7faff] to-white">
      <HeroCarousel
        slides={slides}
        autoPlayInterval={6000}
        showProgressBar={true}
      />
      
      {/* Add smooth scroll behavior */}
      <div className="relative z-10">
        <AboutUs heading={content?.introTitle || undefined} body={content?.introBody || undefined} />
        <AreaOfExpertise />
        <Footer2 />
      </div>
    </main>
  );
}
