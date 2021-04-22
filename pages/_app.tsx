import React from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "components/theme/global.css";

const applicationId = process.env.NEXT_PUBLIC_DD_RUM_APPLICATION_ID;
const clientToken = process.env.NEXT_PUBLIC_DD_RUM_CLIENT_TOKEN;

if (
  process.env.NODE_ENV === "production" &&
  applicationId !== undefined &&
  clientToken !== undefined
) {
  import(/* webpackChunkName: "rum" */ "@datadog/browser-rum").then(({ datadogRum }) => {
    datadogRum.init({
      applicationId,
      clientToken,
      datacenter: "us",
      sampleRate: 100,
    });
  });
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        {/* <link rel="icon" href="favicon.svg" /> */}
        {/* <link rel="apple-touch-icon" href="apple-touch-icon.png" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
