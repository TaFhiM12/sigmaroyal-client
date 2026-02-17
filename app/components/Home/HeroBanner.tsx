"use client";

import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import yearsExperience from "@/lib/yearsExperience";

export default function HeroBanner() {
  const pathname = usePathname();

  // Convert route into title
  const getTitle = () => {
    if (pathname === "/") return "HOME";
    
    const segments = pathname
      .split("/")
      .filter(Boolean)
      .map(segment => 
        segment
          .replace(/-/g, " ")
          .replace(/\b\w/g, char => char.toUpperCase())
      );
    
    return segments.join(" → ");
  };

  const title = getTitle();

  return (
    <section className="relative h-100 md:h-112.5 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/banner/banner1.jpeg')",
          backgroundAttachment: "fixed",
        }}
      >
        {/* linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-linear(to right, #ffffff 1px, transparent 1px),
                            linear-linear(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
      </div>

      {/* Content Container - Matches Navbar/Footer width */}
      <div className="container relative h-full mx-auto px-4 md:px-6 lg:px-8">
        <div className="h-full flex flex-col justify-end pb-8 md:pb-12">
          {/* Breadcrumb Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <nav className="flex items-center gap-2 text-sm text-white/80">
              <Link href="/" className="flex items-center gap-1 hover:text-red-400 transition-colors">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
              
              {pathname !== "/" && (
                <>
                  <span className="text-white/40">›</span>
                  {pathname.split("/").filter(Boolean).map((segment, index, array) => (
                    <div key={segment} className="flex items-center gap-2">
                      <Link 
                        href={`/${array.slice(0, index + 1).join("/")}`}
                        className="capitalize hover:text-red-400 transition-colors"
                      >
                        {segment.replace(/-/g, " ")}
                      </Link>
                      {index < array.length - 1 && (
                        <span className="text-white/40">›</span>
                      )}
                    </div>
                  ))}
                </>
              )}
            </nav>
          </motion.div>

          {/* Page Title */}
          <div className="flex items-end justify-between">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-3">
                {/* Animated Red Line */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "60px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-1 bg-red-600 rounded-full"
                />
                
                <span className="text-sm font-semibold text-red-400 tracking-wider">
                  {yearsExperience}+ YEARS OF EXCELLENCE
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {title}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="block h-1 bg-linear-to-r from-red-600 to-transparent mt-4 rounded-full"
                />
              </h1>
            </motion.div>

            {/* Decorative Elements - Right Side */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex flex-col items-end gap-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                <span className="text-xs text-white/60">ENERGY INFRASTRUCTURE</span>
              </div>
              <div className="w-16 h-0.5 bg-linear-to-l from-red-600 to-transparent" />
            </motion.div>
          </div>

          {/* Bottom Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-8 h-0.5 bg-linear-to-r from-transparent via-red-600/50 to-transparent rounded-full"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 right-6 md:right-8"
      >
        <div className="flex flex-col items-center text-white/60">
          <span className="text-xs font-medium mb-1">SCROLL</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="h-4 w-0.5 bg-white/60 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}