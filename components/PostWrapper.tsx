import * as React from 'react';
import { Global, css } from '@emotion/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Link } from './Link';
import { MenuLink } from './MenuLink';
import { h1 as H1 } from './Title';

type MetaData = {
  title: string;
  description: string;
  date: string;
};

export const PostWrapper: React.FunctionComponent<{ meta: MetaData }> = ({ meta, children }) => {
  const router = useRouter();
  const url = encodeURIComponent(`https://thibaut.io${router.pathname}`);
  return (
    <main>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="theme-color" content="#021c31" />
        <meta name="twitter:creator" content="@thib_thib" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
      </Head>
      <Global
        styles={theme => css`
          body {
            background-color: ${theme.background};
            color: ${theme.text};
            font-family: Cartograph, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
              'Oxygen-Sans', Ubuntu, Cantarell, 'Helvetica Neue';
            margin: 12vw auto;
            padding: 0 6vw;
            word-break: break-word;
            max-width: 66ch;
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
            font-size: 16px;
          }

          @media (min-width: 767px) {
            html {
              font-size: 20px;
            }
          }

          p {
            font-size: ${theme.fontSizes.medium};
            line-height: ${theme.spacing.medium};
            margin-top: 0;
            margin-bottom: ${theme.spacing.medium};
            font-weight: 300;
            font-feature-settings: 'ss05';
          }

          ul {
            margin-bottom: ${theme.spacing.medium};
          }
        `}
      />
      <MenuLink />
      <header>
        <H1>
          {meta.title}
          <p
            css={theme => css`
              margin-top: 0;
              font-style: italic;
              color: ${theme.secondaryText};
              font-size: ${theme.fontSizes.medium};
              font-weight: 300;
            `}
          >
            {meta.date}
          </p>
        </H1>
      </header>
      <article
        css={theme => css`
          margin-bottom: ${theme.spacing.medium};
        `}
      >
        {children}
      </article>
      <footer
        css={theme => css`
          padding-top: ${theme.spacing.medium};
          border-top: 1px solid ${theme.border};
        `}
      >
        💬 <Link href={`https://mobile.twitter.com/search?q=${url}`}>Discuss on twitter</Link>
      </footer>
    </main>
  );
};
