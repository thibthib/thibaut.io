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
  [titleTags.h1]: (_: any) => css`
    margin-bottom: 3rem;
    font-size: 3rem;
  `,
  [titleTags.h2]: (_: any) => css`
    margin-top: 2rem;
    margin-bottom: 1rem;
    font-weight: normal;
    font-size: 2rem;
  `,
  [titleTags.h3]: (_: any) => css`
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-variant: small-caps;
  `,
  [titleTags.h4]: (theme: any) => css`
    margin: 0;
    font-weight: normal;
    font-style: italic;
    color: ${theme.secondaryText};
  `,
  [titleTags.h5]: (theme: any) => css`
    margin: 0;
    font-weight: normal;
    font-style: italic;
    color: ${theme.secondaryText};
  `,
  [titleTags.h6]: (theme: any) => css`
    margin: 0;
    font-weight: normal;
    font-style: italic;
    color: ${theme.secondaryText};
  `,
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
