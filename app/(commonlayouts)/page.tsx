import { Footer2 } from '@/components/layouts/footer2';
import dynamic from 'next/dynamic';
import HeroCarousel from '../components/Home/HeroCarousole';

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

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-[#f7faff] to-white">
      <HeroCarousel 
        autoPlayInterval={6000}
        showProgressBar={true}
      />
      
      {/* Add smooth scroll behavior */}
      <div className="relative z-10">
        <AboutUs/>
        <AreaOfExpertise />
        <Footer2 />
      </div>
    </main>
  );
}
