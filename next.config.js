const withMDX = require('@next/mdx')();

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx', 'tsx'],
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/duple': { page: '/duple' },
      '/refs': { page: '/refs' },
      '/hexagons': { page: '/hexagons' },
    };
  },
});
