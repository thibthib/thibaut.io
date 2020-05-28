import * as React from 'react';
import kebabCase from 'lodash/kebabCase';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Global, css, SerializedStyles } from '@emotion/core';
import { ColorSpace, convertCSSColor, CSSSpace } from '@color-spaces/convert';

const fontSizeRatio = 1.2;

const fontSizes = {
  small: `${Math.pow(fontSizeRatio, -1)}rem`,
  medium: `1rem`,
  large: `${Math.pow(fontSizeRatio, 1)}rem`,
  XLarge: `${Math.pow(fontSizeRatio, 2)}rem`,
  XXLarge: `${Math.pow(fontSizeRatio, 4)}rem`,
};

const spacingBase = 1.5;

const spacing = {
  small: `${spacingBase / 2}rem`,
  medium: `${spacingBase}rem`,
  large: `${spacingBase * 2}rem`,
  XLarge: `${spacingBase * 3}rem`,
};

type ColorMap = { [name: string]: string };

export const Colors = {
  accent1: 'lch(78% 48 230)', //    #3FD2FF
  accent1alt: 'lch(88% 42 230)', // #aae7ff
  accent2: 'lch(80% 70 170)', //    #00E1B1
  accent2alt: 'lch(80% 40 170)', // #6cdab8
  accent3: 'lch(74% 70 54)', //     #ff9c60
  accent3alt: 'lch(78% 44 54)', //  #fcae80
  accent4: 'lch(68% 68 14)', //     #ff7a91
  accent4alt: 'lch(55.5% 52 14)', //#d1576e
  accent5: 'lch(68% 52 304)', //    #bb95f4
  accent6: 'lch(68% 50 280)', //    #89a3ff
  shade0: 'lch(8% 9 290)', //       #171623
  shade1: 'lch(10% 12 289)', //     #1a1a2b
  shade3: 'lch(28% 28 287)', //     #3b3f6c
  shade5: 'lch(54.5% 26 284)', //   #787dab
  shade8: 'lch(80% 30 281)', //     #bac4fd
  shade9: 'lch(88% 16 280)', //     #dde1ff
};

const ColorTheme = {
  background: Colors.shade0,
  secondaryBackground: Colors.shade1,
  text: Colors.shade9,
  secondaryText: Colors.shade8,
  highlight: Colors.accent1,
  secondaryHighlight: Colors.accent2,
  border: Colors.shade3,
};

const getCSSVariableName = (colorName: string) => `var(--${kebabCase(colorName)})`;

const getColorCSSVariables = (colors: ColorMap, space?: CSSSpace) =>
  Object.keys(colors)
    .map(
      name =>
        `--${kebabCase(name)}: ${space ? convertCSSColor(colors[name], space) : colors[name]};`
    )
    .join('\n');

export const getTheme = <T extends ColorMap>(colors: T): [T, SerializedStyles] => [
  Object.keys(colors).reduce(
    (aggr, name) => ({ ...aggr, [name]: getCSSVariableName(name) }),
    {}
  ) as T,
  css`
    :root {
      ${getColorCSSVariables(colors, ColorSpace.sRGB)}
    }

    @supports (color: color(display-p3 1 1 1)) {
      :root {
        ${getColorCSSVariables(colors, ColorSpace.P3)}
      }
    }

    @supports (color: lch(1 1 1)) {
      :root {
        ${getColorCSSVariables(colors)}
      }
    }
  `,
];

const [variables, definition] = getTheme(ColorTheme);

export type Theme = {
  background: string;
  secondaryBackground: string;
  text: string;
  secondaryText: string;
  highlight: string;
  secondaryHighlight: string;
  border: string;
  gradientText: string;
  monospaceFont: string;
  fontSizes: typeof fontSizes;
  spacing: typeof spacing;
  lineLength: number;
};

export const theme: Theme = {
  gradientText: `linear-gradient(120deg, ${variables.highlight}, ${variables.secondaryHighlight});`,
  monospaceFont:
    'Cartograph, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  fontSizes,
  spacing,
  lineLength: 60,
  ...variables,
};

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Global styles={definition} />
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </>
  );
};
