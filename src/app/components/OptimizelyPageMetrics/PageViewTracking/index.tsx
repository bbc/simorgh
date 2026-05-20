import { useContext, useEffect, useState } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';

const PAGE_VIEW_EVENT_NAME = 'page-views';
const VISIT_EVENT_NAME = 'visit';

const VISIT_STORAGE_KEY = 'last_visit_ts';
// 30 minute inactivity window defines a new visit for this spike
// activity is defined as a page view, so the window rolls forward on each page view
const VISIT_TIMEOUT_MS = 30 * 60 * 1000;

// guard local storage access for privacy modes
const getStorage = (): Storage | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    return window.localStorage;
  } catch {
    return null;
  }
};

// parse a stored value into a usable timestamp
const parseTimestamp = (value: string | null) => {
  if (!value) {
    return null;
  }

  const timestamp = Number(value);
  return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : null;
};

// read the last recorded activity from storage
const readLastActivity = (storage: Storage | null) => {
  if (!storage) {
    return null;
  }

  try {
    return parseTimestamp(storage.getItem(VISIT_STORAGE_KEY));
  } catch {
    return null;
  }
};

// compute whether the current activity starts a new visit window
// this is based on the last recorded activity, not the first, so the window rolls forward
const getVisitTrackingState = (now: number) => {
  const storage = getStorage();
  const lastActivity = readLastActivity(storage);
  const isNewVisit =
    !lastActivity ||
    now < lastActivity ||
    now - lastActivity > VISIT_TIMEOUT_MS;

  return { storage, isNewVisit };
};

// update the stored activity so ongoing browsing stays in one visit
// this should be called on every page view to keep the visit alive
const recordVisitActivity = (storage: Storage | null, now: number) => {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(VISIT_STORAGE_KEY, String(now));
  } catch {
    // swallow storage errors to avoid breaking tracking
  }
};

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
      // always update activity so the 30 minute window rolls forward on each page view
      // this means a page view at minute 29 extends the same visit, while minute 31 starts a new visit
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
