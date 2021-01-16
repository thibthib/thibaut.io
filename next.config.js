const mdxPrism = require("mdx-prism");
const withTreat = require("next-treat")();
const withMDX = require("@next/mdx")({
  options: {
    rehypePlugins: [mdxPrism],
  },
});

const analyzing = process.env.ANALYZE === "true";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: analyzing,
});

module.exports = withTreat(
  withBundleAnalyzer(
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
        config.module.rules.push({
          test: /react-spring/,
          sideEffects: true,
        });
        return config;
      },
    })
  )
);
