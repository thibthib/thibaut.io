import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Global, css } from '@emotion/core';
import { InstagramLogo } from 'components/icons/Instagram';
import { GithubLogo } from 'components/icons/Github';
import { TwitterLogo } from 'components/icons/Twitter';
import { ExposureLogo } from 'components/icons/Exposure';
import { useTheme } from 'emotion-theming';
import { Theme } from 'components/Theme';
import { GradientText } from 'components/GradientText';
import { Dots } from 'components/Dots';

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
        display: flex;
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

export default () => {
  const { spacing, background, sansSerifFont, text, fontSizes } = useTheme<Theme>();

  const column = css`
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: 100vw;
    padding: ${spacing.medium};

    @media (min-width: 480px) {
      width: 50vw;
      padding: ${spacing.small};
    }
  `;

  return (
    <>
      <Head>
        <title>thibaut</title>
        <link rel="icon" type="image/png" href="favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={background} />
        <meta name="description" content="thibaut's personal website" />
      </Head>
      <Global
        styles={css`
          body {
            background-color: ${background};
            color: ${text};
            ${sansSerifFont}
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
          flex-direction: column;
          padding: calc(0.5rem + 10vh) calc(0.5rem + 4vw);

          @media (min-width: 480px) {
            flex-direction: row;
            margin-top: 0;
            height: 100vh;
          }
        `}
      >
        <div css={column}>
          <h1
            css={css`
              text-align: center;
              margin: 0 auto ${spacing.large};
              font-size: ${fontSizes.XXXLarge};
            `}
          >
            <GradientText>thibaut</GradientText>
          </h1>
          <div
            css={css`
              margin: 0 auto ${spacing.medium};
              display: inline-flex;
              flex-direction: column;
            `}
          >
            <PageLink href={'https://github.com/thibthib'} label={'GitHub'} logo={<GithubLogo />} />
            <PageLink
              href={'https://www.instagram.com/thib_thib'}
              label={'Instagram'}
              logo={<InstagramLogo />}
            />

            <PageLink
              href={'https://twitter.com/thib_thib'}
              label={'Twitter'}
              logo={<TwitterLogo />}
            />
            <PageLink
              href={'https://thib.exposure.co'}
              label={'Exposure'}
              logo={<ExposureLogo />}
            />
          </div>
        </div>
        <div css={column}>
          <h2
            css={css`
              font-size: ${fontSizes.XLarge};
              margin: 0 0 ${spacing.medium};
            `}
          >
            projects
          </h2>
          <Link href={'/duple'} passHref>
            <PageLink label={'Duple'} description={'Recto-verso photography'} logo={'📷'} />
          </Link>
          <Link href={'/react-refs-evolution'} passHref>
            <PageLink
              label={'Evolution of refs'}
              description={'With great power comes great responsability'}
              logo={'🦖'}
            />
          </Link>
          <Link href={'/react-canvas-components'} passHref>
            <PageLink
              label={'React + Canvas = 💜'}
              description={'An untold love story'}
              logo={'🖌'}
            />
          </Link>
        </div>
      </main>
    </>
  );
};
