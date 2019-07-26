import { Global, css } from '@emotion/core';
import Head from 'next/head';

export const PostWrapper = props => (
  <main>
    <Global
      styles={css`
        body {
          background-color: #021c31;
          color: #d6deeb;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Oxygen-Sans', Ubuntu,
            Cantarell, 'Helvetica Neue';
          margin: 12vw auto;
          padding: 0 6vw;
          font-size: 1.2em;
          max-width: 900px;
          line-height: 1.4;
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
    <h1
      css={css`
        margin-bottom: 0;
        line-height: 1.1;
      `}
    >
      {props.meta.title}
    </h1>
    <p
      css={css`
        margin-top: 0;
        font-style: italic;
        color: hsl(217, 34%, 78%);
        font-size: 0.9em;
      `}
    >
      {props.meta.date}
    </p>
    {props.children}
  </main>
);
