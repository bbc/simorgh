import path from 'ramda/src/path';
import { use } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';

import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { isNotModifiedLeftClick } from '#hooks/useClickTrackerHandler/clickTypes';
import { STATIC_ATI_CLICK_TRACKING } from '#app/lib/analyticsUtils/analytics.const';

const useCombinedClickTrackerHandler = eventTrackingData => {
  const blockData = path(['block'], eventTrackingData);
  const { optimizely } = use(OptimizelyContext);

  const {
    onClick: handleBlockLevelClick,
    [STATIC_ATI_CLICK_TRACKING]: staticTrackingInfo,
  } = useClickTrackerHandler({
    ...(blockData && {
      ...blockData,
      preventNavigation: true,
    }),
  });

  const combinedClickTacker = async event => {
    const link = event.currentTarget;
    if (
      !isNotModifiedLeftClick(event) ||
      (link?.target && link.target.toLowerCase() !== '_self') ||
      link?.hasAttribute?.('download')
    ) {
      return;
    }

    const nextPageUrl =
      path(['currentTarget', 'href'], event) ||
      path(['target', 'href'], event) ||
      path(['url'], eventTrackingData);

    if (blockData && handleBlockLevelClick) {
      await handleBlockLevelClick(event);
    }
    if (nextPageUrl) {
      try {
        await optimizely?.close();
      } finally {
        window.location.assign(nextPageUrl);
      }
    }
  };

  return {
    onClick: combinedClickTacker,
    [STATIC_ATI_CLICK_TRACKING]: staticTrackingInfo,
  };
};

export default useCombinedClickTrackerHandler;
