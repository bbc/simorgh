import Url from 'url-parse';
import pipe from 'ramda/src/pipe';
import getEnvironment from '#app/routes/utils/getEnvironment';
import { getUrlPath } from '../../../lib/utilities/urlParser';
import handleError from '../handleError';
import { Services, Variants } from '../../../models/types/global';

interface UrlConstructParams {
  pathname: string;
  pageType: 'article' | 'cpsAsset' | 'topic' | 'live';
  service: Services;
  variant?: Variants;
  page?: string;
}

const removeAmp = (path: string) => path.split('.')[0];
const getArticleId = (path: string) => path.match(/(c[a-zA-Z0-9]{10}o)/)?.[1];
const getTipoId = (path: string) => path.match(/(c[a-zA-Z0-9]{10}t)/)?.[1];
const getCpsId = (path: string) => path;

const getId = (pageType: string) => {
  let getIdFunction;
  switch (pageType) {
    case 'cpsAsset':
      getIdFunction = getCpsId;
      break;
    case 'topic':
    case 'live':
      getIdFunction = getTipoId;
      break;
    default:
      getIdFunction = getArticleId;
      break;
  }
  return pipe(getUrlPath, removeAmp, getIdFunction);
};

const constructPageFetchUrl = ({
  pathname,
  pageType = 'topic',
  service,
  variant,
  page,
}: UrlConstructParams) => {
  const env = getEnvironment(pathname);
  const isLocal = !env || env === 'local';

  const id = getId(pageType)(pathname);
  const capitalisedPageType =
    pageType.charAt(0).toUpperCase() + pageType.slice(1);

  if (!id) throw handleError(`${capitlisedPageType} ID is invalid`, 500);

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
      case PAGE_TYPES.ARTICLE
        fetchUrl = Url(
          `/${service}/articles/${id}${variant ? `/${variant}` : ''}`,
        );
        break;
      case 'cpsAsset':
        fetchUrl = Url(id);
        break;
      case 'topic': {
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
