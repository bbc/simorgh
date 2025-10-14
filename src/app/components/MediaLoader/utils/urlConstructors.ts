import isLive from '#app/lib/utilities/isLive';
import parseRoute from '#app/routes/utils/parseRoute';

const LIVE_BASE_URL = 'https://www.bbc.com';
const TEST_BASE_URL = 'https://www.test.bbc.com';

const LIVE_AMP_URL = 'https://web-cdn.api.bbci.co.uk';
const TEST_AMP_URL = 'https://web-cdn.test.api.bbci.co.uk';

type FuncProps = {
  id: string | null;
  parentPID?: string;
  versionPID?: string;
  lang?: string;
};

export const getAmpIframeUrl = ({
  id,
  parentPID,
  versionPID,
  lang,
}: FuncProps) => {
  if (!id) return null;

  const { platform, service, variant, assetId } = parseRoute(id);

  const ampBaseUrl = isLive() ? LIVE_AMP_URL : TEST_AMP_URL;

  if (platform === 'cps') {
    return `${ampBaseUrl}/ws/av-embeds/cps/${service}${variant ? `/${variant}` : ''}/${assetId}${versionPID ? `/${versionPID}` : ''}${lang ? `/${lang}` : ''}/amp`;
  }

  if (platform === 'articles') {
    return `${ampBaseUrl}/ws/av-embeds/articles/${assetId}${parentPID ? `/${parentPID}` : ''}${lang ? `/${lang}` : ''}/amp`;
  }

  return null;
};

export const getExternalEmbedUrl = ({
  id,
  parentPID,
  versionPID,
  lang,
}: FuncProps) => {
  if (!id) return null;

  const { platform, service, variant, assetId } = parseRoute(id);

  const baseUrl = isLive() ? LIVE_BASE_URL : TEST_BASE_URL;

  if (platform === 'cps') {
    return `${baseUrl}/${service}${variant ? `/${variant}` : ''}/av-embeds/${assetId}${versionPID ? `/vpid/${versionPID}` : ''}`;
  }

  if (platform === 'articles') {
    return `${baseUrl}/ws/av-embeds/articles/${assetId}${parentPID ? `/${parentPID}` : ''}${lang ? `/${lang}` : ''}`;
  }

  return null;
};
