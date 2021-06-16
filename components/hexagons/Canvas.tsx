import * as React from "react";
import { css } from "@emotion/react";
import random from "lodash/random";

const CanvasContext = React.createContext<CanvasRenderingContext2D | null>(null);
const FrameContext = React.createContext<number>(0);

interface CanvasProps {
  height: number;
  width: number;
  dpr: number;
  isAnimating?: boolean;
}

export const Canvas: React.FunctionComponent<CanvasProps> = ({
  height,
  width,
  dpr,
  isAnimating,
  children,
}) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const actualWidth = width * dpr;
  const actualHeight = height * dpr;

  // the canvas' context is stored once it's created
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  React.useEffect(() => {
    if (canvasRef.current !== null) {
      const canvasContext = canvasRef.current.getContext("2d");
      if (canvasContext !== null) {
        canvasContext.scale(dpr, dpr);
        canvasContext.globalCompositeOperation = "soft-light";
        setContext(canvasContext);
      }
    }
  }, [dpr]);

  // making the component and the context re-render at every frame
  const [frameCount, setFrameCount] = React.useState(0);
  React.useEffect(() => {
    let frameId: number;
    if (isAnimating) {
      frameId = requestAnimationFrame(() => {
        setFrameCount(frameCount + 1);
      });
    }
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [isAnimating, frameCount, setFrameCount]);

  // whenever the canvas' dimensions change, it's automatically cleared
  // we need to re-draw all its children in this case */
  React.useLayoutEffect(() => {
    setFrameCount(random(1, true));
  }, [width, height]);

  // we need to clear the whole canvas before drawing the children
  if (context !== null) {
    context.clearRect(0, 0, actualWidth, actualHeight);
  }

  const styles = React.useMemo(
    () => css`
      background-color: white;
      width: ${width}px;
      height: ${height}px;
    `,
    [width, height]
  );

  return (
    <CanvasContext.Provider value={context}>
      <FrameContext.Provider value={frameCount}>
        <canvas ref={canvasRef} height={actualHeight} width={actualWidth} css={styles} />
        {children}
      </FrameContext.Provider>
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  React.useContext(FrameContext);
  const renderingContext = React.useContext(CanvasContext);
  return renderingContext;
};

export const useAnimation = (initialValue: any, valueUpdater: (value: any) => any) => {
  const animatedValue = React.useRef(initialValue);
  animatedValue.current = valueUpdater(animatedValue.current);
  return animatedValue.current;
};
