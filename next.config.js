/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  api: {
    bodyParser: {
      sizeLimit: "imb",
    },
  },
};

module.exports = nextConfig;
