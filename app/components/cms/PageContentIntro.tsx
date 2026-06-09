"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { FileText } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { pageSlugFromPath } from "@/lib/page-content";
import { PageContent } from "@/types/page-content";

type CmsSection = {
  title?: string;
  body?: string;
  imageUrl?: string;
  items?: Array<string | { title?: string; body?: string }>;
};

const isSectionArray = (value: unknown): value is CmsSection[] => {
  return Array.isArray(value);
};

export default function PageContentIntro() {
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

  if (!content?.introTitle && !content?.introBody && !isSectionArray(content?.sections)) {
    return null;
  }

  const sections = isSectionArray(content.sections) ? content.sections : [];

  return (
    <section className="border-b border-[#d8e4f5] bg-white py-8 md:py-10">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {(content.introTitle || content.introBody) && (
          <div className="max-w-4xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#eef4ff] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[var(--brand-blue)]">
              <FileText className="h-4 w-4" />
              Page Content
            </div>
            {content.introTitle && (
              <h2 className="text-3xl font-extrabold tracking-normal text-[var(--brand-navy)] md:text-4xl">
                {content.introTitle}
              </h2>
            )}
            {content.introBody && (
              <p className="mt-4 text-base font-medium leading-7 text-[var(--brand-muted)] md:text-lg">
                {content.introBody}
              </p>
            )}
          </div>
        )}

        {sections.length > 0 && (
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((section, index) => (
              <article key={`${section.title || "section"}-${index}`} className="rounded-lg border border-[#d8e4f5] bg-[#f7faff] p-5">
                {section.title && (
                  <h3 className="text-lg font-extrabold text-[var(--brand-navy)]">{section.title}</h3>
                )}
                {section.body && (
                  <p className="mt-2 text-sm leading-6 text-[var(--brand-muted)]">{section.body}</p>
                )}
                {section.items && section.items.length > 0 && (
                  <ul className="mt-4 space-y-2 text-sm text-[var(--brand-copy)]">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="border-l-2 border-red-600 pl-3">
                        {typeof item === "string" ? item : (
                          <>
                            {item.title && <span className="block font-bold">{item.title}</span>}
                            {item.body && <span className="text-[var(--brand-muted)]">{item.body}</span>}
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
