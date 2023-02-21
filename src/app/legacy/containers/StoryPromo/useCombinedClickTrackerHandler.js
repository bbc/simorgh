import path from 'ramda/src/path';

import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

const useCombinedClickTrackerHandler = eventTrackingData => {
  const blockData = path(['block'], eventTrackingData);
  const linkData = path(['link'], eventTrackingData);
  const optimizely = path(['block', 'optimizely'], eventTrackingData);
  const handleBlockLevelClick = useClickTrackerHandler({
    ...(blockData && {
      ...blockData,
      preventNavigation: true,
    }),
  });
  const handleLinkLevelClick = useClickTrackerHandler({
    ...(linkData && {
      ...linkData,
      preventNavigation: true,
    }),
  });

  return async event => {
    const nextPageUrl =
      path(['target', 'href'], event) || path(['url'], eventTrackingData);

    if (blockData) {
      await handleBlockLevelClick(event);
    }
    if (linkData) {
      await handleLinkLevelClick(event);
    }
    if (nextPageUrl) {
      if (optimizely) optimizely.close();
      window.location.assign(nextPageUrl);
    }
  };
};

export default useCombinedClickTrackerHandler;
