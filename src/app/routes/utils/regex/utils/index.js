import isLive from '#app/lib/utilities/isLive';

const idRegex = 'c[a-zA-Z0-9]{10}o';
const ampRegex = '.amp';
const appRegex = '.app';
const liteRegex = '.lite';
const nonCanonicalArticleRenderPlatform = `${ampRegex}|${appRegex}|${liteRegex}`;
const assetUriRegex = '[a-z0-9-_+]{0,}[0-9]{8,}';
const legacyAssetUriRegex = '[a-z0-9-_]{1,}/[a-z0-9-_/]{1,}';
const variantRegex = '/simp|/trad|/cyr|/lat';
const articleLocalRegex = 'articles|erthyglau|sgeulachdan';
const mediaIdRegex = '[a-z0-9]+';
const topicIdRegex = '[a-z0-9]+';
const radioMasterBrandRegex = 'bbc_[a-z]+_radio';
const tvMasterBrandRegex = 'bbc_[a-z]+_tv';
const errorCodeRegex = '404|500';
const brandEpisodeRegex = 'tv|tv_programmes';
const sportDisciplineRegex = '/[a-z0-9-_]{1,}';

const getServiceRegex = services => services.join('|');

export const getArticleRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})?:discipline(${sportDisciplineRegex})?/:local(${articleLocalRegex})/:id(${idRegex}):variant(${variantRegex})?:nonCanonicalArticleRenderPlatform(${nonCanonicalArticleRenderPlatform})?`;
};

export const getArticleSwRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/sw.js`;
};

export const getArticleManifestRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:local(${articleLocalRegex})/manifest.json`;
};

const homePageServices = [
  'afaanoromoo',
  'afrique',
  'amharic',
  'arabic',
  'azeri',
  'bengali',
  'burmese',
  'gahuza',
  'gujarati',
  'hausa',
  'hindi',
  'igbo',
  'indonesia',
  'japanese',
  'kyrgyz',
  'korean',
  'marathi',
  'mundo',
  'nepali',
  'pashto',
  'persian',
  'pidgin',
  'portuguese',
  'punjabi',
  'russian',
  'sinhala',
  'somali',
  'swahili',
  'tamil',
  'telugu',
  'thai',
  'tigrinya',
  'turkce',
  'ukrainian',
  'urdu',
  'vietnamese',
  'yoruba',
];

export const getFrontPageRegex = services => {
  let frontPages = services;
  if (isLive()) {
    frontPages = services.filter(
      service => !homePageServices.includes(service),
    );
  } else {
    frontPages = [];
  }
  const serviceRegex = getServiceRegex(frontPages);
  return `/:service(${serviceRegex}):variant(${variantRegex})?:amp(${ampRegex})?:lite(${liteRegex})?`;
};

export const getTipoHomeRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/tipohome:amp(${ampRegex})?:lite(${liteRegex})?`;
};

export const getHomePageRegex = services => {
  let homePages = services;
  if (isLive()) {
    homePages = services.filter(service => homePageServices.includes(service));
  }
  const homePageServiceRegex = getServiceRegex(homePages);
  return `/:service(${homePageServiceRegex}):variant(${variantRegex})?:amp(${ampRegex})?:lite(${liteRegex})?`;
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
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${assetUriRegex}):amp(${ampRegex})?:lite(${liteRegex})?`;
};

export const getLegacyAssetRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:assetUri(${legacyAssetUriRegex}):amp(${ampRegex})?:lite(${liteRegex})?`;
};

export const getLiveRadioRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:masterBrand(${radioMasterBrandRegex})/:mediaId(liveRadio):lite(${liteRegex})?`;
};

export const getPodcastEpisodeRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/podcasts/:brandId(${mediaIdRegex})/:mediaId(${mediaIdRegex}):lite(${liteRegex})?`;
};

export const getPodcastBrandRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/podcasts/:brandId(${mediaIdRegex}):lite(${liteRegex})?`;
};

export const getOnDemandRadioRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/:serviceId(${radioMasterBrandRegex})(/programmes)?/:mediaId(${mediaIdRegex}):lite(${liteRegex})?`;
};

export const getOnDemandTvRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:serviceId(${tvMasterBrandRegex})/:brandEpisode(${brandEpisodeRegex})/:mediaId(${mediaIdRegex}):lite(${liteRegex})?`;
};

export const getTopicPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/topics/:id(${topicIdRegex})?:lite(${liteRegex})?`;
};

export const getErrorPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:errorCode(${errorCodeRegex}):variant(${variantRegex})?:lite(${liteRegex})?`;
};

export const getMostReadPageRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex}):variant(${variantRegex})?/popular/read:amp(${ampRegex})?:lite(${liteRegex})?`;
};

export const getMostReadDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/mostread:variant(${variantRegex})?.json`;
};

export const getSecondaryColumnDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/sty-secondary-column:variant(${variantRegex})?.json`;
};

export const getRecommendationsDataRegex = services => {
  const serviceRegex = getServiceRegex(services);
  return `/:service(${serviceRegex})/:assetUri(${assetUriRegex})/recommendations:variant(${variantRegex})?.json`;
};

export const getAfricaEyeTVPageRegex = () => {
  return `/worldservice/tv/africa_eye/:episodeId(${mediaIdRegex})?:lite(${liteRegex})?`;
};
