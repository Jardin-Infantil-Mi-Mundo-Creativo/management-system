import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.googleapis.com', 'firebasestorage.googleapis.com'],
  },

  reactCompiler: true,

  async rewrites() {
    return [
      {
        destination: '/enrollment',
        source: '/matricular-estudiante',
      },
    ];
  },
};

export default nextConfig;
