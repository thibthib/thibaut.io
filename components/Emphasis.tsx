import { css } from '@emotion/core';

export const Emphasis: React.FunctionComponent = props => (
  <em
    {...props}
    css={theme => css`
      color: ${theme.secondaryText};
    `}
  />
);
