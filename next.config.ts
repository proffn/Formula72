import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const strapiUrl = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337")
      .replace(/\/$/, "");

    return {
      beforeFiles: [],
      afterFiles: [],
      // Preserve bundled snapshot assets; fetch newer CMS uploads when absent locally.
      fallback: [{ source: "/uploads/:path*", destination: `${strapiUrl}/uploads/:path*` }],
    };
  },
  images: {
    dangerouslyAllowLocalIP: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "formula72-cms.onrender.com",
      },
    ],
  },
};

export default nextConfig;
