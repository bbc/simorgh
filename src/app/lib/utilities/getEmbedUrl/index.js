import isLive from '../isLive';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_URL = 'https://polling.bbc.co.uk';
const TEST_URL = 'https://polling.test.bbc.co.uk';

const shouldRenderLiveData = queryString => {
  console.log(`isLive: ${isLive()}, queryString: ${queryString}`);
  return (
    !isLive() &&
    Boolean(queryString) &&
    queryString.includes('renderer_env=live')
  );
};

const getBaseUrl = queryString => {
  if (isLive()) {
    return LIVE_URL;
  }
  if (shouldRenderLiveData(queryString)) {
    return LIVE_URL;
  }
  return TEST_URL;
};

export default ({ type, mediaId, isAmp = false, queryString }) => {
  const baseUrl = getBaseUrl(queryString);
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;

  return isAmp ? `${url}/amp` : url;
};
