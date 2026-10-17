import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Canonicalize the duplicate /index route (Vercel file-matching serves
  // index.html for /index, byte-identical to /).
  redirects: async () => {
    return [
      { source: "/index", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
