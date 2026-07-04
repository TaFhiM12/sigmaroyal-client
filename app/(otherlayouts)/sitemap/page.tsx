import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { navbarMenu } from "@/app/data/navbar";

export const metadata = {
  title: "Website Sitemap",
  description: "Browse every public section of The Royal Utilisation Services and Sigma Construction Company website.",
};

export default function SitemapPage() {
  return (
    <main className="bg-[#f6f8fb] py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-3xl rounded-xl border border-[#d8e4f5] bg-white p-5 shadow-sm">
          <p className="text-[var(--brand-muted)]">
            Every primary public page is grouped below for quick, accessible navigation.
          </p>
        </div>

        <div className="mt-9 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {navbarMenu.map((item) => (
            <section key={item.title} className="rounded-xl border border-[#d8e4f5] bg-white p-5 shadow-[0_10px_30px_rgba(8,32,74,0.05)]">
              <Link href={item.url} className="group flex items-center justify-between gap-3">
                <h3 className="text-lg font-extrabold text-blue-950 transition-colors group-hover:text-red-600">
                  {item.title}
                </h3>
                <ArrowUpRight className="h-4 w-4 text-blue-700" />
              </Link>
              {item.items && (
                <ul className="mt-4 grid gap-2 border-t border-blue-950/8 pt-4">
                  {item.items.map((subItem) => (
                    <li key={`${subItem.title}-${subItem.url}`}>
                      <Link
                        href={subItem.url}
                        className="flex items-center justify-between gap-3 rounded-lg px-2 py-2 text-sm font-bold text-[var(--brand-copy)] transition-colors hover:bg-blue-50 hover:text-blue-900"
                      >
                        {subItem.title}
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--brand-muted)]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
