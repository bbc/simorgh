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

export const getSearchOjVariant = (
  variation: string | null,
): SearchOjVariant =>
  SEARCH_OJ_VARIANTS.includes(variation as SearchOjVariant)
    ? (variation as SearchOjVariant)
    : 'control';

export const getSearchOjExperimentProps = (
  experimentVariant: SearchOjVariant,
) => ({
  experimentName: SEARCH_OJ_EXPERIMENT_NAME,
  experimentVariant,
  sendOptimizelyEvents: true,
});

export type OjModuleKey =
  | 'topicDiscovery'
  | 'portraitVideo'
  | 'relatedContent'
  | 'topStories'
  | 'featuredArticles'
  | 'mostRead'
  | 'locationBasedOj';

export type SearchOjLayout = {
  midArticle: OjModuleKey;
  footer: OjModuleKey[];
};

export const SEARCH_OJ_LAYOUTS: Record<SearchOjVariant, SearchOjLayout> = {
  control: {
    midArticle: 'mostRead',
    footer: [
      'topicDiscovery',
      'portraitVideo',
      'relatedContent',
      'topStories',
      'featuredArticles',
      'mostRead',
    ],
  },
  variant_1_related: {
    midArticle: 'mostRead',
    footer: [
      'topicDiscovery',
      'relatedContent',
      'mostRead',
      'locationBasedOj',
      'topStories',
      'featuredArticles',
      'portraitVideo',
    ],
  },
  variant_2_recommended: {
    midArticle: 'mostRead',
    footer: [
      'topicDiscovery',
      'mostRead',
      'locationBasedOj',
      'relatedContent',
      'topStories',
      'featuredArticles',
      'portraitVideo',
    ],
  },
  variant_3_hybrid: {
    midArticle: 'mostRead',
    footer: [
      'topicDiscovery',
      'mostRead',
      'relatedContent',
      'featuredArticles',
      'portraitVideo',
      'topStories',
      'locationBasedOj',
    ],
  },
  variant_4_related_mid: {
    midArticle: 'relatedContent',
    footer: [
      'topicDiscovery',
      'locationBasedOj',
      'relatedContent',
      'mostRead',
      'featuredArticles',
      'portraitVideo',
      'topStories',
    ],
  },
  variant_5_recommended_mid: {
    midArticle: 'topicDiscovery',
    footer: [
      'topicDiscovery',
      'relatedContent',
      'topStories',
      'featuredArticles',
      'mostRead',
      'portraitVideo',
      'locationBasedOj',
    ],
  },
  variant_6_hybrid_mid: {
    midArticle: 'locationBasedOj',
    footer: [
      'topicDiscovery',
      'mostRead',
      'relatedContent',
      'featuredArticles',
      'portraitVideo',
      'topStories',
      'locationBasedOj',
    ],
  },
};

export const MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID =
  'search-oj-experiment-trigger';
