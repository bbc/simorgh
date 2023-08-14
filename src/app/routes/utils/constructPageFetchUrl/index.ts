import Url from 'url-parse';
import pipe from 'ramda/src/pipe';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { getMostReadEndpoint } from '#app/lib/utilities/getUrlHelpers/getMostReadUrls';
import { getUrlPath } from '../../../lib/utilities/urlParser';
import handleError from '../handleError';
import { Services, Variants, Environments } from '../../../models/types/global';
import HOME_PAGE_CONFIG from '../../homePage/getInitialData/page-config';
import PAGE_TYPES from './page-types';

const { ARTICLE, CPS_ASSET, HOME, LIVE, MOST_READ, TOPIC } = PAGE_TYPES;

type Keys = keyof typeof PAGE_TYPES;
type PageTypes = (typeof PAGE_TYPES)[Keys];
interface UrlConstructParams {
  pathname: string;
  pageType: PageTypes;
  service: Services;
  variant?: Variants;
  page?: string;
  isAmp?: boolean;
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
}

const getId = ({ pageType, service, variant, env }: GetIdProps) => {
  let getIdFunction;
  switch (pageType) {
    case ARTICLE:
      getIdFunction = getArticleId;
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
    case HOME:
      getIdFunction = () => {
        return env !== 'local'
          ? HOME_PAGE_CONFIG?.[service]?.[env]
          : 'tipohome';
      };
      break;
    case MOST_READ:
      getIdFunction = () => pageType;
      break;
    case LIVE:
    case TOPIC:
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
  };

  let fetchUrl = Url(process.env.BFF_PATH as string).set(
    'query',
    queryParameters,
  );

  if (isLocal) {
    switch (pageType) {
      case ARTICLE:
        fetchUrl = Url(
          `/${service}/articles/${id}${variant ? `/${variant}` : ''}`,
        );
        break;
      case CPS_ASSET:
        fetchUrl = Url(id);
        break;
      case HOME:
        fetchUrl = Url(`/${service}/${id}`);
        break;
      case MOST_READ:
        fetchUrl = Url(getMostReadEndpoint({ service, variant }).split('.')[0]);
        break;
      case TOPIC: {
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
