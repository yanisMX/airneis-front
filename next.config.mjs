/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'c1bb0d8a5f1d.airneis.net',
        pathname: '/medias/serve/**',
      },
    ],
  },
};

export default nextConfig;
