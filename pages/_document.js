import Document, { Main, NextScript, Head } from 'next/document';
import { Global, css } from '@emotion/core';

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          {/* Global Site Tag (gtag.js) - Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-144579302-1"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'UA-144579302-1');
          `,
            }}
          />
          <link
            rel="preload"
            href="/static/cartograph/CartographCF-Regular.woff2"
            as="font"
            type="font/woff2"
            crossorigin
          />
          <Global
            styles={css`
              @font-face {
                font-family: Cartograph;
                src: url('/static/cartograph/CartographCF-Regular.woff2') format('woff2'),
                  url('/static/cartograph/CartographCF-Regular.woff') format('woff');
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
