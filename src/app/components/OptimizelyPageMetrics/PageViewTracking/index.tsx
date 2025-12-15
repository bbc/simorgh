import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { RequestContext } from '#app/contexts/RequestContext';

const PageViewTracking = () => {
  const { optimizely } = useContext(OptimizelyContext);
  const { pageType } = useContext(RequestContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  useEffect(() => {
    if (!pageViewSent) {
      optimizely?.onReady().then(() => {
        optimizely.track(`${pageType}_page_views`);
        setPageViewSent(true);
      });
    }
  }, [pageViewSent, optimizely, pageType]);

  return null;
};

export default PageViewTracking;
