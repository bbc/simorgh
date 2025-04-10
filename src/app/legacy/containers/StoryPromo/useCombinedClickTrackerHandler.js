import path from 'ramda/src/path';

import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

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
  const { onClick: handleLinkLevelClick } = useClickTrackerHandler({
    ...(linkData && {
      ...linkData,
      preventNavigation: true,
    }),
  });

  return async event => {
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
};

export default useCombinedClickTrackerHandler;
