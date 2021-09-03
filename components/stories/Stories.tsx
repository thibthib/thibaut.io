import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import { useQueryParamState } from "components/use-query-param-state";
import Head from "next/head";
import Link from "next/link";
import * as React from "react";
import { Overlay } from "./Overlay";
import { StoryWrapper } from "./StoryWrapper";
import { useInterval } from "./useInterval";
import { ArchiaPreload, QuincyPreload } from "components/theme/typography";

const storyDuration = 2500;

const BackLink = styled.a`
  position: absolute;
  top: 0;
  left: 0;
  text-decoration: none;
  color: ${({ theme }) => theme.secondaryText};

  ${({ theme }) => theme.sansSerifFont}
  font-size: ${({ theme }) => theme.fontSizes.medium};
  padding: ${({ theme }) => theme.spacing.small};
`;

const LinkTextPlaceholder = styled(BackLink.withComponent("div"))`
  position: relative;
  color: transparent;

  @media (min-aspect-ratio: 8/10) {
    display: none;
  }
`;

const LinkText = "← stories";

const TouchWrapper = styled.div`
  position: relative;
  -webkit-touch-callout: none;
  height: 100vh;
  width: 100vw;
  margin: auto;

  @media (min-aspect-ratio: 8/10) {
    width: 56.25vh;
  }
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

  const [canInteract, setCanInteract] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => {
      setCanInteract(window.scrollY / (document.body.clientHeight - window.innerHeight) === 1);
    };
    document.addEventListener("scroll", onScroll);
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  });

  const isPaused = isHolding || !canInteract;
  useInterval(index, storyDuration, isPaused || isManual, () => {
    setIndex(nextIndex);
  });

  const touchStartMetadata = React.useRef({ scrollY: 0, clientX: 0, manualChange: false });
  const manualTimeout = React.useRef(0);

  const onInteractionStart = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    touchStartMetadata.current = {
      scrollY: window.scrollY,
      clientX:
        "touches" in event.nativeEvent
          ? event.nativeEvent.touches[0].clientX
          : event.nativeEvent.clientX,
      manualChange: false,
    };
    setIsHolding(true);
    manualTimeout.current = window.setTimeout(() => {
      setIsManual(!isManual);
      touchStartMetadata.current.manualChange = true;
    }, 500);
  };

  const onInteractionEnd = (
    event: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    // this prevents the mouse event handler from being fired when a touch event is already fired
    event.preventDefault();
    clearTimeout(manualTimeout.current);
    const { scrollY, clientX } = touchStartMetadata.current;
    const canScroll = document.body.clientHeight - window.innerHeight > 0;
    setIsHolding(false);
    if (!canInteract) {
      if (!canScroll) {
        setCanInteract(true);
      }
    } else if (
      Math.abs(window.scrollY - scrollY) < 20 &&
      touchStartMetadata.current.manualChange === false
    ) {
      const isClickOnTheRight = clientX > window.innerWidth / 2;
      if (index === prevIndex && !canScroll && !isClickOnTheRight) {
        setCanInteract(false);
      }
      setIndex(isClickOnTheRight ? nextIndex : prevIndex);
    }
  };
  return (
    <>
      <Head>
        <title>{`${title} | thibaut's stories`}</title>
        <meta name="description" content={`${title}, a picture story by thibaut`} />
        <ArchiaPreload />
        <QuincyPreload />
      </Head>
      <Global
        styles={css`
          body,
          img {
            user-select: none;
          }
        `}
      />
      <LinkTextPlaceholder>{LinkText}</LinkTextPlaceholder>
      <TouchWrapper
        onContextMenu={(event) => {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }}
        onTouchStart={onInteractionStart}
        onMouseDown={onInteractionStart}
        onTouchEnd={onInteractionEnd}
        onMouseUp={onInteractionEnd}
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
          isHidden={canInteract}
        />
      </TouchWrapper>
      <Link href={`/`} passHref>
        <BackLink>{LinkText}</BackLink>
      </Link>
    </>
  );
};
