import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "neatmarble-us.backendless.app",
      },
    ],
  },
};

export default nextConfig;
