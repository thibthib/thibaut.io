import { processImages, ImageDataMap } from "components/images/processImages";
import { ImagesContext } from "components/images/useImageData";
import { Text } from "components/stories/Text";
import * as React from "react";
import { Stories } from "components/stories/Stories";
import { Story } from "components/stories/Story";
import styled from "@emotion/styled";
import { ThemeProvider } from "components/theme/ThemeProvider";
import { ColorTheme } from "components/theme/colors";
import { ArchiaPreload, QuincyPreload } from "components/theme/typography";

export const getStaticProps = async () => {
  const imagesData = await processImages("stories/vancouver");

  return {
    props: {
      imagesData,
    },
  };
};

const Title = styled.h1`
  ${({ theme }) => theme.serifFont}
  font-size: ${({ theme }) => theme.fontSizes.XXXLarge};
  color: ${({ theme }) => theme.text};
  line-height: 1.1;
  padding-bottom: ${({ theme }) => theme.spacing.small};
  margin: 0;
`;

const SubTitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.secondaryText};
  ${({ theme }) => theme.sansSerifFont}
`;

const VancouverColorTheme = {
  ...ColorTheme,
  background: "lch(8% 20 160)",
  text: "lch(99% 2 120)",
  secondaryText: "lch(75% 40 120)",
};

const Vancouver: React.FunctionComponent<{ imagesData: ImageDataMap }> = ({ imagesData }) => {
  return (
    <ImagesContext.Provider value={imagesData}>
      <ArchiaPreload />
      <QuincyPreload />
      <ThemeProvider colors={VancouverColorTheme}>
        <Stories
          title={`Vancouver Island`}
          header={
            <>
              <Title>Vancouver Island</Title>
              <SubTitle>June 2016</SubTitle>
            </>
          }
          stories={[
            <Story image={`tofino beach`} />,
            <Story image={`map`}>
              <Text
                background={"blur"}
                top={20}
                width={72}
                rotation={"-5deg"}
                style={{ fontSize: "22px" }}
              >
                Direction la jolie ville de Victoria après 12 longues heures d’avion.
              </Text>
              <Text top={40} left={90} rotation={"-155deg"} style={{ fontSize: "36px" }}>
                ✈️
              </Text>
              <Text left={76} rotation={"-35deg"} style={{ fontSize: "36px" }}>
                🛳
              </Text>
              <Text top={54} left={60} style={{ fontSize: "36px" }}>
                🚙
              </Text>
            </Story>,
            <Story image={`ferry`} />,
            <Story image={`boat's deck`} />,
            <Story image={`house by the sea`} />,
            <Story image={`ferry dock`} />,
            <Story image={`brick facade`}>
              <Text top={15} background={"blur"} style={{ fontSize: "40px", whiteSpace: "nowrap" }}>
                📍 Victoria
              </Text>
            </Story>,
            <Story image={`china town`} />,
            <Story image={`china town 2`} />,
            <Story image={`following Marie`} />,
            <Story image={`back alley`} />,
            <Story image={`harbour`} />,
            <Story image={`cute taxi boat`}>
              <Text top={62} rotation={"-5deg"} style={{ fontSize: "36px" }}>
                😍
              </Text>
            </Story>,
            <Story image={`blue terrace on the sea`} />,
            <Story image={`house on the sea`} />,
            <Story image={`thibaut at victoria`} format={"square"} />,
            <Story image={`taxi boat up close`} />,
            <Story image={`marie on the sea`} />,
            <Story image={`red car`}>
              <Text top={20} width={75} background={"blur"} style={{ fontSize: "30px" }}>
                {"On s'enfonce dans l'île, vers Tofino 🚗"}
              </Text>
            </Story>,
            <Story image={`lodge in the forest`}>
              <Text top={90} width={85} background={"blur"} style={{ fontSize: "28px" }}>
                📍 Middle Beach Lodge
              </Text>
            </Story>,
            <Story image={`inside lodge`} />,
            <Story image={`lodge cabin`} />,
            <Story image={`cabin window`} />,
            <Story image={`middle beach lodge yellow`} format={"square"}>
              <Text top={17} style={{ fontSize: "52px" }}>
                🌧
              </Text>
            </Story>,
            <Story image={`old fishing boat`} />,
            <Story image={`house with boat`} format={"square"} />,
            <Story image={`house with plane`} />,
            <Story image={`church within trees`} />,
            <Story image={`thibaut with life jacket`} />,
            <Story image={`thibaut with life jacket`}>
              <Text
                left={48}
                top={45}
                width={76}
                background={"inverted-blur"}
                rotation={"-10deg"}
                style={{ fontSize: "36px", color: "hsl(197deg 100% 20%)" }}
              >
                Allons voir des baleines 🐳
              </Text>
            </Story>,
            <Story image={`small white boat`} />,
            <Story image={`whale`} />,
            <Story image={`written path`}>
              <Text
                top={15}
                background={"blur"}
                style={{ fontSize: "30px", color: "#d1d970", whiteSpace: "nowrap" }}
              >
                📍 Hot Springs Cove
              </Text>
            </Story>,
            <Story image={`leaf`} />,
            <Story image={`marie's path`} />,
            <Story image={`sea view`} />,
            <Story image={`small cabin in the woods`} />,
            <Story image={`bathing in the rocks`} />,
            <Story image={`docked seaplane`} />,
            <Story image={`docked seaplane`}>
              <Text top={35} left={35} rotation={"-10deg"} style={{ fontSize: "52px" }}>
                😭
              </Text>
              <Text width={50} background={"blur"} rotation={"-10deg"} style={{ fontSize: "30px" }}>
                {"on a pas fait d'hydravion"}
              </Text>
              <Text top={65} left={65} rotation={"10deg"} style={{ fontSize: "52px" }}>
                😭
              </Text>
            </Story>,
            <Story image={`vancouver building`}>
              <Text
                top={60}
                background={"inverted-blur"}
                rotation={"-10deg"}
                style={{ fontSize: "40px", whiteSpace: "nowrap" }}
              >
                📍 Vancouver
              </Text>
            </Story>,
            <Story image={`vancouver house`} />,
            <Story image={`stanley park`} format={"square"} />,
            <Story image={`slug`} />,
            <Story image={`racoon`} format={"square"}>
              <Text top={85} style={{ fontSize: "52px" }}>
                💚
              </Text>
            </Story>,
            <Story image={`goose`} />,
            <Story image={`vancouver sunset`} format={"square"}>
              <Text top={85} style={{ fontSize: "52px" }}>
                👋
              </Text>
            </Story>,
          ]}
        />
      </ThemeProvider>
    </ImagesContext.Provider>
  );
};

export default Vancouver;
