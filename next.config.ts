import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["lh3.googleusercontent.com"], // ✅ Allow Google profile avatars
  },
};

export default nextConfig;
