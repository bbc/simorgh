const activityTypes = ['favourites'];
const RESOURCE_DOMAIN = 'articles';
const RESOURCE_TYPE = 'article';
const ACTIVITY_TYPE = 'favourites';
const ACTIVITY_FAVOURITE_ACTION = 'favourited';

const buildGlobalId = (articleId: string): string =>
  `urn:bbc:${RESOURCE_DOMAIN}:${RESOURCE_TYPE}:${articleId}`;

const parseArticleID = (articleId: string): string => {
  return articleId.split(':').pop() || '';
};

export {
  activityTypes,
  buildGlobalId,
  ACTIVITY_TYPE,
  RESOURCE_DOMAIN,
  RESOURCE_TYPE,
  ACTIVITY_FAVOURITE_ACTION,
  parseArticleID,
};
