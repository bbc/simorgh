import isLive from '#lib/utilities/envHelper';
import hasLiveOverride from '#lib/utilities/rendererEnvHelper';

const AV_ROUTE = 'ws/av-embeds';

const getBaseUrl = url => {
  if (isLive() || hasLiveOverride(url)) {
    return process.env.SIMORGH_EMBEDS_BASE_URL_LIVE;
  }
  return process.env.SIMORGH_EMBEDS_BASE_URL_TEST;
};

const embedUrl = ({ type, mediaId, isAmp = false, pageUrl }) => {
  const baseUrl = getBaseUrl(pageUrl);
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;

  return isAmp ? `${url}/amp` : url;
};

export default embedUrl;
