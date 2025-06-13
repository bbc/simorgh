import React, { useState, useContext, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const OptimizelyPageMetrics = ({ pageView, pageDepth, pageComplete }) => {
  // from articleComplete
  const ref = useRef();
  // from articleComplete
  const observer = useRef();
  // Both
  const { isAmp } = useContext(RequestContext);
  // Both
  const { optimizely } = useContext(OptimizelyContext);
  // from pageView
  const [pageViewSent, setPageViewSent] = useState(false);
  // from articleComplete
  const [pageCompleteSent, setPageCompleteSent] = useState(false);
  // from articleComplete
  const [isVisible, setIsVisible] = useState(false);

  // Both - for refactor
  const experimentVariation = useOptimizelyVariation(OPTIMIZELY_CONFIG.flagKey);
  // from articleComplete
  const hasVariationKey = experimentVariation !== null;

  // from articleComplete
  const sendPageCompleteEvent =
    pageComplete &&
    experimentVariation &&
    !isAmp &&
    !pageCompleteSent &&
    isVisible;

  // from pageView
  const sendPageViewEvent =
    pageView && hasVariationKey && !isAmp && !pageViewSent;

  // from pageView
  useOptimizelyScrollDepth(pageDepth);

  // from pageView
  useEffect(() => {
    if (sendPageViewEvent) {
      optimizely?.onReady().then(() => {
        optimizely.track('page-views');
        setPageViewSent(true);
      });
    }
  }, [sendPageViewEvent, optimizely]);

  // start articleComplete
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
        optimizely.track('article_completes');
        setPageCompleteSent(true);
      });
    }
  }, [sendPageCompleteEvent, optimizely]);

  if (isAmp) return null;
  // end articleComplete

  // combined
  return sendPageCompleteEvent ? <div ref={ref} aria-hidden="true" /> : null;
};

export default OptimizelyPageMetrics;
