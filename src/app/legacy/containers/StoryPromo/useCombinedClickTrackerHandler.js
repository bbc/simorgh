import path from 'ramda/src/path';

import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { LITE_ATI_CLICK_TRACKING } from '#app/lib/analyticsUtils/analytics.const';

const useCombinedClickTrackerHandler = eventTrackingData => {
  const blockData = path(['block'], eventTrackingData);
  const linkData = path(['link'], eventTrackingData);
  const optimizely = path(['block', 'optimizely'], eventTrackingData);
  const { onClick: handleBlockLevelClick } = useClickTrackerHandler({
    ...(blockData && {
      ...blockData,
      preventNavigation: true,
    }),
  });
  const {
    [LITE_ATI_CLICK_TRACKING]: staticTrackingInfo,
    onClick: handleLinkLevelClick,
  } = useClickTrackerHandler({
    ...(linkData && {
      ...linkData,
      preventNavigation: true,
    }),
  });

  const combinedClickTacker = async event => {
    const nextPageUrl =
      path(['target', 'href'], event) || path(['url'], eventTrackingData);

    if (blockData && handleBlockLevelClick) {
      await handleBlockLevelClick(event);
    }
    if (linkData && handleLinkLevelClick) {
      await handleLinkLevelClick(event);
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
