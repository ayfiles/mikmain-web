import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // Strikte Security Headers für Production
  async headers() {
    return [
      {
        source: '/:path*', // Gilt für alle Routen
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload' // Erzwingt HTTPS für 2 Jahre
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block' // Blockiert Cross-Site Scripting
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN' // Verhindert Clickjacking (niemand kann deine Seite einbetten)
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff' // Verhindert MIME-Type Sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin' // Datenschutz für Referrer-Daten
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' // Deaktiviert nicht genutzte Browser-APIs
          }
        ]
      }
    ];
  }
};

export default nextConfig;