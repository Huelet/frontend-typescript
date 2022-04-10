/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compress: true,
  trailingSlash: true,
  images: {
    domains: ['cdn.huelet.net'],
    loader: "custom"
  }
}