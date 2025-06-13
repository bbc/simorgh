import React, { useState, useContext, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyScrollDepth from '#hooks/useOptimizelyScrollDepth';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const OptimizelyPageMetrics = ({ pageView, pageDepth, pageComplete }) => {
  const ref = useRef();
  const observer = useRef();
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);
  const [pageCompleteSent, setPageCompleteSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const experimentVariation = useOptimizelyVariation(OPTIMIZELY_CONFIG.flagKey);
  const hasVariationKey = experimentVariation !== null;

  const sendPageCompleteEvent =
    pageComplete &&
    experimentVariation &&
    !isAmp &&
    !pageCompleteSent &&
    isVisible;

  const sendPageViewEvent =
    pageView && hasVariationKey && !isAmp && !pageViewSent;

  useOptimizelyScrollDepth(pageDepth);

  useEffect(() => {
    if (sendPageViewEvent) {
      optimizely?.onReady().then(() => {
        optimizely.track('page-views');
        setPageViewSent(true);
      });
    }
  }, [sendPageViewEvent, optimizely]);

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

  return sendPageCompleteEvent ? <div ref={ref} aria-hidden="true" /> : null;
};

export default OptimizelyPageMetrics;
