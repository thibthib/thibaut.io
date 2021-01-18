import * as React from "react";
import { useSprings, animated } from "react-spring";
import random from "lodash/random";
import clamp from "lodash/clamp";
import { useTheme } from "@emotion/react";

const stepDimension = 60;

const getDots = (colors: string[]) => {
  const dots = [];

  for (let x = 0; x < window.innerWidth; x += stepDimension) {
    for (let y = 0; y < window.innerHeight; y += stepDimension) {
      dots.push({
        x: random(x - stepDimension * 0.5, x + stepDimension * 0.5),
        y: random(y - stepDimension * 0.5, y + stepDimension * 0.5),
        color: colors[random(0, colors.length)],
      });
    }
  }

  return dots;
};

export const Dots: React.FunctionComponent = () => {
  const theme = useTheme();

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

  const [dots, setDots] = React.useState(getDots(dotColors));

  React.useEffect(() => {
    const onResize = () => {
      setDots(getDots(dotColors));
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const getTransform = (mouseX?: number, mouseY?: number) => (index: number) => {
    let xShift = 0;
    let yShift = 0;
    const dot = dots[index];

    if (mouseX && mouseY && dot) {
      const xDiff = mouseX - dot.x;
      const yDiff = mouseY - dot.y;

      const distance = Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
      const pullStrength = clamp(-0.004 * distance + 1, 0, 1);

      xShift = random(-15 * pullStrength, 15 * pullStrength);
      yShift = random(-15 * pullStrength, 15 * pullStrength);

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
    document.addEventListener("mousemove", callback);

    return () => {
      document.removeEventListener("mousemove", callback);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    >
      {springs.map(({ transform }, index) => {
        const dot = dots[index];
        return (
          <animated.div
            key={index}
            style={{
              transform,
              position: "absolute",
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
