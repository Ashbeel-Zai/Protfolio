/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdnjs.cloudflare.com', 'fonts.googleapis.com'],
  },
  // This is important for static exports if you plan to use `next export`
  // output: 'export',
  // Optional: Add a trailing slash to all paths
  // trailingSlash: true,
  // Optional: Configure webpack
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
};

module.exports = nextConfig;
