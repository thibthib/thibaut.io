const withMDX = require('@next/mdx')();

module.exports = withMDX({
  target: 'serverless',
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
  experimental: {
    redirects() {
      return [
        {
          source: '/refs',
          destination: '/react-refs-evolution',
          permanent: true,
        },
      ];
    },
  },
  webpack: (config, { webpack }) => {
    config.node = {
      fs: 'empty',
    };
    config.module.rules.push({
      test: /woff2\.wasm$/i,
      type: 'javascript/auto',
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: `/_next/static/files`,
            outputPath: 'static/files',
          },
        },
      ],
    });
    config.module.exprContextCritical = false;

    return config;
  },
});
