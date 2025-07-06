/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
  env: {
    DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/sqli_lab',
    JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  },
};

module.exports = nextConfig;
