/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
  },
  experimental: {
    turbo: {
      loaders: {}, // Anda bisa tambahkan loader di sini sesuai kebutuhan
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Hanya tambahkan aturan ini untuk Webpack jika mode server tidak aktif
      config.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      });
    }
    return config;
  },
};

module.exports = nextConfig;