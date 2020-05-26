import { startP3, startRGB, endP3, endRGB, theme } from 'components/themes/NightOwl';
import { css, Global } from '@emotion/core';

const Page = () => {
  return (
    <>
      <Global
        styles={css`
          body {
            background: ${theme.background};
            font-size: ${theme.fontSizes.XXLarge};
            font-family: ${theme.monospaceFont};
            color: ${theme.background};
            text-align: center;
          }

          :root {
            --startRGB: ${startRGB};
            --endRGB: ${endRGB};
            --startP3: red;
            --endP3: red;
          }

          @supports (color: color(display-p3 1 1 1)) {
            :root {
              --startP3: ${startP3};
              --endP3: ${endP3};
            }
          }
        `}
      />
      <div>
        <div
          css={css`
            background: hsl(208, 94%, 56%);
            height: 100px;
            width: 100%;
            display: inline-block;
          `}
        >
          hsl
        </div>
        <div
          css={css`
            background: var(--startRGB);
            height: 200px;
            width: 50%;
            display: inline-block;
          `}
        >
          rgb
        </div>
        <div
          css={css`
            background: var(--startP3);
            height: 200px;
            width: 50%;
            display: inline-block;
          `}
        >
          p3
        </div>
      </div>
      <div>
        <div
          css={css`
            background: hsl(169, 75%, 50%);
            height: 100px;
            width: 100%;
            display: inline-block;
            text-align: center;
          `}
        >
          hsl
        </div>
        <div
          css={css`
            background: var(--endRGB);
            height: 200px;
            width: 50%;
            display: inline-block;
          `}
        >
          rgb
        </div>
        <div
          css={css`
            background: var(--endP3);
            height: 200px;
            width: 50%;
            display: inline-block;
          `}
        >
          p3
        </div>
      </div>

      <div
        css={theme => css`
          background-image: linear-gradient(120deg, hsl(208, 94%, 56%), hsl(169, 75%, 50%));
          color: ${theme.background};
          margin: 16px;
          position: relative;
          width: 250px;
          height: 60px;
        `}
      >
        <span
          css={theme => css`
            position: absolute;
            top: 0;
            left: 0;
            width: 250px;
            height: 60px;
            background-image: linear-gradient(120deg, var(--startP3), var(--endP3));
            color: ${theme.background};
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-box-decoration-break: clone;
            box-decoration-break: clone;
            display: inline-block;
            text-align: center;
          `}
        >
          thibaut.io
        </span>
      </div>
    </>
  );
};

export default Page;
