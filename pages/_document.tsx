import Document, { Main, NextScript, Head } from 'next/document';
import { Global, css } from '@emotion/core';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="preload"
            href="cartograph/CartographCF-Light-web.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="cartograph/CartographCF-LightItalic-web.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <Global
            styles={css`
              @font-face {
                font-family: Cartograph;
                src: url('cartograph/CartographCF-Regular-web.woff2') format('woff2'),
                  url('cartograph/CartographCF-Regular-web.woff') format('woff');
                font-weight: 400;
                font-display: swap;
              }

              @font-face {
                font-family: Cartograph;
                src: url('cartograph/CartographCF-RegularItalic-web.woff2') format('woff2'),
                  url('cartograph/CartographCF-RegularItalic-web.woff') format('woff');
                font-weight: 400;
                font-style: italic;
                font-display: swap;
              }

              @font-face {
                font-family: Cartograph;
                src: url('cartograph/CartographCF-LightItalic-web.woff2') format('woff2'),
                  url('cartograph/CartographCF-LightItalic-web.woff') format('woff');
                font-weight: 300;
                font-style: italic;
                font-display: swap;
                font-feature-settings: 'ss05';
              }

              @font-face {
                font-family: Cartograph;
                src: url('cartograph/CartographCF-Light-web.woff2') format('woff2'),
                  url('cartograph/CartographCF-Light-web.woff') format('woff');
                font-weight: 300;
                font-display: swap;
                font-feature-settings: 'ss05';
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
