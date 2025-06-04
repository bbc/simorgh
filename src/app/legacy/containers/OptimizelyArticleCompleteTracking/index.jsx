import React, { useState, useContext, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
// import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
// import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const experimentFlagKeys = ['dummy_experiment', 'dummy_experiment_1'];

const OptimizelyArticleCompleteTracking = () => {
  const ref = useRef();
  const observer = useRef();
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [pageCompleteSent, setPageCompleteSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sendPageCompleteEvent = !isAmp && !pageCompleteSent && isVisible;

  const initObserver = async () => {
    if (typeof window.IntersectionObserver === 'undefined') {
      // Polyfill IntersectionObserver, e.g. for IE11
      await import('intersection-observer');
    }
    observer.current = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting),
    );

    observer.current.observe(ref.current);
  };

  useEffect(() => {
    initObserver();
    return () => {
      observer.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (sendPageCompleteEvent) {
      optimizely?.onReady().then(() => {
        const decisions = optimizely.decideAll();
        const isUserInAnyExperiments = experimentFlagKeys.some(
          flagKey => !(decisions[flagKey].variationKey === 'off'),
        );

        if (isUserInAnyExperiments) {
          optimizely.track('article_completes');
        }

        setPageCompleteSent(true);
      });
    }
  }, [sendPageCompleteEvent, optimizely]);

  if (isAmp) return null;

  return <div ref={ref} aria-hidden="true" />;
};

export default OptimizelyArticleCompleteTracking;
