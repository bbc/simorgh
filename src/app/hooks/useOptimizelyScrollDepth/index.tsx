import { useEffect, useState, use } from 'react';
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
  const [scrollTwentyFive, setScrollTwentyFive] = useState(false);
  const [scrollFifty, setScrollFifty] = useState(false);
  const [scrollSeventyFive, setScrollSeventyFive] = useState(false);
  const [scrollHundred, setScrollHundred] = useState(false);

  useEffect(() => {
    if (scrollDepth >= 25 && !scrollTwentyFive) {
      optimizely?.track('scroll25');
      (async () => setScrollTwentyFive(true))();
    }

    if (scrollDepth >= 50 && !scrollFifty) {
      optimizely?.track('scroll50');
      (async () => setScrollFifty(true))();
    }

    if (scrollDepth >= 75 && !scrollSeventyFive) {
      optimizely?.track('scroll75');
      (async () => setScrollSeventyFive(true))();
    }

    if (scrollDepth >= 100 && !scrollHundred) {
      optimizely?.track('scroll100');
      (async () => setScrollHundred(true))();
    }

    document.addEventListener('scroll', () => setScrollDepth(getScrollDepth), {
      passive: true,
    });
    return () =>
      document.removeEventListener('scroll', () =>
        setScrollDepth(getScrollDepth),
      );
  }, [
    optimizely,
    scrollDepth,
    scrollFifty,
    scrollHundred,
    scrollSeventyFive,
    scrollTwentyFive,
  ]);

  return {
    setScrollDepth,
  };
};

export default useOptimizelyScrollDepth;
