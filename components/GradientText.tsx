import { css } from "@emotion/react";
import { ReactNode } from "react";

export const GradientText: React.FunctionComponent<{ children?: ReactNode }> = ({ children }) => (
  <span
    css={(theme) => css`
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
