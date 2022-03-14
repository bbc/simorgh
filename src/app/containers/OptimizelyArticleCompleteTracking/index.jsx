import React, { useState, useContext, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useOptimizelyVariation from '#hooks/useOptimizelyVariation';
import OPTIMIZELY_CONFIG from '#lib/config/optimizely';

const OptimizelyArticleCompleteTracking = () => {
  const ref = useRef();
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [pageCompleteSent, setPageCompleteSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const variation = useOptimizelyVariation(OPTIMIZELY_CONFIG.featureId);

  const sendPageCompleteEvent =
    variation && !isAmp && !pageCompleteSent && isVisible;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting),
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (sendPageCompleteEvent) {
      optimizely.onReady().then(() => {
        optimizely.track('article_completes');
        setPageCompleteSent(true);
      });
    }
  }, [sendPageCompleteEvent, optimizely]);

  return <div ref={ref} aria-hidden="true" />;
};

export default OptimizelyArticleCompleteTracking;
