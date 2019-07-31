import Head from 'next/head';
import Link from 'next/link';
import { Global, css } from '@emotion/core';
import { InstagramLogo } from '../components/icons/Instagram';
import { GithubLogo } from '../components/icons/Github';
import { TwitterLogo } from '../components/icons/Twitter';
import { EmailLogo } from '../components/icons/Email';

const mainCss = css`
  position: absolute;
  top: 42%;
  left: 50%;
  width: 80%;
  transform: translate(-50%, -50%);
  mix-blend-mode: hard-light;
  text-align: center;

  @media (min-width: 480px) {
    width: 40%;
  }
`;

const imageCss = css`
  object-fit: cover;
  height: 91vh;
  width: 100vw;
`;

const nameCss = css`
  color: #04d0bb;
  font-size: 4em;
  line-height: 1;

  @media (min-width: 320px) {
    font-size: 3em;
  }
`;

const LogoLink = ({ link, label, logo }) => (
  <a
    href={link}
    aria-label={label}
    css={css`
      flex: 1;
      text-align: center;

      & > svg {
        fill: #04d0bb;
        width: 36px;
        height: 36px;
      }
    `}
  >
    {logo}
  </a>
);

const PageLink = ({ page, label }) => (
  <Link href={page}>
    <a
      css={css`
        text-align: center;
        color: white;
        font-size: 1.2em;
        line-height: 2em;
        text-decoration: underline;
        cursor: pointer;
      `}
    >
      {label}
    </a>
  </Link>
);

export default () => (
  <>
    <Head>
      <title>thibaut dutartre</title>
      <link rel="icon" type="image/png" href="static/favicon.png" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#04d0bb" />
      <meta name="Description" content="Thibaut Dutartre's personal website" />
    </Head>
    <Global
      styles={css`
        body {
          margin: 0;
          background: hsl(174, 96%, 18%);
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
        }
      `}
    />
    <picture>
      <source
        media="(max-width: 480px)"
        srcSet="static/background-mobile.webp"
        type="image/webp"
        css={imageCss}
      />
      <source
        media="(max-width: 480px)"
        srcSet="static/background-mobile.jpg"
        type="image/jpeg"
        css={imageCss}
      />
      <source
        media="(min-width: 480px)"
        srcSet="static/background.webp"
        type="image/webp"
        css={imageCss}
      />
      <source
        media="(min-width: 480px)"
        srcSet="static/background.jpg"
        type="image/jpeg"
        css={imageCss}
      />
      <img
        src="static/background.jpg"
        alt="New yorkers staring at their phone screen"
        css={imageCss}
      />
    </picture>
    <main css={mainCss}>
      <div css={nameCss}>thibaut</div>
      <div css={nameCss}>dutartre</div>
      <div
        css={css`
          margin: 48px auto;
          display: flex;
          max-width: 400px;
        `}
      >
        <LogoLink
          link={'https://www.instagram.com/thib_thib'}
          label={'Instagram logo'}
          logo={<InstagramLogo />}
        />
        <LogoLink
          link={'https://github.com/thibthib'}
          label={'Github logo'}
          logo={<GithubLogo />}
        />
        <LogoLink
          link={'https://twitter.com/thib_thib'}
          label={'Twitter logo'}
          logo={<TwitterLogo />}
        />
        <LogoLink link={'mailto:t.dutartre@gmail.com'} label={'Email logo'} logo={<EmailLogo />} />
      </div>
    </main>
    <div
      css={css`
        position: relative;
        padding: 2vh 8vw;
        display: flex;
        flex-direction: column;
      `}
    >
      <PageLink page={'/duple'} label={'Duple'} />
      <PageLink page={'/refs'} label={'Evolution of refs'} />
    </div>
  </>
);
