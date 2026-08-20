// this flag key must match optimizely
export const SEARCH_OJ_EXPERIMENT_NAME = 'newswb_ws_oj_order_referrer_search';

export const SEARCH_OJ_ACTIVATION_EVENT_NAME =
  'newswb_ws_oj_order_referrer_search';

// these values must match the variation keys in optimizely
export const SEARCH_OJ_VARIANTS = [
  'control',
  'variant_1_related',
  'variant_2_recommended',
  'variant_3_hybrid',
  'variant_4_related_mid',
  'variant_5_recommended_mid',
  'variant_6_hybrid_mid',
] as const;

export type SearchOjVariant = (typeof SEARCH_OJ_VARIANTS)[number];

// unknown values keep the existing control experience
export const isSearchOjVariant = (
  variation: string | null,
): variation is SearchOjVariant =>
  variation !== null &&
  SEARCH_OJ_VARIANTS.includes(variation as SearchOjVariant);

// this id is added to the real oj that triggers the experiment
export const MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID =
  'search-oj-experiment-trigger';
