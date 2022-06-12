import { css } from "@emotion/react";
import { GradientText } from "./GradientText";

export const EditOnCodeSandbox: React.FunctionComponent<{ sandbox: string; fileName: string }> = ({
  sandbox,
  fileName,
}) => {
  return (
    <span
      css={(theme) => css`
        width: calc(100% + 12vw);
        display: block;
        margin: -${theme.spacing.large} -6vw ${theme.spacing.medium};
        padding: 0 ${theme.spacing.small} ${theme.spacing.XSmall};
        background: ${theme.secondaryBackground};
        ${theme.monospaceFont};
        font-size: 0.9rem;

        @media (min-width: 767px) {
          width: 100%;
          border-radius: 4px;
          margin-left: 0;
          margin-right: 0;
        }
      `}
    >
      <a
        href={`https://codesandbox.io/s/${sandbox}?fontsize=14&hidenavigation=1&module=${encodeURIComponent(
          fileName
        )}&theme=dark`}
        css={(theme) => css`
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-decoration: none;
          height: ${theme.spacing.medium};

          :hover > span {
            opacity: 1;
            transform: translateX(0);
          }
        `}
        target="_blank"
        rel="noreferrer noopener"
      >
        <span
          css={(theme) => css`
            opacity: 0;
            transform: translateX(${theme.spacing.small});
            transition: 200ms all;
          `}
        >
          <GradientText>{" Edit on CodeSandbox"}</GradientText>
        </span>
        <svg
          viewBox="0 0 89 100"
          xmlns="http://www.w3.org/2000/svg"
          css={(theme) => css`
            width: ${theme.fontSizes.large};
            margin-left: ${theme.spacing.XSmall};
          `}
          role="img"
        >
          <title>CodeSandbox icon</title>
          <g fillRule="evenodd" fill="none">
            <path
              d="M32.6797386 37.4240873c0-3.9400717 2.779444-5.5480883 6.1699063-3.6133785l23.0814114 13.1710156c3.4075452 1.9444579 3.3904622 5.1067948 0 7.0415046L38.8496449 67.1942447c-3.4075452 1.9444576-6.1699063.348667-6.1699063-3.6133786V37.4240873z"
              css={(theme) =>
                css`
                  fill: ${theme.secondaryHighlight};
                `
              }
            />
            <path
              d="M44.3710925 4.59331428L4 27.4331103v45.0867418l40.3544619 22.5293353 40.3790413-22.6089251V27.3276046L44.3710925 4.59331428z"
              css={(theme) =>
                css`
                  stroke: ${theme.secondaryHighlight};
                `
              }
              strokeWidth="8"
            />
          </g>
        </svg>
      </a>
    </span>
  );
};
