/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    apiUrl: "http://localhost:3000/api",
    dbName: "Next-Events",
    uri: "mongodb+srv://Unity_Ali:Alikiller1383@cluster0.nugvrtq.mongodb.net/?retryWrites=true&w=majority",
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
