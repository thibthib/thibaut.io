import * as React from 'react';
import { css } from '@emotion/core';
import isArray from 'lodash/isArray';

export const Character: React.FunctionComponent<{
  code: number | number[];
  feature?: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ code, feature, isActive, onClick }) => (
  <li
    css={theme => css`
      position: relative;
      place-self: center;
      font-size: ${theme.fontSizes.XLarge};
      width: 100%;
      height: ${theme.spacing.large};
      display: inline-block;
      text-align: center;
      display: flex;
      flex-direction: column;
      background: ${isActive ? theme.background : 'transparent'};
      cursor: pointer;
    `}
    onClick={onClick}
  >
    <span
      css={theme => css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        line-height: ${theme.spacing.large};

        display: block;
        font-size: ${theme.fontSizes.medium};
        color: ${theme.secondaryText};
        opacity: 0.2;
      `}
    >
      {feature}
    </span>
    <span
      css={css`
        margin: auto 0;
        font-feature-settings: ${feature ? `"${feature}"` : 'normal'};
        opacity: ${isActive ? 1 : 0.3};
      `}
    >
      {(isArray(code) ? code : [code]).map(c => String.fromCharCode(c)).join('')}
    </span>
  </li>
);
