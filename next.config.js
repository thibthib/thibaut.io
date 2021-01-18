const mdxPrism = require("mdx-prism");
const withMDX = require("@next/mdx")({
  options: {
    rehypePlugins: [mdxPrism],
  },
});

const {
  getClientStyleLoader,
} = require("next/dist/build/webpack/config/blocks/css/loaders/client");
const TreatPlugin = require("treat/webpack-plugin");

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
    webpack: (config, options) => {
      config.optimization.concatenateModules = analyzing
        ? false
        : config.optimization.concatenateModules;
      config.module.rules.push({
        test: /react-spring/,
        sideEffects: true,
      });
      config.plugins.push(
        new TreatPlugin({
          outputCSS: !options.isServer,
          ...(options.isServer
            ? {}
            : {
                outputLoaders: [
                  getClientStyleLoader({
                    isDevelopment: options.dev,
                    assetPrefix: options.config.assetPrefix,
                  }),
                ],
              }),
        })
      );
      return config;
    },
  })
);
