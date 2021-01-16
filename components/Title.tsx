import { css } from "@emotion/react";
import { useAnchor } from "./Anchor";
import { Theme } from "./theme/theme.emotion";

enum titleTags {
  h1 = "h1",
  h2 = "h2",
  h3 = "h3",
  h4 = "h4",
  h5 = "h5",
  h6 = "h6",
}

const styles = {
  [titleTags.h1]: ({ fontSizes, spacing }: Theme) => css`
    font-size: ${fontSizes.XLarge};
    line-height: ${spacing.medium};
    margin-top: ${spacing.XLarge};
    margin-bottom: ${spacing.XLarge};
  `,
  [titleTags.h2]: ({ fontSizes, spacing }: Theme) => css`
    font-size: ${fontSizes.large};
    line-height: ${spacing.medium};
    margin-top: ${spacing.medium};
    margin-bottom: ${spacing.medium};
  `,
  [titleTags.h3]: ({ fontSizes, spacing, secondaryText }: Theme) => css`
    font-size: ${fontSizes.medium};
    line-height: ${spacing.medium};
    margin-top: ${spacing.medium};
    margin-bottom: ${spacing.small};
    color: ${secondaryText};
    font-weight: normal;
  `,
  [titleTags.h4]: ({ fontSizes, spacing }: Theme) => css`
    font-size: ${fontSizes.small};
    line-height: ${spacing.medium};
    margin-top: ${spacing.medium};
    margin-bottom: 0;
    text-transform: uppercase;
  `,
  [titleTags.h5]: () => css``,
  [titleTags.h6]: () => css``,
};

export const Title: React.FunctionComponent<{
  Tag: titleTags;
}> = ({ Tag, children }) => {
  const [anchorId, anchor] = useAnchor(children);
  return (
    <Tag
      id={anchorId}
      css={(theme) => css`
        position: relative;
        ${styles[Tag](theme)}
      `}
    >
      {Tag === "h1" ? null : anchor}
      {children}
    </Tag>
  );
};

export const h1: React.FunctionComponent = (props) => <Title Tag={titleTags.h1} {...props} />;
export const h2: React.FunctionComponent = (props) => <Title Tag={titleTags.h2} {...props} />;
export const h3: React.FunctionComponent = (props) => <Title Tag={titleTags.h3} {...props} />;
export const h4: React.FunctionComponent = (props) => <Title Tag={titleTags.h4} {...props} />;
export const h5: React.FunctionComponent = (props) => <Title Tag={titleTags.h5} {...props} />;
export const h6: React.FunctionComponent = (props) => <Title Tag={titleTags.h6} {...props} />;
