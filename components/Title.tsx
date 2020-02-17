import { css } from '@emotion/core';
import { useAnchor } from './Anchor';

export const Title: React.FunctionComponent<{
  TitleLevel: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}> = ({ TitleLevel, children }) => {
  const [anchorId, anchor] = useAnchor(children);
  return (
    <TitleLevel
      id={anchorId}
      css={css`
        position: relative;
      `}
    >
      {TitleLevel === 'h1' ? null : anchor}
      {children}
    </TitleLevel>
  );
};

export const h1: React.FunctionComponent = props => <Title TitleLevel={'h1'} {...props} />;
export const h2: React.FunctionComponent = props => <Title TitleLevel={'h2'} {...props} />;
export const h3: React.FunctionComponent = props => <Title TitleLevel={'h3'} {...props} />;
export const h4: React.FunctionComponent = props => <Title TitleLevel={'h4'} {...props} />;
export const h5: React.FunctionComponent = props => <Title TitleLevel={'h5'} {...props} />;
export const h6: React.FunctionComponent = props => <Title TitleLevel={'h6'} {...props} />;
