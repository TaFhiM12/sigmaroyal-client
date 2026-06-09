import { apiUrl, publicApiFetchOptions } from "@/lib/api";
import { PageContent } from "@/types/page-content";

export const pageSlugFromPath = (pathname: string) => {
  if (!pathname || pathname === "/") return "home";

  const normalized = pathname.replace(/\/+$/, "");

  if (normalized.startsWith("/hytorc/about")) return "hytorc-about";
  if (normalized.startsWith("/team/")) return "team";

  return normalized.split("/").filter(Boolean).join("-");
};

export async function getPageContent(slug: string): Promise<PageContent | null> {
  try {
    const res = await fetch(apiUrl(`/page-content/${slug}`), publicApiFetchOptions);
    if (!res.ok) return null;

    const data = await res.json();
    return data.success ? data.data : null;
  } catch {
    return null;
  }
}
