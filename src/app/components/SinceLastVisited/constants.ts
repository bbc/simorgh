export const STORAGE_KEY_PREFIX = 'bbc:simorgh:since-last-visited:v1';

export const getStorageKey = (service: string) =>
  `${STORAGE_KEY_PREFIX}:${service}`;

// The previous-visit value is frozen per tab so remounts and internal navigation cannot advance it
export const getSessionKey = (service: string) =>
  `${STORAGE_KEY_PREFIX}:session:${service}`;

export const MAX_LOOKBACK_DAYS = 14;
export const MAX_LOOKBACK_MS = MAX_LOOKBACK_DAYS * 24 * 60 * 60 * 1000;
export const CLOCK_SKEW_TOLERANCE_MS = 5 * 60 * 1000;

export const MAX_VISIBLE_ITEMS = 20;

export const COMPONENT_NAME = 'since-last-visited';
export const HEADING_ID = 'since-last-visited-heading';
