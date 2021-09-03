import * as React from "react";

export const useInterval = (id: number, duration: number, isPaused: boolean, callback: () => void) => {
  const timeLeft = React.useRef(duration);
  const timeoutStart = React.useRef(Date.now());

  React.useEffect(() => {
    if (isPaused) {
      timeLeft.current = timeLeft.current - (Date.now() - timeoutStart.current);
    }
  }, [isPaused]);

  React.useEffect(() => {
    timeLeft.current = duration;
  }, [duration, id]);

  React.useEffect(() => {
    timeoutStart.current = Date.now();
    if (!isPaused) {
      const timeout = window.setTimeout(() => {
        callback();
        timeLeft.current = duration;
      }, timeLeft.current);
      return () => {
        window.clearTimeout(timeout);
      };
    }
  });
};
