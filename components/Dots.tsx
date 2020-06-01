import * as React from 'react';
import { useSprings, animated } from 'react-spring';
import random from 'lodash/random';
import clamp from 'lodash/clamp';
import { useTheme } from 'emotion-theming';

import { Theme } from 'components/Theme';

const stepDimension = 60;

export const Dots: React.FunctionComponent = () => {
  const theme = useTheme<Theme>();

  const dotColors = [
    theme.accent1,
    theme.accent1alt,
    theme.accent2,
    theme.accent2alt,
    theme.accent3,
    theme.accent3alt,
    theme.accent4,
    theme.accent4alt,
    theme.accent5,
    theme.accent6,
  ];

  if (typeof window === 'undefined') {
    return null;
  }

  const dots = React.useMemo(() => {
    const dots = [];

    for (let x = 0; x < window.innerWidth; x += stepDimension) {
      for (let y = 0; y < window.innerHeight; y += stepDimension) {
        dots.push({
          x: random(x - stepDimension * 0.5, x + stepDimension * 0.5),
          y: random(y - stepDimension * 0.5, y + stepDimension * 0.5),
          color: dotColors[random(0, dotColors.length)],
        });
      }
    }

    return dots;
  }, []);

  const getTransform = (mouseX?: number, mouseY?: number) => (index: number) => {
    let xShift = 0;
    let yShift = 0;

    if (mouseX)
      if (mouseX && mouseY) {
        const xDiff = mouseX - dots[index].x;
        const yDiff = mouseY - dots[index].y;

        const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
        const pullStrength = clamp(-0.004 * distance + 1, 0, 1);

        xShift = random(0, 20 * pullStrength);
        yShift = random(0, 20 * pullStrength);

        return {
          transform: `translate3d(${xShift}px, ${yShift}px, 0px) rotate(45deg)`,
          config: { tension: 170 * pullStrength, friction: 26 * pullStrength },
        };
      }

    return {
      transform: `translate3d(0px, 0px, 0px) rotate(45deg)`,
    };
  };

  const [springs, setSprings] = useSprings(dots.length, getTransform());

  React.useEffect(() => {
    const callback = (event: MouseEvent) => {
      setSprings(getTransform(event.clientX, event.clientY));
    };
    document.addEventListener('mousemove', callback);

    return () => {
      document.removeEventListener('mousemove', callback);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}>
      {springs.map(({ transform }, index) => {
        const dot = dots[index];
        return (
          <animated.div
            key={index}
            style={{
              transform,
              position: 'absolute',
              top: `${dot.y}px`,
              left: `${dot.x}px`,
              background: dot.color,
              height: `2px`,
              width: `2px`,
            }}
          ></animated.div>
        );
      })}
    </div>
  );
};
