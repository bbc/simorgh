export type ArticleEndDestination = {
  id: string;
  label: string;
  description: string;
  requiresJs?: boolean;
  hideInOperaMini?: boolean;
};

export const TOPIC_DISCOVERY_TARGET = 'topic-discovery-heading';
export const PORTRAIT_VIDEO_TARGET = 'article-portrait-video-carousel';
export const RELATED_CONTENT_TARGET =
  'section-label-heading-related-content-heading';
export const MOST_READ_TARGET = 'section-label-heading-Most-Read';
export const COUNTRY_CURATION_TARGET = 'location-based-topic-oj';
export const MEDIA_CURATION_TARGET = 'article-onward-media';
