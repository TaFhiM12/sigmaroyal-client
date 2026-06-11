// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  compress: true,
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/preface',
        permanent: true,
      },
      {
        source: '/expertise',
        destination: '/our-strength',
        permanent: true,
      },
      {
        source: '/expertise/:path*',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/certifications',
        destination: '/certificates',
        permanent: true,
      },
      {
        source: '/services/:path*',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/downloads',
        destination: '/portfolio',
        permanent: true,
      },
      {
        source: '/media',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/privacy',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/terms',
        destination: '/contact',
        permanent: false,
      },
      {
        source: '/sitemap',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Allow all paths from Cloudinary
      },
      {
        protocol: "https",
        hostname: "sigma-royal.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "vaecontrols.cz",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "docs.google.com",
        pathname: "/**"
      }
    ],
  },
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|otf|pdf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
