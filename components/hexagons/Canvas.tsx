import * as React from 'react';
import { css } from '@emotion/core';

interface CanvasContext {
  renderingContext: CanvasRenderingContext2D | null;
  frame: number;
}
const CanvasContext = React.createContext<CanvasContext>({
  renderingContext: null,
  frame: 0,
});

interface CanvasProps {
  height: number;
  width: number;
}

/* This canvas component will re-render at every frame, i.e. ~16ms */
export const Canvas: React.FunctionComponent<CanvasProps> = ({ height, width, children }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  /* the canvas' context is stored once it's created */
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  React.useEffect(() => {
    if (canvasRef.current !== null) {
      setContext(canvasRef.current.getContext('2d'));
    }
  }, []);

  /* making the component and the context re-render at every frame */
  const [frameCount, setFrameCount] = React.useState(0);
  React.useEffect(() => {
    let cancelLoop = false;
    let rafCallback = () => {
      if (!cancelLoop) {
        setFrameCount(frameCount + 1);
      }
    };
    requestAnimationFrame(rafCallback);

    return () => {
      cancelLoop = true;
    };
  }, [frameCount, setFrameCount]);

  /* we need to clear the whole canvas before drawing the children */
  if (context !== null) {
    context.clearRect(0, 0, width, height);
  }

  return (
    <CanvasContext.Provider value={{ renderingContext: context, frame: frameCount }}>
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        css={css`
          background-color: white;
        `}
      />
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const { renderingContext } = React.useContext(CanvasContext);
  return renderingContext;
};

export const useAnimation = (initialValue: any, valueUpdater: (value: any) => any) => {
  const animatedAngle = React.useRef(initialValue);
  animatedAngle.current = valueUpdater(animatedAngle.current);
  return animatedAngle.current;
};
