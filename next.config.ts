import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "nik-lms-yt-video-subscribe.t3.storageapi.dev",
        port: "",
        protocol: "https",
      },
    ],
  }
};

export default nextConfig;
