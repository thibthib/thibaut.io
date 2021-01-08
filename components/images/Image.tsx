import * as React from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { useImageData } from "./useImageData";
import { Placeholder } from "./Placeholder";
import styled from "@emotion/styled";

export type ImageProps = Omit<NextImageProps, "src"> & { name: string; showLoader?: boolean } & (
    | {
        width?: never;
        height?: never;
        layout: "fill";
      }
    | {
        width?: number | string;
        height?: number | string;
        layout?: "fixed" | "intrinsic" | "responsive" | undefined;
      }
  );

const ImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
`;

export const Image: React.FunctionComponent<ImageProps> = ({
  name,
  height,
  width,
  showLoader = false,
  ...imageProps
}) => {
  const data = useImageData(name);
  const dimensionProps =
    "layout" in imageProps && imageProps.layout === "fill"
      ? { layout: "fill" as const }
      : {
          layout: "layout" in imageProps ? imageProps.layout : undefined,
          height: data?.height ?? height ?? 100,
          width: data?.width ?? width ?? 100,
        };

  return (
    <ImageWrapper>
      <Placeholder image={name} showLoader={showLoader} />
      <NextImage {...imageProps} {...dimensionProps} src={data?.src ? data.src : `/${name}`} />
    </ImageWrapper>
  );
};
