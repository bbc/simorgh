import path from 'ramda/src/path';

const getISOStringDate = date => new Date(date).toISOString();

export const getArticleId = path(['metadata', 'id']);

export const getHeadline = path(['promo', 'headlines', 'seoHeadline']);

export const getSummary = path([
  'promo',
  'summary',
  'blocks',
  '0',
  'model',
  'blocks',
  '0',
  'model',
  'blocks',
  '0',
  'model',
  'text',
]);

export const getFirstPublished = articleData =>
  getISOStringDate(path(['metadata', 'firstPublished'], articleData));

export const getLastPublished = articleData =>
  getISOStringDate(path(['metadata', 'lastPublished'], articleData));

export const getAboutTags = path(['metadata', 'tags', 'about']);

export const getArticleSection = path(['metadata', 'passport', 'genre']);

export const getMentions = path(['metadata', 'tags', 'mentions']);

const getPassportLang = pageData =>
  path(['metadata', 'passport', 'language'], pageData);

const getMetadataLang = pageData => path(['metadata', 'language'], pageData);

export const getLang = pageData =>
  getPassportLang(pageData) || getMetadataLang(pageData);
