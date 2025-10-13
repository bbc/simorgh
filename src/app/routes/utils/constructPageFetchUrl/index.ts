import Url from 'url-parse';
import pipe from 'ramda/src/pipe';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { getMostReadEndpoint } from '#app/lib/utilities/getUrlHelpers/getMostReadUrls';
import { getUrlPath } from '#lib/utilities/urlParser';
import {
  Services,
  Variants,
  Environments,
  PageTypes,
} from '#models/types/global';
import handleError from '../handleError';
import {
  TOPIC_PAGE_CONFIG,
  TopicPagePaths,
} from '../../topic/getInitialData/page-config';
import {
  ARTICLE_PAGE,
  AV_EMBEDS,
  CPS_ASSET,
  HOME_PAGE,
  LIVE_PAGE,
  LIVE_RADIO_PAGE,
  MOST_READ_PAGE,
  AUDIO_PAGE,
  TOPIC_PAGE,
  TV_PAGE,
  UGC_PAGE,
  LIVE_TV_PAGE,
} from '../pageTypes';
import parseRoute from '../parseRoute';

const removeLeadingSlash = (path: string) => path?.replace(/^\/+/g, '');
export const removeRendererExtension = (path: string) => path.split('.')[0];
export const getArticleId = (path: string) =>
  path.match(/(c[a-zA-Z0-9]{10,}o)/)?.[1];
const getCpsId = (path: string) => removeLeadingSlash(path);
const getTVAudioId = (path: string) => removeLeadingSlash(path);
export const getTipoId = (path: string) =>
  path.match(/(c[a-zA-Z0-9]{10,}t)/)?.[1];
const getUgcId = (path: string) => path.match(/(u[a-zA-Z0-9]{8,})/)?.[1];
export const isOptimoIdCheck = (path: string) =>
  /\/(articles|sgeulachdan|erthyglau)\/(c[a-zA-Z0-9]{10,}o)/.test(path);
export const isCpsIdCheck = (path: string) =>
  /([0-9]{5,9}|[a-z0-9\-_]+-[0-9]{5,9})$/.test(path);
const isTipoIdCheck = (path: string) => /(c[a-zA-Z0-9]{10,}t)/.test(path);

interface GetIdProps {
  pageType: PageTypes;
  service?: Services;
  variant?: Variants | null;
  env: Environments;
}

const getId = ({ pageType, service, variant, env }: GetIdProps) => {
  let getIdFunction;

  switch (pageType) {
    case ARTICLE_PAGE:
      getIdFunction = (path: string) => {
        const isOptimoId = isOptimoIdCheck(path);
        const isCpsId = isCpsIdCheck(path);

        if (isOptimoId) return getArticleId(path);
        if (isCpsId) return getCpsId(path);

        return removeLeadingSlash(path);
      };
      break;
    case CPS_ASSET:
      getIdFunction = (path: string) => getCpsId(path);
      break;
    case HOME_PAGE:
      getIdFunction = () => {
        return service;
      };
      break;
    case MOST_READ_PAGE:
      getIdFunction = () => service;
      break;
    case LIVE_RADIO_PAGE:
      getIdFunction = (path: string) => {
        const parts = path?.split('/');
        const liveRadioName = parts?.[2];

        if (!liveRadioName) return null;

        return liveRadioName;
      };
      break;
    case LIVE_PAGE:
      getIdFunction = (path: string) => {
        if (isTipoIdCheck(path)) {
          return getTipoId(path);
        }
        if (isCpsIdCheck(path)) {
          return `/${service}${variant ? `/${variant}` : ''}/live/${getCpsId(path)}`;
        }
        return null;
      };
      break;

    case TOPIC_PAGE:
      getIdFunction = (path: string) => {
        return (
          TOPIC_PAGE_CONFIG?.[path as TopicPagePaths]?.[env] || getTipoId(path)
        );
      };
      break;
    case UGC_PAGE:
      getIdFunction = getUgcId;
      break;
    case AV_EMBEDS:
      getIdFunction = (path: string) => {
        const parsedRoute = parseRoute(path);

        const isShortCpsId = parsedRoute?.assetId?.length === 8;

        const withServiceAndVariant = !isShortCpsId
          ? `${parsedRoute.service ?? ''}${parsedRoute.variant ? `/${parsedRoute.variant}` : ''}`
          : '';

        const id = `${withServiceAndVariant}/${parsedRoute.assetId}`;

        return id;
      };
      break;
    case AUDIO_PAGE:
    case TV_PAGE:
      getIdFunction = (path: string) => getTVAudioId(path);
      break;
    case LIVE_TV_PAGE:
      getIdFunction = (path: string) => {
        // example path: /dari/watch/bbc_afghan_tv/live
        const [tv] = path.split('/').slice(-2);
        return tv;
      };
      break;
    default:
      getIdFunction = () => null;
      break;
  }
  return pipe(getUrlPath, removeRendererExtension, getIdFunction);
};

