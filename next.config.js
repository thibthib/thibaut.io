const withMDX = require('@next/mdx')();

module.exports = withMDX({
  pageExtensions: ['js', 'jsx', 'mdx'],
  exportPathMap: function() {
    return {
      '/': { page: '/' },
      '/duple': { page: '/duple' },
      '/refs': { page: '/refs' },
    };
  },
});
