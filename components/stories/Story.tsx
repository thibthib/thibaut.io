import styled from "@emotion/styled";
import { ImageProps } from "components/images/Image";
import { Image } from "components/images/Image";
import { Placeholder } from "components/images/Placeholder";
import { useImageData } from "components/images/useImageData";
import * as React from "react";
import { Sticker } from "./Sticker";

const Background = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  filter: opacity(0.5) brightness(0.9);
`;

export const Story: React.FunctionComponent<{
  image: ImageProps["name"];
  imageAlt?: ImageProps["alt"];
  format?: "square" | "portrait";
}> = ({ image, imageAlt, format, children }) => {
  const data = useImageData(image);
  const [loaded, setIsLoaded] = React.useState(false);
  const hasLoaded = React.useCallback((event) => {
    if (!event.currentTarget.src.startsWith("data")) {
      setIsLoaded(true);
    }
  }, []);
  return (
    <>
      {format === "square" && data !== null ? (
        <>
          <Placeholder image={image} />
          <Background color={data.dominant} />
          <Sticker width={100}>
            <Image
              name={image}
              alt={imageAlt ?? image}
              width={data.width}
              height={data.height}
              layout="responsive"
              onLoad={hasLoaded}
              showLoader={!loaded}
            />
          </Sticker>
        </>
      ) : (
        <Image
          name={image}
          alt={imageAlt ?? image}
          layout={"fill"}
          objectFit="cover"
          onLoad={hasLoaded}
          showLoader={!loaded}
        />
      )}
      {loaded ? children : null}
    </>
  );
};
