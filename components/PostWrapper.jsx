import { Global, css } from '@emotion/core';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Link } from './Link';
import { MenuLink } from './MenuLink';

export const PostWrapper = props => {
  const router = useRouter();
  const url = encodeURIComponent(`https://thibaut.io${router.asPath}`);
  return (
    <main>
      <Global
        styles={theme => css`
          body {
            background-color: ${theme.background};
            color: ${theme.text};
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen-Sans',
              Ubuntu, Cantarell, 'Helvetica Neue';
            margin: 12vw auto;
            padding: 0 6vw;
            font-size: 1.2em;
            word-break: break-word;
            max-width: 70ch;
            line-height: 1.4;
          }
          h1 {
            font-size: 1.9em;
          }
          h2 {
            margin-top: 1.2em;
            line-height: 1.1;
          }
        `}
      />
      <Head>
        <title>{props.meta.title}</title>
        <meta name="description" content={props.meta.description} />
        <meta name="theme-color" content="#021c31" />
        <meta name="twitter:creator" content="@thib_thib" />
        <meta name="twitter:title" content={props.meta.title} />
        <meta name="twitter:description" content={props.meta.description} />
        <meta property="og:title" content={props.meta.title} />
        <meta property="og:description" content={props.meta.description} />
      </Head>
      <MenuLink />
      <header>
        <h1
          css={css`
            margin-bottom: 0;
            line-height: 1.1;
          `}
        >
          {props.meta.title}
        </h1>
        <p
          css={theme => css`
            margin-top: 0;
            font-style: italic;
            color: ${theme.secondaryText};
            font-size: 0.9em;
          `}
        >
          {props.meta.date}
        </p>
      </header>
      <article
        css={css`
          margin-bottom: 2em;
        `}
      >
        {props.children}
      </article>
      <footer
        css={theme => css`
          padding-top: 2em;
          border-top: 1px solid ${theme.border};
        `}
      >
        <Link href={`https://mobile.twitter.com/search?q=${url}`}>💬 Discuss on twitter</Link>
      </footer>
    </main>
  );
};
