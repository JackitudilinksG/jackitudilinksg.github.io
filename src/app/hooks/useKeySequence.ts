import { useEffect, useRef } from 'react';

export const useKeySequence = (targetSequence: string[], callback: () => void) => {
  const keyBuffer = useRef<string[]>([]);
  const callbackRef = useRef(callback);

  // keep a ref to the latest callback so the event listener doesn't need re-attaching
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    // normalize target to lowercase characters for robust matching
    const normalizedTarget = targetSequence.map(k => k.toLowerCase()).join(',');

    console.log('useKeySequence effect mount, target:', normalizedTarget);

    const handleKeyDown = (e: KeyboardEvent) => {

      // prefer a lowercase character for single-character keys
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      keyBuffer.current.push(key);

      if (keyBuffer.current.length > targetSequence.length) {
        keyBuffer.current.shift();
      }

      if (keyBuffer.current.join(',') === normalizedTarget) {
        callbackRef.current();
        keyBuffer.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [targetSequence.join(',')]);
};