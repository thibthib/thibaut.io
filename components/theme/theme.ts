import { css, SerializedStyles } from "@emotion/react";
import { ColorTheme, colorVariables } from "./colors";
import { fontSizes } from "./typography";
import { spacing } from "./spacing";

export type Theme = typeof ColorTheme & {
  gradientText: string;
  monospaceFont: SerializedStyles;
  sansSerifFont: SerializedStyles;
  fontSizes: typeof fontSizes;
  spacing: typeof spacing;
  lineLength: number;
};

export const theme = {
  gradientText: `linear-gradient(120deg, ${colorVariables.highlight}, ${colorVariables.secondaryHighlight});`,
  monospaceFont: css`
    font-family: Cartograph, "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier,
      monospace;
    font-feature-settings: "ss01";
  `,
  sansSerifFont: css`
    font-family: Archia, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Oxygen-Sans",
      Ubuntu, Cantarell, "Helvetica Neue";
  `,
  fontSizes,
  spacing,
  lineLength: 60,
  ...colorVariables,
};
