import deepGet from '../utilities/deepGet';

const getOptimoUrn = articleData =>
  deepGet(['metadata', 'locators', 'optimoUrn'], articleData);

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
  deepGet(['metadata', 'passport', 'language'], articleData);

export const getPromoHeadline = articleData =>
  deepGet(['promo', 'headlines', 'seoHeadline'], articleData);

const isValidDateTime = dateTime => !isNaN(dateTime); // eslint-disable-line no-restricted-globals

const getISODate = unixTimestamp => {
  const date = new Date(unixTimestamp);
  return date.toISOString();
};

export const getPublishedDatetime = (attribute, articleData) => {
  const publishedDatetime = deepGet(['metadata', attribute], articleData);

  return publishedDatetime && isValidDateTime(publishedDatetime)
    ? getISODate(publishedDatetime)
    : null;
};

export const getThingAttributes = (attribute, articleData) => {
  const things = deepGet(['metadata', 'tags', 'about'], articleData);

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
