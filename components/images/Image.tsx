import * as React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { Placeholder } from "./Placeholder";
import styled from "@emotion/styled";
import { useImageData } from "./useImageData";

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const Image: React.FunctionComponent<
  NextImageProps & { name: string; showLoader: boolean }
> = ({ name, showLoader = false, ...imageProps }) => {
  const data = useImageData(name);
  return (
    <ImageWrapper>
      <Placeholder image={name} showLoader={showLoader} />
      <NextImage {...imageProps} placeholder="blur" blurDataURL={data?.placeholder} />
    </ImageWrapper>
  );
};
