/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        // src file zu public folder hinzufügen, falls  von serviceWorker benötigt
        { from: "src/components/WelcomeAudio", to: "components/WelcomeAudio" },
      ],
    }),
  ],
};

module.exports = nextConfig;
