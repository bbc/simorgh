import { useState, useContext, useEffect } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';
import { getVisitTrackingState, recordVisitActivity } from '../VisitTracking';

const PAGE_VIEW_EVENT_NAME = 'page-views';
const VISIT_EVENT_NAME = 'visit';

// optional flag to control visit tracking alongside page views
type Props = {
  trackVisit?: boolean;
};

const PageViewTracking = ({ trackVisit = false }: Props) => {
  const { optimizely } = useContext(OptimizelyContext);
  const [pageViewSent, setPageViewSent] = useState(false);

  useEffect(() => {
    if (pageViewSent) {
      return;
    }

    // capture the current time so we can evaluate visit boundaries
    // "activity" in this spike is a new page view, not clicks or scrolls
    const now = Date.now();
    const visitState = trackVisit ? getVisitTrackingState(now) : null;

    if (trackVisit) {
      // always update activity so the 60 minute window rolls forward on each page view
      // this means a page view at minute 59 extends the same visit, while minute 61 starts a new visit
      recordVisitActivity(visitState?.storage ?? null, now);
    }

    optimizely?.onReady().then(() => {
      if (trackVisit && visitState?.isNewVisit) {
        // send the visit before the page view so the ratio window is open
        // this keeps the page view inside the visit denominator window in optimizely
        optimizely.track(VISIT_EVENT_NAME);
      }
      optimizely.track(PAGE_VIEW_EVENT_NAME);
      setPageViewSent(true);
    });
  }, [pageViewSent, optimizely, trackVisit]);

  return null;
};

export default PageViewTracking;
