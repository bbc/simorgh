import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';

const PageViewTracking = () => {
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  useEffect(() => {
    if (!pageViewSent) {
      optimizely?.onReady().then(() => {
        optimizely.track('page-views');
        setPageViewSent(true);
      });
    }
  }, [pageViewSent, optimizely]);

  return null;
};

export default PageViewTracking;
