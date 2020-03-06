import React from 'react';
import { css } from '@emotion/core';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { theme } from './CodeTheme';
import { EditOnCodeSandbox } from './EditOnCodeSandbox';

export const InlineCode = ({ children }) => {
  return (
    <code
      css={theme => css`
        font-family: ${theme.monospaceFont};
        background-color: ${theme.secondaryBackgound};
        color: ${theme.highlightedText};
        border-radius: 2px;
        padding: 0.1em 0.3em 0.3em;
        font-feature-settings: initial;
        font-weight: 400;
      `}
    >
      {children}
    </code>
  );
};

export const Code = ({ children, className, metastring }) => {
  const language = className.replace(/language-/, '');
  return (
    <Highlight code={children} language={language} {...defaultProps} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          css={theme => css`
            font-family: ${theme.monospaceFont};
            padding: ${theme.spacing.small};
            padding-bottom: ${metastring ? 0 : theme.spacing.small};
            border-radius: 4px;
            overflow-x: auto;
            word-break: keep-all;
            font-feature-settings: initial;
            font-weight: 400;
            margin: 0 -6vw ${theme.spacing.medium};

            @media (min-width: 767px) {
              font-size: ${theme.fontSizes.small};
              margin: 0 0 ${theme.spacing.medium};
            }
          `}
          style={style}
        >
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => {
                const newTypes =
                  language === 'jsx' && token.types.includes('tag')
                    ? token.types.filter(type => type !== 'punctuation')
                    : token.types;
                return token.empty && i === tokens.length - 1 ? null : (
                  <span
                    {...getTokenProps({
                      token: {
                        ...token,
                        types: newTypes,
                      },
                      key,
                    })}
                  />
                );
              })}
            </div>
          ))}
          {metastring ? (
            <span
              css={css`
                width: 100%;
                text-align: right;
                display: inline-block;
              `}
            >
              <EditOnCodeSandbox info={metastring} />
            </span>
          ) : null}
        </pre>
      )}
    </Highlight>
  );
};
