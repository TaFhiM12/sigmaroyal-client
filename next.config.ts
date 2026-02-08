import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
      }
    ],
  },
};

export default nextConfig;
