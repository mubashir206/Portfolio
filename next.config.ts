import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Allow LAN / phone testing against the machine IP in `next dev` */
  allowedDevOrigins: [
    "192.168.18.25",
    "172.30.208.1",
    "127.0.0.1",
    "localhost",
  ],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
