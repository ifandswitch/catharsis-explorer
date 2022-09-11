/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["gmstudio.mypinata.cloud"],
  },
};

module.exports = nextConfig;
