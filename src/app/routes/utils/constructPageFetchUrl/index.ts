import Url from 'url-parse';
import pipe from 'ramda/src/pipe';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { getUrlPath } from '../../../lib/utilities/urlParser';
import handleError from '../handleError';
import { Services, Variants } from '../../../models/types/global';
import HOME_PAGE_CONFIG from '../../homePage/getInitialData/page-config';

const PAGE_TYPES = {
  ARTICLE: 'article',
  CPS_ASSET: 'cpsAsset',
  HOME: 'home',
  TOPIC: 'topic',
  LIVE: 'live',
} as const;

type Keys = keyof typeof PAGE_TYPES;
type PageTypes = (typeof PAGE_TYPES)[Keys];
interface UrlConstructParams {
  pathname: string;
  pageType: PageTypes;
  service: Services;
  variant?: Variants;
  page?: string;
}

const removeAmp = (path: string) => path.split('.')[0];
const getArticleId = (path: string) => path.match(/(c[a-zA-Z0-9]{10}o)/)?.[1];
const getCpsId = (path: string) => path;
const getTipoId = (path: string) => path.match(/(c[a-zA-Z0-9]{10}t)/)?.[1];

const getId = (
  pageType: PageTypes,
  service: Services,
  env: 'test' | 'live' | 'local',
) => {
  let getIdFunction;
  switch (pageType) {
    case PAGE_TYPES.ARTICLE:
      getIdFunction = getArticleId;
      break;
    case PAGE_TYPES.CPS_ASSET:
      getIdFunction = getCpsId;
      break;
    case PAGE_TYPES.HOME:
      getIdFunction = () => {
        return env !== 'local' ? HOME_PAGE_CONFIG[service][env] : 'tipohome';
      };
      break;
    case PAGE_TYPES.LIVE:
    case PAGE_TYPES.TOPIC:
      getIdFunction = getTipoId;
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
}: UrlConstructParams) => {
  const env = getEnvironment(pathname);
  const isLocal = !env || env === 'local';

  const id = getId(pageType, service, env)(pathname);
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
  };

  let fetchUrl = Url(process.env.BFF_PATH as string).set(
    'query',
    queryParameters,
  );

  if (isLocal) {
    switch (pageType) {
      case PAGE_TYPES.ARTICLE:
        fetchUrl = Url(
          `/${service}/articles/${id}${variant ? `/${variant}` : ''}`,
        );
        break;
      case PAGE_TYPES.CPS_ASSET:
        fetchUrl = Url(id);
        break;
      case PAGE_TYPES.HOME:
        fetchUrl = Url(`/${service}/${id}`);
        break;
      case PAGE_TYPES.TOPIC: {
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
