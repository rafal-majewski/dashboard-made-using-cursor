/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/dashboard-with-preline' : '',
  // basePath is only applied in production, for local development it uses root path
};

module.exports = nextConfig; 