import isLive from '#lib/utilities/envHelper';
import hasLiveOverride from '#lib/utilities/rendererEnvHelper';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const AV_ROUTE = 'ws/av-embeds';

const getBaseUrl = url => {
  if (hasLiveOverride(url) || isLive()) {
    return process.env.SIMORGH_EMBEDS_BASE_URL_LIVE;
  }
  return process.env.SIMORGH_EMBEDS_BASE_URL_TEST;
};

const embedUrl = ({ type, mediaId, isAmp = false, pageUrl }) => {
  const urlParts = [getBaseUrl(pageUrl), AV_ROUTE, type, mediaId];

  if (isAmp) {
    urlParts.push('amp');
  }

  const urlEmbed = urlParts.join('/');
  logger.info(`Embed URL: ${urlEmbed}`);

  return urlEmbed;
};

export default embedUrl;
