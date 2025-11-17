import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,

  async rewrites() {
    return [
      {
        source: '/matricular-estudiante',
        destination: '/enrollment',
      },
    ];
  },
};

export default nextConfig;
