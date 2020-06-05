import { Colors, Theme } from "../components/Theme";
import { css } from "@emotion/core";
import { ColorSpace, convertCSSColor } from "@color-spaces/convert";

const Page = () => {
  return (
    <>
      <div css={(theme: Theme) => theme.monospaceFont}>
        {Object.entries(Colors).map(([name, value]) => (
          <div
            key={name}
            css={css`
              position: relative;
            `}
          >
            <span
              css={css`
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
              `}
            >
              {name}
              <br />
              {value}
              <br />
              {convertCSSColor(value, ColorSpace.HSL)}
            </span>
            <div
              css={css`
                background: ${convertCSSColor(value, ColorSpace.P3)};
                height: 100px;
                width: 50%;
                display: inline-block;
              `}
            ></div>
            <div
              css={css`
                background: ${convertCSSColor(value, ColorSpace.sRGB)};
                height: 100px;
                width: 50%;
                display: inline-block;
              `}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Page;
