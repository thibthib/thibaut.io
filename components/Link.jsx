import React from 'react';
import { css } from '@emotion/core';

export const Link = props => (
  <a
    {...props}
    css={theme => css`
      overflow: hidden;

      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      -webkit-box-decoration-break: clone;
      box-decoration-break: clone;
      background: linear-gradient(
        to right,
        ${theme.gradientStart},
        ${theme.gradientEnd} 50%,
        ${theme.text} 50%,
        ${theme.text}
      );
      background-size: 200% 100%;
      background-position: 100%;
      transition: background-position 250ms ease;

      text-decoration-color: hsl(217, 34%, 43%);

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
    {props.children}
  </a>
);
