/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow images from YouTube thumbnails (used in selected-work cards)
  // and Unsplash (kept for future use)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // Vercel: suppress the "framer-motion" peer-dep warning
  // and ensure GSAP server-side imports don't crash the build
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Prevent GSAP / Lenis from being bundled on the server
      config.externals = [...(config.externals || []), 'gsap', 'lenis'];
    }
    return config;
  },
};

export default nextConfig;
