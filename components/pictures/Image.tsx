import * as React from "react";
import { css } from "@emotion/core";

export const Image: React.FunctionComponent<{
  src: string;
  srcSet: string;
  webpSrcSet: string;
  placeholder: string;
  sizes: string;
  alt: string;
}> = ({ src, srcSet, webpSrcSet, placeholder, sizes, alt }) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (ref.current !== null && ref.current.complete) {
      setIsLoaded(true);
    }
  }, [ref.current]);

  return (
    <div
      css={css`
        position: relative;
        height: 100%;
        width: 100%;
      `}
    >
      <picture>
        <source sizes={sizes} srcSet={webpSrcSet} />
        <source sizes={sizes} srcSet={srcSet} />
        <img
          css={css`
            height: 100%;
            width: 100%;
            object-fit: cover;
          `}
          sizes={sizes}
          src={src}
          srcSet={srcSet}
          onLoad={() => {
            setIsLoaded(true);
          }}
          ref={ref}
          alt={alt}
        />
      </picture>
      <img
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          object-fit: cover;
          opacity: ${isLoaded ? 0 : 1};
          transition: opacity 150ms;
        `}
        role="presentation"
        src={`data:image/jpeg;base64,${placeholder}`}
      />
    </div>
  );
};
