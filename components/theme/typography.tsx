import * as React from "react";

const fontSizeRatio = 1.2;

export const fontSizes = {
  small: `${Math.pow(fontSizeRatio, -1)}rem`,
  medium: `1rem`,
  large: `${Math.pow(fontSizeRatio, 1)}rem`,
  XLarge: `${Math.pow(fontSizeRatio, 2)}rem`,
  XXLarge: `${Math.pow(fontSizeRatio, 3)}rem`,
  XXXLarge: `${Math.pow(fontSizeRatio, 6)}rem`,
};

export const ArchiaPreload: React.FunctionComponent = () => (
  <link
    rel="preload"
    href="/fonts/archia-regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
);

export const CartographPreload: React.FunctionComponent = () => (
  <link
    rel="preload"
    href="/fonts/cartograph-regular.woff2"
    as="font"
    type="font/woff2"
    crossOrigin="anonymous"
  />
);
