const withMDX = require('@next/mdx')();
const withTM = require('next-transpile-modules')(['react-syntax-highlighter']);

module.exports = withTM(
  withMDX({
    reactStrictMode: true,
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
  })
);
