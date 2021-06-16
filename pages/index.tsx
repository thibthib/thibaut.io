import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import styled from "@emotion/styled";
import { css, useTheme } from "@emotion/react";
import { InstagramLogo } from "components/icons/Instagram";
import { GithubLogo } from "components/icons/Github";
import { TwitterLogo } from "components/icons/Twitter";
import { ExposureLogo } from "components/icons/Exposure";
import { GradientText } from "components/GradientText";
import { ArchiaPreload } from "components/theme/typography";
import { ThemeProvider } from "components/theme/ThemeProvider";
import { Favicon } from "components/Favicon";

const Dots = dynamic<any>(
  () => import(/* webpackChunkName: "dots" */ "components/Dots").then(({ Dots }) => Dots),
  {
    ssr: false,
  }
);

const getColoredLogo = (logo: React.FunctionComponent) =>
  styled(logo)(
    ({ theme }) => css`
      fill: ${theme.secondaryText};
    `
  );

const Github = getColoredLogo(GithubLogo);
const Instagram = getColoredLogo(InstagramLogo);
const Twitter = getColoredLogo(TwitterLogo);
const Exposure = getColoredLogo(ExposureLogo);

const PageLink = React.forwardRef<
  HTMLAnchorElement,
  {
    href?: string;
    label: string;
    description?: string;
    logo: React.ReactNode;
  }
>(({ href, label, description, logo }: any, ref) => {
  const { spacing, fontSizes, text, secondaryText } = useTheme();
  return (
    <a
      href={href}
      ref={ref}
      css={css`
        display: inline-flex;
        justify-content: flex-start;
        align-items: center;
        margin-top: ${spacing.medium};
        text-decoration: none;
        color: ${text};
      `}
    >
      <div
        css={css`
          margin-right: ${spacing.small};
          width: ${spacing.medium};
          height: ${spacing.medium};
          font-size: ${fontSizes.XLarge};
        `}
      >
        {logo}
      </div>
      <div>
        <p
          css={css`
            display: block;
            margin: 0;
            text-decoration: underline;
            text-decoration-color: ${secondaryText};
            font-size: ${fontSizes.large};
            white-space: nowrap;
          `}
        >
          {label}
        </p>
        {description ? (
          <p
            css={(theme) => css`
              margin-top: ${spacing.XSmall};
              font-size: ${fontSizes.small};
              font-style: italic;
              ${theme.monospaceFont}
            `}
          >
            {description}
          </p>
        ) : null}
      </div>
    </a>
  );
});

PageLink.displayName = "PageLink";

const Page = () => {
  return (
    <ThemeProvider>
      <Head>
        <title>thibaut</title>
        <meta name="description" content="thibaut's personal website" />
        <ArchiaPreload />
      </Head>
      <Favicon emoji={"🏡"} />
      <Dots />
      <main
        css={(theme) => css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 10vh 0;
          margin: 0 auto;
          background-color: ${theme.background};
          color: ${theme.text};
          ${theme.sansSerifFont}

          @media (min-width: 660px) {
            flex-direction: row;
            margin-top: 0;
            height: 100vh;
            padding: 0;
          }
        `}
      >
        <div
          css={(theme) => css`
            position: relative;
            display: inline-flex;
            flex-direction: column;
            width: 100vw;
            padding: ${theme.spacing.medium};

            @media (min-width: 660px) {
              width: 43vw;
              padding: 0 ${theme.spacing.large} 0 ${theme.spacing.medium};
              align-items: flex-end;
            }
          `}
        >
          <h1
            css={(theme) => css`
              margin-bottom: ${theme.spacing.large};
              font-size: ${theme.fontSizes.XXXLarge};
              white-space: nowrap;
            `}
          >
            <GradientText>thibaut</GradientText>
          </h1>
          <div
            css={(theme) => css`
              margin-bottom: ${theme.spacing.medium};
              display: flex;
              flex-direction: column;
              align-items: flex-start;

              @media (min-width: 660px) {
                align-items: flex-end;
              }
            `}
          >
            <PageLink href={"https://github.com/thibthib"} label={"GitHub"} logo={<Github />} />
            <PageLink
              href={"https://www.instagram.com/thib_thib"}
              label={"Instagram"}
              logo={<Instagram />}
            />

            <PageLink href={"https://twitter.com/thib_thib"} label={"Twitter"} logo={<Twitter />} />
            <PageLink href={"https://thib.exposure.co"} label={"Exposure"} logo={<Exposure />} />
          </div>
        </div>
        <div
          css={(theme) => css`
            position: relative;
            display: inline-flex;
            flex-direction: column;
            width: 100vw;
            padding: ${theme.spacing.medium};

            @media (min-width: 660px) {
              width: 57vw;
              padding: 0 ${theme.spacing.medium} 0 ${theme.spacing.large};
            }
          `}
        >
          <h2
            css={(theme) => css`
              font-size: ${theme.fontSizes.XLarge};
              margin: ${theme.spacing.small} 0;
              padding-left: 0;

              @media (min-width: 660px) {
                margin: ${theme.spacing.large} 0 ${theme.spacing.small} ${theme.spacing.medium};
                padding-left: ${theme.spacing.small};
              }
            `}
          >
            projects
          </h2>
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
    </ThemeProvider>
  );
};

export default Page;
