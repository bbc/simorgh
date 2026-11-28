import { useEffect, useRef, useState, use } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';

const getScrollDepth = () =>
  Math.floor(
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100,
  );

const useOptimizelyScrollDepth = () => {
  const { optimizely } = use(OptimizelyContext);
  const [scrollDepth, setScrollDepth] = useState(0);
  const trackedThresholds = useRef(new Set<number>());

  useEffect(() => {
    const handleScroll = () => setScrollDepth(getScrollDepth);

    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => document.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!optimizely) return;

    [25, 50, 75, 100].forEach(threshold => {
      if (
        scrollDepth >= threshold &&
        !trackedThresholds.current.has(threshold)
      ) {
        optimizely.track(`scroll${threshold}`);
        trackedThresholds.current.add(threshold);
      }
    });
  }, [optimizely, scrollDepth]);

  return {
    setScrollDepth,
  };
};

export default useOptimizelyScrollDepth;
