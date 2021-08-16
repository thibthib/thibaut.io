import { css } from "@emotion/react";
import { ColorTheme, colorVariables } from "./colors";
import { fontSizes } from "./typography";
import { spacing } from "./spacing";

export const theme = {
  monospaceFont: css`
    font-family: Cartograph, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    font-feature-settings: "ss01";
  `,
  sansSerifFont: css`
    font-family: Archia, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans",
      Ubuntu, Cantarell, "Helvetica Neue";
  `,
  serifFont: css`
    font-family: Quincy, serif;
    font-weight: 600;
    /* font-feature-settings: "salt"; */
  `,
  fontSizes,
  spacing,
  lineLength: 60,
  ...colorVariables,
};

export type Theme = typeof ColorTheme & typeof theme;
