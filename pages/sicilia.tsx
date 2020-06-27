import Head from "next/head";
import { Global, css } from "@emotion/core";
import { getPictures, Pictures } from "components/pictures/getImageMap";
import { Cover } from "components/pictures/Cover";
import { Title, titleTags } from "components/Title";

export async function getStaticProps() {
  return {
    props: {
      pictures: await getPictures("sicilia"),
    },
  };
}

const Sicilia: React.FunctionComponent<{ pictures: Pictures }> = ({ pictures }) => {
  return (
    <div>
      <Head>
        <link
          rel="stylesheet"
          href="https://www.atipofoundry.com/media/pages/fonts/calendas-plus/1773982104-1591511660/stylesheet.css"
        />
      </Head>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <Cover
        title={"La famiglia in Sicilia"}
        subtitle={"Sable noir et pierres blanches"}
        picture={pictures["view-from-stromboli"]}
      />
      <Title Tag={titleTags.h2}>Palerme estivale</Title>
    </div>
  );
};

export default Sicilia;
