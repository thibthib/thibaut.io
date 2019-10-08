import * as React from 'react';
import { Global, css } from '@emotion/core';
import random from 'lodash/random';
import { Canvas } from './hexagons/Canvas';
import { Hexagon } from './hexagons/Hexagon';
import { getRandomHexagon } from './hexagons/random-helpers';

const baseHue = random(200, 300);

const Page: React.FunctionComponent = () => {
  const [dimensions, setDimensions] = React.useState({ height: 0, width: 0 });
  React.useEffect(() => {
    if (typeof window !== undefined) {
      setDimensions({ height: window.innerHeight, width: window.innerWidth });
    }
  }, []);

  const hexagons = React.useMemo(() => {
    const smallerSize = Math.min(dimensions.width, dimensions.height);

    /* putting big hexagons in the screen corners */
    /* so that we have the whole screen covered */
    const cornerHexagons = [];
    for (let i = 0; i <= Math.round(dimensions.width / smallerSize); i++) {
      for (let j = 0; j <= Math.round(dimensions.height / smallerSize); j++) {
        cornerHexagons.push(
          getRandomHexagon({
            baseSize: Math.max(dimensions.width, dimensions.height),
            x: i * dimensions.width,
            y: j * dimensions.height,
            baseHue,
          })
        );
      }
    }

    /* Then adding some more hexagons randomly on the screen */
    const extraHexagons = [...Array(random(2, 6))].map(() =>
      getRandomHexagon({
        baseSize: smallerSize,
        x: [0, dimensions.width],
        y: [0, dimensions.height],
        baseHue,
      })
    );

    return [...cornerHexagons, ...extraHexagons];
  }, [dimensions]);

  return (
    <>
      <Global
        styles={css`
          body {
            margin: 0;
          }
        `}
      />
      <Canvas width={dimensions.width} height={dimensions.height}>
        {hexagons.map((hexagon, index) => (
          <Hexagon key={index} {...hexagon} />
        ))}
      </Canvas>
    </>
  );
};

export default Page;
