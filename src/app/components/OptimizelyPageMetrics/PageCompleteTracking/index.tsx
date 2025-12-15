import { useState, use, useEffect, useRef } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#app/contexts/RequestContext';

const PageCompleteTracking = () => {
  const ref = useRef(null);
  const observer = useRef(null);
  const { optimizely } = use(OptimizelyContext);
  const { pageType } = use(RequestContext);
  const [pageCompleteSent, setPageCompleteSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sendPageCompleteEvent = !pageCompleteSent && isVisible;

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
        optimizely.track(`${pageType}_completes`);
        setPageCompleteSent(true);
      });
    }
  }, [sendPageCompleteEvent, optimizely, pageType]);

  return <div ref={ref} aria-hidden="true" />;
};

export default PageCompleteTracking;
