/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    // ⚡ enable Turbopack (replacement for experimental.turbo)
    enabled: true,
    // optional: ensure the correct project root (fixes lockfile warnings)
    root: "./",
  },
  images: {
    // 🚀 skip Next.js image optimization in dev (faster reloads)
    unoptimized: process.env.NODE_ENV === "development",
  },
  eslint: {
    // ✅ don’t block builds on lint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
