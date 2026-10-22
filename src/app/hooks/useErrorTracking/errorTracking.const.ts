export const ERROR_TRACKING_FEATURES = {
  SAVE_ARTICLE_UAS: 'save-article-uas',
  FOLLOW_TOPIC_UAS: 'follow-topic-uas',
} as const;

export type ErrorTrackingFeature =
  (typeof ERROR_TRACKING_FEATURES)[keyof typeof ERROR_TRACKING_FEATURES];

export const UAS_ERROR_ACTIONS = {
  FETCH_STATUS: 'fetch-status',
  METADATA_SYNC: 'metadata-sync',
  FETCH_ACTIVITY: 'fetch-activity',
  RENDER: 'render',
} as const;

export type UasErrorAction =
  (typeof UAS_ERROR_ACTIONS)[keyof typeof UAS_ERROR_ACTIONS];
