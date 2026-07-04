const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://sigma-royal.com"
).replace(/\/+$/, "");

const staticRoutes = [
  "",
  "/preface",
  "/at-a-glance",
  "/mission-vision",
  "/our-strength",
  "/expertise",
  "/team",
  "/team/core-management",
  "/team/hr-admin",
  "/team/accounts-finance",
  "/team/engineers",
  "/team/officers",
  "/team/members",
  "/clients",
  "/projects",
  "/certificates",
  "/qhse-policy",
  "/portfolio",
  "/media",
  "/notices",
  "/sitemap",
  "/hytorc/about",
  "/contact",
];

export const revalidate = 3600;

export function GET() {
  const lastModified = new Date().toISOString();
  const urls = staticRoutes
    .map(
      (route) => `  <url>
    <loc>${siteUrl}${route}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${route === "" ? "weekly" : "monthly"}</changefreq>
    <priority>${route === "" ? "1.0" : "0.75"}</priority>
  </url>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control":
        "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
