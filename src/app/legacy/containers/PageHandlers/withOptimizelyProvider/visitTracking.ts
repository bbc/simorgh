const VISIT_STORAGE_KEY = 'last_visit_ts';

// a new visit is counted after 30 minutes of inactivity, where activity is a tracked page view
const VISIT_TIMEOUT_MS = 30 * 60 * 1000;

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

const parseTimestamp = (value: string | null) => {
  if (!value) {
    return null;
  }

  const timestamp = Number(value);
  return Number.isFinite(timestamp) && timestamp > 0 ? timestamp : null;
};

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

const isNewVisit = (lastActivity: number | null, now: number) =>
  !lastActivity || now < lastActivity || now - lastActivity > VISIT_TIMEOUT_MS;

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

// determines whether the current page view starts a new visit and rolls the activity window forward
const registerVisitActivity = (now: number) => {
  const storage = getStorage();
  const lastActivity = readLastActivity(storage);
  const newVisit = isNewVisit(lastActivity, now);

  recordVisitActivity(storage, now);

  return newVisit;
};

export default registerVisitActivity;
