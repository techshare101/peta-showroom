import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure we don't have hydration mismatches
  reactStrictMode: true,
};

export default nextConfig;
