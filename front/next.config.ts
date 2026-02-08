import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: ['storage.googleapis.com', 'firebasestorage.googleapis.com'],
  },

  reactCompiler: true,
};

export default withNextIntl(nextConfig);
