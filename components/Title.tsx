import styled from "@emotion/styled";
import * as React from "react";
import { useAnchor } from "./Anchor";

const parseEmoji = (title: React.ReactNode): { emoji: string; text: React.ReactNode } | null => {
  const emojiString =
    typeof title === "string"
      ? title
      : Array.isArray(title) && typeof title[0] === "string"
      ? title[0]
      : null;

  if (emojiString === null) {
    return null;
  }
  const match = emojiString.match(/emoji=(\S*)\s(.*)/);
  return match === null
    ? null
    : { emoji: match[1], text: Array.isArray(title) ? title.slice(1) : match[2] };
};

const getTitleComponent = (
  as: keyof JSX.IntrinsicElements
): React.FunctionComponent<{
  className?: string;
}> => ({ className, children, ...props }) => {
  let emoji;
  let titleText = children;

  const parsed = parseEmoji(children);
  if (parsed !== null) {
    emoji = parsed.emoji;
    titleText = parsed.text;
  }

  const [anchorId, anchor] = useAnchor(titleText, emoji, as === "h1");

  return React.createElement(
    as,
    { className, id: anchorId, ...props },
    <>
      {anchor}
      {titleText}
    </>
  );
};

export const h1 = styled(getTitleComponent("h1"))`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.XLarge};
  line-height: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.XLarge};
  margin-bottom: ${({ theme }) => theme.spacing.XLarge};
`;

export const h2 = styled(getTitleComponent("h2"))`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.large};
  line-height: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.medium};
`;

export const h3 = styled(getTitleComponent("h3"))`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.medium};
  line-height: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  color: ${({ theme }) => theme.secondaryText};
  font-weight: normal;
`;

export const h4 = styled(getTitleComponent("h4"))`
  position: relative;
  font-size: ${({ theme }) => theme.fontSizes.small};
  line-height: ${({ theme }) => theme.spacing.medium};
  margin-top: ${({ theme }) => theme.spacing.medium};
  margin-bottom: 0;
  text-transform: uppercase;
`;

export const h5 = styled(getTitleComponent("h5"))`
  position: relative;
`;

export const h6 = styled(getTitleComponent("h6"))`
  position: relative;
`;
