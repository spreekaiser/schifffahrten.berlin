/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  workboxOpts: {
    // Pfad zur generierten Service Worker-Datei
    swDest: "public/service-worker.js",
    // Pfad zur benutzerdefinierten Service Worker-Datei
    importScripts: ["/lib/custom-service-worker.js"],
  },
};

module.exports = nextConfig;
