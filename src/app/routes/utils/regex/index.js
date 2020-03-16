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
  getRadioAndTVRegex,
  getErrorPageRegex,
  getLegacyAssetRegex,
} from './utils';

const allServices = Object.keys(services);
const serviceRegex = Object.keys(services).join('|');
const variantRegex = '/simp|/trad|/cyr|/lat';
const mostRead = 'mostread';

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

export const radioAndTvPath = getRadioAndTVRegex(allServices);
export const radioAndTvDataPath = `${radioAndTvPath}.json`;

export const errorPagePath = getErrorPageRegex(allServices);
export const mostReadDataRegexPath = `/:service(${serviceRegex})/${mostRead}:variant(${variantRegex})?.json`;

export const legacyAssetPagePath = getLegacyAssetRegex(allServices);
export const legacyAssetPageDataPath = `${legacyAssetPagePath}.json`;
