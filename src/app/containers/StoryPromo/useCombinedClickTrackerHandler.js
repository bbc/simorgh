import path from 'ramda/src/path';

import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

const useCombinedClickTrackerHandler = eventTrackingData => {
  const blockLevelEventTrackingData = path(['block'], eventTrackingData);
  const linkLevelEventTrackingData = path(['link'], eventTrackingData);
  const handleBlockLevelClick = useClickTrackerHandler({
    ...blockLevelEventTrackingData,
    ...(blockLevelEventTrackingData && { preventNavigation: true }),
  });
  const handleLinkLevelClick = useClickTrackerHandler({
    ...linkLevelEventTrackingData,
    ...(linkLevelEventTrackingData && { preventNavigation: true }),
  });

  return async event => {
    const nextPageUrl =
      path(['href'], eventTrackingData) || path(['target', 'href'], event);

    if (blockLevelEventTrackingData) {
      await handleBlockLevelClick(event);
    }
    if (linkLevelEventTrackingData) {
      await handleLinkLevelClick(event);
    }
    if (nextPageUrl) {
      window.location.assign(nextPageUrl);
    }
  };
};

export default useCombinedClickTrackerHandler;
