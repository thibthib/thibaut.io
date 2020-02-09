import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

export function useDimensions<RefType extends HTMLElement>(): [
  (node: RefType) => void,
  { height?: number; width?: number; dpr?: number }
] {
  const [dimensions, setDimensions] = useState({});
  const [node, setNode] = useState<RefType>();
  const ref = useCallback(node => {
    setNode(node);
  }, []);

  useEffect(() => {
    if (node !== undefined) {
      let request: number;
      const measure = () => {
        request = window.requestAnimationFrame(() => {
          const rect = node.getBoundingClientRect();
          setDimensions({
            width: rect.width,
            height: rect.height,
            dpr: window.devicePixelRatio || 1,
          });
        });
      };
      measure();

      const resizeListener = debounce(measure, 100);
      window.addEventListener('resize', resizeListener);

      return () => {
        window.removeEventListener('resize', resizeListener);
        window.cancelAnimationFrame(request);
      };
    }
  }, [node]);

  return [ref, dimensions];
}
