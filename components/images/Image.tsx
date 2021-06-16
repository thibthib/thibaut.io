import * as React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { Placeholder } from "./Placeholder";
import styled from "@emotion/styled";

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const Image: React.FunctionComponent<
  NextImageProps & { name: string; showLoader: boolean }
> = ({ name, showLoader = false, ...imageProps }) => {
  return (
    <ImageWrapper>
      <Placeholder image={name} showLoader={showLoader} />
      <NextImage {...imageProps} />
    </ImageWrapper>
  );
};
