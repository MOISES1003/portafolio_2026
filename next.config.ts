import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fpsyluoznepvtqpwynvy.supabase.co"
      }
    ]
  },
  // ← PRISMA + TURBOPACK + VERCEL
  turbopack: {
    resolveAlias: {
      "@prisma/client": "./node_modules/.prisma/client",
      ".prisma/client": "./node_modules/.prisma/client"
    }
  },
  serverExternalPackages: ["@prisma/client", "pg"]
};

export default nextConfig;