import { Footer2 } from "@/components/layouts/footer2";
import Navbar1 from "@/components/layouts/navbar1";
import HeroBanner from "../components/Home/HeroBanner";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="site-canvas min-h-screen flex flex-col">
        {/* Static Navbar */}
        <Navbar1 />

        <HeroBanner />
        <main className="site-canvas flex-1">
          {children}
        </main>

        {/* Footer at bottom */}
        <Footer2 />
      </div>
  );
}
