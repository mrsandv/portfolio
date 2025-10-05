import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        `https://${process.env.STORAGE_ID}.public.blob.vercel-storage.com/**`,
      ),
    ],
  },
};

export default nextConfig;
