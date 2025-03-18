/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/dashboard-with-preline',
  // If the repo name will be different from the root URL, we'll need to add basePath here
}

module.exports = nextConfig 