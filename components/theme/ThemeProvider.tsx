import * as React from "react";
import Head from "next/head";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";
import { theme } from "./theme.emotion";
import { ColorSpace, convertCSSColor } from "@color-spaces/convert";
import { TreatProvider } from "react-treat";
import treatTheme from "./theme.treat";
import { ColorTheme } from "./colors";

export const ThemeProvider: React.FunctionComponent = ({ children }) => {
  const background = convertCSSColor(ColorTheme.background, ColorSpace.sRGB);
  return (
    <div>
      <Head>{background ? <meta name="theme-color" content={background} /> : null}</Head>
      <EmotionThemeProvider theme={theme}>
        <TreatProvider theme={treatTheme}>{children}</TreatProvider>
      </EmotionThemeProvider>
    </div>
  );
};
