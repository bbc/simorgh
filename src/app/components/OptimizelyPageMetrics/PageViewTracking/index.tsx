import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { experiments } from './experiments';

const PageViewTracking = () => {
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  const sendPageViewEvent = experiments && !pageViewSent;

  useEffect(() => {
    if (sendPageViewEvent) {
      optimizely?.onReady().then(() => {
        const decisions = optimizely.decideAll();
        const isUserInAnyExperiments = experiments.some(
          experimentName => !(decisions[experimentName].variationKey === 'off'),
        );

        if (isUserInAnyExperiments) {
          optimizely.track('page-views');
        }
        setPageViewSent(true);
      });
    }
  }, [sendPageViewEvent, optimizely]);

  return null;
};

export default PageViewTracking;
