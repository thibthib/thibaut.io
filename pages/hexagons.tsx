import * as React from "react";
import { Global, css } from "@emotion/react";
import { RandomHexagons } from "components/hexagons/RandomHexagons";
import { Favicon } from "components/Favicon";

const Page: React.FunctionComponent = () => (
  <>
    <Global
      styles={css`
        body {
          overflow: hidden;
          background-color: hsl(250, 50%, 60%);
        }
      `}
    />
    <Favicon emoji={"⬢"} />
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
