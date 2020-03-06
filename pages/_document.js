import Document, { Main, NextScript, Head } from 'next/document';
import { Global, css } from '@emotion/core';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link
            rel="preload"
            href="cartograph/CartographCF-Regular-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="cartograph/CartographCF-Light-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <link
            rel="preload"
            href="cartograph/CartographCF-LightItalic-latin.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="true"
          />
          <Global
            styles={theme => css`
              @font-face {
                font-family: Cartograph;
                src: url('cartograph/CartographCF-Regular-latin.woff2') format('woff2'),
                  url('cartograph/CartographCF-Regular-latin.woff') format('woff');
                font-weight: 400;
                font-display: swap;
              }

              @font-face {
                font-family: Cartograph;
                src: url('cartograph/CartographCF-LightItalic-latin.woff2') format('woff2'),
                  url('cartograph/CartographCF-LightItalic-latin.woff') format('woff');
                font-weight: 300;
                font-style: italic;
                font-display: swap;
                font-feature-settings: 'ss05';
              }

              @font-face {
                font-family: Cartograph;
                src: url('cartograph/CartographCF-Light-latin.woff2') format('woff2'),
                  url('cartograph/CartographCF-Light-latin.woff') format('woff');
                font-weight: 300;
                font-display: swap;
                font-feature-settings: 'ss05';
              }
            `}
          />
          <link rel="icon" href="favicon.svg" type="image/svg+xml" />
          <link rel="alternate icon" href="/favicon.png" type="image/png" />
          <script src="https://www.datadoghq-browser-agent.com/datadog-rum-us.js"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.DD_RUM &&
              location.hostname !== 'localhost' &&
              window.DD_RUM.init({
                clientToken: 'puba9fe9045f841f0404364249bbd53f08e',
                applicationId: '9a14efdd-aeb9-4f66-ba0a-232b42032043',
              });`,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
