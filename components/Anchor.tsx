import * as React from 'react';
import isArray from 'lodash/isArray';
import kebabCase from 'lodash/kebabCase';
import { css } from '@emotion/core';
import { theme } from './Theme';

const getAsString = (node: React.ReactNode): string => {
  if (typeof node === 'string') {
    return node;
  } else if (typeof node === 'number') {
    return `${node}`;
  } else if (React.isValidElement(node)) {
    return getAsString(node.props.children);
  } else if (isArray(node)) {
    return node.map(child => getAsString(child)).join('');
  }
  return '';
};

export const useAnchor = (children: React.ReactNode): [string, React.ReactElement] => {
  const childString = getAsString(children);
  const anchor = kebabCase(childString);
  return [
    anchor,
    <a
      href={`#${anchor}`}
      aria-label={childString}
      css={theme => css`
        text-decoration: none;
        position: absolute;
        right: 100%;
        top: 50%;
        transform: translate(-8px, -50%);
        opacity: 0;
        transition: opacity 150ms;
        color: ${theme.secondaryText};

        *:hover > & {
          opacity: 1;
        }
      `}
    >
      <svg
        viewBox="0 0 24 24"
        width={theme.fontSizes.small}
        height={theme.fontSizes.small}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        shapeRendering="geometricPrecision"
        role="img"
      >
        <title>Link icon</title>
        <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"></path>
        <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"></path>
      </svg>
    </a>,
  ];
};
