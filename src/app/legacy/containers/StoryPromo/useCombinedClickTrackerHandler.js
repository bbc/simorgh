import path from 'ramda/src/path';
import pathOr from 'ramda/src/pathOr';

import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

const DEFAULT_REVERB_MAX_WAIT = 900;

const waitForReverb = ms => new Promise(resolve => setTimeout(resolve, ms));

const useCombinedClickTrackerHandler = eventTrackingData => {
  const blockData = path(['block'], eventTrackingData);
  const linkData = path(['link'], eventTrackingData);
  const useReverb = pathOr(false, ['useReverb'], eventTrackingData);
  const optimizely = path(['block', 'optimizely'], eventTrackingData);
  const handleBlockLevelClick = useClickTrackerHandler({
    ...(blockData && {
      ...blockData,
      preventNavigation: true,
      useReverb,
    }),
  });
  const handleLinkLevelClick = useClickTrackerHandler({
    ...(linkData && {
      ...linkData,
      preventNavigation: true,
      useReverb,
    }),
  });

  return async event => {
    const nextPageUrl =
      path(['target', 'href'], event) || path(['url'], eventTrackingData);

    await Promise.all([
      handleBlockLevelClick(event),
      handleLinkLevelClick(event),
    ]).then(async () => {
      if (nextPageUrl) {
        await waitForReverb(DEFAULT_REVERB_MAX_WAIT);

        if (optimizely) optimizely.close();
        window.location.assign(nextPageUrl);
      }
    });
  };
};

export default useCombinedClickTrackerHandler;
