import { css } from "@emotion/core";
import { Theme } from "./Theme";

export const GradientText: React.FunctionComponent = ({ children }) => (
  <span
    css={(theme: Theme) => css`
      background-image: ${theme.gradientText};
      color: ${theme.background};
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
    `}
  >
    {children}
  </span>
);
