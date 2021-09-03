import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { spacingBase } from "components/theme/spacing";
import * as React from "react";
import { animated, useSpring } from "react-spring";

const HeaderWrapper = styled.div`
  position: absolute;
  top: ${({ theme }) => `-${theme.spacing.XLarge}`};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: calc(100% - ${({ theme }) => theme.spacing.XLarge});
  width: 100%;
  padding: ${({ theme }) => theme.spacing.medium};
  text-align: center;
  background: ${({ theme }) =>
    `linear-gradient(${theme.background},${theme.background} ${theme.spacing.XLarge}, transparent)`};
`;

const slideIn = keyframes`
  from {
    transform: scaleX(0);
  }
  to {
    transform: scaleX(1);
  }
`;

const StoryLinesWrapper = styled.div`
  ${slideIn};
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  padding-top: ${({ theme }) => theme.spacing.small};
  padding-left: ${({ theme }) => theme.spacing.XSmall};
  padding-bottom: ${({ theme }) => theme.spacing.medium};
  padding-right: ${({ theme }) => theme.spacing.XSmall};
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0));
  // prevent linear gradient to display a black line at the bottom
  transform: translateZ(0);
`;

export const Overlay: React.FunctionComponent<{
  storyCount: number;
  currentStoryIndex: number;
  storyDuration: number;
  isManual: boolean;
  isPaused: boolean;
  header: React.ReactNode;
  isHidden: boolean;
}> = ({ storyCount, currentStoryIndex, storyDuration, isManual, isPaused, header, isHidden }) => {
  const [scroll, scrollUpdater] = useSpring(() => ({ percentage: 0 }));

  React.useEffect(() => {
    const onScroll = () => {
      const scroll = window.scrollY / (document.body.clientHeight - window.innerHeight);
      scrollUpdater.start({ percentage: scroll });
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });

  React.useEffect(() => {
    if (isHidden) {
      scrollUpdater.start({ percentage: 1 });
    } else {
      scrollUpdater.start({ percentage: 0 });
    }
  }, [isHidden, scrollUpdater]);

  const pausedStartState = React.useRef(isManual);
  React.useEffect(() => {
    pausedStartState.current = isManual;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused]);

  const duration = `${storyDuration}ms`;
  const width = `${100 / storyCount}%`;

  return (
    <>
      <animated.div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          WebkitBackdropFilter: scroll.percentage
            .to([0, 1], [1, 0])
            .to((value) => `blur(${value}rem)`) as any,
          backdropFilter: scroll.percentage
            .to([0, 1], [1, 0])
            .to((value) => `blur(${value}rem)`) as any,
        }}
      />
      <animated.div
        style={{
          opacity: scroll.percentage.to([0, 1], [1, 0]) as any,
          transform: scroll.percentage
            .to([0, 1], [0, spacingBase * 3])
            .to((value) => `translateY(${-value}rem)`),
          height: "100%",
          width: "100%",
        }}
      >
        <HeaderWrapper>{header}</HeaderWrapper>
      </animated.div>
      <animated.div
        style={{
          opacity: scroll.percentage as any,
        }}
      >
        <StoryLinesWrapper>
          {Array.from(Array(storyCount)).map((_, i) => (
            <div
              key={i}
              style={{
                display: "inline-block",
                width,
                padding: "1px",
              }}
            >
              <div
                style={{
                  position: "relative",
                  backgroundColor: "rgba(255, 255, 255, 0.35)",
                  height: "3px",
                  overflow: "hidden",
                  borderRadius: "3px",
                  transform: isManual && i === currentStoryIndex ? "translateY(4px)" : "none",
                  transition: "transform 250ms",
                }}
              >
                <div
                  style={{
                    backgroundColor: i > currentStoryIndex ? "transparent" : "white",
                    borderRadius: "3px",
                    height: "100%",
                    width: "100%",
                    animationName: i === currentStoryIndex ? slideIn.name : "none",
                    animationDuration: duration,
                    animationTimingFunction: "linear",
                    animationPlayState: isManual || isPaused ? "paused" : "running",
                    transformOrigin: "left center",
                  }}
                />
              </div>
            </div>
          ))}
        </StoryLinesWrapper>
      </animated.div>
    </>
  );
};
