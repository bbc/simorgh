import { useEffect, useState, useContext } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';

const getScrollDepth = () =>
  Math.floor(
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100,
  );

const useScrollDepth = () => {
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [scrollTwentyFive, setScrollTwentyFive] = useState(false);
  const [scrollFifty, setScrollFifty] = useState(false);
  const [scrollSeventyFive, setScrollSeventyFive] = useState(false);
  const [scrollHundred, setScrollHundred] = useState(false);

  const promoVariation = useOptimizelyVariation();
  const hasVariationKey = promoVariation !== null;

  const sendScrollEvents = hasVariationKey && !isAmp;

  useEffect(() => {
    if (!sendScrollEvents) {
      return null;
    }

    if (scrollDepth >= 25 && !scrollTwentyFive) {
      optimizely.track('scroll25');
      setScrollTwentyFive(true);
    }

    if (scrollDepth >= 50 && !scrollFifty) {
      optimizely.track('scroll50');
      setScrollFifty(true);
    }

    if (scrollDepth >= 75 && !scrollSeventyFive) {
      optimizely.track('scroll75');
      setScrollSeventyFive(true);
    }

    if (scrollDepth >= 100 && !scrollHundred) {
      optimizely.track('scroll100');
      setScrollHundred(true);
    }

    document.addEventListener('scroll', () => setScrollDepth(getScrollDepth), {
      passive: true,
    });
    return () =>
      document.removeEventListener(
        'scroll',
        () => setScrollDepth(getScrollDepth),
        {
          passive: true,
        },
      );
  }, [
    optimizely,
    scrollDepth,
    scrollFifty,
    scrollHundred,
    scrollSeventyFive,
    scrollTwentyFive,
    sendScrollEvents,
  ]);

  return {
    setScrollDepth,
  };
};

export default useScrollDepth;
