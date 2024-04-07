/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ["res.cloudinary.com"],
  },
};

// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         hostname: "res.cloudinary.com",
//         protocol: "https",
//       },
//     ],
//   },
// };
// /** @type {import('next').NextConfig} */

// const withSerwist = require("@serwist/next").default({
//   // Note: This is only an example. If you use Pages Router,
//   // use something else that works, such as "service-worker/index.ts".
//   swSrc: "app/sw.ts",
//   swDest: "public/sw.js",
// });

// module.exports = withSerwist({
//   images: {
//     remotePatterns: [
//       {
//         hostname: "res.cloudinary.com",
//         protocol: "https",
//       },
//     ],
//   },
// });
