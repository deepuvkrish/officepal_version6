// import type { NextConfig } from 'next'

// const nextConfig: NextConfig = {
//   reactStrictMode: true,
//   experimental: {
//     serverActions: {}, // ✅ Correct format for Next.js 15+
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'lh3.googleusercontent.com',
//         pathname: '/**',
//       },
//     ],
//   },
// }


// export default nextConfig

// next.config.js
/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      // optional: increase body size if needed (only valid shape)
      bodySizeLimit: "2mb"
    },
  },
}


