import * as React from "react";
import Head from "next/head";

export const Favicon: React.FunctionComponent<{ emoji: string }> = ({ emoji }) => {
  const svg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`;
  return (
    <Head>
      <link rel="icon" href={`/emoji/${emoji}.png`} />
      <link rel="apple-touch-icon" href={`/emoji/${emoji}.png`} />
      <link rel="icon" href={svg} />
    </Head>
  );
};
