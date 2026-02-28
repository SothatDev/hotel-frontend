/** @type {import('next').NextConfig} */
const nextConfig = {
  // 🔥 ថែមកូដស្ពានចម្លងនេះចូល
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:8000/api/:path*', // បញ្ជូនរាល់សំណើ /api ទៅកាន់ Laravel
      },

      {
        // 🔥 ថែមស្ពានថ្មីនេះ សម្រាប់ចម្លងរូបភាពពី Laravel មក Next.js
        source: '/storage/:path*',
        destination: 'http://127.0.0.1:8000/storage/:path*', 
      }
    ];
  },
};

export default nextConfig;