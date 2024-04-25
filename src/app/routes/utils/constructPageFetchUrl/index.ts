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
import HOME_PAGE_CONFIG from '../../homePage/getInitialData/page-config';
import {
  TOPIC_PAGE_CONFIG,
  TopicPagePaths,
} from '../../topic/getInitialData/page-config';
import {
  ARTICLE_PAGE,
  CPS_ASSET,
  HOME_PAGE,
  LIVE_PAGE,
  MOST_READ_PAGE,
  TOPIC_PAGE,
  UGC_PAGE,
} from '../pageTypes';

export interface UrlConstructParams {
  pathname: string;
  pageType: PageTypes;
  service: Services;
  variant?: Variants;
  page?: string;
  isAmp?: boolean;
}

const removeLeadingSlash = (path: string) => path?.replace(/^\/+/g, '');
const removeAmp = (path: string) => path.split('.')[0];
const getArticleId = (path: string) => path.match(/(c[a-zA-Z0-9]{10,}o)/)?.[1];
const getCpsId = (path: string) => removeLeadingSlash(path);
const getFrontPageId = (path: string) =>
  `${removeLeadingSlash(path)}/front_page`;
const getTipoId = (path: string) => path.match(/(c[a-zA-Z0-9]{10,}t)/)?.[1];
const getUgcId = (path: string) => path.match(/(u[a-zA-Z0-9]{8,})/)?.[1];
const isOptimoIdCheck = (path: string) => /(c[a-zA-Z0-9]{10,}o)/.test(path);
const isCpsIdCheck = (path: string) =>
  /([0-9]{5,9}|[a-z0-9\-_]+-[0-9]{5,9})$/.test(path);

const isFrontPage = ({
  path,
  service,
  variant,
}: {
  path: string;
  service: Services;
  variant?: Variants;
}) => (variant ? path === `/${service}/${variant}` : path === `/${service}`);

interface GetIdProps {
  pageType: PageTypes;
  service: Services;
  variant?: Variants;
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
      getIdFunction = (path: string) => {
        /**
         * Legacy Front Pages are curated in CPS and fetched from the BFF using the CPS_ASSET page type
         * This functionality will be removed once all front pages migrated to the new HomePage
         *  */
        return env !== 'local' && isFrontPage({ path, service, variant })
          ? getFrontPageId(path)
          : getCpsId(path);
      };
      break;
    case HOME_PAGE:
      getIdFunction = () => {
        return env !== 'local'
          ? HOME_PAGE_CONFIG?.[service]?.[env]
          : 'tipohome';
      };
      break;
    case MOST_READ_PAGE:
      getIdFunction = () => pageType;
      break;
    case LIVE_PAGE:
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
    default:
      getIdFunction = () => null;
      break;
  }
  return pipe(getUrlPath, removeAmp, getIdFunction);
};

const constructPageFetchUrl = ({
  pathname,
  pageType,
  service,
  variant,
  page,
  isAmp,
}: UrlConstructParams) => {
  const env = getEnvironment(pathname);
  const isLocal = !env || env === 'local';

  const id = getId({ pageType, service, env, variant })(pathname);
  const capitalisedPageType =
    pageType.charAt(0).toUpperCase() + pageType.slice(1);

  if (!id) throw handleError(`${capitalisedPageType} ID is invalid`, 500);

  const queryParameters = {
    id,
    service,
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
    ...(env && { serviceEnv: env }),
  };

  let fetchUrl = Url(process.env.BFF_PATH as string).set(
    'query',
    queryParameters,
  );

  if (isLocal) {
    switch (pageType) {
      case ARTICLE_PAGE: {
        fetchUrl = Url(
          isCpsIdCheck(id)
            ? `/${id}`
            : `/${service}/articles/${id}${variant ? `/${variant}` : ''}`,
        );
        break;
      }
      case CPS_ASSET:
        fetchUrl = Url(`/${id}`);
        break;
      case HOME_PAGE:
        fetchUrl = Url(`/${service}/${id}`);
        break;
      case MOST_READ_PAGE:
        fetchUrl = Url(getMostReadEndpoint({ service, variant }).split('.')[0]);
        break;
      case TOPIC_PAGE: {
        const variantPath = variant ? `/${variant}` : '';
        fetchUrl = Url(`/${service}${variantPath}/topics/${id}`);
        break;
      }
      default:
        return fetchUrl;
    }
  }

  return fetchUrl;
};

export default constructPageFetchUrl;
