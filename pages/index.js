import Head from 'next/head';
import Link from 'next/link';
import { Global, css } from '@emotion/core';
import { InstagramLogo } from '../components/icons/Instagram';
import { GithubLogo } from '../components/icons/Github';
import { TwitterLogo } from '../components/icons/Twitter';
import { ExposureLogo } from '../components/icons/Exposure';

const PageLink = ({ href, label, description, logo }) => (
  <Link href={href} passHref>
    <a
      css={css`
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: ${description ? '2em' : '0.5em'};
        text-decoration: none;
      `}
    >
      <div
        css={css`
          font-size: 2em;
          margin-right: 0.6em;
          width: 1em;
          height: 1em;
          line-height: 1em;
          font-family: sans-serif;
        `}
      >
        {logo}
      </div>
      <div>
        <p
          css={css`
            display: block;
            color: white;
            font-size: 1.2em;
            line-height: 2em;
            text-decoration: underline;
            margin: 0;
          `}
        >
          {label}
        </p>
        {description ? (
          <p
            css={css`
              margin: 0 0 0.2em;
              color: white;
              font-style: italic;
              mix-blend-mode: difference;
            `}
          >
            {description}
          </p>
        ) : null}
      </div>
    </a>
  </Link>
);

export default () => (
  <>
    <Head>
      <title>thibaut</title>
      <link rel="icon" type="image/png" href="static/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#162BAA" />
      <meta name="description" content="thibaut's personal website" />
    </Head>
    <Global
      styles={css`
        body {
          margin: 0;
          background-color: hsl(231, 77%, 38%);
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        }

        * {
          box-sizing: border-box;
        }
      `}
    />
    <img
      src="static/background-900.jpg"
      srcSet="static/background-900.jpg 900w,
              static/background-1800.jpg 1800w,
              static/background-2700.jpg 2700w,
              static/background-3600.jpg 3600w"
      css={css`
        object-fit: cover;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
      `}
    />
    <div
      css={css`
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-top: 14vh;

        @media (min-width: 480px) {
          flex-direction: row;
          margin-top: 0;
          height: 100vh;
        }
      `}
    >
      <main
        css={css`
          position: relative;
          display: inline-flex;
          flex-direction: column;
          width: 100vw;
          padding: 2em 0;

          @media (min-width: 480px) {
            width: 50vw;
          }
        `}
      >
        <h1
          css={css`
            color: white;
            font-weight: normal;
            text-align: center;
            margin: 0 auto 1.5em;
            font-size: 3em;
          `}
        >
          thibaut
        </h1>
        <div
          css={css`
            margin: 0 auto;
            display: inline-flex;
            flex-direction: column;

            svg {
              mix-blend-mode: difference;
              fill: white;
            }
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
          <PageLink href={'https://thib.exposure.co'} label={'Exposure'} logo={<ExposureLogo />} />
        </div>
      </main>
      <div
        css={css`
          position: relative;
          padding: 2vh 8vw;
          display: inline-flex;
          flex-direction: column;
          width: 100vw;

          @media (min-width: 480px) {
            width: 50vw;
            padding: 2vh 2vw;
          }
        `}
      >
        <h2
          css={css`
            color: white;
            mix-blend-mode: difference;
            font-weight: normal;
            font-size: 1.5em;
            margin: 1.3em 0;
          `}
        >
          projects
        </h2>
        <PageLink
          href={'/duple'}
          label={'Duple'}
          description={'Recto-verso photography'}
          logo={'📷'}
        />
        <PageLink
          href={'/refs'}
          label={'Evolution of refs'}
          description={'With great power comes great responsability'}
          logo={'🎯'}
        />
      </div>
    </div>
  </>
);
