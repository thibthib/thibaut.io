import * as React from "react";
import Head from "next/head";
import { css, Global, ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { ColorSpace, convertCSSColor, CSSSpace } from "@color-spaces/convert";
import { ColorTheme, getCSSVariableName } from "./colors";

const getColorCSSVariables = (space: CSSSpace) =>
  Object.entries(ColorTheme)
    .map(([name, value]) => `${getCSSVariableName(name)}: ${convertCSSColor(value, space) ?? ""};`)
    .join("\n");

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const background = convertCSSColor(ColorTheme.background, ColorSpace.sRGB);
  return (
    <>
      <Head>{background ? <meta name="theme-color" content={background} /> : null}</Head>
      <Global
        styles={css`
          :root {
            ${getColorCSSVariables(ColorSpace.sRGB)}
          }

          @supports (color: color(display-p3 1 1 1)) {
            :root {
              ${getColorCSSVariables(ColorSpace.P3)}
            }
          }

          @supports (color: lch(1 1 1)) {
            :root {
              ${getColorCSSVariables(ColorSpace.LCH)}
            }
          }
        `}
      />
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </>
  );
};
