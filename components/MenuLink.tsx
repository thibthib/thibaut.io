import Link from "next/link";
import { css } from "@emotion/react";
import { GradientText } from "./GradientText";
import { Theme } from "./Theme";

export const MenuLink = () => (
  <Link href={`/`}>
    <a
      css={(theme) => css`
        font-weight: 600;
        position: relative;
        display: inline-block;
        text-decoration: none;
        font-size: ${theme.fontSizes.large};
        line-height: 1.2em;
        cursor: pointer;
      `}
    >
      <GradientText>thibaut</GradientText>
      <div
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
          css={(theme) => css`
            background-image: ${theme.gradientText};
            color: ${theme.background};
            position: absolute;
            bottom: 0;
            left: 0;
          `}
        >
          thibaut
        </div>
      </div>
    </a>
  </Link>
);
