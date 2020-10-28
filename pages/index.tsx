import * as React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Global, css } from "@emotion/core";
import { InstagramLogo } from "components/icons/Instagram";
import { GithubLogo } from "components/icons/Github";
import { TwitterLogo } from "components/icons/Twitter";
import { ExposureLogo } from "components/icons/Exposure";
import { useTheme } from "emotion-theming";
import { Theme } from "components/Theme";
import { GradientText } from "components/GradientText";
import { ThemeProvider } from "components/Theme";

const Dots = dynamic<any>(
  () => import(/* webpackChunkName: "dots" */ "components/Dots").then(({ Dots }) => Dots),
  {
    ssr: false,
  }
);

const PageLink = React.forwardRef<
  HTMLAnchorElement,
  {
    href?: string;
    label: string;
    description?: string;
    logo: React.ReactNode;
  }
>(({ href, label, description, logo }: any, ref) => {
  const { spacing, fontSizes, text, secondaryText } = useTheme<Theme>();
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
          > * {
            fill: ${secondaryText};
          }
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
            css={css`
              margin-top: ${spacing.XSmall};
              font-size: ${fontSizes.medium};
              font-style: italic;
            `}
          >
            {description}
          </p>
        ) : null}
      </div>
    </a>
  );
});

const Page = () => {
  return (
    <ThemeProvider>
      <Head>
        <title>thibaut</title>
        <meta name="description" content="thibaut's personal website" />
      </Head>
      <Global
        styles={(theme: Theme) => css`
          body {
            background-color: ${theme.background};
            color: ${theme.text};
            ${theme.sansSerifFont}
            margin: 0 auto;
            word-break: break-word;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
          }

          p,
          pre,
          code,
          ul,
          ol {
            margin: 0;
          }

          html {
            font-size: 18px;
            font-size: clamp(18px, 1.4vw, 21px);
          }

          * {
            box-sizing: border-box;
          }
        `}
      />
      <Dots />
      <main
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 10vh 0;
          margin: 0 auto;

          @media (min-width: 660px) {
            flex-direction: row;
            margin-top: 0;
            height: 100vh;
            padding: 0;
          }
        `}
      >
        <div
          css={(theme: Theme) => css`
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
            css={(theme: Theme) => css`
              margin-bottom: ${theme.spacing.large};
              font-size: ${theme.fontSizes.XXXLarge};
              white-space: nowrap;
            `}
          >
            <GradientText>thibaut</GradientText>
          </h1>
          <div
            css={(theme: Theme) => css`
              margin-bottom: ${theme.spacing.medium};
              display: flex;
              flex-direction: column;
              align-items: flex-start;

              @media (min-width: 660px) {
                align-items: flex-end;
              }
            `}
          >
            <PageLink href={"https://github.com/thibthib"} label={"GitHub"} logo={<GithubLogo />} />
            <PageLink
              href={"https://www.instagram.com/thib_thib"}
              label={"Instagram"}
              logo={<InstagramLogo />}
            />

            <PageLink
              href={"https://twitter.com/thib_thib"}
              label={"Twitter"}
              logo={<TwitterLogo />}
            />
            <PageLink
              href={"https://thib.exposure.co"}
              label={"Exposure"}
              logo={<ExposureLogo />}
            />
          </div>
        </div>
        <div
          css={(theme: Theme) => css`
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
            css={(theme: Theme) => css`
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
