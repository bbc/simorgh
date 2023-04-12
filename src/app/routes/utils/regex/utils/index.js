import isLive from '#app/lib/utilities/isLive';

const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';
const assetUriRegex = '[a-z0-9-_]{0,}[0-9]{8,}';
const legacyAssetUriRegex = '[a-z0-9-_]{1,}/[a-z0-9-_/]{1,}';
const variantRegex = '/simp|/trad|/cyr|/lat';
const articleLocalRegex = 'articles|erthyglau|sgeulachdan';
const mediaIdRegex = '[a-z0-9]+';
const topicIdRegex = '[a-z0-9]+';
const radioMasterBrandRegex = 'bbc_[a-z]+_radio';
const tvMasterBrandRegex = 'bbc_[a-z]+_tv';
const errorCodeRegex = '404|500';
const idxRegex = 'persian/afghanistan|ukrainian/ukraine_in_russian';
const brandEpisodeRegex = 'tv|tv_programmes';
const sportDisciplineRegex = '/[a-z0-9-_]{1,}';

const getServiceRegex = services => services.join('|');

export const getArticleRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})?:discipline(${sportDisciplineRegex})?/:local(${articleLocalRegex})/:id(${idRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
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
  // if environment is not live then filter out and remove kyrgyz from list of services
  let frontPageServices = services;
  if (!isLive()) {
    frontPageServices = services.filter(service => service !== 'kyrgyz');
  }
  const serviceRegex = getServiceRegex(frontPageServices);
  return `/:service(${serviceRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
};

export const getTipoHomeRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/tipohome:amp(${ampRegex})?`;
};

// eslint-disable-next-line consistent-return
export const getHomePageRegex = () => {
  if (!isLive()) {
    const homePageServiceRegex = getServiceRegex(['kyrgyz']);
    return `/:service(${homePageServiceRegex}):variant(${variantRegex})?:amp(${ampRegex})?`;
  }
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
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${assetUriRegex}):amp(${ampRegex})?`;
};

export const getLegacyAssetRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${legacyAssetUriRegex}):amp(${ampRegex})?`;
};

export const getLiveRadioRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:masterBrand(${radioMasterBrandRegex})/:mediaId(liveRadio):amp(${ampRegex})?`;
};

export const getPodcastEpisodeRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/podcasts/:brandId(${mediaIdRegex})/:mediaId(${mediaIdRegex}):amp(${ampRegex})?`;
};

export const getPodcastBrandRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/podcasts/:brandId(${mediaIdRegex}):amp(${ampRegex})?`;
};

export const getOnDemandRadioRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:serviceId(${radioMasterBrandRegex})(/programmes)?/:mediaId(${mediaIdRegex}):amp(${ampRegex})?`;
};

export const getOnDemandTvRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:serviceId(${tvMasterBrandRegex})/:brandEpisode(${brandEpisodeRegex})/:mediaId(${mediaIdRegex}):amp(${ampRegex})?`;
};

export const getTopicPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/topics/:id(${topicIdRegex})?`;
};

export const getErrorPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:errorCode(${errorCodeRegex}):variant(${variantRegex})?`;
};

export const getMostReadPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/popular/read:amp(${ampRegex})?`;
};

export const getMostReadDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/mostread:variant(${variantRegex})?.json`;
};

export const getMostWatchedDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/mostwatched:variant(${variantRegex})?.json`;
};

export const getMostWatchedPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/media/video:amp(${ampRegex})?`;
};

export const getSecondaryColumnDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/sty-secondary-column:variant(${variantRegex})?.json`;
};

export const getIdxPageRegex = () => {
  return `/:idx(${idxRegex}):amp(${ampRegex})?`;
};

export const getRecommendationsDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:assetUri(${assetUriRegex})/recommendations:variant(${variantRegex})?.json`;
};

export const getAfricaEyeTVPageRegex = () => {
  return `/worldservice/tv/africa_eye/:episodeId(${mediaIdRegex})?`;
};
