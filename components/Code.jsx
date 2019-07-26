import React from 'react';
import { css } from '@emotion/core';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { theme } from './CodeTheme';

const monospaceFont = css`
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
`;

export const InlineCode = ({ children }) => {
  return (
    <code
      css={css`
        ${monospaceFont}
        background-color: ${theme.plain.backgroundColor};
        color: #7fdbca;
        border-radius: 2px;
        padding: 0.1em 0.2em;
      `}
    >
      {children}
    </code>
  );
};

export const Code = ({ children, className }) => {
  const language = className.replace(/language-/, '');
  return (
    <Highlight code={children} language={language} {...defaultProps} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={className}
          css={css`
            ${monospaceFont}
            padding: 1.2vw;
            font-size: 0.8em;
            border-radius: 4px;
            overflow-x: scroll;

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
        </pre>
      )}
    </Highlight>
  );
};
