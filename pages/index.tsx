import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { InstagramLogo } from "components/icons/Instagram";
import { GithubLogo } from "components/icons/Github";
import { TwitterLogo } from "components/icons/Twitter";
import { ExposureLogo } from "components/icons/Exposure";
import { GradientText } from "components/GradientText";
import * as styleRefs from "components/home/index.treat";
import { useStyles } from "react-treat";
import { PageLink } from "components/home/PageLink";
import { ArchiaPreload } from "components/theme/Preload";

const Dots = dynamic<any>(
  () => import(/* webpackChunkName: "dots" */ "components/Dots").then(({ Dots }) => Dots),
  {
    ssr: false,
  }
);

const Page = () => {
  const styles = useStyles(styleRefs);
  return (
    <>
      <Head>
        <title>thibaut</title>
        <meta name="description" content="thibaut's personal website" />
        <ArchiaPreload />
      </Head>
      <Dots />
      <main className={styles.main}>
        <div className={styles.leftColumn}>
          <h1 className={styles.thibautTitle}>
            <GradientText>thibaut</GradientText>
          </h1>
          <div className={styles.externalLinks}>
            <PageLink
              href={"https://github.com/thibthib"}
              label={"GitHub"}
              logo={<GithubLogo className={styles.linkLogo} />}
            />
            <PageLink
              href={"https://www.instagram.com/thib_thib"}
              label={"Instagram"}
              logo={<InstagramLogo className={styles.linkLogo} />}
            />

            <PageLink
              href={"https://twitter.com/thib_thib"}
              label={"Twitter"}
              logo={<TwitterLogo className={styles.linkLogo} />}
            />
            <PageLink
              href={"https://thib.exposure.co"}
              label={"Exposure"}
              logo={<ExposureLogo className={styles.linkLogo} />}
            />
          </div>
        </div>
        <div className={styles.rightColumn}>
          <h2 className={styles.subTitle}>projects</h2>
          <Link href={"/duple"} passHref>
            <PageLink label={"Duple"} description={"Recto-verso photography"} logo={"📷"} />
          </Link>
          <Link href={"/react-refs-evolution"} passHref>
            <PageLink
              label={"Evolution of refs"}
              description={"With great power comes great responsability"}
              logo={"🦖"}
            />
          </Link>
          <Link href={"/react-canvas-components"} passHref>
            <PageLink
              label={"React + Canvas = 💜"}
              description={"An untold love story"}
              logo={"🖌"}
            />
          </Link>
        </div>
      </main>
    </>
  );
};

export default Page;
