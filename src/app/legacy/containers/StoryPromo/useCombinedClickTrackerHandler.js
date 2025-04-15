import path from 'ramda/src/path';

import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { LITE_ATI_CLICK_TRACKING } from '#app/lib/analyticsUtils/analytics.const';

const useCombinedClickTrackerHandler = eventTrackingData => {
  const blockData = path(['block'], eventTrackingData);
  const optimizely = path(['block', 'optimizely'], eventTrackingData);

  const {
    onClick: handleBlockLevelClick,
    [LITE_ATI_CLICK_TRACKING]: staticTrackingInfo,
  } = useClickTrackerHandler({
    ...(blockData && {
      ...blockData,
      preventNavigation: true,
    }),
  });

  const combinedClickTacker = async event => {
    const nextPageUrl =
      path(['target', 'href'], event) || path(['url'], eventTrackingData);

    if (blockData && handleBlockLevelClick) {
      await handleBlockLevelClick(event);
    }
    if (nextPageUrl) {
      if (optimizely) optimizely.close();
      window.location.assign(nextPageUrl);
    }
  };

  return {
    onClick: combinedClickTacker,
    [LITE_ATI_CLICK_TRACKING]: staticTrackingInfo,
  };
};

export default useCombinedClickTrackerHandler;
