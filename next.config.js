/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: "http://localhost:3000/api",
    dbName: "Next-Events",
    uri: "mongodb://localhost:27017",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
