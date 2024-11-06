/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3001",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: 'https://hotel-reservation-api-ajio.onrender.com/:path*',
        destination: '/api/:path*',
      },
    ]
  },
};

export default nextConfig;
