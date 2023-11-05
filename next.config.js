/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  nextConfig,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
        port: "",
        pathname: "/id",
      },
    ],
  },
};
