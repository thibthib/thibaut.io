const mdxPrism = require("mdx-prism");
const withMDX = require("@next/mdx")({
  options: {
    rehypePlugins: [mdxPrism],
  },
});
const withTM = require("next-transpile-modules")(["@color-spaces/convert"]);

const analyzing = process.env.ANALYZE === "true";
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: analyzing,
});

module.exports = withTM(
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
      async headers() {
        return [
          {
            source: "/fonts/:font*",
            headers: [
              {
                key: "Cache-Control",
                value: "public, immutable, max-age=31536000",
              },
            ],
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
