import * as React from "react";
import { css } from "@emotion/react";
import { ColorSpace, convertCSSColor } from "@color-spaces/convert";
import { Colors } from "components/theme/colors";
import { theme } from "components/theme/theme";
import styled from "@emotion/styled";
import { ThemeProvider } from "components/theme/ThemeProvider";

const ColorTile = styled.div<{ background: string | null; isInverted: boolean }>`
  background: ${(props) => props.background};
  flex-grow: 1;
  font-size: ${theme.fontSizes.XSmall};
  color: transparent;
  height: 100%;
  color: ${({ isInverted, theme }) =>
    isInverted ? theme.secondaryText : theme.secondaryBackground};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.XSmall};
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ColorTitle = styled.div<{ isInverted: boolean }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: ${({ isInverted, theme }) => (isInverted ? theme.text : theme.background)};
`;

const Page = () => {
  const [selected, setSelected] = React.useState<null | string>(null);
  return (
    <ThemeProvider>
      <div
        css={css`
          ${theme.monospaceFont}
          font-size: ${theme.fontSizes.medium};
        `}
      >
        {Object.entries(Colors).map(([name, value]) => {
          const LCH = convertCSSColor(value, ColorSpace.LCH);
          const P3 = convertCSSColor(value, ColorSpace.P3);
          const RGB = convertCSSColor(value, ColorSpace.sRGB);
          const lum = (LCH as string).match(/(\d.*)%/);
          const isInverted = lum !== null && parseInt(lum[1]) < 30;

          return selected === null || selected === name ? (
            <div
              key={name}
              css={css`
                display: flex;
                position: relative;
                height: ${selected === name ? "100vh" : "100px"};
                width: 100%;
              `}
              onClick={() => {
                setSelected(selected === null ? name : null);
              }}
            >
              <ColorTitle isInverted={isInverted}>{name}</ColorTitle>
              <ColorTile background={LCH} isInverted={isInverted}>
                {"lch"}
              </ColorTile>
              <ColorTile background={P3} isInverted={isInverted}>
                {"p3"}
              </ColorTile>
              <ColorTile background={RGB} isInverted={isInverted}>
                {"rgb"}
              </ColorTile>
            </div>
          ) : null;
        })}
      </div>
    </ThemeProvider>
  );
};

export default Page;
