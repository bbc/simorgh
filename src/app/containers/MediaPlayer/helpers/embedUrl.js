import { getQueryString } from '#lib/utilities/urlParser';
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
  const urlPath = requestUrl.replace(getQueryString(requestUrl), '');

  const urlParts = [getBaseUrl(requestUrl), AV_ROUTE, type, urlPath];

  if (isAmp) {
    urlParts.push('amp');
  }

  const urlEmbed = urlParts.join('/');
  logger.info(`Embed URL: ${urlEmbed}`);

  return urlEmbed;
};

export default embedUrl;
