import * as React from 'react';
import { Global, css } from '@emotion/core';
import { RandomHexagons } from 'components/hexagons/RandomHexagons';

const Page: React.FunctionComponent = () => (
  <>
    <Global
      styles={css`
        body {
          margin: 0;
          overflow: hidden;
          background-color: hsl(250, 50%, 60%);
        }
      `}
    />
    <div
      css={css`
        height: 100vh;
        width: 100vw;
      `}
    >
      <RandomHexagons />
    </div>
  </>
);

export default Page;