export interface UrlConstructParams {
  pathname: string;
  pageType: PageTypes;
  service?: Services;
  variant?: Variants | null;
  page?: string;
  isAmp?: boolean;
  disableRadioSchedule?: boolean;
  mediaId?: string | null;
  lang?: string | null;
}

const constructPageFetchUrl = ({
  pathname,
  pageType,
  service,
  variant,
  page,
  isAmp,
  disableRadioSchedule,
  mediaId,
  lang,
}: UrlConstructParams) => {
  const env = getEnvironment(pathname);
  const isLocal = !env || env === 'local';
  const id = getId({ pageType, service, env, variant })(pathname);
  const capitalisedPageType =
    pageType.charAt(0).toUpperCase() + pageType.slice(1);

  if (!id) throw handleError(`${capitalisedPageType} ID is invalid`, 500);

  const queryParameters = {
    id,
    ...(service && {
      service,
    }),
    pageType,
    ...(variant && {
      variant,
    }),
    ...(page && {
      page,
    }),
    ...(isAmp && {
      isAmp,
    }),
    ...(disableRadioSchedule && {
      disableRadioSchedule,
    }),
    // MediaId can be supplied by av-embeds routes to determine which media asset to return
    ...(mediaId && {
      mediaId,
    }),
    ...(lang && {
      lang,
    }),
    ...(env && { serviceEnv: env }),
  };

  let fetchUrl = Url(process.env.BFF_PATH as string).set(
    'query',
    queryParameters,
  );

  if (isLocal) {
    const host = `http://${process.env.HOSTNAME || 'localhost'}`;
    const port = process.env.PORT ? `:${process.env.PORT}` : '';

    switch (pageType) {
      case ARTICLE_PAGE: {
        const { assetId, platform } = parseRoute(pathname);

        if (platform === 'articles') {
          fetchUrl = Url(
            `${host}${port}/api/local/${service}/articles/${assetId}${variant ? `/${variant}` : ''}`,
          );
          break;
        }

        if (platform === 'cps') {
          fetchUrl = Url(
            `${host}${port}/api/local/${service}/cpsAssets/${variant ? `${variant}/` : ''}${assetId}`,
          );
          break;
        }

        fetchUrl = Url(
          `${host}${port}/api/local/${service}/legacyAssets/${variant ? `${variant}/` : ''}${assetId}`,
        );

        break;
      }
      case CPS_ASSET:
      case AUDIO_PAGE:
      case TV_PAGE:
        fetchUrl = Url(`/${id}`);
        break;
      case HOME_PAGE: {
        if (process.env?.NEXTJS) {
          fetchUrl = Url(
            `${host}${port}/api/local/${service}/homePage/${variant ? `${variant}` : 'index'}`,
          );
        } else {
          fetchUrl = Url(`/${service}${variant ? `/${variant}` : ''}`);
        }
        break;
      }
      case MOST_READ_PAGE:
        fetchUrl = Url(getMostReadEndpoint({ service, variant }).split('.')[0]);
        break;
      case TOPIC_PAGE: {
        const variantPath = variant ? `/${variant}` : '';
        fetchUrl = Url(`/${service}/topics/${id}${variantPath}`);
        break;
      }
      case LIVE_PAGE: {
        const [liveID] = pathname.split('.');
        const variantPath = variant ? `/${variant}` : '';
        // pathname is the ID of the Live page without /service/live/, and supports both Tipo & CPS IDs
        fetchUrl = Url(
          `${host}${port}/api/local/${service}/live/${liveID}${variantPath}`,
        );
        break;
      }
      case UGC_PAGE: {
        fetchUrl = Url(`${host}${port}/api/local/${service}/send/${id}`);
        break;
      }
      case AV_EMBEDS: {
        const parsedRoute = parseRoute(pathname);

        if (parsedRoute.isWsRoute) {
          // handle /ws/av-embeds route
        } else {
          fetchUrl = Url(
            `${host}${port}/api/local/${parsedRoute.service}/av-embeds/${parsedRoute.variant ? `${parsedRoute?.variant}/` : ''}${parsedRoute.assetId}${parsedRoute.mediaId ? `/${parsedRoute.mediaDelimiter}/${parsedRoute.mediaId}` : ''} ${parsedRoute.lang ? `/${parsedRoute.lang}` : ''}`,
          );
        }
        break;
      }
      case LIVE_RADIO_PAGE:
        fetchUrl = Url(`${pathname}`);
        break;
      case LIVE_TV_PAGE: {
        fetchUrl = Url(`${host}${port}/api/local/${service}/watch/${id}/live`);
        break;
      }
      default:
        return fetchUrl;
    }
  }

  return fetchUrl;
};

export default constructPageFetchUrl;
