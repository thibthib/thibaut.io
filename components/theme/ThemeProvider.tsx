import * as React from "react";
import Head from "next/head";
import { css, Global, ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "./theme";
import { ColorSpace, convertCSSColor } from "@color-spaces/convert";
import { ColorTheme, getColorsVariablesCSS } from "./colors";

export const ThemeProvider: React.FunctionComponent<{ colors?: typeof ColorTheme }> = ({
  colors = ColorTheme,
  children,
}) => {
  const background = convertCSSColor(ColorTheme.background, ColorSpace.sRGB);
  const colorVariables = React.useMemo(() => getColorsVariablesCSS(colors), [colors]);
  return (
    <>
      <Head>{background ? <meta name="theme-color" content={background} /> : null}</Head>
      <Global
        styles={css`
          ${colorVariables}
          body {
            background-color: var(--background);
          }
        `}
      />
      <EmotionThemeProvider theme={theme}>{children}</EmotionThemeProvider>
    </>
  );
};
