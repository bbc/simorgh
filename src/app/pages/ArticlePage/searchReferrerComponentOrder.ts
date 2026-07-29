export type OJComponentKey =
  | 'mostRead'
  | 'topicDiscovery'
  | 'pvCarousel'
  | 'relatedContent'
  | 'topStories'
  | 'featuredArticles'
  | 'locationBasedOJ';

export type SearchVariant =
  | 'variant_1_related'
  | 'variant_2_recommended'
  | 'variant_3_hybrid'
  | 'variant_4_related_mid'
  | 'variant_5_recommended_mid'
  | 'variant_6_hybrid_mid';

// temp variant names for now - these will change based on optimizely set-up
export const SEARCH_COMPONENT_ORDER: Record<SearchVariant, OJComponentKey[]> = {
  variant_1_related: [
    'topicDiscovery',
    'relatedContent',
    'locationBasedOJ',
    'topStories',
    'featuredArticles',
    'pvCarousel',
    'mostRead',
  ],
  variant_2_recommended: [
    'topicDiscovery',
    'mostRead',
    'relatedContent',
    'featuredArticles',
    'pvCarousel',
    'topStories',
    'locationBasedOJ',
  ],
  variant_3_hybrid: [
    'topicDiscovery',
    'locationBasedOJ',
    'relatedContent',
    'mostRead',
    'pvCarousel',
    'topStories',
    'featuredArticles',
  ],
  variant_4_related_mid: [
    'topicDiscovery',
    'locationBasedOJ',
    'topStories',
    'featuredArticles',
    'pvCarousel',
    'mostRead',
  ],
  variant_5_recommended_mid: [
    'mostRead',
    'relatedContent',
    'featuredArticles',
    'pvCarousel',
    'topStories',
    'locationBasedOJ',
  ],
  variant_6_hybrid_mid: [
    'topicDiscovery',
    'relatedContent',
    'mostRead',
    'pvCarousel',
    'topStories',
    'featuredArticles',
  ],
};
