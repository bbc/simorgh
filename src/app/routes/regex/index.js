import allServices from '#lib/config/services/loadableConfig';
import {
  getArticleRegex,
  getArticleSwRegex,
  getArticleManifestRegex,
  getFrontpageRegex,
  getSwRegex,
  getManifestRegex,
  getCpsAssetRegex,
  getRadioAndTVRegex,
} from './utils';

export const articleRegex = getArticleRegex(allServices);
export const articleDataRegex = `${articleRegex}.json`;

export const articleSwRegex = getArticleSwRegex(allServices);
export const articleManifestRegex = getArticleManifestRegex(allServices);

export const frontpageRegex = getFrontpageRegex(allServices);
export const frontpageDataRegex = `${frontpageRegex}.json`;

export const frontpageSwRegex = getSwRegex(allServices);
export const frontpageManifestRegex = getManifestRegex(allServices);

export const cpsAssetPageRegex = getCpsAssetRegex(allServices);
export const cpsAssetPageDataRegex = `${cpsAssetPageRegex}.json`;

export const radioAndTvRegex = getRadioAndTVRegex(allServices);
export const radioAndTvDataRegex = `${radioAndTvRegex}.json`;
