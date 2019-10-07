import * as React from 'react';

interface CanvasProps {
  height: number;
  width: number;
}

type drawCallback = (context: CanvasRenderingContext2D) => void;
type addCallback = (callback: drawCallback) => void;

interface CanvasContext {
  context: CanvasRenderingContext2D;
  frame: number;
}

const CanvasContext = React.createContext<CanvasContext | null>(null);

// const AnimationContext = React.createContext<() => void)>(() => {}));

export const Canvas: React.FunctionComponent<CanvasProps> = ({ height, width, children }) => {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(null);
  const [frameCount, setFrameCount] = React.useState(0);

  React.useEffect(() => {
    if (canvasRef.current !== null) {
      setContext(canvasRef.current.getContext('2d'));
    }
  }, [canvasRef]);

  React.useEffect(() => {
    let rafCallback: () => void;

    rafCallback = () => {
      setFrameCount(frameCount + 1);
    };
    requestAnimationFrame(rafCallback);

    return () => {
      rafCallback = () => {};
    };
  }, [frameCount, setFrameCount]);

  if (context !== null) {
    context.clearRect(0, 0, width, height);
  }

  const contextValue = context === null ? null : { context, frame: frameCount };

  return (
    <CanvasContext.Provider value={contextValue}>
      <canvas ref={canvasRef} height={height} width={width} />
      {children}
    </CanvasContext.Provider>
  );
};

export const useCanvas = () => {
  const contextValue = React.useContext(CanvasContext);
  return contextValue !== null ? contextValue.context : null;
};

export const useAnimation = () => {};
