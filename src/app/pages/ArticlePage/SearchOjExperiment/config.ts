// this flag key must match optimizely
export const SEARCH_OJ_EXPERIMENT_NAME = 'newswb_ws_oj_order_referrer_search';

export const SEARCH_OJ_ACTIVATION_EVENT_NAME =
  'newswb_ws_oj_order_referrer_search';

// this temporary flag checks bucketing and tracking before the real experiment starts
// remove the aa setup after the production check is complete
export const SEARCH_OJ_AA_EXPERIMENT_NAME =
  'newswb_ws_oj_order_referrer_search_aa_test';

export const SEARCH_OJ_AA_ACTIVATION_EVENT_NAME =
  'newswb_ws_oj_order_referrer_search_aa_test';

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

// both groups use the normal page so their results can be compared like for like
export const SEARCH_OJ_AA_VARIANTS = ['control_a', 'control_b'] as const;

export type SearchOjAaVariant = (typeof SEARCH_OJ_AA_VARIANTS)[number];

// unknown values keep the existing control experience
export const isSearchOjVariant = (
  variation: string | null,
): variation is SearchOjVariant =>
  variation !== null &&
  SEARCH_OJ_VARIANTS.includes(variation as SearchOjVariant);

export const isSearchOjAaVariant = (
  variation: string | null,
): variation is SearchOjAaVariant =>
  variation !== null &&
  SEARCH_OJ_AA_VARIANTS.includes(variation as SearchOjAaVariant);

// this id is added to the real oj that triggers the experiment
export const MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID =
  'search-oj-experiment-trigger';
