import isLive from '../../isLive';
import { getEnvConfig } from '../../getEnvConfig';
import parseAvRoute from '../../../../routes/utils/parseAvRoute';

type MediaTypes = 'media' | 'avEmbed' | 'cps' | 'articles' | 'live' | 'legacy';

const AV_ROUTE = 'ws/av-embeds';

const LIVE_BASE_URL = 'https://www.bbc.com';
const TEST_BASE_URL = 'https://www.test.bbc.com';
const DEV_BASE_URL = TEST_BASE_URL;

const LIVE_AMP_URL = 'https://polling.bbc.co.uk';
const TEST_AMP_URL = 'https://polling.test.bbc.co.uk';
const DEV_AMP_URL = TEST_AMP_URL;

const shouldOverrideMorphEnv = (type: MediaTypes, queryString?: string) => {
  if (isLive()) return false;

  const isLiveRendererEnv = queryString?.includes('renderer_env=live');
  const isMediaType = type === 'media';

  if (isLiveRendererEnv) {
    return true;
  }

  return isMediaType;
};

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

type AvEmbedProps = {
  mediaId: string;
  isAmp: boolean;
  embedded?: boolean;
};

const handleAvEmbed = ({ mediaId, isAmp, embedded = false }: AvEmbedProps) => {
  const parsedRoute = parseAvRoute(mediaId);
  const {
    platform,
    mediaDelimiter,
    assetId,
    mediaId: parsedMediaId,
    service,
    variant,
  } = parsedRoute;

  const baseUrl = getBaseUrl(isAmp);

  // 'embedded' is "true" for media players rendered by the av-embeds route: AMP, Syndication
  if (embedded) {
    if (isAmp) return `${baseUrl}/${AV_ROUTE}/${platform}/${mediaId}/amp`;

    if (platform === 'cps') {
      return `${baseUrl}/${service}${variant ? `/${variant}` : ''}/av-embeds/${assetId}${mediaDelimiter ? `/${mediaDelimiter}/${parsedMediaId}` : ''}`;
    }

    if (platform === 'articles') {
      return `${baseUrl}/${AV_ROUTE}/${platform}/${mediaId}`;
    }
  }

  // This is the default URL for media players rendered by canonical pages
  return `${baseUrl}/${AV_ROUTE}/${platform}/${mediaId}`;
};

type MorphEmbedProps = {
  type: MediaTypes;
  mediaId: string;
  isAmp: boolean;
  queryString?: string;
};

const handleMorphEmbed = ({
  type,
  mediaId,
  isAmp,
  queryString,
}: MorphEmbedProps) => {
  const morphEnvOverride = shouldOverrideMorphEnv(type, queryString)
    ? '?morph_env=live'
    : '';
  const ampSection = isAmp ? '/amp' : '';
  const baseUrl = getBaseUrl(isAmp);
  const url = `${baseUrl}/${AV_ROUTE}/${type}/${mediaId}`;
  return `${url}${ampSection}${morphEnvOverride}`;
};

export type GetEmbedUrlProps = {
  type: MediaTypes;
  mediaId: string;
  isAmp?: boolean;
  queryString?: string;
  embedded?: boolean;
};

export default ({
  type,
  mediaId,
  isAmp = false,
  queryString,
  embedded = false,
}: GetEmbedUrlProps) => {
  const morphAsset = type !== 'avEmbed';
  const embedUrl = morphAsset
    ? handleMorphEmbed({ type, mediaId, isAmp, queryString })
    : handleAvEmbed({ mediaId, isAmp, embedded });
  return embedUrl;
};

export const makeAbsolute = (url: string) => {
  const replacementString = isLive() ? LIVE_BASE_URL : TEST_BASE_URL;

  return url.replace(/^\//, `${replacementString}/`);
};
