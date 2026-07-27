"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { apiUrl } from "@/lib/api";
import type { Project, ProjectsResponse } from "@/types/projects";
import type { ShowcaseImage } from "@/types/showcase";

const staticFallbacks: ShowcaseImage[] = [
  { id: "fallback-1", imageUrl: "/banner/banner1.jpeg", title: "Energy infrastructure", location: null, sortOrder: 0, isActive: true },
  { id: "fallback-2", imageUrl: "/banner/banner3.jpg", title: "Pipeline engineering", location: null, sortOrder: 1, isActive: true },
  { id: "fallback-3", imageUrl: "/banner/banner4.jpg", title: "Industrial construction", location: null, sortOrder: 2, isActive: true },
  { id: "fallback-4", imageUrl: "/banner/banner5-sharp.png", title: "Process systems", location: null, sortOrder: 3, isActive: true },
];

const projectPhotos = (projects: Project[]): ShowcaseImage[] =>
  projects
    .flatMap((project) =>
      project.images.map((image, index) => ({
        id: `${project.id}-${image.id}`,
        imageUrl: image.url,
        title: image.caption || project.title,
        location: null,
        sortOrder: index,
        isActive: true,
      })),
    )
    .slice(0, 12);

export function ProjectFilmstrip() {
  const [items, setItems] = useState<ShowcaseImage[]>(staticFallbacks);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const showcaseResponse = await fetch(apiUrl("/showcase"), { cache: "no-store" });
        if (showcaseResponse.ok) {
          const showcaseResult = await showcaseResponse.json();
          if (showcaseResult.data?.length) {
            setItems(showcaseResult.data);
            return;
          }
        }

        const projectResponse = await fetch(
          apiUrl("/projects?limit=12&sortBy=updatedAt&sortOrder=desc"),
          { cache: "no-store" },
        );
        if (!projectResponse.ok) return;
        const projectResult: ProjectsResponse = await projectResponse.json();
        const photos = projectPhotos(projectResult.data || []);
        if (photos.length) setItems(photos);
      } catch {
        // Static project visuals remain visible if the API is temporarily unavailable.
      }
    };

    void load();
  }, []);

  useEffect(() => {
    if (items.length < 2) return;

    let animationFrame = 0;
    let cancelled = false;
    let previousTime = performance.now();

    const frame = (now: number) => {
      if (cancelled) return;
      const track = trackRef.current;
      const firstCard = track?.firstElementChild as HTMLElement | null;
      if (track && firstCard) {
        const elapsed = Math.min(now - previousTime, 40);
        const loopWidth = firstCard.offsetWidth * items.length;
        track.scrollLeft += elapsed * 0.045;
        if (track.scrollLeft >= loopWidth) {
          track.scrollLeft -= loopWidth;
        }
      }
      previousTime = now;
      animationFrame = window.requestAnimationFrame(frame);
    };

    animationFrame = window.requestAnimationFrame(frame);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(animationFrame);
    };
  }, [items.length]);

  const loopItems = [...items, ...items];

  return (
    <section aria-label="Project image gallery" className="bg-slate-100">
      <div
        ref={trackRef}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        className="flex w-full overflow-x-auto overscroll-x-contain [&::-webkit-scrollbar]:hidden"
      >
        {loopItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="relative h-[320px] w-[88vw] shrink-0 sm:h-[360px] sm:w-[50vw] lg:h-[clamp(360px,22vw,430px)] lg:w-[25vw]"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              unoptimized
              sizes="(max-width: 639px) 84vw, (max-width: 1023px) 50vw, 25vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
