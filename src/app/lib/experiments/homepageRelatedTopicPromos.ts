import type { Summary } from '#app/models/types/curationData';
import type { Services } from '#app/models/types/global';

// experiment: newswb_ws_homepage_related_topic_promos
export const HOMEPAGE_RELATED_TOPIC_EXPERIMENT =
  'newswb_ws_homepage_related_topic_promos';

export const HOMEPAGE_RELATED_TOPIC_SERVICES: Services[] = [
  'afaanoromoo',
  'afrique',
  'amharic',
  'gahuza',
  'igbo',
  'pidgin',
  'somali',
  'swahili',
  'tigrinya',
  'yoruba',
];

export const HOMEPAGE_ARTICLE_PROMO_CLICK_EVENT =
  'homepage-article-promo-clicks';

export const isHomepageRelatedTopicVariation = (
  variation?: string | null,
): variation is 'control' | 'related_topic' =>
  variation === 'control' || variation === 'related_topic';

export const getRelatedTopicForPromo = (
  relatedTopic: Summary['relatedTopic'],
  promoType: Summary['type'],
  showRelatedTopicExperiment: boolean,
) =>
  showRelatedTopicExperiment &&
  promoType === 'article' &&
  relatedTopic?.title?.trim() &&
  relatedTopic.link?.url
    ? relatedTopic
    : null;

export const HOMEPAGE_ARTICLE_PROMO_TYPES = [
  'hierarchical-curation-grid-promo',
  'simple-curation-grid-promo',
];
