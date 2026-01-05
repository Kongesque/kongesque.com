import type { NextConfig } from "next";

// next.config.js
const nextConfig: NextConfig = {
  images: {
    domains: ['www.kongesque.com'],
  },
  async redirects() {
    return [
      {
        source: '/blog/introducing-zonenet',
        destination: '/blog/introducing-locus',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
