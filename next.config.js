cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'localhost',
      '147.93.46.185', // Menambahkan IP VPS Anda
      'arearumah.com', // Domain produksi (jika ada)
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    // Disable turbopack karena masih experimental
    turbo: false,
    // Tambahkan fitur experimental yang stabil
    serverActions: true,
    typedRoutes: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Webpack configuration
    if (!isServer) {
      config.module.rules.push({
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: dev
                  ? '[name]__[local]__[hash:base64:5]'
                  : '[hash:base64:8]',
              },
            },
          },
          'postcss-loader',
        ],
      });
    }

    // Optimize images
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      use: [
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            optipng: {
              enabled: true,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            webp: {
              quality: 75,
            },
          },
        },
      ],
    });

    return config;
  },
  // Environment variables yang bisa diakses di client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    NEXT_PUBLIC_ASSET_PREFIX: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  },
  // Headers untuk security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ];
  },
  // Redirects jika diperlukan
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  // Rewrites untuk API proxy jika diperlukan
  async rewrites() {
    return {
      beforeFiles: [
        // Tambahkan rewrites sesuai kebutuhan
      ],
      afterFiles: [
        {
          source: '/api/:path*',
          destination: process.env.API_URL ? `${process.env.API_URL}/:path*` : '/api/:path*',
        },
      ],
    };
  },
  // Pengaturan untuk build
  compiler: {
    // Hapus console.log di production
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Pengaturan untuk output
  output: 'standalone',
};

module.exports = nextConfig;
EOF