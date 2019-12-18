const withMDX = require('@next/mdx')();

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'tsx'],
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/duple': { page: '/duple' },
      '/react-refs-evolution': { page: '/react-refs-evolution' },
      '/hexagons': { page: '/hexagons' },
    };
  },
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
