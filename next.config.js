/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Proxy ALL /api/* calls to the backend
        // This makes the site work from any URL (ngrok, production, etc.)
        // The browser calls /api/... → Next.js server proxies to localhost:3001/api/...
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
