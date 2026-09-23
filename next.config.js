/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enables lean Docker images; Vercel/Netlify still work with this setting.
  output: "standalone",
  images: {
    remotePatterns: [],
    localPatterns: [
      {
        pathname: "/images/**",
        search: "*",
      },
      {
        pathname: "/**",
      },
    ],
    qualities: [75, 90, 100],
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Serve crisp portraits on retina / 4K displays
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2048, 3840],
    imageSizes: [64, 96, 128, 256, 320, 384, 480, 640],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

module.exports = nextConfig;
