const withMDX = require('@next/mdx')();

module.exports = withMDX({
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
});
