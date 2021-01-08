import styled from "@emotion/styled";

export type StickerProps = {
  top?: number;
  left?: number;
  width?: number;
  rotation?: string;
};

export const Sticker = styled.div<StickerProps>`
  position: absolute;
  top: ${(props) => props.top ?? 50}%;
  left: ${(props) => props.left ?? 50}%;
  width: ${(props) => (props.width !== undefined ? `${props.width}%` : "auto")};
  transform: translate(-50%, -50%) rotate(${(props) => props.rotation ?? "0deg"});
`;
