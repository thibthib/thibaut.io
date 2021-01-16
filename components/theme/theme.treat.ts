import { createTheme, globalStyle } from "treat";
import { ColorSpace, convertCSSColor, CSSSpace } from "@color-spaces/convert";
import { ColorTheme, colorVariables } from "./colors";
import { fontSizes } from "./typography";
import { spacing } from "./spacing";
import { getCSSVariableName, mapColorObject } from "./helpers";

const getColorCSSVariables = (space: CSSSpace) =>
  mapColorObject(ColorTheme, (name, value) => [
    getCSSVariableName(name),
    convertCSSColor(value, space) ?? "",
  ]);

globalStyle(":root", {
  ...getColorCSSVariables(ColorSpace.sRGB),
  "@supports": {
    "(color: color(display-p3 1 1 1))": {
      ...getColorCSSVariables(ColorSpace.P3),
    },
    "(color: lch(1 1 1))": {
      ...getColorCSSVariables(ColorSpace.LCH),
    },
  },
});

export type Theme = typeof ColorTheme & {
  gradientText: string;
  monospaceFont: {
    fontFamily: string;
    fontFeatureSettings: string;
  };
  sansSerifFont: {
    fontFamily: string;
  };
  fontSizes: typeof fontSizes;
  spacing: typeof spacing;
  lineLength: number;
};

export default createTheme({
  gradientText: `linear-gradient(120deg, ${colorVariables.highlight}, ${colorVariables.secondaryHighlight});`,
  monospaceFont: {
    fontFamily:
      'Cartograph, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
    fontFeatureSettings: "ss01",
  },
  sansSerifFont: {
    fontFamily:
      'Archia, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans", Ubuntu, Cantarell, "Helvetica Neue"',
  },
  fontSizes,
  spacing,
  lineLength: 60,
  ...colorVariables,
});
