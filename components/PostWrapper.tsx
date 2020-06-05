import * as React from 'react';
import { Global, css } from '@emotion/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Link } from './Link';
import { MenuLink } from './MenuLink';
import { h1 as H1 } from './Title';
import { Theme } from './Theme';

type MetaData = {
  title: string;
  description: string;
  date: string;
  image?: string;
};

export const PostWrapper: React.FunctionComponent<{ meta: MetaData }> = ({ meta, children }) => {
  const router = useRouter();
  const url = encodeURIComponent(`https://thibaut.io${router.pathname}`);
  return (
    <main>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta name="twitter:card" content={meta.image ? 'summary_large_image' : 'summary'} />
        <meta name="twitter:site" content="@thib_thib" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        {meta.image ? <meta name="twitter:image" content={meta.image} /> : null}
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
      </Head>
      <Global
        styles={(theme: Theme) => css`
          body {
            background-color: ${theme.background};
            color: ${theme.text};
            ${theme.sansSerifFont}
            margin: 0 auto;
            padding: calc(0.5rem + 3vh) calc(0.5rem + 4vw);
            word-break: break-word;
            max-width: ${theme.lineLength}ch;
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

          p {
            font-size: ${theme.fontSizes.medium};
            line-height: ${theme.spacing.medium};
            margin-top: 0;
            margin-bottom: ${theme.spacing.medium};
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
            css={(theme: Theme) => css`
              margin-top: 0;
              color: ${theme.secondaryText};
              font-size: ${theme.fontSizes.small};
              font-weight: 300;
            `}
          >
            {meta.date}
          </p>
        </H1>
      </header>
      <article
        css={(theme: Theme) => css`
          margin-bottom: ${theme.spacing.medium};
        `}
      >
        {children}
      </article>
      <footer
        css={(theme: Theme) => css`
          padding-top: ${theme.spacing.medium};
          border-top: 1px solid ${theme.border};
        `}
      >
        💬 <Link href={`https://mobile.twitter.com/search?q=${url}`}>Discuss on twitter</Link>
      </footer>
    </main>
  );
};
