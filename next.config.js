/** @type {import('next').NextConfig} */
const { parsed: localEnv } = require("dotenv").config();

const nextConfig = {
  env: { apiUrl: localEnv.apiUrl, dbName: localEnv.dbName, uri: localEnv.uri },
  reactStrictMode: true,
};

module.exports = nextConfig;
