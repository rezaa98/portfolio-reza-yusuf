import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' blob: data: https://cdn.sanity.io https://github.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://qh9tfzfg.api.sanity.io wss://ws-us3.pusher.com https://otlp-gateway-prod-ap-southeast-2.grafana.net https://vercel.live https://rezaa98.github.io https://raw.githubusercontent.com; frame-src 'self' https://rezaa98.github.io;",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
