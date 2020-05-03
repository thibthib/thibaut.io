import * as React from 'react';
import { css } from '@emotion/core';
import { syntaxTheme } from './CodeTheme';
import { EditOnCodeSandbox } from './EditOnCodeSandbox';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

export const Pre: React.FunctionComponent = ({ children }) => <>{children}</>;

export const InlineCode: React.FunctionComponent = ({ children }) => {
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

export const Code: React.FunctionComponent<{ className: string; metastring: string }> = ({
  children,
  className,
  metastring,
}) => {
  const language = className.replace(/language-/, '');
  const PreTag: React.FunctionComponent = React.useMemo(
    () => ({ children }) => (
      <pre
        css={theme => css`
          color: #d6deeb;
          background: #011627;

          font-family: ${theme.monospaceFont};
          font-feature-settings: initial;
          font-weight: 400;

          overflow-x: auto;
          overflow-y: hidden;
          text-align: left;
          word-break: keep-all;
          white-space: pre;
          word-spacing: normal;
          word-wrap: normal;
          hyphens: none;

          padding: ${theme.spacing.small};
          padding-bottom: ${metastring ? 0 : theme.spacing.small};
          margin: 0 -6vw ${theme.spacing.medium};

          @media (min-width: 767px) {
            font-size: ${theme.fontSizes.small};
            margin: 0 0 ${theme.spacing.medium};
            border-radius: 4px;
          }
        `}
      >
        {children}
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
    ),
    [metastring]
  );
  return (
    <>
      <SyntaxHighlighter language={language} style={syntaxTheme} PreTag={PreTag}>
        {children}
      </SyntaxHighlighter>
    </>
  );
};
