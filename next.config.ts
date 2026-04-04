// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
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
};

export default nextConfig;