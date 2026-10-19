// Umami Cloud by default; UMAMI_HOST points to a self-hosted instance.
const UMAMI_SCRIPT = process.env.UMAMI_HOST
  ? `${process.env.UMAMI_HOST}/script.js`
  : "https://cloud.umami.is/script.js";
const UMAMI_COLLECT = process.env.UMAMI_HOST
  ? `${process.env.UMAMI_HOST}/api/send`
  : "https://gateway.umami.is/api/send";

// Baseline hardening. No Content-Security-Policy yet: Turnstile, Umami and
// Next's inline scripts need a nonce-based policy, which is a separate change.
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [{ source: "/:path*", headers: SECURITY_HEADERS }];
  },
  async rewrites() {
    return [
      { source: "/stats/script.js", destination: UMAMI_SCRIPT },
      { source: "/stats/api/send", destination: UMAMI_COLLECT },
    ];
  },
};

export default nextConfig;
