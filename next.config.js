const withMDX = require('@next/mdx')();

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'tsx'],
  experimental: {
    redirects() {
      return [
        {
          source: '/refs',
          destination: '/react-refs-evolution',
        },
      ];
    },
  },
});
