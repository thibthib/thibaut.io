import * as React from 'react';
import { css, Global } from '@emotion/core';
import { Colors, getTheme, Theme } from './Theme';
import { EditOnCodeSandbox } from './EditOnCodeSandbox';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';

export const Pre: React.FunctionComponent = ({ children }) => <>{children}</>;

export const InlineCode: React.FunctionComponent = ({ children }) => {
  return (
    <code
      css={(theme: Theme) => css`
        font-family: ${theme.monospaceFont};
        background-color: ${theme.secondaryBackground};
        color: ${theme.highlight};
        border-radius: 2px;
        padding: 0.1em 0.3em 0.3em;
        font-feature-settings: initial;
        font-weight: 300;
      `}
    >
      {children}
    </code>
  );
};

const CodeColorTheme = {
  text: Colors.shade9,
  comment: Colors.shade5,
  tag: Colors.accent4,
  tagPunct: Colors.accent4alt,
  constant: Colors.accent3,
  parameters: Colors.accent3alt,
  keyword: Colors.accent5,
  function: Colors.accent6,
  property: Colors.accent1,
  string: Colors.accent2alt,
  punctuation: Colors.accent1alt,
};

const [themeVariables, themeDefinition] = getTheme(CodeColorTheme);

export const Code: React.FunctionComponent<{ className: string; metastring: string }> = ({
  children,
  className,
  metastring,
}) => {
  const language = className.replace(/language-/, '');
  const PreTag: React.FunctionComponent = React.useMemo(
    () => ({ children }) => (
      <pre
        css={(theme: Theme) => css`
          color: ${theme.text};
          background: ${theme.secondaryBackground};

          font-family: ${theme.monospaceFont};
          font-feature-settings: initial;
          font-weight: 400;
          line-height: 1.5em;
          /* code examples are 80 characters long */
          /* whereas body length is 68 chars */
          font-size: ${theme.lineLength / 80}rem;

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
            /* font-size: ${theme.fontSizes.small}; */
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
      <Global
        styles={(theme: Theme) => css`
          ${themeDefinition};
          code {
            font-family: ${theme.monospaceFont};
            color: ${themeVariables.text};
          }
          .script {
            color: ${themeVariables.text};
          }
          .comment {
            color: ${themeVariables.comment};
            font-style: italic;
          }
          .punctuation,
          .operator {
            color: ${themeVariables.punctuation};
          }
          .property,
          .property-access {
            color: ${themeVariables.property};
          }
          .symbol,
          .string {
            color: ${themeVariables.string};
          }
          .tag {
            color: ${themeVariables.tag};
          }
          .tag > .punctuation {
            color: ${themeVariables.tagPunct};
          }
          .char,
          .arrow,
          .attr-name {
            color: ${themeVariables.keyword};
          }
          .keyword {
            color: ${themeVariables.keyword};
            font-style: italic;
          }
          .parameter,
          .attr-value {
            color: ${themeVariables.parameters};
          }
          .boolean,
          .number,
          .null,
          .constant {
            color: ${themeVariables.constant};
            font-style: normal;
          }
          .function {
            color: ${themeVariables.function};
          }
        `}
      />
      <SyntaxHighlighter language={language} PreTag={PreTag} useInlineStyles={false}>
        {children}
      </SyntaxHighlighter>
    </>
  );
};
