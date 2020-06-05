import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { datadogRum } from "@datadog/browser-rum";
import { Global, css } from "@emotion/core";
import { MDXProvider } from "@mdx-js/react";
import { Emphasis } from "components/Emphasis";
import { Code, InlineCode, Pre } from "components/Code";
import { PostWrapper } from "components/PostWrapper";
import { Link } from "components/Link";
import { h1, h2, h3, h4, h5, h6 } from "components/Title";
import { ThemeProvider } from "components/Theme";

if (process.env.NODE_ENV === "production") {
  datadogRum.init({
    applicationId: "9a14efdd-aeb9-4f66-ba0a-232b42032043",
    clientToken: "puba9fe9045f841f0404364249bbd53f08e",
    datacenter: "us",
    sampleRate: 100,
  });
}

const components = {
  inlineCode: InlineCode,
  code: Code,
  pre: Pre,
  a: Link,
  wrapper: PostWrapper,
  em: Emphasis,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
};

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider>
      <Head>
        <link
          rel="preload"
          href="archia-regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="true"
        />
        <link rel="icon" href="favicon.svg" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <meta name="theme-color" content="#171623" />
      </Head>
      <Global
        styles={css`
          @font-face {
            font-family: Cartograph;
            src: url("cartograph-regular.woff2") format("woff2"),
              url("cartograph-regular.woff") format("woff");
            font-display: swap;
          }

          @font-face {
            font-family: Cartograph;
            src: url("cartograph-regular-italic.woff2") format("woff2"),
              url("cartograph-regular-italic.woff") format("woff");
            font-style: italic;
            font-display: swap;
          }

          @font-face {
            font-family: Archia;
            src: url("archia-regular.woff2") format("woff2"),
              url("archia-regular.woff") format("woff");
            font-display: swap;
          }
        `}
      />
      <MDXProvider components={components}>
        <Component {...pageProps} />
      </MDXProvider>
    </ThemeProvider>
  );
};

export default MyApp;
