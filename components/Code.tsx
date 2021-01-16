import * as React from "react";
import { css, Global } from "@emotion/react";
import { Colors, colorVariables } from "./theme/colors";
import { EditOnCodeSandbox } from "./EditOnCodeSandbox";
import { getCSSVariableName, mapColorObject } from "./theme/helpers";

export const Pre: React.FunctionComponent = ({ children }) => (
  <pre
    css={(theme) => css`
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
      css={(theme) => css`
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

export const CodeTheme = () => {
  return (
    <Global
      styles={css`
        .script {
          color: ${colorVariables.text};
        }
        .comment {
          color: ${colorVariables.shade5};
          font-style: italic;
        }
        .punctuation,
        .operator {
          color: ${colorVariables.accent1alt};
        }
        .property,
        .property-access {
          color: ${colorVariables.accent1};
        }
        .symbol,
        .string {
          color: ${colorVariables.accent2alt};
        }
        .tag {
          color: ${colorVariables.accent4};
        }
        .tag > .punctuation {
          color: ${colorVariables.accent4alt};
        }
        .char,
        .arrow,
        .attr-name {
          color: ${colorVariables.accent5};
        }
        .keyword {
          color: ${colorVariables.accent5};
          font-style: italic;
        }
        .parameter,
        .attr-value {
          color: ${colorVariables.accent3alt};
        }
        .boolean,
        .number,
        .null,
        .constant {
          color: ${colorVariables.accent3};
          font-style: normal;
        }
        .function {
          color: ${colorVariables.accent6};
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
      css={(theme) => css`
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
