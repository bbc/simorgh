import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
// Polyfill IntersectionObsesrver, e.g. for IE11
import 'intersection-observer';

import { sendEventBeacon } from '#containers/ATIAnalytics/beacon';

const VIEWED_DURATION_MS = 1000;

const useImpression = data => {
  const timeoutRef = useRef();
  const [viewSent, setViewSent] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView) {
      timeoutRef.current = setTimeout(() => {
        if (!viewSent) {
          setViewSent(true);
          sendEventBeacon(data);
        }
      }, VIEWED_DURATION_MS);
    } else {
      clearTimeout(timeoutRef.current);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [inView, viewSent, data]);

  return { trackRef: ref };
};

export default useImpression;
