/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
};

module.exports = nextConfig;
