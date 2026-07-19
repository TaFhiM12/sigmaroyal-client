import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera, PlayCircle } from "lucide-react";
import { getPageContent } from "@/lib/page-content";

export const metadata = {
  title: "Media Gallery",
  description:
    "Browse project photography, corporate milestones and media from The Royal Utilisation Services and Sigma Construction Company.",
};

const photos = [
  { src: "/banner/banner1.jpeg", title: "Pipeline Infrastructure", category: "Oil & Gas" },
  { src: "/banner/banner2.png", title: "Industrial Delivery", category: "Engineering" },
  { src: "/banner/banner3.jpg", title: "Power Infrastructure", category: "Power" },
  { src: "/banner/banner4.jpg", title: "Process Facilities", category: "Process Plant" },
  { src: "/banner/banner5-sharp.png", title: "Energy Solutions", category: "Project Site" },
  { src: "/banner/banner5.jpg", title: "Construction Excellence", category: "Operations" },
];

type MediaPhoto = (typeof photos)[number];

const parsePhotos = (sections: unknown): MediaPhoto[] => {
  if (!Array.isArray(sections)) return [];
  return sections.filter((item): item is MediaPhoto => {
    if (!item || typeof item !== "object") return false;
    const photo = item as Partial<MediaPhoto>;
    return (
      typeof photo.src === "string" &&
      typeof photo.title === "string" &&
      typeof photo.category === "string"
    );
  });
};

export default async function MediaPage() {
  const content = await getPageContent("media");
  const managedPhotos = parsePhotos(content?.sections);
  const gallery = managedPhotos.length > 0 ? managedPhotos : photos;

  return (
    <main className="site-canvas">
      <section id="photo-gallery" className="scroll-mt-28 border-b border-blue-950/8 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="section-kicker">
                <Camera className="h-4 w-4" />
                Visual Archive
              </span>
              <h2 className="section-title-sm mt-4">{content?.introTitle || "Project photography"}</h2>
              <p className="mt-3 max-w-2xl text-(--brand-muted)">
                {content?.introBody || "A curated record of infrastructure delivery, field operations and company milestones."}
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex w-fit items-center gap-2 text-sm font-extrabold text-blue-900 transition-colors hover:text-red-600"
            >
              Explore project records
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((photo) => (
              <article
                key={photo.src}
                className="group relative aspect-[4/3] overflow-hidden rounded-xl bg-blue-950 shadow-[0_18px_45px_rgba(8,32,74,0.12)]"
              >
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-blue-950/90 via-blue-950/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-blue-200">
                    {photo.category}
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-white">{photo.title}</h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="video-gallery" className="scroll-mt-28 bg-transparent py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="rounded-2xl border border-[#d8e4f5] bg-blue-950 p-7 text-white shadow-[0_20px_55px_rgba(8,32,74,0.16)] md:p-10">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em] text-blue-200">
                  <PlayCircle className="h-4 w-4" />
                  Video Gallery
                </span>
                <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
                  Project and corporate films
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-blue-100/78 md:text-base">
                  The verified video library is being consolidated into this media hub. For approved
                  project footage or press materials, contact the corporate team.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-white px-5 text-sm font-extrabold text-blue-950 transition-colors hover:bg-red-600 hover:text-white"
              >
                Request media
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
