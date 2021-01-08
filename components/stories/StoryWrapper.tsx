import styled from "@emotion/styled";

export const StoryWrapper = styled.div<{ isCurrent: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  z-index: ${(props) => (props.isCurrent ? 0 : -1)};
`;
