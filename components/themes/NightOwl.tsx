import * as React from 'react';
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming';
import { Global, css } from '@emotion/core';
import { ColorSpace, convertCSSColor } from '@color-spaces/convert';

const fontSizeRatio = 1.25;

const fontSizes = {
  small: `${Math.pow(fontSizeRatio, -1)}rem`,
  medium: `1rem`,
  large: `${Math.pow(fontSizeRatio, 1)}rem`,
  XLarge: `${Math.pow(fontSizeRatio, 2)}rem`,
  XXLarge: `${Math.pow(fontSizeRatio, 4)}rem`,
};

const spacingBase = 1.625;

const spacing = {
  small: `${spacingBase / 2}rem`,
  medium: `${spacingBase}rem`,
  large: `${spacingBase * 2}rem`,
};

const startLCH = 'lch(60% 67 266)';
const endLCH = 'lch(79% 73 175)';

export const startP3 = convertCSSColor(startLCH, ColorSpace.P3);
export const endP3 = convertCSSColor(endLCH, ColorSpace.P3);

export const startRGB = convertCSSColor(startLCH, ColorSpace.sRGB);
export const endRGB = convertCSSColor(endLCH, ColorSpace.sRGB);

const gradientStart = 'var(--gradient-start)';
const gradientEnd = 'var(--gradient-stop)';

export const theme = {
  text: 'hsl(217, 34%, 88%)',
  secondaryText: 'hsl(217, 34%, 78%)',
  highlightedText: 'hsl(169, 56%, 68%)',
  secondaryHighlight: 'hsl(208, 94%, 56%)',
  background: 'hsl(207, 92%, 10%)',
  secondaryBackgound: 'hsl(207, 95%, 8%)',
  border: 'hsl(207, 95%, 16%)',
  gradientStart,
  gradientEnd,
  gradientText: `linear-gradient(120deg, ${gradientStart}, ${gradientEnd});`,
  monospaceFont:
    'Cartograph, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace',
  fontSizes,
  spacing,
};

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --gradient-start: ${startRGB};
            --gradient-stop: ${endRGB};
          }

          @supports (color: color(display-p3 1 1 1)) {
            :root {
              --gradient-start: ${startP3};
              --gradient-stop: ${endP3};
            }
          }
        `}
      />
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </>
  );
};
