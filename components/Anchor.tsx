import * as React from "react";
import isArray from "lodash/isArray";
import kebabCase from "lodash/kebabCase";
import styled from "@emotion/styled";

const getAsString = (node: React.ReactNode): string => {
  if (typeof node === "string") {
    return node;
  } else if (typeof node === "number") {
    return `${node}`;
  } else if (React.isValidElement(node)) {
    return getAsString(node.props.children);
  } else if (isArray(node)) {
    return node.map((child) => getAsString(child)).join("");
  }
  return "";
};

const EmojiOverlay = styled.span`
  position: absolute;
`;

const EmojiWrapper = styled.span``;

const AnchorLink = styled.a`
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.secondaryText};
  white-space: nowrap;

  ::after {
    content: " ";
    display: inline-block;
    padding-right: ${({ theme }) => theme.spacing.small};
  }

  @media (min-width: 750px) {
    position: absolute;
    right: 100%;
  }

  > * {
    transition: opacity 150ms;
  }

  > svg {
    opacity: 0;
  }

  *:hover > & svg {
    opacity: 1;
  }

  *:hover > & ${EmojiOverlay} {
    opacity: 0;
  }
`;

const LinkIcon = styled.svg`
  width: ${({ theme }) => theme.fontSizes.small.replace("rem", "em")};
  height: ${({ theme }) => theme.fontSizes.small.replace("rem", "em")};
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  shape-rendering: geometricPrecision;
`;

export const useAnchor = (
  children: React.ReactNode,
  emoji?: string,
  isDisabled?: boolean
): [string, React.ReactElement] => {
  const childString = getAsString(children);
  const anchorId = kebabCase(childString);

  const Emoji = isDisabled ? EmojiWrapper : EmojiOverlay;

  return [
    anchorId,
    <AnchorLink as={isDisabled ? "span" : "a"} href={`#${anchorId}`} aria-label={childString}>
      <Emoji>{emoji}</Emoji>
      {isDisabled ? null : (
        <LinkIcon viewBox="0 0 24 24" role="img">
          <title>Link icon</title>
          <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"></path>
        </LinkIcon>
      )}
    </AnchorLink>,
  ];
};
