import * as React from "react";
import { css } from "@emotion/react";

export const Link: React.FunctionComponent<{ href: string }> = ({ href, children }) => (
  <a
    href={href}
    css={(theme) => css`
      overflow: hidden;

      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
      background-image: linear-gradient(
        to right,
        ${theme.highlight},
        ${theme.secondaryHighlight} 50%,
        ${theme.secondaryText} 50%,
        ${theme.secondaryText}
      );
      background-size: 200% 100%;
      background-position: 100%;
      transition: background-position 250ms ease, text-decoration-color 250ms ease;

      text-decoration-color: ${theme.secondaryText};

      @supports (text-decoration-thickness: 2px) {
        text-decoration-color: ${theme.border};
        text-decoration-thickness: 2px;
      }

      &:hover {
        background-position: 0 100%;
      }

      > * {
        -webkit-text-fill-color: initial;
        -webkit-background-clip: initial;
        background-clip: initial;
      }
    `}
  >
    {children}
  </a>
);
