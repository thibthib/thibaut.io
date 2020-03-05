import { css } from '@emotion/core';
import { useAnchor } from './Anchor';

enum titleTags {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
}

const styles = {
  [titleTags.h1]: ({ fontSizes, spacing }: any) => css`
    font-size: ${fontSizes.XXLarge};
    line-height: ${spacing.large};
    margin-top: ${spacing.medium};
    margin-bottom: ${spacing.medium};
    font-feature-settings: 'ss05';
  `,
  [titleTags.h2]: ({ fontSizes, spacing }: any) => css`
    font-size: ${fontSizes.XLarge};
    line-height: ${spacing.medium};
    margin-top: ${spacing.medium};
    margin-bottom: ${spacing.small};
    font-weight: normal;
    font-feature-settings: 'ss05';
  `,
  [titleTags.h3]: ({ fontSizes, spacing, secondaryText }: any) => css`
    font-size: ${fontSizes.large};
    line-height: ${spacing.medium};
    margin-top: ${spacing.medium};
    margin-bottom: ${spacing.small};
    color: ${secondaryText};
    font-feature-settings: 'ss05';
  `,
  [titleTags.h4]: ({ fontSizes, spacing }: any) => css`
    font-size: ${fontSizes.medium};
    line-height: ${spacing.medium};
    margin-top: ${spacing.medium};
    margin-bottom: 0;
    text-transform: uppercase;
    font-feature-settings: 'ss05';
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
      css={theme => css`
        position: relative;
        line-height: 1.2;
        ${styles[Tag](theme)}
      `}
    >
      {Tag === 'h1' ? null : anchor}
      {children}
    </Tag>
  );
};

export const h1: React.FunctionComponent = props => <Title Tag={titleTags.h1} {...props} />;
export const h2: React.FunctionComponent = props => <Title Tag={titleTags.h2} {...props} />;
export const h3: React.FunctionComponent = props => <Title Tag={titleTags.h3} {...props} />;
export const h4: React.FunctionComponent = props => <Title Tag={titleTags.h4} {...props} />;
export const h5: React.FunctionComponent = props => <Title Tag={titleTags.h5} {...props} />;
export const h6: React.FunctionComponent = props => <Title Tag={titleTags.h6} {...props} />;
