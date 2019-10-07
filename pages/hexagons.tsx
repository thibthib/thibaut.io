import * as React from 'react';
import { Global, css } from '@emotion/core';
import random from 'lodash/random';
import { Canvas, useCanvas } from '../components/canvas/Canvas';

const baseHue = random(200, 300);
const hueVariance = 40;

const getRandomSize = (baseSize: number, factor = 1) =>
  random(baseSize * factor, baseSize * factor * 1.5);

const getPositionBetween = (min: number, max: number, variance: number) =>
  random(min - variance, max + variance);

const getPositionAround = (around: number, variance: number) =>
  getPositionBetween(around, around, variance);

const getColor = (baseHue: number, hueVariance: number) => {
  const hue = random(baseHue - hueVariance, baseHue + hueVariance);
  const saturation = random(30, 50);

  return `hsla(${hue}, ${saturation}%, ${random(30, 80)}%, ${random(0.2, 0.6)})`;
};

function rotatePoint(x: number, y: number, centerx: number, centery: number, degrees: number) {
  var newx =
    (x - centerx) * Math.cos((degrees * Math.PI) / 180) -
    (y - centery) * Math.sin((degrees * Math.PI) / 180) +
    centerx;
  var newy =
    (x - centerx) * Math.sin((degrees * Math.PI) / 180) +
    (y - centery) * Math.cos((degrees * Math.PI) / 180) +
    centery;
  return [newx, newy];
}

interface HexagonProps {
  x: number;
  y: number;
  size: number;
  color: string;
  angle: number;
  animationSpeed: number;
}

const Hexagon: React.FunctionComponent<HexagonProps> = ({
  x,
  y,
  size,
  color,
  angle,
  animationSpeed,
}) => {
  const context = useCanvas();

  const animatedAngle = React.useRef(angle);
  animatedAngle.current = animatedAngle.current + animationSpeed;

  if (context !== null) {
    const edgeLength = size * 0.5;
    const width = edgeLength * Math.sqrt(3);
    const margin = (size - width) * 0.5;

    const points = [
      { x: edgeLength, y: 0 },
      { x: width + margin, y: edgeLength * 0.5 },
      { x: width + margin, y: edgeLength * 1.5 },
      { x: edgeLength, y: size },
      { x: margin, y: edgeLength * 1.5 },
      { x: margin, y: edgeLength * 0.5 },
    ];

    context.beginPath();
    points.forEach((point, index) => {
      const [rotatedX, rotatedY] = rotatePoint(
        x + point.x,
        y + point.y,
        x + size / 2,
        y + size / 2,
        animatedAngle.current
      );

      if (index === 0) {
        context.moveTo(rotatedX, rotatedY);
      } else {
        context.lineTo(rotatedX, rotatedY);
      }
    });
    context.fillStyle = color;
    context.fill();
  }

  return null;
};

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
    const positionVariance = Math.round(0.1 * smallerSize);
    const horizontalSteps = 1 + Math.round(dimensions.width / smallerSize);
    const verticalSteps = 1 + Math.round(dimensions.height / smallerSize);

    const cornerHexagons = [];
    for (let i = 0; i < horizontalSteps; i++) {
      for (let j = 0; j < verticalSteps; j++) {
        const size = getRandomSize(biggerSize, 1.2);
        const x = i * dimensions.width - size * 0.5;
        const y = j * dimensions.height - size * 0.5;
        cornerHexagons.push({
          x: getPositionAround(x, positionVariance),
          y: getPositionAround(y, positionVariance),
          size,
          color: getColor(baseHue, hueVariance),
          rotation: random(0, 90),
          animationSpeed: random(0.05, 0.1),
        });
      }
    }

    const extraHexagons = [...Array(random(2, 6))].map(() => {
      const size = getRandomSize(smallerSize, 1.5);

      return {
        x: getPositionBetween(0 - size * 0.5, dimensions.width - size * 0.5, positionVariance),
        y: getPositionBetween(0 - size * 0.5, dimensions.height - size * 0.5, positionVariance),
        size,
        color: getColor(baseHue, hueVariance),
        rotation: random(0, 90),
        animationSpeed: random(0.05, 0.1),
      };
    });

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
          <Hexagon key={index} {...hexagon} angle={hexagon.rotation} />
        ))}
      </Canvas>
    </>
  );
};

export default Page;
