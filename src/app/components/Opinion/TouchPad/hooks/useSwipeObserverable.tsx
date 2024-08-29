import { useEffect, useRef } from 'react';
import { FunctionStack } from '..';

const useSwipeObservable = (observers: FunctionStack, swipeCount: number) => {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    observers.forEach(func => func());
  }, [swipeCount]);
};

export default useSwipeObservable;
