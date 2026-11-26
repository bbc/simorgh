import {
  CLOCK_SKEW_TOLERANCE_MS,
  MAX_LOOKBACK_MS,
  getSessionKey,
  getStorageKey,
} from './constants';

const NO_PREVIOUS_VISIT = 'none';

// Used when sessionStorage is unavailable so the previous value is still stable within the page lifetime
const memoryFallback = new Map<string, number | null>();

const getStorage = (type: 'localStorage' | 'sessionStorage') => {
  if (typeof window === 'undefined') return null;
  try {
    return window[type];
  } catch {
    return null;
  }
};

// Timestamps are stored as epoch milliseconds, matching the existing visit tracking convention
export const parseStoredTimestamp = (value: unknown, now: number) => {
  if (typeof value !== 'string' || value.trim() === '') return null;
  if (!/^\d+$/.test(value.trim())) return null;

  const timestamp = Number(value);
  if (!Number.isSafeInteger(timestamp) || timestamp <= 0) return null;
  if (timestamp > now + CLOCK_SKEW_TOLERANCE_MS) return null;

  // Modest future values are clamped so they never exceed "now"
  return Math.min(timestamp, now);
};

const readPrevious = (service: string, now: number) => {
  try {
    const raw = getStorage('localStorage')?.getItem(getStorageKey(service));
    return parseStoredTimestamp(raw, now);
  } catch {
    return null;
  }
};

const writeCurrent = (service: string, now: number) => {
  try {
    getStorage('localStorage')?.setItem(getStorageKey(service), String(now));
  } catch {
    // storage may be full or blocked; the feature degrades to rendering nothing
  }
};

const readFrozenPrevious = (service: string) => {
  const key = getSessionKey(service);
  try {
    const raw = getStorage('sessionStorage')?.getItem(key);
    if (raw === NO_PREVIOUS_VISIT) return { found: true, value: null };
    if (raw && /^\d+$/.test(raw)) return { found: true, value: Number(raw) };
  } catch {
    // fall through to memory
  }
  return memoryFallback.has(key)
    ? { found: true, value: memoryFallback.get(key) ?? null }
    : { found: false, value: null };
};

const freezePrevious = (service: string, value: number | null) => {
  const key = getSessionKey(service);
  memoryFallback.set(key, value);
  try {
    getStorage('sessionStorage')?.setItem(
      key,
      value === null ? NO_PREVIOUS_VISIT : String(value),
    );
  } catch {
    // memory fallback already holds the value
  }
};

/**
 * A "visit" is the first hydrated service page in the current tab.
 * The previous visit is read once, frozen for the tab, and only then is
 * localStorage advanced to the current time. Later calls in the same tab
 * (re-renders, StrictMode, internal navigation, reloads) return the frozen value.
 */
export const registerVisit = (service: string, now = Date.now()) => {
  const frozen = readFrozenPrevious(service);
  if (frozen.found) return frozen.value;

  const previous = readPrevious(service, now);
  freezePrevious(service, previous);
  writeCurrent(service, now);

  return previous;
};

export type CutoffResult =
  | { cutoff: number; wasCapped: false }
  | { cutoff: null; wasCapped: boolean };

/**
 * effectiveCutoff = max(previousVisit, now - 14 days).
 * When the last visit is older than the lookback window the "since you last
 * visited" label would imply coverage we cannot provide, so no cutoff is
 * returned and the component does not render.
 */
export const getEffectiveCutoff = (
  previousVisit: number | null,
  now = Date.now(),
): CutoffResult => {
  if (previousVisit === null) return { cutoff: null, wasCapped: false };

  const lookbackStart = now - MAX_LOOKBACK_MS;
  if (previousVisit < lookbackStart) return { cutoff: null, wasCapped: true };

  return { cutoff: previousVisit, wasCapped: false };
};

export const resetVisitStateForTests = () => memoryFallback.clear();

export const OVERRIDE_QUERY_PARAM = 'sinceLastVisited';

/**
 * Testing aid: ?sinceLastVisited=<ISO 8601 date or epoch ms> replaces the stored
 * previous visit (a bare date means the end of that UTC day) without reading or writing storage. Ignored on live.
 */
export const getOverridePreviousVisit = (
  search: string,
  appEnv: string | undefined,
  now = Date.now(),
) => {
  if (appEnv === 'live') return null;

  const raw = new URLSearchParams(search).get(OVERRIDE_QUERY_PARAM)?.trim();
  if (!raw) return null;

  const isDateOnly = /^\d{4}-\d{2}-\d{2}$/.test(raw);
  const parsed = /^\d+$/.test(raw) ? Number(raw) : Date.parse(raw);
  // A bare date means "visited that day", so only later days count as new
  const timestamp = isDateOnly ? parsed + 24 * 60 * 60 * 1000 : parsed;
  if (!Number.isSafeInteger(timestamp) || timestamp <= 0) return null;

  return Math.min(timestamp, now);
};
