import debounce from 'lodash/debounce';
import { useEffect, useRef, useMemo } from 'react';

// With help from: https://www.developerway.com/posts/debouncing-in-react
export const useDebounce = (callback: () => void) => {
  const ref = useRef<(() => void) | null>(null);

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debounceFn = useMemo(() => {
    const fn = () => {
      ref.current?.();
    };

    return debounce(fn, 500);
  }, []);

  return debounceFn;
};
