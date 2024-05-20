/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "*.airneis.net" },
      { hostname: "*.airneis.store" },
      { hostname: "localhost" }
    ]
  }
};

export default nextConfig;
