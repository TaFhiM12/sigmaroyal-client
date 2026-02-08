import HeroCarousel from '../components/HeroCarousole';

export default function Home() {
  const customSlides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
      title: "The Royal Utilisation Services (Pvt.) Ltd",
      subtitle: "46+ Years of Excellence",
      description: "Pioneer in energy sector with comprehensive infrastructure development in Oil, Gas & Power since 1977",
      ctaText: "View Our Projects",
      ctaLink: "/projects",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070",
      title: "Cross Country Pipeline Experts",
      subtitle: "HDD River Crossing",
      description: "Specialized construction of 42-inch high pressure natural gas pipelines using horizontal directional drilling",
      ctaText: "Our Expertise",
      ctaLink: "/expertise",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2070",
      title: "Complete LPG Solutions",
      subtitle: "End-to-End Services",
      description: "Auto LPG stations, industrial & household systems, storage tanks, and complete reticulated systems",
      ctaText: "Explore Solutions",
      ctaLink: "/solutions",
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
      title: "Power Plant Construction",
      subtitle: "588.31 MW CCPP Project",
      description: "Fabrication & construction of Balance of Plant including steam, fuel, and lube oil pipelines",
      ctaText: "Power Projects",
      ctaLink: "/projects/power",
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2070",
      title: "Trusted by Industry Leaders",
      subtitle: "Government & Private Sector",
      description: "Serving CPP, SGFL, Petrobangla, Titas Gas, and other major clients across Bangladesh",
      ctaText: "Our Clients",
      ctaLink: "/clients",
    },
  ];

  return (
    <>
      <HeroCarousel 
        slides={customSlides}
        autoPlayInterval={6000}
        showControls={true}
        showIndicators={true}
        showProgressBar={true}
      />
      
      {/* Rest of your page content */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Our Core Expertise
          </h2>
          {/* Add your content sections here */}
        </div>
      </section>
    </>
  );
}