import { Image } from "./Image";
import { css } from "@emotion/core";
import { Picture } from "./getImageMap";
import { Theme } from "components/Theme";

export const Cover = ({
  title,
  subtitle,
  picture,
}: {
  title: string;
  subtitle: string;
  picture: Picture;
}) => {
  return (
    <div
      css={css`
        position: relative;
        height: 90vh;
      `}
    >
      <Image
        placeholder={picture.placeholder}
        src={picture.src}
        srcSet={picture.srcSet}
        webpSrcSet={picture.webpSrcSet}
        sizes={"120vw"}
        alt={"cover"}
      />
      <div
        css={(theme: Theme) => css`
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: ${theme.text};
          text-align: center;
        `}
      >
        <div
          css={(theme: Theme) =>
            css`
              position: absolute;
              top: 0;
              left: 0;
              height: 100%;
              width: 100%;
              background: ${theme.background};
              opacity: 0.3;
            `
          }
        ></div>
        <span
          css={(theme: Theme) => css`
            font-family: calendas_plusregular;
            font-size: ${theme.fontSizes.XXXLarge};
            z-index: 1;
          `}
        >
          {title}
        </span>
        <span
          css={(theme: Theme) => css`
            font-family: calendas_plusregular;
            font-size: ${theme.fontSizes.XXLarge};
            z-index: 1;
            font-style: italic;
          `}
        >
          {subtitle}
        </span>
      </div>
    </div>
  );
};
