// this flag key must match optimizely
export const SEARCH_OJ_EXPERIMENT_NAME = 'newswb_ws_oj_order_referrer_search';

export type SearchOjModule =
  | 'mostRead'
  | 'topicDiscovery'
  | 'videoOj'
  | 'relatedContent'
  | 'topStories'
  | 'featuredArticles'
  | 'locationBasedOJ';

export type SearchOjLayout = {
  midArticle: SearchOjModule;
  footer: readonly SearchOjModule[];
};

// each key must match a variation key in optimizely
// each value follows the order agreed in the experiment brief
// video oj means the portrait video carousel or video curation for that service
export const SEARCH_OJ_LAYOUTS = {
  control: {
    midArticle: 'mostRead',
    footer: [
      'topicDiscovery',
      'videoOj',
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
      'locationBasedOJ',
      'topStories',
      'featuredArticles',
      'videoOj',
      'mostRead',
    ],
  },
  variant_2_recommended: {
    midArticle: 'mostRead',
    footer: [
      'topicDiscovery',
      'mostRead',
      'relatedContent',
      'featuredArticles',
      'videoOj',
      'topStories',
      'locationBasedOJ',
    ],
  },
  variant_3_hybrid: {
    midArticle: 'mostRead',
    footer: [
      'topicDiscovery',
      'locationBasedOJ',
      'relatedContent',
      'mostRead',
      'videoOj',
      'topStories',
      'featuredArticles',
    ],
  },
  variant_4_related_mid: {
    midArticle: 'relatedContent',
    footer: [
      'topicDiscovery',
      'locationBasedOJ',
      'topStories',
      'featuredArticles',
      'videoOj',
      'mostRead',
    ],
  },
  variant_5_recommended_mid: {
    midArticle: 'topicDiscovery',
    footer: [
      'mostRead',
      'relatedContent',
      'featuredArticles',
      'videoOj',
      'topStories',
      'locationBasedOJ',
    ],
  },
  variant_6_hybrid_mid: {
    midArticle: 'locationBasedOJ',
    footer: [
      'topicDiscovery',
      'relatedContent',
      'mostRead',
      'videoOj',
      'topStories',
      'featuredArticles',
    ],
  },
} as const satisfies Record<string, SearchOjLayout>;

export type SearchOjVariant = keyof typeof SEARCH_OJ_LAYOUTS;

// unknown values keep the existing control experience
export const isSearchOjVariant = (
  variation: string | null,
): variation is SearchOjVariant =>
  variation !== null &&
  Object.prototype.hasOwnProperty.call(SEARCH_OJ_LAYOUTS, variation);

// this id is added to the real oj that triggers the experiment
export const MID_ARTICLE_OJ_EXPERIMENT_TRIGGER_ID =
  'search-oj-experiment-trigger';
