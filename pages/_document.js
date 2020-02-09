import Document, { Main, NextScript, Head } from 'next/document';
import { Global, css } from '@emotion/core';
import dynamic from 'next/dynamic';

dynamic(
  () =>
    import('@datadog/browser-rum').then(({ datadogRum }) => {
      datadogRum.init({
        applicationId: '9a14efdd-aeb9-4f66-ba0a-232b42032043',
        clientToken: 'puba9fe9045f841f0404364249bbd53f08e',
        datacenter: 'us',
        sampleRate: 100,
      });
    }),
  {
    ssr: false,
  }
);

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
          <Global
            styles={css`
              @font-face {
                font-family: Cartograph;
                src: url('cartograph/CartographCF-Regular-latin.woff2') format('woff2'),
                  url('cartograph/CartographCF-Regular-latin.woff') format('woff');
                font-weight: 400;
                font-display: swap;
              }
            `}
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
