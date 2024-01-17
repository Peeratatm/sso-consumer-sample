/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      });
  
      return config;
    },
    env: {
      API_HOST: process.env.API_HOST,
      APP_ID: process.env.APP_ID,
      SSO_SERVICE_URL: process.env.SSO_SERVICE_URL
    },
    experimental: {
      serverActions: false,
    }
  };
  
  module.exports = nextConfig;
  