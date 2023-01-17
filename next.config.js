/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://fazzpay-rose.vercel.app",
    CLOUDINARY_LINK: "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/Fazzpay/example_qx2pf0.png",
    CLOUD: "https://res.cloudinary.com/dd1uwz8eu/image/upload/v1666604839/",
    // NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_BACKEND_URL,
    // CLOUDINARY_LINK: process.env.CLOUDINARY_LINK,
    // CLOUD: process.env.CLOUD,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
