import SERVICES from '#app/lib/config/services';
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

export const articlePath = getArticleRegex(SERVICES);
export const articleDataPath = `${articlePath}.json`;

export const homePageSwPath = getSwRegex(SERVICES);
export const homePageManifestPath = getManifestRegex(SERVICES);
export const homePagePath = getHomePageRegex(SERVICES);
export const homePageDataPath = `${homePagePath}.json`;

export const cpsAssetPagePath = getCpsAssetRegex(SERVICES);
export const cpsAssetPageDataPath = `${cpsAssetPagePath}.json`;

export const liveRadioPath = getLiveRadioRegex(SERVICES);
export const liveRadioDataPath = `${liveRadioPath}.json`;

export const onDemandRadioPath = getOnDemandRadioRegex(SERVICES);
export const onDemandRadioDataPath = `${onDemandRadioPath}.json`;

export const podcastEpisodePath = getPodcastEpisodeRegex(SERVICES);
export const podcastEpisodeDataPath = `${podcastEpisodePath}.json`;

export const podcastBrandPath = getPodcastBrandRegex(SERVICES);
export const podcastBrandDataPath = `${podcastBrandPath}.json`;

export const onDemandTvPath = getOnDemandTvRegex(SERVICES);
export const onDemandTvDataPath = `${onDemandTvPath}.json`;

export const topicPath = getTopicPageRegex(SERVICES);
export const topicDataPath = `${topicPath}.json`;

export const errorPagePath = getErrorPageRegex(SERVICES);

export const legacyAssetPagePath = getLegacyAssetRegex(SERVICES);
export const legacyAssetPageDataPath = `${legacyAssetPagePath}.json`;

export const mostReadPagePath = getMostReadPageRegex(SERVICES);
export const mostReadDataRegexPath = getMostReadDataRegex(SERVICES);

export const secondaryColumnDataRegexPath =
  getSecondaryColumnDataRegex(SERVICES);

export const africaEyeTVPagePath = getAfricaEyeTVPageRegex();
export const africaEyeTVDataPath = `${africaEyeTVPagePath}.json`;
