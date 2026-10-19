// Umami Cloud por defecto; UMAMI_HOST apunta a una instancia propia.
const UMAMI_SCRIPT = process.env.UMAMI_HOST
  ? `${process.env.UMAMI_HOST}/script.js`
  : "https://cloud.umami.is/script.js";
const UMAMI_COLLECT = process.env.UMAMI_HOST
  ? `${process.env.UMAMI_HOST}/api/send`
  : "https://gateway.umami.is/api/send";

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      { source: "/stats/script.js", destination: UMAMI_SCRIPT },
      { source: "/stats/api/send", destination: UMAMI_COLLECT },
    ];
  },
};

export default nextConfig;
