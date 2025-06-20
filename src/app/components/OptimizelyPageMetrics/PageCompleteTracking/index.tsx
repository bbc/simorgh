import React, { useState, useContext, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import useOptimizely from '#app/hooks/useOptimizely';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const PageCompleteTracking = () => {
  const ref = useRef(null);
  const observer = useRef(null);
  const { optimizely } = useContext(OptimizelyContext);
  const [pageCompleteSent, setPageCompleteSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const experimentVariation = useOptimizely({
    flagKey: OPTIMIZELY_CONFIG.flagKey,
  });

  const sendPageCompleteEvent =
    experimentVariation && !pageCompleteSent && isVisible;

  const initObserver = async () => {
    if (typeof window.IntersectionObserver === 'undefined') {
      // Polyfill IntersectionObserver, e.g. for IE11
      await import('intersection-observer');
    }
    // @ts-expect-error current element won't be null
    observer.current = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting),
    );
    // @ts-expect-error current element won't be null
    observer.current.observe(ref.current);
  };

  useEffect(() => {
    initObserver();
    return () => {
      // @ts-expect-error current element won't be null
      observer.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (sendPageCompleteEvent) {
      optimizely?.onReady().then(() => {
        optimizely.track('article_completes');
        setPageCompleteSent(true);
      });
    }
  }, [sendPageCompleteEvent, optimizely]);

  return <div ref={ref} aria-hidden="true" />;
};

export default PageCompleteTracking;
