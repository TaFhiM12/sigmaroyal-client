"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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
        <div className="flex h-full items-end pb-8 pt-24 md:pb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[34px] font-extrabold leading-[1.05] tracking-normal text-white sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="mt-3 block h-1 rounded-full bg-linear-to-r from-blue-500 via-blue-400 to-transparent md:mt-4"
              />
            </h1>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
