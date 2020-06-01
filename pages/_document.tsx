import Document, { Main, NextScript, Head } from 'next/document';
import { Global, css } from '@emotion/core';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="preload"
            href="archia-regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <Global
            styles={css`
              @font-face {
                font-family: Cartograph;
                src: url('cartograph-regular.woff2') format('woff2'),
                  url('cartograph-regular.woff') format('woff');
                font-display: swap;
              }

              @font-face {
                font-family: Cartograph;
                src: url('cartograph-regular-italic.woff2') format('woff2'),
                  url('cartograph-regular-italic.woff') format('woff');
                font-style: italic;
                font-display: swap;
              }

              @font-face {
                font-family: Archia;
                src: url('archia-regular.woff2') format('woff2'),
                  url('archia-regular.woff') format('woff');
                font-display: swap;
              }
            `}
          />
          <link rel="icon" href="favicon.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.png" type="image/png" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
