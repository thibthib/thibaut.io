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
    const biggerSize = Math.max(dimensions.width, dimensions.height);
    const horizontalSteps = 1 + Math.round(dimensions.width / smallerSize);
    const verticalSteps = 1 + Math.round(dimensions.height / smallerSize);

    const cornerHexagons = [];
    for (let i = 0; i < horizontalSteps; i++) {
      for (let j = 0; j < verticalSteps; j++) {
        cornerHexagons.push(
          getRandomHexagon({
            baseSize: biggerSize,
            x: [i * dimensions.width, i * dimensions.width],
            y: [j * dimensions.height, j * dimensions.height],
            baseHue,
          })
        );
      }
    }

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
