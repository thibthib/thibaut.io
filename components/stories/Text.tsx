import styled from "@emotion/styled";
import type { CSSProperties } from "react";
import { Sticker, StickerProps } from "./Sticker";

const TextWrapper = styled.span<{ isBlurred: boolean; isInverted: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: ${({ theme }) => theme.text};
  ${({ theme }) => theme.serifFont}
  text-align: center;
  line-height: 1.3;
  padding: ${({ theme }) => `${theme.spacing.XSmall} ${theme.spacing.small}`};
  background: transparent;
  display: inline-block;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  border-radius: ${({ theme }) => theme.spacing.XSmall};
  backdrop-filter: ${(props) => (props.isBlurred ? `blur(${props.theme.spacing.XLarge})` : "none")};
  background-color: ${(props) =>
    props.isInverted ? "rgba(255,255,255,0.15)" : props.isBlurred ? "rgba(0,0,0,0.15)" : "none"};
`;

export const Text: React.FunctionComponent<
  {
    style?: CSSProperties | undefined;
    background?: string;
  } & StickerProps
> = ({ children, style, background, top, left, width, rotation }) => {
  const isBlurred = background === "blur" || background === "inverted-blur";
  return (
    <Sticker top={top} left={left} width={width} rotation={rotation}>
      <TextWrapper style={style} isBlurred={isBlurred} isInverted={background === "inverted-blur"}>
        {children}
      </TextWrapper>
    </Sticker>
  );
};
