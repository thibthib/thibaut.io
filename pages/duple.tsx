import Head from "next/head";
import { Portrait } from "components/duple/Portrait";
import { processImages } from "components/images/processImages";

export const getStaticProps = async () => {
  const imagesData = await processImages("portraits");

  return {
    props: {
      portraits: ["Laurent", "Fanny", "Edern", "Ingrid", "Robin"].map((name) => ({
        ...imagesData[`${name}-back`],
        name,
      })),
    },
  };
};

const Duple: React.FunctionComponent<{
  portraits: Array<{ name: string; placeholder: string }>;
}> = ({ portraits }) => (
  <div>
    <Head>
      <title>Duple – by thibaut</title>
      <meta name="description" content="Photos by thib_thib" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <header>
      <h1>
        Duple<span> Valse à deux temps</span>
      </h1>
    </header>
    <main>
      {portraits.map(({ name, placeholder }, index) => (
        <Portrait key={name} id={portraits.length - index} name={name} placeholder={placeholder} />
      ))}
    </main>
    <style global jsx>{`
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu,
          Cantarell, "Helvetica Neue", sans-serif;
      }
    `}</style>
    <style jsx>{`
      h1 {
        text-transform: uppercase;
        text-align: center;
        font-size: 40px;
        line-height: 40px;
        color: #555;
      }

      h1 span {
        font-weight: 400;
        font-size: 26px;
        display: inline-block;
        vertical-align: top;
        color: #949494;
        display: block;
      }
    `}</style>
  </div>
);

export default Duple;
