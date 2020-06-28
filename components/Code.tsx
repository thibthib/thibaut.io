import * as React from "react";
import { css, Global } from "@emotion/core";
import { Colors, getTheme, Theme } from "./Theme";
import { EditOnCodeSandbox } from "./EditOnCodeSandbox";

export const Pre: React.FunctionComponent = ({ children }) => (
  <pre
    css={(theme: Theme) => css`
      background: ${theme.secondaryBackground};

      line-height: 1.5em;
      font-size: 0.9rem;

      overflow-x: auto;
      overflow-y: hidden;
      text-align: left;
      word-break: keep-all;
      white-space: pre;
      word-spacing: normal;
      word-wrap: normal;
      hyphens: none;

      margin: 0 -6vw ${theme.spacing.medium};

      @media (min-width: 767px) {
        margin: 0 0 ${theme.spacing.medium};
        border-radius: 4px;
      }
    `}
  >
    {children}
  </pre>
);

export const InlineCode: React.FunctionComponent = ({ children }) => {
  return (
    <code
      css={(theme: Theme) => css`
        ${theme.monospaceFont};
        background-color: ${theme.secondaryBackground};
        color: ${theme.highlight};
        border-radius: 4px;
        padding: 0.1em 0.25em 0.25em;
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

export const CodeTheme = () => {
  return (
    <Global
      styles={css`
        ${themeDefinition};
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
  );
};

export const Code: React.FunctionComponent<{
  className: string;
  metastring: string;
}> = ({ children, metastring }) => {
  return (
    <code
      css={(theme: Theme) => css`
        ${theme.monospaceFont};
        color: ${theme.text};
        display: block;
        padding: ${theme.spacing.small};
        padding-bottom: ${metastring ? 0 : theme.spacing.small};
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
    </code>
  );
};
