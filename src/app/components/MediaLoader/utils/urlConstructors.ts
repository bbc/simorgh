import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import isLive from '#app/lib/utilities/isLive';
import parseAvRoute from '#app/routes/utils/parseAvRoute';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_BASE_URL = 'https://www.bbc.com';
const TEST_BASE_URL = 'https://www.test.bbc.com';
const DEV_BASE_URL = TEST_BASE_URL;

const LIVE_AMP_URL = 'https://web-cdn.api.bbci.co.uk';
const TEST_AMP_URL = 'https://web-cdn.test.api.bbci.co.uk';
const DEV_AMP_URL = TEST_AMP_URL;

const isDev = () => getEnvConfig().SIMORGH_APP_ENV === 'local';

const getBaseUrl = (isAmp: boolean) => {
  // In some scenarios, we use the same base URL as the parent
  const relativeBaseUrl = '';
  switch (true) {
    case isLive():
      return isAmp ? LIVE_AMP_URL : relativeBaseUrl;
    case isDev():
      return isAmp ? DEV_AMP_URL : DEV_BASE_URL;
    default:
      return isAmp ? TEST_AMP_URL : relativeBaseUrl;
  }
};

type FunProps = {
  id: string;
  versionID?: string;
  lang?: string;
};

export const getAmpIframeUrl = ({ id, versionID, lang }: FunProps) => {
  const { platform } = parseAvRoute(id);

  const baseUrl = getBaseUrl(true);

  return `${baseUrl}/${AV_ROUTE}/${platform}/${id}${versionID ? `/${versionID}` : ''}${lang ? `/${lang}` : ''}`;
};

export const getExternalEmbedUrl = ({ id, versionID, lang }: FunProps) => {
  const { platform, service, variant, assetId } = parseAvRoute(id);

  const baseUrl = isLive() ? LIVE_BASE_URL : TEST_BASE_URL;

  let url = '';

  if (platform === 'cps') {
    url = `${baseUrl}/${service}${variant ? `/${variant}` : ''}/av-embeds/${assetId}${versionID ? `/vpid/${versionID}` : ''}`;
  }

  if (platform === 'articles') {
    url = `${baseUrl}/ws/av-embeds/articles/${assetId}${versionID ? `/${versionID}` : ''}${lang ? `/${lang}` : ''}`;
  }

  return url;
};
