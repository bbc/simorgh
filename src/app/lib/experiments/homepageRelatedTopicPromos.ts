// experiment: newswb_ws_homepage_related_topic_promos
export const HOMEPAGE_RELATED_TOPIC_EXPERIMENT =
  'newswb_ws_homepage_related_topic_promos';

export const HOMEPAGE_ARTICLE_PROMO_CLICK_EVENT =
  'homepage-article-promo-clicks';

export const isHomepageRelatedTopicVariation = (
  variation?: string | null,
): variation is 'control' | 'related_topic' =>
  variation === 'control' || variation === 'related_topic';

export const HOMEPAGE_ARTICLE_PROMO_TYPES = [
  'hierarchical-curation-grid-promo',
  'simple-curation-grid-promo',
];
