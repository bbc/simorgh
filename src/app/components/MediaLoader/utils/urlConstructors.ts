import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import isLive from '#app/lib/utilities/isLive';
import parseAvRoute from '#app/routes/utils/parseAvRoute';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_BASE_URL = 'https://www.bbc.com';
const TEST_BASE_URL = 'https://www.test.bbc.com';

const LIVE_AMP_URL = 'https://web-cdn.api.bbci.co.uk';
const TEST_AMP_URL = 'https://web-cdn.test.api.bbci.co.uk';
const DEV_AMP_URL = TEST_AMP_URL;

const isDev = () => getEnvConfig().SIMORGH_APP_ENV === 'local';

const getBaseUrl = () => {
  switch (true) {
    case isLive():
      return LIVE_AMP_URL;
    case isDev():
      return DEV_AMP_URL;
    default:
      return TEST_AMP_URL;
  }
};

type FuncProps = {
  id: string;
  versionID?: string;
  lang?: string;
};

export const getAmpIframeUrl = ({ id, versionID, lang }: FuncProps) => {
  const { platform } = parseAvRoute(id);

  const baseUrl = getBaseUrl();

  return `${baseUrl}/${AV_ROUTE}/${platform}/${id}${versionID ? `/${versionID}` : ''}${lang ? `/${lang}` : ''}/amp`;
};

export const getExternalEmbedUrl = ({ id, versionID, lang }: FuncProps) => {
  const { platform, service, variant, assetId } = parseAvRoute(id);

  const baseUrl = isLive() ? LIVE_BASE_URL : TEST_BASE_URL;

  if (platform === 'cps') {
    return `${baseUrl}/${service}${variant ? `/${variant}` : ''}/av-embeds/${assetId}${versionID ? `/vpid/${versionID}` : ''}`;
  }

  if (platform === 'articles') {
    return `${baseUrl}/${AV_ROUTE}/articles/${assetId}${versionID ? `/${versionID}` : ''}${lang ? `/${lang}` : ''}`;
  }

  return null;
};
