import random from 'lodash/random';
import isArray from 'lodash/isArray';

const getPositionBetween = (min: number, max: number, variance: number) =>
  random(min - variance, max + variance);

const hueVariance = 40;

const getRandomColor = (baseHue: number, hueVariance: number) => {
  const hue = random(baseHue - hueVariance, baseHue + hueVariance);
  const saturation = random(30, 50);

  return `hsla(${hue}, ${saturation}%, ${random(30, 80)}%, ${random(0.2, 0.6)})`;
};

interface hexagonInput {
  baseSize: number;
  baseHue: number;
  x: number | number[];
  y: number | number[];
}

export const getRandomHexagon = ({ baseSize, baseHue, x, y }: hexagonInput) => {
  const size = random(baseSize * 1.2, baseSize * 2);
  const positionVariance = Math.round(0.1 * baseSize);

  const [Xmin, Xmax] = isArray(x) ? x : [x, x];
  const [Ymin, Ymax] = isArray(y) ? y : [y, y];

  return {
    x: getPositionBetween(Xmin - size * 0.5, Xmax - size * 0.5, positionVariance),
    y: getPositionBetween(Ymin - size * 0.5, Ymax - size * 0.5, positionVariance),
    size,
    color: getRandomColor(baseHue, hueVariance),
    initialRotation: random(0, 90),
    rotationSpeed: random(-0.1, 0.1),
  };
};
