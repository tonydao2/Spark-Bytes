/** @type {import('next').NextConfig} */
//import { API_URL } from "@/src/common/constants";

const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://cs392-team-4-64c29e353047.herokuapp.com/api/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
