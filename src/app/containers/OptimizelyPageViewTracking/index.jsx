import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#contexts/RequestContext';
import useMediaQuery from '#app/hooks/useMediaQuery';
import { GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/dist/breakpoints';

const OptimizelyPageViewTracking = () => {
  const { isAmp } = useContext(RequestContext);
  const { optimizely } = useContext(OptimizelyContext);
  const [mobile, setMobile] = useState(false);
  const [pageViewSent, setPageViewSent] = useState(false);

  useMediaQuery(`(max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`, event =>
    setMobile(event.matches),
  );

  const sendPageViewEvent = mobile && !isAmp && !pageViewSent;

  useEffect(() => {
    if (sendPageViewEvent) {
      optimizely.onReady().then(() => {
        optimizely.track('page_views');
        setPageViewSent(true);
      });
    }
  }, [sendPageViewEvent, optimizely]);

  return null;
};

export default OptimizelyPageViewTracking;
