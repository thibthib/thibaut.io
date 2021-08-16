import { ColorSpace, convertCSSColor, CSSSpace, interpolateGradient } from "@color-spaces/convert";

import Color from "components/color/color.esm";
import { css } from "@emotion/react";

export const getCSSVariableName = (colorName: string) =>
  `--${colorName
    .replace(/([A-Z])([A-Z])/g, "$1-$2")
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase()}`;

export const mapColorObject = (
  colors: typeof Colors,
  mapper: (colorKey: string, colorValue: string) => [string, string]
) => Object.fromEntries(Object.entries(colors).map(([key, value]) => mapper(key, value)));

const getColorCSSVariables = (colors: typeof ColorTheme, space: CSSSpace) =>
  Object.entries(colors)
    .map(
      ([name, value]) =>
        `${getCSSVariableName(name)}: ${
          value.startsWith("linear-gradient")
            ? interpolateGradient(value, { outputSpace: space })
            : new Color(value).to(space).toString() ?? ""
        };`
    )
    .join("\n");

export const getColorsVariablesCSS = (colors: typeof ColorTheme) => css`
  :root {
    ${getColorCSSVariables(colors, ColorSpace.sRGB)}
  }

  @supports (color: color(display-p3 1 1 1)) {
    :root {
      ${getColorCSSVariables(colors, ColorSpace.P3)}
    }
  }

  @supports (color: lch(1% 1 1)) {
    :root {
      ${getColorCSSVariables(colors, ColorSpace.LCH)}
    }
  }
`;

export const Colors = {
  accent1: "lch(78% 48 230)", //    #3FD2FF
  accent1alt: "lch(88% 42 230)", // #aae7ff
  accent2: "lch(80% 70 170)", //    #00E1B1
  accent2alt: "lch(80% 40 170)", // #6cdab8
  accent3: "lch(74% 70 54)", //     #ff9c60
  accent3alt: "lch(78% 44 54)", //  #fcae80
  accent4: "lch(68% 68 14)", //     #ff7a91
  accent4alt: "lch(55.5% 52 14)", //#d1576e
  accent5: "lch(68% 52 304)", //    #bb95f4
  accent6: "lch(68% 50 280)", //    #89a3ff
  shade0: "lch(8% 9 290)", //       #171623
  shade1: "lch(10% 12 289)", //     #1a1a2b
  shade3: "lch(28% 28 287)", //     #3b3f6c
  shade5: "lch(54.5% 26 284)", //   #787dab
  shade8: "lch(80% 30 281)", //     #bac4fd
  shade9: "lch(88% 16 280)", //     #dde1ff
};

export const ColorTheme = {
  background: Colors.shade0,
  secondaryBackground: Colors.shade1,
  text: Colors.shade9,
  secondaryText: Colors.shade8,
  highlight: Colors.accent1,
  secondaryHighlight: Colors.accent2,
  border: Colors.shade3,
  ...Colors,
  gradient: `linear-gradient(120deg, ${Colors.accent1}, ${Colors.accent2})`,
};

export const colorVariables = mapColorObject(ColorTheme, (name) => [
  name,
  `var(${getCSSVariableName(name)})`,
]);
