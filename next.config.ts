import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle — small runtime footprint for the memory-constrained host.
  output: "standalone",
  // Source is type-checked before it reaches the small deployment host. This
  // opt-in avoids repeating that memory-heavy check there; normal builds still
  // fail on TypeScript errors.
  typescript: {
    ignoreBuildErrors: process.env.NEXT_SKIP_BUILD_TYPECHECK === "1",
  },
  // Admin-provided content keeps using plain <img>; curated marketing photography
  // uses Next Image so it receives responsive sizing and format optimization.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/photo-*",
      },
    ],
  },
};

export default nextConfig;
