import Link from 'next/link';
import { css } from '@emotion/core';
import { GradientText } from './GradientText';

export const MenuLink = () => (
  <Link href={`/`}>
    <a
      css={theme => css`
        font-family: ${theme.monospaceFont};
        position: relative;
        display: inline-block;
        text-decoration: none;
        font-size: 1.2em;
        line-height: 1.2em;
        cursor: pointer;
      `}
    >
      <GradientText>thibaut.io</GradientText>
      <div
        aria-hidden={true}
        css={css`
          position: absolute;
          height: 2px;
          width: 100%;
          bottom: 0;
          left: 0;
          overflow: hidden;
          transition: height 150ms;

          a:hover & {
            height: 100%;
          }
        `}
      >
        <div
          css={theme => css`
            background-image: ${theme.gradientText};
            color: ${theme.background};
            position: absolute;
            bottom: 0;
            left: 0;
          `}
        >
          thibaut.io
        </div>
      </div>
    </a>
  </Link>
);
