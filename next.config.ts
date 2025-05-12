import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  async redirects() {
    return [{ source: "/", destination: "/users", permanent: true }];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "referrer-policy",
            value: "same-origin",
          },
          {
            key: "x-content-type-options",
            value: "nosniff",
          },
          {
            key: "strict-transport-security",
            value: "max-age=3153600; includeSubDomains; preload",
          },
          {
            key: "x-xss-protection",
            value: "1; mode=block",
          },
          {
            key: "permissions-policy",
            value: "camera=(), geolocation=(), microphone=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
