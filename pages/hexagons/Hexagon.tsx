import * as React from 'react';
import { useCanvas, useAnimation } from './Canvas';

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
  initialRotation: number;
  rotationSpeed: number;
}

export const Hexagon: React.FunctionComponent<HexagonProps> = ({
  x,
  y,
  size,
  color,
  initialRotation,
  rotationSpeed,
}) => {
  const context = useCanvas();

  const animatedAngle = useAnimation(
    initialRotation,
    (angleValue: number) => angleValue + rotationSpeed
  );

  if (context !== null) {
    const edgeLength = size * 0.5;
    const width = edgeLength * Math.sqrt(3);
    const margin = (size - width) * 0.5;

    const hexagonPoints = [
      { x: edgeLength, y: 0 },
      { x: width + margin, y: edgeLength * 0.5 },
      { x: width + margin, y: edgeLength * 1.5 },
      { x: edgeLength, y: size },
      { x: margin, y: edgeLength * 1.5 },
      { x: margin, y: edgeLength * 0.5 },
    ];

    context.beginPath();
    hexagonPoints.forEach((point, index) => {
      const [rotatedX, rotatedY] = rotatePoint(
        x + point.x,
        y + point.y,
        x + size / 2,
        y + size / 2,
        animatedAngle
      );

      if (index === 0) {
        context.moveTo(rotatedX, rotatedY);
      } else {
        context.lineTo(rotatedX, rotatedY);
      }
    });
    context.globalCompositeOperation = 'soft-light';
    context.fillStyle = color;
    context.fill();
  }

  return null;
};
