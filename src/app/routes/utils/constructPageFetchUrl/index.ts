import Url from 'url-parse';
import pipe from 'ramda/src/pipe';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { getMostReadEndpoint } from '#app/lib/utilities/getUrlHelpers/getMostReadUrls';
import { getUrlPath } from '../../../lib/utilities/urlParser';
import handleError from '../handleError';
import {
  Services,
  Variants,
  Environments,
  PageTypes,
} from '../../../models/types/global';
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
} from '../pageTypes';

interface UrlConstructParams {
  pathname: string;
  pageType: PageTypes;
  service: Services;
  variant?: Variants;
  page?: string;
  isAmp?: boolean;
  isCaf?: boolean;
}

const removeAmp = (path: string) => path.split('.')[0];
const getArticleId = (path: string) => path.match(/(c[a-zA-Z0-9]{10}o)/)?.[1];
const getCpsId = (path: string) => path;
const getFrontPageId = (path: string) => `${path}/front_page`;
const getTipoId = (path: string) => path.match(/(c[a-zA-Z0-9]{10}t)/)?.[1];

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
  isCaf?: boolean;
}

const getId = ({ pageType, service, variant, env, isCaf }: GetIdProps) => {
  let getIdFunction;
  switch (pageType) {
    case ARTICLE_PAGE:
      getIdFunction = isCaf ? getCpsId : getArticleId;
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
        return env !== 'local' && process.env.JEST_WORKER_ID === undefined
          ? HOME_PAGE_CONFIG?.[service]?.[env]
          : 'tipohome'; // 1 isnt local use config 2 is local not test use config 3 is local is test use tipohome
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
  isCaf,
}: UrlConstructParams) => {
  const env = process?.env?.BFF_ENV || getEnvironment(pathname);
  const isLocal = !env || env === 'local';

  const id = getId({ pageType, service, env, variant, isCaf })(pathname);
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

  if (isLocal && !process?.env?.BFF_PATH?.includes('localhost')) {
    switch (pageType) {
      case ARTICLE_PAGE:
        fetchUrl = Url(
          `/${service}/articles/${id}${variant ? `/${variant}` : ''}`,
        );
        break;
      case CPS_ASSET:
        fetchUrl = Url(id);
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
