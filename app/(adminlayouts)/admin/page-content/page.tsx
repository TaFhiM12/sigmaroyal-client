import PageContentAdminClient from "../components/PageContentAdminClient";
import { PageContent } from "@/types/page-content";
import { apiUrl } from "@/lib/api";

export const metadata = {
  title: "Admin - Page Content",
};

async function getPageContents(): Promise<PageContent[]> {
  try {
    const res = await fetch(apiUrl("/page-content"), {
      cache: "no-store",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return [];

    const data = await res.json();
    return data.success ? data.data : [];
  } catch {
    return [];
  }
}

export default async function AdminPageContentPage() {
  const pages = await getPageContents();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-(--brand-navy)">Page Content CMS</h1>
        <p className="mt-1 text-(--brand-muted)">
          Edit every page&apos;s static headings, body copy, banner images, SEO text and flexible sections.
        </p>
      </div>

      <PageContentAdminClient initialPages={pages} />
    </div>
  );
}
