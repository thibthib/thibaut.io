import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useQueryParamState } from "components/use-query-param-state";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { Overlay } from "./Overlay";
import { StoryWrapper } from "./StoryWrapper";
import { useInterval } from "./useInterval";

const storyDuration = 2500;

const LinkTextWrapper = styled.div`
  ${({ theme }) => theme.sansSerifFont}
  font-size: ${({ theme }) => theme.fontSizes.medium};
  color: transparent;
  padding: ${({ theme }) => theme.spacing.small};
`;

const LinkText = "← stories";

const BackLink = styled(LinkTextWrapper.withComponent("a"))`
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.secondaryText};
`;

const TouchWrapper = styled.div`
  position: relative;
  -webkit-touch-callout: none;
  height: 100vh;
  width: 100vw;
`;

export const Stories: React.FunctionComponent<{
  title: string;
  header: React.ReactNode;
  stories: React.ReactNode[];
}> = ({ title, header, stories }) => {
  const [index, setIndex] = useQueryParamState("s", 0);
  const nextIndex = Math.min(index + 1, stories.length - 1);
  const prevIndex = Math.max(index - 1, 0);

  const [isHolding, setIsHolding] = React.useState(false);
  const [isManual, setIsManual] = React.useState(false);

  const [isScrolledDown, setIsScrolledDown] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      const scrollPercentage = window.scrollY / (document.body.clientHeight - window.innerHeight);
      setIsScrolledDown(scrollPercentage === 1);
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });

  const isPaused = isHolding || !isScrolledDown;
  useInterval(storyDuration, isPaused || isManual, () => {
    setIndex(nextIndex);
  });

  const touchStartMetadata = React.useRef({ scrollY: 0, clientX: 0, manualChange: false });
  const manualTimeout = React.useRef(0);
  return (
    <>
      <Head>
        <title>{`${title} | thibaut's stories`}</title>
        <meta name="description" content={`${title}, a picture story by thibaut`} />
      </Head>
      <Global
        styles={css`
          body {
            user-select: none;
          }
        `}
      />
      <LinkTextWrapper>{LinkText}</LinkTextWrapper>
      <TouchWrapper
        onContextMenu={(event) => {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }}
        onTouchStart={(event) => {
          touchStartMetadata.current = {
            scrollY: window.scrollY,
            clientX: event.nativeEvent.touches[0].clientX,
            manualChange: false,
          };
          setIsHolding(true);
          manualTimeout.current = window.setTimeout(() => {
            setIsManual(!isManual);
            touchStartMetadata.current.manualChange = true;
          }, 500);
        }}
        onTouchEnd={() => {
          clearTimeout(manualTimeout.current);
          const { scrollY, clientX } = touchStartMetadata.current;
          setIsHolding(false);
          if (
            isScrolledDown &&
            Math.abs(window.scrollY - scrollY) < 20 &&
            touchStartMetadata.current.manualChange === false
          ) {
            setIndex(clientX > window.innerWidth / 2 ? nextIndex : prevIndex);
          }
        }}
      >
        {stories.slice(prevIndex, nextIndex + 1).map((story) => (
          <StoryWrapper key={stories.indexOf(story)} isCurrent={story === stories[index]}>
            {story}
          </StoryWrapper>
        ))}
        <Overlay
          storyCount={stories.length}
          currentStoryIndex={index}
          storyDuration={storyDuration}
          isManual={isManual}
          isPaused={isPaused}
          header={header}
        />
      </TouchWrapper>
      <Link href={`/`} passHref>
        <BackLink>{LinkText}</BackLink>
      </Link>
    </>
  );
};
