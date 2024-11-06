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
  async redirects() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://hotel-reservation-api-ajio.onrender.com/:path*',
        permanent: true
      },
    ]
  },
};

export default nextConfig;
