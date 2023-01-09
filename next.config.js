/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_BACKEND_URL,
    CLOUDINARY_LINK: process.env.CLOUDINARY_LINK,
    CLOUD: process.env.CLOUD,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
}

module.exports = nextConfig
