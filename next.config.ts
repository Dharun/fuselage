import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GitHub Pages serves this repository at the account root, so the standard
  // Next.js static export can be deployed without a path prefix.
  output: process.env.GITHUB_PAGES ? "export" : undefined,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
