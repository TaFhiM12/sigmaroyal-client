# Next.js Performance Structure

This project uses the App Router with a mix of SSG, ISR, and dynamic admin pages.

## Structure

```txt
app/
  layout.tsx                 # Global metadata, fonts with display: swap
  sitemap.ts                 # SEO sitemap generated at build/ISR time
  robots.ts                  # Crawling rules
  (commonlayouts)/page.tsx   # Home page
  (otherlayouts)/            # Public company pages
  (adminlayouts)/            # Authenticated admin pages
app/components/              # Page-specific sections
components/layouts/          # Shared navbar, footer, admin sidebar
components/ui/               # Small UI primitives
lib/api.ts                   # API URL + shared public fetch cache options
public/                      # CDN-cacheable static assets
```

## Page Rendering Rules

```ts
// Public pages with CMS/API data should use ISR.
// Keep this value literal because Next.js requires static segment config.
export const revalidate = 3600;

// Shared fetch options keep API responses cacheable for ISR.
const res = await fetch(apiUrl("/employees"), {
  next: { revalidate: 3600 },
  headers: { Accept: "application/json" },
});
```

```ts
// Known dynamic routes should use generateStaticParams for SSG.
export function generateStaticParams() {
  return [
    { category: "core-management" },
    { category: "hr-admin" },
  ];
}
```

## Component Loading

```tsx
// Heavy below-the-fold client components are lazy-loaded.
// The hero stays direct because it affects LCP.
const AboutUs = dynamic(() => import("../components/Home/AboutUs"), {
  loading: () => <section className="h-[520px] bg-[#f7faff]" />,
});
```

## Images

Use `next/image` for all site images:

```tsx
<Image
  src="/banner/banner1.jpeg"
  alt="Industrial energy infrastructure"
  fill
  priority={isLcpImage}
  sizes="100vw"
  className="object-cover"
/>
```

Remote image hosts are controlled in `next.config.ts`, with AVIF/WebP enabled.

## SEO

Global SEO lives in `app/layout.tsx`; page-specific SEO should export `metadata` or `generateMetadata`.

```ts
export const metadata = {
  title: "Projects",
  description: "Explore oil, gas and power infrastructure projects.",
};
```

## Caching

Static assets and Next static chunks use long-lived immutable cache headers in `next.config.ts`.
Admin pages intentionally use `no-store` or dynamic behavior where authenticated data is required.
