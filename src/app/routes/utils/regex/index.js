import services from '#lib/config/services/loadableConfig';
import {
  getArticleRegex,
  getArticleSwRegex,
  getArticleManifestRegex,
  getFrontPageRegex,
  getSwRegex,
  getManifestRegex,
  getCpsAssetRegex,
  getLiveRadioRegex,
  getOnDemandRadioRegex,
  getOnDemandTvRegex,
  getErrorPageRegex,
  getLegacyAssetRegex,
  getMostReadPageRegex,
  getMostReadDataRegex,
  getIdxPageRegex,
  getSecondaryColumnDataRegex,
  getRecommendationsDataRegex,
} from './utils';

const allServices = Object.keys(services);

export const articlePath = getArticleRegex(allServices);
export const articleDataPath = `${articlePath}.json`;

export const articleSwPath = getArticleSwRegex(allServices);
export const articleManifestPath = getArticleManifestRegex(allServices);

export const frontPagePath = getFrontPageRegex(allServices);
export const frontPageDataPath = `${frontPagePath}.json`;

export const frontPageSwPath = getSwRegex(allServices);
export const frontPageManifestPath = getManifestRegex(allServices);

export const cpsAssetPagePath = getCpsAssetRegex(allServices);
export const cpsAssetPageDataPath = `${cpsAssetPagePath}.json`;

export const liveRadioPath = getLiveRadioRegex(allServices);
export const liveRadioDataPath = `${liveRadioPath}.json`;

export const onDemandRadioPath = getOnDemandRadioRegex(allServices);
export const onDemandRadioDataPath = `${onDemandRadioPath}.json`;

export const onDemandTvPath = getOnDemandTvRegex(allServices);
export const onDemandTvDataPath = `${onDemandTvPath}.json`;

export const errorPagePath = getErrorPageRegex(allServices);

export const legacyAssetPagePath = getLegacyAssetRegex(allServices);
export const legacyAssetPageDataPath = `${legacyAssetPagePath}.json`;

export const mostReadPagePath = getMostReadPageRegex(allServices);
export const mostReadDataRegexPath = getMostReadDataRegex(allServices);

export const secondaryColumnDataRegexPath = getSecondaryColumnDataRegex(
  allServices,
);

export const recommendationsDataRegex = getRecommendationsDataRegex(
  allServices,
);

export const IdxPagePath = getIdxPageRegex();
export const IdxDataPath = `${IdxPagePath}.json`;
