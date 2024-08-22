import pathOr from 'ramda/src/pathOr';

const getOptimoUrn = articleData =>
  pathOr(null, ['metadata', 'locators', 'optimoUrn'], articleData);

export const getContentId = pathOr(null, [
  'metadata',
  'analyticsLabels',
  'contentId',
]);

export const getOptimoId = articleData => {
  const optimoUrn = getOptimoUrn(articleData);
  return optimoUrn ? optimoUrn.split(':').pop() : 'unknown';
};

export const getPageIdentifier = (service, articleData) => {
  const optimoId = getOptimoId(articleData);
  return `${service}.articles.${optimoId}.page`;
};

export const getLanguage = articleData =>
  pathOr(null, ['metadata', 'language'], articleData);

export const getPromoHeadline = articleData =>
  pathOr(null, ['promo', 'headlines', 'seoHeadline'], articleData);

export const getNationsProducer = articleData => {
  return pathOr(
    null,
    ['metadata', 'analyticsLabels', 'nations_producer'],
    articleData,
  );
};
