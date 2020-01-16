const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';
const assetUriRegex = '[a-z-_]{0,}[0-9]{8,}';
const variantRegex = '/simp|/trad|/cyr|/lat';
const articleLocalRegex = 'articles|erthyglau|sgeulachdan';
const mediaIdRegex = '(?!radioschedule)[a-z0-9]+';
const mediaServiceIdRegex = 'bbc_[a-z]+_radio|bbc_[a-z]+_tv';
const radioScheduleIdRegex = 'bbc_[a-z]+_radio';
const errorCodeRegex = '404|500';

const getServiceRegex = services => services.join('|');

export const getArticleRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/:id(${idRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
};

export const getArticleSwRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/sw.js`;
};

export const getArticleManifestRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/manifest.json`;
};

export const getFrontPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
};

export const getSwRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/sw.js`;
};

export const getManifestRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/manifest.json`;
};

export const getCpsAssetRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:assetUri(${assetUriRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
};

export const getRadioAndTVRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:serviceId(${mediaServiceIdRegex})/:mediaId(${mediaIdRegex}):amp(${ampRegex})?`;
};

export const getRadioScheduleRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:serviceId(${radioScheduleIdRegex})/radioschedule.json`;
};

export const getErrorPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:errorCode(${errorCodeRegex}):variant(${variantRegex})?`;
};
