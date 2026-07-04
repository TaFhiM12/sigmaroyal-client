import Link from "next/link";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { getPageContent } from "@/lib/page-content";

export const metadata = {
  title: "Notices",
  description:
    "Official notices and corporate announcements from The Royal Utilisation Services and Sigma Construction Company.",
};

const notices = [
  {
    date: "21 February 2024",
    title:
      "গৌরব, প্রেরণা আর আত্মত্যাগের বিনিময়ে প্রাপ্ত বাংলা ভাষার নব সূর্যোদয়—অমর একুশে ফেব্রুয়ারি।",
    label: "Commemoration",
  },
  {
    date: "1 January 2024",
    title: "Happy New Year 2024",
    label: "Corporate",
  },
];

type NoticeItem = (typeof notices)[number];

const parseNotices = (sections: unknown): NoticeItem[] => {
  if (!Array.isArray(sections)) return [];
  return sections.filter((item): item is NoticeItem => {
    if (!item || typeof item !== "object") return false;
    const notice = item as Partial<NoticeItem>;
    return (
      typeof notice.date === "string" &&
      typeof notice.title === "string" &&
      typeof notice.label === "string"
    );
  });
};

export default async function NoticesPage() {
  const content = await getPageContent("notices");
  const managedNotices = parseNotices(content?.sections);
  const noticeItems = managedNotices.length > 0 ? managedNotices : notices;

  return (
    <main className="bg-[#f6f8fb] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <p className="max-w-lg text-[var(--brand-muted)]">
              {content?.introBody || "Company announcements, observances and stakeholder updates are published here."}
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold text-blue-900 transition-colors hover:text-red-600"
            >
              Contact corporate office
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-3">
            {noticeItems.map((notice) => (
              <article
                key={`${notice.date}-${notice.title}`}
                className="rounded-xl border border-[#d8e4f5] bg-white p-5 shadow-[0_10px_30px_rgba(8,32,74,0.06)] md:p-6"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-blue-900">
                    {notice.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand-muted)]">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {notice.date}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-extrabold leading-relaxed text-blue-950 md:text-xl">
                  {notice.title}
                </h3>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
