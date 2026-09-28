/** @type {import('next').NextConfig} */
const BACKEND_URL = process.env.BACKEND_PROXY_URL || "http://127.0.0.1:5000";

const nextConfig = {
  allowedDevOrigins: [
    '192.168.1.101',
    '192.168.1.*',
    '192.168.*.*',
    'localhost',
    '127.0.0.1',
    '0.0.0.0',
  ],
  async rewrites() {
    return [
      // Don't proxy signature-sync to backend, keep inside Next.js API Route
      {
        source: "/api/signature-sync/:path*",
        destination: "/api/signature-sync/:path*",
      },
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
