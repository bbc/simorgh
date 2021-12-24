import services from '#lib/config/services/loadableConfig';
import {
  getArticleRegex,
  getArticleSwRegex,
  getArticleManifestRegex,
  getSwRegex,
  getManifestRegex,
  getCpsAssetRegex,
  getLiveRadioRegex,
  getPodcastEpisodeRegex,
  getPodcastBrandRegex,
  getOnDemandRadioRegex,
  getOnDemandTvRegex,
  getErrorPageRegex,
  getLegacyAssetRegex,
  getMostReadPageRegex,
  getMostReadDataRegex,
  getMostWatchedDataRegex,
  getMostWatchedPageRegex,
  getIdxPageRegex,
  getSecondaryColumnDataRegex,
  getRecommendationsDataRegex,
  getAfricaEyeTVPageRegex,
} from './utils';

// this is a bit of a mess just now

export const allServices = Object.keys(services);
export const serviceRegex = allServices.join('|');
export const variantRegex = ['/simp', '/trad', '/cyr', '/lat'].join('|');
const articleLocalRegex = ['articles', 'erthyglau', 'sgeulachdan'].join('|');
const idRegex = 'c[a-zA-Z0-9]{10}o';

export const articlePageRegex = new RegExp(
  `^/(${serviceRegex})(${articleLocalRegex})/(${idRegex})(${variantRegex})?(.amp)?$`,
);
export const articleDataPath = `/:service(${serviceRegex})/:local(${articleLocalRegex})/:id(${idRegex}):variant(${variantRegex})?.json?`;

export const articleSwPath = getArticleSwRegex(allServices);
export const articleManifestPath = getArticleManifestRegex(allServices);

export const frontPageRegex = new RegExp(
  `^/(${serviceRegex})(${variantRegex})?(.amp)?$`,
);
export const frontPageDataPath = `/:service(${serviceRegex}):variant(${variantRegex})?.json`;

export const frontPageSwPath = getSwRegex(allServices);
export const frontPageManifestPath = getManifestRegex(allServices);

export const cpsAssetPagePath = getCpsAssetRegex(allServices);
export const cpsAssetPageDataPath = `${cpsAssetPagePath}.json`;

export const liveRadioPath = getLiveRadioRegex(allServices);
export const liveRadioDataPath = `${liveRadioPath}.json`;

export const onDemandRadioPath = getOnDemandRadioRegex(allServices);
export const onDemandRadioDataPath = `${onDemandRadioPath}.json`;

export const podcastEpisodePath = getPodcastEpisodeRegex(allServices);
export const podcastEpisodeDataPath = `${podcastEpisodePath}.json`;

export const podcastBrandPath = getPodcastBrandRegex(allServices);
export const podcastBrandDataPath = `${podcastBrandPath}.json`;

export const onDemandTvPath = getOnDemandTvRegex(allServices);
export const onDemandTvDataPath = `${onDemandTvPath}.json`;

export const errorPagePath = getErrorPageRegex(allServices);

export const legacyAssetPagePath = getLegacyAssetRegex(allServices);
export const legacyAssetPageDataPath = `${legacyAssetPagePath}.json`;

export const mostReadPagePath = getMostReadPageRegex(allServices);
export const mostReadDataRegexPath = getMostReadDataRegex(allServices);

export const mostWatchedDataPath = getMostWatchedDataRegex(allServices);
export const mostWatchedPagePath = getMostWatchedPageRegex(allServices);

export const secondaryColumnDataRegexPath =
  getSecondaryColumnDataRegex(allServices);

export const recommendationsDataRegex =
  getRecommendationsDataRegex(allServices);

export const IdxPagePath = getIdxPageRegex();
export const IdxDataPath = `${IdxPagePath}.json`;

export const africaEyeTVPagePath = getAfricaEyeTVPageRegex();
export const africaEyeTVDataPath = `${africaEyeTVPagePath}.json`;
