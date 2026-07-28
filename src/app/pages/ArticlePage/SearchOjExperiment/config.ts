export const SEARCH_OJ_EXPERIMENT_NAME = 'newswb_ws_oj_order_referrer_search';

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

export const isSearchOjVariant = (
  variation: string | null,
): variation is SearchOjVariant =>
  variation !== null &&
  SEARCH_OJ_VARIANTS.includes(variation as SearchOjVariant);

export const getSearchOjExperimentProps = (
  experimentVariant: SearchOjVariant,
) => ({
  experimentName: SEARCH_OJ_EXPERIMENT_NAME,
  experimentVariant,
  sendOptimizelyEvents: true,
});

export const MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID =
  'search-oj-experiment-trigger';
