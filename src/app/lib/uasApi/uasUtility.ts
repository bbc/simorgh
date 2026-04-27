import type { Services } from '#app/models/types/global';
import type { UasApiRequestBody } from './index';

export interface SavedArticle {
  id: string;
  title: string;
  link: string;
  promoImage?: string;
  type: string;
  description?: string;
  imageAlt: string;
  imageUrl: string;
}

const FAVOURITES_CONFIG = {
  activityType: 'favourites',
  resourceDomain: 'articles',
  resourceType: 'article',
  action: 'favourited',
} as const;

export type ActivityType = (typeof FAVOURITES_CONFIG)['activityType'];

const buildGlobalId = (
  resourceId: string,
  resourceDomain = FAVOURITES_CONFIG.resourceDomain,
  resourceType = FAVOURITES_CONFIG.resourceType,
): string => `urn:bbc:${resourceDomain}:${resourceType}:${resourceId}`;

const parseArticleID = (articleId: string): string => {
  return articleId.split(':').pop() || '';
};

const createFavouritesPayload = ({
  articleId,
  service,
  articleTitle,
  promoImage,
  promoImageAltText,
  locatorUrl,
}: {
  articleId: string;
  service: Services;
  articleTitle: string;
  promoImage?: string | boolean;
  promoImageAltText?: string;
  locatorUrl?: string;
}): UasApiRequestBody => ({
  activityType: FAVOURITES_CONFIG.activityType,
  resourceDomain: FAVOURITES_CONFIG.resourceDomain,
  resourceType: FAVOURITES_CONFIG.resourceType,
  resourceId: articleId,
  action: FAVOURITES_CONFIG.action,
  metaData: {
    service,
    articleId,
    title: articleTitle,
    promoImage: promoImage || '',
    promoImageAltText: promoImageAltText || '',
    locatorUrl: locatorUrl || '',
  },
});

export {
  FAVOURITES_CONFIG,
  buildGlobalId,
  createFavouritesPayload,
  parseArticleID,
};
