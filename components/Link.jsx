import React from 'react';
import { css } from '@emotion/core';

export const Link = props => (
  <a
    {...props}
    css={css`
      color: inherit;
    `}
  />
);
