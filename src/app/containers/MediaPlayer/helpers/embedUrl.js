import { getUrlPath } from '#lib/utilities/urlParser';
import isLive from '#lib/utilities/envHelper';
import hasLiveOverride from '#lib/utilities/rendererEnvHelper';
import nodeLogger from '#lib/logger.node';

const logger = nodeLogger(__filename);

const AV_ROUTE = 'ws/av-embeds';

const getBaseUrl = requestUrl => {
  if (hasLiveOverride(requestUrl) || isLive()) {
    return process.env.SIMORGH_EMBEDS_BASE_URL_LIVE;
  }
  return process.env.SIMORGH_EMBEDS_BASE_URL_TEST;
};

const embedUrl = ({ type, requestUrl, isAmp = false }) => {
  const urlParts = [AV_ROUTE, type, getUrlPath(requestUrl)];

  if (isAmp) {
    urlParts.push('amp');
  }

  const url = urlParts.join('/').replace('//', '/');

  const urlEmbed = `${getBaseUrl(requestUrl)}/${url}`;
  logger.info(`Embed URL: ${urlEmbed}`);

  return urlEmbed;
};

export default embedUrl;
