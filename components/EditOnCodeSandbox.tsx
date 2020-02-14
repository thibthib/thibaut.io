import { css } from '@emotion/core';

export const EditOnCodeSandbox: React.FunctionComponent<{ info: string }> = ({ info }) => {
  const [sandboxName, fileName] = info.split(' ');
  return (
    <a
      href={`https://codesandbox.io/s/${sandboxName}?fontsize=14&hidenavigation=1&module=${encodeURIComponent(
        fileName
      )}&theme=dark`}
      css={css`
        display: inline-block;
        text-decoration: none;
        line-height: 1.4em;
      `}
      target="_blank"
    >
      <span
        css={css`
          display: flex;
        `}
      >
        <svg
          viewBox="0 0 89 100"
          xmlns="http://www.w3.org/2000/svg"
          css={css`
            height: 1.4em;
            margin-right: 8px;
          `}
        >
          <g fillRule="evenodd" fill="none">
            <path
              d="M32.6797386 37.4240873c0-3.9400717 2.779444-5.5480883 6.1699063-3.6133785l23.0814114 13.1710156c3.4075452 1.9444579 3.3904622 5.1067948 0 7.0415046L38.8496449 67.1942447c-3.4075452 1.9444576-6.1699063.348667-6.1699063-3.6133786V37.4240873z"
              fill="hsl(208, 94%, 56%)"
            />
            <path
              d="M44.3710925 4.59331428L4 27.4331103v45.0867418l40.3544619 22.5293353 40.3790413-22.6089251V27.3276046L44.3710925 4.59331428z"
              stroke="hsl(208, 94%, 56%)"
              strokeWidth="8"
            />
          </g>
        </svg>
        <span
          css={theme => css`
            position: relative;
            background-image: ${theme.gradientText};
            color: ${theme.background};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            -webkit-box-decoration-break: clone;
          `}
        >
          Edit on CodeSandbox
        </span>
      </span>
    </a>
  );
};
