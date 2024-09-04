import isLive from '../../isLive';
import { getEnvConfig } from '../../getEnvConfig';
import parseAvRoute from '../../../../routes/utils/parseAvRoute';

export type MediaTypes =
  | 'media'
  | 'avEmbed'
  | 'cps'
  | 'articles'
  | 'live'
  | 'legacy';

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
};

const handleAvEmbed = ({ mediaId, isAmp }: AvEmbedProps) => {
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

  // AMP routes should always return /ws/av-embeds
  if (isAmp) {
    return `${baseUrl}/${AV_ROUTE}/${platform}/${mediaId}/amp`;
  }

  let url = '';

  if (platform === 'cps') {
    url = `${baseUrl}/${service}${variant ? `/${variant}` : ''}/av-embeds/${assetId}${mediaDelimiter ? `/${mediaDelimiter}/${parsedMediaId}` : ''}`;
  }

  if (platform === 'articles') {
    url = `${baseUrl}/${AV_ROUTE}/${platform}/${mediaId}`;
  }

  return url;
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

type Props = {
  type: MediaTypes;
  mediaId: string;
  isAmp?: boolean;
  queryString?: string;
};

export default ({ type, mediaId, isAmp = false, queryString }: Props) => {
  const morphAsset = type !== 'avEmbed';
  const embedUrl = morphAsset
    ? handleMorphEmbed({ type, mediaId, isAmp, queryString })
    : handleAvEmbed({ mediaId, isAmp });
  return embedUrl;
};

export const makeAbsolute = (url: string) => {
  const replacementString = isLive() ? LIVE_BASE_URL : TEST_BASE_URL;

  return url.replace(/^\//, `${replacementString}/`);
};
