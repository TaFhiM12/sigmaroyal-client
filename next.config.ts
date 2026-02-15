// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
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
      }
    ],
  },
};

export default nextConfig;