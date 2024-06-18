import services from '../../../lib/config/services/loadableConfig';
import {
  getArticleRegex,
  getArticleSwRegex,
  getArticleManifestRegex,
  getFrontPageRegex,
  getTipoHomeRegex,
  getHomePageRegex,
  getSwRegex,
  getManifestRegex,
  getCpsAssetRegex,
  getLiveRadioRegex,
  getPodcastEpisodeRegex,
  getPodcastBrandRegex,
  getOnDemandRadioRegex,
  getOnDemandTvRegex,
  getTopicPageRegex,
  getErrorPageRegex,
  getLegacyAssetRegex,
  getMostReadPageRegex,
  getMostReadDataRegex,
  getSecondaryColumnDataRegex,
  getRecommendationsDataRegex,
  getAfricaEyeTVPageRegex,
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

export const tipoHomePath = getTipoHomeRegex(allServices);
export const tipoHomeDataPath = `${tipoHomePath}.json`;

export const homePagePath = getHomePageRegex(allServices);
export const homePageDataPath = `${homePagePath}.json`;

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

export const topicPath = getTopicPageRegex(allServices);
export const topicDataPath = `${topicPath}.json`;

export const errorPagePath = getErrorPageRegex(allServices);

export const legacyAssetPagePath = getLegacyAssetRegex(allServices);
export const legacyAssetPageDataPath = `${legacyAssetPagePath}.json`;

export const mostReadPagePath = getMostReadPageRegex(allServices);
export const mostReadDataRegexPath = getMostReadDataRegex(allServices);

export const secondaryColumnDataRegexPath =
  getSecondaryColumnDataRegex(allServices);

export const recommendationsDataRegex =
  getRecommendationsDataRegex(allServices);

export const africaEyeTVPagePath = getAfricaEyeTVPageRegex();
export const africaEyeTVDataPath = `${africaEyeTVPagePath}.json`;
