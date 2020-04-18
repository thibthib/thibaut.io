import * as React from 'react';
import { css } from '@emotion/core';
import { Font, getSubsetFont } from './font';

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
  timeout: number;
};
type RequestIdleCallbackDeadline = {
  readonly didTimeout: boolean;
  timeRemaining: () => number;
};

declare global {
  interface Window {
    requestIdleCallback: (
      callback: (deadline: RequestIdleCallbackDeadline) => void,
      opts?: RequestIdleCallbackOptions
    ) => RequestIdleCallbackHandle;
    cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
  }
}

export const FontSize: React.FunctionComponent<{ font: Font; characters?: number[] }> = ({
  font,
  characters,
}) => {
  const [size, setSize] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (characters) {
      window.requestIdleCallback(() => {
        setSize(getSubsetFont(font, characters).byteLength);
      });
    } else {
      setSize(font.buffer.byteLength);
    }
  }, [font, characters]);

  if (size === null) {
    return null;
  }

  const units = ['Bytes', 'KB', 'MB', 'GB'];
  const unitIndex = Math.floor(Math.log(size) / Math.log(1000));

  return (
    <span
      css={theme => css`
        font-style: italic;
        color: ${theme.secondaryText};
      `}
    >
      {parseFloat((size / Math.pow(1000, unitIndex)).toFixed(1))}
      {units[unitIndex]}
    </span>
  );
};
