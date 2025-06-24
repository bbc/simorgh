import { useEffect, useState, useContext } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import useOptimizelyVariation, { ExperimentState } from '#app/hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const getScrollDepth = () =>
  Math.floor(
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100,
  );

const useOptimizelyScrollDepth = () => {
  const { optimizely } = useContext(OptimizelyContext);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [scrollTwentyFive, setScrollTwentyFive] = useState(false);
  const [scrollFifty, setScrollFifty] = useState(false);
  const [scrollSeventyFive, setScrollSeventyFive] = useState(false);
  const [scrollHundred, setScrollHundred] = useState(false);

  const experimentVariation = useOptimizelyVariation({
    experimentName: OPTIMIZELY_CONFIG.flagKey,
    experimentType: ExperimentState.CLIENT_SIDE,
  });

  useEffect(() => {
    if (!experimentVariation) {
      return () => undefined;
    }

    if (scrollDepth >= 25 && !scrollTwentyFive) {
      optimizely?.track('scroll25');
      setScrollTwentyFive(true);
    }

    if (scrollDepth >= 50 && !scrollFifty) {
      optimizely?.track('scroll50');
      setScrollFifty(true);
    }

    if (scrollDepth >= 75 && !scrollSeventyFive) {
      optimizely?.track('scroll75');
      setScrollSeventyFive(true);
    }

    if (scrollDepth >= 100 && !scrollHundred) {
      optimizely?.track('scroll100');
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
    scrollDepth,
    scrollFifty,
    scrollHundred,
    scrollSeventyFive,
    scrollTwentyFive,
    experimentVariation,
  ]);

  return {
    setScrollDepth,
  };
};

export default useOptimizelyScrollDepth;
