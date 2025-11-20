import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  trailingSlash: false, // Ensure consistent routing behavior
  images: {
    domains: ["via.placeholder.com"], // add the external host here
  },
};

export default nextConfig;
