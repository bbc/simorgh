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

export const getThingAttributes = (attribute, articleData) => {
  const things = pathOr(null, ['metadata', 'tags', 'about'], articleData);

  if (things) {
    const attributes = [];

    things.forEach(thing => {
      if (thing[attribute]) {
        attributes.push(thing[attribute].trim().replace(/\s/g, '+'));
      }
    });

    return attributes.join('~') || null;
  }

  return null;
};
