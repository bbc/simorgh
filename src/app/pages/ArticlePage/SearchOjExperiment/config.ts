export const SEARCH_OJ_EXPERIMENT_NAME = 'newswb_ws_oj_order_referrer_search';

export const SEARCH_OJ_VARIANTS = [
  'control',
  'variant_1',
  'variant_2',
  'variant_3',
  'variant_4',
  'variant_5',
  'variant_6',
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
  variant_1: {
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
  variant_2: {
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
  variant_3: {
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
  variant_4: {
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
  variant_5: {
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
  variant_6: {
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
