/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "res.cloudinary.com",
        protocol: "https",
      },
    ],
  },
};

module.exports = nextConfig;

//FIXME:1
// const withPWA = require("next-pwa");

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         hostname: "res.cloudinary.com",
//         protocol: "https",
//       },
//     ],
//   },
//   pwa: {
//     dest: "public",
//     // other pwa configuration options go here
//   },
// };

// const withPWA = require("next-pwa");

// const nextConfig = {
//   pwa: {
//     dest: "public",
//     // other pwa configuration options go here
//   },
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
// };

// module.exports = withPWA(nextConfig);
