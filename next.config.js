const mdxPrism = require("mdx-prism");
const withMDX = require("@next/mdx")({
  options: {
    rehypePlugins: [mdxPrism],
  },
});

const analyzing = process.env.ANALYZE === "true";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: analyzing,
});

module.exports = withBundleAnalyzer(
  withMDX({
    reactStrictMode: true,
    pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
    redirects: async function () {
      return [
        {
          source: "/refs",
          destination: "/react-refs-evolution",
          permanent: true,
        },
      ];
    },
    webpack: (config) => {
      config.optimization.concatenateModules = analyzing
        ? false
        : config.optimization.concatenateModules;
      return config;
    },
  })
);
