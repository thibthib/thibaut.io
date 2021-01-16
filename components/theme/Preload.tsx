import * as React from "react";

export const ArchiaPreload: React.FunctionComponent = () => (
  <link rel="preload" href="archia-regular.woff2" as="font" type="font/woff2" crossOrigin="true" />
);

export const CartographPreload: React.FunctionComponent = () => (
  <link
    rel="preload"
    href="cartograph-regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="true"
  />
);
