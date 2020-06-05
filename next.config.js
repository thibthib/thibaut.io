const withMDX = require("@next/mdx")();
const withTM = require("next-transpile-modules")(["react-syntax-highlighter"]);

const analyzing = process.env.ANALYZE === "true";

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: analyzing,
});

module.exports = withBundleAnalyzer(
  withTM(
    withMDX({
      reactStrictMode: true,
      pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
      experimental: {
        redirects() {
          return [
            {
              source: "/refs",
              destination: "/react-refs-evolution",
              permanent: true,
            },
          ];
        },
      },
      webpack: (config) => {
        config.optimization.concatenateModules = analyzing
          ? false
          : config.optimization.concatenateModules;
        return config;
      },
    })
  )
);
