import path from 'ramda/src/path';

const getISOStringDate = date => new Date(date).toISOString();

export const getArticleId = path(['metadata', 'id']);

const getHeadlineType = (type, articleData) => {
  return path(['promo', 'headlines', type], articleData);
};

export const getHeadline = articleData =>
  getHeadlineType('seoHeadline', articleData) ||
  getHeadlineType('headline', articleData);

export const getSummary = path(['promo', 'summary']);

export const getFirstPublished = articleData =>
  getISOStringDate(path(['metadata', 'firstPublished'], articleData));

export const getLastPublished = articleData =>
  getISOStringDate(path(['metadata', 'lastPublished'], articleData));

export const getAboutTags = path(['metadata', 'tags', 'about']);

export const getArticleSection = path(['metadata', 'passport', 'genre']);

export const getMentions = path(['metadata', 'tags', 'mentions']);

export const getLang = path(['metadata', 'passport', 'language']);
