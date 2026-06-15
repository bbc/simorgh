export type OJComponentKey =
  | 'mostRead'
  | 'topicDiscovery'
  | 'relatedContent'
  | 'pvCarousel'
  | 'topStories'
  | 'featuredArticles'
  | 'locationBasedOJ';

export type ReferrerType = 'direct' | 'search' | 'social';

export const MOBILE_COMPONENT_ORDER: Record<ReferrerType, OJComponentKey[]> = {
  direct: [
    'mostRead',
    'topicDiscovery',
    'relatedContent',
    'pvCarousel',
    'featuredArticles',
    'topStories',
    'locationBasedOJ',
  ],
  search: [
    'relatedContent',
    'topicDiscovery',
    'mostRead',
    'pvCarousel',
    'topStories',
    'featuredArticles',
    'locationBasedOJ',
  ],
  social: [
    'mostRead',
    'topicDiscovery',
    'topStories',
    'featuredArticles',
    'relatedContent',
    'locationBasedOJ',
    'pvCarousel',
  ],
};
