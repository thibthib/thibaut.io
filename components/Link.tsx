import * as React from 'react';
import { css } from '@emotion/core';

export const Link: React.FunctionComponent<{ href: string }> = ({ href, children }) => (
  <a
    href={href}
    css={theme => css`
      overflow: hidden;

      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
      background-image: linear-gradient(
        to right,
        ${theme.gradientStart},
        ${theme.gradientEnd} 50%,
        ${theme.secondaryText} 50%,
        ${theme.secondaryText}
      );
      background-size: 200% 100%;
      background-position: 100%;
      transition: background-position 250ms ease, text-decoration-color 250ms ease;

      text-decoration-color: hsl(217, 34%, 42%);

      &:hover {
        background-position: 0 100%;
        text-decoration-color: hsl(208, 64%, 33%);
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