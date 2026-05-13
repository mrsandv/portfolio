import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  serverExternalPackages: ["sharp"],
  images: {
    unoptimized: true,
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
