import styled from "@emotion/styled";

export const StoryWrapper = styled.div<{ isCurrent: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: ${(props) => (props.isCurrent ? 0 : -1)};
`;
