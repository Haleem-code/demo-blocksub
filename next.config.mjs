/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,  // Add trailing slashes if necessary
    basePath: '',         // Set if deploying to a subdirectory
  
    async redirects() {
      return [
        {
          source: '/auth',
          destination: '/auth/page.tsx',  // Redirect to the correct path
          permanent: true,
        },
      ];
    },
  
    experimental: {
      serverActions: false,  // Disable if not using experimental features
    },
  };
  
  export default nextConfig;
  