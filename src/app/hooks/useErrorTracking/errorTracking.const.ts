export const ERROR_TRACKING_FEATURES = {
  UAS: 'uas',
} as const;

export type ErrorTrackingFeature =
  (typeof ERROR_TRACKING_FEATURES)[keyof typeof ERROR_TRACKING_FEATURES];

export const UAS_ERROR_ACTIONS = {
  FETCH_STATUS: 'fetch-status',
  METADATA_SYNC: 'metadata-sync',
  RECENT_ACTIVITY: 'recent-activity',
  RENDER: 'render',
} as const;

export type UasErrorAction =
  (typeof UAS_ERROR_ACTIONS)[keyof typeof UAS_ERROR_ACTIONS];
