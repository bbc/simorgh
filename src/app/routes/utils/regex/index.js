import services from '#lib/config/services/serviceList';
import {
  getArticleRegex,
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
  getAfricaEyeTVPageRegex,
} from './utils';

export const articlePath = getArticleRegex(services);
export const articleDataPath = `${articlePath}.json`;

export const homePageSwPath = getSwRegex(services);
export const homePageManifestPath = getManifestRegex(services);
export const homePagePath = getHomePageRegex(services);
export const homePageDataPath = `${homePagePath}.json`;

export const cpsAssetPagePath = getCpsAssetRegex(services);
export const cpsAssetPageDataPath = `${cpsAssetPagePath}.json`;

export const liveRadioPath = getLiveRadioRegex(services);
export const liveRadioDataPath = `${liveRadioPath}.json`;

export const onDemandRadioPath = getOnDemandRadioRegex(services);
export const onDemandRadioDataPath = `${onDemandRadioPath}.json`;

export const podcastEpisodePath = getPodcastEpisodeRegex(services);
export const podcastEpisodeDataPath = `${podcastEpisodePath}.json`;

export const podcastBrandPath = getPodcastBrandRegex(services);
export const podcastBrandDataPath = `${podcastBrandPath}.json`;

export const onDemandTvPath = getOnDemandTvRegex(services);
export const onDemandTvDataPath = `${onDemandTvPath}.json`;

export const topicPath = getTopicPageRegex(services);
export const topicDataPath = `${topicPath}.json`;

export const errorPagePath = getErrorPageRegex(services);

export const legacyAssetPagePath = getLegacyAssetRegex(services);
export const legacyAssetPageDataPath = `${legacyAssetPagePath}.json`;

export const mostReadPagePath = getMostReadPageRegex(services);
export const mostReadDataRegexPath = getMostReadDataRegex(services);

export const secondaryColumnDataRegexPath =
  getSecondaryColumnDataRegex(services);

export const africaEyeTVPagePath = getAfricaEyeTVPageRegex();
export const africaEyeTVDataPath = `${africaEyeTVPagePath}.json`;
