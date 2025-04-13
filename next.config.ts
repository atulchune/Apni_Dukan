import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost','https://apni-dukan-backend.onrender.com'], // Add 'localhost' to allow images from your backend
  },
};

export default nextConfig;
