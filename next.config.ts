import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['localhost','apni-dukan-backend.onrender.com','apni-dukan-eta.vercel.app'], // Add 'localhost' to allow images from your backend
  },
};

export default nextConfig;
