const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';
const assetUriRegex = '[a-z-_]{0,}[0-9]{8,}';
const legacyAssetUriRegex =
  '[a-z-_]{1,}/[0-9]{4}/[0-9]{2}/[0-9]{6}[a-z0-9-_]{0,}';
const variantRegex = '/simp|/trad|/cyr|/lat';
const articleLocalRegex = 'articles|erthyglau|sgeulachdan';
const mediaIdRegex = '[a-z0-9]+';
const mediaServiceIdRegex = 'bbc_[a-z]+_radio|bbc_[a-z]+_tv';
const errorCodeRegex = '404|500';

const getServiceRegex = (services) => services.join('|');

export const getArticleRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/:id(${idRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
};

export const getArticleSwRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/sw.js`;
};

export const getArticleManifestRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/manifest.json`;
};

export const getFrontPageRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
};

export const getSwRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/sw.js`;
};

export const getManifestRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/manifest.json`;
};

export const getCpsAssetRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${assetUriRegex}):amp(${ampRegex})?`;
};

export const getLegacyAssetRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${legacyAssetUriRegex})?:amp(${ampRegex})?`;
};

export const getLiveRadioRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:serviceId(${mediaServiceIdRegex})/:mediaId(liveRadio):amp(${ampRegex})?`;
};

export const getRadioAndTVRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:serviceId(${mediaServiceIdRegex})/:mediaId(${mediaIdRegex}):amp(${ampRegex})?`;
};

export const getErrorPageRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:errorCode(${errorCodeRegex}):variant(${variantRegex})?`;
};

export const getMostReadPageRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/popular/read`;
};

export const getMostReadDataRegex = (services) => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/mostread:variant(${variantRegex})?.json`;
};
