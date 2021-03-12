import * as React from "react";
import { css } from "@emotion/react";
import { ColorSpace, convertCSSColor } from "@color-spaces/convert";
import { Colors } from "components/theme/colors";
import { theme } from "components/theme/theme";
import styled from "@emotion/styled";
import { ThemeProvider } from "components/theme/ThemeProvider";

const ColorRow = styled.div<{ isSelected: boolean }>`
  display: flex;
  position: relative;
  height: ${({ theme, isSelected }) => (isSelected ? "100vh" : theme.spacing.XLarge)};
  width: 100%;
`;

const ColorTile = styled.div<{ background: string | null; isInverted: boolean }>`
  flex-grow: 1;
  width: 33%;
  height: 100%;
  padding: ${({ theme }) => theme.spacing.XSmall};
  background: ${(props) => props.background};
  font-size: ${theme.fontSizes.XSmall};
  color: ${({ isInverted, theme }) =>
    isInverted ? theme.secondaryText : theme.secondaryBackground};
  text-align: center;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
`;

const ColorTileSupports = styled(ColorTile)<{ supports: string }>`
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};

  &:before {
    content: "❌";
  }

  @supports (color: ${(props) => props.supports}) {
    background: ${(props) => props.background};
    color: ${({ isInverted, theme }) =>
      isInverted ? theme.secondaryText : theme.secondaryBackground};
    &:before {
      content: "";
    }
  }
`;

const ColorName = styled.div<{ isInverted: boolean }>`
  margin-bottom: ${({ theme }) => theme.spacing.XSmall};
  font-size: ${({ theme }) => theme.fontSizes.medium};
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
            <ColorRow
              key={name}
              isSelected={name === selected}
              onClick={() => {
                setSelected(selected === null ? name : null);
              }}
            >
              <ColorTile background={RGB} isInverted={isInverted}>
                <ColorName isInverted={isInverted}>{name}</ColorName>
                {"rgb"}
              </ColorTile>
              <ColorTileSupports
                background={P3}
                isInverted={isInverted}
                supports={"color(display-p3 1 1 1)"}
              >
                {"p3"}
              </ColorTileSupports>
              <ColorTileSupports background={LCH} isInverted={isInverted} supports={"lch(1% 1 1)"}>
                {"lch"}
              </ColorTileSupports>
            </ColorRow>
          ) : null;
        })}
      </div>
    </ThemeProvider>
  );
};

export default Page;
