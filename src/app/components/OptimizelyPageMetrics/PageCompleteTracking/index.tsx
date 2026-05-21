import { use, useEffect, useRef, useState } from 'react';

import { OptimizelyContext } from '@optimizely/react-sdk';

const PageCompleteTracking = () => {
  const ref = useRef(null);
  const observer = useRef(null);
  const { optimizely } = use(OptimizelyContext);
  const [pageCompleteSent, setPageCompleteSent] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const sendPageCompleteEvent = !pageCompleteSent && isVisible;

  const initObserver = async () => {
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
