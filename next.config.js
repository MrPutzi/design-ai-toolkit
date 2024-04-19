/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {

    remotePatterns: [
      {
        protocol: "https",
        hostname: "replicate.com",
      },
      {
        protocol: "https",
        hostname: "replicate.delivery",
      },
      {
        protocol: "https",
        hostname: "upcdn.io",
      },
    ],
  },
};
