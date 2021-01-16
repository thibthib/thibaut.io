import { style } from "treat";

export const gradientText = style((theme) => ({
  backgroundImage: theme.gradientText,
  color: theme.background,
  backgroundClip: "text",
  WebkitTextFillColor: "transparent",
  boxDecorationBreak: "clone",
}));
