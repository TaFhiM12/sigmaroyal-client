"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
import yearsExperience from "@/lib/yearsExperience";
import { apiUrl } from "@/lib/api";
import { pageSlugFromPath } from "@/lib/page-content";
import { PageContent } from "@/types/page-content";

export default function HeroBanner() {
  const pathname = usePathname();
  const [content, setContent] = useState<PageContent | null>(null);

  useEffect(() => {
    let active = true;

    const loadContent = async () => {
      try {
        const res = await fetch(apiUrl(`/page-content/${pageSlugFromPath(pathname)}`), {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();

        if (active && res.ok && data.success) {
          setContent(data.data);
        }
      } catch {
        if (active) setContent(null);
      }
    };

    loadContent();
    return () => {
      active = false;
    };
  }, [pathname]);

  // Convert route into title, with special case for QHSE Policy
  const getTitle = () => {
    if (pathname === "/") return "HOME";
    if (pathname === "/qhse-policy") return "QHSE Policy";
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

  const title = content?.heroTitle || getTitle();
  const subtitle = content?.heroSubtitle;
  const heroImageUrl = content?.heroImageUrl || "/banner/banner1.jpeg";

  return (
    <section className="relative h-[320px] overflow-hidden sm:h-[350px] md:h-[400px]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${heroImageUrl}')`,
        }}
      >
        {/* linear Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-blue-950/92 via-blue-950/68 to-blue-950/20" />
        <div className="absolute inset-0 bg-linear-to-t from-[var(--brand-navy)]/78 via-transparent to-blue-950/20" />
        
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
        <div className="flex h-full flex-col justify-end pb-8 pt-24 md:pb-12">
          {/* Breadcrumb Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 md:mb-6"
          >
            <nav className="flex flex-wrap items-center gap-2 text-xs font-semibold text-white/80 md:text-sm">
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
              className="max-w-3xl space-y-3 md:space-y-4"
            >
              <div className="flex items-center gap-3">
                {/* Animated Red Line */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "52px" }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="h-0.75 rounded-full bg-blue-500 md:h-1"
                />
                
                <span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-blue-100 md:text-sm">
                  {yearsExperience} YEARS OPERATING
                </span>
              </div>

              <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-normal text-white sm:text-4xl md:text-5xl lg:text-6xl">
                {title}
                <motion.span 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: 0.6 }}
                  className="mt-3 block h-1 rounded-full bg-linear-to-r from-blue-500 via-blue-400 to-transparent md:mt-4"
                />
              </h1>
              {subtitle && (
                <p className="max-w-2xl text-base font-medium leading-7 text-blue-50/85 md:text-lg">
                  {subtitle}
                </p>
              )}
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
              <div className="w-16 h-0.5 bg-linear-to-l from-blue-500 to-transparent" />
            </motion.div>
          </div>

          {/* Bottom Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="mt-6 h-0.5 rounded-full bg-linear-to-r from-transparent via-blue-500/60 to-transparent md:mt-8"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-6 right-6 hidden md:block md:right-8"
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
