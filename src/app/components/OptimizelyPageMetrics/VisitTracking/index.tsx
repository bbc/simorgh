import { useEffect, useContext } from 'react';
import { OptimizelyContext } from '@optimizely/react-sdk';

const VISIT_STORAGE_KEY = 'last_visit_ts';
// 60 minute inactivity window defines a new visit for this spike
// activity is defined as a page view, so the window rolls forward on each page view
const VISIT_TIMEOUT_MS = 60 * 60 * 1000;
const VISIT_EVENT_NAME = 'visit';

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

// determine whether the current activity starts a new visit window
// this is based on the last recorded activity, not the first, so the window rolls forward
export const getVisitTrackingState = (now: number) => {
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
export const recordVisitActivity = (storage: Storage | null, now: number) => {
  if (!storage) {
    return;
  }

  try {
    storage.setItem(VISIT_STORAGE_KEY, String(now));
  } catch {
    // swallow storage errors to avoid breaking tracking
  }
};

const VisitTracking = () => {
  // get the useContext hook to get the optimizely client to send tracking events
  const { optimizely } = useContext(OptimizelyContext);

  useEffect(() => {
    // this component is used when we want visit counts without page views
    // if page views are tracked, visits are sent from PageViewTracking to avoid duplicates
    // current time in milliseconds since Jan 1st 1970
    const now = Date.now();
    const { storage, isNewVisit } = getVisitTrackingState(now);

    // updates the last activity timestamp in local storage to the current time
    recordVisitActivity(storage, now);

    if (!isNewVisit) {
      return;
    }

    // if the above condition is true, send a 'visit' event to optimizely
    optimizely?.onReady().then(() => {
      optimizely.track(VISIT_EVENT_NAME);
    });
    // this dependency array closes the effect and only re-runs when optimizely object changes
  }, [optimizely]);

  return null;
};

// the logic here is based on persistent storage in local storage, and the local time
// not on any values that would change during the component's lifecycle
export default VisitTracking;
