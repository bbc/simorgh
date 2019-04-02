import deepGet from '../../../helpers/json/deepGet';

export const getOptimoUrn = articleData =>
  deepGet(['metadata', 'locators', 'optimoUrn'], articleData);

export const getPageIdentifier = (service, articleData) => {
  const optimoUrn = getOptimoUrn(articleData);

  const optimoId = optimoUrn ? optimoUrn.split(':').pop() : 'unknown';

  return `health::${service || 'news'}.articles.${optimoId}.page`;
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

export const getPublishedTime = (attribute, articleData) => {
  const publishedTime = deepGet(['metadata', attribute], articleData);

  return publishedTime && isValidDateTime(publishedTime)
    ? getISODate(publishedTime)
    : null;
};

export const getThingAttributes = (attribute, articleData) => {
  const things = deepGet(['metadata', 'tags', 'about'], articleData);

  if (things) {
    const attributes = [];

    things.forEach(thing => {
      if (thing[attribute]) {
        attributes.push(thing[attribute]);
      }
    });

    return attributes.join('~') || null;
  }

  return null;
};
