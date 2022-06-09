/** @type {import(next).NextConfig} */
module.exports = {
  reactStrictMode: true,
  compress: true,
  trailingSlash: true,
  images: {
    domains: ["cdn.huelet.net", "avatars.hueletusercontent.com"],
    loader: "custom"
  }
}