import { useEffect, useState, use } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#app/contexts/RequestContext';

const getScrollDepth = () =>
  Math.floor(
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100,
  );

const useOptimizelyScrollDepth = () => {
  const { optimizely } = use(OptimizelyContext);
  const { pageType } = use(RequestContext);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [scrollTwentyFive, setScrollTwentyFive] = useState(false);
  const [scrollFifty, setScrollFifty] = useState(false);
  const [scrollSeventyFive, setScrollSeventyFive] = useState(false);
  const [scrollHundred, setScrollHundred] = useState(false);

  useEffect(() => {
    if (scrollDepth >= 25 && !scrollTwentyFive) {
      optimizely?.track(`${pageType}_scroll25`);
      setScrollTwentyFive(true);
    }

    if (scrollDepth >= 50 && !scrollFifty) {
      optimizely?.track(`${pageType}_scroll50`);
      setScrollFifty(true);
    }

    if (scrollDepth >= 75 && !scrollSeventyFive) {
      optimizely?.track(`${pageType}_scroll75`);
      setScrollSeventyFive(true);
    }

    if (scrollDepth >= 100 && !scrollHundred) {
      optimizely?.track(`${pageType}_scroll100`);
      setScrollHundred(true);
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
    pageType,
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
