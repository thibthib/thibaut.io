import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useImageData } from "./useImageData";

const Background = styled.div<{ color: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.color};
  overflow: hidden;
`;

const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  /* Adjust the content to fit */
  object-fit: cover;
  object-position: center;
  /* Blur the image and scale to avoid transparent corners */
  filter: blur(2rem);
  transform: scale(1.2);
`;

const loaderSize = 16;

const bounce = keyframes`
  0% {
    transform: translateY(${-loaderSize}px);
    animation-timing-function: ease-in;
  }
  50% {
    transform: translateY(${loaderSize}px);
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateY(-${loaderSize}px);
    animation-timing-function: ease-in;
  }
`;

const shrink = keyframes`
  20% {
      transform: scaleY(0.5) scaleX(0.8);
      opacity: .01;
      filter: blur(4px);
      animation-timing-function: ease-in;
  }
  50% {
      transform: scaleY(0.25) scaleX(0.5);
      opacity: .25;
      filter: blur(1px);
      animation-timing-function: ease-out;
  }  
  80% {
      transform: scaleY(0.5) scaleX(0.8);
      opacity: .01;
      filter: blur(4px);
      animation-timing-function: ease-in;
  } 
`;

const Loader = styled.div`
  position: absolute;
  top: calc(50% - ${loaderSize / 2}px);
  left: calc(50% - ${loaderSize / 2}px);
  width: ${loaderSize}px;
  height: ${loaderSize}px;

  ::before {
    content: "";
    width: ${loaderSize}px;
    height: ${loaderSize}px;
    border-radius: ${loaderSize / 2}px;
    background: black;
    position: absolute;
    top: calc(100% + ${loaderSize + loaderSize / 2}px);
    opacity: 0.15;
    animation-name: ${shrink};
    animation-duration: 750ms;
    animation-iteration-count: infinite;
    transform: scaleY(0.5) scaleX(0.8);
    opacity: 0.01;
    filter: blur(4px);
    animation-timing-function: ease-in;
  }

  ::after {
    content: "";
    width: ${loaderSize}px;
    height: ${loaderSize}px;
    border-radius: ${loaderSize / 2}px;
    background-color: #e2e2e2;
    position: absolute;
    top: 100%;
    animation-name: ${bounce};
    animation-duration: 750ms;
    animation-iteration-count: infinite;
  }
`;

export const Placeholder: React.FunctionComponent<{ image: string; showLoader?: boolean }> = ({
  image,
  showLoader = false,
}) => {
  const data = useImageData(image);
  return data === null ? null : (
    <Background color={data.dominant}>
      <Image aria-hidden="true" alt="" src={data.placeholder} />
      {showLoader ? <Loader /> : null}
    </Background>
  );
};
