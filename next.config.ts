import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle — small runtime footprint for the memory-constrained host.
  output: "standalone",
  // Cover images on marketing/content come from arbitrary admin-provided hosts; we use plain <img>.
  images: { unoptimized: true },
};

export default nextConfig;
