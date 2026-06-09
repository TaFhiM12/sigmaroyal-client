import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sigma-royal.com";

const staticRoutes = [
  "",
  "/preface",
  "/at-a-glance",
  "/mission-vision",
  "/our-strength",
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
  "/hytorc/about",
  "/contact",
];

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.75,
  }));
}
