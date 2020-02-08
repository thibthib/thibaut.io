import Link from 'next/link';
import { css } from '@emotion/core';

export const MenuLink = () => (
  <Link href={`/`}>
    <a
      css={theme => css`
        font-family: ${theme.monospaceFont};
        background-image: ${theme.gradientText};
        color: ${theme.background};
        position: relative;
        text-decoration: none;
        font-size: 1.2em;
        line-height: 1.2em;
        cursor: pointer;

        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -webkit-box-decoration-break: clone;

        &:hover {
          > div {
            height: 100%;
          }
        }
      `}
    >
      thibaut.io
      <div
        css={css`
          position: absolute;
          height: 2px;
          width: 100%;
          bottom: 0;
          left: 0;
          overflow: hidden;
          transition: height 150ms;
        `}
      >
        <div
          css={theme => css`
            background-image: ${theme.gradientText};
            -webkit-text-fill-color: ${theme.background};
            position: absolute;
            bottom: -1px;
            left: 0;
          `}
        >
          thibaut.io
        </div>
      </div>
    </a>
  </Link>
);
