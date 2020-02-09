import * as React from 'react';
import { css } from '@emotion/core';
import { useDimensions } from '../use-dimensions';
import { Canvas } from './Canvas';
import { Hexagon } from './Hexagon';
import { getHexagonsToFillZone } from './random-helpers';

export const RandomHexagons: React.FunctionComponent<{ isAnimating?: boolean }> = ({
  isAnimating = false,
}) => {
  const [ref, { width, height, dpr }] = useDimensions<HTMLDivElement>();

  return (
    <div
      ref={ref}
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 4em;
      `}
    >
      {width === undefined || height === undefined || dpr === undefined ? (
        <div>{'🤔'}</div>
      ) : (
        <Canvas width={width} height={height} dpr={dpr} isAnimating={isAnimating}>
          {getHexagonsToFillZone({ height: height * dpr, width: width * dpr }).map(
            (hexagon, index) => (
              <Hexagon key={index} {...hexagon} />
            )
          )}
        </Canvas>
      )}
    </div>
  );
};
