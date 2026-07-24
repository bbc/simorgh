export type OJComponentKey =
  | 'mostRead'
  | 'topicDiscovery'
  | 'pvCarousel'
  | 'relatedContent'
  | 'topStories'
  | 'featuredArticles'
  | 'locationBasedOJ';

// temp variant names for now - these will change based on optimizely set-up
export type SearchVariant =
  | 'variant1related'
  | 'variant2recommended'
  | 'variant3hybrid'
  | 'variant4relatedAndMid'
  | 'variant5recommendedAndMid'
  | 'variant6hybridAndMid';

// temp variant names for now - these will change based on optimizely set-up
export const SEARCH_COMPONENT_ORDER: Record<SearchVariant, OJComponentKey[]> = {
  variant1related: [
    'topicDiscovery',
    'relatedContent',
    'locationBasedOJ',
    'topStories',
    'featuredArticles',
    'pvCarousel',
    'mostRead',
  ],
  variant2recommended: [
    'topicDiscovery',
    'mostRead',
    'relatedContent',
    'featuredArticles',
    'pvCarousel',
    'topStories',
    'locationBasedOJ',
  ],
  variant3hybrid: [
    'topicDiscovery',
    'locationBasedOJ',
    'relatedContent',
    'mostRead',
    'pvCarousel',
    'topStories',
    'featuredArticles',
  ],
  variant4relatedAndMid: [
    'topicDiscovery',
    'locationBasedOJ',
    'topStories',
    'featuredArticles',
    'pvCarousel',
    'mostRead',
  ],
  variant5recommendedAndMid: [
    'topicDiscovery',
    'mostRead',
    'relatedContent',
    'featuredArticles',
    'pvCarousel',
    'topStories',
    'locationBasedOJ',
  ],
  variant6hybridAndMid: [
    'topicDiscovery',
    'relatedContent',
    'mostRead',
    'pvCarousel',
    'topStories',
    'featuredArticles',
  ],
};
