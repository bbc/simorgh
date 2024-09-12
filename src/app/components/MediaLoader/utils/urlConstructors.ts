import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import isLive from '#app/lib/utilities/isLive';
import parseAvRoute from '#app/routes/utils/parseAvRoute';

const LIVE_BASE_URL = 'https://www.bbc.com';
const TEST_BASE_URL = 'https://www.test.bbc.com';

const LIVE_AMP_URL = 'https://web-cdn.api.bbci.co.uk';
const TEST_AMP_URL = 'https://web-cdn.test.api.bbci.co.uk';
const DEV_AMP_URL = TEST_AMP_URL;

const isDev = () => getEnvConfig().SIMORGH_APP_ENV === 'local';

const getAmpBaseUrl = () => {
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
  const { platform, service, variant, assetId } = parseAvRoute(id);

  const ampBaseUrl = getAmpBaseUrl();

  if (platform === 'cps') {
    return `${ampBaseUrl}/ws/av-embeds/cps/${service}${variant ? `/${variant}` : ''}/${assetId}${versionID ? `/${versionID}` : ''}${lang ? `/${lang}` : ''}/amp`;
  }

  if (platform === 'articles') {
    return `${ampBaseUrl}/ws/av-embeds/articles/${assetId}${versionID ? `/${versionID}` : ''}${lang ? `/${lang}` : ''}/amp`;
  }

  return null;
};

export const getExternalEmbedUrl = ({ id, versionID, lang }: FuncProps) => {
  const { platform, service, variant, assetId } = parseAvRoute(id);

  const baseUrl = isLive() ? LIVE_BASE_URL : TEST_BASE_URL;

  if (platform === 'cps') {
    return `${baseUrl}/${service}${variant ? `/${variant}` : ''}/av-embeds/${assetId}${versionID ? `/vpid/${versionID}` : ''}`;
  }

  if (platform === 'articles') {
    return `${baseUrl}/ws/av-embeds/articles/${assetId}${versionID ? `/${versionID}` : ''}${lang ? `/${lang}` : ''}`;
  }

  return null;
};
