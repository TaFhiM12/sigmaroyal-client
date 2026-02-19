import { Footer2 } from '@/components/layouts/footer2';
import AboutUs from '../components/Home/AboutUs';
import AreaOfExpertise from '../components/Home/AreaOfExperties';
import HeroCarousel from '../components/Home/HeroCarousole';
export const metadata = {
  title: "RUSL | Home",
};

export default function Home() {
  return (
    <main className="min-h-screen bg-linear-to-b from-gray-50 to-white">
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