import isLive from '#lib/utilities/envHelper';
import hasLiveRendererOverride from '#lib/utilities/rendererEnvHelper';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_URL = 'https://polling.bbc.co.uk';
const TEST_URL = 'https://polling.test.bbc.co.uk';

const getBaseUrl = url => {
  if (isLive()) {
    return LIVE_URL;
  }
  if (hasLiveRendererOverride(url)) {
    return LIVE_URL;
  }
  return TEST_URL;
};

const embedUrl = ({ type, mediaId, isAmp = false, pageUrl }) => {
  const baseUrl = getBaseUrl(pageUrl);
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;

  return isAmp ? `${url}/amp` : url;
};

export default embedUrl;
