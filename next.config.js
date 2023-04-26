/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ui-avatars.com"],
    unoptimized: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mp3$/,
      use: { loader: "file-loader" },
      type: "asset/resource",
    });
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
};

module.exports = nextConfig;
