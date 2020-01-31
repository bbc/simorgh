import pathOr from 'ramda/src/pathOr';

const getOptimoUrn = articleData =>
  pathOr(null, ['metadata', 'locators', 'optimoUrn'], articleData);

export const getContentId = articleData => {
  const optimoUrn = getOptimoUrn(articleData);
  const id = optimoUrn ? optimoUrn.split(':').pop() : null;
  if (!id) {
    return null;
  }
  return `urn:bbc:optimo:${id}`;
};

export const getOptimoId = articleData => {
  const optimoUrn = getOptimoUrn(articleData);
  return optimoUrn ? optimoUrn.split(':').pop() : 'unknown';
};

export const getPageIdentifier = (service, articleData) => {
  const optimoId = getOptimoId(articleData);
  return `${service}.articles.${optimoId}.page`;
};

export const getLanguage = articleData =>
  pathOr(null, ['metadata', 'passport', 'language'], articleData);

export const getPromoHeadline = articleData =>
  pathOr(null, ['promo', 'headlines', 'seoHeadline'], articleData);
