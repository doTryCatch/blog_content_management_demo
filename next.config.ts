import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    domains: ["via.placeholder.com"], // add the external host here
  },
};

export default nextConfig;
