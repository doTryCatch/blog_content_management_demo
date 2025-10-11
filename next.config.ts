import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  trailingSlash: false, // Ensure consistent routing behavior
  images: {
    domains: ["via.placeholder.com"], // add the external host here
  },
  // Ensure proper routing in production
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
