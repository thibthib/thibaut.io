import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "components/theme/ThemeProvider";
import "components/theme/global.css";

if (process.env.NODE_ENV === "production") {
  import(/* webpackChunkName: "rum" */ "@datadog/browser-rum").then(({ datadogRum }) => {
    datadogRum.init({
      applicationId: "9a14efdd-aeb9-4f66-ba0a-232b42032043",
      clientToken: "puba9fe9045f841f0404364249bbd53f08e",
      datacenter: "us",
      sampleRate: 100,
    });
  });
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="icon" href="favicon.svg" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
