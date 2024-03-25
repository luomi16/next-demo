/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.pexels.com',
            // Optional: Specify a port if your external source uses a non-standard port
            // port: '8080',
            // Optional: Specify a pathname prefix if you want to match only images from a specific path
            // pathname: '/images/*',
          },
          {
            protocol: 'https',
            hostname: 'github.com',
          },
        ],
      },
};

export default nextConfig;
