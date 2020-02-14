import React from 'react';
import { css } from '@emotion/core';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { EditOnCodeSandbox } from './EditOnCodeSandbox';
import { theme } from './CodeTheme';

export const InlineCode = ({ children }) => {
  return (
    <code
      css={theme => css`
        font-family: ${theme.monospaceFont};
        background-color: ${theme.secondaryBackgound};
        color: ${theme.highlightedText};
        border-radius: 2px;
        padding: 0.1em 0.2em;
      `}
    >
      {children}
    </code>
  );
};

export const Code = ({ children, className, metastring }) => {
  const language = className.replace(/language-/, '');
  return (
    <>
      <Highlight code={children} language={language} {...defaultProps} theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={className}
            css={theme => css`
              font-family: ${theme.monospaceFont};
              padding: 1.2vw;
              padding-bottom: ${metastring ? '0.6vw' : '1.2vw'};
              font-size: 0.8em;
              border-radius: 4px;
              overflow-x: auto;

              @media (max-width: 767px) {
                margin: 0 -6vw;
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
    </>
  );
};
