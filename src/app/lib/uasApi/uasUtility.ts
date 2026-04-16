import type { Services } from '#app/models/types/global';
import type { UasApiRequestBody } from './index';

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
}: {
  articleId: string;
  service: Services;
  articleTitle: string;
}): UasApiRequestBody => ({
  activityType: FAVOURITES_CONFIG.activityType,
  resourceDomain: FAVOURITES_CONFIG.resourceDomain,
  resourceType: FAVOURITES_CONFIG.resourceType,
  resourceId: articleId,
  action: FAVOURITES_CONFIG.action,
  metaData: { service, articleId, title: articleTitle },
});

export {
  FAVOURITES_CONFIG,
  buildGlobalId,
  createFavouritesPayload,
  parseArticleID,
};
